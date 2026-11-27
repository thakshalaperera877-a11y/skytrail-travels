import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  const admin = JSON.parse(localStorage.getItem("skytrail_admin") || "null");

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin_bookings.php", {
        credentials: "same-origin",
      });
      const result = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("skytrail_admin");
        navigate("/admin-login");
        return;
      }
      if (!result.success) throw new Error(result.message || "Unable to load bookings.");
      setBookings(result.bookings || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!admin) {
      navigate("/admin-login");
      return;
    }
    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "All" || booking.booking_status === statusFilter;
      const customerName = `${booking.first_name || ""} ${booking.last_name || ""}`.toLowerCase();
      const matchesSearch =
        !term ||
        String(booking.booking_id).includes(term) ||
        customerName.includes(term) ||
        (booking.email || "").toLowerCase().includes(term) ||
        (booking.destination_name || "").toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const updateStatus = async (bookingId, newStatus) => {
    setNotice("");
    setError("");
    setUpdatingId(bookingId);
    try {
      const response = await fetch("/api/update_booking_status.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingId,
          booking_status: newStatus,
        }),
      });
      const result = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("skytrail_admin");
        navigate("/admin-login");
        return;
      }
      if (!result.success) throw new Error(result.message || "Status update failed.");
      setBookings((current) =>
        current.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, booking_status: newStatus }
            : booking
        )
      );
      setNotice(result.message);
    } catch (err) {
      setError(err.message || "Unable to update booking.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm(`Delete booking #${bookingId}? This action cannot be undone.`)) return;
    setNotice("");
    setError("");
    try {
      const response = await fetch("/api/delete_booking.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId }),
      });
      const result = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("skytrail_admin");
        navigate("/admin-login");
        return;
      }
      if (!result.success) throw new Error(result.message || "Unable to delete booking.");
      setBookings((current) => current.filter((booking) => booking.booking_id !== bookingId));
      setNotice(result.message);
    } catch (err) {
      setError(err.message || "Unable to delete booking.");
    }
  };

  const formatPrice = (amount) =>
    `LKR ${Number(amount || 0).toLocaleString("en-US")}`;

  const statusClass = (status) => {
    if (status === "Confirmed") return "bg-green-100 text-green-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="font-semibold text-slate-600">Loading bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold uppercase tracking-widest text-teal-600">Administration</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Booking Management</h1>
            <p className="mt-2 text-slate-500">Review customer bookings and manage their status.</p>
          </div>
          <Link to="/admin-dashboard" className="w-fit rounded-full border border-teal-600 px-5 py-3 font-semibold text-teal-700 hover:bg-teal-50">
            ← Back to Dashboard
          </Link>
        </div>

        {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
        {notice && <p className="mb-5 rounded-xl bg-green-50 p-4 text-green-700">{notice}</p>}

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">All Bookings</p>
            <p className="mt-2 text-3xl font-bold">{bookings.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{bookings.filter((b) => b.booking_status === "Pending").length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Confirmed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{bookings.filter((b) => b.booking_status === "Confirmed").length}</p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search booking ID, customer, email or destination..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
            <button onClick={loadBookings} className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white hover:bg-slate-700">
              Refresh
            </button>
          </div>

          {filteredBookings.length === 0 ? (
            <p className="py-12 text-center text-slate-500">No bookings match your search.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead>
                  <tr className="border-b bg-slate-50 text-sm text-slate-500">
                    <th className="p-4">Booking</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Destination / Package</th>
                    <th className="p-4">Travel Date</th>
                    <th className="p-4">Travellers</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.booking_id} className="border-b last:border-0 align-top">
                      <td className="p-4 font-semibold">#{booking.booking_id}</td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">{booking.first_name} {booking.last_name}</p>
                        <p className="text-sm text-slate-500">{booking.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold">{booking.destination_name || "N/A"}</p>
                        <p className="text-sm text-slate-500">{booking.package_name || "No package selected"}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap">{booking.travel_date}</td>
                      <td className="p-4">{booking.travellers}</td>
                      <td className="p-4 whitespace-nowrap font-semibold">{formatPrice(booking.total_amount)}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(booking.booking_status)}`}>
                          {booking.booking_status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex min-w-[150px] flex-col gap-2">
                          <select
                            value={booking.booking_status}
                            disabled={updatingId === booking.booking_id}
                            onChange={(event) => updateStatus(booking.booking_id, event.target.value)}
                            className="rounded-lg border border-slate-200 px-2 py-2 text-sm"
                            aria-label={`Change status for booking ${booking.booking_id}`}
                          >
                            <option>Pending</option>
                            <option>Confirmed</option>
                            <option>Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteBooking(booking.booking_id)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                          >
                            Delete Booking
                          </button>
                        </div>
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

export default AdminBookings;
