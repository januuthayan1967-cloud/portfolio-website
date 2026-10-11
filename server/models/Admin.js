import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: 'admin'
  },
  passwordHash: {
    type: String,
    required: true,
    default: 'vanojan2026'
  },
  securityPin: {
    type: String,
    default: '2026'
  }
}, {
  timestamps: true
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
