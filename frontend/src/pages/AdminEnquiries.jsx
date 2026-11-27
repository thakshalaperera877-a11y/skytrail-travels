
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin_enquiries.php", {
        credentials: "same-origin",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load enquiries.");
      }

      setEnquiries(result.enquiries || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const admin = localStorage.getItem("skytrail_admin");

    if (!admin) {
      setError("Please log in as an administrator first.");
      setLoading(false);
      return;
    }

    fetchEnquiries();
  }, []);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const term = search.toLowerCase();

      const matchesSearch =
        String(item.enquiry_id).includes(term) ||
        item.customer_name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.subject.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" ||
        item.enquiry_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, search, statusFilter]);

  const updateStatus = async (id, status) => {
    setNotice("");
    setError("");

    try {
      const response = await fetch("/api/update_enquiry_status.php", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enquiry_id: id,
          enquiry_status: status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update status.");
      }

      setNotice(result.message);
      await fetchEnquiries();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) return;

    setNotice("");
    setError("");

    try {
      const response = await fetch("/api/delete_enquiry.php", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enquiry_id: id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete enquiry.");
      }

      setNotice(result.message);
      setSelectedEnquiry(null);
      await fetchEnquiries();
    } catch (err) {
      setError(err.message);
    }
  };

  const newCount = enquiries.filter(
    (item) => item.enquiry_status === "New"
  ).length;

  const progressCount = enquiries.filter(
    (item) => item.enquiry_status === "In Progress"
  ).length;

  const resolvedCount = enquiries.filter(
    (item) => item.enquiry_status === "Resolved"
  ).length;

  const statusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-widest text-teal-600">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Enquiry Management
            </h1>

            <p className="mt-2 text-slate-500">
              Review and manage customer enquiries.
            </p>
          </div>

          <Link
            to="/admin-dashboard"
            className="rounded-full border border-teal-500 px-6 py-3 font-semibold text-teal-700 hover:bg-teal-50"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {notice && (
          <div className="mb-6 rounded-xl bg-green-50 p-4 text-green-700">
            {notice}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {[
            { label: "New Enquiries", value: newCount, color: "text-amber-600" },
            { label: "In Progress", value: progressCount, color: "text-blue-600" },
            { label: "Resolved", value: resolvedCount, color: "text-green-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className={`mt-2 text-3xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Enquiry table */}
        <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, customer, email or subject..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <button
              onClick={fetchEnquiries}
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="py-12 text-center text-slate-500">
              Loading enquiries...
            </p>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-xl font-bold text-slate-800">
                No Enquiries Found
              </h3>
              <p className="mt-2 text-slate-500">
                There are no enquiries matching your search.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50 text-sm text-slate-600">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnquiries.map((item) => (
                    <tr
                      key={item.enquiry_id}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4 font-semibold">
                        #{item.enquiry_id}
                      </td>

                      <td className="p-4">
                        <p className="font-semibold text-slate-800">
                          {item.customer_name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {item.email}
                        </p>
                      </td>

                      <td className="max-w-[220px] p-4">
                        <p className="truncate font-medium">
                          {item.subject}
                        </p>
                      </td>

                      <td className="p-4 text-sm text-slate-600">
                        {item.created_at}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-2 text-xs font-bold ${statusStyle(item.enquiry_status)}`}
                        >
                          {item.enquiry_status}
                        </span>
                      </td>

                      <td className="space-y-2 p-4">
                        <button
                          onClick={() => setSelectedEnquiry(item)}
                          className="block w-full rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                        >
                          View
                        </button>

                        <select
                          value={item.enquiry_status}
                          onChange={(e) =>
                            updateStatus(item.enquiry_id, e.target.value)
                          }
                          className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => deleteEnquiry(item.enquiry_id)}
                          className="block w-full rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>
      </div>

      {/* Enquiry details modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl">

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Enquiry Details
              </h2>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-2xl text-slate-500 hover:text-red-500"
                aria-label="Close enquiry details"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Customer Name</p>
                <p className="font-semibold">
                  {selectedEnquiry.customer_name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold">
                  {selectedEnquiry.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold">
                  {selectedEnquiry.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Subject</p>
                <p className="font-semibold">
                  {selectedEnquiry.subject}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Message</p>
                <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 leading-7 text-slate-700">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Submitted Date</p>
                <p className="font-semibold">
                  {selectedEnquiry.created_at}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedEnquiry(null)}
              className="mt-7 w-full rounded-full bg-slate-900 py-3 font-semibold text-white hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminEnquiries;
