<?php
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

        // Reduce stock in products table
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
?>
