import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Star } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick, trackDirectionsClick } from '../../utils/analytics';

const GoogleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const ClinicLocation = ({ selectedLocation = 'kondapur', onLocationChange }) => {
  const activeBranchKey = selectedLocation === 'kompally' ? 'kompally' : 'kondapur';
  const branch = clinicConfig.branches[activeBranchKey];

  return (
    <section id="location" className="py-12 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brandOrange block mb-2">
            Hyderabad Clinic Locations
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Visit ActiveRehab in <span className="text-brandBlue">Hyderabad</span>
          </h2>
          <div className="w-16 h-1 bg-brandBlue mx-auto mt-3.5 mb-3.5 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Choose the clinic most convenient for you. Both locations offer direct clinical care with Dr. Ashok P. Kota.
          </p>
        </div>

        {/* Dual Location Tabs */}
        <div className="flex justify-center mb-7" role="tablist" aria-label="Clinic Branches">
          <div className="inline-flex p-1.5 bg-slate-200/90 rounded-2xl border border-slate-300 shadow-inner max-w-md w-full sm:w-auto">
            <button
              type="button"
              role="tab"
              id="loc-tab-kondapur"
              aria-selected={activeBranchKey === 'kondapur'}
              aria-controls="loc-panel-kondapur"
              onClick={() => onLocationChange && onLocationChange('kondapur')}
              className={`flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeBranchKey === 'kondapur'
                  ? 'bg-brandBlue text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Kondapur Clinic</span>
            </button>

            <button
              type="button"
              role="tab"
              id="loc-tab-kompally"
              aria-selected={activeBranchKey === 'kompally'}
              aria-controls="loc-panel-kompally"
              onClick={() => onLocationChange && onLocationChange('kompally')}
              className={`flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeBranchKey === 'kompally'
                  ? 'bg-brandBlue text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Kompally Clinic</span>
            </button>
          </div>
        </div>

        {/* Location Card & Responsive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Active Branch NAP Details Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between text-left">
            <div className="space-y-5">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-brandOrange bg-orange-50 px-2.5 py-1 rounded-md mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{branch.shortLabel} Centre</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {branch.fullName || branch.name}
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-blue-50 text-brandBlue flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Full Address</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mt-0.5">
                    {branch.fullAddress}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-orange-50 text-brandOrange flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Contact</div>
                  <a
                    href={`tel:${branch.phoneRaw || clinicConfig.phoneRaw}`}
                    onClick={() => trackCallClick('location_section', activeBranchKey)}
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-brandBlue"
                  >
                    {branch.phone || clinicConfig.phone}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-blue-50 text-brandBlue flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Clinic Hours</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {clinicConfig.timings.days}: {clinicConfig.timings.hours}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {clinicConfig.timings.sunday}
                  </div>
                </div>
              </div>

              {/* Google Reviews Link Pill */}
              <div className="pt-2">
                <a
                  href={branch.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
                >
                  <GoogleIcon className="w-4 h-4" />
                  <span>Google Rating: {branch.googleRating}</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-500 font-normal">({branch.reviewCount} reviews)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-5 mt-5 border-t border-slate-100">
              <a
                href={branch.directionsUrl || branch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDirectionsClick(activeBranchKey)}
                className="flex-1 min-h-[44px] bg-brandOrange hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${branch.phoneRaw || clinicConfig.phoneRaw}`}
                onClick={() => trackCallClick('location_section', activeBranchKey)}
                className="flex-1 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-4 h-4 text-brandOrange" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* ONE Responsive Map Area (Switches with Location) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative min-h-[300px] sm:min-h-[380px] flex flex-col">
            <div className="p-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center space-x-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
                <span className="truncate">Map: {branch.name}</span>
              </span>
              <a
                href={branch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brandBlue hover:underline flex items-center space-x-1 flex-shrink-0 ml-2"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 w-full h-full min-h-[260px] sm:min-h-[340px]">
              <iframe
                title={`Map of ${branch.name}`}
                src={branch.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Local Area Support Line */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 text-center max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            <strong className="text-slate-900 font-bold">Kondapur Clinic: </strong>
            convenient for patients around Kondapur, Gachibowli, HITEC City, Madhapur, and nearby areas.
            <span className="mx-2 text-slate-300 hidden sm:inline">|</span>
            <br className="sm:hidden" />
            <strong className="text-slate-900 font-bold">Kompally Clinic: </strong>
            convenient for patients around Kompally, Suchitra, Petbasheerabad, Quthbullapur, and nearby areas.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ClinicLocation;
