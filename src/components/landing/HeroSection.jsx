import React from 'react';
import { Phone, MapPin, Award, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AppointmentForm from './AppointmentForm';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick, trackWhatsAppClick } from '../../utils/analytics';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const HeroSection = ({ 
  onBookRequest, 
  selectedLocation = null, 
  onLocationChange,
  selectedConcern = '',
  onConcernChange
}) => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // WhatsApp message based on selected branch
  const activeBranchName = selectedLocation === 'kompally' 
    ? 'ActiveRehab Kompally' 
    : selectedLocation === 'kondapur' 
      ? 'ActiveRehab Kondapur' 
      : 'ActiveRehab (Kondapur / Kompally)';

  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to consult Dr. Ashok P. Kota at ${activeBranchName}.`
  );

  return (
    <section
      id="home"
      className="relative bg-slate-950 overflow-hidden"
    >
      {/* ── Reduced-motion: hide video, keep static dark bg ── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #hero-bg-video { display: none !important; }
        }
      `}</style>

      {/*
        HERO BACKGROUND VIDEO
        ─────────────────────
        Boundary: starts at top of this <section> (below fixed header via paddingTop).
        Ends at </section>. position: fixed is NEVER used.

        CLARITY FIX:
        ─────────────────────────────────────────────────────────────────
        Previous state:  opacity 0.28 × overlay 0.82–0.92 → ~5% visible (buried)
        New state:       opacity 0.65 + CSS filter boost → ~35–45% visible
        Strategy:        3-zone gradient overlay instead of uniform dark blanket
          Left  (0–35%)  : 88% dark  — headline readability
          Center (35–60%): 55% dark  — video breathes through here
          Right (60–100%): 78% dark  — form stays dominant
        Plus a localized radial shadow only under the text block for safety.
        ─────────────────────────────────────────────────────────────────
      */}
      <div
        id="hero-bg-video"
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        {/* ── Video ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero side.jpg"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover"
          style={{
            pointerEvents: 'none',
            // Raised from 0.28 → 0.65 for meaningful visual presence
            opacity: 0.65,
            objectPosition: 'center center',
            // Subtle filter to punch up footage without altering color mood:
            // brightness lifts mid-tones, contrast separates subject from bg,
            // saturate makes the chiropractic visual more identifiable
            filter: 'brightness(1.2) contrast(1.08) saturate(1.15)',
          }}
        >
          <source src="/Activerehab Overaly Background Video.mp4" type="video/mp4" />
        </video>

        {/*
          ── Smart 3-Zone Gradient Overlay ──
          Replaces the old flat 82–92% dark blanket.

          Zone 1 (left, 0–35%):   rgba(2,6,23,0.88) — strong coverage for H1
          Zone 2 (center, 35–60%): rgba(2,6,23,0.52) — video breathes here
          Zone 3 (right, 60–100%): rgba(2,6,23,0.78) — form remains dominant

          This gives the CENTER the visibility window the user wants
          while protecting the left headline zone and right form zone.
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg,' +
              'rgba(2,6,23,0.88) 0%,' +     /* left — headline protection */
              'rgba(2,6,23,0.88) 28%,' +    /* still dark up to where copy ends */
              'rgba(2,6,23,0.52) 50%,' +    /* center breathing zone — video visible */
              'rgba(2,6,23,0.70) 65%,' +    /* transition toward form */
              'rgba(2,6,23,0.80) 100%)',    /* right — form protection */
          }}
        />

        {/*
          ── Text-Zone Radial Shadow (localized) ──
          A soft dark pool directly behind the headline block only.
          This means we do NOT need to darken the entire hero for text safety —
          only the exact area behind H1, copy, and CTAs gets extra protection.
          Positioned: left 0 to ~50% wide, full height.
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 90% at 15% 55%,' +
              'rgba(2,6,23,0.45) 0%,' +
              'rgba(2,6,23,0.0) 100%)',
          }}
        />

        {/*
          ── Bottom-edge Vignette (cinematic tonal fade) ──
          A very narrow (~80px) gradient at the BOTTOM of the hero only.
          Fades from transparent → the same slate-900 colour that the
          trust strip uses as its background.
          This sits INSIDE <HeroSection>, so the video does not bleed
          into the trust strip — it just prevents the hard cut look.
        */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '80px',
            background: 'linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,1) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ──────────────────────────────
          MOBILE HERO (<md)
      ────────────────────────────── */}
      <div className="md:hidden relative z-10 px-4 pt-5 pb-7 text-left">
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 mb-3">
          <MapPin className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
            ACTIVE REHAB CHIROPRACTIC &amp; PHYSIOTHERAPY CENTRE
          </span>
        </div>

        {/* H1 with dynamic location */}
        <h1 className="text-[1.85rem] font-black text-white leading-[1.15] tracking-tight mb-2">
          Chiropractor in{' '}
          <span className="text-brandOrange underline decoration-white/20 underline-offset-4">
            {selectedLocation === 'kondapur'
              ? 'Kondapur, Hyderabad'
              : selectedLocation === 'kompally'
              ? 'Kompally, Hyderabad'
              : 'Hyderabad'}
          </span>
        </h1>

        {/* Supporting Location Line when general */}
        {!selectedLocation && (
          <div className="text-xs font-bold text-amber-300 tracking-wide mb-2.5 flex items-center space-x-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brandOrange"></span>
            <span>Kondapur • Kompally Clinics</span>
          </div>
        )}

        {/* Prominent Location Selector immediately associated with H1 */}
        <div className="bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-2xl mb-3.5 shadow-inner">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-1 flex items-center justify-between">
            <span>Select Clinic Location:</span>
            {selectedLocation && (
              <span className="text-brandOrange font-semibold capitalize">Active: {selectedLocation}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onLocationChange && onLocationChange('kondapur')}
              className={`min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                selectedLocation === 'kondapur'
                  ? 'bg-brandOrange text-white shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Kondapur</span>
            </button>

            <button
              type="button"
              onClick={() => onLocationChange && onLocationChange('kompally')}
              className={`min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                selectedLocation === 'kompally'
                  ? 'bg-brandOrange text-white shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Kompally</span>
            </button>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm text-white font-medium leading-relaxed mb-3">
          Specialized chiropractic and rehabilitation care for <span className="text-brandOrange font-bold">back pain</span>, <span className="text-brandOrange font-bold">sciatica</span>, <span className="text-brandOrange font-bold">neck/cervical pain</span>, <span className="text-brandOrange font-bold">spondylitis</span>, <span className="text-brandOrange font-bold">headaches</span> and <span className="text-brandOrange font-bold">posture problems</span>.
        </p>

        {/* Above-the-fold Pain Point Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Pain points treated">
          <span className="text-[11px] font-semibold bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/15">
            Back Pain
          </span>
          <span className="text-[11px] font-semibold bg-brandOrange/25 text-brandOrange px-2.5 py-1 rounded-lg border border-brandOrange/40 font-bold">
            Sciatica
          </span>
          <span className="text-[11px] font-semibold bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/15">
            Neck / Cervical
          </span>
          <span className="text-[11px] font-semibold bg-brandOrange/25 text-brandOrange px-2.5 py-1 rounded-lg border border-brandOrange/40 font-bold">
            Spondylitis
          </span>
          <span className="text-[11px] font-semibold bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/15">
            Headaches
          </span>
          <span className="text-[11px] font-semibold bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/15">
            Posture Correction
          </span>
        </div>

        {/* Mobile Primary CTAs */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onBookRequest}
            className="w-full min-h-[48px] bg-brandOrange hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-3 rounded-xl font-black text-sm shadow-lg shadow-brandOrange/35 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>BOOK APPOINTMENT</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${clinicConfig.phoneRaw}`}
              onClick={() => trackCallClick('mobile_hero', selectedLocation || 'general')}
              className="min-h-[44px] bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 px-3 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brandOrange" />
              <span>Call Clinic</span>
            </a>

            <a
              href={`https://wa.me/${clinicConfig.whatsappRaw}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick('mobile_hero', selectedLocation || 'general')}
              className="min-h-[44px] bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────
          DESKTOP HERO (≥md)
      ────────────────────────────── */}
      <div className="hidden md:block relative z-10 py-12 lg:py-16 min-h-[84vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

            {/* Left Column — Copy */}
            <motion.div
              className="lg:col-span-7 space-y-4 text-left"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-4 h-4 text-brandOrange" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-200">
                  ACTIVE REHAB CHIROPRACTIC &amp; PHYSIOTHERAPY CENTRE
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Chiropractor in <br />
                <span className="text-brandOrange underline decoration-white/20 underline-offset-8">
                  {selectedLocation === 'kondapur'
                    ? 'Kondapur, Hyderabad'
                    : selectedLocation === 'kompally'
                    ? 'Kompally, Hyderabad'
                    : 'Hyderabad'}
                </span>
              </h1>

              {/* Location Switcher associated with H1 */}
              <div className="inline-flex items-center p-1.5 bg-slate-900/90 border border-slate-700/90 rounded-2xl shadow-md">
                <span className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">
                  Clinic Location:
                </span>
                <div className="flex space-x-1.5">
                  <button
                    type="button"
                    onClick={() => onLocationChange && onLocationChange('kondapur')}
                    className={`min-h-[44px] px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                      selectedLocation === 'kondapur'
                        ? 'bg-brandOrange text-white shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/15'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kondapur Clinic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onLocationChange && onLocationChange('kompally')}
                    className={`min-h-[44px] px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                      selectedLocation === 'kompally'
                        ? 'bg-brandOrange text-white shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/15'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kompally Clinic</span>
                  </button>
                </div>
              </div>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-white font-medium max-w-2xl leading-relaxed">
                Specialized chiropractic and rehabilitation care for <span className="text-brandOrange font-bold">back pain</span>, <span className="text-brandOrange font-bold">sciatica</span>, <span className="text-brandOrange font-bold">neck/cervical pain</span>, <span className="text-brandOrange font-bold">spondylitis</span>, <span className="text-brandOrange font-bold">headaches</span> and <span className="text-brandOrange font-bold">posture-related problems</span>.
              </p>

              {/* Pain Point Highlight Chips */}
              <div className="flex flex-wrap gap-2 pt-1" aria-label="Conditions treated">
                <span className="text-xs font-bold bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/15">
                  Back Pain
                </span>
                <span className="text-xs font-bold bg-brandOrange/25 text-brandOrange px-3 py-1.5 rounded-lg border border-brandOrange/40">
                  Sciatica Relief
                </span>
                <span className="text-xs font-bold bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/15">
                  Neck &amp; Cervical
                </span>
                <span className="text-xs font-bold bg-brandOrange/25 text-brandOrange px-3 py-1.5 rounded-lg border border-brandOrange/40">
                  Spondylitis
                </span>
                <span className="text-xs font-bold bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/15">
                  Headaches
                </span>
                <span className="text-xs font-bold bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/15">
                  Posture Correction
                </span>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                  <Award className="w-4 h-4 text-brandOrange flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">17+ Years Exp.</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-brandOrange flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">2 Hyderabad Clinics</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">Personalized Care</span>
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="bg-brandOrange hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brandOrange/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${clinicConfig.phoneRaw}`}
                  onClick={() => trackCallClick('hero', selectedLocation || 'general')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-brandOrange" />
                  <span>Call {clinicConfig.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${clinicConfig.whatsappRaw}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick('hero', selectedLocation || 'general')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2"
                  aria-label="WhatsApp Clinic"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column — Appointment Form */}
            <motion.div
              id="contact"
              className="lg:col-span-5 w-full scroll-mt-24"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <AppointmentForm
                title="Request Callback"
                subtitle="Schedule your spine &amp; joint consultation"
                selectedLocation={selectedLocation || 'kondapur'}
                onLocationChange={onLocationChange}
                initialConcern={selectedConcern}
                onConcernChange={onConcernChange}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
