import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'

// Lazy-load secondary and legal routes so they do not block initial landing page bundle
const ThankYou = lazy(() => import('./components/ThankYou'))
const PrivacyPolicy = lazy(() => import('./components/legal/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./components/legal/TermsAndConditions'))
const MedicalDisclaimer = lazy(() => import('./components/legal/MedicalDisclaimer'))
const CookiePolicy = lazy(() => import('./components/legal/CookiePolicy'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App

