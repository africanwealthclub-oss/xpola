<?php
/**
 * FILE PATH: api/admin/audit_helper.php
 * Include this in any admin endpoint that needs to log actions.
 *
 * Usage:
 *   require_once __DIR__ . '/audit_helper.php';
 *   logAudit($db, $adminPayload, 'CREATE', 'product', 'Created product: iPhone 15');
 */

if (!function_exists('logAudit')) {
    function logAudit(PDO $db, array $adminPayload, string $action, string $target, string $details = ''): void {
        try {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR']
                ?? $_SERVER['REMOTE_ADDR']
                ?? null;
            $db->prepare("INSERT INTO audit_logs (admin_id, action, target, details, ip_address)
                          VALUES (?, ?, ?, ?, ?)")
               ->execute([
                   $adminPayload['admin_id'] ?? null,
                   strtoupper($action),
                   $target,
                   $details,
                   $ip,
               ]);
        } catch (Throwable $e) {
            // Never let audit logging kill a request
        }
    }
}
