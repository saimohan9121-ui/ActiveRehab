import React from 'react';
import { clinicConfig } from '../../config/clinicConfig';

const StructuredData = ({ faqs = [] }) => {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://chiropractic.activerehab.in/#website",
        "url": "https://chiropractic.activerehab.in/",
        "name": "ActiveRehab Centre",
        "description": "Assessment-led chiropractic and rehabilitation care in Kondapur and Kompally, Hyderabad.",
        "publisher": {
          "@id": "https://chiropractic.activerehab.in/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://chiropractic.activerehab.in/#organization",
        "name": clinicConfig.name,
        "legalName": clinicConfig.fullName,
        "url": "https://chiropractic.activerehab.in/",
        "logo": "https://chiropractic.activerehab.in/images/logo.png",
        "telephone": clinicConfig.phoneRaw,
        "email": clinicConfig.email,
        "sameAs": []
      },
      {
        "@type": "MedicalClinic",
        "@id": "https://chiropractic.activerehab.in/#kondapur-clinic",
        "name": "ActiveRehab Centre - Kondapur",
        "alternateName": clinicConfig.branches.kondapur.fullName,
        "url": "https://chiropractic.activerehab.in/",
        "image": "https://chiropractic.activerehab.in/images/logo.png",
        "telephone": clinicConfig.branches.kondapur.phoneRaw,
        "priceRange": "$$",
        "parentOrganization": {
          "@id": "https://chiropractic.activerehab.in/#organization"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": clinicConfig.branches.kondapur.address,
          "addressLocality": "Kondapur, Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": clinicConfig.branches.kondapur.pincode,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.4623,
          "longitude": 78.3568
        },
        "hasMap": clinicConfig.branches.kondapur.mapsLink,
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
        ]
      },
      {
        "@type": "MedicalClinic",
        "@id": "https://chiropractic.activerehab.in/#kompally-clinic",
        "name": "ActiveRehab Centre - Kompally",
        "alternateName": clinicConfig.branches.kompally.fullName,
        "url": "https://chiropractic.activerehab.in/",
        "image": "https://chiropractic.activerehab.in/images/logo.png",
        "telephone": clinicConfig.branches.kompally.phoneRaw,
        "priceRange": "$$",
        "parentOrganization": {
          "@id": "https://chiropractic.activerehab.in/#organization"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": clinicConfig.branches.kompally.address,
          "addressLocality": "Kompally, Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": clinicConfig.branches.kompally.pincode,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.5256,
          "longitude": 78.4842
        },
        "hasMap": clinicConfig.branches.kompally.mapsLink,
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
        ]
      },
      {
        "@type": "Physician",
        "@id": "https://chiropractic.activerehab.in/#dr-ashok-kota",
        "name": clinicConfig.doctor.name,
        "jobTitle": clinicConfig.doctor.role,
        "medicalSpecialty": "Chiropractic",
        "image": `https://chiropractic.activerehab.in${clinicConfig.doctor.image}`,
        "worksFor": [
          { "@id": "https://chiropractic.activerehab.in/#kondapur-clinic" },
          { "@id": "https://chiropractic.activerehab.in/#kompally-clinic" }
        ]
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
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
