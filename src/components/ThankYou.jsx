import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  React.useEffect(() => {
    // Event snippet for Home page (1) conversion page
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16732521690/xT1WCKjEkdkaENqJ2Ko-'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brandBlue/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brandOrange/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
      
      <motion.div 
        className="max-w-2xl w-full bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white p-8 md:p-16 text-center relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="w-24 h-24 bg-gradient-to-br from-brandBlue to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brandBlue/30 border-4 border-white"
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Thank <span className="text-brandBlue">You!</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-slate-600 font-medium mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Your appointment request has been received. Our team will contact you <span className="text-brandOrange font-bold">within 24 hours</span> to confirm your slot.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          <motion.div 
            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4 group hover:bg-white hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="w-12 h-12 bg-brandBlue/10 rounded-xl flex items-center justify-center text-brandBlue flex-shrink-0 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">What's Next?</h4>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">Check your email for confirmation details.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4 group hover:bg-white hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="w-12 h-12 bg-brandOrange/10 rounded-xl flex items-center justify-center text-brandOrange flex-shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">Need Help?</h4>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">Call us directly at <br/> +91 9000229040</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center space-x-3 bg-brandBlue text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brandBlue/20 hover:shadow-2xl hover:bg-brandBlue/90 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Decorative Circles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-brandOrange rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-brandBlue rounded-full opacity-20 animate-pulse"></div>
    </div>
  );
};

export default ThankYou;
