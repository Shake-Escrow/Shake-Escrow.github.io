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
              className={
              `font-medium text-base font-body text-[#2d3440] px-4 py-1 rounded-full transition-colors duration-200 relative border border-transparent ` +
              (location.pathname === item.path
                ? 'bg-accent shadow-sm'
                : 'hover:border-accent')
            }
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
        className={`md:hidden fixed inset-0 bg-secondary-dark z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-xl font-body text-[#2d3440] ${
                location.pathname === item.path 
                  ? 'text-accent' 
                  : 'hover:text-accent'
              }`}
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
