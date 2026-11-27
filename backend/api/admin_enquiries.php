
<?php

session_start();
header("Content-Type: application/json");

require_once "../database.php";

if (!isset($_SESSION["admin_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Admin authentication required."
    ]);
    exit;
}

$sql = "SELECT enquiry_id, customer_name, email, phone,
               subject, message, enquiry_status, created_at
        FROM enquiries
        ORDER BY created_at DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve enquiries."
    ]);
    exit;
}

$enquiries = [];

while ($row = $result->fetch_assoc()) {
    $enquiries[] = $row;
}

echo json_encode([
    "success" => true,
    "enquiries" => $enquiries
]);

$conn->close();

?>
