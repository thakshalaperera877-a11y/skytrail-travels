
const features = [
  {
    icon: "✈️",
    title: "Trusted Travel Agency",
    description:
      "Enjoy safe, reliable and unforgettable travel experiences with our expert team.",
  },
  {
    icon: "💰",
    title: "Best Price Guarantee",
    description:
      "Discover amazing destinations with affordable prices and great travel deals.",
  },
  {
    icon: "🎧",
    title: "24/7 Customer Support",
    description:
      "Our friendly support team is always ready to assist you throughout your journey.",
  },
  {
    icon: "🌍",
    title: "Worldwide Destinations",
    description:
      "Explore beautiful destinations and create memories around the world.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest text-teal-600">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
            Travel With Confidence
          </h2>

          <p className="mt-4 text-slate-600">
            We make every journey comfortable, memorable and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-3xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
