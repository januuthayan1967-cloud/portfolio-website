import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'Sparkles' }
}, { _id: false });

const pillarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: 'Cpu' }
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
  metrics: { type: [metricSchema], default: [] },

  // HERO SECTION & CARDS MANAGEMENT
  heroTitlePrefix: { type: String, default: 'Architectural' },
  heroTitleHighlight: { type: String, default: 'Precision.' },
  heroTitleSuffix: { type: String, default: 'Cinematic Depth.' },
  heroBadgeText: { type: String, default: 'Graduate\nSoftware engineer\n& Full-stack developer' },
  heroPrimaryCtaText: { type: String, default: 'Explore Selected Works' },
  heroPrimaryCtaLink: { type: String, default: '#projects' },
  heroSecondaryCtaText: { type: String, default: 'Watch Intro' },
  heroActionNote: { type: String, default: 'See my work\nin action' },
  heroIdentityName: { type: String, default: 'Uthayagunasingam Vanojan' },
  heroIdentityTitle: { type: String, default: 'Graduate Software Engineer · Full-Stack Developer' },
  heroIdentityStatus: { type: String, default: 'Available for Opportunities' },
  heroIdentityLink: { type: String, default: '#contact' },
  heroGlobeLine1: { type: String, default: 'BUILDING' },
  heroGlobeLine2: { type: String, default: 'SCALABLE' },
  heroGlobeLine3: { type: String, default: 'SOLUTIONS' },
  heroGlobeTooltip: { type: String, default: 'System Scalability Metrics' },
  heroCapabilities: { type: [String], default: ['Design', 'Develop', 'Architect', 'Innovate'] },
  heroWatermarkNumber: { type: String, default: '01' },
  heroWatermarkText: { type: String, default: 'Dev\nDesign\nInnovate' },
  heroGalleryWorkstation: { type: String, default: '/hero/project-analytics.jpg' },
  heroGalleryStudio: { type: String, default: '/hero/studio-setup.jpg' },

  // ABOUT SECTION & CARDS MANAGEMENT
  aboutBadge: { type: String, default: '02 - ABOUT' },
  aboutPillText: { type: String, default: 'PASSION • PRECISION • PROGRESS' },
  aboutHeadingPrefix: { type: String, default: 'Turning Complex' },
  aboutHeadingHighlight: { type: String, default: 'Ideas into Scalable Real Solutions.' },
  aboutJourneyTitle: { type: String, default: 'MY JOURNEY' },
  aboutJourneyBadge: { type: String, default: 'Passion Driven Developer' },
  aboutJourneySubtitle: { type: String, default: 'A quick look at my journey, values and what drives me to build better solutions.' },
  aboutJourneyButtonText: { type: String, default: 'Read More' },
  journeyPillars: {
    type: [pillarSchema],
    default: [
      {
        title: 'Problem Solving',
        desc: 'Deconstructing complex enterprise challenges into clean, modular, and maintainable logic.',
        icon: 'Cpu'
      },
      {
        title: 'Clean Architecture',
        desc: 'Building resilient microservices, normalized databases, and scalable distributed patterns.',
        icon: 'Layers'
      },
      {
        title: 'User Focused',
        desc: 'Crafting intuitive, accessible, and high-performance digital experiences with cinematic aesthetics.',
        icon: 'Users'
      }
    ]
  },
  aboutCardRole: { type: String, default: 'GRADUATE SOFTWARE ENGINEER' },
  aboutCardSubtitle: { type: String, default: 'FULL-STACK DEVELOPER' },
  aboutSideText: { type: String, default: 'GRADUATE SOFTWARE ENGINEER • FULL-STACK DEVELOPER' },
  journeyModalBadge: { type: String, default: 'PROFESSIONAL TRAJECTORY' },
  journeyModalTitle: { type: String, default: 'Engineering Rigour & Visual Mastery' },
  journeyModalParagraph1: {
    type: String,
    default: 'Motivated Software Engineering graduate candidate who has completed the BSc (Hons) Software Engineering programme at ICBT Campus, affiliated with Cardiff Metropolitan University, UK, and is currently awaiting final results. Holds a Higher National Diploma (HND) in Computing and Software Engineering, with hands-on experience in full-stack web development, Android applications, database management, and AI-integrated systems.'
  },
  journeyModalParagraph2: {
    type: String,
    default: 'Skilled in React.js, Node.js, Java, Python, and SQL through academic and independent projects. Seeking an opportunity to contribute technical expertise and problem-solving skills as a Graduate Software Engineer.'
  },
  musicSettings: {
    isEnabled: { type: Boolean, default: true },
    defaultVolume: { type: Number, default: 0.55 },
    activeTrackId: { type: mongoose.Schema.Types.ObjectId, ref: 'MusicTrack', default: null },
    activeTrackUrl: { type: String, default: '/audio/mybackground.mpeg' },
    activeTrackTitle: { type: String, default: 'Cinematic Ambient Soundscape' },
    activeTrackFormat: { type: String, default: 'audio/mpeg' }
  }
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
