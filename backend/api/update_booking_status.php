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
$status = trim($data["booking_status"] ?? "");
$allowed = ["Pending", "Confirmed", "Cancelled"];

if (!$booking_id || !in_array($status, $allowed, true)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid booking ID or status."]);
    exit;
}

$stmt = $conn->prepare("UPDATE bookings SET booking_status = ? WHERE booking_id = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Unable to prepare update."]);
    exit;
}
$stmt->bind_param("si", $status, $booking_id);

if ($stmt->execute() && $stmt->affected_rows >= 0) {
    echo json_encode(["success" => true, "message" => "Booking status updated successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Unable to update booking status."]);
}
$stmt->close();
$conn->close();
?>
