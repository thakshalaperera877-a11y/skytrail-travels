
<?php

header("Content-Type: application/json");

require_once "../database.php";

// Allow POST requests only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}

// Get JSON data from React
$data = json_decode(file_get_contents("php://input"), true);

// Get booking details
$customer_id = $data["customer_id"] ?? null;
$destination_id = $data["destination_id"] ?? null;
$package_id = $data["package_id"] ?? null;
$travel_date = $data["travel_date"] ?? "";
$travellers = $data["travellers"] ?? 0;
$total_amount = $data["total_amount"] ?? 0;
$special_request = $data["special_request"] ?? "";

// Validate required fields
if (
    empty($customer_id) ||
    empty($destination_id) ||
    empty($travel_date) ||
    empty($travellers) ||
    empty($total_amount)
) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please provide all required booking details."
    ]);

    exit;
}

// Insert booking into database
$sql = "INSERT INTO bookings
        (customer_id, package_id, destination_id,
         travel_date, travellers, total_amount, special_request)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "iiisids",
    $customer_id,
    $package_id,
    $destination_id,
    $travel_date,
    $travellers,
    $total_amount,
    $special_request
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Booking request saved successfully!",
        "booking_id" => $stmt->insert_id
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to save booking."
    ]);

}

$stmt->close();
$conn->close();

?>
