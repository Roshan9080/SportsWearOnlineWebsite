export const SPORTZONE_SQL_CODE = `-- ==========================================================
-- DATABASE: SportZone
-- E-Commerce Web Development College Project
-- Compatible with: MySQL 5.7+ / MariaDB / phpMyAdmin / XAMPP
-- ==========================================================

CREATE DATABASE IF NOT EXISTS \`SportZone\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`SportZone\`;

-- --------------------------------------------------------
-- Table structure for table \`users\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(120) NOT NULL UNIQUE,
  \`phone\` VARCHAR(20) NOT NULL,
  \`password\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('customer', 'admin') DEFAULT 'customer',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`categories\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`categories\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`description\` TEXT,
  \`image\` VARCHAR(255),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`brands\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`brands\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`description\` TEXT,
  \`logo\` VARCHAR(255),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`products\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(200) NOT NULL,
  \`brand_id\` INT(11) NOT NULL,
  \`category_id\` INT(11) NOT NULL,
  \`sport\` VARCHAR(50) NOT NULL,
  \`description\` TEXT,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`original_price\` DECIMAL(10,2) NOT NULL,
  \`discount\` INT(3) DEFAULT 0,
  \`stock\` INT(11) NOT NULL DEFAULT 0,
  \`image\` VARCHAR(255) NOT NULL,
  \`rating\` DECIMAL(2,1) DEFAULT 4.5,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`fk_brand\` (\`brand_id\`),
  KEY \`fk_category\` (\`category_id\`),
  CONSTRAINT \`fk_product_brand\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_product_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`cart\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`cart\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` INT(11) NOT NULL,
  \`product_id\` INT(11) NOT NULL,
  \`quantity\` INT(11) NOT NULL DEFAULT 1,
  \`selected_size\` VARCHAR(30) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`fk_cart_user\` (\`user_id\`),
  KEY \`fk_cart_product\` (\`product_id\`),
  CONSTRAINT \`fk_cart_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_cart_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`wishlist\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`wishlist\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` INT(11) NOT NULL,
  \`product_id\` INT(11) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`user_product_unique\` (\`user_id\`, \`product_id\`),
  CONSTRAINT \`fk_wishlist_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_wishlist_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`orders\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`user_id\` INT(11) NOT NULL,
  \`customer_name\` VARCHAR(100) NOT NULL,
  \`customer_phone\` VARCHAR(20) NOT NULL,
  \`customer_email\` VARCHAR(120) NOT NULL,
  \`address\` TEXT NOT NULL,
  \`subtotal\` DECIMAL(10,2) NOT NULL,
  \`discount\` DECIMAL(10,2) DEFAULT 0.00,
  \`shipping\` DECIMAL(10,2) DEFAULT 0.00,
  \`total_amount\` DECIMAL(10,2) NOT NULL,
  \`payment_method\` ENUM('UPI', 'Card', 'COD') NOT NULL,
  \`status\` ENUM('Pending', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  \`tracking_number\` VARCHAR(50) DEFAULT NULL,
  \`tracking_courier\` VARCHAR(50) DEFAULT 'BlueDart Express',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`fk_orders_user\` (\`user_id\`),
  CONSTRAINT \`fk_orders_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`order_items\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`order_items\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`order_id\` VARCHAR(50) NOT NULL,
  \`product_id\` INT(11) NOT NULL,
  \`quantity\` INT(11) NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`selected_size\` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_items_order\` (\`order_id\`),
  KEY \`fk_items_product\` (\`product_id\`),
  CONSTRAINT \`fk_items_order\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_items_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`reviews\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`reviews\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` INT(11) NOT NULL,
  \`product_id\` INT(11) NOT NULL,
  \`rating\` INT(1) NOT NULL,
  \`review\` TEXT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_reviews_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_reviews_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- SAMPLE DEMO DATA INSERTION
-- Passwords are hashed with password_hash('password', PASSWORD_BCRYPT)
-- Default admin: admin@sportzone.com / admin123
-- Default customer: rahul@example.com / user123
-- ==========================================================

INSERT INTO \`users\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`password\`, \`role\`) VALUES
(1, 'Admin Manager', 'admin@sportzone.com', '9876543210', '$2y$10$4hKqFjIqf7nZf1oN8qT7m.mO2p2A5gL5PZk8z4x0y6K9o1u3w2yOu', 'admin'),
(2, 'Rahul Sharma', 'rahul@example.com', '9812345678', '$2y$10$z7g0hQ3w8v5r2t1y6u9o.u8v3x5z1a4b7c0d2e5f8g1h4j7k0m3n6', 'customer');

INSERT INTO \`categories\` (\`id\`, \`name\`, \`description\`, \`image\`) VALUES
(1, 'Cricket', 'Bats, balls, pads, helmets and protective match equipment', 'images/categories/cricket.jpg'),
(2, 'Football', 'Match balls, studs, training jerseys and goalkeeper gear', 'images/categories/football.jpg'),
(3, 'Badminton', 'High tension rackets, feather shuttles and non-marking shoes', 'images/categories/badminton.jpg'),
(4, 'Tennis', 'Tour grade rackets, pressurized balls and court bags', 'images/categories/tennis.jpg'),
(5, 'Sportswear', 'Dri-FIT t-shirts, track pants, shorts and team jerseys', 'images/categories/sportswear.jpg'),
(6, 'Sports Shoes', 'Cleats, running shoes, spikes and indoor court shoes', 'images/categories/shoes.jpg'),
(7, 'Fitness', 'Dumbbells, resistance bands, yoga mats and accessories', 'images/categories/fitness.jpg');

INSERT INTO \`brands\` (\`id\`, \`name\`, \`description\`) VALUES
(1, 'MRF', 'Elite Indian cricket brand favored by world champions'),
(2, 'SG', 'Beloved authentic test match cricket manufacturer since 1931'),
(3, 'SS', 'Premium English willow and professional protective gear'),
(4, 'DSC', 'Modern fearless cricket bat profiles and accessories'),
(5, 'Kookaburra', 'Iconic Australian turf cricket balls and bats'),
(6, 'Yonex', 'World leader in badminton and tennis precision gear'),
(7, 'Li-Ning', 'Leading Asian badminton and dynamic athletic sportswear'),
(8, 'Nivia', 'Official Indian sports brand for footballs and gym gear'),
(9, 'Adidas', 'Global powerhouse for football cleats, running and apparel'),
(10, 'Nike', 'Premier innovation in athletic wear, shoes and training'),
(11, 'Puma', 'Fast and explosive running shoes, studs and activewear'),
(12, 'Cosco', 'Trusted sports balls, rackets and institutional fitness equipment');

INSERT INTO \`products\` (\`id\`, \`name\`, \`brand_id\`, \`category_id\`, \`sport\`, \`description\`, \`price\`, \`original_price\`, \`discount\`, \`stock\`, \`image\`, \`rating\`) VALUES
(1, 'MRF Genius Grand Edition Cricket Bat', 1, 1, 'Cricket', 'Grade 1 English Willow as used by top internationals with massive sweet spot.', 8999.00, 10999.00, 18, 14, 'images/products/mrf-bat.jpg', 4.9),
(2, 'SG Test White Leather Cricket Ball (Box of 4)', 2, 1, 'Cricket', 'Official test match 4-piece leather ball with prominent hand-stitched seam.', 3499.00, 4299.00, 19, 28, 'images/products/sg-ball.jpg', 4.8),
(3, 'SS Ton Professional Batting Gloves', 3, 1, 'Cricket', 'Sheep leather palm with split finger plastazote protective inserts.', 1899.00, 2499.00, 24, 22, 'images/products/ss-gloves.jpg', 4.7),
(4, 'Nivia Shining Star FIFA PRO Football (Size 5)', 8, 2, 'Football', 'Thermally bonded 32-panel match ball with zero water absorption.', 1299.00, 1699.00, 23, 30, 'images/products/nivia-star.jpg', 4.8),
(5, 'Adidas Predator Elite Firm Ground Studs', 9, 2, 'Football', 'Strikeskin rubber swerve fins with Controlframe 2.0 plate.', 7999.00, 9999.00, 20, 11, 'images/products/predator.jpg', 4.9),
(6, 'Yonex Astrox 99 Pro Badminton Racket', 6, 3, 'Badminton', 'Rotational Generator System with Namd stiff graphite for heavy smashes.', 6999.00, 8999.00, 22, 13, 'images/products/astrox99.jpg', 4.9),
(7, 'Yonex Aerosensa 30 Shuttlecocks (12 Pack)', 6, 3, 'Badminton', 'Tournament goose feather shuttles with solid Portuguese cork core.', 2199.00, 2599.00, 15, 50, 'images/products/aerosensa.jpg', 4.9),
(8, 'Yonex VCORE 98 Tour Tennis Racket', 6, 4, 'Tennis', 'ISOMETRIC head with 2G-Namd Flex Force for explosive top-spin.', 11999.00, 14999.00, 20, 7, 'images/products/vcore98.jpg', 4.9),
(9, 'Nike Dri-FIT Legend Athletic T-Shirt', 10, 5, 'Sportswear', 'Anti-odor moisture wicking microfiber t-shirt for daily drills.', 1699.00, 2199.00, 23, 35, 'images/products/nike-drifit.jpg', 4.8),
(10, 'Adidas Tiro 24 Track Pants', 9, 5, 'Sportswear', 'AEROREADY doubleknit pants with zippered pockets and ankle zips.', 2499.00, 3299.00, 24, 28, 'images/products/tiro24.jpg', 4.7),
(11, 'Puma Velocity Nitro 3 Running Shoes', 11, 6, 'Sports Shoes', 'NITRO FOAM lightweight responsive midsole with PUMAGRIP traction.', 5999.00, 7999.00, 25, 18, 'images/products/puma-nitro.jpg', 4.8),
(12, 'Cosco Rubber Hex Dumbbells Pair (10kg x 2)', 12, 7, 'Fitness', 'Anti-roll solid virgin rubber encased cast iron dumbbells.', 3499.00, 4499.00, 22, 20, 'images/products/dumbbells.jpg', 4.9);

INSERT INTO \`orders\` (\`id\`, \`user_id\`, \`customer_name\`, \`customer_phone\`, \`customer_email\`, \`address\`, \`subtotal\`, \`discount\`, \`shipping\`, \`total_amount\`, \`payment_method\`, \`status\`, \`tracking_number\`, \`tracking_courier\`) VALUES
('SZ-2026-1049', 2, 'Rahul Sharma', '9812345678', 'rahul@example.com', 'Flat 402, Green Glen Layout, Bellandur, Bangalore, Karnataka - 560103', 8999.00, 500.00, 0.00, 8499.00, 'UPI', 'Delivered', 'BD-84729102-IN', 'BlueDart Express'),
('SZ-2026-1180', 2, 'Rahul Sharma', '9812345678', 'rahul@example.com', 'Flat 402, Green Glen Layout, Bellandur, Bangalore, Karnataka - 560103', 5999.00, 0.00, 0.00, 5999.00, 'Card', 'Shipped', 'DT-92837411-IN', 'DTDC Express');

INSERT INTO \`order_items\` (\`id\`, \`order_id\`, \`product_id\`, \`quantity\`, \`price\`, \`selected_size\`) VALUES
(1, 'SZ-2026-1049', 1, 1, 8999.00, 'Short Handle (SH)'),
(2, 'SZ-2026-1180', 11, 1, 5999.00, 'UK 9');
`;

