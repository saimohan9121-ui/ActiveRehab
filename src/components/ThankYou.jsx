import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Phone, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clinicConfig } from '../config/clinicConfig';
import { trackCallClick } from '../utils/analytics';
import SEO from './seo/SEO';

const ThankYou = () => {
  useEffect(() => {
    // Note: Conversion events fire strictly upon verified form submission in AppointmentForm.jsx
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <SEO
        title="Thank You | ActiveRehab Centre Kondapur"
        description="Your appointment request has been received. Our clinic team will reach out shortly to confirm your consultation."
      />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brandBlue/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brandOrange/20 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="max-w-xl w-full bg-slate-950/90 backdrop-blur-2xl rounded-3xl border border-white/15 p-8 md:p-12 text-center relative z-10 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 bg-brandOrange/20 rounded-2xl border border-brandOrange/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-brandOrange" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
          Appointment Request <span className="text-brandOrange">Received!</span>
        </h1>
        
        <p className="text-base text-slate-300 font-medium mb-8 leading-relaxed">
          Thank you for reaching out to ActiveRehab Centre. Our clinic team will contact you shortly to confirm your consultation slot.
        </p>

        <div className="space-y-4 mb-8 text-left bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-start space-x-3 text-sm">
            <Calendar className="w-5 h-5 text-brandOrange flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">What Happens Next?</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                Our representative will call your phone number to coordinate the exact time slot with Dr. Ashok P. Kota.
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-sm pt-3 border-t border-white/10">
            <MapPin className="w-5 h-5 text-brandBlue flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Kondapur Clinic Location</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                {clinicConfig.branches.kondapur.fullAddress}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-sm pt-3 border-t border-white/10">
            <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Clinic Timing</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                Monday - Saturday: 9:00 AM - 9:00 PM
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${clinicConfig.phoneRaw}`}
            onClick={() => trackCallClick('thank_you_page')}
            className="w-full sm:w-auto bg-brandOrange hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Clinic Directly</span>
          </a>

          <Link 
            to="/" 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default ThankYou;
