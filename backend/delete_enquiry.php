
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

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid enquiry ID."
    ]);
    exit;
}

$sql = "DELETE FROM enquiries WHERE enquiry_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute() && $stmt->affected_rows === 1) {
    echo json_encode([
        "success" => true,
        "message" => "Enquiry deleted successfully."
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Enquiry not found or could not be deleted."
    ]);
}

$stmt->close();
$conn->close();

?>
