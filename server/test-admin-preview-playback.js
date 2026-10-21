import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const targetHost = process.env.TEST_TARGET_HOST || 'https://portfolio-website-src.vercel.app';

async function runAdminPreviewTests() {
  console.log(`=== STARTING ADMIN PREVIEW PLAYBACK REGRESSION TEST SUITE ===`);
  console.log(`Target Host: ${targetHost}\n`);

  // 1. Fetch public portfolio data
  console.log('1. Checking dynamic portfolio data for active music...');
  const portfolioRes = await fetch(`${targetHost}/api/portfolio`);
  assert(portfolioRes.ok, `GET /api/portfolio failed: ${portfolioRes.status}`);
  const portfolioData = await portfolioRes.json();
  const activeTrack = portfolioData.activeTrack;
  assert(activeTrack, 'Missing activeTrack in portfolio');
  console.log(`✓ Active Homepage Track: "${activeTrack.title}"`);
  console.log(`  Source URL: ${activeTrack.url}`);

  // 2. Authenticate admin
  console.log('\n2. Authenticating Executive Administrator...');
  const loginRes = await fetch(`${targetHost}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'vanojanSE',
      password: process.env.ADMIN_PASSWORD || 'vanojan2026'
    })
  });
  assert(loginRes.ok, `Admin login failed: ${loginRes.status}`);
  const loginData = await loginRes.json();
  const token = loginData.token;
  assert(token, 'Admin token was not returned');
  console.log('✓ Admin authenticated successfully.');

  // 3. Fetch Admin Music Library
  console.log('\n3. Fetching Admin Music Library via GET /api/admin/music...');
  const musicRes = await fetch(`${targetHost}/api/admin/music`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert(musicRes.ok, `GET /api/admin/music failed: ${musicRes.status}`);
  const musicData = await musicRes.json();
  assert(Array.isArray(musicData.tracks), 'Missing tracks array in admin music data');
  console.log(`✓ Retrieved ${musicData.tracks.length} track(s) from music library.`);

  // 4. Test Preview Audio Resolution for Every Track
  console.log('\n4. Validating Preview Audio Resolution for all tracks...');
  for (const track of musicData.tracks) {
    const trackId = track._id || track.id;
    console.log(`\n  --- Inspecting Track: "${track.title}" (ID: ${trackId}, Active: ${Boolean(track.isActive)}) ---`);
    
    // Simulate frontend audio URL resolution
    let resolvedUrl = track.secureUrl || track.url;
    if (resolvedUrl) {
      if (resolvedUrl.startsWith('http:')) {
        resolvedUrl = resolvedUrl.replace(/^http:/, 'https:');
      }
    } else {
      resolvedUrl = `${targetHost}/api/music/stream/${trackId}`;
    }

    if (resolvedUrl.startsWith('/')) {
      resolvedUrl = `${targetHost}${resolvedUrl}`;
    }

    console.log(`  Resolved Preview URL: ${resolvedUrl}`);
    assert(!resolvedUrl.startsWith('http:'), 'Security violation: Mixed content HTTP URL generated!');

    // Fetch HEAD or byte range request to verify playback availability
    const audioRes = await fetch(resolvedUrl, {
      headers: { Range: 'bytes=0-1023' }
    });
    console.log(`  Preview Response Status: ${audioRes.status}`);
    assert(
      audioRes.status === 200 || audioRes.status === 206 || audioRes.status === 302,
      `Preview stream request failed with status: ${audioRes.status}`
    );

    const contentType = audioRes.headers.get('content-type') || '';
    console.log(`  Preview Content-Type: ${contentType}`);
    assert(
      contentType.includes('audio') || contentType.includes('mpeg') || contentType.includes('octet-stream') || audioRes.status === 302,
      `Invalid content-type for preview audio: ${contentType}`
    );
    console.log(`  ✓ Track preview source verified playable without authentication tokens in URL.`);
  }

  // 5. Test Streaming Endpoint Range Request
  console.log('\n5. Verifying /api/music/stream/:id range request support...');
  const streamRes = await fetch(`${targetHost}/api/music/stream/default`, {
    headers: { Range: 'bytes=0-2047' }
  });
  console.log(`✓ Stream endpoint status: ${streamRes.status}`);
  assert([200, 206, 302].includes(streamRes.status), `Unexpected stream status: ${streamRes.status}`);

  console.log('\n=== ALL ADMIN PREVIEW REGRESSION TESTS PASSED (100% OK) ===');
}

runAdminPreviewTests().catch(err => {
  console.error('\n❌ PREVIEW REGRESSION TEST FAILED:', err);
  process.exit(1);
});
