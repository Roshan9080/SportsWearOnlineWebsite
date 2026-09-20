<?php
/**
 * SPORTZONE - Admin Product Management API
 * Supports CRUD (Create, Read, Update, Delete)
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
?>
