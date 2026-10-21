import assert from 'assert';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDb, isDbConnected } from './connection.js';
import { Cv, Profile } from './models/index.js';
import { signJwt } from './utils/jwt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runCvTests() {
  console.log('====================================================');
  console.log('🧪 DYNAMIC CV & RESUME MANAGEMENT SYSTEM TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function testPass(msg) {
    console.log(`  ✅ PASS: ${msg}`);
    passed++;
  }

  function testFail(msg, err) {
    console.error(`  ❌ FAIL: ${msg}`, err ? err.message : '');
    failed++;
  }

  let server;
  const PORT = 5299;

  try {
    // 1. Connect DB
    console.log('1️⃣ Connecting to MongoDB Atlas...');
    await connectDb();
    assert(isDbConnected(), 'MongoDB Atlas is connected');
    testPass('MongoDB Atlas connection established');

    // Capture initial active CV before running tests so we can restore safely
    const originalActiveCv = await Cv.findOne({ isActive: true }).select('+fileData').lean();
    console.log(`  ℹ️ Initial Active CV in Atlas: ${originalActiveCv?.originalFilename || 'None'} (${originalActiveCv?._id || 'N/A'})`);

    // 2. Start Test Server
    server = app.listen(PORT);
    const baseUrl = `http://localhost:${PORT}`;
    testPass(`Ephemeral API test server listening on port ${PORT}`);

    // Generate valid admin JWT token
    const adminToken = signJwt({
      username: 'vanojanSE',
      role: 'admin',
      id: 'admin_test_user'
    });

    // Helper function for multipart upload
    function createMultipartPdfBody(boundary, filename, buffer) {
      return Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: application/pdf\r\n\r\n`),
        buffer,
        Buffer.from(`\r\n--${boundary}--\r\n`)
      ]);
    }

    // 3. Test Security & Unauthorized Access Protection
    console.log('\n2️⃣ Testing Security & Unauthorized Access Protection...');
    const resUnauthUpload = await fetch(`${baseUrl}/api/admin/cv/upload`, { method: 'POST' });
    assert.strictEqual(resUnauthUpload.status, 401, 'Upload without token should be 401');

    const resUnauthDelete = await fetch(`${baseUrl}/api/admin/cv`, { method: 'DELETE' });
    assert.strictEqual(resUnauthDelete.status, 401, 'Delete without token should be 401');

    const resFakeToken = await fetch(`${baseUrl}/api/admin/cv`, {
      method: 'GET',
      headers: { Authorization: 'Bearer fake-invalid-token' }
    });
    assert.strictEqual(resFakeToken.status, 401, 'Invalid token should be rejected with 401');
    testPass('Admin endpoints strictly reject unauthorized requests');

    // 4. Test Validation: Non-PDF File Rejection
    console.log('\n3️⃣ Testing PDF Validation & Signature Checks...');
    const boundary = '----WebKitFormBoundaryCvTest' + Date.now();
    const fakeTextFile = Buffer.from('This is a text file posing as a PDF.');
    const nonPdfBody = createMultipartPdfBody(boundary, 'malicious.pdf', fakeTextFile);

    const resNonPdf = await fetch(`${baseUrl}/api/admin/cv/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${adminToken}`
      },
      body: nonPdfBody
    });
    assert.strictEqual(resNonPdf.status, 400, 'Non-PDF magic bytes must be rejected with 400');
    const dataNonPdf = await resNonPdf.json();
    assert(dataNonPdf.error?.includes('signature') || dataNonPdf.error?.includes('valid PDF'), 'Error must mention invalid PDF signature');
    testPass('Invalid file signature rejected (requires %PDF- magic bytes)');

    // 5. Test Validation: Oversized File (>10MB)
    console.log('\n4️⃣ Testing 10MB Maximum File Size Limit...');
    const oversizedBuffer = Buffer.alloc(11 * 1024 * 1024, 'a'); // 11MB
    const oversizedBody = createMultipartPdfBody(boundary, 'oversized.pdf', oversizedBuffer);
    const resOversized = await fetch(`${baseUrl}/api/admin/cv/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${adminToken}`
      },
      body: oversizedBody
    });
    assert.strictEqual(resOversized.status, 400, 'Oversized file must be rejected with 400');
    const dataOversized = await resOversized.json();
    assert(dataOversized.error?.includes('10MB'), 'Error message must specify 10MB limit');
    testPass('Oversized files (>10MB) rejected with 400 and clear error message');

    // 6. Test Admin Upload CV with Unique Binary Content
    console.log('\n5️⃣ Testing Admin CV Upload & Binary Persistence...');
    const uniqueTestToken = `TEST_CV_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const testPdfContent = `%PDF-1.7\n% ${uniqueTestToken}\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
    const testPdfBuffer = Buffer.from(testPdfContent);
    const expectedUploadHash = crypto.createHash('sha256').update(testPdfBuffer).digest('hex');
    const testFilename = `Integration_Test_CV_${Date.now()}.pdf`;

    const uploadBody = createMultipartPdfBody(boundary, testFilename, testPdfBuffer);
    const resUpload = await fetch(`${baseUrl}/api/admin/cv/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${adminToken}`
      },
      body: uploadBody
    });
    assert.strictEqual(resUpload.status, 200, 'Upload should succeed with 200');
    const dataUpload = await resUpload.json();
    assert(dataUpload.success === true, 'Upload response success should be true');
    assert.strictEqual(dataUpload.cv.originalFilename, testFilename, 'Original filename must match');
    assert.strictEqual(dataUpload.cv.fileHash, expectedUploadHash, 'File hash must match expected sha256');
    assert(dataUpload.cv.isActive === true, 'Uploaded CV must be marked active');
    testPass('Admin successfully uploaded and activated new CV');

    // Verify MongoDB Atlas active record
    const atlasActiveCv = await Cv.findOne({ isActive: true }).select('+fileData').lean();
    assert(atlasActiveCv !== null, 'Active CV record exists in MongoDB Atlas');
    assert.strictEqual(atlasActiveCv.originalFilename, testFilename);
    assert.strictEqual(atlasActiveCv.fileHash, expectedUploadHash);
    const persistedBuffer = atlasActiveCv.fileData?.buffer || (typeof atlasActiveCv.fileData?.value === 'function' ? atlasActiveCv.fileData.value() : atlasActiveCv.fileData);
    assert(persistedBuffer !== null && persistedBuffer.length > 0, 'fileData binary is persisted in Atlas');
    testPass('MongoDB Atlas identifies newly uploaded CV as active with fileData binary');

    // 7. Verify Public GET /api/cv/download returns the EXACT newly uploaded PDF
    console.log('\n6️⃣ Verifying Public GET /api/cv/download returns the exact newly uploaded PDF...');
    const resDownload = await fetch(`${baseUrl}/api/cv/download`);
    assert(resDownload.ok, 'Download response must be 200 OK');
    assert.strictEqual(resDownload.headers.get('content-type'), 'application/pdf');
    assert(resDownload.headers.get('content-disposition')?.includes(`filename="${testFilename}"`));
    assert.strictEqual(resDownload.headers.get('cache-control'), 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');

    const downloadedBuffer = Buffer.from(await resDownload.arrayBuffer());
    const downloadedHash = crypto.createHash('sha256').update(downloadedBuffer).digest('hex');
    assert.strictEqual(downloadedHash, expectedUploadHash, 'Downloaded PDF SHA-256 hash must EXACTLY match the uploaded file');

    // CRITICAL: Verify the old static fallback PDF is NOT returned!
    const oldStaticHash = 'e12320eb67f0ef95d141ab5f975aee56ef1cf525dbf5683c546d3d6570f22215';
    assert.notStrictEqual(downloadedHash, oldStaticHash, 'Downloaded file must NOT match old public/VanojanBSCCV.pdf fallback');
    assert(downloadedBuffer.toString().includes(uniqueTestToken), 'Downloaded file contains the unique test token');
    testPass('Download endpoint returns exact uploaded PDF (verified via SHA-256 hash & token)');

    // 8. Test Atomic Replace CV
    console.log('\n7️⃣ Testing Admin CV Replacement (Atomic Switchover)...');
    const replaceToken = `REPLACED_CV_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const replacedPdfContent = `%PDF-1.7\n% ${replaceToken}\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
    const replacedPdfBuffer = Buffer.from(replacedPdfContent);
    const expectedReplacedHash = crypto.createHash('sha256').update(replacedPdfBuffer).digest('hex');
    const replacedFilename = `Replaced_Test_CV_${Date.now()}.pdf`;

    const replaceBody = createMultipartPdfBody(boundary, replacedFilename, replacedPdfBuffer);
    const resReplace = await fetch(`${baseUrl}/api/admin/cv/replace`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${adminToken}`
      },
      body: replaceBody
    });
    assert.strictEqual(resReplace.status, 200, 'Replace should succeed with 200');
    const dataReplace = await resReplace.json();
    assert(dataReplace.success === true);
    assert.strictEqual(dataReplace.cv.originalFilename, replacedFilename);

    // Verify download immediately delivers replaced CV
    const resVerifyReplaceDownload = await fetch(`${baseUrl}/api/cv/download`);
    const verifiedReplacedBuf = Buffer.from(await resVerifyReplaceDownload.arrayBuffer());
    const verifiedReplacedHash = crypto.createHash('sha256').update(verifiedReplacedBuf).digest('hex');
    assert.strictEqual(verifiedReplacedHash, expectedReplacedHash, 'Replaced download hash matches exactly');
    assert(verifiedReplacedBuf.toString().includes(replaceToken), 'Downloaded content contains replace token');

    // Verify previous version is archived with isActive: false
    const previousDoc = await Cv.findOne({ originalFilename: testFilename }).lean();
    assert(previousDoc !== null, 'Previous CV document is archived');
    assert.strictEqual(previousDoc.isActive, false, 'Previous CV version is marked isActive: false');
    testPass('Admin replace performs atomic switchover and archives previous version');

    // 9. Test Historical CV Download & View
    console.log('\n8️⃣ Testing Historical CV Access (/api/admin/cv/:id/download)...');
    const resHistDownload = await fetch(`${baseUrl}/api/admin/cv/${previousDoc._id}/download`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(resHistDownload.ok, 'Historical download responds with 200 OK');
    const histBuf = Buffer.from(await resHistDownload.arrayBuffer());
    const histHash = crypto.createHash('sha256').update(histBuf).digest('hex');
    assert.strictEqual(histHash, expectedUploadHash, 'Historical download matches initial uploaded version');
    testPass('Historical CV endpoint delivers exact archived file version');

    // 10. Test Active CV Protection (disallow deleting currently active CV)
    console.log('\n9️⃣ Testing Active CV Protection against Accidental Deletion...');
    const activeDocToProtect = await Cv.findOne({ isActive: true }).lean();
    const resDeleteActive = await fetch(`${baseUrl}/api/admin/cv/${activeDocToProtect._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(resDeleteActive.status, 400, 'Deleting active CV must return 400');
    const dataDeleteActive = await resDeleteActive.json();
    assert(dataDeleteActive.error?.includes('active'), 'Error must specify active CV cannot be deleted');
    testPass('Active CV is strictly protected against accidental deletion');

    // 11. Test Deletion of Inactive CV Version
    console.log('\n🔟 Testing Deletion of Archived CV Version...');
    const resDeleteInactive = await fetch(`${baseUrl}/api/admin/cv/${previousDoc._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(resDeleteInactive.status, 200, 'Deleting inactive CV returns 200 OK');
    const checkDeleted = await Cv.findById(previousDoc._id).lean();
    assert.strictEqual(checkDeleted, null, 'Deleted version is purged from database');
    testPass('Archived CV version successfully and permanently deleted');

    // 12. Test Admin CV Removal & Public 404 Disable
    console.log('\n1️⃣1️⃣ Testing Admin Active CV Removal & Safe 404 Disabling...');
    const resRemoveAll = await fetch(`${baseUrl}/api/admin/cv`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(resRemoveAll.status, 200);

    const resActiveAfterRemove = await fetch(`${baseUrl}/api/cv/active`);
    const dataActiveAfterRemove = await resActiveAfterRemove.json();
    assert.strictEqual(dataActiveAfterRemove.activeCv, null, 'Active CV is null after removal');

    // Download MUST return 404 and NOT fall back to old PDF!
    const resDownloadAfterRemove = await fetch(`${baseUrl}/api/cv/download`);
    assert.strictEqual(resDownloadAfterRemove.status, 404, 'Download returns 404 when no active CV');
    const dataDownloadAfterRemove = await resDownloadAfterRemove.json();
    assert(dataDownloadAfterRemove.error?.includes('unavailable') || dataDownloadAfterRemove.error?.includes('available'), 'Clear 404 error returned');
    testPass('Active CV removal disables public download gracefully with 404 (zero fallback)');

    // 13. Safe Restoration of Genuine Active CV
    console.log('\n1️⃣2️⃣ Restoring Genuine Executive CV...');
    // Clean up temporary integration test records
    await Cv.deleteMany({ originalFilename: { $in: [testFilename, replacedFilename] } });

    // Look for genuine CV on Desktop first, or use original active record
    const desktopCvPath = 'C:/Users/User/OneDrive/Desktop/VanojanBScCV.pdf';
    let restoreBuffer = null;
    let restoreFilename = 'VanojanBScCV.pdf';

    if (fs.existsSync(desktopCvPath)) {
      restoreBuffer = fs.readFileSync(desktopCvPath);
      console.log(`  ℹ️ Found genuine executive CV on Desktop: ${desktopCvPath} (${restoreBuffer.length} bytes)`);
    } else if (originalActiveCv && originalActiveCv.fileData) {
      restoreBuffer = originalActiveCv.fileData;
      restoreFilename = originalActiveCv.originalFilename || 'VanojanBScCV.pdf';
      console.log(`  ℹ️ Restoring from original Atlas activeCv record (${restoreBuffer.length} bytes)`);
    } else {
      const localCvPath = path.join(__dirname, '../public/VanojanBSCCV.pdf');
      restoreBuffer = fs.readFileSync(localCvPath);
      restoreFilename = 'VanojanBScCV.pdf';
      console.log(`  ℹ️ Restoring from local baseline (${restoreBuffer.length} bytes)`);
    }

    const restoreBody = createMultipartPdfBody(boundary, restoreFilename, restoreBuffer);
    const resRestore = await fetch(`${baseUrl}/api/admin/cv/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${adminToken}`
      },
      body: restoreBody
    });
    assert.strictEqual(resRestore.status, 200, 'Restoration must succeed with 200');
    const dataRestore = await resRestore.json();
    assert.strictEqual(dataRestore.cv.originalFilename, restoreFilename);
    assert(dataRestore.cv.isActive === true);

    // Verify restored file is downloaded correctly
    const resFinalDownload = await fetch(`${baseUrl}/api/cv/download`);
    assert(resFinalDownload.ok);
    const finalDownloadBuf = Buffer.from(await resFinalDownload.arrayBuffer());
    assert.strictEqual(finalDownloadBuf.length, restoreBuffer.length, 'Final restored CV size matches exactly');
    testPass(`Genuine executive CV "${restoreFilename}" safely restored and active`);

    console.log('\n====================================================');
    console.log(`📊 TEST SUITE RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    if (server) server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    testFail('Unexpected test suite error', err);
    console.error('Stack:', err);
    if (server) server.close();
    process.exit(1);
  }
}

runCvTests();
