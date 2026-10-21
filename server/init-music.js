import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { MusicTrack } from './models/MusicTrack.js';
import { Profile } from './models/Profile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function initMusic() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected.');

  // 1. Check if default track exists
  let defaultTrack = await MusicTrack.findOne({ isDefault: true });
  if (!defaultTrack) {
    const audioPath = path.resolve(__dirname, '../public/audio/mybackground.mpeg');
    if (fs.existsSync(audioPath)) {
      const fileBuffer = fs.readFileSync(audioPath);
      defaultTrack = await MusicTrack.create({
        title: 'Cinematic Ambient Soundscape',
        originalFilename: 'mybackground.mpeg',
        url: '/audio/mybackground.mpeg',
        secureUrl: '/audio/mybackground.mpeg',
        fileSize: fileBuffer.length,
        fileData: fileBuffer,
        format: 'mpeg',
        mimeType: 'audio/mpeg',
        isActive: true,
        isDefault: true,
        uploader: 'system'
      });
      console.log('Created default MusicTrack document in MongoDB Atlas:', defaultTrack._id);
    } else {
      console.warn('public/audio/mybackground.mpeg not found, creating without fileBuffer');
      defaultTrack = await MusicTrack.create({
        title: 'Cinematic Ambient Soundscape',
        originalFilename: 'mybackground.mpeg',
        url: '/audio/mybackground.mpeg',
        secureUrl: '/audio/mybackground.mpeg',
        fileSize: 2433230,
        format: 'mpeg',
        mimeType: 'audio/mpeg',
        isActive: true,
        isDefault: true,
        uploader: 'system'
      });
    }
  } else {
    console.log('Default MusicTrack already exists:', defaultTrack._id);
  }

  // 2. Ensure only one track is active
  await MusicTrack.updateMany({ _id: { $ne: defaultTrack._id } }, { isActive: false });
  defaultTrack.isActive = true;
  await defaultTrack.save();

  // 3. Update Profile with musicSettings
  const profile = await Profile.findOne();
  if (profile) {
    if (!profile.musicSettings) {
      profile.musicSettings = {
        isEnabled: true,
        defaultVolume: 0.55,
        activeTrackId: defaultTrack._id,
        activeTrackUrl: defaultTrack.url,
        activeTrackTitle: defaultTrack.title,
        activeTrackFormat: defaultTrack.format
      };
      await profile.save();
      console.log('Initialized profile.musicSettings in Atlas.');
    } else {
      profile.musicSettings.activeTrackId = defaultTrack._id;
      profile.musicSettings.activeTrackUrl = defaultTrack.url;
      profile.musicSettings.activeTrackTitle = defaultTrack.title;
      profile.musicSettings.activeTrackFormat = defaultTrack.format;
      await profile.save();
      console.log('Updated profile.musicSettings in Atlas.');
    }
  }

  await mongoose.disconnect();
  console.log('Music initialization completed successfully.');
}

initMusic().catch(err => {
  console.error('Music initialization error:', err);
  process.exit(1);
});
