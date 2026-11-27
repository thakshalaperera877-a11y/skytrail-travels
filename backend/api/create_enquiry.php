
<?php

header("Content-Type: application/json");

require_once "../database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data["customer_name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$subject = trim($data["subject"] ?? "");
$message = trim($data["message"] ?? "");

if (
    $name === "" ||
    $email === "" ||
    $phone === "" ||
    $subject === "" ||
    $message === ""
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please complete all fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

$sql = "INSERT INTO enquiries
        (customer_name, email, phone, subject, message, enquiry_status)
        VALUES (?, ?, ?, ?, ?, 'New')";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare enquiry."
    ]);
    exit;
}

$stmt->bind_param(
    "sssss",
    $name,
    $email,
    $phone,
    $subject,
    $message
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Your enquiry has been submitted successfully!"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to submit your enquiry."
    ]);
}

$stmt->close();
$conn->close();

?>
