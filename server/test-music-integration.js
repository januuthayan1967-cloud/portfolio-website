import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const baseUrl = `http://localhost:${process.env.PORT || 5000}`;

async function runMusicTests() {
  console.log('=== STARTING BACKGROUND MUSIC AUTOMATED INTEGRATION TESTS ===\n');

  // 1. Test Public /api/portfolio contains musicSettings & activeTrack
  console.log('1. Testing GET /api/portfolio for dynamic music data...');
  const portfolioRes = await fetch(`${baseUrl}/api/portfolio`);
  assert(portfolioRes.ok, `GET /api/portfolio failed: ${portfolioRes.status}`);
  const portfolioData = await portfolioRes.json();
  assert(portfolioData.musicSettings, 'Portfolio response missing musicSettings');
  assert(portfolioData.activeTrack, 'Portfolio response missing activeTrack');
  console.log('✓ /api/portfolio includes musicSettings:');
  console.log('  Enabled:', portfolioData.musicSettings.isEnabled);
  console.log('  Volume:', portfolioData.musicSettings.defaultVolume);
  console.log('  Active Track Title:', portfolioData.activeTrack.title);
  console.log('  Active Track URL:', portfolioData.activeTrack.url);

  // 2. Test Public /api/music/active
  console.log('\n2. Testing GET /api/music/active...');
  const activeRes = await fetch(`${baseUrl}/api/music/active`);
  assert(activeRes.ok, `GET /api/music/active failed: ${activeRes.status}`);
  const activeData = await activeRes.json();
  assert(activeData.success, 'active endpoint did not return success: true');
  assert(activeData.activeTrack, 'active endpoint missing activeTrack');
  console.log('✓ GET /api/music/active returned active track:', activeData.activeTrack.title);

  // 3. Test Public /api/music/stream/:id (Range request partial content)
  console.log('\n3. Testing GET /api/music/stream/:id with HTTP Range header...');
  const streamRes = await fetch(`${baseUrl}/api/music/stream/${activeData.activeTrack.id || 'default'}`, {
    headers: { Range: 'bytes=0-1023' }
  });
  console.log(`✓ Audio stream responded with status: ${streamRes.status}`);
  assert(streamRes.status === 206 || streamRes.status === 200 || streamRes.status === 302, `Unexpected stream status: ${streamRes.status}`);

  // 4. Admin Authentication
  console.log('\n4. Authenticating Admin (vanojanSE)...');
  const loginRes = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'vanojanSE',
      password: process.env.ADMIN_PASSWORD || 'vanojan2026'
    })
  });
  assert(loginRes.ok, `Login failed: ${loginRes.status}`);
  const loginData = await loginRes.json();
  const token = loginData.token;
  assert(token, 'No token returned from login');
  console.log('✓ Admin authenticated successfully. Token acquired.');

  // 5. Admin GET /api/admin/music
  console.log('\n5. Fetching music library via GET /api/admin/music...');
  const listRes = await fetch(`${baseUrl}/api/admin/music`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert(listRes.ok, `GET /api/admin/music failed: ${listRes.status}`);
  const listData = await listRes.json();
  assert(listData.success, 'Music library list did not return success');
  assert(Array.isArray(listData.tracks), 'Music library missing tracks array');
  console.log(`✓ Retrieved ${listData.tracks.length} track(s) from music library.`);
  const defaultTrack = listData.tracks.find(t => t.isActive) || listData.tracks[0];
  const defaultTrackId = defaultTrack?._id || defaultTrack?.id;

  // 6. Admin Upload New Track via POST /api/admin/music/upload
  console.log('\n6. Testing POST /api/admin/music/upload with synthetic audio buffer...');
  // Create a minimal synthetic audio payload (ID3 tag header + dummy MPEG frame)
  const syntheticMp3Header = Buffer.from([
    0x49, 0x44, 0x33, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A, // ID3v2.3 header
    0x54, 0x49, 0x54, 0x32, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, // TIT2 frame
    0xFF, 0xFB, 0x90, 0x64 // MPEG 1 Layer 3 audio sync frame
  ]);
  const syntheticAudio = Buffer.concat([syntheticMp3Header, Buffer.alloc(10000, 0xAA)]);

  const formData = new FormData();
  const blob = new Blob([syntheticAudio], { type: 'audio/mpeg' });
  formData.append('file', blob, 'synth_ambient_test.mp3');
  formData.append('title', 'Test Atmospheric Ambient Track');
  formData.append('activate', 'false');

  const uploadRes = await fetch(`${baseUrl}/api/admin/music/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  const uploadData = await uploadRes.json();
  assert(uploadRes.ok, `Upload failed: ${JSON.stringify(uploadData)}`);
  assert(uploadData.success, 'Upload did not return success: true');
  const testTrackId = uploadData.track.id;
  console.log('✓ Upload successful! Created test track ID:', testTrackId);
  console.log('  Track Title:', uploadData.track.title);

  // 7. Activate New Track via PUT /api/admin/music/:id/activate
  console.log('\n7. Activating test track on homepage via PUT /api/admin/music/:id/activate...');
  const activateTrackRes = await fetch(`${baseUrl}/api/admin/music/${testTrackId}/activate`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  const activateTrackData = await activateTrackRes.json();
  assert(activateTrackRes.ok, `Activate failed: ${JSON.stringify(activateTrackData)}`);
  assert(activateTrackData.success, 'Activate did not return success: true');
  console.log('✓ Track activated successfully! Message:', activateTrackData.message);

  // 8. Verify GET /api/portfolio immediately reflects the new active track
  console.log('\n8. Verifying /api/portfolio reflects new active track...');
  const verifyPortfolioRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const verifyPortfolioData = await verifyPortfolioRes.json();
  assert.strictEqual(
    verifyPortfolioData.activeTrack.title,
    'Test Atmospheric Ambient Track',
    'Portfolio does not reflect newly activated track title'
  );
  console.log('✓ LIVE HOMEPAGE SYNC CONFIRMED: Active Track is now:', verifyPortfolioData.activeTrack.title);

  // 9. Test updating settings via PUT /api/admin/music/settings
  console.log('\n9. Testing PUT /api/admin/music/settings (Volume & Enable toggle)...');
  const settingsRes = await fetch(`${baseUrl}/api/admin/music/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      isEnabled: true,
      defaultVolume: 0.65
    })
  });
  const settingsData = await settingsRes.json();
  assert(settingsRes.ok, `Settings update failed: ${JSON.stringify(settingsData)}`);
  assert.strictEqual(settingsData.settings.defaultVolume, 0.65, 'Volume did not update to 0.65');
  console.log('✓ Music settings updated successfully. Volume set to:', settingsData.settings.defaultVolume);

  // 10. Requirement 15 Verification: Attempt to DELETE ACTIVE track (must be blocked)
  console.log('\n10. Testing Requirement 15: Attempting to DELETE active track (should be blocked)...');
  const blockDeleteRes = await fetch(`${baseUrl}/api/admin/music/${testTrackId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.strictEqual(blockDeleteRes.status, 400, 'Deleting active track should return HTTP 400');
  const blockDeleteData = await blockDeleteRes.json();
  console.log('✓ Active track deletion successfully blocked with error:', blockDeleteData.error);

  // 11. Reactivate the canonical default track
  console.log('\n11. Reactivating canonical default track...');
  if (defaultTrackId) {
    const reactivateRes = await fetch(`${baseUrl}/api/admin/music/${defaultTrackId}/activate`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    assert(reactivateRes.ok, 'Failed to reactivate default track');
    console.log('✓ Canonical default track reactivated.');
  }

  // 12. Reset volume to canonical 0.55
  await fetch(`${baseUrl}/api/admin/music/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      isEnabled: true,
      defaultVolume: 0.55
    })
  });
  console.log('✓ Reset volume setting to canonical 0.55.');

  // 13. Safely delete the inactive test track
  console.log('\n13. Deleting inactive test track...');
  const deleteTestRes = await fetch(`${baseUrl}/api/admin/music/${testTrackId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  assert(deleteTestRes.ok, 'Failed to delete inactive test track');
  console.log('✓ Inactive test track successfully deleted.');

  // 14. Final Verification of Homepage Portfolio State
  const finalRes = await fetch(`${baseUrl}/api/portfolio?t=${Date.now()}`);
  const finalData = await finalRes.json();
  console.log('\n✓ FINAL HOMEPAGE PORTFOLIO VERIFICATION:');
  console.log('  Active Track:', finalData.activeTrack?.title);
  console.log('  Volume:', finalData.musicSettings?.defaultVolume);
  console.log('  Enabled:', finalData.musicSettings?.isEnabled);

  console.log('\n=== ALL 14 AUTOMATED INTEGRATION TESTS PASSED 100% ===');
}

runMusicTests().catch(err => {
  console.error('\n❌ TEST FAILURE:', err);
  process.exit(1);
});