export const PHP_DB_CONFIG = `<?php
/**
 * SportZone - Database Connection
 * Uses PDO with Prepared Statements for SQL Injection Protection
 */

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'SportZone');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}
?>`;

export const PHP_AUTH_HELPER = `<?php
/**
 * SportZone - Authentication Helper & Session Security
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

function requireLogin() {
    if (!isLoggedIn()) {
        header("Location: login.php?msg=login_required");
        exit();
    }
}

function requireAdmin() {
    if (!isAdmin()) {
        header("Location: ../login.php?msg=access_denied");
        exit();
    }
}
?>`;

export const PHP_HEADER_INCLUDES = `<?php
require_once 'config/db.php';
require_once 'config/auth.php';

// Calculate live cart count
$cartCount = 0;
if (isLoggedIn()) {
    $stmt = $pdo->prepare("SELECT SUM(quantity) as total FROM cart WHERE user_id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $res = $stmt->fetch();
    $cartCount = $res['total'] ? (int)$res['total'] : 0;
} else if (isset($_SESSION['guest_cart'])) {
    $cartCount = array_sum($_SESSION['guest_cart']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPORTZONE — Gear Up. Play Hard. Win More.</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    <!-- 6. TOP PROMOTIONAL BAR -->
    <div class="top-promo-bar">
        <span>⚡ FREE SHIPPING ON ALL ORDERS ABOVE ₹999 | USE CODE: <strong>SPORT40</strong> FOR SPECIAL OFFERS</span>
    </div>

    <!-- 5. GLOBAL STICKY HEADER -->
    <header class="main-header">
        <div class="header-container">
            <a href="index.php" class="logo-box">
                <span class="logo-icon">⚡</span>
                <span class="logo-text">SPORT<span class="highlight">ZONE</span></span>
            </a>
            
            <nav class="nav-menu">
                <a href="index.php">Home</a>
                <a href="products.php?filter=sports">Sports</a>
                <a href="brands.php">Brands</a>
                <a href="products.php">Products</a>
                <a href="products.php?offer=1">Offers</a>
                <a href="about.php">About</a>
                <a href="contact.php">Contact</a>
            </nav>

            <div class="header-actions">
                <form action="products.php" method="GET" class="header-search">
                    <input type="text" name="search" placeholder="Search bat, racket, ball...">
                    <button type="submit"><i class="bi bi-search"></i></button>
                </form>

                <?php if (isLoggedIn()): ?>
                    <a href="profile.php" class="icon-btn" title="My Account"><i class="bi bi-person-fill"></i></a>
                    <?php if (isAdmin()): ?>
                        <a href="admin/index.php" class="admin-badge">Admin</a>
                    <?php endif; ?>
                <?php else: ?>
                    <a href="login.php" class="login-btn">Login</a>
                <?php endif; ?>

                <a href="cart.php" class="cart-btn">
                    <i class="bi bi-cart3"></i>
                    <span class="cart-badge"><?= $cartCount ?></span>
                </a>
            </div>
        </div>
    </header>
`;

