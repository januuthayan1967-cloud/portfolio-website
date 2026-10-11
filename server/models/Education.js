import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    trim: true
  },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  badge: {
    type: String,
    default: '',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.order;
      return ret;
    }
  }
});

export const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);
