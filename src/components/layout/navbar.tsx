// src/components/layout/navbar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { GoBrowser } from "react-icons/go";
import siteContent from '../../content/en/sitecontent.json';

const languages = [
  { code: 'EN', label: 'English', region: 'United States' },
  { code: 'ES', label: 'Español', region: 'Latinoamérica' },
];

const selectedLanguage = languages[0];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsLanguageOpen(false);
  };

  const navItems = siteContent.navbar.links;

  return (
    <header
      className="fixed w-full z-50 bg-white border-b border-gray-200 shadow-sm py-5"
    >
      <nav className="container mx-auto px-4 lg:px-6 flex justify-between items-center gap-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 shrink-0"
          onClick={closeMenu}
        >
          <img
            src="/images/shake-logo_horizontal_color.png"
            alt="Shake Logo"
            className="h-9 w-auto shrink-0"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-base px-4 py-1 rounded-full transition-colors duration-200 relative border border-transparent text-center ${location.pathname === item.path ? 'bg-[#e6e9ed] shadow-sm' : 'hover:border-accent'} font-body`}
            >
              {item.title}
            </Link>
          ))}
          <div className="relative" ref={languageRef}>
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-base font-medium text-secondary-dark shadow-sm transition-all duration-200 hover:border-accent hover:bg-[#f7f9fb] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              onClick={() => setIsLanguageOpen((current) => !current)}
              aria-haspopup="menu"
              aria-expanded={isLanguageOpen}
              aria-label="Select website language"
            >
              <Globe2 size={18} aria-hidden="true" className="text-secondary-dark/80" />
              <span>{selectedLanguage.code}</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`text-secondary-dark/70 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isLanguageOpen && (
              <div
                className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-secondary-dark/10 ring-1 ring-black/5"
                role="menu"
                aria-label="Language options"
              >
                <div className="border-b border-gray-100 px-5 py-4">
                  <p className="font-body text-sm font-semibold text-secondary-dark">Choose language</p>
                </div>
                <div className="p-2">
                  {languages.map((language) => {
                    const isSelected = language.code === selectedLanguage.code;

                    return (
                      <button
                        key={language.code}
                        type="button"
                        className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left font-body transition-colors duration-200 ${
                          isSelected ? 'bg-[#e6e9ed] text-secondary-dark' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        role="menuitemradio"
                        aria-checked={isSelected}
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-dark text-xs font-semibold text-white">
                            {language.code}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold">{language.label}</span>
                            <span className="block text-xs text-gray-500">{language.region}</span>
                          </span>
                        </span>
                        {isSelected && <Check size={18} className="text-accent" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <a
            href="https://app.shakedefi.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-base px-5 py-1.5 rounded-full bg-accent text-secondary-dark transition-colors duration-200 hover:bg-opacity-90 font-body text-center"
          >
            {siteContent.navbar.launchApp}
            <GoBrowser size={24} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden font-body text-[#2d3440] shrink-0"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-secondary-dark z-50 transform transition-transform duration-300 ${
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
          <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/10 p-3 backdrop-blur">
            <div className="mb-3 flex items-center justify-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              <Globe2 size={18} aria-hidden="true" />
              Language
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((language) => {
                const isSelected = language.code === selectedLanguage.code;

                return (
                  <button
                    key={language.code}
                    type="button"
                    className={`rounded-2xl px-3 py-3 text-center font-body transition-colors duration-200 ${
                      isSelected ? 'bg-accent text-secondary-dark' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="block text-sm font-bold">{language.code}</span>
                    <span className="block text-xs">{language.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <a
            href="https://app.shakedefi.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-xl px-6 py-2 rounded-full bg-accent text-secondary-dark transition-colors duration-200 hover:bg-opacity-90 font-body"
            onClick={closeMenu}
          >
            {siteContent.navbar.launchApp}
            <GoBrowser size={24} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
