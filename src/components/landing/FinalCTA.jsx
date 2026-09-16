import React from 'react';
import { Phone, Calendar, Clock, ArrowRight, ShieldCheck, Award, MapPin } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick, trackWhatsAppClick } from '../../utils/analytics';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const FinalCTA = ({ onBookRequest, selectedLocation = 'kondapur', onLocationChange }) => {
  const activeBranchKey = selectedLocation === 'kompally' ? 'kompally' : 'kondapur';
  const branchName = activeBranchKey === 'kompally' ? 'Kompally Clinic' : 'Kondapur Clinic';

  const scrollToBooking = (e) => {
    e.preventDefault();
    if (onBookRequest && window.innerWidth < 768) {
      onBookRequest();
      return;
    }
    const element = document.getElementById('home') || document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to schedule a chiropractic consultation at ActiveRehab ${branchName}.`
  );

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-brandBlue/20 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-brandOrange/15 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Authority Pill */}
        <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-brandOrange mb-5 shadow-sm backdrop-blur-md">
          <Award className="w-3.5 h-3.5 text-brandOrange" />
          <span>ActiveRehab Chiropractic &amp; Rehabilitation</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight text-white">
          Need Help With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-brandOrange to-orange-400">Back, Neck or Sciatica</span> Pain?
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
          Choose your nearest ActiveRehab clinic in Hyderabad and speak with our team about your concern.
        </p>

        {/* Location Selector / Active Indicator */}
        <div className="inline-flex p-1 bg-slate-900 border border-slate-700 rounded-2xl mb-8 shadow-inner">
          <button
            type="button"
            onClick={() => onLocationChange && onLocationChange('kondapur')}
            className={`min-h-[44px] px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeBranchKey === 'kondapur'
                ? 'bg-brandOrange text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Kondapur Clinic</span>
          </button>

          <button
            type="button"
            onClick={() => onLocationChange && onLocationChange('kompally')}
            className={`min-h-[44px] px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeBranchKey === 'kompally'
                ? 'bg-brandOrange text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Kompally Clinic</span>
          </button>
        </div>

        {/* CTAs Group */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-2xl mx-auto">
          {/* BOOK APPOINTMENT */}
          <button
            type="button"
            onClick={scrollToBooking}
            className="w-full sm:w-auto min-h-[48px] bg-gradient-to-r from-brandOrange via-orange-500 to-amber-500 hover:from-orange-600 hover:to-brandOrange text-white px-7 py-3.5 rounded-xl font-extrabold text-sm tracking-wide shadow-lg shadow-brandOrange/30 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK APPOINTMENT</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* CALL NOW */}
          <a
            href={`tel:${clinicConfig.phoneRaw}`}
            onClick={() => trackCallClick('final_cta', activeBranchKey)}
            className="w-full sm:w-auto min-h-[48px] bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white px-6 py-3.5 rounded-xl font-extrabold text-sm tracking-wide transition-all flex items-center justify-center space-x-2 shadow-md"
          >
            <Phone className="w-4 h-4 text-brandOrange" />
            <span>CALL NOW ({clinicConfig.phone})</span>
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${clinicConfig.whatsappRaw}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsAppClick('final_cta', activeBranchKey)}
            className="w-full sm:w-auto min-h-[48px] bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-extrabold text-sm tracking-wide transition-all flex items-center justify-center space-x-2 shadow-md shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WHATSAPP</span>
          </a>
        </div>

        {/* Live Clinic Status */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full text-xs font-bold text-slate-300 backdrop-blur-md">
          <span className="flex items-center text-emerald-400 font-extrabold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
            Clinic Open
          </span>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-brandOrange" />
            <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kondapur &amp; Kompally</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
