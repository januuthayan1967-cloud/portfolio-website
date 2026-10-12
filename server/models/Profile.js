import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'Sparkles' }
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Uthayagunasingam Vanojan' },
  shortName: { type: String, default: 'Vanojan' },
  title: { type: String, default: 'Full-Stack Software Engineer & Solutions Architect' },
  roleBadges: { type: [String], default: [] },
  tagline: { type: String, default: '' },
  heroImage: { type: String, default: '/hero/image2.jpeg' },
  heroImagePublicId: { type: String, default: '' },
  aboutImage: { type: String, default: '/hero/image1.jpeg' },
  aboutImagePublicId: { type: String, default: '' },
  bio: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  location: { type: String, default: 'Jaffna, Sri Lanka' },
  email: { type: String, default: 'uthayanvanojan5@gmail.com' },
  phone: { type: String, default: '+94 75 029 2685' },
  github: { type: String, default: 'https://github.com' },
  linkedin: { type: String, default: 'https://linkedin.com' },
  twitter: { type: String, default: 'https://twitter.com' },
  statusText: { type: String, default: 'Open for high-impact engineering & architecture engagements' },
  resumeUrl: { type: String, default: '' },
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
