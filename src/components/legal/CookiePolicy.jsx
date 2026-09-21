import React from 'react';
import SEO from '../seo/SEO';
import LegalLayout from './LegalLayout';
import { clinicConfig } from '../../config/clinicConfig';

const TOC = [
  { id: 'what-are-cookies', title: 'What Are Cookies & Tracking Technologies?' },
  { id: 'categories-cookies', title: 'Categories of Technologies Used' },
  { id: 'specific-tools', title: 'Specific Technologies on This Site' },
  { id: 'advertising-attribution', title: 'Advertising & Campaign Attribution' },
  { id: 'third-party-services', title: 'Third-Party Analytics Services' },
  { id: 'managing-cookies', title: 'Managing and Disabling Cookies' },
  { id: 'updates-policy', title: 'Updates to This Cookie Policy' },
  { id: 'contact-us', title: 'Contact Us' },
];

const CookiePolicy = () => {
  return (
    <LegalLayout
      title="Cookie Policy"
      badge="ActiveRehab Cookie & Tracking Policy"
      lastUpdated="March 2026"
      intro="This Cookie Policy explains how ActiveRehab Chiropractic & Rehabilitation Centre ('ActiveRehab', 'we', 'us', or 'our') utilizes cookies, web beacons, and related tracking technologies on our website (chiropractic.activerehab.in)."
      tableOfContents={TOC}
    >
      <SEO
        title="Cookie Policy | ActiveRehab Centre"
        description="Learn how ActiveRehab Centre uses essential, analytics and advertising technologies on its website where applicable."
        canonical="https://chiropractic.activerehab.in/cookie-policy"
        robots="index,follow"
      />

      <section id="what-are-cookies">
        <h2>1. What Are Cookies and Tracking Technologies?</h2>
        <p>
          A cookie is a small text file placed on your computer, smartphone, or tablet when you visit a website. Cookies help websites function properly, remember user preferences, and provide analytical data to website administrators to optimize usability and performance.
        </p>
        <p>
          Similar technologies include web storage (<code>localStorage</code> and <code>sessionStorage</code>), pixel tags, and URL query identifiers that help identify visitor sessions and campaign traffic sources.
        </p>
      </section>

      <section id="categories-cookies">
        <h2>2. Categories of Technologies Used</h2>
        <p>
          We utilize the following categories of technologies on our website:
        </p>
        <ul>
          <li><strong>Essential & Functional Technologies:</strong> Necessary for core website operations, such as managing client-side navigation, remembering branch selections (Kondapur vs. Kompally), maintaining security, and submitting forms without technical errors.</li>
          <li><strong>Performance & Analytics Technologies:</strong> Help us measure visitor volume, identify which pages or treatment sections are most frequently read, and pinpoint navigation issues or slow-loading assets.</li>
          <li><strong>Advertising & Attribution Technologies:</strong> Enable us to measure the performance of our online advertising campaigns (such as Google Ads) and verify enquiry source attribution.</li>
        </ul>
      </section>

      <section id="specific-tools">
        <h2>3. Specific Technologies in Use</h2>
        <p>
          In accordance with our commitment to transparency, we disclose only the tracking and analytics technologies that are actually integrated into our website codebase:
        </p>
        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Service / Tool</th>
                <th className="p-3">Category</th>
                <th className="p-3">Identifier / Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Google Analytics 4</td>
                <td className="p-3">Analytics & Performance</td>
                <td className="p-3"><code>G-NXBV005KF5</code> — Collects anonymized statistical metrics regarding visits, session duration, device types, and page traffic.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Google Ads Conversion Tracking</td>
                <td className="p-3">Advertising Attribution</td>
                <td className="p-3"><code>AW-16732521690</code> — Measures appointment enquiry submissions originating from Google Ads searches.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Microsoft Clarity</td>
                <td className="p-3">Usability Analytics</td>
                <td className="p-3"><code>wnqzs1slbp</code> — Generates aggregated heatmaps and session interaction analysis to optimize mobile and desktop page layout.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Session State & UI Memory</td>
                <td className="p-3">Essential / Functional</td>
                <td className="p-3">Stores temporary user preferences, such as selected clinic branch tabs or accordion states.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          <em>Note: We do not deploy third-party advertising tracking pixels from unverified advertising networks or sell browsing data to data brokers.</em>
        </p>
      </section>

      <section id="advertising-attribution">
        <h2>4. Advertising & Campaign Attribution</h2>
        <p>
          When users click on an ActiveRehab Google search ad, the URL may include standard campaign parameters such as:
        </p>
        <ul>
          <li><code>gclid</code> (Google Click Identifier)</li>
          <li><code>gbraid</code> / <code>wbraid</code> (Privacy-compliant app/web measurement identifiers)</li>
          <li><code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>, <code>utm_term</code>, <code>utm_content</code></li>
        </ul>
        <p>
          These parameters allow our clinic management system to measure advertising return on investment and understand which search queries helped patients find our clinic. They do not expose private personal browsing history across other unrelated websites.
        </p>
      </section>

      <section id="third-party-services">
        <h2>5. Third-Party Analytics Services</h2>
        <p>
          Analytics services provided by Google LLC and Microsoft Corporation process data in accordance with their respective privacy policies:
        </p>
        <ul>
          <li><strong>Google Privacy & Terms:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brandBlue hover:text-brandOrange underline">https://policies.google.com/privacy</a></li>
          <li><strong>Microsoft Privacy Statement:</strong> <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-brandBlue hover:text-brandOrange underline">https://privacy.microsoft.com/privacystatement</a></li>
        </ul>
      </section>

      <section id="managing-cookies">
        <h2>6. Managing and Disabling Cookies</h2>
        <p>
          You have the right to accept or decline cookies at any time. Most web browsers automatically accept cookies by default, but you can usually modify your browser settings to decline cookies or alert you when a cookie is placed.
        </p>
        <p>
          To manage cookies in your browser, refer to the following official guides:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
          <li><strong>Mozilla Firefox:</strong> Options &gt; Privacy & Security &gt; Enhanced Tracking Protection</li>
          <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
          <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies</li>
        </ul>
        <p>
          Please note that disabling certain essential cookies may affect minor UI preferences, but it will not prevent you from browsing our treatment guides or contacting our clinic directly by phone.
        </p>
      </section>

      <section id="updates-policy">
        <h2>7. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our technological stack, operational requirements, or regulatory guidance. Any revisions will be posted directly to this page with an updated "Last Updated" date.
        </p>
      </section>

      <section id="contact-us">
        <h2>8. Contact Us</h2>
        <p>
          If you have questions regarding our use of cookies, analytics, or tracking technologies, please contact our team:
        </p>
        <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 not-prose text-sm text-slate-800 space-y-2 mt-4">
          <div className="font-bold text-slate-900">{clinicConfig.fullName}</div>
          <div><strong>Kondapur Clinic:</strong> {clinicConfig.branches.kondapur.address}, Hyderabad 500084</div>
          <div><strong>Kompally Clinic:</strong> {clinicConfig.branches.kompally.address}, Hyderabad 500055</div>
          <div><strong>Phone / Helpline:</strong> <a href={`tel:${clinicConfig.phoneRaw}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.phone}</a></div>
          <div><strong>Email:</strong> <a href={`mailto:${clinicConfig.email}`} className="text-brandBlue font-semibold hover:underline">{clinicConfig.email}</a></div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default CookiePolicy;
