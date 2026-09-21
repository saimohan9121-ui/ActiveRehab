import React from 'react';
import SEO from '../seo/SEO';
import LegalLayout from './LegalLayout';
import { clinicConfig } from '../../config/clinicConfig';
import { AlertTriangle } from 'lucide-react';

const TOC = [
  { id: 'general-info', title: 'General Information' },
  { id: 'not-medical-diagnosis', title: 'Not Medical Diagnosis' },
  { id: 'individual-assessment', title: 'Individual Assessment Required' },
  { id: 'treatment-suitability', title: 'Treatment Suitability' },
  { id: 'results-vary', title: 'Individual Results May Vary' },
  { id: 'emergency-situations', title: 'Emergency Medical Situations' },
  { id: 'website-content', title: 'Website Content & Accuracy' },
  { id: 'contact-activerehab', title: 'Contact ActiveRehab' },
];

const MedicalDisclaimer = () => {
  return (
    <LegalLayout
      title="Medical Disclaimer"
      badge="Healthcare & Clinical Disclaimer"
      lastUpdated="March 2026"
      intro="Please read this Medical Disclaimer carefully before using the ActiveRehab Chiropractic & Rehabilitation Centre website or relying on any health information provided herein."
      tableOfContents={TOC}
    >
      <SEO
        title="Medical Disclaimer | ActiveRehab Centre"
        description="Read the ActiveRehab Centre Medical Disclaimer regarding website health information, clinical assessment and treatment suitability."
        canonical="https://chiropractic.activerehab.in/medical-disclaimer"
        robots="index,follow"
      />

      {/* Emergency Callout Box */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl not-prose mb-8 flex items-start space-x-3 text-amber-900">
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <strong className="block text-amber-950 font-bold mb-1">Medical Emergency Notice:</strong>
          This website and its online enquiry/booking forms are <strong>not</strong> intended for medical emergencies. If you are experiencing sudden acute trauma, severe chest pain, loss of bladder/bowel control, sudden numbness, or life-threatening symptoms, immediately visit the nearest emergency room or call emergency medical services (112 / 108).
        </div>
      </div>

      <section id="general-info">
        <h2>1. General Information</h2>
        <p>
          The content, text, graphics, videos, diagrams, symptom checklists, and FAQ responses published on this website (<code>chiropractic.activerehab.in</code>) are provided strictly for general educational and informational purposes.
        </p>
        <p>
          ActiveRehab Chiropractic & Rehabilitation Centre operates physical clinic facilities in Kondapur and Kompally, Hyderabad, India. The digital content on this website is designed to introduce visitors to chiropractic care, spinal mechanics, posture principles, and musculoskeletal rehabilitation.
        </p>
      </section>

      <section id="not-medical-diagnosis">
        <h2>2. Not Medical Diagnosis or Individual Medical Advice</h2>
        <p>
          Information provided on this website is <strong>not</strong> intended to be, and should not be construed as, medical diagnosis, individualized health advice, prognosis, or medical prescription.
        </p>
        <p>
          Viewing website articles or submitting an online enquiry form does not establish a formal doctor-patient relationship between you and Dr. Ashok P. Kota or ActiveRehab Centre. Never disregard professional medical advice or delay seeking clinical attention because of something you have read on this website.
        </p>
      </section>

      <section id="individual-assessment">
        <h2>3. Individual Assessment Required</h2>
        <p>
          Every individual's musculoskeletal structure, spinal alignment, disc condition, neurological health, and medical history are unique.
        </p>
        <p>
          Safe and responsible chiropractic adjustments and physical rehabilitation therapy require a comprehensive, in-person clinical assessment by a qualified healthcare professional, such as <strong>Dr. Ashok P. Kota (Master of Chiropractic)</strong>. A clinical evaluation typically involves:
        </p>
        <ul>
          <li>Detailed review of past medical and surgical history.</li>
          <li>In-depth physical examination, orthopedic testing, and range-of-motion evaluation.</li>
          <li>Postural analysis and palpation of spinal segments.</li>
          <li>Review of diagnostic imaging (such as X-rays, MRI scans, or CT reports) where clinically indicated.</li>
        </ul>
      </section>

      <section id="treatment-suitability">
        <h2>4. Treatment Suitability</h2>
        <p>
          Chiropractic care and rehabilitation exercises are not universally suitable for every individual or every medical condition. Certain spinal conditions, acute fractures, severe osteoporosis, spinal infections, or advanced disc herniations with cauda equina syndrome require specialist surgical or medical referral.
        </p>
        <p>
          The suitability of chiropractic adjustments, gentle spinal mobilization, decompression therapy, or exercise rehabilitation is determined exclusively during an in-person clinical consultation.
        </p>
      </section>

      <section id="results-vary">
        <h2>5. Individual Results May Vary</h2>
        <p>
          Musculoskeletal healing and functional rehabilitation depend on numerous variables, including the chronicity and severity of the condition, patient age, general health, ergonomic habits, physical activity, and adherence to prescribed home exercises.
        </p>
        <p>
          Any case studies, patient testimonials, ratings, or video recovery stories featured on this website reflect individual patient experiences. <strong>ActiveRehab Centre makes no guarantees, warranties, or promises that every patient will achieve identical relief or rehabilitation timelines.</strong>
        </p>
      </section>

      <section id="emergency-situations">
        <h2>6. Emergency Situations</h2>
        <p>
          Do not use our website forms, callback requests, or email addresses for urgent clinical situations or emergencies. ActiveRehab does not provide 24/7 emergency medical triage.
        </p>
        <p>
          If you experience "red flag" symptoms—such as unexplained progressive weakness in the legs, sudden numbness in the groin/saddle area, acute loss of bowel or bladder control, high fever with severe back pain, or pain following major physical trauma—you should seek immediate emergency medical care at an emergency department or hospital.
        </p>
      </section>

      <section id="website-content">
        <h2>7. Website Content & Accuracy</h2>
        <p>
          ActiveRehab strives to ensure that the healthcare information presented on this website is accurate, evidence-informed, and reflective of modern chiropractic practices. However, medical research, clinical guidelines, and technological standards evolve continuously. We do not warrant that all content on the website is completely exhaustive or up to the minute.
        </p>
      </section>

      <section id="contact-activerehab">
        <h2>8. Contact ActiveRehab</h2>
        <p>
          To schedule a comprehensive in-person spinal and joint assessment, or if you have questions regarding our clinical procedures, please reach out to our clinic team:
        </p>
        <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 not-prose text-sm text-slate-800 space-y-2 mt-4">
          <div className="font-bold text-slate-900">{clinicConfig.fullName}</div>
          <div><strong>Lead Chiropractor:</strong> Dr. Ashok P. Kota (Master of Chiropractic)</div>
          <div><strong>Kondapur Clinic:</strong> {clinicConfig.branches.kondapur.address}, Hyderabad 500084</div>
          <div><strong>Kompally Clinic:</strong> {clinicConfig.branches.kompally.address}, Hyderabad 500055</div>
          <div><strong>Helpline:</strong> <a href={`tel:${clinicConfig.phoneRaw}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.phone}</a></div>
          <div><strong>Email:</strong> <a href={`mailto:${clinicConfig.email}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.email}</a></div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default MedicalDisclaimer;
