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
let lastAttemptTime = 0;
let lastAttemptError = null;
const RETRY_COOLDOWN_MS = 10000;

export async function connectDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[MongoDB] Warning: MONGODB_URI is not set in environment.');
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  const now = Date.now();
  if (lastAttemptError && now - lastAttemptTime < RETRY_COOLDOWN_MS) {
    return null;
  }

  lastAttemptTime = now;

  try {
    cachedConnection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 9000,
      maxPoolSize: 10,
    });
    lastAttemptError = null;
    console.log(`[MongoDB Atlas] Connected successfully to database: ${mongoose.connection.name}`);
    return cachedConnection;
  } catch (error) {
    cachedConnection = null;
    lastAttemptError = error;
    console.error('[MongoDB Atlas] Connection attempt failed:', error.message);
    throw error;
  }
}

export async function pingDb() {
  const uri = process.env.MONGODB_URI;
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
