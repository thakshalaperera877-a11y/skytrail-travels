
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const destinations = [
  { id: 1, packageId: 1, slug: "bali", name: "Bali", price: 285000 },
  { id: 2, packageId: 2, slug: "maldives", name: "Maldives", price: 195000 },
  { id: 3, packageId: 3, slug: "switzerland", name: "Switzerland", price: 695000 },
  { id: 4, packageId: 4, slug: "japan", name: "Japan", price: 495000 },
  { id: 5, packageId: 5, slug: "dubai", name: "Dubai", price: 245000 },
  { id: 6, packageId: 6, slug: "thailand", name: "Thailand", price: 165000 },
];

function Booking() {
  const { slug } = useParams();

  const destination = destinations.find(
    (item) => item.slug === slug
  );

  // Get logged-in customer details
  const savedCustomer =
    localStorage.getItem("skytrail_customer") ||
    localStorage.getItem("customer");

  const customer = savedCustomer
    ? JSON.parse(savedCustomer)
    : null;

  const [formData, setFormData] = useState({
    name: customer
      ? `${customer.first_name} ${customer.last_name}`
      : "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    travelDate: "",
    travellers: "2",
    specialRequest: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const totalPrice =
    destination
      ? destination.price * Number(formData.travellers)
      : 0;

  // Submit booking to PHP backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!customer?.customer_id) {
      setMessage("Please login before submitting a booking.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create_booking.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: Number(customer.customer_id),
          destination_id: destination.id,
          package_id: destination.packageId,
          travel_date: formData.travelDate,
          travellers: Number(formData.travellers),
          total_amount: totalPrice,
          special_request: formData.specialRequest,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(
          result.message || "Unable to submit your booking."
        );
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!destination) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          Destination Not Found
        </h1>

        <Link to="/destinations" className="mt-5 text-sky-600">
          Back to Destinations
        </Link>
      </main>
    );
  }

  // Booking success screen
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
        <div className="bg-white max-w-lg w-full rounded-2xl p-8 shadow-lg text-center">

          <div className="text-5xl mb-5 text-teal-500">✓</div>

          <h1 className="text-3xl font-bold text-slate-900">
            Booking Request Received!
          </h1>

          <p className="mt-4 text-slate-600">
            Thank you, {formData.name}. Your booking request for{" "}
            {destination.name} has been saved successfully.
          </p>

          <div className="mt-6 bg-slate-50 rounded-xl p-5 text-left space-y-3">
            <p>
              <strong>Destination:</strong> {destination.name}
            </p>

            <p>
              <strong>Travel Date:</strong> {formData.travelDate}
            </p>

            <p>
              <strong>Travellers:</strong> {formData.travellers}
            </p>

            <p>
              <strong>Estimated Total:</strong> LKR{" "}
              {totalPrice.toLocaleString("en-US")}
            </p>
          </div>

          <p className="mt-5 text-sm text-green-600">
            Your booking details have been saved to our database.
          </p>

          <Link
            to="/destinations"
            className="mt-7 inline-block rounded-full bg-sky-600 px-8 py-3 text-white font-semibold"
          >
            Explore More Destinations
          </Link>

        </div>
      </main>
    );
  }

  // Booking form
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-teal-600">
            Plan Your Journey
          </span>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Complete Your Booking
          </h1>

          <p className="mt-4 text-slate-600">
            Enter your details to request your dream holiday.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <section className="lg:col-span-2 bg-white rounded-2xl shadow-md p-7">

            <h2 className="text-2xl font-bold text-slate-900 mb-7">
              Your Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Travel Date
                  </label>

                  <input
                    type="date"
                    name="travelDate"
                    min={today}
                    value={formData.travelDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Number of Travellers
                  </label>

                  <select
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number} {number === 1 ? "Traveller" : "Travellers"}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Special Requests (Optional)
                </label>

                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any additional requirements?"
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
                />
              </div>

              {message && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-teal-500 py-4 text-white font-bold hover:bg-teal-600 transition disabled:opacity-50"
              >
                {loading ? "Submitting Booking..." : "Submit Booking Request"}
              </button>

            </form>
          </section>

          {/* Booking Summary */}
          <aside className="bg-white rounded-2xl shadow-md p-7 h-fit">

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Booking Summary
            </h2>

            <div className="bg-slate-50 rounded-xl p-5">

              <p className="text-sm text-slate-500">
                Selected Destination
              </p>

              <h3 className="text-2xl font-bold mt-2 text-sky-700">
                {destination.name}
              </h3>

              <div className="border-t border-slate-200 mt-5 pt-5 space-y-4">

                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">
                    Price per person
                  </span>

                  <span className="font-semibold">
                    LKR {destination.price.toLocaleString("en-US")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Travellers</span>

                  <span className="font-semibold">
                    {formData.travellers}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <p className="text-slate-500 text-sm">
                    Estimated Total
                  </p>

                  <p className="text-2xl font-extrabold text-teal-600 mt-2">
                    LKR {totalPrice.toLocaleString("en-US")}
                  </p>
                </div>

              </div>
            </div>

            <Link
              to={`/destinations/${destination.slug}`}
              className="block text-center mt-6 text-sky-600 font-semibold hover:underline"
            >
              ← Back to Destination
            </Link>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Booking;
