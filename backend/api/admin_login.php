
<?php

session_start();

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

// Find admin by email
$sql = "SELECT admin_id, username, email, password
        FROM admins
        WHERE email = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

// Verify admin account
if ($result->num_rows === 1) {

    $admin = $result->fetch_assoc();

    if (password_verify($password, $admin["password"])) {

        session_regenerate_id(true);
        $_SESSION["admin_id"] = (int) $admin["admin_id"];

        http_response_code(200);

        echo json_encode([
            "success" => true,
            "message" => "Admin login successful!",
            "admin" => [
                "admin_id" => $admin["admin_id"],
                "username" => $admin["username"],
                "email" => $admin["email"]
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
