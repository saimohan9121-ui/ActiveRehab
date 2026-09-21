import React, { useState } from 'react';
import { Brain, ShieldCheck, Activity, Dumbbell, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: "chiro",
    title: "Chiropractic Care & Adjustments",
    subtitle: "Joint Mobility & Spinal Function",
    shortDesc: "Controlled, hands-on spinal and joint adjustments designed to improve motion, relieve nerve pressure, and decrease discomfort.",
    icon: <Brain className="w-6 h-6 text-brandOrange" />,
    image: "/images/chiropractic-adjustments.png",
    mayInclude: [
      "Targeted spinal & extremity joint assessment",
      "Controlled manual mobilization & adjustments",
      "Post-adjustment mobility guidance"
    ],
    goal: "Restore joint mechanics, reduce muscular tension, and improve daily functional mobility.",
    whatToExpect: "Your first visit begins with an assessment of your symptoms, movement, posture and relevant musculoskeletal findings. If chiropractic care is appropriate, the plan may include controlled manual techniques together with movement or rehabilitation advice."
  },
  {
    id: "rehab",
    title: "Physiotherapy & Rehabilitation",
    subtitle: "Active Recovery & Strengthening",
    shortDesc: "Structured physical rehabilitation therapy focused on restoring muscle strength, stabilizing vulnerable joints, and enhancing movement quality.",
    icon: <ShieldCheck className="w-6 h-6 text-brandBlue" />,
    image: "/images/rehab-therapy.png",
    mayInclude: [
      "Functional movement & weakness screening",
      "Guided therapeutic strengthening exercises",
      "Stretching, myofascial release & stabilization"
    ],
    goal: "Rebuild muscle support, correct movement compensations, and reduce recurrence of pain.",
    whatToExpect: "Treatment combines targeted exercises, manual therapy, and active movement retraining. Programs are calibrated to your physical tolerance and progress systematically as tissue capacity improves."
  },
  {
    id: "posture",
    title: "Posture Correction & Ergonomics",
    subtitle: "Spinal Alignment & Daily Habit Care",
    shortDesc: "Clinical posture analysis paired with corrective protocols to counteract postural strain from long desk hours, phone use, and slouching.",
    icon: <Activity className="w-6 h-6 text-brandOrange" />,
    image: "/images/posture-correction.png",
    mayInclude: [
      "Detailed cervical, thoracic & pelvic posture assessment",
      "Ergonomic workstation and sitting advice",
      "Corrective spinal & scapular strengthening drills"
    ],
    goal: "Improve postural endurance, minimize chronic neck/shoulder tension, and restore natural spinal balance.",
    whatToExpect: "We evaluate spinal curvatures, head forward positioning, and shoulder rounding. You receive corrective adjustments alongside practical desk ergonomic adjustments and daily postural micro-exercises."
  },
  {
    id: "sports",
    title: "Sports & Musculoskeletal Rehab",
    subtitle: "Injury Recovery & Joint Conditioning",
    shortDesc: "Individualized care for sprains, muscle strains, running injuries, shoulder impingement, and joint stiffness.",
    icon: <Dumbbell className="w-6 h-6 text-brandBlue" />,
    image: "/images/chronic-pain.jpg",
    mayInclude: [
      "Biomechanical movement screening",
      "Soft-tissue mobilization & joint therapy",
      "Progressive load reintroduction & agility drills"
    ],
    goal: "Facilitate safe return to sports, gym activities, and active daily lifestyles.",
    whatToExpect: "Care focuses on restoring full joint range of motion, reducing local inflammation or stiffness, and rebuilding load tolerance to help you resume activities safely."
  }
];

const ServiceCard = ({ service, onBookRequest }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-slate-800/90 rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col justify-between text-left transition-all hover:border-brandOrange/40">
      <div>
        {/* Card Image Banner */}
        <div className="h-40 sm:h-44 overflow-hidden relative">
          <img
            src={service.image}
            alt={`${service.title} at ActiveRehab Hyderabad`}
            loading="lazy"
            decoding="async"
            width="340"
            height="176"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-xs">
            {service.icon}
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brandOrange block">
              {service.subtitle}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed mb-4">
            {service.shortDesc}
          </p>

          {/* Structured "May Include" Bullets */}
          <div className="space-y-1.5 mb-4 bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              May Include:
            </span>
            {service.mayInclude.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-brandOrange flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Clinical Goal Statement */}
          <div className="text-xs text-slate-400 font-normal leading-relaxed mb-3">
            <strong className="text-slate-200 font-semibold">Clinical Goal: </strong>
            {service.goal}
          </div>

          {/* Expandable "What to Expect" Accordion — Permanently Rendered in DOM */}
          <div className="border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-brandOrange hover:text-orange-400 flex items-center justify-between w-full py-1 focus:outline-none cursor-pointer"
              aria-expanded={isExpanded}
              aria-controls={`service-details-${service.id}`}
            >
              <span>{isExpanded ? 'Hide Details' : 'What to Expect +'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              id={`service-details-${service.id}`}
              className={`transition-all duration-300 overflow-hidden ${
                isExpanded ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-white/5 leading-relaxed font-normal">
                {service.whatToExpect}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={onBookRequest}
          className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-brandOrange hover:bg-orange-600 shadow-md transition-all flex items-center justify-center space-x-1.5 active:scale-98 cursor-pointer"
        >
          <span>Book Consultation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

const TreatmentServices = ({ onBookRequest }) => {
  const scrollToContact = () => {
    if (onBookRequest) {
      onBookRequest();
      return;
    }
    const element = document.getElementById('contact') || document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="treatments" className="py-12 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brandOrange block mb-2">
            Clinical Care Options
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Chiropractic &amp; <span className="text-brandOrange">Rehabilitation Services</span>
          </h2>
          <div className="w-16 h-1 bg-brandOrange mx-auto mt-3.5 mb-3.5 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Evidence-based chiropractic adjustments, physical rehabilitation, and posture correction tailored to individual clinical evaluations.
          </p>
        </div>

        {/* ── MOBILE: Horizontal Swipe ── */}
        <div
          className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Chiropractic services — swipe to explore"
        >
          {services.map((service) => (
            <div key={service.id} className="flex-shrink-0 w-[86vw] max-w-[340px] snap-start">
              <ServiceCard service={service} onBookRequest={scrollToContact} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP & TABLET: 2×2 Grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onBookRequest={scrollToContact} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TreatmentServices;
