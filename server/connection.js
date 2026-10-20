import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Disable query buffering so disconnected queries do not hang
mongoose.set('bufferCommands', false);

let cachedConnection = null;
let cachedPromise = null;
let lastAttemptTime = 0;
let lastAttemptError = null;
const RETRY_COOLDOWN_MS = 5000;

function getSanitizedUri() {
  let uri = process.env.MONGODB_URI;
  if (!uri) return null;

  // Auto-heal common Atlas copy-paste placeholder mistakes (e.g. <db_username> or <username>)
  if (uri.includes('<db_username>')) {
    uri = uri.replace('<db_username>', 'januuthayan1967_db_user');
  }
  if (uri.includes('<januuthayan1967_db_user>')) {
    uri = uri.replace('<januuthayan1967_db_user>', 'januuthayan1967_db_user');
  }
  uri = uri.replace(/<([^>]+)>/g, '$1').trim();

  // Ensure target database is vanojanPortfolio if pointing to root or test
  if (uri.includes('.mongodb.net/?') || uri.endsWith('.mongodb.net/')) {
    uri = uri.replace('.mongodb.net/', '.mongodb.net/vanojanPortfolio');
  } else if (uri.includes('.mongodb.net/test')) {
    uri = uri.replace('.mongodb.net/test', '.mongodb.net/vanojanPortfolio');
  }

  return uri;
}

export async function connectDb() {
  const uri = getSanitizedUri();

  if (!uri) {
    console.warn('[MongoDB] Warning: MONGODB_URI is not set in environment.');
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise && (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2)) {
    try {
      await cachedPromise;
      if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
      }
    } catch (e) {
      cachedPromise = null;
    }
  }

  const now = Date.now();
  if (lastAttemptError && now - lastAttemptTime < RETRY_COOLDOWN_MS) {
    return null;
  }

  lastAttemptTime = now;

  cachedPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    maxPoolSize: 10,
  }).then((conn) => {
    cachedConnection = conn;
    lastAttemptError = null;
    console.log(`[MongoDB Atlas] Connected successfully to database: ${mongoose.connection.name}`);
    return conn;
  }).catch((error) => {
    cachedConnection = null;
    cachedPromise = null;
    lastAttemptError = error;
    console.error('[MongoDB Atlas] Connection attempt failed:', error.message);
    throw error;
  });

  return await cachedPromise;
}

export async function ensureDb() {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  try {
    const conn = await connectDb();
    return Boolean(conn && mongoose.connection.readyState === 1);
  } catch (e) {
    return false;
  }
}

export async function pingDb() {
  const uri = getSanitizedUri();
  if (!uri) {
    return {
      connected: false,
      error: 'MONGODB_URI is not configured in Vercel environment variables'
    };
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDb();
    }
    if (mongoose.connection.readyState === 1) {
      const result = await mongoose.connection.db.admin().ping();
      return {
        connected: true,
        database: mongoose.connection.name,
        host: mongoose.connection.host,
        result
      };
    }
    return {
      connected: false,
      error: lastAttemptError ? lastAttemptError.message : 'Database not connected'
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}
