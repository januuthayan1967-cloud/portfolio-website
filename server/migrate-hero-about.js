import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Profile } from './models/Profile.js';
import { verifiedProfile } from './sync-cv-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function migrateHeroAbout() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected.');

  let doc = await Profile.findOne();
  if (!doc) {
    console.log('No Profile document found. Creating with verifiedProfile...');
    doc = await Profile.create(verifiedProfile);
    console.log('Created Profile document with id:', doc._id);
  } else {
    console.log('Found existing Profile document. Checking missing fields...');
    let modified = false;

    for (const [key, val] of Object.entries(verifiedProfile)) {
      if (doc[key] === undefined || doc[key] === null) {
        doc[key] = val;
        modified = true;
        console.log(`Setting default for missing field: ${key}`);
      }
    }

    if (modified) {
      await doc.save();
      console.log('Successfully saved Profile with missing fields populated.');
    } else {
      console.log('All fields already present in Profile document.');
    }
  }

  await mongoose.disconnect();
  console.log('Done.');
}

migrateHeroAbout().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
