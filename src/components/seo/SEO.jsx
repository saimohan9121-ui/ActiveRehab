import React, { useEffect } from 'react';

const SEO = ({
  title = "Chiropractor in Hyderabad | Kondapur & Kompally | ActiveRehab",
  description = "Assessment-led chiropractic and rehabilitation care for back pain, neck pain, sciatica, spondylitis, cervical spondylosis and posture concerns at ActiveRehab in Kondapur and Kompally, Hyderabad.",
  canonical = "https://chiropractic.activerehab.in/",
  keywords = "Chiropractor in Hyderabad, Chiropractor Kondapur, Chiropractor Kompally, Back pain treatment Hyderabad, Neck pain relief Hyderabad, Sciatica treatment Hyderabad, Dr. Ashok P. Kota, ActiveRehab Centre",
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
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
    setMeta('robots', robots);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:site_name', 'ActiveRehab Centre', 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:image:alt', 'ActiveRehab Centre chiropractic and rehabilitation care in Hyderabad', 'property');
    setMeta('twitter:title', 'Chiropractor in Hyderabad | ActiveRehab', 'property');
    setMeta('twitter:description', 'Chiropractic and rehabilitation care in Kondapur and Kompally, Hyderabad.', 'property');
    setMeta('twitter:url', canonical, 'property');

    // Update canonical link (ensuring single clean production canonical)
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [title, description, canonical, keywords, robots]);

  return null;
};

export default SEO;