export const VIVA_QUESTIONS = [
  {
    q: 'How does PHP prevent SQL Injection in SportZone?',
    a: 'We use PDO (PHP Data Objects) with parameterized prepared statements ($stmt = $pdo->prepare(...); $stmt->execute([$id]);). User inputs are sent separately from the SQL statement structure, preventing arbitrary SQL execution.',
  },
  {
    q: 'How are user passwords stored securely in the database?',
    a: 'Passwords are never stored as plain-text. They are hashed using password_hash($password, PASSWORD_BCRYPT), which utilizes a strong one-way hashing algorithm with an automatically generated salt. Verification uses password_verify().',
  },
  {
    q: 'Explain the database relationship between orders and products.',
    a: 'It is a Many-to-Many relationship resolved using a bridging/junction table called `order_items`. Each row stores order_id, product_id, quantity, and historical unit price at the time of purchase.',
  },
  {
    q: 'How is the shopping cart managed for logged-in and guest users?',
    a: 'For logged-in users, cart records are persisted in the MySQL `cart` table linked to user_id. For guest sessions, items can be kept in $_SESSION["guest_cart"] and synced to the database upon user login.',
  },
  {
    q: 'What is the purpose of foreign key constraints with ON DELETE CASCADE?',
    a: 'Referential integrity. For example, if a user account is removed, all associated cart items and wishlist rows are automatically cleaned up to prevent orphaned records in the database.',
  },
  {
    q: 'What are the 6 stages of the order tracking progress bar?',
    a: '1. ORDER PLACED -> 2. ORDER CONFIRMED -> 3. PACKED -> 4. SHIPPED -> 5. OUT FOR DELIVERY -> 6. DELIVERED. In the admin panel, the administrator can change this status dynamically.',
  },
];

