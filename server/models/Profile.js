import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'Sparkles' }
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Uthayagunasingam Vanojan' },
  shortName: { type: String, default: 'Vanojan' },
  title: { type: String, default: 'Graduate Software Engineer | Full-Stack Developer' },
  roleBadges: { type: [String], default: [] },
  tagline: { type: String, default: '' },
  heroImage: { type: String, default: '/hero/image2.jpeg' },
  heroImagePublicId: { type: String, default: '' },
  aboutImage: { type: String, default: '/hero/image1.jpeg' },
  aboutImagePublicId: { type: String, default: '' },
  avatarImage: { type: String, default: '' },
  avatarImagePublicId: { type: String, default: '' },
  avatarImageUpdatedAt: { type: Date, default: null },
  bio: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  location: { type: String, default: 'Jaffna, Sri Lanka' },
  email: { type: String, default: 'uthayanvanojan5@gmail.com' },
  phone: { type: String, default: '+94 75 029 2685' },
  github: { type: String, default: 'https://github.com/januuthayan1967-cloud' },
  linkedin: { type: String, default: 'https://www.linkedin.com/in/uthayagunasingam-vanojan-1b75a2327/' },
  twitter: { type: String, default: '' },
  statusText: { type: String, default: 'Open for Graduate Software Engineer & Full-Stack Opportunities' },
  resumeUrl: { type: String, default: '/VanojanBSCCV.pdf?v=20261015' },
  emailNotifications: { type: Boolean, default: true },
  emailRepliesEnabled: { type: Boolean, default: true },
  metrics: { type: [metricSchema], default: [] }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  }
});

export const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
