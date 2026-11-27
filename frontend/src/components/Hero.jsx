
// Hero.jsx
// Homepage hero section for SkyTrail Travels.
// Contains: background image + dark overlay, heading, subtitle,
// two call-to-action buttons and a travel search panel.

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Background image path.
const HERO_IMAGE = "/images/hero-bg.jpg";

function Hero() {
  // ---------- Search form state ----------
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2");

  // ---------- Entrance animation state ----------
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  // Today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // ---------- Search form submission ----------
  const handleSearch = (event) => {
    event.preventDefault();

    // Validate destination
    if (!destination.trim()) {
      alert("Please enter a destination.");
      return;
    }

    // Build search parameters
    const params = new URLSearchParams({
      destination: destination.trim(),
      date: travelDate,
      travellers: travellers,
    });

    // Navigate to Destinations page
    navigate(`/destinations?${params.toString()}`);
  };

  // ---------- Animation classes ----------
  const fadeUp = isLoaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";

  // ---------- Input styling ----------
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 " +
    "placeholder-slate-400 outline-none transition duration-300 " +
    "focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-200";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500";

  return (
    <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center overflow-hidden bg-sky-900">

      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2500ms] ease-out ${
          isLoaded ? "scale-100" : "scale-110"
        }`}
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      ></div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60"
        aria-hidden="true"
      ></div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

        <div className="mx-auto max-w-4xl text-center">

          {/* Welcome badge */}
          <span
            className={`inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-200 backdrop-blur-sm transition-all duration-700 sm:text-sm ${fadeUp}`}
          >
            Welcome to SkyTrail Travels
          </span>

          {/* Main heading */}
          <h1
            className={`mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white transition-all delay-150 duration-700 sm:text-5xl lg:text-7xl ${fadeUp}`}
          >
            Discover Your Next{" "}
            <span className="text-teal-300">Adventure</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-100 transition-all delay-300 duration-700 sm:text-lg lg:text-xl ${fadeUp}`}
          >
            Explore breathtaking destinations and create unforgettable memories
            with SkyTrail Travels.
          </p>

          {/* Call-to-action buttons */}
          <div
            className={`mt-8 flex flex-col items-center justify-center gap-4 transition-all delay-500 duration-700 sm:flex-row ${fadeUp}`}
          >
            <Link
              to="/destinations"
              className="w-full rounded-full bg-sky-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-sky-500 hover:shadow-xl sm:w-auto"
            >
              Explore Destinations
            </Link>

            <Link
              to="/packages"
              className="w-full rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-sky-700 sm:w-auto"
            >
              Discover Tour Packages
            </Link>
          </div>
        </div>

        {/* Travel search panel */}
        <form
          onSubmit={handleSearch}
          className={`mx-auto mt-12 max-w-5xl rounded-2xl bg-white p-5 shadow-2xl transition-all delay-700 duration-700 sm:p-6 lg:mt-16 ${fadeUp}`}
        >

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">

            {/* Destination */}
            <div className="text-left">
              <label htmlFor="hero-destination" className={labelClass}>
                Destination
              </label>

              <input
                id="hero-destination"
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className={inputClass}
              />
            </div>

            {/* Travel date */}
            <div className="text-left">
              <label htmlFor="hero-date" className={labelClass}>
                Travel Date
              </label>

              <input
                id="hero-date"
                type="date"
                min={today}
                value={travelDate}
                onChange={(event) => setTravelDate(event.target.value)}
                className={inputClass}
              />
            </div>

            {/* Number of travellers */}
            <div className="text-left">
              <label htmlFor="hero-travellers" className={labelClass}>
                Travellers
              </label>

              <select
                id="hero-travellers"
                value={travellers}
                onChange={(event) => setTravellers(event.target.value)}
                className={inputClass}
              >
                <option value="1">1 Traveller</option>
                <option value="2">2 Travellers</option>
                <option value="3">3 Travellers</option>
                <option value="4">4 Travellers</option>
                <option value="5">5 Travellers</option>
                <option value="6">6+ Travellers</option>
              </select>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-base font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              Search
            </button>

          </div>
        </form>
      </div>
    </section>
  );
}

export default Hero;
