import React from 'react';
import { motion } from 'framer-motion';

// ─── ActiveRehab Conditions Grid & Musculoskeletal Care ──────────────────────
// ─── Analytics helper ─────────────────────────────────────────────────────────
const trackAssessmentCTA = (condition) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'assessment_cta_click', {
        condition,
        selectedLocation: new URLSearchParams(window.location.search).get('location') || 'general',
      });
    }
  } catch {
    // Analytics error ignored
  }
};

// ─── Condition-specific inline SVG icons ─────────────────────────────────────
const IconSpine = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
    <rect x="8.5" y="2" width="7" height="4.5" rx="1.5" />
    <rect x="8.5" y="9.75" width="7" height="4.5" rx="1.5" />
    <rect x="8.5" y="17.5" width="7" height="4.5" rx="1.5" />
    <line x1="12" y1="6.5" x2="12" y2="9.75" />
    <line x1="12" y1="14.25" x2="12" y2="17.5" />
  </svg>
);

const IconNeck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
    <circle cx="12" cy="5" r="2.5" />
    <path d="M9.5 7.5v4a2.5 2.5 0 005 0v-4" />
    <path d="M10 15v6M14 15v6" />
    <line x1="9" y1="19" x2="15" y2="19" />
  </svg>
);

const IconNerve = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
    <path d="M12 3c0 3.5-4 5-4 9s4 5 4 9" />
    <path d="M8 8c-2.5 1.5-3.5 4-2 6" />
    <path d="M16 8c2.5 1.5 3.5 4 2 6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconSpondylitis = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <rect x="8" y="8" width="8" height="4" rx="1" />
    <rect x="8" y="14" width="8" height="4" rx="1" />
    <rect x="8" y="20" width="8" height="2.5" rx="1" />
    <line x1="12" y1="6" x2="12" y2="8" />
    <line x1="12" y1="12" x2="12" y2="14" />
    <line x1="12" y1="18" x2="12" y2="20" />
  </svg>
);

const IconCervical = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
    <rect x="9" y="2" width="6" height="3.5" rx="1" />
    <rect x="9" y="7.5" width="6" height="3.5" rx="1" />
    <rect x="9" y="13" width="6" height="3.5" rx="1" />
    <line x1="12" y1="5.5" x2="12" y2="7.5" />
    <line x1="12" y1="11" x2="12" y2="13" />
    <path d="M10 19l2 3 2-3" />
    <line x1="12" y1="16.5" x2="12" y2="19" />
  </svg>
);

const IconPosture = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
    <circle cx="12" cy="3.5" r="2" />
    <line x1="12" y1="5.5" x2="12" y2="12" />
    <path d="M8 9l4 3 4-3" />
    <path d="M9.5 12l-2 8" />
    <path d="M14.5 12l2 8" />
    <line x1="4" y1="14.5" x2="20" y2="14.5" />
  </svg>
);

