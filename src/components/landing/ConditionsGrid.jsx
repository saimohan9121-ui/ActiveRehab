import React from 'react';
import { LifeBuoy, Zap, Brain, ShieldCheck, Stethoscope, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ConditionsGrid = ({ onBookRequest }) => {
  const conditions = [
    {
      title: "Back Pain",
      description: "Assessment of movement, posture, joint and muscle factors that may be contributing to lower or upper back discomfort, followed by a personalized treatment plan.",
      image: "/images/back-pain.jpg",
      icon: <LifeBuoy className="w-5 h-5 text-brandBlue" />
    },
    {
      title: "Sciatica",
      description: "Evaluation for pain, tingling or discomfort travelling from the lower back into the leg, with treatment planned according to the clinical findings.",
      image: "/images/nerve-pain.jpg",
      icon: <Zap className="w-5 h-5 text-brandOrange" />
    },
    {
      title: "Neck / Cervical Pain",
      description: "Care focused on neck mobility, posture and musculoskeletal factors that may contribute to stiffness, tension and discomfort.",
      image: "/images/neck-pain.jpg",
      icon: <Brain className="w-5 h-5 text-brandOrange" />
    },
    {
      title: "Spondylitis",
      description: "Therapeutic joint mobility and posture alignment techniques to manage spinal stiffness and help maintain comfortable daily movement.",
      image: "/images/chronic-pain.jpg",
      icon: <ShieldCheck className="w-5 h-5 text-brandBlue" />
    },
    {
      title: "Headaches",
      description: "Assessment of neck, posture and musculoskeletal tension factors that may be associated with cervicogenic or tension headaches.",
      image: "/images/headache.jpg",
      icon: <Brain className="w-5 h-5 text-brandBlue" />
    },
    {
      title: "Posture Problems",
      description: "Posture and movement assessment with corrective strategies and exercise guidance based on individual physical requirements.",
      image: "/images/posture-correction.png",
      icon: <Stethoscope className="w-5 h-5 text-brandOrange" />
    }
  ];

  const handleConsultClick = (e) => {
    e.preventDefault();
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
    <section id="conditions" className="py-12 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brandOrange block mb-2">
            Targeted Musculoskeletal Care
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Conditions We <span className="text-brandBlue">Evaluate &amp; Manage</span>
          </h2>
          <div className="w-16 h-1 bg-brandBlue mx-auto mt-3.5 mb-3.5 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Individual assessments and tailored rehabilitation care for common spine, nerve, and joint concerns in Hyderabad.
          </p>
        </div>

        {/* ── MOBILE: horizontal scroll-snap ── */}
        <div
          className="md:hidden flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Conditions we evaluate — swipe to explore"
        >
          {conditions.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[84vw] max-w-[320px] snap-start bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={`${item.title} Care at ActiveRehab Hyderabad`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-slate-100">
                    {item.icon}
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-base font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs font-normal text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={handleConsultClick}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-brandBlue hover:text-brandBlueDark bg-blue-50/70 border border-blue-100 flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>Discuss Your Symptoms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 3×2 Grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {conditions.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={`${item.title} Assessment & Care in Hyderabad`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xs border border-white/40">
                    {item.icon}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-normal text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5">
                <button
                  type="button"
                  onClick={handleConsultClick}
                  className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-brandBlue hover:text-white bg-slate-100 hover:bg-brandBlue transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Request Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ConditionsGrid;
