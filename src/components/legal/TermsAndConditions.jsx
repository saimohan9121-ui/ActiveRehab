import React from 'react';
import SEO from '../seo/SEO';
import LegalLayout from './LegalLayout';
import { clinicConfig } from '../../config/clinicConfig';

const TOC = [
  { id: 'about-website', title: 'About This Website' },
  { id: 'website-use', title: 'Website Use' },
  { id: 'appointment-requests', title: 'Appointment Requests' },
  { id: 'appointment-confirmation', title: 'Appointment Confirmation & Rescheduling' },
  { id: 'healthcare-info', title: 'Healthcare Information' },
  { id: 'no-guarantee', title: 'No Guarantee of Treatment Outcome' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'external-links', title: 'External Links' },
  { id: 'website-availability', title: 'Website Availability' },
  { id: 'limitation-liability', title: 'Limitation of Liability' },
  { id: 'changes-terms', title: 'Changes to These Terms' },
  { id: 'governing-law', title: 'Governing Law & Jurisdiction' },
  { id: 'contact-us', title: 'Contact Us' },
];

const TermsAndConditions = () => {
  return (
    <LegalLayout
      title="Terms & Conditions"
      badge="ActiveRehab Terms of Use"
      lastUpdated="March 2026"
      intro="These Terms & Conditions ('Terms') govern your access to and use of the ActiveRehab Chiropractic & Rehabilitation Centre website, online appointment booking requests, and associated digital services."
      tableOfContents={TOC}
    >
      <SEO
        title="Terms & Conditions | ActiveRehab Centre"
        description="Read the Terms & Conditions governing use of the ActiveRehab Centre website, appointment requests and website information."
        canonical="https://chiropractic.activerehab.in/terms-and-conditions"
        robots="index,follow"
      />

      <section id="about-website">
        <h2>1. About This Website</h2>
        <p>
          This website (<code>chiropractic.activerehab.in</code>) is owned and operated by ActiveRehab Chiropractic & Rehabilitation Centre ('ActiveRehab', 'we', 'us', or 'our'). ActiveRehab operates physical clinical centres in Kondapur and Kompally, Hyderabad, India, providing non-surgical chiropractic care, musculoskeletal assessment, physical rehabilitation, and ergonomic guidance led by Dr. Ashok P. Kota (Master of Chiropractic).
        </p>
        <p>
          By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use this website.
        </p>
      </section>

      <section id="website-use">
        <h2>2. Website Use</h2>
        <p>
          You agree to use this website solely for lawful, personal, and informational purposes. You agree not to:
        </p>
        <ul>
          <li>Use the website in any manner that could disable, overburden, damage, or impair website servers or networks.</li>
          <li>Submit false, misleading, fraudulent, or inaccurate contact information or clinical details through our enquiry forms.</li>
          <li>Attempt to gain unauthorized access to any portion of the website, user data, or connected systems.</li>
          <li>Use any automated scraping tool, robot, or data extraction method without our express written permission.</li>
        </ul>
      </section>

      <section id="appointment-requests">
        <h2>3. Appointment Requests</h2>
        <p>
          Our website offers online booking and callback request forms allowing you to submit your contact details and preferred consultation preferences.
        </p>
        <p>
          <strong>Important Notice: Submitting an enquiry, callback request, or appointment form on this website does not automatically confirm or guarantee an appointment slot.</strong>
        </p>
        <p>
          Online submissions represent a request for consultation. A consultation is confirmed only when a representative from ActiveRehab contacts you via phone or WhatsApp to verify clinician availability and schedule a specific appointment time.
        </p>
      </section>

      <section id="appointment-confirmation">
        <h2>4. Appointment Confirmation & Rescheduling</h2>
        <p>
          Once your appointment time has been coordinated by our front desk, we request that you arrive 10–15 minutes prior to your scheduled slot to complete any necessary initial paperwork.
        </p>
        <p>
          If you need to reschedule or cancel your appointment, please notify our clinic team at least 4 to 12 hours in advance by calling or messaging our helpline at <strong>{clinicConfig.phone}</strong> so that the reserved time slot may be offered to other patients in need of acute care.
        </p>
      </section>

      <section id="healthcare-info">
        <h2>5. Healthcare Information</h2>
        <p>
          All content, articles, symptom descriptions, condition guides (including information regarding back pain, neck pain, sciatica, spondylitis, cervical spondylosis, and posture correction), and video stories provided on this website are for general educational and informational purposes only.
        </p>
        <p>
          Website content does not constitute medical diagnosis, specific clinical advice, or treatment prescription. For individualized medical assessment, please consult Dr. Ashok P. Kota or another qualified healthcare professional in person.
        </p>
      </section>

      <section id="no-guarantee">
        <h2>6. No Guarantee of Treatment Outcome</h2>
        <p>
          Human musculoskeletal conditions, spinal mobility, nerve compression, and recovery timelines vary widely among individuals. 
        </p>
        <ul>
          <li>Treatment suitability and care plans are determined solely after an in-person physical and clinical evaluation.</li>
          <li>While our evidence-informed therapies aim to restore joint mobility, reduce mechanical pain, and improve functional strength, <strong>ActiveRehab does not make any claims or guarantees of specific therapeutic outcomes, complete cure, or fixed recovery timeframes.</strong></li>
          <li>Past patient testimonials, reviews, and video case studies reflect individual experiences and do not constitute a guarantee that every patient will achieve identical results.</li>
        </ul>
      </section>

      <section id="intellectual-property">
        <h2>7. Intellectual Property</h2>
        <p>
          All content published on this website—including text, graphics, logos, images, clinic photographs, brand elements, audio clips, video demonstrations, and software code—is the property of ActiveRehab Centre or its content licensors and is protected under applicable Indian and international copyright and trademark laws.
        </p>
        <p>
          You may view, print, or download single copies of website materials for personal, non-commercial informational use only. You may not modify, reproduce, distribute, or republish website content without prior written authorization from ActiveRehab.
        </p>
      </section>

      <section id="external-links">
        <h2>8. External Links</h2>
        <p>
          This website may contain links to external third-party websites or services, such as Google Maps for clinic directions and WhatsApp for direct messaging. ActiveRehab has no control over the content, privacy policies, or practices of third-party platforms and assumes no responsibility for them.
        </p>
      </section>

      <section id="website-availability">
        <h2>9. Website Availability</h2>
        <p>
          We endeavor to ensure uninterrupted availability of our website. However, we do not warrant that website operation will be continuous, error-free, or free of viruses or technical glitches. ActiveRehab reserves the right to suspend or restrict website access temporarily for routine maintenance, upgrades, or technical enhancements without prior notice.
        </p>
      </section>

      <section id="limitation-liability">
        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted under applicable law, ActiveRehab Centre, its practitioners, officers, and staff shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of:
        </p>
        <ul>
          <li>Your access to, use of, or inability to access or use this website.</li>
          <li>Any reliance placed upon general information or educational materials presented on this website.</li>
          <li>Any delay, failure, or interruption in receiving appointment requests submitted via online forms.</li>
        </ul>
      </section>

      <section id="changes-terms">
        <h2>11. Changes to These Terms</h2>
        <p>
          ActiveRehab reserves the right to revise, update, or modify these Terms & Conditions at any time. All updates will take effect immediately upon being posted on this website with a revised "Last Updated" date. Your continued use of the website following such changes constitutes your acceptance of the revised Terms.
        </p>
      </section>

      <section id="governing-law">
        <h2>12. Governing Law & Jurisdiction</h2>
        <p>
          These Terms & Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, claim, or controversy arising out of or relating to these Terms or website use shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
        </p>
      </section>

      <section id="contact-us">
        <h2>13. Contact Us</h2>
        <p>
          For inquiries regarding these Terms & Conditions or our clinic operations, please contact:
        </p>
        <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 not-prose text-sm text-slate-800 space-y-2 mt-4">
          <div className="font-bold text-slate-900">{clinicConfig.fullName}</div>
          <div><strong>Kondapur Clinic:</strong> {clinicConfig.branches.kondapur.address}, Hyderabad 500084</div>
          <div><strong>Kompally Clinic:</strong> {clinicConfig.branches.kompally.address}, Hyderabad 500055</div>
          <div><strong>Phone / Inquiries:</strong> <a href={`tel:${clinicConfig.phoneRaw}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.phone}</a></div>
          <div><strong>Email:</strong> <a href={`mailto:${clinicConfig.email}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.email}</a></div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default TermsAndConditions;
