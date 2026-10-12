import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { connectDb, pingDb, isDbConnected } from './connection.js';
import { getDb, saveDb } from './db.js';
import {
  Profile,
  Project,
  SkillCategory,
  Education,
  Message,
  Analytics,
  Admin,
  Media,
  User
} from './models/index.js';
import {
  uploadStream,
  deleteCloudinaryImage,
  getCloudinaryStatus,
  isCloudinaryConfigured,
  generateSignedUploadParams
} from './config/cloudinary.js';
import { uploadSingleImage } from './middleware/upload.js';
import { signJwt, verifyJwt } from './utils/jwt.js';
import bcrypt from 'bcryptjs';
import {
  sendPasswordResetEmail,
  sendContactNotificationToAdmin,
  sendAdminReplyToVisitor,
  sendTestEmail,
  verifySmtpConnection,
  getSmtpConfig
} from './services/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// In-memory rate limiting structures
const rateLimitStores = {
  login: new Map(),
  forgotPassword: new Map(),
  contact: new Map()
};

function checkRateLimit(type, key, maxAttempts, windowMs) {
  const now = Date.now();
  const store = rateLimitStores[type];
  if (!store) return { allowed: true };

  const record = store.get(key) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
    store.set(key, record);
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  record.count += 1;
  store.set(key, record);
  return { allowed: true, remaining: maxAttempts - record.count };
}


// Serve public static assets (including hero photos and project images)
app.use(express.static(path.join(__dirname, '../public')));

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: missing authorization header' });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const session = verifyJwt(token);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired session token' });
  }
  req.user = session;
  next();
}

export function optionalAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const session = verifyJwt(token);
    if (session) {
      req.user = session;
      return next();
    }
  }
  // Default to guest client user role
  req.user = {
    role: 'user',
    username: `client_${Date.now().toString(36)}`,
    id: 'guest'
  };
  next();
}

export function adminOnlyMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
  });
}

// Await DB connection for incoming API requests if MONGODB_URI is present
app.use('/api', async (req, res, next) => {
  if (!isDbConnected() && process.env.MONGODB_URI) {
    try {
      await connectDb();
    } catch (err) {
      // Continue to fallback handler
    }
  }
  next();
});

// HEALTH & CONNECTION VERIFICATION
app.get('/api/health', async (req, res) => {
  const ping = await pingDb();
  const cloudinaryStatus = getCloudinaryStatus();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongoDb: ping,
    database: ping,
    cloudinary: cloudinaryStatus
  });
});

// PUBLIC ENDPOINTS

// 1. Get full portfolio data
app.get('/api/portfolio', async (req, res) => {
  if (isDbConnected()) {
    try {
      const [profileDoc, projectsDocs, skillsDocs, eduDocs] = await Promise.all([
        Profile.findOne().lean(),
        Project.find().sort({ order: 1, createdAt: 1 }).lean(),
        SkillCategory.find().sort({ order: 1, createdAt: 1 }).lean(),
        Education.find().sort({ order: 1, createdAt: 1 }).lean()
      ]);

      if (profileDoc && projectsDocs && projectsDocs.length > 0) {
        const cleanProfile = (({ _id, __v, ...rest }) => rest)(profileDoc);
        const cleanProjects = projectsDocs.map(p => {
          const { _id, __v, ...rest } = p;
          return rest;
        });
        const cleanSkills = skillsDocs.map(s => {
          const { _id, __v, order, ...rest } = s;
          return rest;
        });
        const cleanEducation = eduDocs.map(e => {
          const { _id, __v, order, ...rest } = e;
          return rest;
        });

        return res.json({
          profile: cleanProfile,
          projects: cleanProjects,
          skills: cleanSkills,
          education: cleanEducation,
          source: 'mongodb-atlas'
        });
      }
    } catch (err) {
      console.warn('[MongoDB Query] Error in /api/portfolio, using local db fallback:', err.message);
    }
  }

  // Fallback to local JSON
  const db = getDb();
  res.json({
    profile: db.profile,
    projects: db.projects,
    skills: db.skills,
    education: db.education,
    source: 'local-fallback'
  });
});

