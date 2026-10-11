import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  format: {
    type: String,
    trim: true
  },
  bytes: {
    type: Number,
    default: 0
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  tag: {
    type: String,
    enum: ['project', 'profile_hero', 'profile_about', 'user_upload', 'avatar', 'general'],
    default: 'general',
    index: true
  },
  uploaderRole: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
    index: true
  },
  uploaderId: {
    type: String,
    required: true,
    default: 'admin',
    index: true
  },
  originalFilename: {
    type: String,
    default: ''
  },
  associatedId: {
    type: String,
    default: '',
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  }
});

export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
