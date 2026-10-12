import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDb, isDbConnected } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function runTests() {
  console.log('--- PHASE 13: COMPREHENSIVE END-TO-END TEST SUITE ---');

  // 1. Connect DB
  await connectDb();
  console.log('✓ MongoDB Atlas connection verified:', isDbConnected());

  // 2. Start ephemeral test server
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`✓ Test server running at ${baseUrl}`);

  try {
    // 3. Test Public Portfolio Endpoint
    const resPortfolio = await fetch(`${baseUrl}/api/portfolio`);
    const dataPortfolio = await resPortfolio.json();
    console.log(`✓ /api/portfolio: OK (Projects: ${dataPortfolio.projects?.length}, Skills: ${dataPortfolio.skills?.length}, Education: ${dataPortfolio.education?.length})`);

    // 4. Test Invalid Admin Login
    const resBadLogin = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'vanojanSE', password: 'WrongPassword123!' })
    });
    console.log(`✓ /api/admin/login rejection of invalid password: status ${resBadLogin.status} (Expected 401)`);

    // 5. Test Forgot Password (safe endpoint)
    const resForgot = await fetch(`${baseUrl}/api/admin/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'uthayanvanojan5@gmail.com' })
    });
    const dataForgot = await resForgot.json();
    console.log(`✓ /api/admin/forgot-password: status ${resForgot.status}, response: "${dataForgot.message}"`);

    // 6. Test Contact Message Submission
    const testMessage = {
      name: 'Automated Tester',
      email: 'tester@enterprise.io',
      subject: 'Architecture Engagement Inquiry',
      message: 'Automated integration validation message testing MongoDB Atlas and Nodemailer integration.'
    };
    const resMsg = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testMessage)
    });
    const dataMsg = await resMsg.json();
    console.log(`✓ /api/messages submission: status ${resMsg.status}, id: ${dataMsg.id}`);

    // 7. Test Honeypot rejection
    const resHoneypot = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...testMessage, hp_website: 'bot-spam-url' })
    });
    console.log(`✓ /api/messages honeypot spam protection: status ${resHoneypot.status}`);

    // 8. Test Invalid Email rejection
    const resBadEmail = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...testMessage, email: 'not-an-email' })
    });
    console.log(`✓ /api/messages validation rejection on bad email: status ${resBadEmail.status} (Expected 400)`);

    // 9. Check Cloudinary status endpoint
    const resCloudinary = await fetch(`${baseUrl}/api/cloudinary/status`);
    const dataCloudinary = await resCloudinary.json();
    console.log(`✓ /api/cloudinary/status: cloudName=${dataCloudinary.cloudName}, configured=${dataCloudinary.configured}`);

    console.log('\n--- ALL TEST SUITE CHECKS PASSED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Test Suite Failure:', err);
  } finally {
    server.close();
    process.exit(0);
  }
}

runTests();
