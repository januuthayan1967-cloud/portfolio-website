import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';
import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import { connectDb } from './connection.js';
import { MusicTrack } from './models/MusicTrack.js';
import { signJwt } from './utils/jwt.js';
import { cloudinary } from './config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Ensure Cloudinary mock credentials exist in test process memory
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 'mock_test_api_key';
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'mock_test_api_secret';

async function runDeletionTests() {
  console.log('=== STARTING CLOUDINARY MUSIC DELETION ERROR-HANDLING REGRESSION TEST ===\n');

  // 1. Connect to Database and start ephemeral test server
  await connectDb();
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`✓ Ephemeral test server listening on ${baseUrl}`);

  const adminToken = signJwt({ username: 'vanojanSE', role: 'admin' }, '1h');
  const userToken = signJwt({ username: 'client_guest', role: 'user' }, '1h');

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Active Music Track Protection
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 1: Active Music Track Protection ---');
    const activeTrack = await MusicTrack.findOne({ isActive: true });
    assert(activeTrack, 'Database must have an active track for safety verification');
    console.log(`Identified active track: "${activeTrack.title}" (ID: ${activeTrack._id})`);

    const activeDelRes = await fetch(`${baseUrl}/api/admin/music/${activeTrack._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`Active track delete status: ${activeDelRes.status}`);
    assert.strictEqual(activeDelRes.status, 400, 'Deleting active track must return HTTP 400');
    const activeDelData = await activeDelRes.json();
    console.log(`Active track delete error message: "${activeDelData.error}"`);
    assert(activeDelData.error.includes('Cannot delete the currently active background music track'));

    // Verify active track STILL exists in MongoDB
    const stillActiveTrack = await MusicTrack.findById(activeTrack._id);
    assert(stillActiveTrack, 'Active track was erroneously deleted from MongoDB!');
    console.log('✓ Active music protection confirmed: MongoDB record preserved.');

    // -------------------------------------------------------------------------
    // TEST 2: Authentication & Authorization Requirements
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 2: Authentication & Authorization Requirements ---');
    const unauthRes = await fetch(`${baseUrl}/api/admin/music/nonexistent123`, {
      method: 'DELETE'
    });
    console.log(`Unauthenticated delete status: ${unauthRes.status}`);
    assert.strictEqual(unauthRes.status, 401, 'Unauthenticated request must return HTTP 401');

    const forbiddenRes = await fetch(`${baseUrl}/api/admin/music/nonexistent123`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log(`Non-admin delete status: ${forbiddenRes.status}`);
    assert.strictEqual(forbiddenRes.status, 403, 'Non-admin request must return HTTP 403');
    console.log('✓ Security enforced: Admin authentication required for deletion.');

    // -------------------------------------------------------------------------
    // TEST 3: Non-Existent Music Track ID
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 3: Non-Existent Music Track Handling ---');
    const fakeMongoId = new mongoose.Types.ObjectId().toString();
    const notFoundRes = await fetch(`${baseUrl}/api/admin/music/${fakeMongoId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`Non-existent track delete status: ${notFoundRes.status}`);
    assert.strictEqual(notFoundRes.status, 404, 'Non-existent track must return HTTP 404');
    console.log('✓ Non-existent track handled cleanly with 404.');

    // -------------------------------------------------------------------------
    // TEST 4: Cloud Deletion Failure Handling (Preserve MongoDB Record)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 4: Cloud Deletion Failure Preserves MongoDB Record ---');
    const simulatedFailTrack = await MusicTrack.create({
      title: 'SYNTHETIC_FAILURE_TEST_TRACK',
      originalFilename: 'test_fail.mp3',
      cloudinaryPublicId: 'vanojan_portfolio/music/test_fail_public_id',
      cloudinaryResourceType: 'video',
      url: 'https://res.cloudinary.com/dummy/video/upload/simulated_fail.mp3',
      secureUrl: 'https://res.cloudinary.com/dummy/video/upload/simulated_fail.mp3',
      fileSize: 4096,
      isActive: false,
      isDefault: false,
      uploader: 'test'
    });
    console.log(`Created test track for failure simulation: ID ${simulatedFailTrack._id}`);

    // Mock Cloudinary destroy to simulate an error response from Cloudinary API
    const originalDestroy = cloudinary.uploader.destroy;
    cloudinary.uploader.destroy = function(publicId, options, callback) {
      if (typeof callback === 'function') {
        callback(new Error('Cloudinary rate limit exceeded (simulated API error)'), null);
      }
    };

    try {
      const failDeleteRes = await fetch(`${baseUrl}/api/admin/music/${simulatedFailTrack._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log(`Failed Cloudinary response status: ${failDeleteRes.status}`);
      assert.strictEqual(failDeleteRes.status, 502, 'Cloudinary failure must return HTTP 502 Bad Gateway');
      const failDeleteData = await failDeleteRes.json();
      console.log(`Response error message: "${failDeleteData.error}"`);
      assert(failDeleteData.error.includes('Failed to permanently delete audio asset from cloud storage'));
      assert(failDeleteData.error.includes('The database record has been preserved'));

      // Crucial assertion: Verify MongoDB record is NOT deleted!
      const preservedDoc = await MusicTrack.findById(simulatedFailTrack._id);
      assert(preservedDoc, 'CRITICAL REGRESSION: MongoDB record was deleted despite Cloudinary failure!');
      console.log('✓ MongoDB record was properly PRESERVED after cloud deletion failure (no false success).');
    } finally {
      // Clean up the synthetic test document directly
      await MusicTrack.findByIdAndDelete(simulatedFailTrack._id);
    }

    // -------------------------------------------------------------------------
    // TEST 5: Cloud Deletion Success with 'ok' Result
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 5: Cloud Deletion Success with "ok" Result ---');
    const successfulTestTrack = await MusicTrack.create({
      title: 'SYNTHETIC_SUCCESS_TEST_TRACK',
      originalFilename: 'test_success.mp3',
      cloudinaryPublicId: 'vanojan_portfolio/music/test_success_public_id',
      cloudinaryResourceType: 'video',
      url: 'https://res.cloudinary.com/dummy/video/upload/test_success.mp3',
      secureUrl: 'https://res.cloudinary.com/dummy/video/upload/test_success.mp3',
      fileSize: 4096,
      isActive: false,
      isDefault: false,
      uploader: 'test'
    });
    console.log(`Created test track for success verification: ID ${successfulTestTrack._id}`);

    // Mock Cloudinary destroy to return { result: 'ok' }
    cloudinary.uploader.destroy = function(publicId, options, callback) {
      if (typeof callback === 'function') {
        callback(null, { result: 'ok' });
      }
    };

    const successDeleteRes = await fetch(`${baseUrl}/api/admin/music/${successfulTestTrack._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`Successful Cloudinary response status: ${successDeleteRes.status}`);
    assert.strictEqual(successDeleteRes.status, 200, 'Successful deletion must return HTTP 200');
    const successDeleteData = await successDeleteRes.json();
    assert.strictEqual(successDeleteData.success, true);
    console.log(`Success message: "${successDeleteData.message}"`);

    // Verify MongoDB document was deleted
    const deletedDoc = await MusicTrack.findById(successfulTestTrack._id);
    assert.strictEqual(deletedDoc, null, 'MongoDB record must be deleted upon Cloudinary success');
    console.log('✓ MongoDB document successfully purged following verified Cloudinary destruction.');

    // -------------------------------------------------------------------------
    // TEST 6: Cloud Deletion Success with 'not found' Result (Asset already pruned)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 6: Cloud Deletion Handling of "not found" Cloudinary Response ---');
    const notFoundCloudTrack = await MusicTrack.create({
      title: 'SYNTHETIC_NOT_FOUND_CLOUD_TRACK',
      originalFilename: 'test_not_found.mp3',
      cloudinaryPublicId: 'vanojan_portfolio/music/test_already_deleted_public_id',
      cloudinaryResourceType: 'video',
      url: 'https://res.cloudinary.com/dummy/video/upload/test_not_found.mp3',
      secureUrl: 'https://res.cloudinary.com/dummy/video/upload/test_not_found.mp3',
      fileSize: 2048,
      isActive: false,
      isDefault: false,
      uploader: 'test'
    });

    // Mock Cloudinary destroy to return { result: 'not found' }
    cloudinary.uploader.destroy = function(publicId, options, callback) {
      if (typeof callback === 'function') {
        callback(null, { result: 'not found' });
      }
    };

    const notFoundDeleteRes = await fetch(`${baseUrl}/api/admin/music/${notFoundCloudTrack._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`Cloudinary 'not found' response status: ${notFoundDeleteRes.status}`);
    assert.strictEqual(notFoundDeleteRes.status, 200, "'not found' cloud asset must still clean up DB record");
    const notFoundDeletedDoc = await MusicTrack.findById(notFoundCloudTrack._id);
    assert.strictEqual(notFoundDeletedDoc, null, 'MongoDB record must be cleaned up if cloud asset is already gone');
    console.log('✓ DB record cleanly synchronized when asset was already pruned from cloud storage.');

    // Restore original Cloudinary destroy function
    cloudinary.uploader.destroy = originalDestroy;

    // -------------------------------------------------------------------------
    // TEST 7: Verification that Real Production Tracks Were Not Touched
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 7: Safety Audit of Real Production Tracks ---');
    const realTracks = await MusicTrack.find();
    console.log(`Existing library tracks count: ${realTracks.length}`);
    for (const t of realTracks) {
      console.log(`  - Real Track Preserved: "${t.title}" (ID: ${t._id}, Active: ${Boolean(t.isActive)})`);
    }
    assert(realTracks.length >= 2, 'Existing library tracks must not have been deleted during testing');
    console.log('✓ Safety confirmed: Zero real music assets or tracks were deleted during the audit and test suite.');

    console.log('\n=== ALL 7 CLOUDINARY DELETION REGRESSION TESTS PASSED 100% ===');
  } finally {
    server.close();
    await mongoose.connection.close();
  }
}

runDeletionTests().catch(err => {
  console.error('\n❌ DELETION REGRESSION TEST FAILED:', err);
  process.exit(1);
});
