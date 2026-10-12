/**
 * HTTP Integration Test for newly introduced Analytics and Avatar endpoints
 */

import app from './app.js';
import { connectDb } from './connection.js';
import { signJwt } from './utils/jwt.js';

let server;

async function runHttpTests() {
  console.log('\n--- Running HTTP Integration Tests ---');
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

  const port = 5199;
  server = app.listen(port);
  const baseUrl = `http://localhost:${port}`;

  const adminToken = signJwt({
    id: 'admin_1',
    username: 'vanojanSE',
    role: 'admin'
  });

  const guestToken = signJwt({
    id: 'user_1',
    username: 'guest_user',
    role: 'user'
  });

  try {
    // 1. POST /api/analytics/track (Public Tracking)
    const trackRes = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: `http_test_vid_${Date.now()}`,
        sessionId: `http_test_sid_${Date.now()}`,
        path: '/#projects',
        title: 'Projects Showcase',
        referrer: 'https://www.google.com/',
        eventType: 'pageview',
        dwellSeconds: 15,
        isAdmin: false
      })
    });
    const trackData = await trackRes.json();
    assert(trackRes.status === 200, 'POST /api/analytics/track returns 200 OK');
    assert(trackData.success === true, 'POST /api/analytics/track returns success: true');
    assert(trackData.trafficSource === 'Google Search', 'POST /api/analytics/track returns trafficSource');

    // 2. GET /api/admin/analytics/report security
    const reportNoAuth = await fetch(`${baseUrl}/api/admin/analytics/report?range=7d`);
    assert(reportNoAuth.status === 401, 'GET /api/admin/analytics/report without auth returns 401 Unauthorized');

    const reportGuest = await fetch(`${baseUrl}/api/admin/analytics/report?range=7d`, {
      headers: { Authorization: `Bearer ${guestToken}` }
    });
    assert(reportGuest.status === 403, 'GET /api/admin/analytics/report with non-admin token returns 403 Forbidden');

    const reportAdmin = await fetch(`${baseUrl}/api/admin/analytics/report?range=7d`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(reportAdmin.status === 200, 'GET /api/admin/analytics/report with admin token returns 200 OK');
    const reportData = await reportAdmin.json();
    assert(reportData.success === true, 'Admin report returns success: true');
    assert(reportData.range === '7d', 'Admin report returns requested range');
    assert(Array.isArray(reportData.chartHistory), 'Admin report returns chartHistory array');
    assert(Array.isArray(reportData.trafficSources), 'Admin report returns trafficSources array');

    // 3. GET /api/admin/profile/avatar
    const avatarNoAuth = await fetch(`${baseUrl}/api/admin/profile/avatar`);
    assert(avatarNoAuth.status === 401, 'GET /api/admin/profile/avatar without auth returns 401 Unauthorized');

    const avatarAdmin = await fetch(`${baseUrl}/api/admin/profile/avatar`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(avatarAdmin.status === 200, 'GET /api/admin/profile/avatar with admin token returns 200 OK');
    const avatarData = await avatarAdmin.json();
    assert(avatarData.success === true, 'GET /api/admin/profile/avatar returns success: true');
    assert(avatarData.username === 'vanojanSE', 'GET /api/admin/profile/avatar returns admin username');

    // 4. DELETE /api/admin/profile/avatar
    const deleteNoAuth = await fetch(`${baseUrl}/api/admin/profile/avatar`, {
      method: 'DELETE'
    });
    assert(deleteNoAuth.status === 401, 'DELETE /api/admin/profile/avatar without auth returns 401 Unauthorized');

    const deleteAdmin = await fetch(`${baseUrl}/api/admin/profile/avatar`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(deleteAdmin.status === 200, 'DELETE /api/admin/profile/avatar with admin token returns 200 OK');
    const deleteData = await deleteAdmin.json();
    assert(deleteData.success === true, 'DELETE /api/admin/profile/avatar confirms removal');

    console.log(`\n🎉 HTTP ENDPOINT TESTS: ${passed} PASSED, ${failed} FAILED\n`);
  } finally {
    if (server) server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runHttpTests().catch((err) => {
  console.error('HTTP test error:', err);
  process.exit(1);
});
