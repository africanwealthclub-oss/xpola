<?php
// FILE PATH: api/payments/paystack_verify.php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');

$ref    = $_GET['reference'] ?? '';
$secret = getenv('PAYSTACK_SECRET_KEY') ?: 'sk_test_1422bcc00029a3d0a6726a5d20c152a8164cd99b';

if (!$ref) {
    http_response_code(400);
    echo json_encode(['error' => 'No reference provided']);
    exit;
}

// Call Paystack verify API
$ch = curl_init("https://api.paystack.co/transaction/verify/" . rawurlencode($ref));
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ["Authorization: Bearer $secret"],
]);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);

if (!$response || !$response['status']) {
    http_response_code(400);
    echo json_encode(['error' => 'Verification failed']);
    exit;
}

$data   = $response['data'];
$status = $data['status'] ?? '';

if ($status === 'success') {
    $db     = getDB();
    $amount = (float)$data['amount'] / 100;

    // Same update logic as webhook (idempotent — won't double-update)
    $stmt = $db->prepare("
        UPDATE orders
        SET payment_status = 'paid',
            payment_ref    = ?,
            status         = 'processing',
            updated_at     = NOW()
        WHERE order_ref = ?
          AND payment_gateway = 'paystack'
          AND payment_status  = 'pending'
    ");
    $stmt->execute([$ref, $ref]);

    // Fetch order for response
    $row = $db->prepare("SELECT order_ref, total_amount, status FROM orders WHERE order_ref = ? LIMIT 1");
    $row->execute([$ref]);
    $order = $row->fetch();

    echo json_encode([
        'success' => true,
        'message' => 'Payment verified',
        'order'   => $order,
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Payment not successful', 'status' => $status]);
}