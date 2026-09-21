import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ExternalLink, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { googleProfiles, googleReviews } from '../../data/googleReviewsData';
import { trackCallClick } from '../../utils/analytics';

// Authentic Google Multi-Color "G" Icon
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
  </svg>
);

// Extract reviewer initials
const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase() || 'P';
};

// Individual Review Card — height is auto, driven by content
const ReviewCard = ({ review, isClone = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initials = getInitials(review.name);
  const isLongReview = review.review && review.review.length > 200;

  return (
    <article
      className="bg-white rounded-[18px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col text-left select-none"
      style={{ padding: '18px 20px 16px' }}
      aria-hidden={isClone ? 'true' : undefined}
      tabIndex={isClone ? -1 : 0}
      aria-label={!isClone ? `Google Review from ${review.name}` : undefined}
    >
      {/* Header: Avatar + Name + Date + Google G */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${review.avatarBg || 'bg-brandBlue text-white'}`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-[13px] font-bold text-slate-900 truncate leading-tight" title={review.name}>
              {review.name}
            </h3>
            <span className="text-[11px] text-slate-400 font-medium leading-none">
              {review.date || 'Google Review'}
            </span>
          </div>
        </div>
        <div
          className="p-1 rounded-md bg-slate-50 border border-slate-100 flex-shrink-0 mt-0.5"
          aria-hidden="true"
          title="Google"
        >
          <GoogleIcon className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Stars */}
      <div
        className="flex items-center gap-1 mb-2.5"
        role={!isClone ? "img" : undefined}
        aria-label={!isClone ? `Rated ${review.rating} out of 5 stars on Google` : undefined}
      >
        {[...Array(review.rating || 5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
        <span className="text-[11px] font-semibold text-slate-400 ml-0.5">Google Review</span>
      </div>

      {/* Review Text */}
      <div className="text-slate-700 text-[13px] leading-[1.6] font-normal flex-1">
        <p className={`whitespace-pre-line ${isLongReview && !isExpanded ? 'line-clamp-5' : ''}`}>
          {review.review}
        </p>
        {isLongReview && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="mt-1.5 text-[12px] font-bold text-brandBlue hover:underline focus:outline-none cursor-pointer"
            aria-expanded={isExpanded}
            tabIndex={isClone ? -1 : 0}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Footer: Location + Link */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          <MapPin className="w-2.5 h-2.5 text-brandBlue" />
          {review.location}
        </span>
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isClone ? -1 : 0}
          className="text-[11px] font-bold text-brandBlue hover:underline inline-flex items-center gap-0.5"
          aria-label={!isClone ? `Read ${review.name}'s review on Google (opens in new tab)` : undefined}
        >
          Read on Google
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </article>
  );
};

const Testimonials = ({ onBookRequest, selectedLocation = 'kondapur', onLocationChange }) => {
  const [activeLocation, setActiveLocation] = useState(selectedLocation || 'kondapur');

  useEffect(() => {
    if (selectedLocation === 'kondapur' || selectedLocation === 'kompally') {
      setActiveLocation(selectedLocation);
    }
  }, [selectedLocation]);

  const handleTabClick = (loc) => {
    if (loc !== activeLocation) {
      setActiveLocation(loc);
      if (onLocationChange) onLocationChange(loc);
    }
  };

  const currentProfile = googleProfiles[activeLocation] || googleProfiles.kondapur;
  const genuineReviews = googleReviews[activeLocation] || [];
  const reviewCount = genuineReviews.length;

  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(340);
  const [gapWidth, setGapWidth] = useState(20);

  const N = reviewCount;
  const [currentIndex, setCurrentIndex] = useState(N > 0 ? N : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const userPauseTimerRef = useRef(null);

  // Compute card width from container and window width
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ww = window.innerWidth;

    if (ww >= 1024) {
      const gap = 20;
      setGapWidth(gap);
      setCardWidth((cw - gap * 2) / 3);
    } else if (ww >= 640) {
      const gap = 16;
      setGapWidth(gap);
      setCardWidth((cw - gap) / 2);
    } else {
      const gap = 12;
      setGapWidth(gap);
      // Mobile: 88% of container width, show ~10% of next card
      setCardWidth(Math.floor(cw * 0.88));
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const onResize = () => { setIsTransitioning(false); updateDimensions(); };
    window.addEventListener('resize', onResize);

    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(updateDimensions);
      ro.observe(containerRef.current);
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMotion = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMotion);

    const onVis = () => setIsTabHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      mq.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [updateDimensions]);

  // Reset on location change
  useEffect(() => {
    if (N > 0) {
      setIsTransitioning(false);
      setCurrentIndex(N);
      setDragOffset(0);
    }
  }, [activeLocation, N]);

  const markUserInteraction = useCallback(() => {
    setIsUserPaused(true);
    if (userPauseTimerRef.current) clearTimeout(userPauseTimerRef.current);
    userPauseTimerRef.current = setTimeout(() => setIsUserPaused(false), 6000);
  }, []);

  const nextSlide = useCallback(() => {
    if (isTransitioning || N === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(p => p + 1);
  }, [isTransitioning, N]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || N === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(p => p - 1);
  }, [isTransitioning, N]);

  const handleManualNext = () => { markUserInteraction(); nextSlide(); };
  const handleManualPrev = () => { markUserInteraction(); prevSlide(); };

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (N === 0) return;
    if (currentIndex >= 2 * N) setCurrentIndex(currentIndex - N);
    else if (currentIndex < N) setCurrentIndex(currentIndex + N);
  }, [currentIndex, N]);

  // Autoplay
  useEffect(() => {
    if (reducedMotion || isHovered || isFocused || isTabHidden || isUserPaused || isDragging || N === 0) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [reducedMotion, isHovered, isFocused, isTabHidden, isUserPaused, isDragging, N, nextSlide]);

  // Keyboard
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); handleManualPrev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); handleManualNext(); }
  };

  // Touch / drag
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const pointerDown = useRef(false);

  const onTouchStart = (e) => {
    if (isTransitioning) return;
    pointerDown.current = true;
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentX.current = dragStartX.current;
    setIsDragging(true);
    markUserInteraction();
  };

  const onTouchMove = (e) => {
    if (!pointerDown.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentX.current = x;
    setDragOffset(x - dragStartX.current);
  };

  const onTouchEnd = () => {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    setIsDragging(false);
    const diff = dragCurrentX.current - dragStartX.current;
    setDragOffset(0);
    if (diff < -40) nextSlide();
    else if (diff > 40) prevSlide();
  };

  const carouselItems = N > 0 ? [...genuineReviews, ...genuineReviews, ...genuineReviews] : [];
  const step = cardWidth + gapWidth;
  const translateX = -(currentIndex * step) + dragOffset;

  return (
    <section
      id="testimonials"
      className="pt-10 sm:pt-14 pb-6 sm:pb-8 bg-slate-50"
      style={{ overflow: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────────────── */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brandBlue block mb-1.5">
            GOOGLE REVIEWS
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            What Our Patients Say
          </h2>
          <div className="w-12 h-0.5 bg-brandOrange mx-auto mt-2.5 mb-2.5 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
            Real feedback from patients at ActiveRehab Kondapur &amp; Kompally.
          </p>
        </div>

        {/* ── Location Tabs ─────────────────────────────────────── */}
        <div className="flex justify-center mb-5" role="tablist" aria-label="Review Clinic Locations">
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl border border-slate-300 shadow-inner w-full max-w-xs sm:w-auto">
            {[
              { id: 'kondapur', label: 'Kondapur', count: '204' },
              { id: 'kompally', label: 'Kompally', count: '73' },
            ].map(({ id, label, count }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={activeLocation === id}
                aria-controls={`panel-${id}`}
                onClick={() => handleTabClick(id)}
                className={`flex-1 sm:flex-initial min-h-[40px] px-5 py-2 rounded-lg font-bold text-[12px] sm:text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeLocation === id
                    ? 'bg-brandBlue text-white shadow'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  activeLocation === id ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Google Summary Bar ────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs px-4 py-3 mb-5 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
                Official Google Business Profile
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {currentProfile.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-black text-slate-900">{currentProfile.rating}</span>
                <div className="flex items-center" role="img" aria-label={`${currentProfile.rating} stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-500">· {currentProfile.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          <a
            href={currentProfile.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brandBlue bg-white text-slate-700 font-bold text-[11px] transition-all w-full sm:w-auto justify-center"
            aria-label={`View ${currentProfile.name} on Google Maps`}
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            View Google Profile
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* ── Review Carousel Panel ─────────────────────────────── */}
        <div
          id={`panel-${activeLocation}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLocation}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded-2xl"
          aria-label={`Google Reviews for ${currentProfile.name}. Arrow keys to navigate.`}
        >
          {reviewCount > 0 ? (
            <>
              {/* Viewport — overflow hidden, NO reserved height, driven by card content */}
              <div
                ref={containerRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onTouchStart}
                onMouseMove={onTouchMove}
                onMouseUp={onTouchEnd}
                onMouseLeave={onTouchEnd}
              >
                {/* Track — no extra py, height = tallest card in current view */}
                <div
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',   // equal-height cards within each visible group
                    gap: `${gapWidth}px`,
                    transform: `translate3d(${translateX}px, 0, 0)`,
                    transition: isTransitioning && !isDragging
                      ? (reducedMotion ? 'none' : 'transform 560ms cubic-bezier(0.25, 1, 0.5, 1)')
                      : 'none',
                    willChange: 'transform',
                  }}
                >
                  {carouselItems.map((review, idx) => {
                    const isClone = idx < N || idx >= 2 * N;
                    return (
                      <div
                        key={`${review.id}-${idx}`}
                        style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                      >
                        <ReviewCard review={review} isClone={isClone} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between mt-3 px-0.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleManualPrev}
                    aria-label="Previous reviews"
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-brandBlue text-slate-600 hover:text-brandBlue flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandBlue"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleManualNext}
                    aria-label="Next reviews"
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-brandBlue text-slate-600 hover:text-brandBlue flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandBlue"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  Swipe or use arrows · {reviewCount} reviews
                </span>
                <a
                  href={currentProfile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brandBlue hover:underline"
                >
                  <GoogleIcon className="w-3 h-3" />
                  View all on Google
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Primary View All CTA */}
              <div className="mt-5 text-center">
                <a
                  href={currentProfile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-brandBlue text-slate-800 font-bold text-[12px] sm:text-xs transition-all shadow-xs group"
                  aria-label={`View all ${currentProfile.reviewCount} Google reviews for ${currentProfile.name}`}
                >
                  <GoogleIcon className="w-3.5 h-3.5" />
                  View All Reviews on Google — {currentProfile.name}
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-brandBlue transition-colors" />
                </a>
              </div>
            </>
          ) : (
            /* Compact fallback if no reviews are loaded */
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center max-w-lg mx-auto">
              <GoogleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">Read Our Reviews on Google</h3>
              <p className="text-xs text-slate-500 mb-4">
                <strong>{currentProfile.name}</strong> · {currentProfile.rating}★ · {currentProfile.reviewCount} reviews
              </p>
              <a
                href={currentProfile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-lg bg-brandBlue text-white font-bold text-xs transition-all"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
                View All Reviews on Google
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
