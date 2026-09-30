import { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
    { name: 'About', href: '#about' },
  ];

  // Add backdrop blur when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* LEFT — Nav Links (Desktop only) */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT — Icons + Button (Desktop only) */}
        <div className="navbar-actions">
          <FaInstagram className="nav-icon" />
          <FaLinkedin className="nav-icon" />
          <a href="#contact" className="btn-primary">
            Book a Call
          </a>
        </div>

        {/* MOBILE — Hamburger Button */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* MOBILE — Dropdown Menu */}
      <div className={`navbar-mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="navbar-mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <div className="navbar-mobile-icons">
            <FaInstagram className="nav-icon" />
            <FaLinkedin className="nav-icon" />
          </div>

          <a
            href="#contact"
            className="navbar-mobile-cta"
            onClick={() => setIsOpen(false)}
          >
            Book a Call
          </a>
        </div>
      </div>

    </header>
  );
};

export default Navbar;