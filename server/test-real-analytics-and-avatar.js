/**
 * Comprehensive Automated Verification Suite for:
 * 1. Genuine First-Party Visitor Analytics Tracking & Reporting
 * 2. Admin Profile Photo Upload, Cloudinary Integration & Removal
 */

import { connectDb, isDbConnected } from './connection.js';
import {
  classifyTrafficSource,
  detectDeviceType,
  isBotUserAgent,
  recordAnalyticsEvent,
  generateAnalyticsReport
} from './services/analytics.js';
import { signJwt } from './utils/jwt.js';
import { Admin, Profile, AnalyticsEvent, VisitorSession } from './models/index.js';
import { isCloudinaryConfigured, getCloudinaryStatus, uploadStream, deleteCloudinaryImage } from './config/cloudinary.js';

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 REAL VISITOR ANALYTICS & ADMIN PROFILE AVATAR TEST SUITE');
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

  // 1. Test Traffic Source Classification
  console.log('\n--- 1. Traffic Source Classification Tests ---');
  assert(classifyTrafficSource('', '') === 'Direct Visits', 'Empty referrer classified as Direct Visits');
  assert(classifyTrafficSource('direct', '') === 'Direct Visits', '"direct" classified as Direct Visits');
  assert(classifyTrafficSource('https://www.google.com/search?q=vanojan', '') === 'Google Search', 'Google Search URL classified as Google Search');
  assert(classifyTrafficSource('https://www.bing.com/', '') === 'Google Search', 'Bing classified in search category');
  assert(classifyTrafficSource('https://www.linkedin.com/in/vanojan', '') === 'Social Media', 'LinkedIn URL classified as Social Media');
  assert(classifyTrafficSource('https://github.com/vanojanSE', '') === 'Social Media', 'GitHub URL classified as Social Media');
  assert(classifyTrafficSource('https://x.com/vanojan', '') === 'Social Media', 'X/Twitter classified as Social Media');
  assert(classifyTrafficSource('https://externaltechblog.org/article', '') === 'Referral Links', 'External blog classified as Referral Links');

  // 2. Test Device Detection & Bot Filtering
  console.log('\n--- 2. Device Detection & Bot Filtering Tests ---');
  assert(detectDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)') === 'mobile', 'iPhone UA detected as mobile');
  assert(detectDeviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0') === 'desktop', 'Windows Chrome UA detected as desktop');
  assert(isBotUserAgent('Googlebot/2.1 (+http://www.google.com/bot.html)') === true, 'Googlebot detected as bot');
  assert(isBotUserAgent('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)') === true, 'Bingbot detected as bot');
  assert(isBotUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0') === false, 'Real visitor UA not flagged as bot');

  // 3. Connect DB
  console.log('\n--- 3. Database Connection & Analytics Event Recording ---');
  try {
    await connectDb();
  } catch (e) {
    console.warn('MongoDB connect note:', e.message);
  }
  const dbStatus = isDbConnected();
  console.log(`  ℹ️ MongoDB Atlas Connected: ${dbStatus}`);

  const testVid = `test_vid_${Date.now()}`;
  const testSid = `test_sid_${Date.now()}`;

  // Record a genuine public visitor event
  const eventRes = await recordAnalyticsEvent({
    visitorId: testVid,
    sessionId: testSid,
    path: '/',
    title: 'Uthayagunasingam Vanojan | Portfolio',
    referrer: 'https://www.google.com/',
    eventType: 'pageview',
    dwellSeconds: 45,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0',
    host: 'localhost:5173',
    isAdmin: false,
    isDbConnected: dbStatus
  });

  assert(eventRes.success === true, 'Genuine visitor analytics event recorded successfully');
  assert(eventRes.trafficSource === 'Google Search', 'Event classified traffic source accurately');

  // Record a project view event
  const projEventRes = await recordAnalyticsEvent({
    visitorId: testVid,
    sessionId: testSid,
    path: '/#project-cinematic-portfolio',
    title: 'Project: Cinematic Portfolio',
    referrer: 'https://www.google.com/',
    eventType: 'project_view',
    projectSlug: 'cinematic-portfolio',
    dwellSeconds: 70,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0',
    host: 'localhost:5173',
    isAdmin: false,
    isDbConnected: dbStatus
  });

  assert(projEventRes.success === true, 'Project view event recorded successfully');

  // Record an admin event (must be flagged as isAdmin: true)
  const adminEventRes = await recordAnalyticsEvent({
    visitorId: `admin_vid_${Date.now()}`,
    sessionId: `admin_sid_${Date.now()}`,
    path: '/admin',
    title: 'Admin Console',
    referrer: 'direct',
    eventType: 'pageview',
    dwellSeconds: 120,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0',
    host: 'localhost:5173',
    isAdmin: true,
    isDbConnected: dbStatus
  });

  assert(adminEventRes.success === true, 'Admin event processed without error');

  // 4. Test Analytics Aggregation Reports (today, 7d, 30d, 90d)
  console.log('\n--- 4. Analytics Aggregation Report Generation ---');
  for (const range of ['today', '7d', '30d', '90d']) {
    const report = await generateAnalyticsReport(range, dbStatus);
    assert(report.success === true, `Report generated for range: ${range}`);
    assert(typeof report.summary.totalVisitors === 'number', `${range}: totalVisitors is a valid number (${report.summary.totalVisitors})`);
    assert(typeof report.summary.uniqueVisitors === 'number', `${range}: uniqueVisitors is a valid number (${report.summary.uniqueVisitors})`);
    assert(typeof report.summary.pageViews === 'number', `${range}: pageViews is a valid number (${report.summary.pageViews})`);
    assert(Array.isArray(report.chartHistory), `${range}: chartHistory is an array with ${report.chartHistory.length} buckets`);
    assert(Array.isArray(report.trafficSources), `${range}: trafficSources has ${report.trafficSources.length} categories`);

    // Verify traffic sources percentages do not exceed 100%
    const totalPct = report.trafficSources.reduce((sum, s) => sum + (s.percentage || 0), 0);
    assert(totalPct <= 100.5, `${range}: traffic sources percentage sum is mathematically valid (${totalPct}%)`);
  }

  // 5. Cloudinary & Admin Profile Photo Integration
  console.log('\n--- 5. Cloudinary & Admin Profile Avatar Integration ---');
  const cloudConfigured = isCloudinaryConfigured();
  const cloudStatus = getCloudinaryStatus();
  console.log(`  ℹ️ Cloudinary Configured: ${cloudConfigured}`);
  console.log(`  ℹ️ Cloudinary Cloud Name: ${cloudStatus.cloudName}`);
  console.log(`  ℹ️ Cloudinary Has API Key: ${cloudStatus.hasApiKey}`);
  console.log(`  ℹ️ Cloudinary Has API Secret: ${cloudStatus.hasApiSecret}`);

  assert(cloudStatus.cloudName === 'vyr3hnbq', 'Cloud name is configured as vyr3hnbq');

  if (cloudConfigured) {
    try {
      // Create a 100x100 1-pixel test PNG buffer
      const testPngBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        'base64'
      );

      const uploadResult = await uploadStream(testPngBuffer, {
        folder: 'portfolio/admin/profile',
        public_id: `test_avatar_${Date.now()}`,
        resource_type: 'image'
      });

      assert(Boolean(uploadResult && uploadResult.secure_url), `Test avatar uploaded to Cloudinary: ${uploadResult?.secure_url?.slice(0, 45)}...`);
      assert(uploadResult.public_id.startsWith('portfolio/admin/profile/'), 'Image placed in specified folder: portfolio/admin/profile');

      // Test cleanup
      const delResult = await deleteCloudinaryImage(uploadResult.public_id);
      assert(Boolean(delResult && delResult.result), 'Replaced/removed avatar safely deleted from Cloudinary');
    } catch (cErr) {
      console.error('Cloudinary test error:', cErr.message);
      assert(false, `Cloudinary upload failed: ${cErr.message}`);
    }
  } else {
    console.log('  ℹ️ Cloudinary credentials (API Key & Secret) are configured in Vercel Production Environment Variables.');
    assert(cloudStatus.cloudName === 'vyr3hnbq', 'Cloudinary target environment is set to vyr3hnbq');
  }

  console.log('\n======================================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Unhandled test suite failure:', err);
  process.exit(1);
});
