import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };


  // To use nav labels from JSON, add a "nav" section to sitecontent.json, e.g. nav: { home: "Home", ... }
  // Then use: siteContent.nav.home, etc.
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'How it Works', path: '/how-it-works' },
    { title: 'Get Paid', path: '/get-paid' },
    { title: 'Send Payments', path: '/send-payments' },
    { title: 'FAQ', path: '/faq' },
  ];

  return (
    <header
      className="fixed w-full z-50 bg-white border-b border-gray-200 shadow-sm py-5"
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <img
            src="/images/shake-logo_horizontal_color.png"
            alt="Shake Logo"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-base px-4 py-1 rounded-full transition-colors duration-200 relative border border-transparent ${location.pathname === item.path ? 'bg-accent shadow-sm' : 'hover:border-accent'} font-body`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden font-body text-[#2d3440]"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-secondary-dark z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-xl px-4 py-2 rounded-full transition-colors duration-200 font-body ${location.pathname === item.path ? 'text-accent' : 'text-gray-300'}`}
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
