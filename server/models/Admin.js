import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: 'vanojanSE'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'uthayanvanojan5@gmail.com'
  },
  passwordHash: {
    type: String,
    required: true
  },
  securityPin: {
    type: String,
    default: '2026'
  },
  resetPasswordTokenHash: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

