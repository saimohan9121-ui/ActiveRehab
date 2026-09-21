import React from 'react';
import { ExternalLink, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick } from '../../utils/analytics';

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-14 pb-12 border-t border-white/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3.5">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="ActiveRehab Centre"
                  width="180"
                  height="48"
                  className="h-10 sm:h-12 w-auto max-w-[200px] object-contain bg-white p-1.5 rounded-xl shadow-sm flex-shrink-0 hover:opacity-90 transition-opacity"
                />
              </Link>
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
              <li><a href="/#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#doctor" className="hover:text-white transition-colors">Dr. Ashok P. Kota</a></li>
              <li><a href="/#conditions" className="hover:text-white transition-colors">Conditions Managed</a></li>
              <li><a href="/#treatments" className="hover:text-white transition-colors">Services &amp; Care</a></li>
              <li><a href="/#testimonials" className="hover:text-white transition-colors">Google Reviews</a></li>
              <li><a href="/#location" className="hover:text-white transition-colors">Hyderabad Locations</a></li>
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
                    className="text-[11px] text-brandOrange hover:underline inline-flex items-center focus:outline-none focus:ring-1 focus:ring-brandOrange"
                    aria-label="Google Maps directions to Kondapur Clinic"
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
                    className="text-[11px] text-brandOrange hover:underline inline-flex items-center focus:outline-none focus:ring-1 focus:ring-brandOrange"
                    aria-label="Google Maps directions to Kompally Clinic"
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
                  className="text-white font-bold hover:text-brandOrange transition-colors focus:outline-none focus:ring-1 focus:ring-brandOrange"
                  aria-label={`Call ActiveRehab at ${clinicConfig.phone}`}
                >
                  {clinicConfig.phone}
                </a>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Mon - Sat: 9 AM - 9 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Policy Navigation Row (Footer-Only Placement) */}
        <div className="pt-6 pb-4 border-t border-white/10">
          <nav aria-label="Legal and policy links" className="flex flex-wrap items-center justify-center gap-y-1 gap-x-2 sm:gap-x-4 text-xs font-medium text-slate-400">
            <Link 
              to="/privacy-policy" 
              className="inline-flex items-center min-h-[44px] px-2.5 py-2 hover:text-brandOrange transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-slate-700 select-none" aria-hidden="true">|</span>
            <Link 
              to="/terms-and-conditions" 
              className="inline-flex items-center min-h-[44px] px-2.5 py-2 hover:text-brandOrange transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Terms &amp; Conditions
            </Link>
            <span className="hidden sm:inline text-slate-700 select-none" aria-hidden="true">|</span>
            <Link 
              to="/medical-disclaimer" 
              className="inline-flex items-center min-h-[44px] px-2.5 py-2 hover:text-brandOrange transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Medical Disclaimer
            </Link>
            <span className="hidden sm:inline text-slate-700 select-none" aria-hidden="true">|</span>
            <Link 
              to="/cookie-policy" 
              className="inline-flex items-center min-h-[44px] px-2.5 py-2 hover:text-brandOrange transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium">
          <div>
            © {currentYear} {clinicConfig.fullName}. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 text-center sm:text-right">
            Chiropractic &amp; Physical Rehabilitation Care in Kondapur &amp; Kompally, Hyderabad
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
