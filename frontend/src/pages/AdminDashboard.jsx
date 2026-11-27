import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const admin = JSON.parse(
    localStorage.getItem("skytrail_admin") || "null"
  );

  useEffect(() => {
    if (!admin) {
      navigate("/admin-login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/admin_dashboard.php", { credentials: "same-origin" });
        const result = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("skytrail_admin");
          navigate("/admin-login");
          return;
        }

        if (result.success) {
          setStatistics(result.statistics);
          setRecentBookings(result.recent_bookings);
        } else {
          setError(result.message || "Unable to load dashboard.");
        }
      } catch (error) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin_logout.php", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      localStorage.removeItem("skytrail_admin");
      navigate("/admin-login");
    }
  };

  const cards = statistics
    ? [
        {
          title: "Total Bookings",
          value: statistics.total_bookings,
          color: "text-blue-600",
        },
        {
          title: "Pending Bookings",
          value: statistics.pending_bookings,
          color: "text-amber-600",
        },
        {
          title: "Total Customers",
          value: statistics.total_customers,
          color: "text-green-600",
        },
        {
          title: "Destinations",
          value: statistics.total_destinations,
          color: "text-purple-600",
        },
        {
          title: "Tour Packages",
          value: statistics.total_packages,
          color: "text-teal-600",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold uppercase tracking-widest text-teal-600">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Welcome, {admin?.username || "Admin"}. Manage SkyTrail Travels here.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
          >
            Admin Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        {statistics && (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className={`mt-3 text-4xl font-extrabold ${card.color}`}>
                  {card.value}
                </h2>
              </div>
            ))}
          </section>
        )}

        {/* Recent Bookings */}
        <section className="mt-12 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Bookings
            </h2>

            <Link
              to="/admin-bookings"
              className="font-semibold text-teal-600 hover:underline"
            >
              Manage Bookings
            </Link>

            <Link
            to="/admin-enquiries"
            className="font-semibold text-teal-600 hover:underline"
            >
            Manage Enquiries
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              No bookings available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead>
                  <tr className="border-b bg-slate-50 text-sm text-slate-500">
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Travel Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.booking_id}
                      className="border-b last:border-0"
                    >
                      <td className="p-4">
                        #{booking.booking_id}
                      </td>

                      <td className="p-4">
                        {booking.first_name} {booking.last_name}
                      </td>

                      <td className="p-4">
                        {booking.destination_name || "N/A"}
                      </td>

                      <td className="p-4">
                        {booking.travel_date}
                      </td>

                      <td className="p-4 font-semibold">
                        LKR {Number(booking.total_amount).toLocaleString("en-US")}
                      </td>

                      <td className="p-4">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          {booking.booking_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default AdminDashboard;
