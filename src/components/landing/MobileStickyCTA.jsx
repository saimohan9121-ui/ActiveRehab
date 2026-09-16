import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick, trackWhatsAppClick } from '../../utils/analytics';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

/**
 * Mobile sticky conversion bar (CALL | WHATSAPP | BOOK).
 * Location-aware WhatsApp and Call routing. Hidden on md+ screens.
 */
const MobileStickyCTA = ({ onBookClick, selectedLocation = 'kondapur' }) => {
  const branchName = selectedLocation === 'kompally' ? 'Kompally clinic' : 'Kondapur clinic';
  const whatsappMsg = encodeURIComponent(
    `Hi, I would like to book a chiropractic consultation at the ${branchName}.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/98 backdrop-blur-md border-t border-white/10 shadow-2xl p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">

        {/* CALL */}
        <a
          href={`tel:${clinicConfig.phoneRaw}`}
          onClick={() => trackCallClick('mobile_sticky_bar', selectedLocation || 'general')}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 active:scale-95 transition-all"
          aria-label="Call Clinic"
        >
          <Phone className="w-4 h-4 text-brandOrange mb-1" />
          <span>CALL</span>
        </a>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/${clinicConfig.whatsappRaw}?text=${whatsappMsg}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar', selectedLocation || 'general')}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#128C7E] active:scale-95 transition-all"
          aria-label="WhatsApp Clinic"
        >
          <WhatsAppIcon className="w-4 h-4 mb-1" />
          <span>WHATSAPP</span>
        </a>

        {/* BOOK — Opens Mobile Modal */}
        <button
          type="button"
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-brandOrange text-white font-bold text-xs hover:bg-orange-600 active:scale-95 transition-all shadow-md shadow-brandOrange/30 cursor-pointer"
          aria-label="Book Appointment"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span>BOOK</span>
        </button>

      </div>
    </div>
  );
};

export default MobileStickyCTA;
