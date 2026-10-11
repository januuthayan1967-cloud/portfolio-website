import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Profile, Project, SkillCategory, Education, Message, Analytics, Admin } from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const DB_FILE = path.join(__dirname, 'data', 'db.json');
const uri = process.env.MONGODB_URI;

export async function validateMigrationData() {
  if (!fs.existsSync(DB_FILE)) {
    throw new Error(`Data file not found at ${DB_FILE}`);
  }
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  const data = JSON.parse(raw);

  const summary = {
    profile: data.profile ? { name: data.profile.name, title: data.profile.title } : null,
    projectsCount: Array.isArray(data.projects) ? data.projects.length : 0,
    skillsCategoriesCount: Array.isArray(data.skills) ? data.skills.length : 0,
    educationCount: Array.isArray(data.education) ? data.education.length : 0,
    messagesCount: Array.isArray(data.messages) ? data.messages.length : 0,
    hasAnalytics: !!data.analytics,
    hasAdmin: !!data.admin
  };

  return { data, summary };
}

export async function executeMigration({ dryRun = false } = {}) {
  const { data, summary } = await validateMigrationData();

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment');
  }

  await mongoose.connect(uri);

  try {
    if (dryRun) {
      console.log('[DRY-RUN] Validating data to migrate:');
      console.log(JSON.stringify(summary, null, 2));
      return { success: true, mode: 'dry-run', summary };
    }

    console.log('[MIGRATION] Starting database migration to MongoDB Atlas...');

    // 1. Profile
    if (data.profile) {
      await Profile.deleteMany({});
      await Profile.create(data.profile);
      console.log('✓ Profile migrated');
    }

    // 2. Projects
    if (Array.isArray(data.projects) && data.projects.length > 0) {
      await Project.deleteMany({});
      const projectsToInsert = data.projects.map((p, idx) => ({
        ...p,
        order: idx
      }));
      await Project.insertMany(projectsToInsert);
      console.log(`✓ Projects migrated (${projectsToInsert.length} projects)`);
    }

    // 3. Skills
    if (Array.isArray(data.skills) && data.skills.length > 0) {
      await SkillCategory.deleteMany({});
      const skillsToInsert = data.skills.map((s, idx) => ({
        ...s,
        order: idx
      }));
      await SkillCategory.insertMany(skillsToInsert);
      console.log(`✓ Skills categories migrated (${skillsToInsert.length} categories)`);
    }

    // 4. Education
    if (Array.isArray(data.education) && data.education.length > 0) {
      await Education.deleteMany({});
      const eduToInsert = data.education.map((e, idx) => ({
        ...e,
        order: idx
      }));
      await Education.insertMany(eduToInsert);
      console.log(`✓ Education entries migrated (${eduToInsert.length} entries)`);
    }

    // 5. Messages
    if (Array.isArray(data.messages) && data.messages.length > 0) {
      for (const msg of data.messages) {
        await Message.findOneAndUpdate({ id: msg.id }, msg, { upsert: true, new: true });
      }
      console.log(`✓ Messages migrated (${data.messages.length} messages)`);
    }

    // 6. Analytics
    if (data.analytics) {
      await Analytics.deleteMany({});
      await Analytics.create(data.analytics);
      console.log('✓ Analytics migrated');
    }

    // 7. Admin
    if (data.admin) {
      await Admin.findOneAndUpdate(
        { username: data.admin.username },
        data.admin,
        { upsert: true, new: true }
      );
      console.log('✓ Admin credentials migrated');
    }

    // Verify counts in MongoDB
    const verifiedCounts = {
      profileCount: await Profile.countDocuments(),
      projectsCount: await Project.countDocuments(),
      skillsCount: await SkillCategory.countDocuments(),
      educationCount: await Education.countDocuments(),
      messagesCount: await Message.countDocuments(),
      analyticsCount: await Analytics.countDocuments(),
      adminCount: await Admin.countDocuments()
    };

    console.log('[MIGRATION COMPLETE] MongoDB Atlas collection counts:', verifiedCounts);
    return { success: true, verifiedCounts };
  } finally {
    await mongoose.disconnect();
  }
}

// Direct CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const isExecute = process.argv.includes('--execute');
  const isValidate = process.argv.includes('--validate');

  if (isValidate || !isExecute) {
    validateMigrationData()
      .then(({ summary }) => {
        console.log('[MIGRATION VALIDATION SUCCESSFUL]');
        console.log(JSON.stringify(summary, null, 2));
      })
      .catch(err => {
        console.error('[MIGRATION VALIDATION FAILED]', err);
        process.exit(1);
      });
  } else {
    executeMigration({ dryRun: false })
      .then(res => {
        console.log('[MIGRATION SUCCESS]', res);
        process.exit(0);
      })
      .catch(err => {
        console.error('[MIGRATION ERROR]', err);
        process.exit(1);
      });
  }
}
