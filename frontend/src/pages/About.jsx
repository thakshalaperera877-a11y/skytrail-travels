
import { Link } from "react-router-dom";

const values = [
  {
    icon: "🌍",
    title: "Explore the World",
    description:
      "Discover beautiful destinations and experience different cultures around the world.",
  },
  {
    icon: "💙",
    title: "Customer First",
    description:
      "We focus on understanding our travellers and making every journey comfortable.",
  },
  {
    icon: "✨",
    title: "Quality Experiences",
    description:
      "We aim to provide carefully planned holidays and memorable travel experiences.",
  },
  {
    icon: "🤝",
    title: "Trust and Reliability",
    description:
      "We believe in honest service, reliable support and building lasting relationships.",
  },
];

const reasons = [
  "Carefully selected travel destinations",
  "Affordable and attractive tour packages",
  "Simple and convenient booking process",
  "Dedicated customer support",
  "Memorable travel experiences",
  "Travel options for different budgets",
];

function About() {
  return (
    <main className="bg-white text-slate-800">

      {/* Hero Section */}
      <section className="relative min-h-[430px] flex items-center justify-center text-center px-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/hero-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/65" />

        <div className="relative z-10 max-w-3xl text-white">
          <p className="text-teal-300 font-bold uppercase tracking-[4px]">
            Discover. Explore. Experience.
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mt-5">
            About SkyTrail Travels
          </h1>

          <p className="mt-6 text-lg text-slate-200 leading-8">
            Your journey to unforgettable destinations
            starts with us. Discover the world with
            SkyTrail Travels.
          </p>

          <Link
            to="/destinations"
            className="inline-block mt-8 bg-teal-500 hover:bg-teal-600 px-8 py-3 rounded-full font-bold transition"
          >
            Explore Destinations
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-teal-600 font-bold uppercase tracking-widest">
              Who We Are
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 text-slate-900">
              Making Every Journey Special
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              SkyTrail Travels is a travel agency concept
              designed to help travellers discover
              destinations and plan memorable holidays.
              Our platform brings destinations, tour
              packages and booking services together in
              one convenient place.
            </p>

            <p className="mt-4 text-slate-600 leading-8">
              Whether you dream of relaxing on tropical
              beaches, exploring beautiful mountains or
              discovering new cultures, SkyTrail Travels
              helps you explore your travel possibilities.
            </p>

            <Link
              to="/destinations"
              className="inline-block mt-7 text-teal-600 font-bold hover:underline"
            >
              Discover Our Destinations →
            </Link>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src="/images/hero-bg.jpg"
              alt="Beautiful travel destination"
              className="w-full h-[350px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-slate-50 py-20 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl p-9 shadow-sm border border-slate-100">
            <div className="text-4xl">🎯</div>

            <h2 className="text-2xl font-bold mt-5">
              Our Mission
            </h2>

            <p className="mt-4 text-slate-600 leading-8">
              Our mission is to make travel planning
              simple and convenient by providing
              accessible destination information,
              attractive tour packages and an easy
              booking experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-9 shadow-sm border border-slate-100">
            <div className="text-4xl">🚀</div>

            <h2 className="text-2xl font-bold mt-5">
              Our Vision
            </h2>

            <p className="mt-4 text-slate-600 leading-8">
              Our vision is to become a trusted travel
              platform that inspires people to explore
              the world and enjoy meaningful travel
              experiences.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-5 py-20">

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-teal-600 font-bold uppercase tracking-widest">
            What We Believe
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Our Core Values
          </h2>

          <p className="text-slate-600 mt-4">
            The principles that guide our approach
            to travel and customer service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-4xl">
                {value.icon}
              </div>

              <h3 className="text-xl font-bold mt-5">
                {value.title}
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 text-white py-20 px-5">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-teal-400 font-bold uppercase tracking-widest">
              Why Travel With Us
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
              Why Choose SkyTrail Travels?
            </h2>

            <p className="text-slate-300 mt-5 leading-8">
              We bring together useful travel information
              and convenient booking features to help
              make planning your next holiday easier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex gap-3 items-start bg-white/10 rounded-xl p-4"
              >
                <span className="text-teal-400 text-xl">✓</span>

                <p className="text-slate-200">
                  {reason}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Ready for Your Next Adventure?
          </h2>

          <p className="text-slate-600 mt-5 leading-8">
            Explore amazing destinations and find a
            travel package that matches your dreams.
            Your next journey starts here.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/destinations"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-bold transition"
            >
              Explore Destinations
            </Link>

            <Link
              to="/"
              className="border border-slate-300 hover:border-teal-500 px-8 py-3 rounded-full font-bold transition"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

export default About;
