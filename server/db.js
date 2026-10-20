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
  messages: [],
  analytics: {
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    directInquiries: 0,
    projectViews: 0,
    avgSessionSeconds: 0,
    history: []
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
