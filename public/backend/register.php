<?php
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
?>