// ─── Condition data ─────────────────────────────────────────────────────────
const CONDITIONS = [
  {
    title: 'Back Pain',
    concern: 'Back Pain',
    image: '/images/back-pain.jpg',
    alt: 'Back Pain Spinal Assessment at ActiveRehab Hyderabad',
    Icon: IconSpine,
    description: 'Assessment of spinal movement, posture, joint mobility and muscular factors that may be contributing to lower or upper back discomfort.',
    tags: ['Spinal Mobility', 'Posture Assessment', 'Muscle & Joint Function'],
    isOrange: true,
  },
  {
    title: 'Neck Pain',
    concern: 'Neck Pain',
    image: '/images/neck-pain.jpg',
    alt: 'Neck Pain and Stiffness Assessment at ActiveRehab Hyderabad',
    Icon: IconNeck,
    description: 'Assessment of neck movement, muscular tension, posture and joint mobility to understand factors that may be contributing to neck stiffness or discomfort.',
    tags: ['Neck Mobility', 'Posture Assessment', 'Muscle & Joint Function'],
    isOrange: false,
  },
  {
    title: 'Sciatica & Sciatic Nerve Pain',
    concern: 'Sciatica & Sciatic Nerve Pain',
    image: '/images/sciatica-pain.jpg',
    alt: 'Sciatica and Sciatic Nerve Pain Assessment at ActiveRehab Hyderabad',
    Icon: IconNerve,
    description: 'Assessment of lower-back and leg symptoms such as radiating pain, tingling or discomfort along the sciatic nerve pathway, with care planned according to clinical findings.',
    tags: ['Nerve-Related Symptoms', 'Lower Back Mobility', 'Movement Assessment'],
    isOrange: true,
  },
  {
    title: 'Spondylitis & Inflammatory Spine Conditions',
    concern: 'Spondylitis & Inflammatory Spine Conditions',
    image: '/images/spondylitis-spine.jpg',
    alt: 'Spondylitis Spine Stiffness Assessment at ActiveRehab Hyderabad',
    Icon: IconSpondylitis,
    description: 'Assessment of spinal stiffness, mobility limitations, posture and functional movement in patients with inflammatory or persistent spine-related concerns.',
    tags: ['Spinal Mobility', 'Functional Movement', 'Posture & Stiffness'],
    isOrange: false,
  },
  {
    title: 'Cervical Spondylosis & Neck Pain',
    concern: 'Cervical Spondylosis & Neck Pain',
    image: '/images/neck-pain.jpg',
    alt: 'Cervical Spondylosis and Neck Mobility Assessment at ActiveRehab Hyderabad',
    Icon: IconCervical,
    description: 'Assessment of cervical mobility, posture, stiffness and musculoskeletal function to guide an appropriate care and rehabilitation approach.',
    tags: ['Cervical Mobility', 'Postural Alignment', 'Functional Movement'],
    isOrange: true,
  },
  {
    title: 'Postural Disorders & Posture-Related Pain',
    concern: 'Postural Disorders & Posture-Related Pain',
    image: '/images/posture-correction.png',
    alt: 'Posture Analysis and Postural Disorder Assessment at ActiveRehab Hyderabad',
    Icon: IconPosture,
    description: 'Assessment of standing and sitting posture, movement patterns and muscular balance, with corrective guidance based on individual physical requirements.',
    tags: ['Posture Analysis', 'Movement Patterns', 'Muscle Balance'],
    isOrange: false,
  },
];

// ─── Brand colours ────────────────────────────────────────────────────────────
const BRAND = {
  orange: '#fb8b07',
  orangeHover: '#e07d06',
  blue: '#1d74b9',
  white: '#ffffff',
};

// ─── CTA button ───────────────────────────────────────────────────────────────
const BookBtn = ({ onClick, label = 'Book Assessment' }) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = BRAND.blue;
    e.currentTarget.style.borderColor = BRAND.blue;
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(29,116,185,0.25)';
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = BRAND.orange;
    e.currentTarget.style.borderColor = BRAND.orange;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  };
  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onFocus={(e) => {
        e.currentTarget.style.outline = '3px solid rgba(29,116,185,0.35)';
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
      className="w-full rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
      style={{
        padding: '11px 16px',
        minHeight: '44px',
        fontSize: '13px',
        background: BRAND.orange,
        color: BRAND.white,
        border: `2px solid ${BRAND.orange}`,
        transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease',
        outline: 'none',
      }}
    >
      <span className="pointer-events-none">{label}</span>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0 pointer-events-none">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </button>
  );
};

// ─── Tag chip ─────────────────────────────────────────────────────────────────
const TagChip = ({ tag, isOrange }) => (
  <span
    className="inline-block rounded-md px-2 py-0.5 font-semibold"
    style={{
      fontSize: '11px',
      background: isOrange ? 'rgba(251,139,7,0.09)' : 'rgba(29,116,185,0.08)',
      color: isOrange ? '#c2410c' : '#1e40af',
      border: isOrange ? '1px solid rgba(251,139,7,0.22)' : '1px solid rgba(29,116,185,0.18)',
    }}
  >
    {tag}
  </span>
);

// ─── Icon badge (top-left of image) ──────────────────────────────────────────
const IconBadge = ({ Icon, isOrange, size = 'lg' }) => (
  <div
    className={`flex items-center justify-center ${size === 'lg' ? 'w-8 h-8 rounded-xl' : 'w-7 h-7 rounded-lg'}`}
    style={{
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      border: isOrange
        ? '1px solid rgba(251,139,7,0.30)'
        : '1px solid rgba(29,116,185,0.24)',
      color: isOrange ? '#c2410c' : '#1d74b9',
    }}
  >
    <Icon />
  </div>
);

