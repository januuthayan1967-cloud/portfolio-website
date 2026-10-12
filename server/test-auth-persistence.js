import app from './app.js';
import { connectDb, isDbConnected } from './connection.js';
import { signJwt, verifyJwt } from './utils/jwt.js';

let server;

async function runAuthTests() {
  console.log('========================================================');
  console.log('🔐 TESTING ADMIN AUTHENTICATION & STATELESS PERSISTENCE');
  console.log('========================================================\n');

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
    await connectDb();
    const port = 5199;
    server = app.listen(port);
    const baseUrl = `http://localhost:${port}`;

    // Test 1: Admin Login API returns a signed JWT
    console.log('1️⃣ Testing Admin Login API...');
    const resLogin = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'vanojanSE', password: 'vanojan2026' })
    });
    const dataLogin = await resLogin.json();
    assert(resLogin.ok, `Admin login successful (HTTP ${resLogin.status})`);
    assert(Boolean(dataLogin.token), 'Admin login returned a token');
    
    const adminToken = dataLogin.token;
    const decoded = verifyJwt(adminToken);
    assert(decoded && decoded.role === 'admin' && decoded.username === 'vanojanSE', 'Token is a valid signed JWT with role: admin');

    // Test 2: Token verification endpoint
    console.log('\n2️⃣ Testing /api/auth/verify Endpoint...');
    const resVerify = await fetch(`${baseUrl}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const dataVerify = await resVerify.json();
    assert(resVerify.ok, `/api/auth/verify responded with HTTP 200 OK`);
    assert(dataVerify.valid === true, 'Token verified as valid');
    assert(dataVerify.user?.role === 'admin', 'Verified user has role: admin');

    // Test 3: Protected Admin Routes with JWT
    console.log('\n3️⃣ Testing Protected Admin Routes (/api/admin/overview)...');
    const resOverview = await fetch(`${baseUrl}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const dataOverview = await resOverview.json();
    assert(resOverview.ok, `Protected route accessible with JWT (HTTP ${resOverview.status})`);
    assert(dataOverview.totalProjects !== undefined, 'Overview returns real portfolio analytics');

    // Test 4: Stateless Simulation across fresh instances (No shared memory)
    console.log('\n4️⃣ Testing Stateless Serverless Resilience (Simulated Cold Start)...');
    // Verify an independently created JWT without any in-memory state
    const independentJwt = signJwt({ username: 'admin', role: 'admin' });
    const resColdStart = await fetch(`${baseUrl}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${independentJwt}` }
    });
    assert(resColdStart.ok, `Independent serverless JWT accepted without shared memory (HTTP ${resColdStart.status})`);

    // Test 5: Rejection of tampered or invalid token
    console.log('\n5️⃣ Testing Rejection of Tampered Token...');
    const resTampered = await fetch(`${baseUrl}/api/admin/overview`, {
      headers: { Authorization: 'Bearer this-is-a-fake-random-tampered-token' }
    });
    assert(resTampered.status === 401, `Tampered token rejected with 401 Unauthorized (got: ${resTampered.status})`);

    // Test 6: Rejection of missing authorization
    console.log('\n6️⃣ Testing Rejection of Missing Authorization...');
    const resMissing = await fetch(`${baseUrl}/api/admin/overview`);
    assert(resMissing.status === 401, `Missing authorization rejected with 401 (got: ${resMissing.status})`);

    // Test 7: User token authorization boundary (User cannot access Admin routes)
    console.log('\n7️⃣ Testing Role Authorization Boundary...');
    const regularUserToken = signJwt({ username: 'client_guest', role: 'user' });
    const resForbidden = await fetch(`${baseUrl}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${regularUserToken}` }
    });
    assert(resForbidden.status === 403, `Non-admin user token rejected with 403 Forbidden (got: ${resForbidden.status})`);

    console.log('\n========================================================');
    console.log(`📊 AUTH TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================================\n');

    server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal auth test error:', err);
    if (server) server.close();
    process.exit(1);
  }
}

runAuthTests();
