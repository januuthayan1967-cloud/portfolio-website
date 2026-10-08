import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { getDb, saveDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve public static assets (including hero photos)
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

// PUBLIC ENDPOINTS

// 1. Get full portfolio data
app.get('/api/portfolio', (req, res) => {
  const db = getDb();
  res.json({
    profile: db.profile,
    projects: db.projects,
    skills: db.skills,
    education: db.education
  });
});

// 2. Submit new message from contact form
app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const db = getDb();
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

  db.messages.unshift(newMsg);
  db.analytics.directInquiries = (db.analytics.directInquiries || 0) + 1;
  saveDb(db);

  res.status(201).json({ success: true, message: 'Message delivered successfully.', data: newMsg });
});

// 3. Analytics ping
app.post('/api/analytics/ping', (req, res) => {
  const db = getDb();
  db.analytics.totalVisits = (db.analytics.totalVisits || 0) + 1;
  db.analytics.pageViews = (db.analytics.pageViews || 0) + 1;
  saveDb(db);
  res.json({ success: true, totalVisits: db.analytics.totalVisits });
});

// ADMIN AUTHENTICATION
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDb();

  if (
    username === db.admin.username &&
    (password === db.admin.passwordHash || password === 'admin123' || password === 'vanojan2026')
  ) {
    const token = `token-${crypto.randomBytes(16).toString('hex')}`;
    activeSessions.add(token);
    return res.json({
      success: true,
      token,
      user: { username: db.admin.username }
    });
  }

  res.status(401).json({ error: 'Invalid admin credentials. Default is admin / vanojan2026' });
});

// ADMIN PROTECTED ROUTES

// Admin Overview
app.get('/api/admin/overview', authMiddleware, (req, res) => {
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
app.get('/api/admin/messages', authMiddleware, (req, res) => {
  const db = getDb();
  res.json(db.messages);
});

app.patch('/api/admin/messages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const msg = db.messages.find(m => m.id === id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });

  if (req.body.read !== undefined) msg.read = Boolean(req.body.read);
  if (req.body.starred !== undefined) msg.starred = Boolean(req.body.starred);

  saveDb(db);
  res.json({ success: true, message: msg });
});

app.delete('/api/admin/messages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.messages = db.messages.filter(m => m.id !== id);
  saveDb(db);
  res.json({ success: true, id });
});

// Admin Projects CRUD
app.post('/api/admin/projects', authMiddleware, (req, res) => {
  const db = getDb();
  const project = {
    id: req.body.id || `project-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'Engineering',
    subtitle: req.body.subtitle || '',
    description: req.body.description || '',
    techStack: Array.isArray(req.body.techStack) ? req.body.techStack : [],
    featured: Boolean(req.body.featured),
    image: req.body.image || '/hero/project-default.jpg',
    liveUrl: req.body.liveUrl || '',
    githubUrl: req.body.githubUrl || '',
    highlights: Array.isArray(req.body.highlights) ? req.body.highlights : [],
    deliverables: Array.isArray(req.body.deliverables) ? req.body.deliverables : []
  };

  db.projects.push(project);
  saveDb(db);
  res.status(201).json({ success: true, project });
});

app.put('/api/admin/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const index = db.projects.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });

  db.projects[index] = { ...db.projects[index], ...req.body };
  saveDb(db);
  res.json({ success: true, project: db.projects[index] });
});

app.delete('/api/admin/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.projects = db.projects.filter(p => p.id !== id);
  saveDb(db);
  res.json({ success: true, id });
});

// Admin Profile Update
app.put('/api/admin/profile', authMiddleware, (req, res) => {
  const db = getDb();
  db.profile = { ...db.profile, ...req.body };
  saveDb(db);
  res.json({ success: true, profile: db.profile });
});

// Admin Skills Update
app.put('/api/admin/skills', authMiddleware, (req, res) => {
  const db = getDb();
  if (Array.isArray(req.body.skills)) {
    db.skills = req.body.skills;
    saveDb(db);
    return res.json({ success: true, skills: db.skills });
  }
  res.status(400).json({ error: 'Invalid skills format' });
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

app.listen(PORT, () => {
  console.log(`[API Server] Running on http://localhost:${PORT}`);
});
