// Testimonials.jsx
// "What Our Travelers Say" section for the SkyTrail Travels homepage.
// Shows 3 customer review cards: 1 column on mobile, 3 on desktop.

// SAMPLE DATA: these reviews are placeholders for the university project.
// Replace them with real customer feedback (or load them from the
// PHP/MySQL backend) before the site is used publicly.
//
// Avatars show the customer's initials by default, so no image files are
// needed. To use a photo instead, add an "image" value to a testimonial,
// e.g. image: "/images/testimonials/customer1.jpg"
const testimonials = [
  {
    id: 1,
    name: "Nimal Perera",
    country: "Sri Lanka",
    initials: "NP",
    image: "",
    rating: 5,
    review:
      "Our Maldives honeymoon was perfectly organised from start to finish. The resort, transfers and excursions were all exactly as promised. We could simply relax and enjoy every moment.",
  },
  {
    id: 2,
    name: "Emily Carter",
    country: "United Kingdom",
    initials: "EC",
    image: "",
    rating: 5,
    review:
      "Booking our Bali tour package was quick and easy. The itinerary had a great balance of sightseeing and free time, and the support team answered every question within minutes.",
  },
  {
    id: 3,
    name: "Kenji Tanaka",
    country: "Japan",
    initials: "KT",
    image: "",
    rating: 5,
    review:
      "SkyTrail Travels planned a wonderful family trip to Switzerland for us. The scenic train routes and hotels were excellent, and the price was very fair for the quality we received.",
  },
];

// Small helper component: draws the star rating (out of 5)
function StarRating({ rating }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1" aria-label={`Rated ${rating} out of 5 stars`}>
      {stars.map((star) => (
        <svg
          key={star}
          // Filled stars are amber, any empty stars are light grey
          className={`h-5 w-5 ${
            star <= rating ? "text-amber-400" : "text-slate-200"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Section heading ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            What Our Travelers Say
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Real stories from travelers who explored the world with SkyTrail
            Travels.
          </p>
          {/* Small decorative line under the heading */}
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-teal-500"></div>
        </div>

        {/* ---------- Review cards grid ---------- */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16">
          {testimonials.map((testimonial) => (
            // "group" lets child elements react when the card is hovered
            <article
              key={testimonial.id}
              className="group relative flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-md transition duration-500 hover:-translate-y-2 hover:border-sky-100 hover:bg-white hover:shadow-2xl"
            >
              {/* Decorative quotation mark in the top-right corner */}
              <svg
                className="absolute right-6 top-6 h-10 w-10 text-sky-100 transition-colors duration-500 group-hover:text-teal-200"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4 17v-5c0-3.3 2.2-6 5.5-6.5l.5 1.9C8.3 7.9 7.3 9 7.1 10.5H10V17H4zm10 0v-5c0-3.3 2.2-6 5.5-6.5l.5 1.9c-1.7.5-2.7 1.6-2.9 3.1H20V17h-6z" />
              </svg>

              {/* 5-star rating */}
              <StarRating rating={testimonial.rating} />

              {/* Review text */}
              <p className="mt-5 flex-1 text-base leading-relaxed text-slate-600">
                "{testimonial.review}"
              </p>

              {/* Customer details: avatar, name and country */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                {testimonial.image ? (
                  // Photo avatar (used when an image path is provided)
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-sky-100 transition duration-500 group-hover:ring-teal-300"
                  />
                ) : (
                  // Initials avatar (default)
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-sky-600 text-lg font-bold text-white ring-2 ring-sky-100 transition duration-500 group-hover:bg-teal-500 group-hover:ring-teal-200"
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {testimonial.name}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                    {/* Location pin icon */}
                    <svg
                      className="h-3.5 w-3.5 text-teal-500"
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
                    {testimonial.country}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;