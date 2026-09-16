// Utility to capture and store Google Ads (GCLID, GBRAID, WBRAID) & UTM parameters for lead attribution

const ATTRIBUTION_KEY = 'active_rehab_attribution';

export const captureAttribution = () => {
  try {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const existing = getAttributionData();

    const newParams = {
      gclid: urlParams.get('gclid') || existing.gclid || '',
      gbraid: urlParams.get('gbraid') || existing.gbraid || '',
      wbraid: urlParams.get('wbraid') || existing.wbraid || '',
      utm_source: urlParams.get('utm_source') || existing.utm_source || '',
      utm_medium: urlParams.get('utm_medium') || existing.utm_medium || '',
      utm_campaign: urlParams.get('utm_campaign') || existing.utm_campaign || '',
      utm_term: urlParams.get('utm_term') || existing.utm_term || '',
      utm_content: urlParams.get('utm_content') || existing.utm_content || '',
      landing_page: window.location.pathname,
      referrer: document.referrer || ''
    };

    // Store in sessionStorage so it persists across soft navigations
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(newParams));
  } catch (err) {
    console.warn('Attribution capture failed:', err);
  }
};

export const getAttributionData = () => {
  try {
    if (typeof window === 'undefined') return {};
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    return {};
  }
};
