import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick } from '../../utils/analytics';

const LandingHeader = ({ onBookRequest }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Doctor', href: '#doctor' },
    { name: 'Conditions', href: '#conditions' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Location', href: '#location' },
  ];

  const handleBookClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onBookRequest && window.innerWidth < 768) {
      onBookRequest();
      return;
    }
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100'
          : 'bg-slate-900/80 backdrop-blur-sm py-4 border-b border-white/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group flex-shrink min-w-0">
            <div className={`transition-all duration-300 rounded-xl p-1 sm:p-1.5 flex-shrink min-w-0 ${
              isScrolled || isMenuOpen ? 'bg-transparent' : 'bg-white/95 shadow-sm backdrop-blur-sm border border-white/20'
            }`}>
              <img
                src="/images/logo.png"
                alt="ActiveRehab Centre Logo"
                className="h-8 sm:h-10 lg:h-12 w-auto max-w-[150px] sm:max-w-[190px] lg:max-w-[230px] object-contain flex-shrink-0 transition-transform group-hover:scale-105"
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isScrolled ? 'text-slate-700 hover:text-brandBlue' : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${clinicConfig.phoneRaw}`}
              onClick={() => trackCallClick('header')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
                isScrolled
                  ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Phone className="w-4 h-4 text-brandOrange" />
              <span>{clinicConfig.phone}</span>
            </a>

            <button
              type="button"
              onClick={handleBookClick}
              className="flex items-center space-x-2 bg-brandOrange hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-brandOrange/25 hover:shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <a
              href={`tel:${clinicConfig.phoneRaw}`}
              onClick={() => trackCallClick('mobile_header')}
              className="p-2.5 rounded-full bg-brandOrange text-white shadow-md"
              aria-label="Call Clinic"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled || isMenuOpen ? 'text-slate-800' : 'text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-b border-slate-100 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-brandBlue"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href={`tel:${clinicConfig.phoneRaw}`}
                  onClick={() => {
                    trackCallClick('mobile_drawer');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-bold bg-slate-100 text-slate-800"
                >
                  <Phone className="w-4 h-4 text-brandOrange" />
                  <span>Call {clinicConfig.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={handleBookClick}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-bold bg-brandOrange text-white shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default LandingHeader;