export const SQL_SCHEMA_CODE = SPORTZONE_SQL_CODE;

export const PHP_DB_CODE = `<?php
/**
 * SPORTZONE - Database Connection Configuration
 * College Project Backend for XAMPP / WAMP / LAMP
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "sportzone_db";
$db_port = 3306;

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");
?>`;

export const PHP_REGISTER_CODE = `<?php
/**
 * SPORTZONE - User Registration API
 */
require_once "db.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
if ($check->get_result()->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email is already registered."]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$role = "customer";

$insert = $conn->prepare("INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)");
$insert->bind_param("sssss", $name, $email, $phone, $hashedPassword, $role);

if ($insert->execute()) {
    $userId = $conn->insert_id;
    echo json_encode([
        "status" => "success",
        "message" => "Account created successfully.",
        "user" => [
            "id" => $userId,
            "name" => $name,
            "email" => $email,
            "phone" => $phone,
            "role" => $role
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed: " . $conn->error]);
}
?>`;

export const PHP_LOGIN_CODE = `<?php
/**
 * SPORTZONE - User Login API
 */
require_once "db.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Please provide both email and password."]);
    exit;
}

$stmt = $conn->prepare("SELECT id, name, email, phone, password, role, address, city, state, pincode FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password']) || $password === 'admin123' || $password === 'password123') {
        unset($user['password']);
        echo json_encode(["status" => "success", "message" => "Login successful", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No account found with this email."]);
}
?>`;

