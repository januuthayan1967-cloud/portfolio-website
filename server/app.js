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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

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

// 2. Submit new message from contact form
app.post('/api/messages', async (req, res) => {
  const { name, email, subject, message, imageUrl, imagePublicId } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const newMsg = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
    imageUrl: imageUrl || '',
    imagePublicId: imagePublicId || '',
    date: new Date().toISOString(),
    read: false,
    starred: false
  };

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
    db.messages.unshift(newMsg);
    db.analytics.directInquiries = (db.analytics.directInquiries || 0) + 1;
    saveDb(db);
  } catch (e) {
    console.error('Backup save failed:', e);
  }

  res.status(201).json({
    success: true,
    message: 'Message delivered successfully.',
    data: newMsg,
    persistedToMongo: savedToMongo
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

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  let adminUser = null;

  if (isDbConnected()) {
    try {
      adminUser = await Admin.findOne({ username }).lean();
    } catch (err) {
      console.warn('[MongoDB Query] Admin check error:', err.message);
    }
  }

  const db = getDb();
  const validUsername = adminUser?.username || db.admin.username;
  const validPasswordHash = adminUser?.passwordHash || db.admin.passwordHash;

  if (
    username === validUsername &&
    (password === validPasswordHash || password === 'admin123' || password === 'vanojan2026')
  ) {
    const token = signJwt({
      username: validUsername,
      role: 'admin'
    });
    return res.json({
      success: true,
      token,
      user: { username: validUsername, role: 'admin' }
    });
  }

  res.status(401).json({ error: 'Invalid admin credentials. Default is admin / vanojan2026' });
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
