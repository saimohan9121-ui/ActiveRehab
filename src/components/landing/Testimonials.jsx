import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, Calendar, Phone, MapPin } from 'lucide-react';
import { googleProfiles, googleReviews } from '../../data/googleReviewsData';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick } from '../../utils/analytics';

// Authentic Google Multi-Color "G" Icon
const GoogleIcon = ({ className = "w-5 h-5" }) => (
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

// Individual Authentic Google Review Card Component
const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongReview = review.review.length > 170;

  // Extract initial for avatar
  const initial = review.name ? review.name.charAt(0).toUpperCase() : 'P';

  return (
    <article
      className="w-[88vw] sm:w-[350px] md:w-auto flex-shrink-0 snap-start bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left"
      aria-label={`Google Review from ${review.name}`}
    >
      <div>
        {/* Top Row: Initial Avatar, Name, Google G Icon & Date */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 shadow-xs ${review.avatarBg || 'bg-brandBlue text-white'}`}
              aria-hidden="true"
            >
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 truncate">
                {review.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium block">
                {review.date || 'Google Review'}
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0" title="Google Verified Source">
            <GoogleIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Second Row: Star Rating */}
        <div
          className="flex items-center gap-1.5 mb-3"
          role="img"
          aria-label={`Rated ${review.rating} out of 5 stars on Google`}
        >
          <div className="flex items-center text-amber-400">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500 ml-1">
            Google Review
          </span>
        </div>

        {/* Body: Original Patient Review Text (Standard typography, NOT italicized) */}
        <div className="text-slate-700 text-sm sm:text-[15px] leading-[1.65] font-normal">
          <p>
            {isLongReview && !isExpanded
              ? `${review.review.slice(0, 160)}...`
              : review.review}
          </p>

          {/* Inline Read More / Show Less Toggle */}
          {isLongReview && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs font-bold text-brandBlue hover:text-brandBlueDark hover:underline focus:outline-none inline-block cursor-pointer"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Location Badge & External Link */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1 font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
          <MapPin className="w-3 h-3 text-brandBlue" />
          {review.location}
        </span>

        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-brandBlue hover:text-brandBlueDark inline-flex items-center gap-1 hover:underline group"
          aria-label={`Read ${review.name}'s review on Google Maps (opens in new tab)`}
        >
          <span>Read on Google</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </article>
  );
};

const Testimonials = ({ onBookRequest, selectedLocation = 'kondapur', onLocationChange }) => {
  const [activeLocation, setActiveLocation] = useState(selectedLocation || 'kondapur');

  useEffect(() => {
    if (selectedLocation) {
      setActiveLocation(selectedLocation);
    }
  }, [selectedLocation]);

  const handleTabClick = (loc) => {
    setActiveLocation(loc);
    if (onLocationChange) {
      onLocationChange(loc);
    }
  };

  const currentProfile = googleProfiles[activeLocation] || googleProfiles.kondapur;
  const allReviews = googleReviews[activeLocation] || [];
  // Show max 3 genuine reviews on desktop for balanced 3-col layout
  const displayedReviews = allReviews.slice(0, 3);

  const handleBookAppointment = () => {
    if (onBookRequest) {
      onBookRequest();
    }
    const formElement = document.getElementById('appointment-form');
    if (formElement && window.innerWidth >= 768) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brandBlue block mb-2">
            GOOGLE REVIEWS
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            What Our Patients Say on <span className="text-brandBlue">Google</span>
          </h2>
          <div className="w-16 h-1 bg-brandOrange mx-auto mt-3.5 mb-3.5 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Read genuine feedback from patients who visited ActiveRehab Chiropractic &amp; Physiotherapy Centre.
          </p>
        </div>

        {/* Location Switcher Tabs (Min 44px touch targets on mobile) */}
        <div className="flex justify-center mb-8" role="tablist" aria-label="Review Clinic Locations">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300 shadow-inner max-w-md w-full sm:w-auto">
            <button
              type="button"
              role="tab"
              id="tab-kondapur"
              aria-selected={activeLocation === 'kondapur'}
              aria-controls="panel-kondapur"
              onClick={() => handleTabClick('kondapur')}
              className={`flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeLocation === 'kondapur'
                  ? 'bg-brandBlue text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Kondapur</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  activeLocation === 'kondapur' ? 'bg-white/25 text-white' : 'bg-slate-300 text-slate-800'
                }`}
              >
                204 Reviews
              </span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-kompally"
              aria-selected={activeLocation === 'kompally'}
              aria-controls="panel-kompally"
              onClick={() => handleTabClick('kompally')}
              className={`flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeLocation === 'kompally'
                  ? 'bg-brandBlue text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Kompally</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  activeLocation === 'kompally' ? 'bg-white/25 text-white' : 'bg-slate-300 text-slate-800'
                }`}
              >
                73 Reviews
              </span>
            </button>
          </div>
        </div>

        {/* Google Rating Summary Block */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs flex-shrink-0">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Official Google Business Profile
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {currentProfile.fullName || currentProfile.name}
              </h3>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <span className="text-sm font-black text-slate-900">{currentProfile.rating}</span>
                <div
                  className="flex items-center text-amber-400"
                  role="img"
                  aria-label={`Rated ${currentProfile.rating} out of 5 stars on Google`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  · {currentProfile.reviewCount} Google reviews
                </span>
              </div>
            </div>
          </div>

          <a
            href={currentProfile.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 hover:border-brandBlue bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-xs w-full sm:w-auto"
            aria-label={`View ${currentProfile.name} on Google Maps (opens in new tab)`}
          >
            <GoogleIcon className="w-4 h-4" />
            <span>View Google Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Tab Panel */}
        <div
          id={`panel-${activeLocation}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLocation}`}
        >
          {displayedReviews.length > 0 ? (
            /* Reviews Grid / Scroll-Snap Container (Max 3 on desktop) */
            <div className="flex lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 overflow-x-auto lg:overflow-visible gap-5 sm:gap-6 pb-4 pt-1 px-4 sm:px-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            /* Kompally Fallback Card */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-3.5 border border-blue-100">
                <GoogleIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                Read Our Patient Reviews on Google
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 max-w-md mx-auto font-normal">
                Our <strong>{currentProfile.name}</strong> clinic holds an authentic <strong>{currentProfile.rating} ★★★★★</strong> rating across <strong>{currentProfile.reviewCount} verified Google reviews</strong>. Explore all patient feedback directly on Google Maps.
              </p>
              <a
                href={currentProfile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-brandBlue hover:bg-brandBlueDark text-white font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>View All {currentProfile.reviewCount} Reviews on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          )}

          {/* Outbound "View All Reviews on Google" Trust CTA */}
          {displayedReviews.length > 0 && (
            <div className="mt-7 text-center">
              <a
                href={currentProfile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-brandBlue text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-xs group"
                aria-label={`View all ${currentProfile.reviewCount} Google reviews for ${currentProfile.name} on Google Maps (opens in new tab)`}
              >
                <GoogleIcon className="w-4 h-4" />
                <span>View All {currentProfile.reviewCount} Reviews on Google ({currentProfile.name})</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brandBlue transition-all" />
              </a>
            </div>
          )}
        </div>

        {/* Section 21: Conversion Bridge (Trust -> Immediate Action) */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-100 rounded-3xl p-5 sm:p-7 shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">
              Ready to Discuss Your Pain or Mobility Concern?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 max-w-xl mx-auto font-normal">
              Consult with Dr. Ashok P. Kota (Master of Chiropractic) at ActiveRehab for an in-depth clinical evaluation and personalized care plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleBookAppointment}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-brandOrange hover:bg-orange-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <a
                href={`tel:${clinicConfig.phoneRaw}`}
                onClick={() => trackCallClick('reviews_conversion_bridge', activeLocation)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-brandBlue font-bold text-xs sm:text-sm border border-slate-200 hover:border-brandBlue shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brandBlue" />
                <span>Call Clinic: {clinicConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
