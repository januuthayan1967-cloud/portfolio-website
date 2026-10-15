import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { Cv, Profile } from './models/index.js';
import { isCloudinaryConfigured, uploadStream } from './config/cloudinary.js';
import { getDb, saveDb } from './db.js';

export async function migrateExistingCv() {
  console.log('====================================================');
  console.log('📄 EXECUTING DYNAMIC CV MIGRATION');
  console.log('====================================================\n');

  // 1. Locate the existing CV file
  const candidatePaths = [
    path.join(__dirname, '../public/VanojanBSCCV.pdf'),
    path.join(__dirname, '../VanojanBSCCV.pdf')
  ];

  let cvPath = null;
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      cvPath = p;
      break;
    }
  }

  if (!cvPath) {
    throw new Error('Could not locate existing VanojanBSCCV.pdf in workspace.');
  }

  const fileBuffer = fs.readFileSync(cvPath);
  const fileSize = fileBuffer.length;
  console.log(`✓ Located existing CV at: ${cvPath}`);
  console.log(`  File Size: ${(fileSize / 1024).toFixed(2)} KB (${fileSize} bytes)`);

  // Verify PDF header signature
  if (fileBuffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
    throw new Error('File signature verification failed: not a valid PDF.');
  }
  console.log('✓ Validated PDF magic bytes signature (%PDF-)');

  const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  const timestamp = Date.now();
  const originalFilename = 'VanojanBSCCV.pdf';

  let uploadedUrl = `/VanojanBSCCV.pdf?v=${timestamp}`;
  let publicId = `local_cv_migrated_${timestamp}`;
  let resourceType = 'raw';

  // 2. Cloudinary Upload if configured
  if (isCloudinaryConfigured()) {
    console.log('☁️  Uploading existing CV to Cloudinary cloud storage...');
    try {
      const uploadResult = await uploadStream(fileBuffer, {
        folder: 'vanojan_portfolio/cv',
        public_id: `vanojan_cv_migrated_${timestamp}.pdf`,
        resource_type: 'raw',
        format: 'pdf',
        tags: ['cv', 'resume', 'migrated']
      });
      uploadedUrl = uploadResult.secure_url || uploadResult.url;
      publicId = uploadResult.public_id;
      resourceType = uploadResult.resource_type || 'raw';
      console.log(`✓ Uploaded to Cloudinary: ${uploadedUrl}`);
    } catch (err) {
      console.warn('⚠️ Cloudinary upload warning during migration, falling back to local file reference:', err.message);
    }
  } else {
    console.log('ℹ️ Cloudinary credentials not configured locally; using verified local fallback storage.');
  }

  // 3. Connect to MongoDB Atlas
  const uri = process.env.MONGODB_URI;
  if (uri) {
    console.log('🍃 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log(`✓ Connected to database: ${mongoose.connection.name}`);

    // Deactivate previous CVs
    await Cv.updateMany({ isActive: true }, { isActive: false });

    // Create new active CV document
    const activeCvDoc = await Cv.create({
      originalFilename,
      cloudinaryPublicId: publicId,
      cloudinaryResourceType: resourceType,
      url: uploadedUrl,
      secureUrl: uploadedUrl,
      fileSize,
      format: 'pdf',
      mimeType: 'application/pdf',
      fileHash,
      uploadDate: new Date(),
      lastUpdatedDate: new Date(),
      isActive: true,
      uploader: 'migration_script'
    });
    console.log(`✓ Active CV record created in MongoDB Atlas: ID ${activeCvDoc._id}`);

    // Synchronize Profile.resumeUrl
    await Profile.findOneAndUpdate(
      {},
      { resumeUrl: `/api/cv/download?v=${timestamp}` },
      { upsert: true }
    );
    console.log('✓ Updated Profile.resumeUrl to point to dynamic /api/cv/download');
  }

  // 4. Synchronize local fallback db.json
  const db = getDb();
  const cvRecord = {
    originalFilename,
    cloudinaryPublicId: publicId,
    cloudinaryResourceType: resourceType,
    url: uploadedUrl,
    secureUrl: uploadedUrl,
    fileSize,
    format: 'pdf',
    mimeType: 'application/pdf',
    fileHash,
    uploadDate: new Date().toISOString(),
    lastUpdatedDate: new Date().toISOString(),
    isActive: true
  };
  db.activeCv = cvRecord;
  if (db.profile) {
    db.profile.resumeUrl = `/api/cv/download?v=${timestamp}`;
  }
  saveDb(db);
  console.log(`✓ Synchronized local fallback database at server/data/db.json`);

  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB Atlas.');
  }

  console.log('\n🎉 CV MIGRATION COMPLETED SUCCESSFULLY!');
  console.log('====================================================\n');
  return cvRecord;
}

const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('migrate-cv.js') || 
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
);

if (isDirectRun) {
  migrateExistingCv()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[MIGRATION ERROR]:', err);
      process.exit(1);
    });
}
