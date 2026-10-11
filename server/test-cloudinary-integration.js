import app from './app.js';
import { connectDb, isDbConnected } from './connection.js';
import { Media, Project, Profile, Message, User } from './models/index.js';
import { isCloudinaryConfigured, getCloudinaryStatus } from './config/cloudinary.js';

let server;

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING CLOUDINARY & MONGO STORAGE VERIFICATION');
  console.log('====================================================\n');

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

  try {
    // 1. Database Connectivity
    console.log('1️⃣ Checking MongoDB Atlas Connection...');
    await connectDb();
    assert(isDbConnected(), 'MongoDB Atlas is connected');

    // 2. Cloudinary Configuration Status
    console.log('\n2️⃣ Checking Cloudinary Configuration...');
    const status = getCloudinaryStatus();
    assert(status.cloudName === 'vyr3hnbq', `Cloud name is configured as vyr3hnbq (actual: ${status.cloudName})`);
    console.log(`     API Key present: ${status.hasApiKey}`);
    console.log(`     API Secret present: ${status.hasApiSecret}`);

    // Start local ephemeral HTTP server
    const port = 5123;
    server = app.listen(port);
    const baseUrl = `http://localhost:${port}`;

    // 3. Health Endpoint Verification
    console.log('\n3️⃣ Testing /api/health Endpoint...');
    const resHealth = await fetch(`${baseUrl}/api/health`);
    const dataHealth = await resHealth.json();
    assert(resHealth.ok, 'Health endpoint responds with 200 OK');
    assert(dataHealth.database?.connected === true, 'Health reports database connected');
    assert(Boolean(dataHealth.cloudinary), 'Health reports Cloudinary status block');

    // 4. File Size Limits & MIME Validation (Simulated multipart requests)
    console.log('\n4️⃣ Testing Upload Validation & Security Middleware...');

    // A: File size rejection (>8MB)
    const largeBuffer = Buffer.alloc(9 * 1024 * 1024, 'a'); // 9MB
    const boundary = '----WebKitFormBoundaryTest123';
    const oversizedBody = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="oversized.png"\r\nContent-Type: image/png\r\n\r\n`),
      largeBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const resLarge = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: 'Bearer admin-dev-token-2026'
      },
      body: oversizedBody
    });
    const dataLarge = await resLarge.json();
    assert(resLarge.status === 400, `Oversized file (>8MB) rejected with 400 (got: ${resLarge.status})`);
    assert(dataLarge.error && dataLarge.error.includes('8MB'), 'Error message mentions 8MB limit');

    // B: Invalid MIME type rejection
    const invalidTextBuffer = Buffer.from('console.log("hello world");');
    const invalidMimeBody = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="script.js"\r\nContent-Type: application/javascript\r\n\r\n`),
      invalidTextBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const resInvalidMime = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: 'Bearer admin-dev-token-2026'
      },
      body: invalidMimeBody
    });
    const dataInvalidMime = await resInvalidMime.json();
    assert(resInvalidMime.status === 400, `Non-image file rejected with 400 (got: ${resInvalidMime.status})`);
    assert(dataInvalidMime.error && dataInvalidMime.error.includes('Unsupported file type'), 'Error mentions unsupported format');

    // 5. MongoDB Media Model Schema & Index Verification
    console.log('\n5️⃣ Testing MongoDB Atlas Media Metadata Model...');
    const testPublicId = `test_asset_${Date.now()}`;
    const testMedia = await Media.create({
      public_id: testPublicId,
      url: `https://res.cloudinary.com/vyr3hnbq/image/upload/v12345/${testPublicId}.webp`,
      format: 'webp',
      bytes: 142050,
      width: 1920,
      height: 1080,
      tag: 'project',
      uploaderRole: 'admin',
      uploaderId: 'admin',
      originalFilename: 'architecture_diagram.png'
    });
    assert(Boolean(testMedia._id), 'Media record created in MongoDB Atlas collection');

    // Retrieve and verify
    const retrievedMedia = await Media.findOne({ public_id: testPublicId });
    assert(retrievedMedia && retrievedMedia.width === 1920, 'Media metadata correctly persisted and queryable');

    // 6. Project & Profile Cloudinary Image Field Integration
    console.log('\n6️⃣ Testing Project & Profile Schema Cloudinary Fields...');
    const testProjectId = `proj-test-${Date.now()}`;
    const newProj = await Project.create({
      id: testProjectId,
      title: 'Cloudinary Test Showcase',
      category: 'Full-Stack Web',
      image: `https://res.cloudinary.com/vyr3hnbq/image/upload/${testPublicId}.webp`,
      imagePublicId: testPublicId
    });
    assert(newProj.imagePublicId === testPublicId, 'Project persisted with imagePublicId');

    // 7. Authorization & Non-Admin Permission Check
    console.log('\n7️⃣ Testing Permission & Unauthorized Access Prevention...');
    // Create a regular user
    const testUser = await User.findOneAndUpdate(
      { username: 'testuser' },
      {
        username: 'testuser',
        email: 'testuser@example.com',
        passwordHash: 'salt:hash',
        role: 'user'
      },
      { upsert: true, returnDocument: 'after' }
    );

    // Try deleting admin media as non-admin / without valid credentials
    const resForbiddenDelete = await fetch(`${baseUrl}/api/media/${testPublicId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer invalid-token'
      }
    });
    assert(resForbiddenDelete.status === 401, 'Unauthorized request rejected with 401');

    // Cleanup test records in database
    await Project.deleteOne({ id: testProjectId });
    await Media.deleteOne({ public_id: testPublicId });
    await User.deleteOne({ username: 'testuser' });
    console.log('\n🧹 Test artifacts cleaned up from MongoDB Atlas.');

    console.log('\n====================================================');
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    if (server) server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal test error:', err);
    if (server) server.close();
    process.exit(1);
  }
}

runTests();
