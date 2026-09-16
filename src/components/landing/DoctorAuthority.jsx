import React from 'react';
import { Award, CheckCircle, Phone, Calendar, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick } from '../../utils/analytics';

const DoctorAuthority = ({ onBookRequest }) => {
  const scrollToContact = (e) => {
    e.preventDefault();
    if (onBookRequest) {
      onBookRequest();
      return;
    }
    const element = document.getElementById('contact') || document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doctor" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── MOBILE: compact doctor card ── */}
        <div className="md:hidden text-left">
          <div className="flex items-center space-x-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-brandOrange/30 shadow-md">
              <img
                src={clinicConfig.doctor.image}
                alt={`${clinicConfig.doctor.name} - Chiropractor in Hyderabad`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brandOrange mb-0.5">
                Lead Chiropractor
              </div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                {clinicConfig.doctor.name}
              </h3>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">
                {clinicConfig.doctor.qualification}
              </div>
              <div className="flex items-center space-x-1 mt-1.5">
                <Award className="w-3.5 h-3.5 text-brandOrange" />
                <span className="text-[11px] font-bold text-slate-700">17+ Years Clinical Practice</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
            Dr. Ashok P. Kota provides chiropractic adjustments and rehabilitation therapy for patients visiting ActiveRehab in Kondapur and Kompally, Hyderabad.
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {clinicConfig.doctor.qualifications.map((qual, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100"
              >
                <CheckCircle className="w-3.5 h-3.5 text-brandOrange flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-bold text-slate-800 leading-snug">{qual}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5">
            <a
              href={`tel:${clinicConfig.phoneRaw}`}
              onClick={() => trackCallClick('doctor_mobile')}
              className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brandOrange" />
              <span>Call Clinic</span>
            </a>
            <button
              type="button"
              onClick={onBookRequest || scrollToContact}
              className="flex-1 bg-brandOrange text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* ── DESKTOP: 2-column authority layout ── */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center text-left">
          
          {/* Doctor Image Column */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src={clinicConfig.doctor.image}
                alt={`${clinicConfig.doctor.name} - Chiropractor in Hyderabad (Kondapur & Kompally)`}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-xs font-bold text-brandOrange uppercase tracking-widest">
                  Lead Chiropractor
                </div>
                <div className="text-xl font-black text-white">
                  {clinicConfig.doctor.name}
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  {clinicConfig.doctor.qualification}
                </div>
              </div>
            </div>

            {/* Experience Pill */}
            <div className="absolute -top-3 -right-2 sm:right-4 bg-brandOrange text-white px-4 py-2 rounded-2xl shadow-xl flex items-center space-x-2">
              <Award className="w-4 h-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-wider">
                17+ Years Clinical Practice
              </span>
            </div>
          </motion.div>

          {/* Doctor Details Column */}
          <motion.div
            className="lg:col-span-7 space-y-5"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              <Stethoscope className="w-4 h-4 text-brandBlue" />
              <span className="text-xs font-bold uppercase tracking-widest text-brandBlue">
                Clinical Leadership
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Meet Our <span className="text-brandBlue">Chiropractic Specialist</span>
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Dr. Ashok P. Kota provides chiropractic and physical rehabilitation care for patients visiting ActiveRehab across our Kondapur and Kompally clinics in Hyderabad. Dedicated to thorough physical assessments, Dr. Ashok tailors non-invasive care plans to each individual's musculoskeletal needs.
            </p>

            {/* Qualifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {clinicConfig.doctor.qualifications.map((qual, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <CheckCircle className="w-4 h-4 text-brandOrange flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {qual}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onBookRequest || scrollToContact}
                className="bg-brandOrange hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>

              <a
                href={`tel:${clinicConfig.phoneRaw}`}
                onClick={() => trackCallClick('doctor_section')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-brandOrange" />
                <span>Call Clinic ({clinicConfig.phone})</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DoctorAuthority;
