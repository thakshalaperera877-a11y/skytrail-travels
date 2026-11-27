
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

// Get login details from React
$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

// Validate inputs
if ($email === "" || $password === "") {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please enter your email and password."
    ]);

    exit;
}

// Find customer by email
$sql = "SELECT customer_id, first_name, last_name, email, password
        FROM customers
        WHERE email = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

// Check customer account
if ($result->num_rows === 1) {

    $customer = $result->fetch_assoc();

    // Verify password
    if (password_verify($password, $customer["password"])) {

        http_response_code(200);

        echo json_encode([
            "success" => true,
            "message" => "Login successful!",
            "customer" => [
                "customer_id" => $customer["customer_id"],
                "first_name" => $customer["first_name"],
                "last_name" => $customer["last_name"],
                "email" => $customer["email"]
            ]
        ]);

    } else {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);
    }

} else {

    http_response_code(401);

    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password."
    ]);
}

$stmt->close();
$conn->close();

?>
