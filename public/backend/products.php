<?php
/**
 * SPORTZONE - Products API
 * Fetches sports equipment with optional sport, brand, and search filters
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
?>
