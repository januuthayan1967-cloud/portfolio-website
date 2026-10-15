import assert from 'assert';
import fs from 'fs';
import path from 'path';
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

    // 3. Test Public /api/cv/active endpoint
    console.log('\n2️⃣ Testing Public GET /api/cv/active...');
    const resActive = await fetch(`${baseUrl}/api/cv/active`);
    assert.strictEqual(resActive.status, 200, 'Status should be 200');
    const dataActive = await resActive.json();
    assert(dataActive.success === true, 'Response success should be true');
    testPass('/api/cv/active responds with 200 OK and valid JSON');

    // 4. Test Public /api/cv/download endpoint
    console.log('\n3️⃣ Testing Public GET /api/cv/download...');
    const resDownload = await fetch(`${baseUrl}/api/cv/download`);
    assert(resDownload.ok, 'Download response should be OK');
    assert.strictEqual(resDownload.headers.get('content-type'), 'application/pdf', 'Content-Type should be application/pdf');
    assert(resDownload.headers.get('content-disposition')?.includes('attachment'), 'Content-Disposition should be attachment');
    const downloadBuffer = Buffer.from(await resDownload.arrayBuffer());
    assert(downloadBuffer.subarray(0, 5).toString('ascii') === '%PDF-', 'Downloaded content must start with %PDF-');
    testPass('/api/cv/download correctly serves PDF with attachment headers & %PDF- magic bytes');

    // 5. Test Public /api/cv/view endpoint
    console.log('\n4️⃣ Testing Public GET /api/cv/view (Inline PDF Viewing)...');
    const resView = await fetch(`${baseUrl}/api/cv/view`);
    assert(resView.ok, 'View response should be OK');
    assert.strictEqual(resView.headers.get('content-type'), 'application/pdf', 'Content-Type should be application/pdf');
    assert(resView.headers.get('content-disposition')?.includes('inline'), 'Content-Disposition should be inline');
    testPass('/api/cv/view serves PDF with inline header for native in-browser viewing');

    // 6. Test Security & Auth on Protected Endpoints
    console.log('\n5️⃣ Testing Security & Unauthorized Access Protection...');
    const resUnauthUpload = await fetch(`${baseUrl}/api/admin/cv/upload`, { method: 'POST' });
    assert.strictEqual(resUnauthUpload.status, 401, 'Upload without token should be 401');

    const resUnauthDelete = await fetch(`${baseUrl}/api/admin/cv`, { method: 'DELETE' });
    assert.strictEqual(resUnauthDelete.status, 401, 'Delete without token should be 401');

    const resFakeToken = await fetch(`${baseUrl}/api/admin/cv`, {
      method: 'GET',
      headers: { Authorization: 'Bearer fake-invalid-token' }
    });
    assert.strictEqual(resFakeToken.status, 401, 'Invalid token should be rejected with 401');
    testPass('Admin modification & status endpoints strictly reject unauthorized requests');

    // 7. Test Validation: Non-PDF File Rejection
    console.log('\n6️⃣ Testing PDF Validation & Signature Checks...');
    const boundary = '----WebKitFormBoundaryCvTest' + Date.now();
    const fakeTextFile = Buffer.from('This is not a PDF file at all.');
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

    // 8. Test Validation: Oversized File (>10MB)
    console.log('\n7️⃣ Testing 10MB Maximum File Size Limit...');
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

    // 9. Test Admin Upload CV
    console.log('\n8️⃣ Testing Admin CV Upload...');
    const validDummyPdf = Buffer.from('%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
    const uploadBody = createMultipartPdfBody(boundary, 'Test_Executive_CV.pdf', validDummyPdf);

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
    assert.strictEqual(dataUpload.cv.originalFilename, 'Test_Executive_CV.pdf', 'Original filename must match');
    assert(dataUpload.cv.isActive === true, 'Uploaded CV must be marked active');
    testPass('Admin successfully uploaded and activated new CV');

    // 10. Test Admin Replace CV
    console.log('\n9️⃣ Testing Admin CV Replacement (Atomic Switch & Cleanup)...');
    const replacedDummyPdf = Buffer.from('%PDF-1.7\n% REPLACED_VERSION_2026\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
    const replaceBody = createMultipartPdfBody(boundary, 'Replaced_Vanojan_CV.pdf', replacedDummyPdf);

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
    assert(dataReplace.success === true, 'Replace response success should be true');
    assert.strictEqual(dataReplace.cv.originalFilename, 'Replaced_Vanojan_CV.pdf', 'Replaced filename must match');
    testPass('Admin successfully replaced CV with verified atomic switchover');

    // Verify visitor download gets the replaced CV
    const resVerifyReplacedDownload = await fetch(`${baseUrl}/api/cv/download`);
    const verifiedDownloadBuffer = Buffer.from(await resVerifyReplacedDownload.arrayBuffer());
    assert(verifiedDownloadBuffer.toString().includes('REPLACED_VERSION_2026'), 'Visitor download must reflect replaced CV content');
    testPass('Public download immediately reflects replaced CV content without caching delay');

    // 11. Test Admin Remove CV
    console.log('\n🔟 Testing Admin CV Removal & Public Deactivation...');
    const resDelete = await fetch(`${baseUrl}/api/admin/cv`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(resDelete.status, 200, 'Delete should succeed with 200');
    const dataDelete = await resDelete.json();
    assert(dataDelete.success === true, 'Delete response success should be true');

    // Verify /api/cv/active is now null
    const resActiveAfterDel = await fetch(`${baseUrl}/api/cv/active`);
    const dataActiveAfterDel = await resActiveAfterDel.json();
    assert.strictEqual(dataActiveAfterDel.activeCv, null, 'Active CV must be null after removal');

    // Verify /api/cv/download returns 404 after removal
    const resDownloadAfterDel = await fetch(`${baseUrl}/api/cv/download`);
    assert.strictEqual(resDownloadAfterDel.status, 404, 'Download must return 404 when CV is removed');
    testPass('Admin CV removal disables public download gracefully with 404');

    // 12. Restore Genuine CV for production portfolio
    console.log('\n1️⃣1️⃣ Restoring Genuine Executive CV (VanojanBSCCV.pdf)...');
    const realCvPath = path.join(__dirname, '../public/VanojanBSCCV.pdf');
    const realCvBuffer = fs.readFileSync(realCvPath);
    const restoreBody = createMultipartPdfBody(boundary, 'VanojanBSCCV.pdf', realCvBuffer);

    const resRestore = await fetch(`${baseUrl}/api/admin/cv/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        Authorization: `Bearer ${adminToken}`
      },
      body: restoreBody
    });
    assert.strictEqual(resRestore.status, 200, 'Restoration should succeed');
    const dataRestore = await resRestore.json();
    assert.strictEqual(dataRestore.cv.originalFilename, 'VanojanBSCCV.pdf');
    testPass('Genuine CV restored as the live active document');

    // Clean up temporary test records in database if needed
    await Cv.deleteMany({ originalFilename: { $in: ['Test_Executive_CV.pdf', 'Replaced_Vanojan_CV.pdf'] } });

    console.log('\n====================================================');
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
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
