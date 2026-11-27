import React from "react";

const galleryImages = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Maldives",
    category: "Beach Escape",
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    title: "Bali",
    category: "Island Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    title: "Thailand",
    category: "Travel Experience",
  },
  {
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
    title: "New York",
    category: "City Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    title: "Mountain Escape",
    category: "Nature",
  },
  {
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    title: "Lake View",
    category: "Relaxation",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Nature",
    category: "Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    title: "Ocean",
    category: "Beach Escape",
  },
  {
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac96b3",
    title: "Scenic Journey",
    category: "Travel Experience",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Travel Gallery
        </h1>

        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Explore beautiful destinations and unforgettable travel
          experiences through our gallery.
        </p>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Explore the World
          </h2>

          <p className="text-gray-600">
            Discover the beauty of destinations around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md h-72"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm text-gray-200 mb-1">
                  {item.category}
                </p>

                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
