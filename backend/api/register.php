
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

// Get registration data from React
$data = json_decode(file_get_contents("php://input"), true);

// Get customer details
$first_name = trim($data["first_name"] ?? "");
$last_name = trim($data["last_name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$password = $data["password"] ?? "";

// Validate required fields
if (
    $first_name === "" ||
    $last_name === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($password) < 8
) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please enter valid details. Password must contain at least 8 characters."
    ]);

    exit;
}

// Check whether email already exists
$check = $conn->prepare(
    "SELECT customer_id FROM customers WHERE email = ?"
);

$check->bind_param("s", $email);
$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {
    http_response_code(409);

    echo json_encode([
        "success" => false,
        "message" => "This email address is already registered."
    ]);

    $check->close();
    $conn->close();
    exit;
}

$check->close();

// Hash the password securely
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert customer details
$sql = "INSERT INTO customers
        (first_name, last_name, email, phone, password)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssss",
    $first_name,
    $last_name,
    $email,
    $phone,
    $hashed_password
);

// Save customer
if ($stmt->execute()) {

    http_response_code(201);

    echo json_encode([
        "success" => true,
        "message" => "Registration successful!",
        "customer_id" => $stmt->insert_id
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Registration failed."
    ]);

}

$stmt->close();
$conn->close();

?>
