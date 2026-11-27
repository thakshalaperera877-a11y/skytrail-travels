import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedDestinations from './components/FeaturedDestinations'
import FeaturedPackages from './components/FeaturedPackages'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import LatestBlogs from './components/LatestBlogs'
import Booking from './pages/Booking'
import Register from './pages/Register'
import Login from './pages/Login'
import MyBookings from './pages/MyBookings'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminBookings from './pages/AdminBookings'
import About from './pages/About'
import Packages from './pages/Packages'
import Contact from './pages/Contact'
import AdminEnquiries from './pages/AdminEnquiries'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'

// Pages
import Destinations from './pages/Destinations'
import DestinationDetails from './pages/DestinationDetails'


// Home Page
function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <LatestBlogs />
      <Newsletter />
    </>
  )
}

// Main App
function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* All Destinations Page */}
        <Route
          path="/destinations"
          element={<Destinations />}
        />

        {/* Individual Destination Details Page */}
        <Route
          path="/destinations/:slug"
          element={<DestinationDetails />}
        />

        <Route
          path="/booking/:slug"
          element={<Booking />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-bookings"
          element={<AdminBookings />}
        />

        <Route path="/packages" element={<Packages />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/admin-enquiries"
          element={<AdminEnquiries />}
        />

      <Route path="/gallery" element={<Gallery />} />

      <Route path="/blog" element={<Blog />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App
