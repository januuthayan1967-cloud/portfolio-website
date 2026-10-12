import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    default: 'General Inquiry',
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: '',
    trim: true
  },
  imagePublicId: {
    type: String,
    default: '',
    trim: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString()
  },
  read: {
    type: Boolean,
    default: false
  },
  starred: {
    type: Boolean,
    default: false
  },
  replied: {
    type: Boolean,
    default: false
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  notificationError: {
    type: String,
    default: ''
  },
  replies: {
    type: [{
      id: { type: String, default: () => `rep-${Date.now()}` },
      subject: { type: String, default: '' },
      message: { type: String, required: true },
      sentAt: { type: Date, default: Date.now },
      status: { type: String, default: 'sent' },
      error: { type: String, default: '' }
    }],
    default: []
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

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
