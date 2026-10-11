import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 }
}, { _id: false });

const skillCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: 'Code'
  },
  order: {
    type: Number,
    default: 0
  },
  items: {
    type: [skillItemSchema],
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
      delete ret.order;
      return ret;
    }
  }
});

export const SkillCategory = mongoose.models.SkillCategory || mongoose.model('SkillCategory', skillCategorySchema);