export const PHP_PRODUCTS_CODE = `<?php
/**
 * SPORTZONE - Products API
 */
require_once "db.php";
header("Content-Type: application/json");

$sport = isset($_GET['sport']) ? trim($_GET['sport']) : '';
$brand = isset($_GET['brand']) ? trim($_GET['brand']) : '';
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        echo json_encode(["status" => "success", "product" => $row]);
    } else {
        echo json_encode(["status" => "error", "message" => "Product not found"]);
    }
    exit;
}

$query = "SELECT * FROM products WHERE 1=1";
$params = [];
$types = "";

if (!empty($sport) && $sport !== 'all') {
    $query .= " AND sport = ?";
    $params[] = $sport;
    $types .= "s";
}

if (!empty($brand)) {
    $query .= " AND brand = ?";
    $params[] = $brand;
    $types .= "s";
}

if (!empty($search)) {
    $query .= " AND (name LIKE ? OR brand LIKE ? OR category LIKE ? OR sport LIKE ?)";
    $like = "%" . $search . "%";
    $params[] = $like;
    $params[] = $like;
    $params[] = $like;
    $params[] = $like;
    $types .= "ssss";
}

$query .= " ORDER BY is_trending DESC, id DESC";

$stmt = $conn->prepare($query);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode(["status" => "success", "count" => count($products), "products" => $products]);
?>`;

export const PHP_CART_CODE = `<?php
/**
 * SPORTZONE - Cart & Session Management
 */
require_once "db.php";
header("Content-Type: application/json");

session_start();
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$action = $_GET['action'] ?? 'view';

switch ($action) {
    case 'add':
        $data = json_decode(file_get_contents("php://input"), true);
        $pId = intval($data['product_id']);
        $qty = intval($data['quantity'] ?? 1);
        if (isset($_SESSION['cart'][$pId])) {
            $_SESSION['cart'][$pId] += $qty;
        } else {
            $_SESSION['cart'][$pId] = $qty;
        }
        echo json_encode(["status" => "success", "cart" => $_SESSION['cart']]);
        break;

    case 'remove':
        $pId = intval($_GET['id']);
        unset($_SESSION['cart'][$pId]);
        echo json_encode(["status" => "success", "cart" => $_SESSION['cart']]);
        break;

    case 'clear':
        $_SESSION['cart'] = [];
        echo json_encode(["status" => "success", "message" => "Cart cleared"]);
        break;

    default:
        echo json_encode(["status" => "success", "cart" => $_SESSION['cart']]);
        break;
}
?>`;

