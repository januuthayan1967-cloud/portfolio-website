import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import { VisitorSession } from '../models/VisitorSession.js';
import { Analytics } from '../models/Analytics.js';
import { getDb, saveDb } from '../db.js';

/**
 * Classifies traffic source from referrer URL
 */
export function classifyTrafficSource(referrer = '', currentHost = '') {
  if (!referrer || typeof referrer !== 'string') {
    return 'Direct Visits';
  }

  const cleanRef = referrer.trim().toLowerCase();
  if (!cleanRef || cleanRef === 'direct') {
    return 'Direct Visits';
  }

  try {
    const url = new URL(cleanRef);
    const host = url.hostname.toLowerCase();

    // Internal self-referrals count as Direct
    if (
      (currentHost && host.includes(currentHost.toLowerCase())) ||
      host.includes('localhost') ||
      host.includes('127.0.0.1') ||
      host.includes('vanojan') ||
      host.includes('portfolio-website')
    ) {
      return 'Direct Visits';
    }

    // Search Engines
    if (
      host.includes('google.') ||
      host.includes('bing.com') ||
      host.includes('duckduckgo.com') ||
      host.includes('yahoo.com') ||
      host.includes('ecosia.org') ||
      host.includes('baidu.com') ||
      host.includes('yandex.')
    ) {
      return 'Google Search';
    }

    // Social Platforms
    if (
      host.includes('linkedin.com') ||
      host.includes('github.com') ||
      host.includes('twitter.com') ||
      host.includes('x.com') ||
      host.includes('t.co') ||
      host.includes('instagram.com') ||
      host.includes('facebook.com') ||
      host.includes('reddit.com') ||
      host.includes('youtube.com') ||
      host.includes('threads.net') ||
      host.includes('tiktok.com') ||
      host.includes('discord.')
    ) {
      return 'Social Media';
    }

    // External Referral Websites
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return 'Referral Links';
    }
  } catch (e) {
    // Malformed referrer URL fallback
  }

  return 'Others';
}

/**
 * Detects device category from user agent
 */