// 2. Submit new message from contact form (with validation, anti-spam, & Gmail SMTP notification)
app.post('/api/messages', async (req, res) => {
  // Anti-spam honeypot protection: if hidden field is filled, silently ignore
  if (req.body.hp_website || req.body._hp) {
    return res.status(200).json({ success: true, message: 'Inquiry processed successfully.' });
  }

  // Rate Limiting (10 messages per 10 minutes per IP)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const rateLimit = checkRateLimit('contact', clientIp, 10, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: `Too many submissions. Please wait ${rateLimit.retryAfterSec} seconds before sending another message.`
    });
  }

  const { name, email, subject, message, imageUrl, imagePublicId } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Full name, email address, and message are required.' });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanSubject = String(subject || 'General Inquiry').trim();
  const cleanMessage = String(message).trim();

  // Rigorous validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (cleanName.length < 2 || cleanName.length > 100) {
    return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
  }

  if (cleanMessage.length < 5) {
    return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
  }

  if (cleanMessage.length > 4000) {
    return res.status(400).json({ error: 'Message cannot exceed 4000 characters.' });
  }

  const newMsg = {
    id: `msg-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
    imageUrl: imageUrl || '',
    imagePublicId: imagePublicId || '',
    date: new Date().toISOString(),
    read: false,
    starred: false,
    replied: false,
    notificationSent: false,
    notificationError: '',
    replies: []
  };

  // Attempt Gmail SMTP notification to Administrator
  try {
    const notifyRes = await sendContactNotificationToAdmin({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      id: newMsg.id
    });
    if (notifyRes?.sent) {
      newMsg.notificationSent = true;
    }
  } catch (emailErr) {
    console.warn('[Gmail SMTP Warning] Failed to send contact notification email:', emailErr.message);
    newMsg.notificationSent = false;
    newMsg.notificationError = emailErr.message;
  }

  let savedToMongo = false;

  // Persist to MongoDB Atlas if connected
  if (isDbConnected()) {
    try {
      await Message.create(newMsg);
      await Analytics.findOneAndUpdate(
        {},
        { $inc: { directInquiries: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      savedToMongo = true;
    } catch (err) {
      console.warn('[MongoDB Query] Failed to persist message to Atlas:', err.message);
    }
  }

  // Always keep local db.json in sync as persistent backup
  try {
    const db = getDb();
    if (!Array.isArray(db.messages)) db.messages = [];
    db.messages.unshift(newMsg);
    db.analytics = db.analytics || {};
    db.analytics.directInquiries = (db.analytics.directInquiries || 0) + 1;
    saveDb(db);
  } catch (e) {
    console.error('Backup save failed:', e);
  }

  res.status(201).json({
    success: true,
    message: 'Message delivered successfully.',
    data: newMsg,
    persistedToMongo: savedToMongo,
    notificationSent: newMsg.notificationSent
  });
});


// 3. Analytics ping
app.post('/api/analytics/ping', async (req, res) => {
  let totalVisits = 0;

  if (isDbConnected()) {
    try {
      const updated = await Analytics.findOneAndUpdate(
        {},
        { $inc: { totalVisits: 1, pageViews: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      if (updated) {
        totalVisits = updated.totalVisits;
      }
    } catch (err) {
      console.warn('[MongoDB Query] Analytics ping error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.analytics.totalVisits = (db.analytics.totalVisits || 0) + 1;
    db.analytics.pageViews = (db.analytics.pageViews || 0) + 1;
    saveDb(db);
    if (!totalVisits) totalVisits = db.analytics.totalVisits;
  } catch (e) {}

  res.json({ success: true, totalVisits });
});

// AUTHENTICATION ROUTES

// Admin Login (Secure Bcrypt & Rate-Limited)
app.post('/api/admin/login', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  // Rate limit: 5 attempts per 15 minutes
  const rateLimit = checkRateLimit('login', clientIp, 5, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: `Too many failed login attempts. Account temporarily locked for security. Please try again in ${rateLimit.retryAfterSec} seconds.`
    });
  }

  const { username, password, rememberMe } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const cleanUsername = String(username).trim();
  let adminUser = null;

  if (isDbConnected()) {
    try {
      // Find admin matching target username or vanojanSE
      adminUser = await Admin.findOne({
        $or: [
          { username: cleanUsername },
          { username: new RegExp(`^${cleanUsername}$`, 'i') }
        ]
      }).lean();
    } catch (err) {
      console.warn('[MongoDB Query] Admin check error:', err.message);
    }
  }

  const db = getDb();
  const fallbackAdmin = db.admin || { username: 'vanojanSE', passwordHash: '' };

  const targetAdmin = adminUser || (cleanUsername.toLowerCase() === fallbackAdmin.username.toLowerCase() ? fallbackAdmin : null);

  if (!targetAdmin) {
    return res.status(401).json({ error: 'Invalid administrative credentials.' });
  }

  let isMatch = false;
  // 1. Verify using bcrypt if passwordHash starts with $2
  if (targetAdmin.passwordHash && targetAdmin.passwordHash.startsWith('$2')) {
    isMatch = await bcrypt.compare(password, targetAdmin.passwordHash);
  } else if (targetAdmin.passwordHash) {
    // Legacy migration support if hash was stored as plain/legacy string
    if (password === targetAdmin.passwordHash) {
      isMatch = true;
      // Auto-migrate to secure bcrypt
      try {
        const newSalt = await bcrypt.genSalt(12);
        const newHash = await bcrypt.hash(password, newSalt);
        if (isDbConnected()) {
          await Admin.updateOne({ username: targetAdmin.username }, { $set: { passwordHash: newHash } });
        }
        db.admin.passwordHash = newHash;
        saveDb(db);
      } catch (mErr) {}
    }
  }

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid administrative credentials.' });
  }

  // Clear rate limiter upon successful login
  rateLimitStores.login.delete(clientIp);

  const token = signJwt(
    {
      username: targetAdmin.username,
      email: targetAdmin.email || 'uthayanvanojan5@gmail.com',
      role: 'admin'
    },
    rememberMe ? '30d' : '24h'
  );

  return res.json({
    success: true,
    token,
    user: {
      username: targetAdmin.username,
      email: targetAdmin.email || 'uthayanvanojan5@gmail.com',
      role: 'admin'
    }
  });
});

// Admin Forgot Password Request (Dispatches Gmail SMTP reset token)
app.post('/api/admin/forgot-password', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  // Rate limit: 3 requests per 15 minutes
  const rateLimit = checkRateLimit('forgotPassword', clientIp, 3, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: `Too many password reset requests. Please wait ${rateLimit.retryAfterSec} seconds before trying again.`
    });
  }

  const { email } = req.body;
  const cleanEmail = String(email || '').trim().toLowerCase();

  // Generate cryptographically secure 32-byte reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
  const tokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes validity

  let adminFound = null;

  if (isDbConnected()) {
    try {
      // Find admin
      adminFound = await Admin.findOne({
        $or: [
          { email: cleanEmail },
          { username: 'vanojanSE' },
          { username: 'admin' }
        ]
      });

      if (adminFound) {
        adminFound.resetPasswordTokenHash = tokenHash;
        adminFound.resetPasswordExpires = tokenExpires;
        await adminFound.save();
      }
    } catch (err) {
      console.warn('[MongoDB Query] Forgot password error:', err.message);
    }
  }

  // Dispatch email notification via Gmail SMTP
  const targetRecipient = adminFound?.email || cleanEmail || 'uthayanvanojan5@gmail.com';
  let emailDeliveryResult = null;
  try {
    emailDeliveryResult = await sendPasswordResetEmail({
      resetToken,
      toEmail: targetRecipient
    });
  } catch (smtpErr) {
    console.warn('[Gmail SMTP Error] Forgot password email dispatch failed:', smtpErr.message);
  }

  // Always return a generic success message to prevent account enumeration
  res.json({
    success: true,
    message: 'If an authorized administrator account exists for this address, a secure password reset link has been dispatched.',
    delivered: Boolean(emailDeliveryResult?.sent)
  });
});

// Admin Reset Password Validation & Execution
app.post('/api/admin/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Reset token and new password are required.' });
  }

  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  const tokenHash = crypto.createHash('sha256').update(String(token).trim()).digest('hex');

  let admin = null;

  if (isDbConnected()) {
    try {
      admin = await Admin.findOne({
        resetPasswordTokenHash: tokenHash,
        resetPasswordExpires: { $gt: new Date() }
      });
    } catch (err) {
      console.warn('[MongoDB Query] Reset password lookup error:', err.message);
    }
  }

  if (!admin) {
    return res.status(400).json({
      error: 'Password reset link is invalid or has expired. Please request a new link.'
    });
  }

  try {
    // Generate new bcrypt hash with 12 rounds
    const salt = await bcrypt.genSalt(12);
    const newHash = await bcrypt.hash(newPassword, salt);

    admin.passwordHash = newHash;
    admin.resetPasswordTokenHash = null;
    admin.resetPasswordExpires = null;
    admin.failedLoginAttempts = 0;
    admin.lockUntil = null;
    await admin.save();

    // Sync db.json backup
    try {
      const db = getDb();
      if (!db.admin) db.admin = {};
      db.admin.username = admin.username;
      db.admin.passwordHash = newHash;
      saveDb(db);
    } catch (bErr) {}

    res.json({
      success: true,
      message: 'Your administrator password has been updated successfully. Please log in with your new credentials.'
    });
  } catch (err) {
    console.error('[Reset Password Error]:', err);
    res.status(500).json({ error: 'Failed to update password. Please try again.' });
  }
});

// Authenticated Password Change
app.post('/api/admin/change-password', adminOnlyMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  let admin = null;
  if (isDbConnected()) {
    try {
      admin = await Admin.findOne({ username: req.user.username });
    } catch (e) {}
  }

  const db = getDb();
  const currentHash = admin?.passwordHash || db.admin?.passwordHash;

  let isMatch = false;
  if (currentHash && currentHash.startsWith('$2')) {
    isMatch = await bcrypt.compare(currentPassword, currentHash);
  } else if (currentHash && currentPassword === currentHash) {
    isMatch = true;
  }

  if (!isMatch) {
    return res.status(401).json({ error: 'Current password is incorrect.' });
  }

  const salt = await bcrypt.genSalt(12);
  const newHash = await bcrypt.hash(newPassword, salt);

  if (admin) {
    admin.passwordHash = newHash;
    await admin.save();
  }

  try {
    db.admin = db.admin || {};
    db.admin.passwordHash = newHash;
    saveDb(db);
  } catch (e) {}

  res.json({ success: true, message: 'Password changed successfully.' });
});


// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ error: 'Database service currently unavailable. Please try again later.' });
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ username: cleanUsername }, { email: cleanEmail }]
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already in use' });
    }

    const salt = crypto.randomBytes(8).toString('hex');
    const passwordHash = `${salt}:${crypto.scryptSync(password, salt, 32).toString('hex')}`;

    const newUser = await User.create({
      username: cleanUsername,
      email: cleanEmail,
      passwordHash,
      role: 'user'
    });

    const token = signJwt({
      id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role || 'user'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('[API /api/auth/register error]:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ error: 'Database service currently unavailable' });
    }

    const cleanIdentifier = username.trim();
    const user = await User.findOne({
      $or: [{ username: cleanIdentifier }, { email: cleanIdentifier.toLowerCase() }]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid user credentials' });
    }

    const [salt, hash] = user.passwordHash.split(':');
    const inputHash = crypto.scryptSync(password, salt, 32).toString('hex');
    if (inputHash !== hash) {
      return res.status(401).json({ error: 'Invalid user credentials' });
    }

    const token = signJwt({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role || 'user'
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (err) {
    console.error('[API /api/auth/login error]:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Explicit Token & Session Verification Endpoint
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({
    valid: true,
    user: {
      username: req.user.username,
      role: req.user.role,
      id: req.user.id || req.user._id
    }
  });
});

// Get Current Auth Profile
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// CLOUDINARY & MEDIA MANAGEMENT ROUTES

// Cloudinary Configuration Status (Safe for public inspection)
app.get('/api/cloudinary/status', (req, res) => {
  res.json(getCloudinaryStatus());
});

// Cloudinary Upload Signature (Server-side signed parameters)
app.post('/api/cloudinary/sign', authMiddleware, (req, res) => {
  try {
    const params = generateSignedUploadParams(req.body || {});
    res.json({ success: true, ...params });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Universal Secure Image Upload (Supports Admin, Authenticated Users, & Client Attachments)
app.post('/api/upload', optionalAuthMiddleware, uploadSingleImage(['file', 'image']), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      error: 'Cloudinary storage is not configured. Please ensure CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set in environment variables.'
    });
  }

  const requestedTag = req.body.tag || req.query.tag || 'general';
  // Non-admins can only upload user_upload or avatar
  const tag = req.user.role === 'admin' 
    ? requestedTag 
    : (requestedTag === 'avatar' ? 'avatar' : 'user_upload');
  const folder = req.user.role === 'admin' 
    ? `vanojan_portfolio/${tag}` 
    : `vanojan_portfolio/users/${req.user.username}`;

  try {
    // If replacePublicId is specified, remove the previous image
    if (req.body.replacePublicId) {
      try {
        await deleteCloudinaryImage(req.body.replacePublicId);
        if (isDbConnected()) {
          await Media.deleteOne({ public_id: req.body.replacePublicId });
        }
      } catch (repErr) {
        console.warn('[Image Replacement Warning]:', repErr.message);
      }
    }

    const uploadResult = await uploadStream(req.file.buffer, {
      folder,
      tags: [tag, req.user.role, req.user.username],
      context: `uploader=${req.user.username}|role=${req.user.role}`
    });

    let savedMedia = null;
    if (isDbConnected()) {
      try {
        savedMedia = await Media.create({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          width: uploadResult.width,
          height: uploadResult.height,
          tag,
          uploaderRole: req.user.role,
          uploaderId: req.user.username,
          originalFilename: req.file.originalname,
          associatedId: req.body.associatedId || ''
        });

        // Admin auto-association updates
        if (req.user.role === 'admin') {
          if (tag === 'profile_hero') {
            await Profile.findOneAndUpdate(
              {},
              { heroImage: uploadResult.secure_url, heroImagePublicId: uploadResult.public_id },
              { upsert: true }
            );
          } else if (tag === 'profile_about') {
            await Profile.findOneAndUpdate(
              {},
              { aboutImage: uploadResult.secure_url, aboutImagePublicId: uploadResult.public_id },
              { upsert: true }
            );
          } else if (tag === 'project' && req.body.projectId) {
            await Project.findOneAndUpdate(
              { id: req.body.projectId },
              { image: uploadResult.secure_url, imagePublicId: uploadResult.public_id }
            );
          }
        } else if (tag === 'avatar') {
          await User.findOneAndUpdate(
            { username: req.user.username },
            { avatar: uploadResult.secure_url, avatarPublicId: uploadResult.public_id }
          );
        }
      } catch (dbErr) {
        console.warn('[MongoDB Atlas] Could not save media metadata:', dbErr.message);
      }
    }

    res.status(201).json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      media: savedMedia
    });
  } catch (err) {
    console.error('[Cloudinary Upload Error]:', err);
    res.status(500).json({ error: `Upload failed: ${err.message}` });
  }
});

// List Uploaded Media
app.get('/api/media', authMiddleware, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json([]);
    }
    const filter = req.user.role === 'admin'
      ? {}
      : { uploaderId: req.user.username };

    if (req.query.tag) {
      filter.tag = req.query.tag;
    }

    const items = await Media.find(filter).sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    console.error('[API /api/media error]:', err);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Delete Media (Synchronized from Cloudinary & MongoDB Atlas)
app.delete('/api/media/:publicId(*)', authMiddleware, async (req, res) => {
  const publicId = req.params.publicId;

  if (!publicId) {
    return res.status(400).json({ error: 'Missing publicId' });
  }

  try {
    let mediaDoc = null;
    if (isDbConnected()) {
      mediaDoc = await Media.findOne({ public_id: publicId });
    }

    // Permission check: admins can delete any; users only their own
    if (mediaDoc && req.user.role !== 'admin' && mediaDoc.uploaderId !== req.user.username) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own uploaded images' });
    }

    // Delete from Cloudinary
    if (isCloudinaryConfigured()) {
      try {
        await deleteCloudinaryImage(publicId);
      } catch (cloudErr) {
        console.warn('[Cloudinary Delete Warning]:', cloudErr.message);
      }
    }

    // Delete from MongoDB Atlas
    if (isDbConnected()) {
      await Media.deleteOne({ public_id: publicId });
    }

    res.json({ success: true, message: 'Image deleted successfully', public_id: publicId });
  } catch (err) {
    console.error('[Delete Media Error]:', err);
    res.status(500).json({ error: `Delete failed: ${err.message}` });
  }
});

// ADMIN PROTECTED ROUTES

// Admin Overview
app.get('/api/admin/overview', adminOnlyMiddleware, async (req, res) => {
  if (isDbConnected()) {
    try {
      const [analyticsDoc, totalMessages, unreadMessages, totalProjects, totalMedia, recentMessagesDocs] = await Promise.all([
        Analytics.findOne().lean(),
        Message.countDocuments(),
        Message.countDocuments({ read: false }),
        Project.countDocuments(),
        Media.countDocuments(),
        Message.find().sort({ date: -1 }).limit(5).lean()
      ]);

      const db = getDb();
      const analytics = analyticsDoc ? (({ _id, __v, ...rest }) => rest)(analyticsDoc) : db.analytics;
      const recentMessages = (recentMessagesDocs && recentMessagesDocs.length > 0)
        ? recentMessagesDocs.map(m => {
            const { _id, __v, ...rest } = m;
            return rest;
          })
        : db.messages.slice(0, 5);

      return res.json({
        analytics,
        totalMessages: totalMessages || db.messages.length,
        unreadMessages: unreadMessages !== undefined ? unreadMessages : db.messages.filter(m => !m.read).length,
        totalProjects: totalProjects || db.projects.length,
        totalMedia: totalMedia || 0,
        recentMessages
      });
    } catch (err) {
      console.warn('[MongoDB Query] Admin overview error:', err.message);
    }
  }

  const db = getDb();
  res.json({
    analytics: db.analytics,
    totalMessages: db.messages.length,
    unreadMessages: db.messages.filter(m => !m.read).length,
    totalProjects: db.projects.length,
    totalMedia: 0,
    recentMessages: db.messages.slice(0, 5)
  });
});

// Admin Messages CRUD
app.get('/api/admin/messages', adminOnlyMiddleware, async (req, res) => {
  if (isDbConnected()) {
    try {
      const messagesDocs = await Message.find().sort({ date: -1 }).lean();
      if (messagesDocs && messagesDocs.length > 0) {
        return res.json(messagesDocs.map(m => {
          const { _id, __v, ...rest } = m;
          return rest;
        }));
      }
    } catch (err) {
      console.warn('[MongoDB Query] Admin messages error:', err.message);
    }
  }

  const db = getDb();
  res.json(db.messages);
});

app.patch('/api/admin/messages/:id', adminOnlyMiddleware, async (req, res) => {
  const { id } = req.params;
  const update = {};
  if (req.body.read !== undefined) update.read = Boolean(req.body.read);
  if (req.body.starred !== undefined) update.starred = Boolean(req.body.starred);

  let updatedMsg = null;

  if (isDbConnected()) {
    try {
      const updated = await Message.findOneAndUpdate({ id }, update, { returnDocument: 'after' }).lean();
      if (updated) {
        const { _id, __v, ...cleanMsg } = updated;
        updatedMsg = cleanMsg;
      }
    } catch (err) {
      console.warn('[MongoDB Query] Message patch error:', err.message);
    }
  }

  // Backup sync & fallback
  const db = getDb();
  const localMsg = db.messages.find(m => m.id === id);
  if (!updatedMsg && !localMsg) {
    return res.status(404).json({ error: 'Message not found' });
  }

  if (localMsg) {
    if (update.read !== undefined) localMsg.read = update.read;
    if (update.starred !== undefined) localMsg.starred = update.starred;
    saveDb(db);
    if (!updatedMsg) updatedMsg = localMsg;
  }

  res.json({ success: true, message: updatedMsg });
});

app.delete('/api/admin/messages/:id', adminOnlyMiddleware, async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      await Message.deleteOne({ id });
    } catch (err) {
      console.warn('[MongoDB Query] Message delete error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.messages = db.messages.filter(m => m.id !== id);
    saveDb(db);
  } catch (e) {}

  res.json({ success: true, id });
});

// Admin Email Reply System (Dispatches authenticated reply via Gmail SMTP)
app.post('/api/admin/messages/:id/reply', adminOnlyMiddleware, async (req, res) => {
  const { id } = req.params;
  const { subject, reply } = req.body;

  if (!reply || !String(reply).trim()) {
    return res.status(400).json({ error: 'Reply message body cannot be empty.' });
  }

  let originalMessage = null;

  if (isDbConnected()) {
    try {
      originalMessage = await Message.findOne({ id });
    } catch (err) {
      console.warn('[MongoDB Query] Find message error:', err.message);
    }
  }

  const db = getDb();
  if (!originalMessage) {
    originalMessage = (db.messages || []).find(m => m.id === id);
  }

  if (!originalMessage) {
    return res.status(404).json({ error: 'Original message inquiry not found.' });
  }

  // Never trust recipient provided by frontend; use stored database email
  const recipientEmail = originalMessage.email;
  const recipientName = originalMessage.name;
  const cleanSubject = subject ? String(subject).trim() : `Re: Response to inquiry — ${originalMessage.subject || 'Portfolio Inquiry'}`;
  const cleanReply = String(reply).trim();

  const newReplyRecord = {
    id: `rep-${Date.now()}`,
    subject: cleanSubject,
    message: cleanReply,
    sentAt: new Date().toISOString(),
    status: 'pending',
    error: ''
  };

  try {
    const sendResult = await sendAdminReplyToVisitor({
      recipientEmail,
      recipientName,
      replySubject: cleanSubject,
      replyBody: cleanReply,
      originalMessage: originalMessage.message
    });

    newReplyRecord.status = 'sent';
    newReplyRecord.messageId = sendResult?.messageId || '';

    // Update MongoDB
    if (isDbConnected()) {
      try {
        await Message.findOneAndUpdate(
          { id },
          {
            $set: { replied: true },
            $push: { replies: newReplyRecord }
          }
        );
      } catch (dbErr) {
        console.warn('[MongoDB Atlas] Could not update reply in DB:', dbErr.message);
      }
    }

    // Sync backup db.json
    try {
      const localMsg = (db.messages || []).find(m => m.id === id);
      if (localMsg) {
        localMsg.replied = true;
        if (!Array.isArray(localMsg.replies)) localMsg.replies = [];
        localMsg.replies.push(newReplyRecord);
        saveDb(db);
      }
    } catch (e) {}

    res.json({
      success: true,
      message: `Reply successfully delivered to ${recipientEmail}`,
      reply: newReplyRecord
    });
  } catch (smtpErr) {
    console.error('[Gmail SMTP Error] Admin reply failed:', smtpErr);
    newReplyRecord.status = 'failed';
    newReplyRecord.error = smtpErr.message;

    return res.status(502).json({
      error: `Failed to dispatch reply via Gmail SMTP: ${smtpErr.message}. Original message has not been marked as replied.`
    });
  }
});

// EMAIL SETTINGS & DIAGNOSTIC ENDPOINTS
app.get('/api/admin/email/status', adminOnlyMiddleware, async (req, res) => {
  try {
    const status = await verifySmtpConnection();
    res.json({ success: true, ...status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/email/test', adminOnlyMiddleware, async (req, res) => {
  try {
    const target = req.body.targetEmail || null;
    const result = await sendTestEmail(target);
    res.json({
      success: true,
      message: `Diagnostic test email dispatched successfully to ${result.recipient}`,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: `Diagnostic email dispatch failed: ${err.message}` });
  }
});

// CLOUDINARY PROJECT GALLERY MANAGEMENT ROUTES
// 1. Upload or Attach image to project gallery
app.post('/api/admin/projects/:id/gallery', adminOnlyMiddleware, uploadSingleImage(['file', 'image']), async (req, res) => {
  const { id } = req.params;
  let public_id = req.body.public_id;
  let url = req.body.url;
  const caption = req.body.caption || '';
  const description = req.body.description || '';
  const isCover = req.body.isCover === 'true' || req.body.isCover === true;

  // If a file was directly uploaded in this multipart request, send to Cloudinary
  if (req.file) {
    if (!isCloudinaryConfigured()) {
      return res.status(503).json({ error: 'Cloudinary storage is not configured.' });
    }
    try {
      const uploadRes = await uploadStream(req.file.buffer, {
        folder: `vanojan_portfolio/projects/${id}`,
        tags: ['project_gallery', id]
      });
      url = uploadRes.secure_url;
      public_id = uploadRes.public_id;
    } catch (cErr) {
      return res.status(500).json({ error: `Cloudinary gallery upload failed: ${cErr.message}` });
    }
  }

  if (!url) {
    return res.status(400).json({ error: 'Image file or existing image URL is required.' });
  }

  const newGalleryItem = {
    id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    public_id: public_id || '',
    url,
    caption: String(caption).trim(),
    description: String(description).trim(),
    isCover,
    order: 0,
    createdAt: new Date().toISOString()
  };

  let updatedProj = null;

  if (isDbConnected()) {
    try {
      const projDoc = await Project.findOne({ id });
      if (projDoc) {
        if (!Array.isArray(projDoc.gallery)) projDoc.gallery = [];
        newGalleryItem.order = projDoc.gallery.length;
        if (isCover) {
          projDoc.gallery.forEach(item => { item.isCover = false; });
          projDoc.image = url;
          if (public_id) projDoc.imagePublicId = public_id;
        }
        projDoc.gallery.push(newGalleryItem);
        await projDoc.save();
        updatedProj = projDoc.toObject();
      }
    } catch (err) {
      console.warn('[MongoDB Atlas] Project gallery push error:', err.message);
    }
  }

  // Backup sync
  const db = getDb();
  const localIndex = (db.projects || []).findIndex(p => p.id === id);
  if (localIndex !== -1) {
    const p = db.projects[localIndex];
    if (!Array.isArray(p.gallery)) p.gallery = [];
    newGalleryItem.order = p.gallery.length;
    if (isCover) {
      p.gallery.forEach(item => { item.isCover = false; });
      p.image = url;
      if (public_id) p.imagePublicId = public_id;
    }
    p.gallery.push(newGalleryItem);
    saveDb(db);
    if (!updatedProj) updatedProj = p;
  }

  if (!updatedProj) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  res.status(201).json({
    success: true,
    item: newGalleryItem,
    project: updatedProj
  });
});

// 2. Delete image from project gallery
app.delete('/api/admin/projects/:id/gallery/:imageId', adminOnlyMiddleware, async (req, res) => {
  const { id, imageId } = req.params;

  let itemToDelete = null;

  if (isDbConnected()) {
    try {
      const proj = await Project.findOne({ id });
      if (proj && Array.isArray(proj.gallery)) {
        itemToDelete = proj.gallery.find(item => item.id === imageId || item.public_id === imageId);
        proj.gallery = proj.gallery.filter(item => item.id !== imageId && item.public_id !== imageId);
        await proj.save();
      }
    } catch (err) {
      console.warn('[MongoDB Atlas] Gallery delete error:', err.message);
    }
  }

  // Sync db.json
  const db = getDb();
  const localProj = (db.projects || []).find(p => p.id === id);
  if (localProj && Array.isArray(localProj.gallery)) {
    if (!itemToDelete) {
      itemToDelete = localProj.gallery.find(item => item.id === imageId || item.public_id === imageId);
    }
    localProj.gallery = localProj.gallery.filter(item => item.id !== imageId && item.public_id !== imageId);
    saveDb(db);
  }

  // If item had a Cloudinary public ID, remove from Cloudinary
  if (itemToDelete && itemToDelete.public_id && isCloudinaryConfigured()) {
    try {
      await deleteCloudinaryImage(itemToDelete.public_id);
      if (isDbConnected()) {
        await Media.deleteOne({ public_id: itemToDelete.public_id });
      }
    } catch (cErr) {
      console.warn('[Cloudinary Delete Warning]:', cErr.message);
    }
  }

  res.json({ success: true, message: 'Gallery image removed successfully.', imageId });
});

// 3. Reorder or Update Gallery item attributes (captions, set as cover)
app.patch('/api/admin/projects/:id/gallery', adminOnlyMiddleware, async (req, res) => {
  const { id } = req.params;
  const { items, setCoverId, updateItem } = req.body;

  let updatedProj = null;

  if (isDbConnected()) {
    try {
      const proj = await Project.findOne({ id });
      if (proj) {
        if (!Array.isArray(proj.gallery)) proj.gallery = [];

        // Case A: Full list reordering
        if (Array.isArray(items)) {
          proj.gallery = items;
        }

        // Case B: Set cover image
        if (setCoverId) {
          proj.gallery.forEach(item => {
            if (item.id === setCoverId || item.public_id === setCoverId) {
              item.isCover = true;
              proj.image = item.url;
              if (item.public_id) proj.imagePublicId = item.public_id;
            } else {
              item.isCover = false;
            }
          });
        }

        // Case C: Update single item caption / description
        if (updateItem && updateItem.id) {
          const target = proj.gallery.find(item => item.id === updateItem.id);
          if (target) {
            if (updateItem.caption !== undefined) target.caption = updateItem.caption;
            if (updateItem.description !== undefined) target.description = updateItem.description;
          }
        }

        await proj.save();
        updatedProj = proj.toObject();
      }
    } catch (err) {
      console.warn('[MongoDB Atlas] Gallery patch error:', err.message);
    }
  }

  // Backup sync
  const db = getDb();
  const p = (db.projects || []).find(item => item.id === id);
  if (p) {
    if (!Array.isArray(p.gallery)) p.gallery = [];
    if (Array.isArray(items)) p.gallery = items;
    if (setCoverId) {
      p.gallery.forEach(item => {
        if (item.id === setCoverId || item.public_id === setCoverId) {
          item.isCover = true;
          p.image = item.url;
          if (item.public_id) p.imagePublicId = item.public_id;
        } else {
          item.isCover = false;
        }
      });
    }
    if (updateItem && updateItem.id) {
      const target = p.gallery.find(item => item.id === updateItem.id);
      if (target) {
        if (updateItem.caption !== undefined) target.caption = updateItem.caption;
        if (updateItem.description !== undefined) target.description = updateItem.description;
      }
    }
    saveDb(db);
    if (!updatedProj) updatedProj = p;
  }

  res.json({ success: true, project: updatedProj });
});

// Admin Education / Timeline CRUD
app.put('/api/admin/education', adminOnlyMiddleware, async (req, res) => {
  if (!Array.isArray(req.body.education)) {
    return res.status(400).json({ error: 'Invalid education format' });
  }

  if (isDbConnected()) {
    try {
      await Education.deleteMany({});
      const eduToInsert = req.body.education.map((e, idx) => ({
        ...e,
        order: idx
      }));
      await Education.insertMany(eduToInsert);
    } catch (err) {
      console.warn('[MongoDB Query] Education update error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.education = req.body.education;
    saveDb(db);
  } catch (e) {}

  res.json({ success: true, education: req.body.education });
});

// Admin Projects CRUD
app.post('/api/admin/projects', adminOnlyMiddleware, async (req, res) => {

  const project = {
    id: req.body.id || `project-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'Engineering',
    subtitle: req.body.subtitle || '',
    description: req.body.description || '',
    techStack: Array.isArray(req.body.techStack) ? req.body.techStack : [],
    featured: Boolean(req.body.featured),
    image: req.body.image || '/hero/project-default.jpg',
    imagePublicId: req.body.imagePublicId || '',
    gradient: req.body.gradient || 'from-blue-600/30 to-amber-900/30',
    liveUrl: req.body.liveUrl || '',
    githubUrl: req.body.githubUrl || '',
    highlights: Array.isArray(req.body.highlights) ? req.body.highlights : [],
    deliverables: Array.isArray(req.body.deliverables) ? req.body.deliverables : []
  };

  if (isDbConnected()) {
    try {
      const count = await Project.countDocuments();
      project.order = count;
      await Project.create(project);
    } catch (err) {
      console.warn('[MongoDB Query] Project create error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.projects.push(project);
    saveDb(db);
  } catch (e) {}

  res.status(201).json({ success: true, project });
});

