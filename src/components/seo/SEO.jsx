import React, { useEffect } from 'react';

const SEO = ({
  title = "Chiropractor in Hyderabad | Kondapur & Kompally | ActiveRehab",
  description = "Consult ActiveRehab for chiropractic and rehabilitation care in Kondapur and Kompally, Hyderabad. Care for back pain, sciatica, neck pain, posture problems and related musculoskeletal concerns.",
  canonical = "https://chiropractic.activerehab.in/",
  keywords = "Chiropractor in Hyderabad, Chiropractor Kondapur, Chiropractor Kompally, Back pain treatment Hyderabad, Neck pain relief Hyderabad, Sciatica treatment Hyderabad, ActiveRehab Centre, Dr. Ashok P. Kota"
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update meta tags dynamically
    const setMeta = (name, content, attr = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', title, 'property');
    setMeta('twitter:description', description, 'property');

    // Update canonical link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [title, description, canonical, keywords]);

  return null;
};

export default SEO;
