import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const baseUrl = `http://localhost:${process.env.PORT || 5000}`;

async function runHeroAboutTests() {
  console.log('--- STARTING HERO & ABOUT ADMIN INTEGRATION TEST SUITE ---');

  // 1. Login as Admin
  console.log('\n1. Logging in as Administrator...');
  const loginRes = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'vanojanSE',
      password: process.env.ADMIN_PASSWORD || 'vanojan2026'
    })
  });
  const loginData = await loginRes.json();
  assert(loginRes.ok, `Login failed: ${JSON.stringify(loginData)}`);
  const token = loginData.token;
  console.log('✓ Admin login successful. Token acquired.');

  // 2. GET /api/portfolio
  console.log('\n2. Fetching public /api/portfolio...');
  const portfolioRes = await fetch(`${baseUrl}/api/portfolio`);
  assert(portfolioRes.ok, 'Failed to fetch /api/portfolio');
  const portfolioData = await portfolioRes.json();
  assert(portfolioData.profile, 'Portfolio missing profile object');
  console.log('✓ /api/portfolio returned 200 OK');
  console.log('  Hero Title Prefix:', portfolioData.profile.heroTitlePrefix);
  console.log('  Hero Highlight:', portfolioData.profile.heroTitleHighlight);
  console.log('  Hero Metrics count:', portfolioData.profile.metrics?.length);
  console.log('  About Heading Prefix:', portfolioData.profile.aboutHeadingPrefix);
  console.log('  Journey Pillars count:', portfolioData.profile.journeyPillars?.length);

  // 3. Test Editing Hero Card Title & Saving via Admin API
  console.log('\n3. Testing Hero Card Title update via PUT /api/admin/profile...');
  const originalTitleHighlight = portfolioData.profile.heroTitleHighlight || 'Precision.';
  const testTitleHighlight = 'Precision & Excellence.';

  const updateHeroRes = await fetch(`${baseUrl}/api/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      heroTitleHighlight: testTitleHighlight
    })
  });
  const updateHeroData = await updateHeroRes.json();
  assert(updateHeroRes.ok, 'PUT /api/admin/profile failed for heroTitleHighlight');
  assert(updateHeroData.success === true, 'Update did not return success: true');
  console.log('✓ Hero title highlight updated successfully in MongoDB Atlas.');

  // 4. Verify Homepage /api/portfolio immediately reflects the updated Hero title
  console.log('\n4. Verifying Homepage /api/portfolio reflects updated Hero title...');
  const verifyHeroRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const verifyHeroData = await verifyHeroRes.json();
  assert.strictEqual(verifyHeroData.profile.heroTitleHighlight, testTitleHighlight, 'Homepage did not reflect updated Hero title!');
  console.log(`✓ Homepage Hero title verified: "${verifyHeroData.profile.heroTitleHighlight}"`);

  // 5. Test Editing Hero Card Description / Tagline & Saving
  console.log('\n5. Testing Hero Tagline update...');
  const testTagline = 'Senior Graduate Software Engineer designing scalable cloud platforms, robust distributed backends, and cinematic user experiences.';
  const updateTaglineRes = await fetch(`${baseUrl}/api/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ tagline: testTagline })
  });
  assert(updateTaglineRes.ok, 'PUT /api/admin/profile failed for tagline');
  const verifyTaglineRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const verifyTaglineData = await verifyTaglineRes.json();
  assert.strictEqual(verifyTaglineData.profile.tagline, testTagline, 'Homepage did not reflect updated tagline!');
  console.log(`✓ Homepage Hero tagline verified: "${verifyTaglineData.profile.tagline.slice(0, 40)}..."`);

  // 6. Test Editing About Card Content (Heading & Journey Pillars)
  console.log('\n6. Testing About Section & Card updates (Heading & Pillars)...');
  const testAboutHighlight = 'Enterprise Grade Architectural Software.';
  const updatedPillars = [
    { title: 'Algorithmic Rigour', desc: 'Deconstructing complex engineering problems with high-efficiency data structures.', icon: 'Cpu' },
    { title: 'Clean Architecture', desc: 'Building resilient microservices, normalized databases, and scalable distributed patterns.', icon: 'Layers' },
    { title: 'User Focused', desc: 'Crafting intuitive, accessible, and high-performance digital experiences with cinematic aesthetics.', icon: 'Users' }
  ];

  const updateAboutRes = await fetch(`${baseUrl}/api/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      aboutHeadingHighlight: testAboutHighlight,
      journeyPillars: updatedPillars
    })
  });
  assert(updateAboutRes.ok, 'PUT /api/admin/profile failed for About section');
  const verifyAboutRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const verifyAboutData = await verifyAboutRes.json();
  assert.strictEqual(verifyAboutData.profile.aboutHeadingHighlight, testAboutHighlight, 'About heading highlight not reflected!');
  assert.strictEqual(verifyAboutData.profile.journeyPillars[0].title, 'Algorithmic Rigour', 'Journey pillar 1 title not reflected!');
  console.log(`✓ Homepage About heading verified: "${verifyAboutData.profile.aboutHeadingHighlight}"`);
  console.log(`✓ Homepage About Journey Pillar 1 verified: "${verifyAboutData.profile.journeyPillars[0].title}"`);

  // 7. Test Editing 4 Stat Metric Cards (Synchronized across Hero & About)
  console.log('\n7. Testing Metric Cards update...');
  const updatedMetrics = [
    { label: 'Degree Programme', value: 'BSc (Hons)', icon: 'GraduationCap' },
    { label: 'Academic Status', value: 'Coursework Complete', icon: 'Clock' },
    { label: 'Featured Systems', value: '9 Production Apps', icon: 'Layers' },
    { label: 'Higher Diploma', value: 'HND Graduate', icon: 'Award' }
  ];
  const updateMetricsRes = await fetch(`${baseUrl}/api/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ metrics: updatedMetrics })
  });
  assert(updateMetricsRes.ok, 'PUT /api/admin/profile failed for metrics');
  const verifyMetricsRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const verifyMetricsData = await verifyMetricsRes.json();
  assert.strictEqual(verifyMetricsData.profile.metrics[1].value, 'Coursework Complete', 'Metrics status value not updated!');
  assert.strictEqual(verifyMetricsData.profile.metrics[2].value, '9 Production Apps', 'Metrics systems value not updated!');
  console.log('✓ Metric Cards synchronized and verified across Homepage.');

  // 8. Revert to original verified values for production cleanliness
  console.log('\n8. Reverting test edits back to original verified profile content...');
  const revertRes = await fetch(`${baseUrl}/api/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      heroTitleHighlight: originalTitleHighlight,
      tagline: 'Motivated Software Engineering graduate candidate skilled in React.js, Node.js, Java, Python, and SQL, engineering high-performance applications.',
      aboutHeadingHighlight: 'Ideas into Scalable Real Solutions.',
      journeyPillars: [
        { title: 'Problem Solving', desc: 'Deconstructing complex enterprise challenges into clean, modular, and maintainable logic.', icon: 'Cpu' },
        { title: 'Clean Architecture', desc: 'Building resilient microservices, normalized databases, and scalable distributed patterns.', icon: 'Layers' },
        { title: 'User Focused', desc: 'Crafting intuitive, accessible, and high-performance digital experiences with cinematic aesthetics.', icon: 'Users' }
      ],
      metrics: [
        { label: 'Degree Programme', value: 'BSc (Hons)', icon: 'GraduationCap' },
        { label: 'Academic Status', value: 'Results Pending', icon: 'Clock' },
        { label: 'Featured Systems', value: '9 Projects', icon: 'Layers' },
        { label: 'Higher Diploma', value: 'HND Graduate', icon: 'Award' }
      ]
    })
  });
  assert(revertRes.ok, 'Reverting profile failed');
  const finalCheckRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const finalCheckData = await finalCheckRes.json();
  assert.strictEqual(finalCheckData.profile.heroTitleHighlight, 'Precision.');
  assert.strictEqual(finalCheckData.profile.metrics[1].value, 'Results Pending');
  assert.strictEqual(finalCheckData.profile.journeyPillars[0].title, 'Problem Solving');
  console.log('✓ Successfully verified persistence and cleanly restored canonical CV data.');

  console.log('\n>>> ALL 8 INTEGRATION TESTS PASSED WITH 100% SUCCESS! <<<');
}

runHeroAboutTests().catch(err => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
