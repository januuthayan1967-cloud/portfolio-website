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
        if (eventType === 'pageview') {
          session.pageViewsCount = (session.pageViewsCount || 1) + 1;
        }
        if (dwellNum > 0) {
          session.durationSeconds = Math.max(session.durationSeconds || 0, dwellNum);
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
          isBot,
          isAdmin
        });
      }

      // 2. Insert Granular Analytics Event
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
        isBot,
        isAdmin,
        timestamp: now
      });

      // 3. Fast-path summary update on Analytics model
      if (!isBot && !isAdmin) {
        const updateOps = {
          $inc: {
            pageViews: eventType === 'pageview' ? 1 : 0,
            projectViews: eventType === 'project_view' ? 1 : 0
          }
        };

        // If newly created session, increment totalVisits
        if (session.pageViewsCount === 1 && eventType === 'pageview') {
          updateOps.$inc.totalVisits = 1;
        }

        await Analytics.findOneAndUpdate({}, updateOps, { upsert: true });
      }

      return { success: true, sessionId: cleanSessionId, trafficSource };
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

  return { success: true, sessionId: cleanSessionId, trafficSource };
}

/**
 * Generates an end-to-end aggregated analytics report for the Admin Dashboard
 */
export async function generateAnalyticsReport(range = '7d', isDbConnected = false) {
  const now = new Date();
  let startDate = new Date();
  let groupByFormat = '%Y-%m-%d';
  let datePointsCount = 7;

  switch (range) {
    case 'today':
      startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
      groupByFormat = '%Y-%m-%d %H:00';
      datePointsCount = 24;
      break;
    case '30d':
      startDate.setUTCDate(now.getUTCDate() - 30);
      datePointsCount = 30;
      break;
    case '90d':
      startDate.setUTCDate(now.getUTCDate() - 90);
      datePointsCount = 90;
      break;
    case '7d':
    default:
      startDate.setUTCDate(now.getUTCDate() - 7);
      datePointsCount = 7;
      break;
  }

  // Active visitor threshold: 15 minutes
  const activeThreshold = new Date(now.getTime() - 15 * 60 * 1000);

  if (isDbConnected) {
    try {
      const baseFilter = {
        isBot: false,
        isAdmin: false
      };

      const sessionDateFilter = {
        ...baseFilter,
        startedAt: { $gte: startDate }
      };

      const eventDateFilter = {
        ...baseFilter,
        timestamp: { $gte: startDate }
      };

      // 1. Parallel Aggregation Queries
      const [
        totalSessionsCount,
        uniqueVisitorsAgg,
        totalPageViewsCount,
        activeVisitorsCount,
        avgDurationAgg,
        trafficSourcesAgg,
        timelineAgg,
        topPagesAgg,
        topProjectsAgg
      ] = await Promise.all([
        // Total Sessions / Visits in Range
        VisitorSession.countDocuments(sessionDateFilter),

        // Distinct Unique Visitors
        VisitorSession.distinct('visitorId', sessionDateFilter),

        // Total Page Views in Range
        AnalyticsEvent.countDocuments({ ...eventDateFilter, eventType: 'pageview' }),

        // Currently Active Visitors (within last 15 mins)
        VisitorSession.countDocuments({
          ...baseFilter,
          lastActiveAt: { $gte: activeThreshold }
        }),

        // Average Duration
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: null, avgDuration: { $avg: '$durationSeconds' } } }
        ]),

        // Traffic Sources Breakdown
        VisitorSession.aggregate([
          { $match: sessionDateFilter },
          { $group: { _id: '$trafficSource', count: { $sum: 1 } } }
        ]),

        // Timeline History
        AnalyticsEvent.aggregate([
          { $match: eventDateFilter },
          {
            $group: {
              _id: {
                $dateToString: { format: groupByFormat, date: '$timestamp', timezone: 'UTC' }
              },
              pageViews: { $sum: 1 },
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
          { $limit: 5 }
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
          { $limit: 5 }
        ])
      ]);

      const totalVisitors = totalSessionsCount || 0;
      const uniqueVisitors = uniqueVisitorsAgg ? uniqueVisitorsAgg.length : 0;
      const pageViews = totalPageViewsCount || 0;
      const avgSessionSeconds = Math.round(avgDurationAgg?.[0]?.avgDuration || 0);

      // 2. Format Traffic Sources with Genuine Percentages
      const defaultCategories = [
        { label: 'Direct Visits', color: '#D4A23A', strokeColor: '#E6B65B' },
        { label: 'Google Search', color: '#3B82F6', strokeColor: '#60A5FA' },
        { label: 'Social Media', color: '#8B5CF6', strokeColor: '#A78BFA' },
        { label: 'Referral Links', color: '#06B6D4', strokeColor: '#38BDF8' },
        { label: 'Others', color: '#64748B', strokeColor: '#94A3B8' }
      ];

      const countsMap = {};
      (trafficSourcesAgg || []).forEach((item) => {
        if (item._id) countsMap[item._id] = item.count;
      });

      const trafficSources = defaultCategories.map((cat) => {
        const count = countsMap[cat.label] || 0;
        const percentage = totalVisitors > 0
          ? Math.round((count / totalVisitors) * 1000) / 10
          : 0;
        return {
          ...cat,
          count,
          percentage
        };
      });

      // 3. Build Continuous Timeline Grid (Fills in dates with 0 if no visits)
      const timelineMap = {};
      (timelineAgg || []).forEach((item) => {
        timelineMap[item._id] = {
          pageViews: item.pageViews || 0,
          uniqueVisitors: item.uniqueVisitors?.length || 0
        };
      });

      const chartHistory = [];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (range === 'today') {
        // 24 Hour Slots
        for (let h = 0; h < 24; h++) {
          const hourStr = String(h).padStart(2, '0');
          const key = `${startDate.toISOString().slice(0, 10)} ${hourStr}:00`;
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
          totalVisitors,
          uniqueVisitors,
          pageViews,
          avgSessionSeconds,
          activeVisitors: activeVisitorsCount || 0
        },
        chartHistory,
        trafficSources,
        topPages: (topPagesAgg || []).map((p) => ({ path: p._id, views: p.count })),
        topProjects: (topProjectsAgg || []).map((p) => ({ project: p._id, views: p.count }))
      };
    } catch (err) {
      console.warn('[Analytics Service] Aggregation error:', err.message);
    }
  }

  // Backup Local Report Generator
  const db = getDb();
  const dbAnalytics = db.analytics || {};
  return {
    success: true,
    range,
    summary: {
      totalVisitors: dbAnalytics.totalVisits || 0,
      uniqueVisitors: dbAnalytics.uniqueVisitors || 0,
      pageViews: dbAnalytics.pageViews || 0,
      avgSessionSeconds: dbAnalytics.avgSessionSeconds || 0,
      activeVisitors: 0
    },
    chartHistory: [
      { date: 'Day 1', visits: 0, pageViews: 0 },
      { date: 'Day 2', visits: 0, pageViews: 0 },
      { date: 'Day 3', visits: 0, pageViews: 0 },
      { date: 'Day 4', visits: 0, pageViews: 0 },
      { date: 'Day 5', visits: 0, pageViews: 0 },
      { date: 'Day 6', visits: 0, pageViews: 0 },
      { date: 'Day 7', visits: 0, pageViews: 0 }
    ],
    trafficSources: [
      { label: 'Direct Visits', count: 0, percentage: 0, color: '#D4A23A' },
      { label: 'Google Search', count: 0, percentage: 0, color: '#3B82F6' },
      { label: 'Social Media', count: 0, percentage: 0, color: '#8B5CF6' },
      { label: 'Referral Links', count: 0, percentage: 0, color: '#06B6D4' },
      { label: 'Others', count: 0, percentage: 0, color: '#64748B' }
    ],
    topPages: [],
    topProjects: []
  };
}
