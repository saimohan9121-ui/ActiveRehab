import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  Phone, 
  Calendar, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  Award, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick, trackWhatsAppClick } from '../../utils/analytics';
import { defaultFaqs } from '../../data/faqsData';

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const FAQSection = ({ 
  faqs = defaultFaqs,
  onBookRequest,
  selectedLocation = 'kondapur',
  onLocationChange
}) => {
  // Allow interactive single-open accordion (first item open by default for rich first impression)
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  const handleBookingClick = (e) => {
    e.preventDefault();
    if (onBookRequest) {
      onBookRequest();
    } else {
      const el = document.getElementById('contact') || document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeBranchKey = selectedLocation === 'kompally' ? 'kompally' : 'kondapur';
  const branchName = activeBranchKey === 'kompally' ? 'Kompally Clinic' : 'Kondapur Clinic';

  const whatsappMessage = encodeURIComponent(
    `Hello ActiveRehab! I have a question about chiropractic consultations at ${branchName}.`
  );

  return (
    <section id="faq" className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200/80 relative overflow-hidden text-left">
      {/* Ambient background blur accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brandOrange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-brandOrange block mb-2">
            Patient Guidance &amp; FAQs
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 tracking-tight leading-tight">
            Frequently Asked <span className="text-brandBlue">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-brandOrange mx-auto mt-3.5 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Clear answers about chiropractic consultations, care planning, conditions, and appointments at our Kondapur and Kompally clinics in Hyderabad.
          </p>
        </div>

        {/* 3-Part Responsive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          
          {/* ─── 1. LEFT SUPPORT PANEL: Quick Patient Help ─── */}
          <div className="order-2 lg:order-1 lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Header */}
              <div className="flex items-center space-x-2.5 mb-4 pb-3.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-brandBlue/10 text-brandBlue flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                    Quick Patient Help
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    What patients usually ask about
                  </p>
                </div>
              </div>

              {/* 4 Compact Informational Mini-Cards */}
              <div className="space-y-3">
                
                {/* 1. Conditions Evaluated */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/90 transition-colors hover:bg-orange-50/40">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                    <Activity className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
                    <span>Conditions Evaluated</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-5.5">
                    Back pain, sciatica, neck stiffness, spondylitis, postural strain &amp; joint mobility.
                  </p>
                </div>

                {/* 2. 2 Hyderabad Clinics */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/90 transition-colors hover:bg-blue-50/40">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brandBlue flex-shrink-0" />
                    <span>Hyderabad Clinics</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-5.5">
                    <strong>Kondapur</strong> (80 Feet Rd) &amp; <strong>Kompally</strong> (Suchitra Rd). Direct care at both branches.
                  </p>
                </div>

                {/* 3. Consultation Guidance */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/90 transition-colors hover:bg-slate-100/70">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Consultation Steps</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-5.5">
                    Physical assessment, posture review, diagnostic evaluation &amp; personalized recovery plan.
                  </p>
                </div>

                {/* 4. Doctor Experience */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/90 transition-colors hover:bg-orange-50/40">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                    <Award className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
                    <span>Lead Chiropractor</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-5.5">
                    Dr. Ashok P. Kota (Master of Chiropractic, 17+ Yrs Clinical Experience).
                  </p>
                </div>

              </div>

              {/* Clinic Timings & Badge */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 text-slate-400 mr-1.5" />
                  Mon–Sat: 9:00 AM – 9:00 PM
                </span>
              </div>

            </div>
          </div>


          {/* ─── 2. CENTER FAQ ACCORDION COLUMN ─── */}
          <div className="order-1 lg:order-2 lg:col-span-6 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden text-left ${
                    isOpen 
                      ? 'bg-white border-brandBlue/40 shadow-md ring-1 ring-brandBlue/15' 
                      : 'bg-white border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow'
                  }`}
                >
                  {/* Question Button */}
                  <button
                    id={`faq-q-${idx}`}
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-3 text-left p-4 sm:p-4.5 cursor-pointer min-h-[56px] group transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${idx}`}
                  >
                    <div className="flex items-center space-x-3 pr-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-colors ${
                        isOpen 
                          ? 'bg-brandBlue text-white' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-brandBlue/10 group-hover:text-brandBlue'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[13.5px] sm:text-[14.5px] font-bold leading-snug transition-colors ${
                        isOpen ? 'text-brandBlue' : 'text-slate-900 group-hover:text-brandBlue'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isOpen ? 'bg-orange-50 text-brandOrange rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </button>

                  {/* Answer Panel */}
                  <div
                    id={`faq-a-${idx}`}
                    role="region"
                    aria-labelledby={`faq-q-${idx}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-100/90 text-left">
                      <div className="pl-9 text-[12.5px] sm:text-[13.5px] text-slate-600 font-normal leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          {/* ─── 3. RIGHT CTA / ASSIST PANEL: Still Have Questions? ─── */}
          <div className="order-3 lg:col-span-3 space-y-4">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl text-left relative overflow-hidden">
              
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-brandOrange/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-brandBlue/20 rounded-full blur-2xl pointer-events-none" />

              {/* Authority Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full text-[10.5px] font-bold text-amber-300 mb-3.5 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
                <span>Doctor &amp; Team Assistance</span>
              </div>

              {/* Title & Help Copy */}
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight mb-2">
                Still Have Questions?
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-5">
                Our clinic team is available to help clarify your condition focus, clinic selection, and consultation process before you book.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2.5 relative z-10">
                
                {/* 1. Request Callback */}
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-brandOrange via-orange-500 to-amber-500 hover:from-orange-600 hover:to-brandOrange shadow-md shadow-brandOrange/25 transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>REQUEST CALLBACK</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. Call Clinic */}
                <a
                  href={`tel:${clinicConfig.phoneRaw}`}
                  onClick={() => trackCallClick('faq_assist_card', selectedLocation)}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-100 bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brandOrange flex-shrink-0" />
                  <span>Call {clinicConfig.phone}</span>
                </a>

                {/* 3. WhatsApp Direct */}
                <a
                  href={`https://wa.me/${clinicConfig.whatsappRaw}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('faq_assist_card', selectedLocation)}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600/90 hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>

              </div>

              {/* 3 Subtle Reassurance Checkpoints */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Individual spine &amp; posture assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brandBlue flex-shrink-0" />
                  <span>Kondapur &amp; Kompally clinics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
                  <span>Quick same-day callback response</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQSection;
