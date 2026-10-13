import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  eventType: {
    type: String,
    enum: ['pageview', 'dwell', 'project_view', 'cta_click', 'heartbeat'],
    default: 'pageview',
    index: true
  },
  path: {
    type: String,
    default: '/',
    trim: true
  },
  title: {
    type: String,
    default: ''
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
  projectSlug: {
    type: String,
    default: '',
    index: true
  },
  dwellSeconds: {
    type: Number,
    default: 0
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  browser: {
    type: String,
    default: 'Unknown'
  },
  os: {
    type: String,
    default: 'Unknown'
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  countryCode: {
    type: String,
    default: ''
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
  },
  timestamp: {
    type: Date,
    default: Date.now,
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

// Composite indexes for fast timeline aggregation
analyticsEventSchema.index({ timestamp: -1, isBot: 1, isAdmin: 1 });
analyticsEventSchema.index({ trafficSource: 1, timestamp: -1 });
analyticsEventSchema.index({ visitorId: 1, timestamp: -1 });

export const AnalyticsEvent = mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', analyticsEventSchema);
