<?php
/**
 * XPOLA DIAGNOSTIC + DB SETUP + MIGRATION
 * =========================================
 * Upload to server root (public_html/debug.php), open in browser, DELETE after.
 * URL: https://xpolaservices.com/debug.php?secret=xpola_migrate_2024
 *
 * Runs:
 *   1. Full DB setup  (CREATE TABLE IF NOT EXISTS for all 15 tables)
 *   2. Column migrations (ALTER TABLE … ADD COLUMN IF NOT EXISTS for missing cols)
 *   3. Seed data (INSERT IGNORE)
 *   4. Diagnostic checks (auth.php, admins row, password, file existence)
 *  11. *** DELIVERY AREA DEEP DIAGNOSTIC ***
 */
define('MIGRATE_SECRET', 'xpola_migrate_2024');
if (($_GET['secret'] ?? '') !== MIGRATE_SECRET) {
    http_response_code(403); die('403');
}
ini_set('display_errors', 1);
error_reporting(E_ALL);
echo '<pre style="font-family:monospace;font-size:13px;padding:20px;line-height:1.6">';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 0: LOAD DB CONNECTION
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 0: Load db.php ===\n";
try {
    require_once __DIR__ . '/api/config/db.php';
    echo "db.php loaded OK\n";
    $db = getDB();
    echo "getDB() OK — connected\n\n";
} catch (Throwable $e) {
    echo "FAILED: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . " line " . $e->getLine() . "\n";
    echo "\n⛔ Cannot continue without a DB connection. Fix db.php/.env first.\n</pre>";
    exit;
}

$db->exec("SET NAMES utf8mb4");
$db->exec("SET foreign_key_checks = 0");
$allPassed = true;

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: CREATE TABLES (IF NOT EXISTS)
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 1: Create Tables (IF NOT EXISTS) ===\n";

