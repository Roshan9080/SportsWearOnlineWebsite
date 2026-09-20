<?php
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
?>
