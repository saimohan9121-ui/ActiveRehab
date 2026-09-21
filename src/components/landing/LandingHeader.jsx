import React, { useState, useEffect, useCallback } from 'react';
import { Phone, Menu, X, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick, trackWhatsAppClick } from '../../utils/analytics';

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const NAV_ITEMS = [
  { name: 'Doctor', href: '#doctor', sectionId: 'doctor' },
  { name: 'Conditions', href: '#conditions', sectionId: 'conditions' },
  { name: 'Why Us', href: '#why-us', sectionId: 'why-us' },
  { name: 'Treatments', href: '#treatments', sectionId: 'treatments' },
  { name: 'Reviews', href: '#testimonials', sectionId: 'testimonials' },
  { name: 'Location', href: '#location', sectionId: 'location' },
];

const LandingHeader = ({ onBookRequest, selectedLocation = null, onLocationChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // ─── Scroll Spy & Header Compactness ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Scroll spy for active section highlight
      const scrollPosition = scrollY + 140; // offset for sticky header detection
      let currentSection = '';

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = item.sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Lock Background Scroll when Mobile Drawer is Open ────────────────────────
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // ─── Close drawer on Escape key ──────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // ─── Booking Click Handler ───────────────────────────────────────────────────
  const handleBookClick = useCallback((e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (onBookRequest && window.innerWidth < 768) {
      onBookRequest();
      return;
    }

    const contactElement = document.getElementById('contact') || document.getElementById('home');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onBookRequest]);

  // ─── Nav Link Click Handler ──────────────────────────────────────────────────
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const activeBranchName = selectedLocation === 'kompally'
    ? 'ActiveRehab Kompally'
    : selectedLocation === 'kondapur'
      ? 'ActiveRehab Kondapur'
      : 'ActiveRehab';

  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to consult Dr. Ashok P. Kota at ${activeBranchName}.`
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-all duration-200 ${
          isScrolled
            ? 'border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)]'
            : 'border-slate-100/90 shadow-[0_1px_4px_rgba(15,23,42,0.03)]'
        }`}
        style={{
          minHeight: isScrolled ? '68px' : '76px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-200 ${
              isScrolled ? 'h-[66px] sm:h-[70px]' : 'h-[74px] sm:h-[78px]'
            }`}
          >
            {/* ── ZONE A: Brand / Logo ──────────────────────────────────────── */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center group py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 rounded-lg"
                aria-label="ActiveRehab Centre Homepage"
              >
                <img
                  src="/images/logo.png"
                  alt="ActiveRehab Centre Logo"
                  width="190"
                  height="44"
                  className={`w-auto object-contain transition-all duration-200 ${
                    isScrolled
                      ? 'h-8 sm:h-9 lg:h-9 max-w-[145px] sm:max-w-[170px] lg:max-w-[195px]'
                      : 'h-8.5 sm:h-9.5 lg:h-10.5 max-w-[150px] sm:max-w-[180px] lg:max-w-[210px]'
                  }`}
                />
              </a>

              {/* Optional Subtle Location Indicator (Large Desktop only) */}
              <span className="hidden 2xl:inline-block text-[11px] font-semibold text-slate-400 pl-3 border-l border-slate-200 tracking-wide">
                Kondapur • Kompally
              </span>
            </div>

            {/* ── ZONE B: Primary Navigation (Desktop >= 1100px / xl) ────────── */}
            <nav
              className="hidden xl:flex items-center space-x-6 2xl:space-x-8"
              aria-label="Primary navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative py-2 text-[14.5px] font-semibold transition-colors duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 rounded ${
                      isActive
                        ? 'text-brandBlue font-bold'
                        : 'text-slate-700 hover:text-brandBlue'
                    }`}
                  >
                    <span>{item.name}</span>
                    
                    {/* Active / Hover Underline Accent */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-brandOrange transition-all duration-200 ${
                        isActive
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                      }`}
                      style={{ transformOrigin: 'center' }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ── ZONE C: Action Area (Desktop & Tablet) ─────────────────────── */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Secondary Action: Call Clinic */}
              <a
                href={`tel:${clinicConfig.phoneRaw}`}
                onClick={() => trackCallClick('header', selectedLocation || 'general')}
                className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-brandBlue font-bold text-xs lg:text-sm bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-brandBlue/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2"
                aria-label={`Call ActiveRehab at ${clinicConfig.phone}`}
              >
                <Phone className="w-4 h-4 text-brandBlue flex-shrink-0" />
                <span className="tracking-tight">{clinicConfig.phone}</span>
              </a>

              {/* Primary Action: Book Appointment CTA */}
              <button
                type="button"
                onClick={handleBookClick}
                className="inline-flex items-center space-x-2 bg-brandOrange hover:bg-[#e07b06] active:bg-[#c96d03] text-white px-4.5 lg:px-5 py-2.5 rounded-xl font-bold text-xs lg:text-sm shadow-md shadow-brandOrange/25 hover:shadow-lg hover:shadow-brandOrange/35 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brandOrange focus-visible:ring-offset-2"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Book Appointment</span>
              </button>

              {/* Tablet-only Hamburger button (< 1100px / xl:hidden) */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-brandBlue hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* ── MOBILE HEADER ( < 768px / md:hidden ) ──────────────────────── */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Compact Mobile Book CTA */}
              <button
                type="button"
                onClick={handleBookClick}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-brandOrange hover:bg-[#e07b06] active:bg-[#c96d03] text-white font-black text-xs shadow-md shadow-brandOrange/25 flex items-center space-x-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brandOrange"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>

              {/* Mobile Hamburger Button (44px min touch target) */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-800 hover:text-brandBlue hover:bg-slate-100 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE / TABLET RIGHT DRAWER & BACKDROP ───────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-[2px] transition-opacity duration-200"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[340px] sm:max-w-[360px] bg-white shadow-2xl flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-250">
              
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <img
                  src="/images/logo.png"
                  alt="ActiveRehab Centre"
                  className="h-8 w-auto max-w-[140px] object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="p-4 space-y-1 flex-1" aria-label="Mobile drawer navigation">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Menu
                </div>

                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-xl font-bold text-[15px] transition-all ${
                        isActive
                          ? 'bg-blue-50 text-brandBlue border-l-4 border-brandOrange'
                          : 'text-slate-700 hover:text-brandBlue hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-brandOrange' : 'text-slate-400'}`} />
                    </a>
                  );
                })}

                {/* Location Selection in Drawer */}
                {onLocationChange && (
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1.5 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brandOrange" />
                      <span>Clinic Location</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 px-1">
                      <button
                        type="button"
                        onClick={() => {
                          onLocationChange('kondapur');
                          setIsMenuOpen(false);
                        }}
                        className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                          selectedLocation === 'kondapur'
                            ? 'bg-brandOrange text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Kondapur</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onLocationChange('kompally');
                          setIsMenuOpen(false);
                        }}
                        className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                          selectedLocation === 'kompally'
                            ? 'bg-brandOrange text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Kompally</span>
                      </button>
                    </div>
                  </div>
                )}
              </nav>

              {/* Drawer Conversion Action Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
                {/* Book Appointment CTA */}
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="w-full min-h-[48px] bg-brandOrange hover:bg-[#e07b06] active:bg-[#c96d03] text-white px-4 py-3 rounded-xl font-black text-sm shadow-md shadow-brandOrange/25 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK APPOINTMENT</span>
                </button>

                {/* Direct Call & WhatsApp in Drawer */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${clinicConfig.phoneRaw}`}
                    onClick={() => {
                      trackCallClick('mobile_drawer', selectedLocation || 'general');
                      setIsMenuOpen(false);
                    }}
                    className="min-h-[44px] bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-3 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-brandBlue" />
                    <span>Call Clinic</span>
                  </a>

                  <a
                    href={`https://wa.me/${clinicConfig.whatsappRaw}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      trackWhatsAppClick('mobile_drawer', selectedLocation || 'general');
                      setIsMenuOpen(false);
                    }}
                    className="min-h-[44px] bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingHeader;