export function detectDeviceType(userAgent = '') {
  const ua = String(userAgent).toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini|webos/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Detects browser family from user agent
 */
export function detectBrowser(userAgent = '') {
  const ua = String(userAgent);
  if (/edg([ea]|ios)?\//i.test(ua)) return 'Edge';
  if (/opr\/|opera/i.test(ua)) return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung Internet';
  if (/ucbrowser/i.test(ua)) return 'UC Browser';
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return 'Safari';
  if (/msie|trident/i.test(ua)) return 'Internet Explorer';
  return 'Other';
}

/**
 * Detects operating system family from user agent
 */
export function detectOS(userAgent = '') {
  const ua = String(userAgent);
  if (/windows phone/i.test(ua)) return 'Windows Phone';
  if (/win(dows|98|me|nt|xp|7|8|10|11)/i.test(ua)) return 'Windows';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/mac(intosh| os x)/i.test(ua)) return 'macOS';
  if (/cros/i.test(ua)) return 'Chrome OS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

/**
 * Resolves visitor country from cloud deployment headers (Vercel, Cloudflare)
 */
export function extractCountry(headers = {}) {
  const rawCode = (
    headers['x-vercel-ip-country'] ||
    headers['cf-ipcountry'] ||
    headers['x-country-code'] ||
    ''
  ).toString().trim().toUpperCase();

  if (!rawCode || rawCode === 'XX' || rawCode === 'UNKNOWN') {
    const isLocal = !headers['x-vercel-ip-country'] && (
      headers.host?.includes('localhost') ||
      headers.host?.includes('127.0.0.1')
    );
    return {
      country: isLocal ? 'Local / Development' : 'Unknown',
      countryCode: isLocal ? 'LOCAL' : ''
    };
  }

  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const name = regionNames.of(rawCode) || rawCode;
    return {
      country: name,
      countryCode: rawCode
    };
  } catch (e) {
    return {
      country: rawCode,
      countryCode: rawCode
    };
  }
}

/**
 * Checks if user agent is an automated web crawler or bot
 */
export function isBotUserAgent(userAgent = '') {
  const ua = String(userAgent).toLowerCase();
  const botPatterns = [
    'bot', 'crawler', 'spider', 'headless', 'googlebot', 'bingbot',
    'yandex', 'slurp', 'duckduckbot', 'baiduspider', 'facebookexternalhit',
    'twitterbot', 'rogerbot', 'linkedinbot', 'embedly', 'quora link preview',
    'showyoubot', 'outbrain', 'pinterest', 'slackbot', 'vkshare',
    'w3c_validator', 'semrushbot', 'ahrefsbot', 'mj12bot', 'dotbot'
  ];
  return botPatterns.some((pattern) => ua.includes(pattern));
}

// 60-Second Real-Time Active Visitor Activity Window
export const ACTIVE_WINDOW_MS = 60 * 1000;

/**
 * Records an incoming visitor analytics event and updates sessions
 */
export async function recordAnalyticsEvent({
  visitorId,
  sessionId,
  path = '/',
  title = '',
  referrer = '',
  eventType = 'pageview',
  projectSlug = '',
  dwellSeconds = 0,
  userAgent = '',
  host = '',
  country = 'Unknown',
  countryCode = '',
  isAdmin = false,
  isDbConnected = false
}) {
  const cleanVisitorId = String(visitorId || '').trim();
  const cleanSessionId = String(sessionId || '').trim();

  if (!cleanVisitorId || !cleanSessionId) {
    return { success: false, reason: 'Missing visitorId or sessionId' };
  }

  const isBot = isBotUserAgent(userAgent);
  const deviceType = detectDeviceType(userAgent);
  const browser = detectBrowser(userAgent);
  const os = detectOS(userAgent);
  const trafficSource = classifyTrafficSource(referrer, host);
  const dwellNum = Math.min(Math.max(0, Number(dwellSeconds) || 0), 14400); // Max 4 hours

  const now = new Date();

  // If connected to MongoDB Atlas, store genuine first-party event
  if (isDbConnected) {
    try {
      // 1. Upsert Visitor Session
      let session = await VisitorSession.findOne({ sessionId: cleanSessionId });

      if (session) {
        session.lastActiveAt = now;
        if (isAdmin) {
          session.isAdmin = true;
        }
        if (eventType === 'pageview') {
          session.pageViewsCount = (session.pageViewsCount || 1) + 1;
        }
        if (dwellNum > 0) {
          session.durationSeconds = Math.max(session.durationSeconds || 0, dwellNum);
        }
        if ((!session.browser || session.browser === 'Unknown') && browser !== 'Unknown') {
          session.browser = browser;
        }
        if ((!session.os || session.os === 'Unknown') && os !== 'Unknown') {
          session.os = os;
        }
        if ((!session.country || session.country === 'Unknown') && country !== 'Unknown') {
          session.country = country;
          session.countryCode = countryCode;
        }
        await session.save();
      } else {
        session = await VisitorSession.create({
          sessionId: cleanSessionId,
          visitorId: cleanVisitorId,
          startedAt: now,
          lastActiveAt: now,
          durationSeconds: dwellNum,
          pageViewsCount: 1,
          entryPath: path,
          referrer,
          trafficSource,
          deviceType,
          browser,
          os,
          country,
          countryCode,
          isBot,
          isAdmin
        });
      }

      // 2. Insert Granular Analytics Event
      // High-frequency heartbeats only update the session's lastActiveAt to prevent Atlas database bloat
      if (eventType !== 'heartbeat') {
        await AnalyticsEvent.create({
          visitorId: cleanVisitorId,
          sessionId: cleanSessionId,
          eventType,
          path,
          title,
          referrer,
          trafficSource,
          projectSlug,
          dwellSeconds: dwellNum,
          deviceType,
          browser,
          os,
          country,
          countryCode,
          isBot,
          isAdmin,
          timestamp: now
        });
      }

      // 3. Fast-path summary update on Analytics model
      if (!isBot && !isAdmin) {
        const updateOps = {
          $inc: {
            pageViews: eventType === 'pageview' ? 1 : 0,
            projectViews: eventType === 'project_view' ? 1 : 0
          }
        };

        if (session.pageViewsCount === 1 && eventType === 'pageview') {
          updateOps.$inc.totalVisits = 1;
        }

        await Analytics.findOneAndUpdate({}, updateOps, { upsert: true });
      }

      return {
        success: true,
        sessionId: cleanSessionId,
        trafficSource,
        deviceType,
        browser,
        os,
        country
      };
    } catch (err) {
      console.warn('[Analytics Service] MongoDB save error:', err.message);
    }
  }

  // Local JSON Backup Fallback
  try {
    const db = getDb();
    db.analytics = db.analytics || {};
    if (eventType === 'pageview' && !isBot && !isAdmin) {
      db.analytics.totalVisits = (db.analytics.totalVisits || 0) + 1;
      db.analytics.pageViews = (db.analytics.pageViews || 0) + 1;
      saveDb(db);
    }
  } catch (e) {}

  return {
    success: true,
    sessionId: cleanSessionId,
    trafficSource,
    deviceType,
    browser,
    os,
    country
  };
}

/**
 * Fast lightweight endpoint helper for real-time active visitors polling
 */
export async function getActiveVisitorsCount(isDbConnected = false) {
  const now = new Date();
  const activeThreshold = new Date(now.getTime() - ACTIVE_WINDOW_MS);

  if (isDbConnected) {
    try {
      const baseFilter = {
        isBot: false,
        isAdmin: false,
        lastActiveAt: { $gte: activeThreshold }
      };

      const [activeVisitorsAgg, activeSessions] = await Promise.all([
        VisitorSession.distinct('visitorId', baseFilter),
        VisitorSession.countDocuments(baseFilter)
      ]);

      return {
        success: true,
        activeVisitors: activeVisitorsAgg ? activeVisitorsAgg.length : 0,
        activeSessions: activeSessions || 0,
        windowSeconds: 60,
        timestamp: now.toISOString()
      };
    } catch (err) {
      console.warn('[Analytics Service] Active visitors error:', err.message);
    }
  }

  return {
    success: true,
    activeVisitors: 0,
    activeSessions: 0,
    windowSeconds: 60,
    timestamp: now.toISOString()
  };
}

/**
 * Formats grouped breakdown into unified array with counts and percentages
 */
function formatBreakdown(items = [], total = 0, defaultPalette = []) {
  const result = [];
  let index = 0;

  for (const item of items) {
    if (!item._id) continue;
    const count = item.count || 0;
    const percentage = total > 0 ? Math.round((count / total) * 1000) / 10 : 0;
    const color = defaultPalette[index % defaultPalette.length] || '#D4A23A';

    result.push({
      label: String(item._id),
      count,
      percentage,
      color
    });
    index++;
  }

  // Sort descending by count
  result.sort((a, b) => b.count - a.count);
  return result;
}

/**
 * Generates an end-to-end aggregated analytics report for the Admin Dashboard
 */
export async function generateAnalyticsReport(range = '7d', isDbConnected = false) {
  const now = new Date();
  let startDate = new Date();
  let endDate = now;
  let groupByFormat = '%Y-%m-%d';
  let datePointsCount = 7;
  let isHourly = false;

  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayEnd = new Date(todayStart.getTime() - 1);
  const last7DaysStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30DaysStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  switch (range) {
    case 'today':
      startDate = todayStart;
      endDate = now;
      groupByFormat = '%Y-%m-%d %H:00';
      datePointsCount = 24;
      isHourly = true;
      break;
    case 'yesterday':
      startDate = yesterdayStart;
      endDate = yesterdayEnd;
      groupByFormat = '%Y-%m-%d %H:00';
      datePointsCount = 24;
      isHourly = true;
      break;
    case '30d':
      startDate = last30DaysStart;
      datePointsCount = 30;
      break;
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      datePointsCount = 90;
      break;
    case '7d':
    default:
      startDate = last7DaysStart;
      datePointsCount = 7;
      break;
  }

  // Strict 60-Second Real-Time Active Visitor Activity Window
  const activeThreshold = new Date(now.getTime() - ACTIVE_WINDOW_MS);

  if (isDbConnected) {
    try {
      const baseFilter = {
        isBot: false,
        isAdmin: false
      };

      const sessionDateFilter = {
        ...baseFilter,
        startedAt: { $gte: startDate, $lte: endDate }
      };

      const eventDateFilter = {
        ...baseFilter,
        timestamp: { $gte: startDate, $lte: endDate }
      };

      // Palette definitions for charts
      const palette = ['#D4A23A', '#38BDF8', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#6366F1', '#64748B'];

      // 1. Parallel Aggregation Queries
      const [
        allTimeSessionsCount,
        allTimeUniqueAgg,
        allTimePageViewsCount,
        rangeSessionsCount,
        rangeUniqueAgg,
        rangePageViewsCount,
        activeVisitorsAgg,
        activeSessionsCount,
        todayUniqueAgg,
        todaySessionsCount,
        todayPageViewsCount,
        yesterdayUniqueAgg,
        yesterdaySessionsCount,
        yesterdayPageViewsCount,
        last7dUniqueAgg,
        last7dSessionsCount,
        last30dUniqueAgg,
        last30dSessionsCount,
        avgDurationAgg,
        trafficSourcesAgg,
        devicesAgg,
        browsersAgg,
        osAgg,
        countriesAgg,
        timelineAgg,
        topPagesAgg,
        topProjectsAgg
      ] = await Promise.all([
        // All-Time Totals
        VisitorSession.countDocuments(baseFilter),
        VisitorSession.distinct('visitorId', baseFilter),
        AnalyticsEvent.countDocuments({ ...baseFilter, eventType: 'pageview' }),

        // Selected Range Counts
        VisitorSession.countDocuments(sessionDateFilter),
        VisitorSession.distinct('visitorId', sessionDateFilter),
        AnalyticsEvent.countDocuments({ ...eventDateFilter, eventType: 'pageview' }),

        // Active Visitors right now (last 60s activity window)
        VisitorSession.distinct('visitorId', { ...baseFilter, lastActiveAt: { $gte: activeThreshold } }),
        VisitorSession.countDocuments({ ...baseFilter, lastActiveAt: { $gte: activeThreshold } }),

        // Today benchmarks
        VisitorSession.distinct('visitorId', { ...baseFilter, startedAt: { $gte: todayStart } }),
        VisitorSession.countDocuments({ ...baseFilter, startedAt: { $gte: todayStart } }),
        AnalyticsEvent.countDocuments({ ...baseFilter, eventType: 'pageview', timestamp: { $gte: todayStart } }),

        // Yesterday benchmarks
        VisitorSession.distinct('visitorId', { ...baseFilter, startedAt: { $gte: yesterdayStart, $lte: yesterdayEnd } }),
        VisitorSession.countDocuments({ ...baseFilter, startedAt: { $gte: yesterdayStart, $lte: yesterdayEnd } }),
        AnalyticsEvent.countDocuments({ ...baseFilter, eventType: 'pageview', timestamp: { $gte: yesterdayStart, $lte: yesterdayEnd } }),

        // Last 7 Days benchmarks
        VisitorSession.distinct('visitorId', { ...baseFilter, startedAt: { $gte: last7DaysStart } }),
        VisitorSession.countDocuments({ ...baseFilter, startedAt: { $gte: last7DaysStart } }),

        // Last 30 Days benchmarks
        VisitorSession.distinct('visitorId', { ...baseFilter, startedAt: { $gte: last30DaysStart } }),
        VisitorSession.countDocuments({ ...baseFilter, startedAt: { $gte: last30DaysStart } }),

        // Average Duration in range
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: null, avgDuration: { $avg: '$durationSeconds' } } }
        ]),

        // Traffic Sources Breakdown
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: '$trafficSource', count: { $sum: 1 } } }
        ]),

        // Devices Breakdown
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: '$deviceType', count: { $sum: 1 } } }
        ]),

        // Browsers Breakdown
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: '$browser', count: { $sum: 1 } } }
        ]),

        // OS Breakdown
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: '$os', count: { $sum: 1 } } }
        ]),

        // Country Breakdown
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: '$country', count: { $sum: 1 } } }
        ]),

        // Timeline History
        AnalyticsEvent.aggregate([
          { $match: eventDateFilter },
          {
            $group: {
              _id: {
                $dateToString: { format: groupByFormat, date: '$timestamp', timezone: 'UTC' }
              },
              pageViews: {
                $sum: { $cond: [{ $eq: ['$eventType', 'pageview'] }, 1, 0] }
              },
              uniqueVisitors: { $addToSet: '$visitorId' }
            }
          },
          { $sort: { _id: 1 } }
        ]),

        // Top Visited Pages
        AnalyticsEvent.aggregate([
          { $match: { ...eventDateFilter, eventType: 'pageview' } },
          { $group: { _id: '$path', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 8 }
        ]),

        // Top Viewed Projects
        AnalyticsEvent.aggregate([
          {
            $match: {
              ...eventDateFilter,
              projectSlug: { $exists: true, $ne: '' }
            }
          },
          { $group: { _id: '$projectSlug', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 8 }
        ])
      ]);

      const totalVisitors = rangeSessionsCount || 0;
      const uniqueVisitors = rangeUniqueAgg ? rangeUniqueAgg.length : 0;
      const pageViews = rangePageViewsCount || 0;
      const avgSessionSeconds = Math.round(avgDurationAgg?.[0]?.avgDuration || 0);

      // 2. Format Categorical Breakdown Data
      const defaultTrafficCategories = [
        { label: 'Direct Visits', color: '#D4A23A', strokeColor: '#E6B65B' },
        { label: 'Google Search', color: '#3B82F6', strokeColor: '#60A5FA' },
        { label: 'Social Media', color: '#8B5CF6', strokeColor: '#A78BFA' },
        { label: 'Referral Links', color: '#06B6D4', strokeColor: '#38BDF8' },
        { label: 'Others', color: '#64748B', strokeColor: '#94A3B8' }
      ];

      const trafficCountsMap = {};
      (trafficSourcesAgg || []).forEach((item) => {
        if (item._id) trafficCountsMap[item._id] = item.count;
      });

      const trafficSources = defaultTrafficCategories.map((cat) => {
        const count = trafficCountsMap[cat.label] || 0;
        const percentage = totalVisitors > 0
          ? Math.round((count / totalVisitors) * 1000) / 10
          : 0;
        return {
          ...cat,
          count,
          percentage
        };
      });

      const devices = formatBreakdown(devicesAgg, totalVisitors, ['#D4A23A', '#38BDF8', '#8B5CF6']);
      const browsers = formatBreakdown(browsersAgg, totalVisitors, palette);
      const operatingSystems = formatBreakdown(osAgg, totalVisitors, palette);
      const countries = formatBreakdown(countriesAgg, totalVisitors, palette);

      // 3. Build Continuous Timeline Grid (Zero-fills gaps)
      const timelineMap = {};
      (timelineAgg || []).forEach((item) => {
        timelineMap[item._id] = {
          pageViews: item.pageViews || 0,
          uniqueVisitors: item.uniqueVisitors?.length || 0
        };
      });

      const chartHistory = [];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (isHourly) {
        // 24 Hour Slots
        const baseDate = range === 'yesterday' ? yesterdayStart : todayStart;
        const datePrefix = baseDate.toISOString().slice(0, 10);
        for (let h = 0; h < 24; h++) {
          const hourStr = String(h).padStart(2, '0');
          const key = `${datePrefix} ${hourStr}:00`;
          const entry = timelineMap[key] || { pageViews: 0, uniqueVisitors: 0 };
          chartHistory.push({
            date: `${hourStr}:00`,
            visits: entry.uniqueVisitors,
            pageViews: entry.pageViews,
            rawKey: key
          });
        }
      } else {
        // Daily Slots
        for (let i = datePointsCount - 1; i >= 0; i--) {
          const d = new Date();
          d.setUTCDate(now.getUTCDate() - i);
          const key = d.toISOString().slice(0, 10);
          const entry = timelineMap[key] || { pageViews: 0, uniqueVisitors: 0 };
          const label = `${monthNames[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, '0')}`;
          chartHistory.push({
            date: label,
            visits: entry.uniqueVisitors,
            pageViews: entry.pageViews,
            rawKey: key
          });
        }
      }

      return {
        success: true,
        range,
        summary: {
          // Range Specific
          totalVisitors,
          uniqueVisitors,
          pageViews,
          avgSessionSeconds,

          // Real-Time Active (60s Activity Window)
          activeVisitors: activeVisitorsAgg ? activeVisitorsAgg.length : 0,
          activeSessions: activeSessionsCount || 0,

          // All-Time Totals
          totalVisitsAllTime: allTimeSessionsCount || 0,
          uniqueVisitorsAllTime: allTimeUniqueAgg ? allTimeUniqueAgg.length : 0,
          pageViewsAllTime: allTimePageViewsCount || 0,

          // Benchmarks
          todayVisitors: todayUniqueAgg ? todayUniqueAgg.length : 0,
          todayVisits: todaySessionsCount || 0,
          todayPageViews: todayPageViewsCount || 0,
          yesterdayVisitors: yesterdayUniqueAgg ? yesterdayUniqueAgg.length : 0,
          yesterdayVisits: yesterdaySessionsCount || 0,
          yesterdayPageViews: yesterdayPageViewsCount || 0,
          last7DaysVisitors: last7dUniqueAgg ? last7dUniqueAgg.length : 0,
          last7DaysVisits: last7dSessionsCount || 0,
          last30DaysVisitors: last30dUniqueAgg ? last30dUniqueAgg.length : 0,
          last30DaysVisits: last30dSessionsCount || 0
        },
        chartHistory,
        trafficSources,
        devices,
        browsers,
        operatingSystems,
        countries,
        topPages: (topPagesAgg || []).map((p) => ({ path: p._id, views: p.count })),
        topProjects: (topProjectsAgg || []).map((p) => ({ project: p._id, views: p.count }))
      };
    } catch (err) {
      console.warn('[Analytics Service] Aggregation error:', err.message);
    }
  }

  // Backup Clean Empty Report Generator (No Fake Data)
  return {
    success: true,
    range,
    summary: {
      totalVisitors: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      avgSessionSeconds: 0,
      activeVisitors: 0,
      activeSessions: 0,
      totalVisitsAllTime: 0,
      uniqueVisitorsAllTime: 0,
      pageViewsAllTime: 0,
      todayVisitors: 0,
      todayVisits: 0,
      todayPageViews: 0,
      yesterdayVisitors: 0,
      yesterdayVisits: 0,
      yesterdayPageViews: 0,
      last7DaysVisitors: 0,
      last7DaysVisits: 0,
      last30DaysVisitors: 0,
      last30DaysVisits: 0
    },
    chartHistory: [],
    trafficSources: [
      { label: 'Direct Visits', count: 0, percentage: 0, color: '#D4A23A' },
      { label: 'Google Search', count: 0, percentage: 0, color: '#3B82F6' },
      { label: 'Social Media', count: 0, percentage: 0, color: '#8B5CF6' },
      { label: 'Referral Links', count: 0, percentage: 0, color: '#06B6D4' },
      { label: 'Others', count: 0, percentage: 0, color: '#64748B' }
    ],
    devices: [],
    browsers: [],
    operatingSystems: [],
    countries: [],
    topPages: [],
    topProjects: []
  };
}
