import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Untitled Project'
  },
  category: {
    type: String,
    default: 'Engineering',
    trim: true
  },
  subtitle: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  techStack: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: '/hero/project-default.jpg'
  },
  gradient: {
    type: String,
    default: 'from-blue-600/30 to-slate-900/30'
  },
  liveUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  highlights: {
    type: [String],
    default: []
  },
  deliverables: {
    type: [String],
    default: []
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
      return ret;
    }
  }
});

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