app.put('/api/admin/projects/:id', adminOnlyMiddleware, async (req, res) => {
  const { id } = req.params;
  let updatedProject = null;

  if (isDbConnected()) {
    try {
      const updated = await Project.findOneAndUpdate(
        { id },
        { $set: req.body },
        { returnDocument: 'after' }
      ).lean();
      if (updated) {
        const { _id, __v, ...cleanProject } = updated;
        updatedProject = cleanProject;
      }
    } catch (err) {
      console.warn('[MongoDB Query] Project update error:', err.message);
    }
  }

  // Backup sync & fallback
  const db = getDb();
  const index = db.projects.findIndex(p => p.id === id);
  if (!updatedProject && index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...req.body };
    saveDb(db);
    if (!updatedProject) updatedProject = db.projects[index];
  }

  res.json({ success: true, project: updatedProject });
});

app.delete('/api/admin/projects/:id', adminOnlyMiddleware, async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      // Find project to clean up Cloudinary asset if associated
      const proj = await Project.findOne({ id });
      if (proj && proj.imagePublicId && isCloudinaryConfigured()) {
        try {
          await deleteCloudinaryImage(proj.imagePublicId);
          await Media.deleteOne({ public_id: proj.imagePublicId });
        } catch (cErr) {}
      }
      await Project.deleteOne({ id });
    } catch (err) {
      console.warn('[MongoDB Query] Project delete error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.projects = db.projects.filter(p => p.id !== id);
    saveDb(db);
  } catch (e) {}

  res.json({ success: true, id });
});

