
function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold">
              SkyTrail <span className="text-teal-400">Travels</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Discover beautiful destinations and create unforgettable
              memories with SkyTrail Travels. Your journey starts here.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="/" className="hover:text-teal-400">Home</a></li>
              <li><a href="/about" className="hover:text-teal-400">About Us</a></li>
              <li><a href="/destinations" className="hover:text-teal-400">Destinations</a></li>
              <li><a href="/packages" className="hover:text-teal-400">Tour Packages</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Services</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Travel Planning</li>
              <li>Hotel Reservations</li>
              <li>Tour Packages</li>
              <li>Destination Guides</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Email: info@skytrailtravels.com</li>
              <li>Phone: +94 741561880</li>
              <li>Location: Sri Lanka</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-700 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} SkyTrail Travels.
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
