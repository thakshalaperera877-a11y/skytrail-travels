
import { useState } from "react";
import { Link } from "react-router-dom";

const packages = [
  {
    id: 1,
    name: "Bali Tropical Escape",
    location: "Bali, Indonesia",
    slug: "bali",
    duration: "5 Days / 4 Nights",
    price: 285000,
    image: "/images/destinations/bali.jpg",
    description:
      "Enjoy beautiful beaches, tropical resorts, ancient temples and unforgettable island experiences.",
    highlights: ["Tropical beaches", "Temple visits", "Resort experience"],
  },
  {
    id: 2,
    name: "Maldives Luxury Holiday",
    location: "Maldives",
    slug: "maldives",
    duration: "4 Days / 3 Nights",
    price: 195000,
    image: "/images/destinations/maldives.jpg",
    description:
      "Experience crystal-clear waters, beautiful islands and relaxing tropical holidays.",
    highlights: ["Overwater villas", "Beach relaxation", "Island experiences"],
  },
  {
    id: 3,
    name: "Switzerland Alpine Adventure",
    location: "Switzerland",
    slug: "switzerland",
    duration: "7 Days / 6 Nights",
    price: 695000,
    image: "/images/destinations/switzerland.jpg",
    description:
      "Explore beautiful Alpine mountains, scenic lakes and charming Swiss villages.",
    highlights: ["Alpine mountains", "Scenic landscapes", "Mountain villages"],
  },
  {
    id: 4,
    name: "Japan Cultural Discovery",
    location: "Japan",
    slug: "japan",
    duration: "6 Days / 5 Nights",
    price: 495000,
    image: "/images/destinations/japan.jpg",
    description:
      "Discover Japanese culture, historic temples, beautiful gardens and modern cities.",
    highlights: ["Cultural attractions", "Historic temples", "City exploration"],
  },
  {
    id: 5,
    name: "Dubai City Experience",
    location: "Dubai, UAE",
    slug: "dubai",
    duration: "5 Days / 4 Nights",
    price: 245000,
    image: "/images/destinations/dubai.jpg",
    description:
      "Experience iconic skyscrapers, luxury shopping and exciting desert adventures.",
    highlights: ["City attractions", "Desert safari", "Luxury shopping"],
  },
  {
    id: 6,
    name: "Thailand Beach Getaway",
    location: "Thailand",
    slug: "thailand",
    duration: "5 Days / 4 Nights",
    price: 165000,
    image: "/images/destinations/thailand.jpg",
    description:
      "Enjoy tropical beaches, island adventures, local markets and beautiful scenery.",
    highlights: ["Island hopping", "Tropical beaches", "Local culture"],
  },
];

function Packages() {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  let filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.location.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under200" && pkg.price < 200000) ||
      (priceFilter === "200to400" &&
        pkg.price >= 200000 && pkg.price <= 400000) ||
      (priceFilter === "above400" && pkg.price > 400000);

    return matchesSearch && matchesPrice;
  });

  if (sortOrder === "low") {
    filteredPackages.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filteredPackages.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative flex min-h-[380px] items-center justify-center px-5 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-slate-950/65" />

        <div className="relative z-10 max-w-3xl text-white">
          <p className="font-bold uppercase tracking-[4px] text-teal-300">
            Discover Your Next Adventure
          </p>

          <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
            Our Tour Packages
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-200">
            Explore amazing destinations and find the perfect
            holiday package for your next journey.
          </p>

          <a
            href="#available-packages"
            className="mt-8 inline-block rounded-full bg-teal-500 px-8 py-3 font-bold text-white transition hover:bg-teal-600"
          >
            Explore Packages
          </a>
        </div>
      </section>

      {/* Package introduction */}
      <section className="mx-auto max-w-7xl px-5 pt-16">
        <div className="text-center">
          <p className="font-bold uppercase tracking-widest text-teal-600">
            Travel Made Easy
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Find Your Perfect Holiday
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Browse our available tour packages, compare prices
            and discover destinations for your next adventure.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section
        id="available-packages"
        className="mx-auto max-w-7xl px-5 pt-12"
      >
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Search Packages
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination or package..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Filter by Price
              </label>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
              >
                <option value="all">All Prices</option>
                <option value="under200">Under LKR 200,000</option>
                <option value="200to400">LKR 200,000 - 400,000</option>
                <option value="above400">Above LKR 400,000</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Sort Packages
              </label>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500"
              >
                <option value="default">Default Order</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              {filteredPackages.length} packages available
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPriceFilter("all");
                setSortOrder("default");
              }}
              className="font-semibold text-teal-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Package Cards */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 lg:grid-cols-3">

            {filteredPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden bg-slate-200">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-teal-700 shadow">
                    {pkg.duration}
                  </span>
                </div>

                <div className="p-6">
                  <p className="font-semibold text-teal-600">
                    {pkg.location}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {pkg.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {pkg.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-bold text-slate-700">
                      Package Highlights
                    </p>

                    <ul className="mt-3 space-y-2">
                      {pkg.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2 text-sm text-slate-600"
                        >
                          <span className="font-bold text-teal-500">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs uppercase text-slate-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-sky-700">
                        LKR {pkg.price.toLocaleString("en-US")}
                      </p>
                    </div>

                    <Link
                      to={`/destinations/${pkg.slug}`}
                      className="rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}

          </div>
        ) : (
          <div className="my-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">🌍</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No Packages Found
            </h3>

            <p className="mt-3 text-slate-600">
              Try changing your search or price filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPriceFilter("all");
                setSortOrder("default");
              }}
              className="mt-6 rounded-full bg-teal-500 px-7 py-3 font-bold text-white hover:bg-teal-600"
            >
              View All Packages
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 px-5 py-16 text-center text-white">
        <h2 className="text-3xl font-extrabold">
          Your Next Journey Starts Here
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
          Explore our destinations and find a holiday
          experience that matches your travel dreams.
        </p>

        <Link
          to="/destinations"
          className="mt-7 inline-block rounded-full bg-teal-500 px-8 py-3 font-bold hover:bg-teal-600"
        >
          Explore Destinations
        </Link>
      </section>

    </main>
  );
}

export default Packages;
