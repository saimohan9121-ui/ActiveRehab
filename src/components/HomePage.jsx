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
import Testimonials from './landing/Testimonials';
import FAQSection from './landing/FAQSection';
import { defaultFaqs } from '../data/faqsData';
import ClinicLocation from './landing/ClinicLocation';
import FinalCTA from './landing/FinalCTA';
import LandingFooter from './landing/LandingFooter';
import MobileStickyCTA from './landing/MobileStickyCTA';
import MobileBookingModal from './landing/MobileBookingModal';
import { captureAttribution } from '../utils/attribution';
import { trackLocationSelect } from '../utils/analytics';

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
      <LandingFooter />

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
