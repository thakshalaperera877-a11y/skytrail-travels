
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customer = JSON.parse(
    localStorage.getItem("skytrail_customer") || "null"
  );

  useEffect(() => {
    const fetchBookings = async () => {
      if (!customer?.customer_id) {
        setError("Please login to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/my_bookings.php?customer_id=${encodeURIComponent(
            customer.customer_id
          )}`
        );

        const result = await response.json();

        if (result.success) {
          setBookings(result.bookings);
        } else {
          setError(result.message || "Unable to load bookings.");
        }
      } catch (error) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [customer?.customer_id]);

  const formatPrice = (amount) =>
    `LKR ${Number(amount).toLocaleString("en-US")}`;

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading your bookings...
        </p>
      </main>
    );
  }

  if (!customer?.customer_id) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Login Required
        </h1>

        <p className="mt-3 text-slate-600">
          Please login to view your bookings.
        </p>

        <Link
          to="/login"
          className="mt-6 rounded-full bg-teal-500 px-8 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <span className="font-bold uppercase tracking-widest text-teal-600">
            Customer Dashboard
          </span>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            My Bookings
          </h1>

          <p className="mt-3 text-slate-600">
            Welcome back, {customer.first_name}.
            Manage and view your travel bookings here.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-slate-500">Total Bookings</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-slate-500">Pending Bookings</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {bookings.filter(
                (booking) =>
                  booking.booking_status?.toLowerCase() === "pending"
              ).length}
            </h2>
          </div>
        </div>

        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          Booking History
        </h2>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              No Bookings Yet
            </h3>

            <p className="mt-3 text-slate-600">
              You haven't made any travel bookings yet.
            </p>

            <Link
              to="/destinations"
              className="mt-6 inline-block rounded-full bg-teal-500 px-8 py-3 font-semibold text-white"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <article
                key={booking.booking_id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-sm text-slate-500">
                      Booking ID: #{booking.booking_id}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {booking.destination_name || "Destination"}
                    </h3>

                    {booking.package_name && (
                      <p className="mt-1 text-slate-600">
                        Package: {booking.package_name}
                      </p>
                    )}
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${statusStyle(
                      booking.booking_status
                    )}`}
                  >
                    {booking.booking_status || "Pending"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 border-t border-slate-100 pt-6 sm:grid-cols-3">

                  <div>
                    <p className="text-sm text-slate-500">
                      Travel Date
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {formatDate(booking.travel_date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Travellers
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.travellers}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Total Amount
                    </p>
                    <p className="mt-1 font-bold text-teal-600">
                      {formatPrice(booking.total_amount)}
                    </p>
                  </div>

                </div>

                {booking.special_request && (
                  <div className="mt-5 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-700">
                      Special Request
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {booking.special_request}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default MyBookings;
