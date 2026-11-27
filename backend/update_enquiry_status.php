
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

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id = (int) ($data["enquiry_id"] ?? 0);
$status = trim($data["enquiry_status"] ?? "");

$allowedStatuses = ["New", "In Progress", "Resolved"];

if ($id <= 0 || !in_array($status, $allowedStatuses, true)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid enquiry ID or status."
    ]);
    exit;
}

$sql = "UPDATE enquiries
        SET enquiry_status = ?
        WHERE enquiry_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);

if ($stmt->execute() && $stmt->affected_rows >= 0) {
    echo json_encode([
        "success" => true,
        "message" => "Enquiry status updated successfully."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to update enquiry status."
    ]);
}

$stmt->close();
$conn->close();

?>
