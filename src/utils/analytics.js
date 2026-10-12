/**
 * First-Party Real Visitor Analytics Tracker
 * Privacy-friendly, anonymous client session tracking without browser fingerprinting.
 * Excludes admin dashboard sessions, handles React Strict Mode deduplication,
 * and maintains continuous dwell-time heartbeats.
 */

const STORAGE_KEY_VID = 'vanojan_vid';
const STORAGE_KEY_SID = 'vanojan_sid';
const STORAGE_KEY_SID_TIME = 'vanojan_sid_time';
const STORAGE_KEY_REF = 'vanojan_entry_ref';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity rolls over session

// Memory cache to deduplicate rapid events within same 5-second window
const recentEvents = new Set();

/**
 * Generates an anonymous unique identifier
 */
function generateId(prefix = 'v') {
  const rnd = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rnd}`;
}

/**
 * Retrieves or initializes an anonymous Visitor ID
 */
export function getVisitorId() {
  try {
    let vid = localStorage.getItem(STORAGE_KEY_VID);
    if (!vid) {
      vid = generateId('vid');
      localStorage.setItem(STORAGE_KEY_VID, vid);
    }
    return vid;
  } catch (e) {
    return 'vid_guest_' + Date.now().toString(36);
  }
}

/**
 * Retrieves or refreshes a Session ID (rolls over after 30 mins idle)
 */
export function getSessionId() {
  try {
    const now = Date.now();
    let sid = sessionStorage.getItem(STORAGE_KEY_SID);
    const lastActive = parseInt(sessionStorage.getItem(STORAGE_KEY_SID_TIME) || '0', 10);

    if (!sid || (lastActive && now - lastActive > SESSION_TIMEOUT_MS)) {
      sid = generateId('sid');
      sessionStorage.setItem(STORAGE_KEY_SID, sid);
    }

    sessionStorage.setItem(STORAGE_KEY_SID_TIME, String(now));
    return sid;
  } catch (e) {
    return 'sid_guest_' + Date.now().toString(36);
  }
}

/**
 * Gets or stores the initial entry referrer for this visitor session
 */
export function getEntryReferrer() {
  try {
    let storedRef = sessionStorage.getItem(STORAGE_KEY_REF);
    if (!storedRef) {
      storedRef = document.referrer || 'Direct';
      sessionStorage.setItem(STORAGE_KEY_REF, storedRef);
    }
    return storedRef;
  } catch (e) {
    return document.referrer || 'Direct';
  }
}

/**
 * Detects if current user is an authenticated administrator
 */
export function isAdminUser() {
  try {
    return Boolean(
      localStorage.getItem('vanojan_admin_token') ||
      window.location.pathname.startsWith('/admin')
    );
  } catch (e) {
    return false;
  }
}

let sessionStartTimestamp = Date.now();

/**
 * Sends an analytics event to backend
 */
export async function sendAnalyticsEvent(payload = {}) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const referrer = getEntryReferrer();
  const isAdmin = isAdminUser();

  const dwellSeconds = Math.max(0, Math.floor((Date.now() - sessionStartTimestamp) / 1000));

  const bodyData = {
    visitorId,
    sessionId,
    path: payload.path || window.location.pathname || '/',
    title: payload.title || document.title || 'Uthayagunasingam Vanojan Portfolio',
    referrer,
    eventType: payload.eventType || 'pageview',
    projectSlug: payload.projectSlug || '',
    dwellSeconds,
    isAdmin,
    ...payload
  };

  // Deduplication key (prevents React 18 Strict Mode double triggers)
  const dedupKey = `${bodyData.eventType}:${bodyData.path}:${bodyData.projectSlug}:${Math.floor(Date.now() / 4000)}`;
  if (recentEvents.has(dedupKey)) {
    return;
  }
  recentEvents.add(dedupKey);
  setTimeout(() => recentEvents.delete(dedupKey), 8000);

  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon && payload.isBeacon) {
      const blob = new Blob([JSON.stringify(bodyData)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/track', blob);
      return;
    }

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });
  } catch (err) {
    // Non-blocking fail-safe
  }
}

/**
 * Tracks a project interaction/modal view
 */
export function trackProjectView(projectSlug, projectTitle = '') {
  sendAnalyticsEvent({
    eventType: 'project_view',
    projectSlug: String(projectSlug || '').trim(),
    path: `/#project-${projectSlug}`,
    title: projectTitle ? `Project: ${projectTitle}` : `Project: ${projectSlug}`
  });
}

/**
 * Initializes continuous analytics lifecycle (pageview, heartbeats, unloads)
 */
export function initAnalyticsTracker() {
  if (typeof window === 'undefined') return () => {};

  sessionStartTimestamp = Date.now();

  // Initial pageview tracking
  sendAnalyticsEvent({
    eventType: 'pageview',
    path: window.location.pathname || '/',
    title: document.title
  });

  // Dwell heartbeat every 30 seconds to update active session duration
  const heartbeatTimer = setInterval(() => {
    const dwellSeconds = Math.max(0, Math.floor((Date.now() - sessionStartTimestamp) / 1000));
    sendAnalyticsEvent({
      eventType: 'heartbeat',
      dwellSeconds
    });
  }, 30000);

  // Send unload heartbeat with beacon
  const handleUnload = () => {
    const dwellSeconds = Math.max(0, Math.floor((Date.now() - sessionStartTimestamp) / 1000));
    sendAnalyticsEvent({
      eventType: 'heartbeat',
      dwellSeconds,
      isBeacon: true
    });
  };

  window.addEventListener('beforeunload', handleUnload);
  window.addEventListener('pagehide', handleUnload);

  return () => {
    clearInterval(heartbeatTimer);
    window.removeEventListener('beforeunload', handleUnload);
    window.removeEventListener('pagehide', handleUnload);
  };
}
