import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ThankYou from './components/ThankYou'
import PrivacyPolicy from './components/legal/PrivacyPolicy'
import TermsAndConditions from './components/legal/TermsAndConditions'
import MedicalDisclaimer from './components/legal/MedicalDisclaimer'
import CookiePolicy from './components/legal/CookiePolicy'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </div>
  )
}

export default App

