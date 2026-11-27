<?php
session_start();
header("Content-Type: application/json");
require_once "../database.php";

if (empty($_SESSION["admin_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Admin login required."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$booking_id = filter_var($data["booking_id"] ?? null, FILTER_VALIDATE_INT);

if (!$booking_id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid booking ID."]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM bookings WHERE booking_id = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Unable to prepare delete."]);
    exit;
}
$stmt->bind_param("i", $booking_id);

if ($stmt->execute() && $stmt->affected_rows === 1) {
    echo json_encode(["success" => true, "message" => "Booking deleted successfully."]);
} else {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Booking was not found or could not be deleted."]);
}
$stmt->close();
$conn->close();
?>