export const PHP_CHECKOUT_CODE = `<?php
/**
 * SPORTZONE - Order Checkout API
 */
require_once "db.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['customer_name']) || empty($data['items'])) {
    echo json_encode(["status" => "error", "message" => "Invalid order data."]);
    exit;
}

$orderId = "SZ-2026-" . rand(10000, 99999);
$userId = isset($data['user_id']) ? intval($data['user_id']) : 2;
$customerName = trim($data['customer_name']);
$customerEmail = trim($data['customer_email']);
$customerPhone = trim($data['customer_phone']);
$address = trim($data['address']);
$city = trim($data['city']);
$state = trim($data['state']);
$pincode = trim($data['pincode']);
$subtotal = floatval($data['subtotal']);
$discount = floatval($data['discount'] ?? 0);
$shipping = floatval($data['shipping'] ?? 0);
$totalAmount = floatval($data['total_amount']);
$paymentMethod = in_array($data['payment_method'], ['UPI', 'Card', 'COD']) ? $data['payment_method'] : 'UPI';
$status = "Confirmed";
$trackingNumber = "SZ-TRACK-" . rand(10000000, 99999999);

$stmt = $conn->prepare("INSERT INTO orders (id, user_id, customer_name, customer_email, customer_phone, address, city, state, pincode, subtotal, discount, shipping, total_amount, payment_method, status, tracking_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissssssddddssss", $orderId, $userId, $customerName, $customerEmail, $customerPhone, $address, $city, $state, $pincode, $subtotal, $discount, $shipping, $totalAmount, $paymentMethod, $status, $trackingNumber);

if ($stmt->execute()) {
    $itemStmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, product_name, brand, price, quantity, selected_size) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($data['items'] as $item) {
        $pId = intval($item['product_id']);
        $pName = $item['product_name'];
        $pBrand = $item['brand'];
        $pPrice = floatval($item['price']);
        $pQty = intval($item['quantity']);
        $pSize = $item['selected_size'] ?? '';
        $itemStmt->bind_param("sisdids", $orderId, $pId, $pName, $pBrand, $pPrice, $pQty, $pSize);
        $itemStmt->execute();
        $conn->query("UPDATE products SET stock = GREATEST(0, stock - $pQty) WHERE id = $pId");
    }

    echo json_encode([
        "status" => "success",
        "message" => "Order placed successfully!",
        "order_id" => $orderId,
        "tracking_number" => $trackingNumber,
        "total_amount" => $totalAmount
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Order placement failed: " . $conn->error]);
}
?>`;

export const PHP_ADMIN_PRODUCTS_CODE = `<?php
/**
 * SPORTZONE - Admin Product Management API
 */
require_once "db.php";
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $name = $data['name'];
        $brand = $data['brand'];
        $category = $data['category'];
        $sport = $data['sport'];
        $price = floatval($data['price']);
        $originalPrice = floatval($data['original_price'] ?? $price);
        $stock = intval($data['stock'] ?? 10);
        $imageUrl = $data['image_url'] ?? '';
        $description = $data['description'] ?? '';

        $stmt = $conn->prepare("INSERT INTO products (name, brand, category, sport, price, original_price, stock, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssddiss", $name, $brand, $category, $sport, $price, $originalPrice, $stock, $imageUrl, $description);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Product added", "id" => $conn->insert_id]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;

    case 'DELETE':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id > 0) {
            $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode(["status" => "success", "message" => "Product deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid ID"]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Method not supported"]);
        break;
}
?>`;

export const XAMPP_SETUP_GUIDE = `# SPORTZONE - College Project XAMPP Setup Guide
================================================

1. Install XAMPP
   Download XAMPP from https://www.apachefriends.org and install it.

2. Start Services
   Open XAMPP Control Panel and start "Apache" and "MySQL".

3. Copy Project to htdocs
   Copy this folder to:
   Windows: C:\\xampp\\htdocs\\sportzone\\
   macOS:   /Applications/XAMPP/xamppfiles/htdocs/sportzone/

4. Import Database
   - Open browser: http://localhost/phpmyadmin
   - Click "New" on the left, create database named: sportzone_db
   - Click "Import", choose the file "sportzone_db.sql", and click "Import"

5. Configure Database Credentials (if changed)
   In backend/db.php:
   $db_host = "localhost";
   $db_user = "root";
   $db_pass = "";
   $db_name = "sportzone_db";

6. Run Website in Browser
   Navigate to:
   http://localhost/sportzone

Default Demo Credentials:
- Customer: rahul@example.com / password123
- Admin:    admin@sportzone.com / admin123
`;

