import React from 'react';

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
// All icons share identical stroke style: strokeWidth 1.6, round linecap/join,
// 24×24 viewBox. aria-hidden since text carries the meaning.

const IconExperience = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-[22px] h-[22px]"
  >
    {/* Diploma / credential badge */}
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M9 15v2l3 1 3-1v-2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M3 8h18" />
  </svg>
);

const IconLocations = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-[22px] h-[22px]"
  >
    {/* Two pins for dual locations */}
    <path d="M9 2C6.24 2 4 4.24 4 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" />
    <circle cx="9" cy="7" r="1.5" />
    <path d="M20 9c0 2.5-3 7-3 7s-3-4.5-3-7a3 3 0 016 0z" />
    <circle cx="17" cy="9" r="1" />
  </svg>
);

const IconCare = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-[22px] h-[22px]"
  >
    {/* Clipboard with person / assessment icon */}
    <path d="M9 2h6v2H9z" />
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <circle cx="12" cy="10" r="2.5" />
    <path d="M8 18c0-2.21 1.79-4 4-4s4 1.79 4 4" />
  </svg>
);

const IconBooking = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-[22px] h-[22px]"
  >
    {/* Calendar with checkmark */}
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v3M8 2v3M3 9h18" />
    <path d="M8 14l2.5 2.5L16 13" />
  </svg>
);

// ─── Trust data ────────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    Icon: IconExperience,
    stat: '17+',
    statUnit: 'Years',
    title: 'Experience',
    subtitle: 'Dr. Ashok P. Kota (Master Chiro)',
  },
  {
    Icon: IconLocations,
    stat: '2',
    statUnit: 'Hyderabad',
    title: 'Locations',
    subtitle: 'Kondapur • Kompally',
  },
  {
    Icon: IconCare,
    stat: null,
    statUnit: null,
    title: 'Personalized Care',
    subtitle: 'Individual Assessment & Care Plan',
  },
  {
    Icon: IconBooking,
    stat: null,
    statUnit: null,
    title: 'Easy Appointment Booking',
    subtitle: 'Mon–Sat: 9:00 AM – 9:00 PM',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const QuickTrustBar = () => (
  /*
    Background matches the hero's bottom-fade colour (slate-900 / rgb(15,23,42))
    so the cinematic vignette blends seamlessly into this section.
    The section itself sits on this dark base, with a clean bottom border
    separating it from the white sections below.
  */
  <section
    aria-label="Clinic trust highlights"
    className="bg-slate-900 border-b border-white/10 py-3.5 sm:py-4 lg:py-4.5"
  >
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

      {/*
        DESKTOP (lg+): single horizontal bar, 4 columns with 1px separators.
        TABLET (sm–lg): 2×2 grid.
        MOBILE (<sm):  2×2 grid, clean responsive layout.
      */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-0"
      >
        {TRUST_ITEMS.map(({ Icon, stat, statUnit, title, subtitle }, index) => {
          const isLastInRow = (index + 1) % 2 === 0; // for mobile/tablet row separators
          const isLast = index === TRUST_ITEMS.length - 1;

          return (
            <div
              key={index}
              /*
                Mobile / tablet:
                  - right border on col 1 (index 0, 2) → gives the | between two cols
                  - bottom border on first row (index 0, 1) → gives the — between two rows
                Desktop (lg):
                  - right border on all except last → gives | separators
                  - no bottom border needed
              */
              className={[
                'relative flex items-center gap-2.5 sm:gap-3',
                // Padding per breakpoint (compact 12-14px on mobile, spacious on tablet/desktop)
                'px-2.5 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5',
                // Mobile/tablet column separator (right border on left column)
                !isLastInRow ? 'border-r border-white/10' : '',
                // Mobile/tablet row separator (bottom border on first row)
                index < 2 ? 'border-b border-white/10 lg:border-b-0' : '',
                // Desktop right separator except last item
                !isLast ? 'lg:border-r lg:border-white/10' : '',
                // Subtle hover: very gentle lift on desktop
                'group transition-all duration-200',
              ].join(' ')}
            >
              {/* Icon container */}
              <div
                className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                style={{
                  background: 'rgba(249,115,22,0.12)',  // pale orange tint
                  border: '1px solid rgba(249,115,22,0.2)',
                  color: '#f97316',                      // brandOrange
                }}
                aria-hidden="true"
              >
                <Icon />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                {/* Numeric emphasis when applicable */}
                {stat ? (
                  <div className="flex flex-wrap items-baseline gap-x-1 leading-tight mb-0.5">
                    <span
                      className="font-black text-white text-base sm:text-xl lg:text-[22px] leading-tight"
                    >
                      {stat}
                    </span>
                    <span
                      className="font-bold text-slate-200 text-[12px] sm:text-[13px] lg:text-[13px] leading-tight"
                    >
                      {statUnit}
                    </span>
                    <span
                      className="font-semibold text-white text-[12px] sm:text-[13px] lg:text-[13px] leading-tight"
                    >
                      {title}
                    </span>
                  </div>
                ) : (
                  <div
                    className="font-bold text-white text-[13px] sm:text-sm lg:text-[14px] leading-tight mb-0.5"
                  >
                    {title}
                  </div>
                )}

                {/* Supporting copy */}
                <div
                  className="text-slate-400 font-normal leading-tight sm:leading-snug text-[11px] sm:text-xs"
                  style={{ marginTop: '2px' }}
                >
                  {subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default QuickTrustBar;
