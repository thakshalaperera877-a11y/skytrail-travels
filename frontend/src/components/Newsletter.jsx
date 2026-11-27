// Newsletter.jsx
// "Subscribe to Our Newsletter" section for the SkyTrail Travels homepage.
// Includes an email input, basic JavaScript validation and a success message.

import { useState } from "react";

function Newsletter() {
  // ---------- Component state ----------
  const [email, setEmail] = useState(""); // what the user typed
  const [error, setError] = useState(""); // validation error message
  const [isSubscribed, setIsSubscribed] = useState(false); // show success?

  // Basic email check: some text, then @, then a domain with a dot
  // e.g. "name@example.com" passes, "name@example" fails
  const isValidEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(value);
  };

  // Update the email and clear old messages while the user is typing
  const handleChange = (event) => {
    setEmail(event.target.value);
    setError("");
    setIsSubscribed(false);
  };

  // Runs when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault(); // stop the page from reloading

    const trimmedEmail = email.trim();

    // Validation step 1: the field must not be empty
    if (trimmedEmail === "") {
      setError("Please enter your email address.");
      setIsSubscribed(false);
      return;
    }

    // Validation step 2: the email must have a valid format
    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address, e.g. name@example.com");
      setIsSubscribed(false);
      return;
    }

    // Validation passed.
    // NOTE: the email is not saved anywhere yet. When the PHP backend is
    // ready, send it here using fetch(), e.g.
    // fetch("http://localhost/skytrail/api/subscribe.php", { method: "POST", ... })
    setError("");
    setIsSubscribed(true);
    setEmail(""); // clear the input
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Blue-to-teal panel ---------- */}
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-12 shadow-2xl sm:px-12 sm:py-16 lg:px-20"
          style={{
            backgroundImage: "linear-gradient(135deg, #0369a1 0%, #0e7490 50%, #14b8a6 100%)",
          }}
        >
          {/* Decorative soft circles in the background */}
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"
            aria-hidden="true"
          ></div>
          <div
            className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/10"
            aria-hidden="true"
          ></div>

          {/* ---------- Content ---------- */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            {/* Envelope icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sky-50 sm:text-lg">
              Get exclusive travel deals, destination inspiration and special
              offers delivered to your inbox.
            </p>

            {/* ---------- Subscription form ---------- */}
            {/* noValidate turns off the browser's own popups so our
                JavaScript validation messages are shown instead */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                aria-invalid={error !== ""}
                aria-describedby="newsletter-message"
                className={`w-full flex-1 rounded-full border-2 bg-white px-6 py-3.5 text-base text-slate-800 placeholder-slate-400 shadow-md outline-none transition duration-300 focus:ring-4 focus:ring-white/40 ${
                  error ? "border-red-400" : "border-transparent"
                }`}
              />
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-8 py-3.5 text-base font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-sky-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                Subscribe
              </button>
            </form>

            {/* ---------- Error / success messages ---------- */}
            {/* aria-live makes screen readers announce the message */}
            <div id="newsletter-message" aria-live="polite" className="mt-4 min-h-[2.75rem]">
              {error && (
                <p className="inline-block rounded-full bg-red-50 px-5 py-2 text-sm font-medium text-red-600 shadow-sm">
                  {error}
                </p>
              )}

              {isSubscribed && (
                <p className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-teal-700 shadow-md">
                  {/* Tick icon */}
                  <svg
                    className="h-5 w-5 text-teal-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                  Thank you for subscribing! Check your inbox for travel deals.
                </p>
              )}
            </div>

            <p className="mt-2 text-xs text-sky-100">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;