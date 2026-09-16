import React from 'react';
import { Award, MapPin, Stethoscope, CalendarCheck } from 'lucide-react';

const QuickTrustBar = () => {
  const trustItems = [
    {
      icon: <Award className="w-5 h-5 text-brandOrange" />,
      title: "17+ Years Experience",
      subtitle: "Dr. Ashok P. Kota (Master Chiro)"
    },
    {
      icon: <MapPin className="w-5 h-5 text-brandBlue" />,
      title: "2 Hyderabad Locations",
      subtitle: "Kondapur & Kompally Clinics"
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-brandOrange" />,
      title: "Personalized Care",
      subtitle: "Individual Physical Assessments"
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-brandBlue" />,
      title: "Easy Appointment Booking",
      subtitle: "Mon - Sat: 9:00 AM - 9:00 PM"
    }
  ];

  return (
    <section className="bg-slate-900 border-t border-b border-white/10 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 sm:p-3.5 rounded-2xl backdrop-blur-sm text-left"
            >
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black text-white leading-tight truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5 truncate font-normal">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickTrustBar;
