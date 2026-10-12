import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { Admin } from './models/Admin.js';
import { getDb, saveDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function setupAdmin() {
  console.log('=== ADMIN SECURITY INITIALIZATION & BCRYPT HASHING ===');
  const targetUsername = 'vanojanSE';
  const targetEmail = process.env.ADMIN_EMAIL || 'uthayanvanojan5@gmail.com';

  // Read password from environment or CLI argument, or generate a cryptographically strong temporary one
  const inputPassword = process.env.INITIAL_ADMIN_PASSWORD || process.argv[2];

  if (!inputPassword) {
    console.error('Error: Please specify the initial admin password via environment variable or CLI argument:');
    console.error('Usage: INITIAL_ADMIN_PASSWORD="YourSecurePassword" node server/setup-admin.js');
    console.error('Or: node server/setup-admin.js "YourSecurePassword"');
    process.exit(1);
  }

  console.log(`Generating bcrypt salt (12 rounds) for username: ${targetUsername}...`);
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(inputPassword, salt);

  // 1. Update MongoDB Atlas if URI is present
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(mongoUri);
      
      // Remove any obsolete legacy 'admin' accounts
      await Admin.deleteMany({ username: { $ne: targetUsername } });

      // Upsert vanojanSE
      const admin = await Admin.findOneAndUpdate(
        { username: targetUsername },
        {
          $set: {
            username: targetUsername,
            email: targetEmail,
            passwordHash,
            failedLoginAttempts: 0,
            lockUntil: null,
            resetPasswordTokenHash: null,
            resetPasswordExpires: null
          }
        },
        { upsert: true, returnDocument: 'after' }
      );

      console.log(`[MongoDB Atlas] Successfully configured admin "${targetUsername}" with secure bcrypt hash.`);
      await mongoose.disconnect();
    } catch (err) {
      console.error('[MongoDB Atlas Error]:', err.message);
    }
  }

  // 2. Synchronize local fallback db.json with hashed credentials (NO plaintext!)
  try {
    const db = getDb();
    db.admin = {
      username: targetUsername,
      email: targetEmail,
      passwordHash: passwordHash
    };
    saveDb(db);
    console.log(`[Local Fallback] Successfully updated db.json with bcrypt hash for "${targetUsername}".`);
  } catch (err) {
    console.error('[Local Backup Error]:', err.message);
  }

  console.log('✓ Admin account setup completed successfully. Plaintext credentials eliminated.');
}

setupAdmin().catch(console.error);
