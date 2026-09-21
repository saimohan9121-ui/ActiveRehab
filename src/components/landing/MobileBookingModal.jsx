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
  Mail,
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
  onLocationChange,
  initialConcern = '',
}) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    preferred_location: selectedLocation || 'kondapur',
    user_name: '',
    user_phone: '',
    user_concern: initialConcern || 'Back Pain',
    user_location: '',
    user_email: '',
  });

  // Sync preferred_location when parent selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setFormData(prev => ({ ...prev, preferred_location: selectedLocation }));
    }
  }, [selectedLocation]);

  // Sync user_concern when initialConcern prop changes (e.g., different card tapped)
  useEffect(() => {
    if (initialConcern) {
      setFormData(prev => ({ ...prev, user_concern: initialConcern }));
    }
  }, [initialConcern]);

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

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) return false;
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
    if (digits.length === 11 && digits.startsWith('0')) return /^[6-9]\d{9}$/.test(digits.slice(1));
    if (digits.length === 12 && digits.startsWith('91')) return /^[6-9]\d{9}$/.test(digits.slice(2));
    return digits.length >= 10;
  };

  const validateEmail = (email) => {
    if (!email || !email.trim()) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.preferred_location) {
      toast.error('Please select a clinic.');
      return;
    }
    if (!formData.user_name || !formData.user_name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!formData.user_phone || !formData.user_phone.trim() || !validatePhone(formData.user_phone)) {
      toast.error('Please enter a valid mobile number.');
      return;
    }
    if (!formData.user_concern || !formData.user_concern.trim()) {
      toast.error('Please select your main concern.');
      return;
    }
    if (!formData.user_location || !formData.user_location.trim()) {
      toast.error('Please enter your area or locality.');
      return;
    }
    if (!formData.user_email || !formData.user_email.trim() || !validateEmail(formData.user_email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const attribution = getAttributionData();

    const branchName = formData.preferred_location === 'kompally' 
      ? 'ActiveRehab Kompally' 
      : 'ActiveRehab Kondapur';

    const cleanName = formData.user_name.trim();
    const cleanPhone = formData.user_phone.trim();
    const cleanLocality = formData.user_location.trim();
    const cleanEmail = formData.user_email.trim();

    const emailParams = {
      user_name: cleanName,
      name: cleanName,
      user_phone: cleanPhone,
      phone: cleanPhone,
      user_email: cleanEmail,
      email: cleanEmail,
      preferred_location: branchName,
      preferredLocation: branchName,
      user_concern: formData.user_concern,
      mainConcern: formData.user_concern,
      user_location: cleanLocality,
      locality: cleanLocality,
      message: `Preferred Clinic: ${branchName} | Concern: ${formData.user_concern} | Locality: ${cleanLocality} | Email: ${cleanEmail} (Mobile Modal Booking)`,
      gclid: attribution.gclid || 'Direct/Organic',
      gbraid: attribution.gbraid || '',
      wbraid: attribution.wbraid || '',
      utm_source: attribution.utm_source || 'google_ads',
      utm_medium: attribution.utm_medium || 'cpc',
      utm_campaign: attribution.utm_campaign || `chiropractor_${formData.preferred_location}`,
      utm_term: attribution.utm_term || '',
      utm_content: attribution.utm_content || '',
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
          name: cleanName,
          phone: cleanPhone,
          locality: cleanLocality,
          email: cleanEmail,
          preferredLocation: formData.preferred_location,
          preferred_location: formData.preferred_location,
          mainConcern: formData.user_concern,
          user_concern: formData.user_concern,
          source: 'mobile_modal' 
        });
        toast.success('Callback request received successfully!');
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
            aria-label="Request Callback"
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
                  <Calendar className="w-5 h-5 text-brandOrange flex-shrink-0" />
                  <h2 className="text-lg font-black text-white leading-tight">
                    Request Callback
                  </h2>
                </div>
                <p className="text-xs text-slate-300 font-semibold flex items-center mt-0.5">
                  <Award className="w-3.5 h-3.5 text-brandOrange mr-1 flex-shrink-0" />
                  Schedule your spine &amp; joint consultation
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3" noValidate={false}>
                {/* 1. Preferred Clinic Location * */}
                <div className="space-y-1">
                  <label htmlFor="modal_preferred_location" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-brandOrange flex-shrink-0" />
                    <span>Preferred Clinic Location <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, preferred_location: 'kondapur' }));
                        if (onLocationChange) onLocationChange('kondapur');
                      }}
                      className={`min-h-[44px] py-2 px-2.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
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
                      className={`min-h-[44px] py-2 px-2.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                        formData.preferred_location === 'kompally'
                          ? 'bg-brandOrange text-white border-brandOrange shadow-md'
                          : 'bg-white/10 text-slate-300 border-white/15'
                      }`}
                    >
                      <span>Kompally Clinic</span>
                    </button>
                  </div>
                  <input
                    type="hidden"
                    id="modal_preferred_location"
                    name="preferred_location"
                    value={formData.preferred_location}
                    required
                    aria-required="true"
                  />
                </div>

                {/* 2. Patient Name * */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_name" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <User className="w-3 h-3 text-brandOrange flex-shrink-0" />
                    <span>Patient Name <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_name"
                      type="text"
                      name="user_name"
                      autoComplete="name"
                      required
                      aria-required="true"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="Salaar Devaratha Raisaar"
                      className="w-full min-h-[46px] px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Mobile Number * */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_phone" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-brandOrange flex-shrink-0" />
                    <span>Mobile Number <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_phone"
                      type="tel"
                      name="user_phone"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      aria-required="true"
                      value={formData.user_phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full min-h-[46px] px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Main Concern / Health Issue * */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_concern" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-brandOrange flex-shrink-0" />
                    <span>Main Concern / Health Issue <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <select
                      id="modal_user_concern"
                      name="user_concern"
                      required
                      aria-required="true"
                      value={formData.user_concern}
                      onChange={handleChange}
                      className="w-full min-h-[46px] px-3.5 py-2.5 pl-10 pr-8 rounded-xl bg-slate-800 border border-white/20 focus:border-brandOrange text-white font-medium outline-none text-base appearance-none cursor-pointer"
                    >
                      <option value="Back Pain">Back Pain</option>
                      <option value="Neck Pain">Neck Pain</option>
                      <option value="Sciatica & Sciatic Nerve Pain">Sciatica &amp; Sciatic Nerve Pain</option>
                      <option value="Spondylitis & Inflammatory Spine Conditions">Spondylitis &amp; Inflammatory Spine Conditions</option>
                      <option value="Cervical Spondylosis & Neck Pain">Cervical Spondylosis &amp; Neck Pain</option>
                      <option value="Postural Disorders & Posture-Related Pain">Postural Disorders &amp; Posture-Related Pain</option>
                      <option value="Headaches & Tension Relief">Headaches &amp; Tension Relief</option>
                      <option value="Joint Pain (Shoulder, Knee, Hip)">Joint Pain (Shoulder, Knee, Hip)</option>
                      <option value="Other Condition">Other Condition</option>
                    </select>
                    <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                  </div>
                </div>

                {/* 5. Your Area / Locality * */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_location" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-brandOrange flex-shrink-0" />
                    <span>Your Area / Locality <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_location"
                      type="text"
                      name="user_location"
                      required
                      aria-required="true"
                      value={formData.user_location}
                      onChange={handleChange}
                      placeholder="e.g. Kondapur, Gachibowli, Kompally, Suchitra, Khansaar"
                      className="w-full min-h-[46px] px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 6. Email Address * (Directly below Your Area / Locality) */}
                <div className="space-y-1">
                  <label htmlFor="modal_user_email" className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-brandOrange flex-shrink-0" />
                    <span>Email Address <span className="text-brandOrange">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="modal_user_email"
                      type="email"
                      name="user_email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      value={formData.user_email}
                      onChange={handleChange}
                      placeholder="Shouryaanga@Salaar.@gmail.com"
                      className="w-full min-h-[46px] px-3.5 py-2.5 pl-10 rounded-xl bg-white/10 border border-white/20 focus:border-brandOrange text-white font-medium placeholder:text-slate-400 outline-none text-base"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full min-h-[48px] py-3.5 rounded-xl font-extrabold text-base tracking-wider uppercase text-white bg-gradient-to-r from-brandOrange via-orange-500 to-amber-500 hover:from-orange-600 hover:to-brandOrange shadow-xl shadow-brandOrange/30 flex items-center justify-center space-x-2 mt-2 cursor-pointer ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>{isSubmitting ? 'Requesting Callback...' : 'REQUEST CALLBACK'}</span>
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
