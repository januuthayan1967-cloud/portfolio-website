import mongoose from 'mongoose';

const historyItemSchema = new mongoose.Schema({
  date: { type: String, required: true },
  views: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 }
}, { _id: false });

const analyticsSchema = new mongoose.Schema({
  totalVisits: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  directInquiries: { type: Number, default: 0 },
  projectViews: { type: Number, default: 0 },
  avgSessionSeconds: { type: Number, default: 0 },
  history: { type: [historyItemSchema], default: [] }
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

export const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);
