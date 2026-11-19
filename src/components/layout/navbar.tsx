// src/components/layout/navbar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { useLocale, type Locale } from '../../context/LocaleContext';
import { useContent } from '../../hooks/useContent';

const languages = [
  { code: 'EN', locale: 'en' as Locale, label: 'English' },
  { code: 'ES', locale: 'es' as Locale, label: 'Español' },
  { code: 'UZ', locale: 'uz' as Locale, label: "O'zbek" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const hoverPreviewIndexRef = useRef<number | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const languageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { locale, setLocale } = useLocale();
  const siteContent = useContent('sitecontent');

  const selectedLanguage = languages.find((l) => l.locale === locale) ?? languages[0];

  useEffect(() => {
    setOpenDropdownIndex(null);
    hoverPreviewIndexRef.current = null;
    setIsOpen(false);
    setIsLanguageOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null);
        hoverPreviewIndexRef.current = null;
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setIsLanguageOpen(false);
    setOpenDropdownIndex(null);
    hoverPreviewIndexRef.current = null;
  };

  const handleSelectLanguage = (lang: typeof languages[number]) => {
    setLocale(lang.locale);
    setIsLanguageOpen(false);
  };

  const navItems = siteContent.navbar.links;

  return (
    <header className="fixed w-full z-50 bg-white border-b border-gray-200 shadow-sm py-5">
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
        <div ref={desktopNavRef} className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navItems.map((item: { title: string; path?: string; sublinks?: { title: string; path: string }[] }, idx: number) => {
            const isChildActive = item.sublinks?.some((sub) => location.pathname === sub.path);
            const isDropdownOpen = openDropdownIndex === idx;
            const submenuId = `nav-submenu-${idx}`;
            return item.sublinks ? (
              <div
                key={item.title}
                className="relative"
                onPointerEnter={(e) => {
                  if (
                    e.pointerType !== 'touch' &&
                    typeof window !== 'undefined' &&
                    window.matchMedia('(hover: hover)').matches
                  ) {
                    hoverPreviewIndexRef.current = idx;
                    setOpenDropdownIndex(idx);
                    setIsLanguageOpen(false);
                  }
                }}
                onPointerLeave={() => {
                  if (hoverPreviewIndexRef.current === idx) {
                    hoverPreviewIndexRef.current = null;
                    setOpenDropdownIndex((current) => (current === idx ? null : current));
                  }
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    hoverPreviewIndexRef.current = null;
                    setOpenDropdownIndex((current) => (current === idx ? null : current));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && isDropdownOpen) {
                    e.preventDefault();
                    hoverPreviewIndexRef.current = null;
                    setOpenDropdownIndex(null);
                    dropdownTriggerRefs.current[idx]?.focus();
                  }
                }}
              >
                <button
                  ref={(el) => {
                    dropdownTriggerRefs.current[idx] = el;
                  }}
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-controls={submenuId}
                  onClick={() => {
                    if (hoverPreviewIndexRef.current === idx) {
                      hoverPreviewIndexRef.current = null;
                      setOpenDropdownIndex(idx);
                      return;
                    }
                    setIsLanguageOpen(false);
                    setOpenDropdownIndex((current) => (current === idx ? null : idx));
                  }}
                  className={`font-medium text-base px-4 py-1 rounded-full transition-colors duration-200 relative border border-transparent text-center font-body flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    isChildActive || isDropdownOpen
                      ? 'bg-[#e6e9ed] shadow-sm text-secondary-dark'
                      : 'hover:border-accent'
                  }`}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  id={submenuId}
                  hidden={!isDropdownOpen}
                  className="absolute left-1/2 -translate-x-1/2 pt-2 w-48 z-50"
                >
                  <div className="rounded-3xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/5 overflow-hidden py-2 mt-1">
                    {item.sublinks.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          aria-current={isSubActive ? 'page' : undefined}
                          className={`block px-5 py-2.5 text-sm font-medium transition-colors duration-200 font-body focus:outline-none focus-visible:bg-gray-100 ${
                            isSubActive
                              ? 'bg-[#e6e9ed] text-secondary-dark font-semibold border-l-4 border-secondary-dark pl-4'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={(e) => {
                            (e.currentTarget as HTMLElement).blur();
                            closeMenu();
                          }}
                        >
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                onClick={closeMenu}
                className={`font-medium text-base px-4 py-1 rounded-full transition-colors duration-200 relative border border-transparent text-center ${location.pathname === item.path ? 'bg-[#e6e9ed] shadow-sm' : 'hover:border-accent'} font-body`}
              >
                {item.title}
              </Link>
            );
          })}
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
                    const isSelected = language.locale === locale;
                    return (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => handleSelectLanguage(language)}
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
        <div className="flex flex-col items-center justify-start h-full overflow-y-auto px-4 py-16 space-y-6">
          {navItems.map((item: { title: string; path?: string; sublinks?: { title: string; path: string }[] }) => (
            item.sublinks ? (
              <div key={item.title} className="flex flex-col items-center space-y-2">
                <div className="font-semibold text-xs uppercase tracking-wider px-4 py-1 font-body text-gray-400">
                  {item.title}
                </div>
                {item.sublinks.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`font-medium text-lg px-4 py-1 rounded-full transition-colors duration-200 font-body ${location.pathname === subItem.path ? 'text-accent font-semibold' : 'text-gray-300 hover:text-white'}`}
                    onClick={closeMenu}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                className={`font-medium text-xl px-4 py-2 rounded-full transition-colors duration-200 font-body ${location.pathname === item.path ? 'text-accent font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={closeMenu}
              >
                {item.title}
              </Link>
            )
          ))}
          <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/10 p-3 backdrop-blur">
            <div className="mb-3 flex items-center justify-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              <Globe2 size={18} aria-hidden="true" />
              Language
            </div>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((language) => {
                const isSelected = language.locale === locale;
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => { handleSelectLanguage(language); closeMenu(); }}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
