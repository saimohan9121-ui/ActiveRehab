import React from 'react';
import { Stethoscope, ClipboardCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Assessment",
    subtitle: "In-Depth Clinical Evaluation",
    description: "Understand symptoms, joint mobility, posture alignment, and daily functional limitations.",
    icon: <Stethoscope className="w-5 h-5 text-brandOrange" />
  },
  {
    number: "02",
    title: "Personalized Plan",
    subtitle: "Custom Treatment Strategy",
    description: "The doctor recommends the care approach and session frequency appropriate to your clinical findings.",
    icon: <ClipboardCheck className="w-5 h-5 text-brandBlue" />
  },
  {
    number: "03",
    title: "Care + Rehabilitation",
    subtitle: "Hands-On Care & Exercises",
    description: "Controlled gentle adjustments, mobility work, and exercise guidance tailored to support lasting recovery.",
    icon: <Sparkles className="w-5 h-5 text-emerald-500" />
  }
];

const TreatmentProcess = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brandBlue block mb-2">
            Structured Patient Journey
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            How Your Treatment Plan <span className="text-brandBlue">Works</span>
          </h2>
          <div className="w-12 h-1 bg-brandOrange mx-auto mt-3 mb-3 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            A clear, evidence-guided 3-step pathway from initial assessment to functional recovery.
          </p>
        </div>

        {/* ── MOBILE: compact vertical timeline ── */}
        <div className="md:hidden space-y-3 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-left"
            >
              {/* Timeline marker */}
              <div className="absolute -left-6 top-4 w-5 h-5 rounded-full bg-brandBlue text-white text-[10px] font-black flex items-center justify-center -translate-x-1/2 shadow-xs border-2 border-white">
                {idx + 1}
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandOrange">
                  Step {step.number} · {step.subtitle}
                </span>
                <div className="p-1 rounded-lg bg-slate-50">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-base font-black text-slate-900 mb-1">
                {step.title}
              </h3>

              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 3-column structured grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 text-left">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-brandBlue transition-colors font-mono">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-brandOrange mb-1">
                  {step.subtitle}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TreatmentProcess;
