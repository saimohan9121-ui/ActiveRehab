import React from 'react';
import { Stethoscope, HeartPulse, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Stethoscope className="w-6 h-6 text-brandOrange" />,
      title: "Personalized Physical Assessment",
      description: "Every treatment starts with a thorough physical assessment to evaluate your posture, spinal alignment, and functional mobility."
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-brandBlue" />,
      title: "Integrated Care Approach",
      description: "We combine gentle chiropractic adjustments with targeted rehabilitation and posture exercises for comprehensive recovery."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brandOrange" />,
      title: "Qualified Master Chiropractor",
      description: "Care is administered under the direct guidance of Dr. Ashok P. Kota (Master of Chiropractic) with 17+ years clinical practice."
    },
    {
      icon: <MapPin className="w-6 h-6 text-brandBlue" />,
      title: "Two Hyderabad Locations",
      description: "Choose ActiveRehab in Kondapur or Kompally based on the location most convenient for you, with flexible appointment hours."
    }
  ];

  return (
    <section id="why-us" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brandBlue block mb-2">
            Patient Trust &amp; Commitment
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose <span className="text-brandBlue">ActiveRehab Centre</span>
          </h2>
          <div className="w-16 h-1 bg-brandOrange mx-auto mt-3.5 mb-3.5 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Evidence-guided chiropractic care, individualized treatment programs, and two accessible clinic locations across Hyderabad.
          </p>
        </div>

        {/* ── MOBILE: compact 2×2 icon grid ── */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-start space-y-2 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xs font-black text-slate-900 leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 4-col full feature grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>

                <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
