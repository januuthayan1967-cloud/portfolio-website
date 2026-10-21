import mongoose from 'mongoose';

const musicTrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Cinematic Ambient Soundscape'
  },
  originalFilename: {
    type: String,
    required: true,
    trim: true,
    default: 'mybackground.mpeg'
  },
  cloudinaryPublicId: {
    type: String,
    default: ''
  },
  cloudinaryResourceType: {
    type: String,
    default: 'video'
  },
  url: {
    type: String,
    required: true
  },
  secureUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true,
    default: 0
  },
  fileData: {
    type: Buffer,
    select: false
  },
  format: {
    type: String,
    default: 'mpeg'
  },
  mimeType: {
    type: String,
    default: 'audio/mpeg'
  },
  duration: {
    type: Number,
    default: 0
  },
  fileHash: {
    type: String,
    default: ''
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false,
    index: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  uploader: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const MusicTrack = mongoose.model('MusicTrack', musicTrackSchema);
