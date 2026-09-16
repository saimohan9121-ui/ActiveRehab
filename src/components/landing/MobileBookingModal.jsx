import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  Activity, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Award,
  Sparkles 
} from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { getAttributionData } from '../../utils/attribution';
import { trackFormSubmitSuccess } from '../../utils/analytics';

/**
 * MobileBookingModal — Bottom-sheet appointment form for mobile (<768px).
 * Triggered by MobileStickyCTA "BOOK" button or other mobile CTA links.
 */
const MobileBookingModal = ({ 
  isOpen, 
  onClose, 
  selectedLocation = 'kondapur', 
  onLocationChange 
}) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    preferred_location: selectedLocation || 'kondapur',
    user_concern: 'Back Pain / Lower Back Care',
    user_location: '',
  });

  // Sync preferred_location when parent selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setFormData(prev => ({ ...prev, preferred_location: selectedLocation }));
    }
  }, [selectedLocation]);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'preferred_location' && onLocationChange) {
      onLocationChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.user_name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!formData.user_phone.trim() || formData.user_phone.length < 8) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    const attribution = getAttributionData();

    const branchName = formData.preferred_location === 'kompally' 
      ? 'ActiveRehab Kompally' 
      : 'ActiveRehab Kondapur';

    const emailParams = {
      user_name: formData.user_name,
      user_phone: formData.user_phone,
      preferred_location: branchName,
      user_concern: formData.user_concern,
      user_location: formData.user_location || `${branchName} Area`,
      message: `Preferred Clinic: ${branchName} | Concern: ${formData.user_concern} (Mobile Modal Booking)`,
      gclid: attribution.gclid || 'Direct/Organic',
      utm_source: attribution.utm_source || 'google_ads',
      utm_campaign: attribution.utm_campaign || `chiropractor_${formData.preferred_location}`,
    };

    emailjs
      .send(
        clinicConfig.emailjs.serviceId,
        clinicConfig.emailjs.templateId,
        emailParams,
        clinicConfig.emailjs.publicKey
      )
      .then(() => {
        setIsSubmitting(false);
        trackFormSubmitSuccess({ 
          ...formData, 
          preferred_location: formData.preferred_location,
          source: 'mobile_modal' 
        });
        toast.success('Appointment request received!');
        onClose();
        navigate('/thank-you');
      })
      .catch((error) => {
        console.error('EmailJS Mobile Modal Error:', error);
        toast.error('Network issue. Please call clinic directly.');
        setIsSubmitting(false);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Bottom Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book Appointment"
            className="fixed bottom-0 left-0 right-0 z-[61] md:hidden bg-slate-900 rounded-t-3xl border-t border-slate-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          >
            {/* Top Accent Line */}
            <div className="h-1.5 bg-gradient-to-r from-brandBlue via-brandOrange to-emerald-400"></div>

            {/* Drag Handle */}
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="w-12 h-1 rounded-full bg-slate-600" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-1 pb-3 border-b border-slate-800">
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-brandOrange" />
                  <h2 className="text-lg font-black text-white leading-tight">
                    Book Your Appointment
                  </h2>
                </div>
                <p className="text-xs text-slate-300 font-semibold flex items-center mt-0.5">
                  <Award className="w-3.5 h-3.5 text-brandOrange mr-1" />
                  Dr. Ashok P. Kota (17+ Yrs Exp) · Hyderabad
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                aria-label="Close booking form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body with Smooth Scroll */}
            <div className="overflow-y-auto px-5 py-4 space-y-3.5 text-left">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                {/* Preferred Location Switcher */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-brandOrange" />
                    <span>Select Clinic Location <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, preferred_location: 'kondapur' }));
                        if (onLocationChange) onLocationChange('kondapur');
                      }}
                      className={`py-2 px-2.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                        formData.preferred_location === 'kondapur'
                          ? 'bg-brandOrange text-white border-brandOrange shadow-md'
                          : 'bg-white/10 text-slate-300 border-white/15'
                      }`}
                    >
                      <span>Kondapur Clinic</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, preferred_location: 'kompally' }));
                        if (onLocationChange) onLocationChange('kompally');
                      }}
                      className={`py-2 px-2.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                        formData.preferred_location === 'kompally'
                          ? 'bg-brandOrange text-white border-brandOrange shadow-md'
                          : 'bg-white/10 text-slate-300 border-white/15'
                      }`}
                    >
                      <span>Kompally Clinic</span>
                    </button>
                  </div>
                </div>

                {/* Patient Name */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_name" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <User className="w-3 h-3 text-brandOrange" />
                    <span>Patient Name <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_name"
                      type="text"
                      name="user_name"
                      required
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_phone" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-brandOrange" />
                    <span>Mobile Number <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_phone"
                      type="tel"
                      name="user_phone"
                      required
                      value={formData.user_phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Concern */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_concern" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-brandOrange" />
                    <span>Main Concern <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <select
                      id="modal_user_concern"
                      name="user_concern"
                      value={formData.user_concern}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-800 border border-white/20 focus:border-brandOrange text-white font-medium outline-none text-base appearance-none cursor-pointer"
                    >
                      <option value="Back Pain / Lower Back Care">Back Pain / Lower Back Care</option>
                      <option value="Sciatica & Nerve Pain">Sciatica &amp; Nerve Pain</option>
                      <option value="Neck Pain & Cervical Care">Neck Pain &amp; Cervical Care</option>
                      <option value="Spondylitis & Spine Stiffness">Spondylitis &amp; Spine Stiffness</option>
                      <option value="Headaches & Tension Relief">Headaches &amp; Tension Relief</option>
                      <option value="Posture Correction & Alignment">Posture Correction &amp; Alignment</option>
                      <option value="Joint Pain (Shoulder, Knee, Hip)">Joint Pain (Shoulder, Knee, Hip)</option>
                      <option value="Other Condition">Other Condition</option>
                    </select>
                    <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                  </div>
                </div>

                {/* Area / Locality */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_location" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-brandOrange" />
                    <span>Your Area <span className="text-slate-400 font-normal lowercase">(optional)</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_location"
                      type="text"
                      name="user_location"
                      value={formData.user_location}
                      onChange={handleChange}
                      placeholder="e.g. Kondapur, Gachibowli, Kompally"
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-base tracking-wider uppercase text-white bg-gradient-to-r from-brandOrange to-amber-500 shadow-xl shadow-brandOrange/30 flex items-center justify-center space-x-2 mt-2 cursor-pointer ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>{isSubmitting ? 'Submitting...' : 'CONFIRM APPOINTMENT'}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>

              {/* Security note */}
              <div className="pt-2 pb-1 text-[11px] text-slate-400 flex items-center justify-center space-x-3">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict Confidentiality</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-brandOrange" />
                  <span>Quick Callback</span>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileBookingModal;
