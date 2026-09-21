import React from 'react';
import { Stethoscope, HeartPulse, Award, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import PatientVideoStories from './PatientVideoStories';

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-14 sm:py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 1. Main Section Header ───────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1d74b9] block mb-1.5">
            PATIENT TRUST &amp; COMMITMENT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Why Choose <span className="text-[#1d74b9]">ActiveRehab Centre</span>
          </h2>
          <div className="w-14 h-1 bg-[#fb8b07] mx-auto mt-3 mb-3.5 rounded-full" />
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Assessment-led chiropractic and rehabilitation care, individualized treatment planning, experienced clinical guidance, and two convenient Hyderabad clinic locations.
          </p>
        </div>

        {/* ── 2. Four Rich Trust Proof Cards (2×2 Compact Grid) ──── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-5xl mx-auto">
          
          {/* Card A: Personalized Physical Assessment */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-[#fb8b07]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Step 01 • Evaluation
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-snug">
                Personalized Physical Assessment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Care begins with an individual assessment of posture, movement, spinal mobility and functional limitations.
              </p>
            </div>

            {/* Micro visual: Assessment → Movement → Care Plan */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-semibold text-slate-700">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/70 text-slate-800">
                  Assessment
                </span>
                <ArrowRight className="w-3 h-3 text-[#fb8b07]" />
                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/70 text-slate-800">
                  Movement
                </span>
                <ArrowRight className="w-3 h-3 text-[#fb8b07]" />
                <span className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200/70 text-[#fb8b07] font-bold">
                  Care Plan
                </span>
              </div>
            </div>
          </div>

          {/* Card B: Integrated Care Approach */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="w-5 h-5 text-[#1d74b9]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Step 02 • Care Modalities
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-snug">
                Integrated Care Approach
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Based on the assessment, care may include chiropractic, physiotherapy, rehabilitation and posture-focused exercises.
              </p>
            </div>

            {/* Micro visual: Chiropractic + Physiotherapy + Rehabilitation */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-semibold text-slate-700">
                <span className="px-2 py-0.5 rounded-md bg-blue-50/80 border border-blue-100 text-[#1d74b9] font-bold">
                  Chiropractic
                </span>
                <span className="text-slate-400 font-bold">+</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/70 text-slate-800">
                  Physiotherapy
                </span>
                <span className="text-slate-400 font-bold">+</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/70 text-slate-800">
                  Rehabilitation
                </span>
              </div>
            </div>
          </div>

          {/* Card C: Qualified Master Chiropractor */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[#fb8b07]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Clinical Leadership
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-snug">
                Qualified Master Chiropractor
              </h3>
              
              {/* Doctor Details with Real Image Thumbnail */}
              <div className="flex items-center gap-3 mt-2.5">
                <img
                  src="/images/doctorphoto.webp"
                  alt="Dr. Ashok P. Kota, Master of Chiropractic at ActiveRehab Hyderabad"
                  width="48"
                  height="48"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    Dr. Ashok P. Kota
                  </h4>
                  <div className="text-xs font-semibold text-[#1d74b9]">
                    Master of Chiropractic
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    17+ Years Clinical Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Micro visual */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Directly evaluates and supervises every care pathway</span>
              </div>
            </div>
          </div>

          {/* Card D: Two Hyderabad Locations */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#1d74b9]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Convenient Access
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-snug">
                Two Hyderabad Locations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Choose the clinic that is most convenient for you.
              </p>

              {/* Location Chips with MapPin icons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#1d74b9]" />
                  <span>Kondapur</span>
                </span>
                <span className="text-slate-300 font-bold">•</span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#fb8b07]" />
                  <span>Kompally</span>
                </span>
              </div>
            </div>

            {/* Micro visual: Flexible Hours */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Mon – Sat: 9:00 AM – 9:00 PM</span>
                <span className="font-semibold text-[#1d74b9]">Dedicated Parking</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── 3. PATIENT VIDEO STORIES Subsection (Inside Why Choose) ── */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-slate-200/80">
          <PatientVideoStories />
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
