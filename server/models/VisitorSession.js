import mongoose from 'mongoose';

const visitorSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  visitorId: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  startedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  durationSeconds: {
    type: Number,
    default: 0
  },
  pageViewsCount: {
    type: Number,
    default: 1
  },
  entryPath: {
    type: String,
    default: '/'
  },
  referrer: {
    type: String,
    default: ''
  },
  trafficSource: {
    type: String,
    enum: ['Direct Visits', 'Google Search', 'Social Media', 'Referral Links', 'Others'],
    default: 'Direct Visits',
    index: true
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  isBot: {
    type: Boolean,
    default: false,
    index: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Composite indexes for real-time and historical analytics queries
visitorSessionSchema.index({ startedAt: -1, isBot: 1, isAdmin: 1 });
visitorSessionSchema.index({ lastActiveAt: -1, isBot: 1, isAdmin: 1 });
visitorSessionSchema.index({ trafficSource: 1, startedAt: -1 });
visitorSessionSchema.index({ visitorId: 1, startedAt: -1 });

export const VisitorSession = mongoose.models.VisitorSession || mongoose.model('VisitorSession', visitorSessionSchema);