// ─── Desktop Card ─────────────────────────────────────────────────────────────
const DesktopCard = ({ condition, index, onBookRequest }) => {
  const { title, concern, image, alt, Icon, description, tags, isOrange } = condition;

  const handleClick = () => {
    trackAssessmentCTA(concern);
    if (onBookRequest) {
      onBookRequest(concern);
    } else {
      const el = document.getElementById('contact') || document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.article
      className="bg-white rounded-[20px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col text-left group"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.38, delay: index * 0.07 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '168px', flexShrink: 0 }}>
        <img
          src={image} alt={alt} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <IconBadge Icon={Icon} isOrange={isOrange} size="lg" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-black text-slate-900 leading-snug mb-2"
          style={{ fontSize: '16px' }}
        >
          {title}
        </h3>

        <p className="text-slate-600 leading-relaxed mb-3" style={{ fontSize: '13.5px' }}>
          {description}
        </p>

        <div className="mb-4">
          <p
            className="font-semibold uppercase tracking-wider mb-1.5"
            style={{ fontSize: '10px', color: '#94a3b8' }}
          >
            What we assess
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => <TagChip key={tag} tag={tag} isOrange={isOrange} />)}
          </div>
        </div>

        <div className="flex-1" />

        <BookBtn onClick={handleClick} />
      </div>
    </motion.article>
  );
};

// ─── Mobile Card ──────────────────────────────────────────────────────────────
const MobileCard = ({ condition, onBookRequest }) => {
  const { title, concern, image, alt, Icon, description, tags, isOrange } = condition;

  const handleClick = () => {
    trackAssessmentCTA(concern);
    if (onBookRequest) {
      onBookRequest(concern);
    } else {
      const el = document.getElementById('contact') || document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="bg-white rounded-[18px] overflow-hidden border border-slate-200/80 shadow-sm flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '148px', flexShrink: 0 }}>
        <img src={image} alt={alt} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-2.5 left-2.5">
          <IconBadge Icon={Icon} isOrange={isOrange} size="sm" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2.5">
        <h3 className="font-black text-slate-900 leading-snug" style={{ fontSize: '15px' }}>
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed" style={{ fontSize: '13px' }}>
          {description}
        </p>

        <div>
          <p
            className="font-semibold uppercase tracking-wider mb-1"
            style={{ fontSize: '10px', color: '#94a3b8' }}
          >
            What we assess
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => <TagChip key={tag} tag={tag} isOrange={isOrange} />)}
          </div>
        </div>

        <BookBtn onClick={handleClick} />
      </div>
    </article>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const ConditionsGrid = ({ onBookRequest }) => (
  <section
    id="conditions"
    className="bg-slate-50 relative overflow-hidden"
    style={{ paddingTop: '72px', paddingBottom: '80px' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brandOrange block mb-2">
          Targeted Musculoskeletal Care
        </span>
        <h2
          className="font-black text-slate-900 tracking-tight leading-tight"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
        >
          Conditions We{' '}
          <span className="text-brandBlue">Evaluate &amp; Manage</span>
        </h2>
        <div className="w-14 h-[3px] bg-brandOrange mx-auto mt-3.5 mb-4 rounded-full" />
        <p className="text-slate-600 font-normal leading-relaxed" style={{ fontSize: '15px' }}>
          Assessment-based chiropractic and rehabilitation care for common spine, posture, nerve
          and movement-related concerns in Hyderabad.
        </p>
      </div>

      {/* Mobile: single-column stacked cards (< md) */}
      <div className="md:hidden flex flex-col gap-4">
        {CONDITIONS.map((c) => (
          <MobileCard key={c.title} condition={c} onBookRequest={onBookRequest} />
        ))}
      </div>

      {/* Tablet + Desktop: 2-col → 3-col grid (≥ md) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {CONDITIONS.map((c, i) => (
          <DesktopCard key={c.title} condition={c} index={i} onBookRequest={onBookRequest} />
        ))}
      </div>
    </div>
  </section>
);

export default ConditionsGrid;
