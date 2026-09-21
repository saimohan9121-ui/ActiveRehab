import React from 'react';
import SEO from '../seo/SEO';
import LegalLayout from './LegalLayout';
import { clinicConfig } from '../../config/clinicConfig';

const TOC = [
  { id: 'info-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-info', title: 'How We Use Your Information' },
  { id: 'appointment-enquiry', title: 'Appointment and Enquiry Information' },
  { id: 'health-info', title: 'Health-Related Information' },
  { id: 'cookies-analytics', title: 'Cookies and Analytics' },
  { id: 'advertising-attribution', title: 'Advertising and Attribution' },
  { id: 'sharing-info', title: 'Sharing of Information' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'choices-rights', title: 'Your Choices and Rights' },
  { id: 'third-party-services', title: 'Third-Party Services' },
  { id: 'changes-policy', title: 'Changes to This Policy' },
  { id: 'contact-us', title: 'Contact Us' },
];

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      badge="ActiveRehab Privacy & Data Practice"
      lastUpdated="March 2026"
      intro="This Privacy Policy explains how ActiveRehab Chiropractic & Rehabilitation Centre ('ActiveRehab', 'we', 'us', or 'our') collects, uses, handles, and safeguards information submitted by visitors to our website, appointment forms, and communication channels."
      tableOfContents={TOC}
    >
      <SEO
        title="Privacy Policy | ActiveRehab Centre"
        description="Read the ActiveRehab Centre Privacy Policy explaining how website, enquiry and appointment information is collected and handled."
        canonical="https://chiropractic.activerehab.in/privacy-policy"
        robots="index,follow"
      />

      <section id="info-we-collect">
        <h2>1. Information We Collect</h2>
        <p>
          We collect personal and health-related information that you voluntarily provide when you interact with our website, request a consultation, submit an enquiry form, or contact our clinic team via phone or WhatsApp.
        </p>
        <p>
          Specifically, when you fill out our appointment assessment or callback request forms, we collect the following fields:
        </p>
        <ul>
          <li><strong>Preferred Clinic Location:</strong> Your selected branch preference (Kondapur Clinic or Kompally Clinic).</li>
          <li><strong>Patient Name:</strong> Your full name to address you accurately.</li>
          <li><strong>Mobile Number:</strong> Your contact telephone number to coordinate consultation schedules and confirm appointments.</li>
          <li><strong>Main Concern / Health Issue:</strong> A brief description of your primary musculoskeletal complaint (such as back pain, neck stiffness, sciatica, spondylitis, cervical discomfort, or posture concerns).</li>
          <li><strong>Your Area / Locality:</strong> Your general locality or neighborhood in or around Hyderabad to assist in directing you to the nearest clinic branch.</li>
          <li><strong>Email Address:</strong> Your email address for administrative notifications or consultation follow-up (where provided).</li>
        </ul>
        <p>
          In addition, we collect communication details when you contact us via direct phone calls, SMS, WhatsApp messaging, or email enquiries. We also automatically receive technical and usage data through web logs and analytics tools (such as IP address, browser type, device category, referring URL, and pages viewed).
        </p>
      </section>

      <section id="how-we-use-info">
        <h2>2. How We Use Your Information</h2>
        <p>
          ActiveRehab uses the information collected solely for lawful, clinical administrative, and customer service purposes, including:
        </p>
        <ul>
          <li>Responding promptly to your enquiries, callback requests, and questions regarding chiropractic and rehabilitation care.</li>
          <li>Coordinating and scheduling in-person clinical consultations with Dr. Ashok P. Kota and our clinic team.</li>
          <li>Verifying your preferred clinic branch location (Kondapur or Kompally) and providing travel/location guidance.</li>
          <li>Communicating appointment reminders, rescheduling notices, and administrative updates via phone, SMS, or WhatsApp.</li>
          <li>Monitoring, maintaining, and improving website functionality, page loading performance, and mobile responsiveness.</li>
          <li>Measuring advertising attribution and campaign effectiveness to ensure accurate marketing analytics.</li>
          <li>Complying with applicable legal, regulatory, and healthcare administrative requirements under Indian law.</li>
        </ul>
      </section>

      <section id="appointment-enquiry">
        <h2>3. Appointment and Enquiry Information</h2>
        <p>
          When you submit an appointment request through our website, your submission is routed to our clinic administration team via secure transmission. 
        </p>
        <p>
          <strong>Please note:</strong> Submitting an enquiry or booking form through this website does not constitute an automatically confirmed appointment time. Our clinic coordinator will contact you by telephone or WhatsApp to verify doctor availability, confirm the consultation time slot, and answer any preliminary questions.
        </p>
      </section>

      <section id="health-info">
        <h2>4. Health-Related Information Submitted by You</h2>
        <p>
          Through our website forms, you may voluntarily provide brief information regarding your physical symptoms (e.g., lower back pain, neck stiffness, sciatica, or joint discomfort) in the <em>Main Concern</em> field.
        </p>
        <p>
          This information is used strictly to provide preliminary context to our clinical staff prior to your visit. <strong>Submitting health information through this website does not establish a formal doctor-patient relationship, nor does it create an official medical record.</strong> Official medical records and formal clinical documentation are established only upon completion of an in-person clinical assessment and examination at our physical clinic facility.
        </p>
      </section>

      <section id="cookies-analytics">
        <h2>5. Cookies and Analytics</h2>
        <p>
          Our website utilizes standard cookies and web analytics tools to enhance your browsing experience and evaluate website usage trends.
        </p>
        <ul>
          <li><strong>Essential Technologies:</strong> Temporary session cookies that maintain user interface state (such as branch tab selection).</li>
          <li><strong>Google Analytics 4 (Measurement ID: <code>G-NXBV005KF5</code>):</strong> Aggregated, anonymized website traffic data, including visitor volume, session duration, and page navigation patterns.</li>
          <li><strong>Microsoft Clarity (Project ID: <code>wnqzs1slbp</code>):</strong> Behavioral heatmaps and anonymized session interaction metrics to identify layout issues and improve usability across desktop and mobile devices.</li>
        </ul>
        <p>
          You may configure your web browser to reject cookies or alert you when cookies are being set. Disabling cookies will not prevent you from viewing clinic information or submitting appointment enquiries. For full details, please review our <a href="/cookie-policy" className="text-brandBlue hover:text-brandOrange underline">Cookie Policy</a>.
        </p>
      </section>

      <section id="advertising-attribution">
        <h2>6. Advertising and Attribution</h2>
        <p>
          We utilize Google Ads (Conversion ID: <code>AW-16732521690</code>) to promote our healthcare services to individuals seeking chiropractic and musculoskeletal care in Hyderabad.
        </p>
        <p>
          When you arrive at our website via an online advertisement, standard advertising attribution parameters (such as Google Click Identifiers <code>gclid</code>, <code>gbraid</code>, <code>wbraid</code>, and UTM campaign tags) may be captured in URL query parameters. These parameters are used solely to assess the effectiveness of our advertising campaigns and understand enquiry attribution. We do not use advertising identifiers to profile visitors across unrelated third-party websites.
        </p>
      </section>

      <section id="sharing-info">
        <h2>7. Sharing of Information</h2>
        <p>
          ActiveRehab respects your privacy. <strong>We do not sell, rent, lease, or trade your personal information or contact details to third parties or marketing data brokers.</strong>
        </p>
        <p>
          We share information only under the following limited and necessary circumstances:
        </p>
        <ul>
          <li><strong>Internal Clinic Team:</strong> With authorized clinical and administrative personnel at ActiveRehab Centre for scheduling and consultation coordination.</li>
          <li><strong>Operational Service Providers:</strong> With trusted technical service providers who assist our website infrastructure (such as EmailJS for form dispatch, Google Cloud for analytics, and communication networks for telephony/WhatsApp connectivity), subject to confidentiality obligations.</li>
          <li><strong>Legal Compliance:</strong> When required by applicable law, court order, governmental regulation, or to protect the rights, safety, and property of ActiveRehab, our patients, or the public.</li>
        </ul>
      </section>

      <section id="data-retention">
        <h2>8. Data Retention</h2>
        <p>
          We retain personal information submitted via website enquiry forms only for as long as reasonably necessary to fulfill the purposes outlined in this Privacy Policy, respond to patient communications, maintain clinic scheduling records, or comply with statutory retention requirements under Indian healthcare and commercial laws. When information is no longer needed, it is deleted or de-identified in a secure manner.
        </p>
      </section>

      <section id="data-security">
        <h2>9. Data Security</h2>
        <p>
          We implement appropriate technical, organizational, and administrative safeguards designed to protect your personal information against unauthorized access, loss, misuse, or alteration. All web traffic between your browser and our website is encrypted in transit using Transport Layer Security (TLS/HTTPS).
        </p>
        <p>
          While we strive to use commercially acceptable means to protect personal information, please be aware that no method of electronic transmission over the internet or method of digital storage is completely secure. We cannot guarantee absolute, impenetrable security.
        </p>
      </section>

      <section id="choices-rights">
        <h2>10. Your Choices and Rights</h2>
        <p>
          You have the right to manage and control the personal information you share with us:
        </p>
        <ul>
          <li><strong>Access and Correction:</strong> You may request to review or correct any inaccurate personal contact details previously submitted to us.</li>
          <li><strong>Opt-Out of Non-Essential Communications:</strong> You may request at any time to stop receiving appointment reminders or follow-up communications by replying directly or calling our clinic.</li>
          <li><strong>Deletion Requests:</strong> You may request the deletion of your online enquiry information, subject to any legal or clinical record-keeping obligations required by law.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact our clinic administration team using the contact information provided below.
        </p>
      </section>

      <section id="third-party-services">
        <h2>11. Third-Party Services</h2>
        <p>
          Our website integrates select third-party services to enhance patient convenience and website operation:
        </p>
        <ul>
          <li><strong>Google Maps:</strong> Embedded maps and directions links to our Kondapur and Kompally clinics. Your interactions with Google Maps are governed by Google's Privacy Policy.</li>
          <li><strong>WhatsApp Business:</strong> Direct communication links to initiate WhatsApp conversations with our front desk. WhatsApp communications are subject to Meta's privacy terms.</li>
          <li><strong>EmailJS:</strong> API services used to securely dispatch form enquiry notifications to our clinic administrative inbox.</li>
        </ul>
      </section>

      <section id="changes-policy">
        <h2>12. Changes to This Privacy Policy</h2>
        <p>
          We may update or revise this Privacy Policy periodically to reflect changes in our clinical practices, website features, or legal obligations. When changes are made, the "Last Updated" date at the top of this page will be revised accordingly. We encourage you to review this policy periodically.
        </p>
      </section>

      <section id="contact-us">
        <h2>13. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us:
        </p>
        <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 not-prose text-sm text-slate-800 space-y-2 mt-4">
          <div className="font-bold text-slate-900">{clinicConfig.fullName}</div>
          <div><strong>Kondapur Clinic:</strong> {clinicConfig.branches.kondapur.address}, Hyderabad, Telangana 500084</div>
          <div><strong>Kompally Clinic:</strong> {clinicConfig.branches.kompally.address}, Hyderabad, Telangana 500055</div>
          <div><strong>Phone / WhatsApp:</strong> <a href={`tel:${clinicConfig.phoneRaw}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.phone}</a></div>
          <div><strong>Email:</strong> <a href={`mailto:${clinicConfig.email}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.email}</a></div>
          <div><strong>Clinic Hours:</strong> Monday – Saturday: 9:00 AM – 9:00 PM (Sunday by Prior Appointment)</div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