$createStatements = [

    "users" => "CREATE TABLE IF NOT EXISTS `users` (
        `id`             INT AUTO_INCREMENT PRIMARY KEY,
        `uid`            VARCHAR(64)  NOT NULL UNIQUE,
        `email`          VARCHAR(200) NOT NULL UNIQUE,
        `password_hash`  VARCHAR(255) NOT NULL,
        `first_name`     VARCHAR(80)  NOT NULL DEFAULT '',
        `last_name`      VARCHAR(80)  NOT NULL DEFAULT '',
        `phone`          VARCHAR(25)  NOT NULL DEFAULT '',
        `country`        VARCHAR(5)   NOT NULL DEFAULT 'NG',
        `avatar`         VARCHAR(500) DEFAULT NULL,
        `addresses`      JSON         NOT NULL DEFAULT ('[]'),
        `reset_token`    VARCHAR(128) DEFAULT NULL,
        `reset_expires`  DATETIME     DEFAULT NULL,
        `email_verified` TINYINT(1)   NOT NULL DEFAULT 0,
        `verify_token`   VARCHAR(128) DEFAULT NULL,
        `referral_code`  VARCHAR(20)  UNIQUE DEFAULT NULL,
        `created_at`     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        `updated_at`     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "admins" => "CREATE TABLE IF NOT EXISTS `admins` (
        `id`            INT AUTO_INCREMENT PRIMARY KEY,
        `username`      VARCHAR(80)  NOT NULL UNIQUE,
        `password_hash` VARCHAR(255) NOT NULL,
        `email`         VARCHAR(200) DEFAULT NULL,
        `created_at`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "site_settings" => "CREATE TABLE IF NOT EXISTS `site_settings` (
        `key`        VARCHAR(100) NOT NULL,
        `value`      TEXT         DEFAULT NULL,
        `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "categories" => "CREATE TABLE IF NOT EXISTS `categories` (
        `id`          INT AUTO_INCREMENT PRIMARY KEY,
        `name`        VARCHAR(255) NOT NULL,
        `slug`        VARCHAR(255) NOT NULL,
        `country`     ENUM('NG','CA') NOT NULL DEFAULT 'NG',
        `sort_order`  INT DEFAULT 0,
        `description` TEXT DEFAULT NULL,
        `image_url`   VARCHAR(500) DEFAULT NULL,
        `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "products" => "CREATE TABLE IF NOT EXISTS `products` (
        `id`           INT AUTO_INCREMENT PRIMARY KEY,
        `name`         VARCHAR(255) NOT NULL,
        `description`  TEXT,
        `price`        DECIMAL(10,2) NOT NULL,
        `currency`     ENUM('NGN','CAD','USD') DEFAULT 'NGN',
        `country`      ENUM('NG','CA') DEFAULT 'NG',
        `category_id`  INT DEFAULT NULL,
        `image_path`   VARCHAR(255) DEFAULT NULL,
        `stock_status` ENUM('in_stock','out_of_stock') DEFAULT 'in_stock',
        `featured`     TINYINT(1) DEFAULT 0,
        `rating`       DECIMAL(3,2) DEFAULT 0.00,
        `reviews`      INT DEFAULT 0,
        `tags`         TEXT,
        `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "coupons" => "CREATE TABLE IF NOT EXISTS `coupons` (
        `id`                INT AUTO_INCREMENT PRIMARY KEY,
        `code`              VARCHAR(50)   NOT NULL UNIQUE,
        `type`              ENUM('percentage','fixed') NOT NULL DEFAULT 'percentage',
        `value`             DECIMAL(10,2) NOT NULL DEFAULT 0,
        `min_order`         DECIMAL(10,2) DEFAULT NULL,
        `max_uses`          INT           DEFAULT NULL,
        `max_uses_per_user` INT           DEFAULT NULL,
        `used_count`        INT           NOT NULL DEFAULT 0,
        `expires_at`        DATETIME      DEFAULT NULL,
        `is_active`         TINYINT(1)    NOT NULL DEFAULT 1,
        `created_at`        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "delivery_fees" => "CREATE TABLE IF NOT EXISTS `delivery_fees` (
        `id`        INT AUTO_INCREMENT PRIMARY KEY,
        `area`      VARCHAR(255) NOT NULL,
        `state`     VARCHAR(255) NOT NULL,
        `country`   VARCHAR(10)  NOT NULL,
        `fee`       DECIMAL(10,2) NOT NULL,
        `is_active` TINYINT(1)   DEFAULT 1,
        `active`    TINYINT(1)   DEFAULT 1,
        `created_at` TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "orders" => "CREATE TABLE IF NOT EXISTS `orders` (
        `id`               INT AUTO_INCREMENT PRIMARY KEY,
        `order_ref`        VARCHAR(32)   NOT NULL UNIQUE,
        `uid`              VARCHAR(64)   NOT NULL,
        `customer_name`    VARCHAR(200)  NOT NULL DEFAULT '',
        `customer_email`   VARCHAR(200)  NOT NULL DEFAULT '',
        `customer_phone`   VARCHAR(25)   NOT NULL DEFAULT '',
        `delivery_address` VARCHAR(500)  NOT NULL DEFAULT '',
        `delivery_city`    VARCHAR(100)  NOT NULL DEFAULT '',
        `delivery_state`   VARCHAR(100)  NOT NULL DEFAULT '',
        `delivery_area`    VARCHAR(100)  NOT NULL DEFAULT '',
        `delivery_fee`     DECIMAL(12,2) NOT NULL DEFAULT 0,
        `subtotal`         DECIMAL(12,2) NOT NULL DEFAULT 0,
        `total_amount`     DECIMAL(12,2) NOT NULL DEFAULT 0,
        `currency`         VARCHAR(5)    NOT NULL DEFAULT 'NGN',
        `country`          VARCHAR(5)    NOT NULL DEFAULT 'NG',
        `payment_ref`      VARCHAR(200)  NOT NULL DEFAULT '',
        `payment_status`   ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
        `payment_gateway`  VARCHAR(20)   NOT NULL DEFAULT 'paystack',
        `status`           ENUM('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
        `items_json`       LONGTEXT,
        `discount_code`    VARCHAR(50)   DEFAULT NULL,
        `discount_amount`  DECIMAL(12,2) NOT NULL DEFAULT 0,
        `idempotency_key`  VARCHAR(100)  DEFAULT NULL,
        `tracking_number`  VARCHAR(100)  DEFAULT NULL,
        `notes`            TEXT,
        `created_at`       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
        `updated_at`       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_uid`  (`uid`),
        INDEX `idx_ref`  (`order_ref`),
        INDEX `idx_idem` (`idempotency_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "wishlists" => "CREATE TABLE IF NOT EXISTS `wishlists` (
        `id`                INT         NOT NULL AUTO_INCREMENT,
        `uid`               VARCHAR(64) NOT NULL,
        `product_id`        INT         NOT NULL,
        `notify_on_restock` TINYINT(1)  NOT NULL DEFAULT 0,
        `created_at`        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uq_uid_product` (`uid`, `product_id`),
        INDEX `idx_uid`        (`uid`),
        INDEX `idx_product_id` (`product_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "loyalty_transactions" => "CREATE TABLE IF NOT EXISTS `loyalty_transactions` (
        `id`          INT AUTO_INCREMENT PRIMARY KEY,
        `uid`         VARCHAR(64)  NOT NULL,
        `points`      INT          NOT NULL DEFAULT 0,
        `type`        ENUM('earn','redeem') NOT NULL DEFAULT 'earn',
        `description` VARCHAR(255) NOT NULL DEFAULT '',
        `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_uid` (`uid`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "notifications" => "CREATE TABLE IF NOT EXISTS `notifications` (
        `id`         INT          NOT NULL AUTO_INCREMENT,
        `uid`        VARCHAR(64)  NOT NULL,
        `title`      VARCHAR(255) NOT NULL DEFAULT '',
        `body`       TEXT         NOT NULL,
        `is_read`    TINYINT(1)   NOT NULL DEFAULT 0,
        `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        INDEX `idx_uid_read` (`uid`, `is_read`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "referrals" => "CREATE TABLE IF NOT EXISTS `referrals` (
        `id`             INT           NOT NULL AUTO_INCREMENT,
        `referrer_uid`   VARCHAR(64)   NOT NULL,
        `referred_email` VARCHAR(200)  NOT NULL DEFAULT '',
        `status`         ENUM('pending','completed') NOT NULL DEFAULT 'pending',
        `bonus_earned`   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        `created_at`     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        INDEX `idx_referrer` (`referrer_uid`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "support_tickets" => "CREATE TABLE IF NOT EXISTS `support_tickets` (
        `id`         INT AUTO_INCREMENT PRIMARY KEY,
        `uid`        VARCHAR(64)  NOT NULL DEFAULT '',
        `email`      VARCHAR(200) NOT NULL DEFAULT '',
        `category`   VARCHAR(100) NOT NULL DEFAULT '',
        `subject`    VARCHAR(255) NOT NULL DEFAULT '',
        `status`     ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_uid`    (`uid`),
        INDEX `idx_status` (`status`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "support_messages" => "CREATE TABLE IF NOT EXISTS `support_messages` (
        `id`         INT AUTO_INCREMENT PRIMARY KEY,
        `ticket_id`  INT NOT NULL,
        `sender`     ENUM('user','admin') NOT NULL DEFAULT 'user',
        `body`       TEXT NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`ticket_id`) REFERENCES `support_tickets`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "audit_logs" => "CREATE TABLE IF NOT EXISTS `audit_logs` (
        `id`         INT AUTO_INCREMENT PRIMARY KEY,
        `admin_id`   INT,
        `action`     VARCHAR(255),
        `target`     VARCHAR(255),
        `details`    TEXT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
];

foreach ($createStatements as $label => $sql) {
    try {
        $db->exec($sql);
        echo "  ✓  `$label`\n";
    } catch (Throwable $e) {
        echo "  ✗  `$label` — " . $e->getMessage() . "\n";
        $allPassed = false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: ALTER TABLE — ADD MISSING COLUMNS TO EXISTING TABLES
// ─────────────────────────────────────────────────────────────────────────────
echo "\n=== STEP 2: Column Migrations (ALTER TABLE … ADD COLUMN IF NOT EXISTS) ===\n";

$alterations = [
    "orders.payment_status"   => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `payment_status` ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending'",
    "orders.payment_gateway"  => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `payment_gateway` VARCHAR(20) NOT NULL DEFAULT 'paystack'",
    "orders.delivery_area"    => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `delivery_area` VARCHAR(100) NOT NULL DEFAULT ''",
    "orders.delivery_city"    => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `delivery_city` VARCHAR(100) NOT NULL DEFAULT ''",
    "orders.delivery_state"   => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `delivery_state` VARCHAR(100) NOT NULL DEFAULT ''",
    "orders.delivery_address" => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `delivery_address` VARCHAR(500) NOT NULL DEFAULT ''",
    "orders.delivery_fee"     => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `delivery_fee` DECIMAL(12,2) NOT NULL DEFAULT 0",
    "orders.subtotal"         => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `subtotal` DECIMAL(12,2) NOT NULL DEFAULT 0",
    "orders.currency"         => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `currency` VARCHAR(5) NOT NULL DEFAULT 'NGN'",
    "orders.country"          => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `country` VARCHAR(5) NOT NULL DEFAULT 'NG'",
    "orders.payment_ref"      => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `payment_ref` VARCHAR(200) NOT NULL DEFAULT ''",
    "orders.items_json"       => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `items_json` LONGTEXT",
    "orders.discount_code"    => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `discount_code` VARCHAR(50) DEFAULT NULL",
    "orders.discount_amount"  => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `discount_amount` DECIMAL(12,2) NOT NULL DEFAULT 0",
    "orders.idempotency_key"  => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `idempotency_key` VARCHAR(100) DEFAULT NULL",
    "orders.tracking_number"  => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `tracking_number` VARCHAR(100) DEFAULT NULL",
    "orders.uid"              => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `uid` VARCHAR(64) NOT NULL DEFAULT ''",
    "orders.customer_phone"   => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `customer_phone` VARCHAR(25) NOT NULL DEFAULT ''",
    "orders.notes"            => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `notes` TEXT",
    "orders.updated_at"       => "ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    "audit_logs.target"       => "ALTER TABLE `audit_logs` ADD COLUMN IF NOT EXISTS `target` VARCHAR(255) DEFAULT NULL",
    "audit_logs.details"      => "ALTER TABLE `audit_logs` ADD COLUMN IF NOT EXISTS `details` TEXT DEFAULT NULL",
    "audit_logs.admin_id"     => "ALTER TABLE `audit_logs` ADD COLUMN IF NOT EXISTS `admin_id` INT DEFAULT NULL",
    "audit_logs.action"       => "ALTER TABLE `audit_logs` ADD COLUMN IF NOT EXISTS `action` VARCHAR(255) DEFAULT NULL",
    "categories.description"  => "ALTER TABLE `categories` ADD COLUMN IF NOT EXISTS `description` TEXT DEFAULT NULL",
    "categories.image_url"    => "ALTER TABLE `categories` ADD COLUMN IF NOT EXISTS `image_url` VARCHAR(500) DEFAULT NULL",
    "categories.slug"         => "ALTER TABLE `categories` ADD COLUMN IF NOT EXISTS `slug` VARCHAR(255) NOT NULL DEFAULT ''",
    "categories.country"      => "ALTER TABLE `categories` ADD COLUMN IF NOT EXISTS `country` ENUM('NG','CA') NOT NULL DEFAULT 'NG'",
    "categories.sort_order"   => "ALTER TABLE `categories` ADD COLUMN IF NOT EXISTS `sort_order` INT DEFAULT 0",
    "users.email_verified"    => "ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `email_verified` TINYINT(1) NOT NULL DEFAULT 0",
    "users.verify_token"      => "ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `verify_token` VARCHAR(128) DEFAULT NULL",
    "users.referral_code"     => "ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `referral_code` VARCHAR(20) DEFAULT NULL",
    "users.avatar"            => "ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `avatar` VARCHAR(500) DEFAULT NULL",
    "users.addresses"         => "ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `addresses` JSON DEFAULT NULL",
    "delivery_fees.active"    => "ALTER TABLE `delivery_fees` ADD COLUMN IF NOT EXISTS `active` TINYINT(1) DEFAULT 1",
    "coupons.max_uses_per_user" => "ALTER TABLE `coupons` ADD COLUMN IF NOT EXISTS `max_uses_per_user` INT DEFAULT NULL",
];

foreach ($alterations as $label => $sql) {
    try {
        $db->exec($sql);
        echo "  ✓  $label\n";
    } catch (Throwable $e) {
        if (str_contains($e->getMessage(), 'Duplicate column')) {
            echo "  –  $label (already exists)\n";
        } else {
            echo "  ✗  $label — " . $e->getMessage() . "\n";
            $allPassed = false;
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: SEED DEFAULT DATA
// ─────────────────────────────────────────────────────────────────────────────
echo "\n=== STEP 3: Seed Default Data ===\n";

$seeds = [
    "admin account"                       => "INSERT IGNORE INTO `admins` (`username`, `password_hash`, `email`) VALUES ('admin', '\$2y\$10\$TKh8H1.PfY5HFNKJ2oQX4u5xrPfMk9V0.kXJOwMbYs9y4ZOoKFoSa', 'admin@xpolaservices.com')",
    "settings: maintenance_enabled"       => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('maintenance_enabled','0')",
    "settings: maintenance_message"       => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('maintenance_message','We are performing scheduled maintenance. Be right back!')",
    "settings: maintenance_estimated_back"=> "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('maintenance_estimated_back','')",
    "settings: maintenance_scheduled_at"  => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('maintenance_scheduled_at','')",
    "settings: site_name"                 => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('site_name','Xpola Services')",
    "settings: support_email"             => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('support_email','support@xpolaservices.com')",
    "settings: support_phone"             => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('support_phone','')",
    "settings: nigeria_tax_rate"          => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('nigeria_tax_rate','0')",
    "settings: canada_tax_rate"           => "INSERT IGNORE INTO `site_settings` (`key`,`value`) VALUES ('canada_tax_rate','0')",
];

foreach ($seeds as $label => $sql) {
    try {
        $db->exec($sql);
        echo "  ✓  $label\n";
    } catch (Throwable $e) {
        echo "  ✗  $label — " . $e->getMessage() . "\n";
        $allPassed = false;
    }
}

// ── Normalise delivery_fees.country values ────────────────────────────────
// The column may be ENUM('nigeria','canada') from an older schema version.
// Simple UPDATEs fail in that case because 'NG'/'CA' aren't valid ENUM values.
// Fix: expand ENUM → UPDATE → shrink ENUM.
echo "\n=== STEP 3.5: Normalise delivery_fees.country ENUM → 'NG'/'CA' ===\n";
try {
    // Check what the column type actually is right now
    $colInfo = $db->query(
        "SELECT COLUMN_TYPE FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME   = 'delivery_fees'
           AND COLUMN_NAME  = 'country'"
    )->fetchColumn();
    echo "  Current column type: $colInfo\n";

    $needsMigration = stripos($colInfo, 'nigeria') !== false || stripos($colInfo, 'canada') !== false;

    if ($needsMigration) {
        echo "  ⚠️  Old ENUM detected — running 3-step migration...\n";

        // Step A: expand ENUM to accept both old and new values simultaneously
        $db->exec("ALTER TABLE `delivery_fees`
                   MODIFY COLUMN `country`
                   ENUM('nigeria','canada','NG','CA') NOT NULL DEFAULT 'NG'");
        echo "  ✓  A: ENUM expanded to ('nigeria','canada','NG','CA')\n";

        // Step B: rewrite old text values to short codes
        $nNg = $db->exec("UPDATE `delivery_fees` SET `country` = 'NG' WHERE LOWER(TRIM(`country`)) = 'nigeria'");
        $nCa = $db->exec("UPDATE `delivery_fees` SET `country` = 'CA' WHERE LOWER(TRIM(`country`)) = 'canada'");
        echo "  ✓  B: Updated $nNg row(s) nigeria→NG, $nCa row(s) canada→CA\n";

        // Step C: lock ENUM down to only the canonical codes
        $db->exec("ALTER TABLE `delivery_fees`
                   MODIFY COLUMN `country`
                   ENUM('NG','CA') NOT NULL DEFAULT 'NG'");
        echo "  ✓  C: ENUM locked to ('NG','CA') DEFAULT 'NG'\n";

    } else {
        // Column is already VARCHAR or ENUM('NG','CA') — safe to UPDATE directly
        $nNg = $db->exec("UPDATE `delivery_fees` SET `country` = 'NG' WHERE LOWER(TRIM(`country`)) IN ('nigeria') AND `country` != 'NG'");
        $nCa = $db->exec("UPDATE `delivery_fees` SET `country` = 'CA' WHERE LOWER(TRIM(`country`)) IN ('canada') AND `country` != 'CA'");
        echo "  ✓  Direct UPDATE: $nNg row(s) →NG, $nCa row(s) →CA\n";
    }
} catch (Throwable $e) {
    echo "  ✗  Country migration failed: " . $e->getMessage() . "\n";
    $allPassed = false;
}

// ── Ensure existing rows have both active flags set ───────────────────────
echo "\n=== STEP 3.6: Sync is_active ↔ active flags ===\n";
$syncFlags = [
    "Set active=1 where is_active=1 and active is NULL" =>
        "UPDATE `delivery_fees` SET `active` = 1 WHERE `is_active` = 1 AND (`active` IS NULL OR `active` = 0)",
    "Set is_active=1 where active=1 and is_active is NULL" =>
        "UPDATE `delivery_fees` SET `is_active` = 1 WHERE `active` = 1 AND (`is_active` IS NULL OR `is_active` = 0)",
];
foreach ($syncFlags as $label => $sql) {
    try {
        $affected = $db->exec($sql);
        echo "  ✓  $label ($affected row(s) updated)\n";
    } catch (Throwable $e) {
        echo "  ✗  $label — " . $e->getMessage() . "\n";
    }
}

$db->exec("SET foreign_key_checks = 1");
echo "\n" . ($allPassed ? "✅ All steps passed.\n" : "⚠️  Some steps failed — review errors above.\n") . "\n";

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: VERIFY TABLES
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 4: Tables in DB ===\n";
$tables = $db->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
echo implode(', ', $tables) . "\n\n";

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5: VERIFY ORDERS COLUMNS
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 5: Orders column check ===\n";
$cols = $db->query("SHOW COLUMNS FROM orders")->fetchAll(PDO::FETCH_COLUMN);
$required = ['payment_status','delivery_area','delivery_city','delivery_state','subtotal','total_amount','currency','country'];
foreach ($required as $col) {
    echo (in_array($col, $cols) ? "  ✓  $col\n" : "  ✗  MISSING: $col\n");
}
echo "\n";

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6: AUTH.PHP LOAD CHECK
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 6: auth.php load check ===\n";
try {
    require_once __DIR__ . '/api/config/auth.php';
    echo "auth.php loaded OK\n\n";
} catch (Throwable $e) {
    echo "FAILED: " . $e->getMessage() . "\n\n";
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 7: ADMIN ACCOUNT CHECK
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 7: Admin account ===\n";
try {
    $row = $db->query("SELECT id, username, email FROM admins LIMIT 1")->fetch(PDO::FETCH_ASSOC);
    echo $row ? "  ✓  Found: " . $row['username'] . " / " . $row['email'] . "\n\n"
              : "  ✗  No admin rows!\n\n";
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n\n";
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 8: PASSWORD CHECK
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 8: Password verify ===\n";
$hash = '$2y$10$TKh8H1.PfY5HFNKJ2oQX4u5xrPfMk9V0.kXJOwMbYs9y4ZOoKFoSa';
$ok   = password_verify('xpola2024', $hash);
echo ($ok ? "  ✓  password_verify('xpola2024') = TRUE — login will work\n\n"
          : "  ✗  Hash mismatch — run: UPDATE admins SET password_hash='\$2y\$10\$TKh8H1...' WHERE username='admin'\n\n");

// ─────────────────────────────────────────────────────────────────────────────
// STEP 9: KEY FILES CHECK
// ─────────────────────────────────────────────────────────────────────────────
echo "=== STEP 9: Key file checks ===\n";
$files = [
    'api/admin/login.php',
    'api/admin/stats.php',
    'api/admin/categories.php',
    'api/admin/orders.php',
    'api/admin/audit.php',
    'api/admin/maintenance.php',
    'api/auth.php',
    'api/utils/upload.php',
    'api/delivery_fees.php',          // <-- added
];
foreach ($files as $f) {
    $path = __DIR__ . '/' . $f;
    if (!file_exists($path)) {
        echo "  ✗  MISSING: $f\n";
    } else {
        $syntax = shell_exec("php -l $path 2>&1") ?: '(shell_exec disabled)';
        $ok2    = str_contains($syntax, 'No syntax errors');
        echo ($ok2 ? "  ✓  $f\n" : "  ✗  $f — $syntax\n");
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 10: UPLOADS DIRECTORY CHECK
// ─────────────────────────────────────────────────────────────────────────────
echo "\n=== STEP 10: Uploads directory ===\n";
$uploadDir = __DIR__ . '/uploads/products/';
if (!is_dir($uploadDir)) {
    if (mkdir($uploadDir, 0755, true)) {
        echo "  ✓  Created: uploads/products/\n";
    } else {
        echo "  ✗  Could not create uploads/products/ — check folder permissions\n";
    }
} else {
    echo "  ✓  uploads/products/ exists\n";
}
$writable = is_writable($uploadDir);
echo ($writable ? "  ✓  uploads/products/ is writable\n" : "  ✗  uploads/products/ is NOT writable — chmod 755 or 775\n");


// ─────────────────────────────────────────────────────────────────────────────
// STEP 11: DELIVERY AREAS DEEP DIAGNOSTIC
// This simulates exactly what the checkout calls:
//   GET /api/delivery_fees.php?active=1&country=NG   (Nigeria)
//   GET /api/delivery_fees.php?active=1&country=CA   (Canada)
// ─────────────────────────────────────────────────────────────────────────────
echo "\n";
echo "╔══════════════════════════════════════════════════════════════════╗\n";
echo "║         STEP 11: DELIVERY AREAS DEEP DIAGNOSTIC                 ║\n";
echo "╚══════════════════════════════════════════════════════════════════╝\n\n";

// 11a — Column structure
echo "── 11a: delivery_fees columns ──────────────────────────────────────\n";
try {
    $colRows = $db->query("SHOW COLUMNS FROM `delivery_fees`")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($colRows as $c) {
        printf("  %-20s  %-30s  null=%-3s  default=%s\n",
            $c['Field'], $c['Type'], $c['Null'], $c['Default'] ?? 'NULL');
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11b — Total row count
echo "\n── 11b: Row counts ─────────────────────────────────────────────────\n";
try {
    $total  = $db->query("SELECT COUNT(*) FROM `delivery_fees`")->fetchColumn();
    $active1= $db->query("SELECT COUNT(*) FROM `delivery_fees` WHERE `is_active` = 1")->fetchColumn();
    $active2= $db->query("SELECT COUNT(*) FROM `delivery_fees` WHERE `active` = 1")->fetchColumn();
    $either = $db->query("SELECT COUNT(*) FROM `delivery_fees` WHERE `is_active` = 1 OR `active` = 1")->fetchColumn();
    echo "  Total rows              : $total\n";
    echo "  WHERE is_active = 1     : $active1\n";
    echo "  WHERE active = 1        : $active2\n";
    echo "  WHERE is_active=1 OR active=1 : $either\n";

    if ($total == 0) {
        echo "\n  ⛔ TABLE IS EMPTY — this is why checkout shows no areas.\n";
        echo "     Seed some rows (see fix at the bottom of this page).\n";
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11c — All distinct country values stored
echo "\n── 11c: Distinct country values in table ───────────────────────────\n";
try {
    $countries = $db->query("SELECT DISTINCT `country`, COUNT(*) as cnt FROM `delivery_fees` GROUP BY `country`")
                    ->fetchAll(PDO::FETCH_ASSOC);
    if (empty($countries)) {
        echo "  (no rows)\n";
    } else {
        foreach ($countries as $r) {
            $hex = bin2hex($r['country']); // expose hidden chars / wrong encoding
            echo "  country='{$r['country']}' ({$r['cnt']} rows) [hex: $hex]\n";
        }
        echo "\n  ℹ️  Checkout passes country='NG' or country='CA'.\n";
        echo "     If you see 'Nigeria', 'NIGERIA', etc above — Step 3.5 should have fixed it.\n";
        echo "     Re-run debug if you just ran the normalisations.\n";
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11d — Simulate the exact checkout query for NG
echo "\n── 11d: Simulate checkout query — country='NG' ─────────────────────\n";
echo "  Query: SELECT id,area,state,country,fee,is_active,active\n";
echo "         FROM delivery_fees WHERE (is_active=1 OR active=1) AND country='NG'\n\n";
try {
    $ngRows = $db->query(
        "SELECT id, area, state, country, fee, is_active, `active`
         FROM `delivery_fees`
         WHERE (`is_active` = 1 OR `active` = 1) AND `country` = 'NG'"
    )->fetchAll(PDO::FETCH_ASSOC);

    if (empty($ngRows)) {
        echo "  ✗  0 rows returned — checkout will show 'No delivery areas'.\n";
    } else {
        echo "  ✓  " . count($ngRows) . " row(s) found:\n";
        foreach ($ngRows as $r) {
            printf("     id=%-4s  area=%-25s  state=%-20s  fee=%-10s  is_active=%s  active=%s\n",
                $r['id'], $r['area'], $r['state'], $r['fee'], $r['is_active'], $r['active']);
        }
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11e — Simulate the exact checkout query for CA
echo "\n── 11e: Simulate checkout query — country='CA' ─────────────────────\n";
echo "  Query: SELECT id,area,state,country,fee,is_active,active\n";
echo "         FROM delivery_fees WHERE (is_active=1 OR active=1) AND country='CA'\n\n";
try {
    $caRows = $db->query(
        "SELECT id, area, state, country, fee, is_active, `active`
         FROM `delivery_fees`
         WHERE (`is_active` = 1 OR `active` = 1) AND `country` = 'CA'"
    )->fetchAll(PDO::FETCH_ASSOC);

    if (empty($caRows)) {
        echo "  –  0 rows for CA (expected if you only serve Nigeria)\n";
    } else {
        echo "  ✓  " . count($caRows) . " row(s) found:\n";
        foreach ($caRows as $r) {
            printf("     id=%-4s  area=%-25s  state=%-20s  fee=%-10s  is_active=%s  active=%s\n",
                $r['id'], $r['area'], $r['state'], $r['fee'], $r['is_active'], $r['active']);
        }
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11f — Dump ALL delivery_fees rows (raw) so nothing is hidden
echo "\n── 11f: ALL rows in delivery_fees (raw dump) ───────────────────────\n";
try {
    $allRows = $db->query("SELECT * FROM `delivery_fees` ORDER BY id")->fetchAll(PDO::FETCH_ASSOC);
    if (empty($allRows)) {
        echo "  (empty table)\n";
    } else {
        foreach ($allRows as $r) {
            echo "  " . json_encode($r) . "\n";
        }
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11g — Check what delivery_fees.php actually does
echo "\n── 11g: delivery_fees.php — file check & first 80 lines ───────────\n";
$dfPath = __DIR__ . '/api/delivery_fees.php';
if (!file_exists($dfPath)) {
    echo "  ✗  FILE MISSING: api/delivery_fees.php\n";
    echo "     This is why the checkout gets nothing — the endpoint doesn't exist.\n";
    echo "     See the sample file template at the bottom of this output.\n";
} else {
    echo "  ✓  File exists\n";
    $lines = file($dfPath);
    $preview = array_slice($lines, 0, 80);
    echo "\n  --- BEGIN api/delivery_fees.php (first 80 lines) ---\n";
    foreach ($preview as $i => $line) {
        echo "  " . ($i + 1) . "\t" . $line;
    }
    echo "\n  --- END PREVIEW ---\n";
}

// 11h — Seed sample NG delivery areas if table is empty
echo "\n── 11h: Auto-seed sample NG delivery areas (if table is empty) ────\n";
try {
    $count = $db->query("SELECT COUNT(*) FROM `delivery_fees`")->fetchColumn();
    if ($count == 0) {
        $sampleAreas = [
            ['Lagos Island',   'Lagos',  'NG', 1500.00],
            ['Lagos Mainland', 'Lagos',  'NG', 1500.00],
            ['Victoria Island','Lagos',  'NG', 2000.00],
            ['Lekki',          'Lagos',  'NG', 2500.00],
            ['Ikeja',          'Lagos',  'NG', 2000.00],
            ['Abuja',          'FCT',    'NG', 3500.00],
            ['Port Harcourt',  'Rivers', 'NG', 4000.00],
        ];
        $stmt = $db->prepare(
            "INSERT INTO `delivery_fees` (`area`, `state`, `country`, `fee`, `is_active`, `active`)
             VALUES (?, ?, ?, ?, 1, 1)"
        );
        foreach ($sampleAreas as [$area, $state, $country, $fee]) {
            $stmt->execute([$area, $state, $country, $fee]);
        }
        echo "  ✓  Seeded " . count($sampleAreas) . " sample delivery areas for NG.\n";
        echo "     Go to Admin → Delivery Areas to edit/add your real zones.\n";
    } else {
        echo "  –  Table has $count row(s) — skipping auto-seed.\n";
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// 11i — Verify final state after seed
echo "\n── 11i: Final verification after seed ─────────────────────────────\n";
try {
    $final = $db->query(
        "SELECT id, area, state, country, fee FROM `delivery_fees`
         WHERE (`is_active` = 1 OR `active` = 1) AND `country` = 'NG'"
    )->fetchAll(PDO::FETCH_ASSOC);
    echo "  Active NG areas now: " . count($final) . "\n";
    foreach ($final as $r) {
        printf("     ✓  [%s] %s, %s — ₦%s\n", $r['id'], $r['area'], $r['state'], number_format($r['fee']));
    }
} catch (Throwable $e) {
    echo "  ✗  " . $e->getMessage() . "\n";
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 12: delivery_fees.php TEMPLATE (shown if file is missing)
// ─────────────────────────────────────────────────────────────────────────────
$dfPath = __DIR__ . '/api/delivery_fees.php';
if (!file_exists($dfPath)) {
echo "\n";
echo "╔══════════════════════════════════════════════════════════════════╗\n";
echo "║   STEP 12: SAMPLE api/delivery_fees.php (copy to your server)   ║\n";
echo "╚══════════════════════════════════════════════════════════════════╝\n";
echo "\nCreate the file at  api/delivery_fees.php  with this content:\n\n";
echo htmlspecialchars('
<?php
/**
 * GET /api/delivery_fees.php?active=1&country=NG
 * Returns active delivery areas for the given country.
 */
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(204); exit; }

require_once __DIR__ . "/config/db.php";

$country = strtoupper(trim($_GET["country"] ?? "NG"));
if (!in_array($country, ["NG", "CA"])) {
    http_response_code(400);
    echo json_encode(["success"=>false,"message"=>"Invalid country"]);
    exit;
}

try {
    $db   = getDB();
    $stmt = $db->prepare(
        "SELECT id, area, state, country, fee,
                COALESCE(currency, IF(country=\'CA\',\'CAD\',\'NGN\')) AS currency
         FROM delivery_fees
         WHERE (is_active = 1 OR active = 1)
           AND country = ?
         ORDER BY state, area"
    );
    $stmt->execute([$country]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Cast types
    foreach ($rows as &$r) {
        $r["id"]  = (int)  $r["id"];
        $r["fee"] = (float)$r["fee"];
    }
    unset($r);

    echo json_encode(["success"=>true,"data"=>$rows]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
');
}

echo "\n\n=== DONE ===\n";
echo "Default login:  username=admin  password=xpola2024\n";
echo "⚠️  DELETE THIS FILE from the server immediately after reviewing!\n";
echo '</pre>';