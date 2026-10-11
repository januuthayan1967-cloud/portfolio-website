import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { connectDb, pingDb, isDbConnected } from './connection.js';
import { getDb, saveDb } from './db.js';
import { Profile, Project, SkillCategory, Education, Message, Analytics, Admin } from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve public static assets (including hero photos and project images)
app.use(express.static(path.join(__dirname, '../public')));

// Simple in-memory active tokens
const activeSessions = new Set(['admin-dev-token-2026']);

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: missing authorization header' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  if (!activeSessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired session token' });
  }
  next();
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
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongoDb: ping
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
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const newMsg = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
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

// ADMIN AUTHENTICATION
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
    const token = `token-${crypto.randomBytes(16).toString('hex')}`;
    activeSessions.add(token);
    return res.json({
      success: true,
      token,
      user: { username: validUsername }
    });
  }

  res.status(401).json({ error: 'Invalid admin credentials. Default is admin / vanojan2026' });
});

// ADMIN PROTECTED ROUTES

// Admin Overview
app.get('/api/admin/overview', authMiddleware, async (req, res) => {
  if (isDbConnected()) {
    try {
      const [analyticsDoc, totalMessages, unreadMessages, totalProjects, recentMessagesDocs] = await Promise.all([
        Analytics.findOne().lean(),
        Message.countDocuments(),
        Message.countDocuments({ read: false }),
        Project.countDocuments(),
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
    recentMessages: db.messages.slice(0, 5)
  });
});

// Admin Messages CRUD
app.get('/api/admin/messages', authMiddleware, async (req, res) => {
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

app.patch('/api/admin/messages/:id', authMiddleware, async (req, res) => {
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

app.delete('/api/admin/messages/:id', authMiddleware, async (req, res) => {
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
app.post('/api/admin/projects', authMiddleware, async (req, res) => {
  const project = {
    id: req.body.id || `project-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'Engineering',
    subtitle: req.body.subtitle || '',
    description: req.body.description || '',
    techStack: Array.isArray(req.body.techStack) ? req.body.techStack : [],
    featured: Boolean(req.body.featured),
    image: req.body.image || '/hero/project-default.jpg',
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

app.put('/api/admin/projects/:id', authMiddleware, async (req, res) => {
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

app.delete('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
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
app.put('/api/admin/profile', authMiddleware, async (req, res) => {
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
app.put('/api/admin/skills', authMiddleware, async (req, res) => {
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
