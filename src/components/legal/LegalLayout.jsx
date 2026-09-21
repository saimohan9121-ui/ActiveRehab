import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { trackCallClick } from '../../utils/analytics';
import LandingFooter from '../landing/LandingFooter';

const LegalLayout = ({
  badge = "ActiveRehab Legal & Compliance",
  title,
  lastUpdated = "March 2026",
  intro,
  tableOfContents = [],
  children
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-brandOrange/20 selection:text-brandBlue">
      {/* ─── Streamlined Top Navigation Bar (No Legal Links in Header) ─── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo Navigation to Home */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brandBlue rounded-lg p-1"
            aria-label="ActiveRehab Centre Homepage"
          >
            <img
              src="/images/logo.png"
              alt="ActiveRehab Centre"
              width="180"
              height="48"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </Link>

          {/* Action CTAs: Back to Home + Direct Phone Call */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brandBlue px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brandBlue"
            >
              <ArrowLeft className="w-4 h-4 text-brandOrange" />
              <span>Back to Home</span>
            </Link>

            <a
              href={`tel:${clinicConfig.phoneRaw}`}
              onClick={() => trackCallClick('legal_header')}
              className="hidden sm:inline-flex items-center space-x-2 bg-brandBlue hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brandBlue"
              aria-label={`Call Clinic at ${clinicConfig.phone}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{clinicConfig.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── Clean Header Hero Section ─── */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 bg-brandBlue/30 text-blue-200 border border-brandBlue/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-brandOrange" />
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {title}
          </h1>

          {intro && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-4">
              {intro}
            </p>
          )}

          <div className="flex items-center text-xs sm:text-sm text-slate-400 font-medium">
            <span>Last Updated: <strong className="text-white">{lastUpdated}</strong></span>
            <span className="mx-2 text-slate-600">•</span>
            <span>ActiveRehab Centre, Hyderabad</span>
          </div>
        </div>
      </div>

      {/* ─── Main Content Container (Max width: 900-1000px) ─── */}
      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Optional Table of Contents */}
          {tableOfContents && tableOfContents.length > 0 && (
            <nav 
              aria-label="Table of contents"
              className="mb-10 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-brandBlue mb-3">
                On This Page
              </div>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {tableOfContents.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${item.id}`}
                      className="text-slate-600 hover:text-brandOrange hover:underline flex items-center space-x-1.5 transition-colors py-1"
                    >
                      <span className="text-slate-400 font-mono text-xs">{idx + 1}.</span>
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Policy Document Body */}
          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-brandOrange prose-h2:pl-3 prose-h2:pt-1 prose-h2:mb-4 prose-h2:mt-10 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-slate-700 prose-li:text-sm sm:prose-li:text-base">
            {children}
          </article>
        </div>
      </main>

      {/* ─── Global Footer With Dedicated Legal Navigation ─── */}
      <LandingFooter />
    </div>
  );
};

export default LegalLayout;
