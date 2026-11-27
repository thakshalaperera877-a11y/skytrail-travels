
<?php

header("Content-Type: application/json");

require_once "../database.php";

// Allow GET requests only
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}

// Get customer ID
$customer_id = filter_input(
    INPUT_GET,
    "customer_id",
    FILTER_VALIDATE_INT
);

// Validate customer ID
if (!$customer_id || $customer_id <= 0) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid customer ID."
    ]);

    exit;
}

// Retrieve customer bookings
$sql = "SELECT
            b.booking_id,
            b.travel_date,
            b.travellers,
            b.total_amount,
            b.special_request,
            b.booking_status,
            b.created_at,
            d.name AS destination_name,
            p.package_name
        FROM bookings b
        LEFT JOIN destinations d
            ON b.destination_id = d.destination_id
        LEFT JOIN packages p
            ON b.package_id = p.package_id
        WHERE b.customer_id = ?
        ORDER BY b.created_at DESC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Database query failed."
    ]);

    exit;
}

$stmt->bind_param("i", $customer_id);
$stmt->execute();

$result = $stmt->get_result();

$bookings = [];

while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode([
    "success" => true,
    "bookings" => $bookings
]);

$stmt->close();
$conn->close();

?>
