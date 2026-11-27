
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Destinations", path: "/destinations" },
  { label: "Tour Packages", path: "/packages" },
  { label: "My Bookings", path: "/my-bookings" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customer, setCustomer] = useState(null);

  const navigate = useNavigate();

  // Load customer details and listen for login/logout changes
  useEffect(() => {
    const loadCustomer = () => {
      const savedCustomer = localStorage.getItem("skytrail_customer");

      if (savedCustomer) {
        try {
          setCustomer(JSON.parse(savedCustomer));
        } catch {
          localStorage.removeItem("skytrail_customer");
          setCustomer(null);
        }
      } else {
        setCustomer(null);
      }
    };

    loadCustomer();

    window.addEventListener("skytrail-auth-change", loadCustomer);

    return () => {
      window.removeEventListener("skytrail-auth-change", loadCustomer);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("skytrail_customer");

    window.dispatchEvent(new Event("skytrail-auth-change"));

    setCustomer(null);
    closeMenu();
    navigate("/");
  };

  const getLinkClass = ({ isActive }) => {
    return isActive
      ? "navbar__link navbar__link--active"
      : "navbar__link";
  };

  return (
    <header className="navbar">
      <nav className="navbar__container" aria-label="Main navigation">

        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
          </span>

          <span className="navbar__logo-text">
            SkyTrail <span className="navbar__logo-accent">Travels</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={
            isMenuOpen
              ? "navbar__toggle navbar__toggle--open"
              : "navbar__toggle"
          }
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>

        {/* Navigation Menu */}
        <div
          id="navbar-menu"
          className={
            isMenuOpen
              ? "navbar__menu navbar__menu--open"
              : "navbar__menu"
          }
        >
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Customer Login / Logout */}
          <div className="navbar__actions">
            {customer ? (
              <>
                <span className="navbar__link">
                  Hi, {customer.first_name}
                </span>

                <button
                  type="button"
                  className="navbar__btn navbar__btn--primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="navbar__btn navbar__btn--outline"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="navbar__btn navbar__btn--primary"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