// Admin Profile Update
app.put('/api/admin/profile', adminOnlyMiddleware, async (req, res) => {
  let updatedProfile = null;

  if (isDbConnected()) {
    try {
      const updated = await Profile.findOneAndUpdate(
        {},
        { $set: req.body },
        { upsert: true, returnDocument: 'after' }
      ).lean();
      if (updated) {
        updatedProfile = (({ _id, __v, ...rest }) => rest)(updated);
      }
    } catch (err) {
      console.warn('[MongoDB Query] Profile update error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.profile = { ...db.profile, ...req.body };
    saveDb(db);
    if (!updatedProfile) updatedProfile = db.profile;
  } catch (e) {}

  res.json({ success: true, profile: updatedProfile });
});

// Admin Skills Update
app.put('/api/admin/skills', adminOnlyMiddleware, async (req, res) => {
  if (!Array.isArray(req.body.skills)) {
    return res.status(400).json({ error: 'Invalid skills format' });
  }

  if (isDbConnected()) {
    try {
      await SkillCategory.deleteMany({});
      const skillsToInsert = req.body.skills.map((s, idx) => ({
        ...s,
        order: idx
      }));
      await SkillCategory.insertMany(skillsToInsert);
    } catch (err) {
      console.warn('[MongoDB Query] Skills update error:', err.message);
    }
  }

  // Backup sync
  try {
    const db = getDb();
    db.skills = req.body.skills;
    saveDb(db);
  } catch (e) {}

  res.json({ success: true, skills: req.body.skills });
});

// Serve production frontend if built
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA client routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('Not Found');
    }
  });
});

export default app;
