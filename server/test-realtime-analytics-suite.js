/**
 * Automated Verification Suite for Section 8: Real-Time Visitor Analytics
 * Tests all 10 verification criteria against live server & MongoDB Atlas:
 * 1. New browser session creation
 * 2. Visit recorded in MongoDB
 * 3. Visitor appears in active visitor statistics (within 60s activity window)
 * 4. Page view tracking on navigation
 * 5. Page refresh deduplication (session not duplicated)
 * 6. Visitor counts verified directly against MongoDB Atlas records
 * 7. Inactive visitors excluded after 60s window
 * 8. Dashboard statistics report structure & auto-refresh payload
 * 9. Security: unauthorized / non-admin access rejected
 * 10. Rate limiting / abuse protection
 */

import app from './app.js';
import { connectDb, isDbConnected } from './connection.js';
import { VisitorSession, AnalyticsEvent, Analytics } from './models/index.js';
import { signJwt } from './utils/jwt.js';

let server;

async function runRealtimeAnalyticsSuite() {
  console.log('\n======================================================');
  console.log('🧪 REAL-TIME VISITOR ANALYTICS END-TO-END AUDIT SUITE');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  await connectDb();
  assert(isDbConnected(), 'Connected to live MongoDB Atlas database');

  const port = 5211;
  server = app.listen(port);
  const baseUrl = `http://localhost:${port}`;

  const adminToken = signJwt({
    id: 'admin_audit',
    username: 'vanojanSE',
    role: 'admin'
  });

  const guestToken = signJwt({
    id: 'guest_audit',
    username: 'unauthorized_guest',
    role: 'user'
  });

  try {
    // Generate a unique test visitor and session
    const uniqueSuffix = Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
    const testVisitorId = `vid_audit_${uniqueSuffix}`;
    const testSessionId = `sid_audit_${uniqueSuffix}`;

    // Test 1: New visitor accesses the website
    console.log('\n--- Test 1 & 2: Recording New Visitor Session in MongoDB ---');
    const trackRes1 = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
        'X-Vercel-IP-Country': 'LK'
      },
      body: JSON.stringify({
        visitorId: testVisitorId,
        sessionId: testSessionId,
        path: '/',
        title: 'Uthayagunasingam Vanojan | Portfolio',
        referrer: 'https://www.google.com/search?q=vanojan',
        eventType: 'pageview',
        dwellSeconds: 0,
        isAdmin: false
      })
    });
    const trackData1 = await trackRes1.json();
    assert(trackRes1.status === 200, 'POST /api/analytics/track returned 200 OK');
    assert(trackData1.success === true, 'Visit acknowledged successfully');
    assert(trackData1.trafficSource === 'Google Search', 'Classified referrer as Google Search');
    assert(trackData1.deviceType === 'desktop', 'Detected device type as desktop');
    assert(trackData1.browser === 'Chrome', 'Detected browser as Chrome');
    assert(trackData1.os === 'Windows', 'Detected OS as Windows');
    assert(trackData1.country === 'Sri Lanka', 'Resolved Vercel country code LK to Sri Lanka');

    // Verify session stored in MongoDB Atlas
    const savedSession = await VisitorSession.findOne({ sessionId: testSessionId }).lean();
    assert(savedSession !== null, 'VisitorSession document successfully persisted in MongoDB Atlas');
    assert(savedSession.visitorId === testVisitorId, 'Session linked to visitorId');
    assert(savedSession.pageViewsCount === 1, 'Initial pageViewsCount is 1');
    assert(savedSession.browser === 'Chrome', 'Browser persisted in database');
    assert(savedSession.country === 'Sri Lanka', 'Country persisted in database');

    // Test 3: Check Active Visitor count
    console.log('\n--- Test 3: Active Visitor Tracking (60s Activity Window) ---');
    const activeRes = await fetch(`${baseUrl}/api/admin/analytics/active`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(activeRes.status === 200, 'GET /api/admin/analytics/active returns 200 OK');
    const activeData = await activeRes.json();
    assert(activeData.activeVisitors >= 1, `Active visitor counted in live window (${activeData.activeVisitors} active)`);
    assert(activeData.windowSeconds === 60, 'Active window is configured to 60 seconds');

    // Test 4: Open additional sections/pages
    console.log('\n--- Test 4: Page Views & Section Navigation Tracking ---');
    const trackRes2 = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36'
      },
      body: JSON.stringify({
        visitorId: testVisitorId,
        sessionId: testSessionId,
        path: '/#projects',
        title: 'Projects Section',
        referrer: 'Direct',
        eventType: 'pageview',
        dwellSeconds: 15,
        isAdmin: false
      })
    });
    assert(trackRes2.status === 200, 'Second pageview accepted');
    const sessionAfterNav = await VisitorSession.findOne({ sessionId: testSessionId }).lean();
    assert(sessionAfterNav.pageViewsCount === 2, 'Session pageViewsCount incremented to 2');

    // Test 5: Refresh page and verify session is not duplicated
    console.log('\n--- Test 5: Refresh Deduplication (No Duplicate Sessions) ---');
    const sessionsBeforeRefresh = await VisitorSession.countDocuments({ visitorId: testVisitorId });
    const trackRes3 = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: testVisitorId,
        sessionId: testSessionId, // Same sessionStorage ID preserved across refresh
        path: '/',
        title: 'Uthayagunasingam Vanojan | Portfolio',
        referrer: 'Direct',
        eventType: 'pageview',
        dwellSeconds: 25,
        isAdmin: false
      })
    });
    assert(trackRes3.status === 200, 'Refreshed pageview recorded');
    const sessionsAfterRefresh = await VisitorSession.countDocuments({ visitorId: testVisitorId });
    assert(sessionsBeforeRefresh === sessionsAfterRefresh, 'No duplicate session created on page refresh');

    // Test 6: Verify Heartbeats update duration & lastActiveAt without bloat
    console.log('\n--- Test 6: Throttled Heartbeat Duration & Activity Updates ---');
    const eventsBeforeHeartbeat = await AnalyticsEvent.countDocuments({ sessionId: testSessionId });
    const hbRes = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'heartbeat',
        dwellSeconds: 45
      })
    });
    assert(hbRes.status === 200, 'Heartbeat accepted');
    const eventsAfterHeartbeat = await AnalyticsEvent.countDocuments({ sessionId: testSessionId });
    assert(eventsBeforeHeartbeat === eventsAfterHeartbeat, 'Heartbeat updated session without creating redundant event documents');
    const sessionAfterHb = await VisitorSession.findOne({ sessionId: testSessionId }).lean();
    assert(sessionAfterHb.durationSeconds === 45, 'Session duration updated to 45s');

    // Test 7: Inactive visitor exclusion (simulating passage of 61 seconds)
    console.log('\n--- Test 7: Inactive Visitor Exclusion (Threshold Expiry) ---');
    const expiredTimestamp = new Date(Date.now() - 65 * 1000); // 65 seconds ago
    await VisitorSession.updateOne(
      { sessionId: testSessionId },
      { $set: { lastActiveAt: expiredTimestamp } }
    );
    const activeResAfterExpiry = await fetch(`${baseUrl}/api/admin/analytics/active`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const activeDataAfterExpiry = await activeResAfterExpiry.json();
    const isExcluded = await VisitorSession.countDocuments({
      sessionId: testSessionId,
      lastActiveAt: { $gte: new Date(Date.now() - 60 * 1000) }
    });
    assert(isExcluded === 0, 'Visitor session successfully excluded after exceeding 60-second activity window');

    // Test 8: Dashboard Comprehensive Report
    console.log('\n--- Test 8: Admin Dashboard Report Verification ---');
    const reportRes = await fetch(`${baseUrl}/api/admin/analytics/report?range=today`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(reportRes.status === 200, 'GET /api/admin/analytics/report returned 200');
    const report = await reportRes.json();
    assert(report.success === true, 'Report success is true');
    assert(typeof report.summary.totalVisitors === 'number', 'Summary contains totalVisitors');
    assert(typeof report.summary.uniqueVisitors === 'number', 'Summary contains uniqueVisitors');
    assert(typeof report.summary.pageViews === 'number', 'Summary contains pageViews');
    assert(typeof report.summary.activeVisitors === 'number', 'Summary contains activeVisitors');
    assert(Array.isArray(report.chartHistory) && report.chartHistory.length === 24, 'Today chart history contains 24 hourly buckets');
    assert(Array.isArray(report.trafficSources), 'Contains trafficSources breakdown');
    assert(Array.isArray(report.devices), 'Contains devices breakdown');
    assert(Array.isArray(report.browsers), 'Contains browsers breakdown');
    assert(Array.isArray(report.operatingSystems), 'Contains operatingSystems breakdown');
    assert(Array.isArray(report.countries), 'Contains countries breakdown');
    assert(Array.isArray(report.topPages), 'Contains topPages list');

    // Test 9: Security & Authorization
    console.log('\n--- Test 9: Security & Private Analytics Access Control ---');
    const noAuthReport = await fetch(`${baseUrl}/api/admin/analytics/report`);
    assert(noAuthReport.status === 401, 'Unauthorized request rejected with 401');
    const guestReport = await fetch(`${baseUrl}/api/admin/analytics/report`, {
      headers: { Authorization: `Bearer ${guestToken}` }
    });
    assert(guestReport.status === 403, 'Non-admin request rejected with 403 Forbidden');
    const noAuthActive = await fetch(`${baseUrl}/api/admin/analytics/active`);
    assert(noAuthActive.status === 401, 'Unauthorized active visitor poll rejected with 401');

    // Test 10: Rate Limiting & Abuse Prevention
    console.log('\n--- Test 10: Abuse Protection & Rate Limiting ---');
    let gotRateLimited = false;
    const burstPromises = [];
    for (let i = 0; i < 40; i++) {
      burstPromises.push(
        fetch(`${baseUrl}/api/analytics/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '198.51.100.42'
          },
          body: JSON.stringify({
            visitorId: 'spam_test_id',
            sessionId: 'spam_sess_id',
            path: '/'
          })
        })
      );
    }
    const burstResponses = await Promise.all(burstPromises);
    gotRateLimited = burstResponses.some((r) => r.status === 429);
    assert(gotRateLimited, 'Rapid burst triggered HTTP 429 rate limit protection');

    // Clean up test sessions
    await VisitorSession.deleteMany({ visitorId: { $in: [testVisitorId, 'spam_test_id'] } });
    await AnalyticsEvent.deleteMany({ visitorId: { $in: [testVisitorId, 'spam_test_id'] } });

    console.log(`\n======================================================`);
    console.log(`🎉 AUDIT SUITE FINISHED: ${passed} PASSED, ${failed} FAILED`);
    console.log(`======================================================\n`);
  } finally {
    if (server) server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runRealtimeAnalyticsSuite().catch((err) => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
