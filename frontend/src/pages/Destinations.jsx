
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    slug: "bali",
    image: "/images/destinations/bali.jpg",
    description: "Lush rice terraces, ancient temples and golden beaches on the Island of the Gods.",
    price: 285000,
  },
  {
    id: 2,
    name: "Maldives",
    country: "Maldives",
    slug: "maldives",
    image: "/images/destinations/maldives.jpg",
    description: "Crystal-clear lagoons, overwater villas and vibrant coral reefs in a tropical paradise.",
    price: 195000,
  },
  {
    id: 3,
    name: "Switzerland",
    country: "Switzerland",
    slug: "switzerland",
    image: "/images/destinations/switzerland.jpg",
    description: "Snow-capped Alpine peaks, scenic train journeys and charming lakeside villages.",
    price: 695000,
  },
  {
    id: 4,
    name: "Japan",
    country: "Japan",
    slug: "japan",
    image: "/images/destinations/japan.jpg",
    description: "Cherry blossoms, historic shrines and neon-lit cities where tradition meets the future.",
    price: 495000,
  },
  {
    id: 5,
    name: "Dubai",
    country: "United Arab Emirates",
    slug: "dubai",
    image: "/images/destinations/dubai.jpg",
    description: "Iconic skyscrapers, luxury shopping and thrilling desert safaris under the Arabian sun.",
    price: 245000,
  },
  {
    id: 6,
    name: "Thailand",
    country: "Thailand",
    slug: "thailand",
    image: "/images/destinations/thailand.jpg",
    description: "Bustling street markets, ornate temples and island-hopping across turquoise waters.",
    price: 165000,
  },
];

function Destinations() {
  const [searchParams] = useSearchParams();

  const searchDestination = searchParams.get("destination") || "";
  const travelDate = searchParams.get("date") || "";
  const travellers = searchParams.get("travellers") || "2";

  const [search, setSearch] = useState(searchDestination);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    destination.country.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleSearch = (event) => {
    event.preventDefault();
    // Filtering is performed using the current search state.
  };

  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-12 text-center">
          <span className="font-semibold uppercase tracking-widest text-teal-600">
            Explore the World
          </span>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Our Destinations
          </h1>

          <p className="mt-4 text-slate-600">
            Discover amazing places and plan your next adventure.
          </p>
        </div>

        {/* Search information */}
        <div className="mb-8 rounded-xl bg-white p-5 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search destinations..."
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-teal-500"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Clear
            </button>
          </form>

          {(travelDate || travellers) && (
            <p className="mt-4 text-sm text-slate-500">
              Travel Date: {travelDate || "Not selected"} |
              Travellers: {travellers}
            </p>
          )}
        </div>

        {/* Results heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Available Destinations
          </h2>

          <span className="text-sm text-slate-500">
            {filteredDestinations.length} destinations found
          </span>
        </div>

        {/* Destination cards */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <article
                key={destination.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden bg-sky-100">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-sky-700 shadow">
                    {destination.country}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {destination.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {destination.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs uppercase text-slate-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-sky-700">
                        LKR {destination.price.toLocaleString("en-US")}
                      </p>
                    </div>

                    <Link
                      to={`/destinations/${destination.slug}`}
                      className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              No Destinations Found
            </h3>

            <p className="mt-3 text-slate-600">
              Sorry, we couldn't find any destinations matching "{search}".
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-6 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-teal-500"
            >
              View All Destinations
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Destinations;
