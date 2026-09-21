import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Phone, 
  Mail,
  Activity, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { getAttributionData } from '../../utils/attribution';
import { trackFormSubmitSuccess } from '../../utils/analytics';

const AppointmentForm = ({ 
  title = "Request Callback", 
  subtitle = "Schedule your spine & joint consultation",
  selectedLocation = 'kondapur',
  onLocationChange,
  initialConcern = '',
  onConcernChange
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

  // Keep preferred_location synced with page-level selectedLocation
  useEffect(() => {
    if (selectedLocation) {
      setFormData(prev => ({ ...prev, preferred_location: selectedLocation }));
    }
  }, [selectedLocation]);

  // Keep user_concern synced when initialConcern changes (e.g. Condition card CTA clicked)
  useEffect(() => {
    if (initialConcern) {
      setFormData(prev => ({ ...prev, user_concern: initialConcern }));
    }
  }, [initialConcern]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'preferred_location' && onLocationChange) {
      onLocationChange(value);
    }
    if (name === 'user_concern' && onConcernChange) {
      onConcernChange(value);
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
      toast.error("Please select a clinic.");
      return;
    }
    if (!formData.user_name || !formData.user_name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!formData.user_phone || !formData.user_phone.trim() || !validatePhone(formData.user_phone)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    if (!formData.user_concern || !formData.user_concern.trim()) {
      toast.error("Please select your main concern.");
      return;
    }
    if (!formData.user_location || !formData.user_location.trim()) {
      toast.error("Please enter your area or locality.");
      return;
    }
    if (!formData.user_email || !formData.user_email.trim() || !validateEmail(formData.user_email)) {
      toast.error("Please enter a valid email address.");
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
      message: `Preferred Clinic: ${branchName} | Concern: ${formData.user_concern} | Locality: ${cleanLocality} | Email: ${cleanEmail}`,
      gclid: attribution.gclid || 'Direct/Organic',
      gbraid: attribution.gbraid || '',
      wbraid: attribution.wbraid || '',
      utm_source: attribution.utm_source || 'google_ads',
      utm_medium: attribution.utm_medium || 'cpc',
      utm_campaign: attribution.utm_campaign || `chiropractor_${formData.preferred_location}`,
      utm_term: attribution.utm_term || '',
      utm_content: attribution.utm_content || ''
    };

    emailjs.send(
      clinicConfig.emailjs.serviceId,
      clinicConfig.emailjs.templateId,
      emailParams,
      clinicConfig.emailjs.publicKey
    )
    .then(() => {
      toast.success("Callback request received successfully!");
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
        source: 'hero_form'
      });
      navigate('/thank-you');
    })
    .catch((error) => {
      console.error("EmailJS Appointment Form Error:", error);
      toast.error("Network issue sending request. Please call clinic directly.");
      setIsSubmitting(false);
    });
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl relative overflow-hidden text-left">
      {/* Decorative Gradient Border & Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brandBlue via-brandOrange to-emerald-400"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brandOrange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brandBlue/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Doctor Credentials & Authority Badge */}
      <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-slate-200 mb-4 backdrop-blur-md">
        <Award className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
        <span>Dr. Ashok P. Kota · Master of Chiropractic (17+ Yrs Exp)</span>
      </div>

      {/* Header Titles */}
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-brandOrange mr-2.5 flex-shrink-0" />
          <span>{title}</span>
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5 relative z-10" noValidate={false}>
        {/* 1. Preferred Clinic Location * */}
        <div className="space-y-1.5">
          <label htmlFor="preferred_location" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5 ml-1">
            <MapPin className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
            <span>Preferred Clinic Location <span className="text-brandOrange">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, preferred_location: 'kondapur' }));
                if (onLocationChange) onLocationChange('kondapur');
              }}
              className={`min-h-[44px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                formData.preferred_location === 'kondapur'
                  ? 'bg-brandOrange text-white border-brandOrange shadow-md'
                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/15'
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
              className={`min-h-[44px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                formData.preferred_location === 'kompally'
                  ? 'bg-brandOrange text-white border-brandOrange shadow-md'
                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/15'
              }`}
            >
              <span>Kompally Clinic</span>
            </button>
          </div>
          <input
            type="hidden"
            id="preferred_location"
            name="preferred_location"
            value={formData.preferred_location}
            required
            aria-required="true"
          />
        </div>

        {/* 2. Patient Name * */}
        <div className="space-y-1">
          <label htmlFor="user_name" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5 ml-1">
            <User className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
            <span>Patient Name <span className="text-brandOrange">*</span></span>
          </label>
          <div className="relative">
            <input
              id="user_name"
              type="text"
              name="user_name"
              autoComplete="name"
              required
              aria-required="true"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Salaar Devaratha Raisaar"
              className="w-full min-h-[46px] px-4 py-3 pl-11 rounded-xl bg-white/10 border border-white/20 focus:bg-white/15 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/40 text-white font-medium placeholder:text-slate-400 outline-none text-base transition-all"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Mobile Number * */}
        <div className="space-y-1">
          <label htmlFor="user_phone" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5 ml-1">
            <Phone className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
            <span>Mobile Number <span className="text-brandOrange">*</span></span>
          </label>
          <div className="relative">
            <input
              id="user_phone"
              type="tel"
              name="user_phone"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-required="true"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full min-h-[46px] px-4 py-3 pl-11 rounded-xl bg-white/10 border border-white/20 focus:bg-white/15 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/40 text-white font-medium placeholder:text-slate-400 outline-none text-base transition-all"
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. Main Concern / Health Issue * */}
        <div className="space-y-1">
          <label htmlFor="user_concern" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5 ml-1">
            <Activity className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
            <span>Main Concern / Health Issue <span className="text-brandOrange">*</span></span>
          </label>
          <div className="relative">
            <select
              id="user_concern"
              name="user_concern"
              required
              aria-required="true"
              value={formData.user_concern}
              onChange={handleChange}
              className="w-full min-h-[46px] px-4 py-3 pl-11 pr-9 rounded-xl bg-slate-800 border border-white/20 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/40 text-white font-medium outline-none text-base transition-all cursor-pointer appearance-none"
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
            <Activity className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-bold">
              ▼
            </div>
          </div>
        </div>

        {/* 5. Your Area / Locality * */}
        <div className="space-y-1">
          <label htmlFor="user_location" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5 ml-1">
            <MapPin className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
            <span>Your Area / Locality <span className="text-brandOrange">*</span></span>
          </label>
          <div className="relative">
            <input
              id="user_location"
              type="text"
              name="user_location"
              required
              aria-required="true"
              value={formData.user_location}
              onChange={handleChange}
              placeholder="e.g. Kondapur, Gachibowli, Kompally, Suchitra, Khansaar"
              className="w-full min-h-[46px] px-4 py-3 pl-11 rounded-xl bg-white/10 border border-white/20 focus:bg-white/15 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/40 text-white font-medium placeholder:text-slate-400 outline-none text-base transition-all"
            />
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 6. Email Address * (Directly below Your Area / Locality) */}
        <div className="space-y-1">
          <label htmlFor="user_email" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5 ml-1">
            <Mail className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
            <span>Email Address <span className="text-brandOrange">*</span></span>
          </label>
          <div className="relative">
            <input
              id="user_email"
              type="email"
              name="user_email"
              autoComplete="email"
              required
              aria-required="true"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="Shouryaanga@Salaar.@gmail.com"
              className="w-full min-h-[46px] px-4 py-3 pl-11 rounded-xl bg-white/10 border border-white/20 focus:bg-white/15 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/40 text-white font-medium placeholder:text-slate-400 outline-none text-base transition-all"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full min-h-[48px] py-3.5 rounded-xl font-extrabold text-base tracking-wider uppercase text-white bg-gradient-to-r from-brandOrange via-orange-500 to-amber-500 hover:from-orange-600 hover:to-brandOrange shadow-xl shadow-brandOrange/30 hover:shadow-brandOrange/50 transition-all flex items-center justify-center space-x-2 mt-3 cursor-pointer ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          whileHover={!isSubmitting ? { scale: 1.01 } : {}}
          whileTap={!isSubmitting ? { scale: 0.99 } : {}}
        >
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>{isSubmitting ? 'Requesting Callback...' : 'REQUEST CALLBACK'}</span>
          {!isSubmitting && <ArrowRight className="w-4 h-4 ml-1" />}
        </motion.button>
      </form>

      {/* Trust Badges Strip */}
      <div className="mt-5 pt-3.5 border-t border-white/15 grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-semibold">
        <div className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>Strict Confidentiality</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
          <Zap className="w-3.5 h-3.5 text-brandOrange flex-shrink-0" />
          <span>Quick 30-Min Callback</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
