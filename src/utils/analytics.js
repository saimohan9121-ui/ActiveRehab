// Analytics and Conversion Event Helper functions for Google Ads and GA4

import { clinicConfig } from '../config/clinicConfig';

export const trackLocationSelect = (location = 'kondapur') => {
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'location_select',
        selected_location: location
      });
    }
  } catch (err) {
    console.warn('Location select tracking error:', err);
  }
};

export const trackFormSubmitSuccess = (formData = {}) => {
  try {
    // 1. Google Ads Conversion Event
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: clinicConfig.tracking.conversionSendTo,
        value: 1.0,
        currency: 'INR'
      });
    }

    // 2. DataLayer Event for GTM / GA4
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'form_submit_success',
        lead_source: formData.source || 'google_ads_landing_page',
        service: formData.user_concern || 'chiropractic',
        location: formData.preferred_location || formData.user_location_choice || 'kondapur'
      });
    }
  } catch (err) {
    console.warn('Analytics tracking error:', err);
  }
};

export const trackCallClick = (source = 'header', location = 'general') => {
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'call_click',
        click_location: source,
        selected_branch: location
      });
    }
  } catch (err) {
    console.warn('Call tracking error:', err);
  }
};

export const trackWhatsAppClick = (source = 'hero', location = 'general') => {
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        click_location: source,
        selected_branch: location
      });
    }
  } catch (err) {
    console.warn('WhatsApp tracking error:', err);
  }
};

export const trackDirectionsClick = (location = 'kondapur') => {
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'directions_click',
        location: location
      });
    }
  } catch (err) {
    console.warn('Directions tracking error:', err);
  }
};

export const trackBookAppointmentClick = (source = 'hero', location = 'general') => {
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'book_appointment_click',
        click_location: source,
        selected_branch: location
      });
    }
  } catch (err) {
    console.warn('Book appointment tracking error:', err);
  }
};

