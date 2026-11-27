
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

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}

try {

    // Dashboard statistics
    $totalBookings = $conn->query(
        "SELECT COUNT(*) AS total FROM bookings"
    )->fetch_assoc()["total"];

    $pendingBookings = $conn->query(
        "SELECT COUNT(*) AS total FROM bookings
         WHERE booking_status = 'Pending'"
    )->fetch_assoc()["total"];

    $totalCustomers = $conn->query(
        "SELECT COUNT(*) AS total FROM customers"
    )->fetch_assoc()["total"];

    $totalDestinations = $conn->query(
        "SELECT COUNT(*) AS total FROM destinations"
    )->fetch_assoc()["total"];

    $totalPackages = $conn->query(
        "SELECT COUNT(*) AS total FROM packages"
    )->fetch_assoc()["total"];

    // Latest five bookings
    $sql = "
        SELECT
            b.booking_id,
            c.first_name,
            c.last_name,
            d.name AS destination_name,
            b.travel_date,
            b.travellers,
            b.total_amount,
            b.booking_status
        FROM bookings b
        LEFT JOIN customers c
            ON b.customer_id = c.customer_id
        LEFT JOIN destinations d
            ON b.destination_id = d.destination_id
        ORDER BY b.booking_id DESC
        LIMIT 5
    ";

    $result = $conn->query($sql);

    $recentBookings = [];

    while ($row = $result->fetch_assoc()) {
        $recentBookings[] = $row;
    }

    echo json_encode([
        "success" => true,
        "statistics" => [
            "total_bookings" => (int) $totalBookings,
            "pending_bookings" => (int) $pendingBookings,
            "total_customers" => (int) $totalCustomers,
            "total_destinations" => (int) $totalDestinations,
            "total_packages" => (int) $totalPackages
        ],
        "recent_bookings" => $recentBookings
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to load dashboard data."
    ]);

}

$conn->close();

?>
