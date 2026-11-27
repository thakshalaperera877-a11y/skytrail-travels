import React from "react";

const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    category: "Beach Travel",
    title: "Discover the Beauty of the Maldives",
    description:
      "Explore crystal-clear waters, beautiful beaches and unforgettable island experiences in the Maldives.",
    date: "Travel Inspiration",
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    category: "Adventure",
    title: "Exploring the Magical Island of Bali",
    description:
      "Discover Bali's tropical landscapes, cultural attractions and peaceful hidden destinations.",
    date: "Destination Guide",
  },
  {
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    category: "Nature",
    title: "Beautiful Nature Destinations to Explore",
    description:
      "Escape everyday life and discover breathtaking natural landscapes around the world.",
    date: "Travel Tips",
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    category: "Adventure Travel",
    title: "The Ultimate Mountain Adventure",
    description:
      "Experience beautiful mountain scenery and discover exciting outdoor travel experiences.",
    date: "Adventure Guide",
  },
  {
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    category: "Beach Travel",
    title: "Relaxing Coastal Escapes",
    description:
      "Find peaceful coastal destinations perfect for relaxation and unforgettable holidays.",
    date: "Travel Inspiration",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    category: "Travel Tips",
    title: "Tips for Planning Your Next Journey",
    description:
      "Learn simple travel planning tips to make your next holiday more enjoyable and memorable.",
    date: "Travel Tips",
  },
];

function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Travel Blog
        </h1>

        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Travel stories, destination guides and inspiration
          to help you plan your next adventure.
        </p>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Latest Travel Stories
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Explore travel inspiration, useful tips and
            beautiful destinations from around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <span className="text-sm font-semibold text-blue-600">
                  {post.category}
                </span>

                <p className="text-sm text-gray-400 mt-2">
                  {post.date}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-5">
                  {post.description}
                </p>

                <button
                  type="button"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition"
                  onClick={() =>
                    alert("Full blog articles are not available yet.")
                  }
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;