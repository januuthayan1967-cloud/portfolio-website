import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('[Error] MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Mask credentials for safe logging
const maskedUri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
console.log(`Connecting to MongoDB Atlas at: ${maskedUri}...`);

async function testConnection() {
  try {
    const startTime = Date.now();
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    const pingResult = await mongoose.connection.db.admin().ping();
    const duration = Date.now() - startTime;
    console.log('[Success] MongoDB Atlas connected and pinged successfully!');
    console.log(`Ping response:`, pingResult);
    console.log(`Latency: ${duration}ms`);
    console.log(`Connected Database: ${mongoose.connection.name}`);
    console.log(`Cluster Host: ${mongoose.connection.host}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Connection Error]:', error.message);
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.error('Hint: Check database username and password in MongoDB Atlas Database Access.');
    } else if (error.message.includes('whitelist') || error.message.includes('IP') || error.message.includes('buffering timed out') || error.message.includes('ECONNREFUSED')) {
      console.error('Hint: Ensure your IP address is whitelisted in MongoDB Atlas Network Access (allow 0.0.0.0/0 for any IP or Vercel).');
    }
    process.exit(1);
  }
}

testConnection();
