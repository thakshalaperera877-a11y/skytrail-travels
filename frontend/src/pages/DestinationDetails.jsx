
import { Link, useParams } from 'react-router-dom'

const destinations = [
  {
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: '/images/destinations/bali.jpg',
    price: 285000,
    description: 'Explore beautiful beaches, lush rice terraces, ancient temples and unforgettable tropical experiences.',
    highlights: ['Uluwatu Temple', 'Tegallalang Rice Terraces', 'Nusa Penida Island', 'Ubud Monkey Forest'],
    duration: '5 Days / 4 Nights',
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    image: '/images/destinations/maldives.jpg',
    price: 195000,
    description: 'Experience crystal-clear waters, luxury overwater villas, beautiful coral reefs and relaxing island life.',
    highlights: ['Overwater Villas', 'Snorkelling', 'Maafushi Island', 'Sunset Cruises'],
    duration: '4 Days / 3 Nights',
  },
  {
    slug: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    image: '/images/destinations/switzerland.jpg',
    price: 695000,
    description: 'Discover breathtaking Alpine mountains, beautiful lakes, scenic train journeys and charming villages.',
    highlights: ['Swiss Alps', 'Lake Lucerne', 'Jungfraujoch', 'Interlaken'],
    duration: '7 Days / 6 Nights',
  },
  {
    slug: 'japan',
    name: 'Japan',
    country: 'Japan',
    image: '/images/destinations/japan.jpg',
    price: 495000,
    description: 'Explore traditional temples, cherry blossoms, Japanese culture and exciting modern cities.',
    highlights: ['Mount Fuji', 'Tokyo', 'Kyoto Temples', 'Osaka'],
    duration: '6 Days / 5 Nights',
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: '/images/destinations/dubai.jpg',
    price: 245000,
    description: 'Enjoy iconic skyscrapers, luxury shopping, exciting desert safaris and unforgettable experiences.',
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Desert Safari', 'Palm Jumeirah'],
    duration: '5 Days / 4 Nights',
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    image: '/images/destinations/thailand.jpg',
    price: 165000,
    description: 'Experience tropical beaches, traditional temples, vibrant street markets and beautiful islands.',
    highlights: ['Phuket', 'Phi Phi Islands', 'Bangkok', 'Krabi'],
    duration: '5 Days / 4 Nights',
  },
]

function DestinationDetails() {
  const { slug } = useParams()

  const destination = destinations.find(
    (item) => item.slug === slug
  )

  if (!destination) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Destination Not Found
        </h1>

        <Link
          to="/destinations"
          className="mt-6 rounded-full bg-sky-600 px-6 py-3 text-white"
        >
          Back to Destinations
        </Link>
      </main>
    )
  }

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Hero Image */}
      <section className="relative h-[450px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-sm uppercase tracking-widest text-teal-300 font-semibold">
              Explore {destination.country}
            </p>

            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold">
              {destination.name}
            </h1>

            <p className="mt-4 text-lg">
              Discover unforgettable travel experiences
            </p>
          </div>
        </div>
      </section>

      {/* Destination Information */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2">

            <span className="text-teal-600 font-semibold uppercase tracking-widest text-sm">
              Destination Overview
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Discover {destination.name}
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              {destination.description}
            </p>

            {/* Popular Attractions */}
            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Popular Attractions
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.highlights.map((place, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
                >
                  <span className="text-teal-600 font-bold">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 font-semibold text-slate-800">
                    {place}
                  </h3>
                </div>
              ))}
            </div>

          </div>

          {/* Booking Card */}
          <aside>
            <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100 sticky top-24">

              <p className="text-sm text-slate-500 uppercase font-semibold">
                Starting From
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-sky-700">
                LKR {destination.price.toLocaleString('en-US')}
              </h2>

              <div className="mt-6 border-t border-slate-100 pt-5 space-y-4">

                <div className="flex justify-between">
                  <span className="text-slate-500">Country</span>
                  <span className="font-semibold">
                    {destination.country}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-semibold">
                    {destination.duration}
                  </span>
                </div>

              </div>

              {/* Book Now Button */}
              <Link
                to={`/booking/${destination.slug}`}
                className="mt-8 block w-full rounded-full bg-teal-500 px-6 py-3 text-center font-semibold text-white hover:bg-teal-600 transition"
              >
                Book Now
              </Link>

              <Link
                to="/destinations"
                className="mt-4 block text-center text-sky-600 font-semibold hover:underline"
              >
                ← Back to Destinations
              </Link>

            </div>
          </aside>

        </div>
      </section>

    </main>
  )
}

export default DestinationDetails
