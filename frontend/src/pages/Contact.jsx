
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // SkyTrail Travels WhatsApp number
  const whatsappNumber = "94741561880";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    // Open a new tab immediately to avoid popup blocking
    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      const response = await fetch("/api/create_enquiry.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit enquiry.");
      }

      // Prepare WhatsApp message
      const whatsappMessage = `Hello SkyTrail Travels!

Customer Enquiry

Name: ${formData.customer_name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`;

      // Generate WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Navigate the previously opened tab to WhatsApp
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappURL;
      } else {
        window.location.href = whatsappURL;
      }

      setStatus("success");

      setFormData({
        customer_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      setStatus(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative flex min-h-[320px] items-center justify-center px-5 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 text-white">
          <p className="font-bold uppercase tracking-[4px] text-teal-300">
            We Are Here To Help
          </p>

          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Contact Us
          </h1>

          <p className="mt-4 text-slate-200">
            Have a question? Let us help you plan your next adventure.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-5">

        {/* Contact Information */}
        <div className="lg:col-span-2">
          <p className="font-bold uppercase tracking-widest text-teal-600">
            Get In Touch
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
            We'd Love to Hear From You
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Whether you need help choosing a destination or have
            questions about our tour packages, our team is ready
            to assist you.
          </p>

          <div className="mt-9 space-y-6">

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                📍 Our Location
              </h3>
              <p className="mt-2 text-slate-600">
                Sri Lanka
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                ✉️ Email Us
              </h3>
              <p className="mt-2 text-slate-600">
                info@skytrailtravels.com
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                📞 Call Us
              </h3>
              <p className="mt-2 text-slate-600">
                Contact our travel team for assistance.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                💬 WhatsApp
              </h3>
              <p className="mt-2 text-slate-600">
                Chat with our travel team on WhatsApp.
              </p>
              <p className="mt-2 font-semibold text-green-600">
                +94 74 156 1880
              </p>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-10 lg:col-span-3">

          <h2 className="text-2xl font-bold text-slate-900">
            Send Us a Message
          </h2>

          <p className="mt-2 text-slate-500">
            Fill in the form below and our team will receive your enquiry.
          </p>

          {status === "success" && (
            <div className="mt-6 rounded-xl bg-green-50 p-4 text-green-700">
              Your enquiry has been submitted successfully! WhatsApp is opening
              with your message.
            </div>
          )}

          {status && status !== "success" && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                maxLength={100}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  maxLength={150}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  maxLength={20}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your enquiry about?"
                required
                maxLength={150}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Your Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                rows="6"
                maxLength={3000}
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-teal-500 px-6 py-4 font-bold text-white transition hover:bg-teal-600 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Send Message"}
            </button>

          </form>
        </div>
      </section>

    </main>
  );
}

export default Contact;
