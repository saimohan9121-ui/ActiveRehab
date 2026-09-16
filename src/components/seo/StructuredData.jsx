import React from 'react';
import { clinicConfig } from '../../config/clinicConfig';

const StructuredData = ({ faqs = [] }) => {
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://chiropractic.activerehab.in/#clinic",
    "name": clinicConfig.fullName,
    "alternateName": clinicConfig.name,
    "image": "https://chiropractic.activerehab.in/images/logo.png",
    "url": "https://chiropractic.activerehab.in/",
    "telephone": clinicConfig.phoneRaw,
    "email": clinicConfig.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": clinicConfig.branches.kondapur.address,
      "addressLocality": "Kondapur, Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500084",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4474,
      "longitude": 78.3569
    },
    "medicalSpecialty": [
      "Chiropractic",
      "Physiotherapy",
      "Rehabilitation"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "physician": {
      "@type": "Physician",
      "name": clinicConfig.doctor.name,
      "jobTitle": clinicConfig.doctor.role,
      "medicalSpecialty": "Chiropractic",
      "image": `https://chiropractic.activerehab.in${clinicConfig.doctor.image}`
    }
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};

export default StructuredData;
