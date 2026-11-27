<?php
session_start();
header("Content-Type: application/json");
require_once "../database.php";

if (empty($_SESSION["admin_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Admin login required."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$sql = "SELECT
            b.booking_id,
            b.customer_id,
            b.package_id,
            b.destination_id,
            b.travel_date,
            b.travellers,
            b.total_amount,
            b.special_request,
            b.booking_status,
            b.created_at,
            c.first_name,
            c.last_name,
            c.email,
            d.name AS destination_name,
            p.package_name
        FROM bookings b
        LEFT JOIN customers c ON b.customer_id = c.customer_id
        LEFT JOIN destinations d ON b.destination_id = d.destination_id
        LEFT JOIN packages p ON b.package_id = p.package_id
        ORDER BY b.created_at DESC";

$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Unable to retrieve bookings."]);
    $conn->close();
    exit;
}

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode(["success" => true, "bookings" => $bookings]);
$conn->close();
?>
