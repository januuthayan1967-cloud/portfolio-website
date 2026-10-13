import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

import { verifiedProfile, verifiedProjects, verifiedSkills, verifiedEducation } from './sync-cv-data.js';

const defaultData = {
  profile: verifiedProfile,
  projects: verifiedProjects,
  skills: verifiedSkills,
  education: verifiedEducation,
  messages: [
    {
      id: "msg-1",
      name: "Arthur Sterling",
      email: "arthur@sterlingventures.co",
      subject: "Graduate Software Engineer Inquiry",
      message: "Hello Vanojan, we reviewed your projects and were very impressed by your full-stack craftsmanship and technical profile. We'd love to schedule an introductory conversation regarding a software engineering engagement.",
      date: "2026-10-07T14:30:00.000Z",
      read: true,
      starred: true
    }
  ],
  analytics: {
    totalVisits: 1845,
    uniqueVisitors: 1220,
    pageViews: 4580,
    directInquiries: 32,
    projectViews: 2190,
    avgSessionSeconds: 245,
    history: [
      { date: "Oct 2", views: 240, inquiries: 3 },
      { date: "Oct 3", views: 310, inquiries: 4 },
      { date: "Oct 4", views: 290, inquiries: 2 },
      { date: "Oct 5", views: 420, inquiries: 6 },
      { date: "Oct 6", views: 510, inquiries: 7 },
      { date: "Oct 7", views: 630, inquiries: 8 },
      { date: "Oct 8", views: 720, inquiries: 10 }
    ]
  },
  admin: {
    username: "admin",
    passwordHash: "vanojan2026",
    securityPin: "2026"
  }
};

export function getDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB, using defaults:', err);
    return defaultData;
  }
}

export function saveDb(data) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('Error saving DB:', err);
    return false;
  }
}
