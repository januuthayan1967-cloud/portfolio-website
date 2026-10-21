import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  originalFilename: {
    type: String,
    required: true,
    trim: true,
    default: 'VanojanBSCCV.pdf'
  },
  cloudinaryPublicId: {
    type: String,
    default: ''
  },
  cloudinaryResourceType: {
    type: String,
    default: 'raw'
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
    required: true
  },
  fileData: {
    type: Buffer,
    select: false
  },
  format: {
    type: String,
    default: 'pdf'
  },
  mimeType: {
    type: String,
    default: 'application/pdf'
  },
  fileHash: {
    type: String,
    default: ''
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  uploader: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.fileData;
      return ret;
    }
  }
});

export const Cv = mongoose.models.Cv || mongoose.model('Cv', cvSchema);
