<?php
/**
 * Paystack webhook:
 * https://xpolaservices.com/api/payments/paystack_webhook.php
 *
 * Configure this URL in Paystack Dashboard > Developers > Webhooks.
 */
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../admin/audit_helper.php';
header('Content-Type: application/json');

$paystackConfig = __DIR__ . '/../config/paystack.php';
if (is_file($paystackConfig)) require_once $paystackConfig;

$secret = getenv('PAYSTACK_SECRET_KEY')
    ?: (defined('PAYSTACK_SECRET_KEY') ? PAYSTACK_SECRET_KEY : '')
    ?: (defined('PAYSTACK_SECRET') ? PAYSTACK_SECRET : '');
$payload = file_get_contents('php://input') ?: '';
$sig = (string)($_SERVER['HTTP_X_PAYSTACK_SIGNATURE'] ?? '');
$expectedSig = $secret ? hash_hmac('sha512', $payload, $secret) : '';

if (!$secret || !$sig || !hash_equals($expectedSig, $sig)) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid signature']);
    exit;
}

$event = json_decode($payload, true);
if (!is_array($event)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit;
}

$eventName = (string)($event['event'] ?? '');
$data = is_array($event['data'] ?? null) ? $event['data'] : [];
$ref = trim((string)($data['reference'] ?? ''));
$status = strtolower((string)($data['status'] ?? ''));

// Acknowledge unrelated events so Paystack does not repeatedly retry them.
if (!$ref || !in_array($eventName, ['charge.success', 'charge.failed'], true)) {
    http_response_code(200);
    echo json_encode(['received' => true]);
    exit;
}

$db = getDB();
$metadata = is_array($data['metadata'] ?? null) ? $data['metadata'] : [];
$orderId = (int)($metadata['order_id'] ?? 0);

// Retry references are linked by metadata.order_id. Fall back to the original
// order/payment reference for older transactions without metadata.
if ($orderId > 0) {
    $stmt = $db->prepare('SELECT * FROM orders WHERE id=? LIMIT 1');
    $stmt->execute([$orderId]);
} else {
    $stmt = $db->prepare('SELECT * FROM orders WHERE order_ref=? OR payment_ref=? LIMIT 1');
    $stmt->execute([$ref, $ref]);
}
$order = $stmt->fetch();

// Return 200 for an unknown order to avoid pointless Paystack retries; log it
// for investigation rather than allowing an arbitrary reference to update data.
if (!$order) {
    error_log('[Xpola Paystack webhook] Order not found for reference: ' . $ref);
    http_response_code(200);
    echo json_encode(['received' => true]);
    exit;
}

// Already-paid orders are safe to receive repeatedly.
if (($order['payment_status'] ?? '') === 'paid') {
    http_response_code(200);
    echo json_encode(['received' => true, 'already_processed' => true]);
    exit;
}

// A failed/abandoned charge does not permanently fail the order. The customer
// can use Resume Payment while it remains pending. Cancellation is separate.
if ($eventName === 'charge.failed' || $status !== 'success') {
    logActivity($db, 'system', null, 'Paystack', null, 'PAYMENT_RETRY_PENDING', (string)$order['order_ref'], 'Paystack webhook did not complete payment; order remains Awaiting Payment');
    http_response_code(200);
    echo json_encode(['received' => true, 'status' => 'pending']);
    exit;
}

$transactionCurrency = strtoupper((string)($data['currency'] ?? ''));
$orderCurrency = strtoupper((string)($order['currency'] ?? ''));
if ($transactionCurrency && $orderCurrency && $transactionCurrency !== $orderCurrency) {
    logActivity($db, 'system', null, 'Paystack', null, 'PAYMENT_RETRY_PENDING', (string)$order['order_ref'], 'Webhook currency mismatch; order remains Awaiting Payment');
    http_response_code(200);
    echo json_encode(['received' => true, 'status' => 'pending']);
    exit;
}

$paidAmount = (float)($data['amount'] ?? 0) / 100;
$expectedAmount = (float)$order['total_amount'];
if (abs($paidAmount - $expectedAmount) > 1) {
    logActivity($db, 'system', null, 'Paystack', null, 'PAYMENT_RETRY_PENDING', (string)$order['order_ref'], 'Webhook amount mismatch; order remains Awaiting Payment');
    http_response_code(200);
    echo json_encode(['received' => true, 'status' => 'pending']);
    exit;
}

// Only a pending order can transition. This makes callback + webhook delivery
// idempotent and prevents a webhook from reopening a cancelled order.
$update = $db->prepare("UPDATE orders
    SET payment_status='paid', payment_ref=?, status='processing', updated_at=NOW()
    WHERE id=? AND payment_gateway='paystack' AND payment_status='pending' AND status='pending'");
$update->execute([$ref, $order['id']]);

if ($update->rowCount() > 0) {
    logActivity($db, 'system', null, 'Paystack', null, 'PAYMENT_CONFIRMED', (string)$order['order_ref'], 'Paystack webhook confirmed payment');
}

http_response_code(200);
echo json_encode(['received' => true, 'status' => 'paid']);
