
// FeaturedDestinations.jsx
// "Explore Popular Destinations" section for the SkyTrail Travels homepage.
// Shows 6 destination cards in a responsive grid:
// 1 column on mobile, 2 on tablet, 3 on desktop.

import { Link } from "react-router-dom";

// All destination data is kept in one array.
// To change a card, edit its details here. Later, this data can come
// from the PHP/MySQL backend instead.
// Images go in: public/images/destinations/
// Prices are sample values in Sri Lankan Rupees (LKR).
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    slug: "bali",
    image: "/images/destinations/bali.jpg",
    description:
      "Lush rice terraces, ancient temples and golden beaches on the Island of the Gods.",
    price: 285000,
  },
  {
    id: 2,
    name: "Maldives",
    country: "Maldives",
    slug: "maldives",
    image: "/images/destinations/maldives.jpg",
    description:
      "Crystal-clear lagoons, overwater villas and vibrant coral reefs in a tropical paradise.",
    price: 195000,
  },
  {
    id: 3,
    name: "Switzerland",
    country: "Switzerland",
    slug: "switzerland",
    image: "/images/destinations/switzerland.jpg",
    description:
      "Snow-capped Alpine peaks, scenic train journeys and charming lakeside villages.",
    price: 695000,
  },
  {
    id: 4,
    name: "Japan",
    country: "Japan",
    slug: "japan",
    image: "/images/destinations/japan.jpg",
    description:
      "Cherry blossoms, historic shrines and neon-lit cities where tradition meets the future.",
    price: 495000,
  },
  {
    id: 5,
    name: "Dubai",
    country: "United Arab Emirates",
    slug: "dubai",
    image: "/images/destinations/dubai.jpg",
    description:
      "Iconic skyscrapers, luxury shopping and thrilling desert safaris under the Arabian sun.",
    price: 245000,
  },
  {
    id: 6,
    name: "Thailand",
    country: "Thailand",
    slug: "thailand",
    image: "/images/destinations/thailand.jpg",
    description:
      "Bustling street markets, ornate temples and island-hopping across turquoise waters.",
    price: 165000,
  },
];

function FeaturedDestinations() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Section heading ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Top Picks
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Explore Popular Destinations
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Discover the world's most beautiful places.
          </p>
          {/* Small decorative line under the heading */}
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-teal-500"></div>
        </div>

        {/* ---------- Destination cards grid ---------- */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {destinations.map((destination) => (
            // "group" lets child elements react when the whole card is hovered
            <article
              key={destination.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* ----- Image area (zooms in on card hover) ----- */}
              <div className="relative h-60 overflow-hidden bg-sky-100">
                <img
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Soft dark layer that fades in on hover */}
                <div className="absolute inset-0 bg-slate-900/0 transition duration-500 group-hover:bg-slate-900/20"></div>

                {/* Country badge with a small location pin icon */}
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-sm">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {destination.country}
                </span>
              </div>

              {/* ----- Card content ----- */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
                  {destination.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {destination.description}
                </p>

                {/* Price and button row */}
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Starting from
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-sky-700">
                      LKR {destination.price.toLocaleString("en-US")}
                    </p>
                  </div>

                  <Link
                    to={`/destinations/${destination.slug}`}
                    className="whitespace-nowrap rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-teal-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  >
                    View Destination
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;