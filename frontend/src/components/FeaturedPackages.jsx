
import { Link } from "react-router-dom";

const packages = [
  {
    id: 1,
    name: "Bali Paradise Escape",
    location: "Bali, Indonesia",
    duration: "5 Days / 4 Nights",
    price: 285000,
    image: "/images/destinations/bali.jpg",
    description: "Enjoy beautiful beaches, tropical resorts and unforgettable island experiences.",
  },
  {
    id: 2,
    name: "Maldives Luxury Holiday",
    location: "Maldives",
    duration: "4 Days / 3 Nights",
    price: 195000,
    image: "/images/destinations/maldives.jpg",
    description: "Experience crystal-clear waters and relaxing luxury overwater villas.",
  },
  {
    id: 3,
    name: "Switzerland Adventure",
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: 695000,
    image: "/images/destinations/switzerland.jpg",
    description: "Explore beautiful Alpine mountains, lakes and scenic villages.",
  },
];

function FeaturedPackages() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest text-teal-600">
            Best Offers
          </span>

          <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
            Featured Tour Packages
          </h2>

          <p className="mt-4 text-slate-600">
            Discover amazing travel experiences at the best prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">

                <span className="text-sm font-semibold text-teal-600">
                  {pkg.location}
                </span>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {pkg.name}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Duration: {pkg.duration}
                </p>

                <div className="mt-6 flex items-center justify-between border-t pt-5">

                  <div>
                    <p className="text-xs uppercase text-slate-400">
                      Starting from
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-sky-700">
                      LKR {pkg.price.toLocaleString("en-US")}
                    </p>
                  </div>

                  <Link
                    to="/packages"
                    className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 transition"
                  >
                    View Package
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

export default FeaturedPackages;
