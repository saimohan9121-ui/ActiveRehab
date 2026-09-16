import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';

export const defaultFaqs = [
  {
    question: "What conditions can chiropractic care help with?",
    answer: "Chiropractic care focuses on the clinical assessment and management of mechanical disorders of the musculoskeletal system. Common conditions evaluated and managed at ActiveRehab include lower and upper back pain, sciatica, neck stiffness, cervical discomfort, spondylitis-related stiffness, posture strain, and cervicogenic headaches."
  },
  {
    question: "Can chiropractic care help with sciatica?",
    answer: "Yes. Sciatica involves irritation or compression of the sciatic nerve, causing discomfort travelling down into the leg. Chiropractic care evaluates the root pelvic and lumbar contributors, applying controlled joint mobilizations, pelvic balancing, and decompression strategies tailored to your clinical findings."
  },
  {
    question: "What happens during the first consultation with Dr. Ashok P. Kota?",
    answer: "Your initial visit begins with a detailed physical evaluation of your posture, spinal alignment, muscle tone, and joint range of motion. Dr. Ashok reviews your health history and symptoms to determine if chiropractic adjustments or rehabilitation therapy are appropriate, followed by a personalized care plan."
  },
  {
    question: "What treatments and therapies are available at ActiveRehab?",
    answer: "ActiveRehab integrates hands-on chiropractic adjustments with physical rehabilitation therapy, spinal decompression protocols, postural correction exercises, and ergonomic habit guidance. Treatment plans are customized based on individual assessment rather than a one-size-fits-all approach."
  },
  {
    question: "How is my treatment plan decided?",
    answer: "Treatment plans are determined entirely by your initial clinical assessment findings, functional mobility limitations, and individual recovery goals. Session frequency and recommended therapy modalities are reviewed with you before starting care."
  },
  {
    question: "Do you have clinics in both Kondapur and Kompally?",
    answer: "Yes. ActiveRehab serves patients from two established centres in Hyderabad: our Kondapur clinic (Plot No. 1272, 80 Feet Road, above Burfi Ghar) and our Kompally clinic (Hale Clinics, 2nd Floor, Suchitra Road, Opp. Decathlon). Dr. Ashok P. Kota provides care across both locations."
  },
  {
    question: "How do I choose the nearest ActiveRehab location?",
    answer: "Patients located in Kondapur, Gachibowli, HITEC City, Madhapur, or Jubilee Hills typically visit our Kondapur clinic. Patients located in Kompally, Suchitra, Petbasheerabad, Quthbullapur, Medchal, or Alwal find our Kompally branch most convenient. Both branches offer complete chiropractic and rehabilitation care."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can easily request an appointment online through the callback booking form on this page, call our clinic directly at +91 9000229040, or reach out via WhatsApp. Our clinic coordinator will coordinate a convenient consultation time slot."
  }
];

const FAQSection = ({ faqs = defaultFaqs }) => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 mb-2">
            <HelpCircle className="w-4 h-4 text-brandBlue" />
            <span className="text-xs font-bold uppercase tracking-widest text-brandBlue">
              Got Questions?
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="text-brandBlue">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-brandOrange mx-auto mt-3.5 mb-3.5 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Clear answers about chiropractic consultations, care plans, and our Kondapur &amp; Kompally clinics in Hyderabad.
          </p>
        </div>

        {/* Accordions — Answers Permanently Rendered in DOM for SEO Crawlability */}
        <div className="space-y-3 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  id={`faq-question-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between space-x-4 hover:bg-slate-100/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brandOrange flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Always rendered in DOM for Googlebot & SEO, controlled visually via max-height */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
