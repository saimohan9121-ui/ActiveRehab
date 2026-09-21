import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SEO from './seo/SEO';
import StructuredData from './seo/StructuredData';
import LandingHeader from './landing/LandingHeader';
import HeroSection from './landing/HeroSection';
import QuickTrustBar from './landing/QuickTrustBar';
import DoctorAuthority from './landing/DoctorAuthority';
import ConditionsGrid from './landing/ConditionsGrid';
import WhyChooseUs from './landing/WhyChooseUs';
import TreatmentServices from './landing/TreatmentServices';
import TreatmentProcess from './landing/TreatmentProcess';
import FAQSection from './landing/FAQSection';
import { defaultFaqs } from '../data/faqsData';
import ClinicLocation from './landing/ClinicLocation';
import FinalCTA from './landing/FinalCTA';
import MobileStickyCTA from './landing/MobileStickyCTA';
import MobileBookingModal from './landing/MobileBookingModal';
import { clinicConfig } from '../config/clinicConfig';
import { captureAttribution } from '../utils/attribution';
import { trackCallClick, trackLocationSelect } from '../utils/analytics';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

const HomePage = () => {
  // Mobile booking modal state
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState('');

  // Global location state: preselected via ?location=kondapur / ?location=kompally, or null for general Hyderabad
  const [selectedLocation, setSelectedLocation] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const loc = params.get('location')?.toLowerCase();
      if (loc === 'kondapur' || loc === 'kompally') {
        return loc;
      }
    }
    return null;
  });

  useEffect(() => {
    // Capture URL attribution (GCLID, GBRAID, WBRAID, UTMs) on landing
    captureAttribution();
  }, []);

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    trackLocationSelect(newLocation);
  };

  const openMobileModal = () => setIsMobileModalOpen(true);
  const closeMobileModal = () => setIsMobileModalOpen(false);

  // Shared handler for all Book Assessment buttons (desktop, tablet, mobile)
  const handleBookAssessment = (concern) => {
    const selected = concern || 'Back Pain';
    setSelectedConcern(selected);

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileModalOpen(true);
    } else {
      const contactEl = document.getElementById('contact') || document.getElementById('home');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const inputEl = document.getElementById('user_name');
          if (inputEl) {
            inputEl.focus({ preventScroll: true });
          }
        }, 550);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-clip font-sans pb-16 md:pb-0">
      <Toaster position="top-right" />

      {/* SEO Document Head & Metadata */}
      <SEO
        title="Chiropractor in Hyderabad | Kondapur & Kompally | ActiveRehab"
        description="Consult ActiveRehab for chiropractic and rehabilitation care in Kondapur and Kompally, Hyderabad. Care for back pain, sciatica, neck pain, posture problems and related musculoskeletal concerns."
        canonical="https://chiropractic.activerehab.in/"
      />

      {/* Schema.org JSON-LD Structured Data */}
      <StructuredData faqs={defaultFaqs} />

      {/* 01. Header */}
      <LandingHeader
        onBookRequest={openMobileModal}
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
      />

      {/* 02. Hero Section + Location Selector + Form */}
      <HeroSection
        onBookRequest={openMobileModal}
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
        selectedConcern={selectedConcern}
        onConcernChange={setSelectedConcern}
      />

      {/* 03. Quick Trust Strip (17+ Yrs, 2 Hyd Locations, Personalized Care, Easy Booking) */}
      <QuickTrustBar />

      {/* 04. Doctor Authority */}
      <DoctorAuthority onBookRequest={openMobileModal} />

      {/* 05. Conditions Grid */}
      <ConditionsGrid onBookRequest={handleBookAssessment} />

      {/* 06. Why Choose ActiveRehab Centre */}
      <WhyChooseUs />

      {/* 07. Chiropractic & Rehabilitation Services */}
      <TreatmentServices onBookRequest={openMobileModal} />

      {/* 08. How Your Treatment Plan Works (3-Step Pathway) */}
      <TreatmentProcess />

      {/* 09. Google Reviews */}
      <Testimonials
        onBookRequest={openMobileModal}
        selectedLocation={selectedLocation || 'kondapur'}
        onLocationChange={handleLocationChange}
      />

      {/* 10. FAQ Section (DOM-rendered accordions & 3-part layout) */}
      <FAQSection
        faqs={defaultFaqs}
        onBookRequest={handleBookAssessment}
        selectedLocation={selectedLocation || 'kondapur'}
        onLocationChange={handleLocationChange}
      />

      {/* 11. Hyderabad Locations: Kondapur / Kompally & Responsive Map */}
      <ClinicLocation
        selectedLocation={selectedLocation || 'kondapur'}
        onLocationChange={handleLocationChange}
      />

      {/* 12. Final Conversion CTA */}
      <FinalCTA
        onBookRequest={openMobileModal}
        selectedLocation={selectedLocation || 'kondapur'}
        onLocationChange={handleLocationChange}
      />

      {/* 13. Footer */}
      <footer className="bg-slate-950 text-white pt-14 pb-12 border-t border-white/10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            
            {/* Col 1: Brand & Identity */}
            <div className="space-y-3.5">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="ActiveRehab Centre Logo"
                  className="h-10 sm:h-12 w-auto max-w-[200px] object-contain bg-white p-1.5 rounded-xl shadow-sm flex-shrink-0"
                />
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Personalized chiropractic and physical rehabilitation care serving Hyderabad from our Kondapur and Kompally clinics.
              </p>
              <div className="text-xs text-slate-500 font-medium">
                Lead Chiropractor: Dr. Ashok P. Kota (Master of Chiropractic)
              </div>
            </div>

            {/* Col 2: Fast Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5 border-b border-brandOrange/40 pb-1.5 inline-block">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#doctor" className="hover:text-white transition-colors">Dr. Ashok P. Kota</a></li>
                <li><a href="#conditions" className="hover:text-white transition-colors">Conditions Managed</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Services &amp; Care</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Google Reviews</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Hyderabad Locations</a></li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5 border-b border-brandOrange/40 pb-1.5 inline-block">
                Clinical Care
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-400">
                <li>Chiropractic Adjustments</li>
                <li>Back Pain Therapy</li>
                <li>Neck &amp; Cervical Care</li>
                <li>Posture Correction &amp; Ergonomics</li>
                <li>Sciatica Management</li>
                <li>Physical Rehabilitation</li>
              </ul>
            </div>

            {/* Col 4: Hyderabad Locations (Compact links with directions) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5 border-b border-brandOrange/40 pb-1.5 inline-block">
                Hyderabad Locations
              </h4>
              <div className="space-y-3.5 text-xs text-slate-400">
                {/* Kondapur Clinic */}
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-white font-bold mb-0.5 flex items-center justify-between">
                    <span>Kondapur Clinic</span>
                    <a
                      href={clinicConfig.branches.kondapur.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brandOrange hover:underline inline-flex items-center"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-tight">
                    Plot No. 1272, 80 Feet Road, above Burfi Ghar, Kondapur
                  </p>
                </div>

                {/* Kompally Clinic */}
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-white font-bold mb-0.5 flex items-center justify-between">
                    <span>Kompally Clinic</span>
                    <a
                      href={clinicConfig.branches.kompally.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brandOrange hover:underline inline-flex items-center"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-tight">
                    Hale Clinics, 2nd Floor, Suchitra Road, Opp. Decathlon
                  </p>
                </div>

                {/* Direct Phone */}
                <div className="flex items-center space-x-2 pt-1 text-xs">
                  <Phone className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
                  <a
                    href={`tel:${clinicConfig.phoneRaw}`}
                    onClick={() => trackCallClick('footer')}
                    className="text-white font-bold hover:text-brandOrange transition-colors"
                  >
                    {clinicConfig.phone}
                  </a>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">Mon - Sat: 9 AM - 9 PM</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium">
            <div>
              © {new Date().getFullYear()} {clinicConfig.fullName}. All rights reserved.
            </div>
            <div className="mt-2 sm:mt-0 text-center sm:text-right">
              Chiropractic &amp; Physical Rehabilitation Care in Kondapur &amp; Kompally, Hyderabad
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Conversion Bar (<768px) — Location-Aware */}
      <MobileStickyCTA
        onBookClick={openMobileModal}
        selectedLocation={selectedLocation || 'kondapur'}
      />

      {/* Mobile Booking Modal — Bottom Sheet */}
      <MobileBookingModal
        isOpen={isMobileModalOpen}
        onClose={closeMobileModal}
        selectedLocation={selectedLocation || 'kondapur'}
        onLocationChange={handleLocationChange}
        initialConcern={selectedConcern}
      />
    </div>
  );
};

export default HomePage;
