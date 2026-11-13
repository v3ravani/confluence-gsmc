// ── Realtime Analytics via Firebase RTDB REST API ────────────────────────────
// No external npm dependencies required — uses native browser fetch() with atomic .sv increment

const FIREBASE_RTDB_URL = 'https://confluence-site-default-rtdb.firebaseio.com';
const VISITOR_KEY = 'confluence_unique_visitor_id';

/**
 * Sanitize a string into a valid Firebase Realtime Database path key.
 * Disallows '.', '$', '#', '[', ']', '/' and control characters.
 */
export function sanitizeFirebaseKey(raw) {
  if (!raw) return 'unknown';
  return (
    String(raw)
      .trim()
      .toLowerCase()
      .replace(/[.#$[\]/]/g, '_')
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '') || 'unknown'
  );
}

/**
 * Detect client device category: 'desktop', 'mobile', or 'tablet'.
 */
export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /mobile|android|ip(hone|od)|iemobile|blackberry|kindle|silk-accelerated|(hpw|web)os|opera m(obi|ini)/i.test(
      ua
    ) ||
    window.innerWidth < 768
  ) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Detect traffic source / referrer:
 * Checks UTM parameters (?utm_source, ?ref, ?source) first, then document.referrer.
 * Supports direct, instagram, linkedin, google, whatsapp, and automatically adds new referrers.
 */
export function getReferrerSource() {
  if (typeof window === 'undefined') return 'direct';

  // 1. Check URL query parameters (e.g. ?utm_source=instagram or ?ref=whatsapp)
  try {
    const search = window.location.search || (window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
    if (search) {
      const urlParams = new URLSearchParams(search);
      const utm = urlParams.get('utm_source') || urlParams.get('ref') || urlParams.get('source');
      if (utm) {
        return sanitizeFirebaseKey(utm);
      }
    }
  } catch (e) {}

  // 2. Check document.referrer
  const ref = typeof document !== 'undefined' ? document.referrer : '';
  if (!ref) return 'direct';

  try {
    const url = new URL(ref);
    const hostname = url.hostname.toLowerCase();

    // Internal navigation on the same domain counts as direct
    if (hostname === window.location.hostname.toLowerCase()) {
      return 'direct';
    }

    if (hostname.includes('instagram.com')) return 'instagram';
    if (hostname.includes('linkedin.com')) return 'linkedin';
    if (hostname.includes('google.')) return 'google';
    if (hostname.includes('whatsapp') || hostname.includes('wa.me')) return 'whatsapp';
    if (hostname.includes('facebook.com') || hostname.includes('fb.com')) return 'facebook';
    if (hostname.includes('twitter.com') || hostname.includes('x.com') || hostname.includes('t.co')) return 'twitter';
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) return 'youtube';
    if (hostname.includes('t.me') || hostname.includes('telegram')) return 'telegram';
    if (hostname.includes('reddit.com')) return 'reddit';

    // Auto-detect new domains (e.g. "college.edu" -> "college_edu")
    const cleanHost = hostname.replace(/^www\./, '').replace(/\./g, '_');
    return sanitizeFirebaseKey(cleanHost) || 'other';
  } catch (e) {
    if (ref.includes('whatsapp')) return 'whatsapp';
    if (ref.includes('instagram')) return 'instagram';
    return sanitizeFirebaseKey(ref.slice(0, 30)) || 'other';
  }
}

/**
 * Check if the current visitor is unique using persistent localStorage token.
 */
export function checkIsUniqueVisitor() {
  if (typeof window === 'undefined') return false;
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return false;

    const newId = 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem(VISITOR_KEY, newId);
    return true;
  } catch (e) {
    return false;
  }
}

// Memory lock to prevent double-counting on React StrictMode mounts
let hasTrackedPageView = false;

/**
 * Track site pageview atomically in Firebase RTDB:
 * - total_views (always incremented)
 * - unique_views (incremented only for first-time visitors)
 * - views_by_device (desktop, mobile, tablet)
 * - referrers (direct, instagram, linkedin, google, whatsapp, or auto-created new source)
 * - last_updated (ISO timestamp)
 */
export async function trackPageView() {
  if (typeof window === 'undefined') return;
  if (hasTrackedPageView) return;
  hasTrackedPageView = true;

  try {
    const device = getDeviceType();
    const referrer = getReferrerSource();
    const isUnique = checkIsUniqueVisitor();

    const updates = {
      'total_views': { '.sv': { 'increment': 1 } },
      [`views_by_device/${device}`]: { '.sv': { 'increment': 1 } },
      [`referrers/${referrer}`]: { '.sv': { 'increment': 1 } },
      'last_updated': new Date().toISOString(),
    };

    if (isUnique) {
      updates['unique_views'] = { '.sv': { 'increment': 1 } };
    }

    await fetch(`${FIREBASE_RTDB_URL}/.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch (err) {
    // Fail silently so site operations remain 100% resilient
    console.warn('Analytics tracking error:', err);
  }
}

/**
 * Track Register button clicks for events with separate counts per event and aggregate total:
 * - event_registrations/total
 * - event_registrations/<cleanEventKey>
 * - last_registration
 */
export async function trackEventRegistration(eventIdentifier, eventName) {
  if (typeof window === 'undefined') return;

  try {
    const cleanKey = sanitizeFirebaseKey(eventIdentifier || eventName || 'general_registration');

    const updates = {
      'event_registrations/total': { '.sv': { 'increment': 1 } },
      [`event_registrations/${cleanKey}`]: { '.sv': { 'increment': 1 } },
      'last_registration': {
        event: eventName || eventIdentifier || cleanKey,
        timestamp: new Date().toISOString(),
      },
    };

    await fetch(`${FIREBASE_RTDB_URL}/.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch (err) {
    console.warn('Event registration tracking error:', err);
  }
}

