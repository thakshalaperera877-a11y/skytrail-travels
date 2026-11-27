
const blogs = [
  {
    id: 1,
    title: "Top 5 Beautiful Places to Visit in Bali",
    date: "October 15, 2026",
    category: "Travel Guide",
    image: "/images/destinations/bali.jpg",
    description:
      "Explore the beautiful beaches, green rice terraces and ancient temples of Bali."
  },
  {
    id: 2,
    title: "Experience Luxury Holidays in Maldives",
    date: "October 20, 2026",
    category: "Travel Tips",
    image: "/images/destinations/maldives.jpg",
    description:
      "Discover crystal-clear waters, luxury resorts and unforgettable island experiences."
  },
  {
    id: 3,
    title: "Discover the Beauty of Switzerland",
    date: "October 25, 2026",
    category: "Destinations",
    image: "/images/destinations/switzerland.jpg",
    description:
      "Enjoy breathtaking mountain views, beautiful lakes and amazing scenic train journeys."
  }
];

function LatestBlogs() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <span className="font-semibold uppercase tracking-widest text-teal-600">
            Travel Stories
          </span>

          <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
            Latest Travel Blogs
          </h2>

          <p className="mt-4 text-slate-600">
            Get inspired by our latest travel guides and experiences.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-teal-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between text-xs text-teal-600">
                  <span className="font-semibold">{blog.category}</span>
                  <span className="text-slate-400">{blog.date}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {blog.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {blog.description}
                </p>

                <button className="mt-6 font-semibold text-sky-600 hover:text-teal-500">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default LatestBlogs;
