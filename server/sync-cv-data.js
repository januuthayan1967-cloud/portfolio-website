import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Profile, Project, SkillCategory, Education } from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const DB_FILE = path.join(__dirname, 'data', 'db.json');

export const verifiedProfile = {
  name: "Uthayagunasingam Vanojan",
  shortName: "Vanojan",
  title: "Graduate Software Engineer | Full-Stack Developer",
  roleBadges: [
    "Graduate Software Engineer",
    "Full-Stack Developer",
    "AI-Integrated Systems",
    "React & Node.js"
  ],
  tagline: "Motivated Software Engineering graduate candidate skilled in React.js, Node.js, Java, Python, and SQL, engineering high-performance applications.",
  heroImage: "/hero/image2.jpeg",
  aboutImage: "/hero/image1.jpeg",
  bio: "Motivated Software Engineering graduate candidate who has completed the BSc (Hons) Software Engineering programme at ICBT Campus, affiliated with Cardiff Metropolitan University, UK, and is currently awaiting final results. Holds a Higher National Diploma (HND) in Computing and Software Engineering, with hands-on experience in full-stack web development, Android applications, database management, and AI-integrated systems. Skilled in React.js, Node.js, Java, Python, and SQL through academic and independent projects. Seeking an opportunity to contribute technical expertise and problem-solving skills as a Graduate Software Engineer.",
  philosophy: "Dedicated to engineering clean, maintainable, and high-performance software systems with robust architectural design and intuitive user experiences.",
  location: "Jaffna, Sri Lanka",
  email: "uthayanvanojan5@gmail.com",
  phone: "+94 75 029 2685",
  github: "https://github.com/januuthayan1967-cloud",
  linkedin: "https://www.linkedin.com/in/uthayagunasingam-vanojan-1b75a2327/",
  twitter: "",
  statusText: "Open for Graduate Software Engineer & Full-Stack Opportunities",
  resumeUrl: "/VanojanBSCCV.pdf",
  emailNotifications: true,
  emailRepliesEnabled: true,
  metrics: [
    { label: "Degree Programme", value: "BSc (Hons)", icon: "GraduationCap" },
    { label: "Academic Status", value: "Results Pending", icon: "Clock" },
    { label: "Featured Systems", value: "9 Projects", icon: "Layers" },
    { label: "Higher Diploma", value: "HND Graduate", icon: "Award" }
  ]
};

export const verifiedProjects = [
  {
    id: "smart-oral-disease-detection",
    title: "Smart Oral Disease Detection & Dental Care Assistance",
    category: "Full-Stack Web",
    subtitle: "AI-Assisted Oral Health Platform (BSc Capstone Project)",
    description: "Built an AI-assisted oral health platform with image classification, multi-role access, consultation workflows and PDF reports.",
    techStack: ["React", "Node.js", "Express", "Python Flask", "MobileNetV3", "MongoDB", "Gemini AI"],
    featured: true,
    image: "/hero/project-analytics.jpg",
    gradient: "from-blue-600/30 to-amber-900/30",
    liveUrl: "",
    githubUrl: "https://github.com/januuthayan1967-cloud/smart-oral-disease-detection",
    highlights: [
      "Deep learning MobileNetV3 image classification for early oral disease detection",
      "Multi-role role-based access control for patients, dentists, pharmacies, and administrators",
      "Real-time video consultation workflows, appointment management, and automated PDF diagnostic reports"
    ],
    deliverables: ["Full-Stack Web Platform", "Flask AI Microservice", "Diagnostic PDF Engine"],
    order: 0
  },
  {
    id: "internship-finder",
    title: "Internship Finder Platform",
    category: "Full-Stack Web",
    subtitle: "Full-Stack Recruitment Platform with Video Interview Integration",
    description: "Developed a recruitment platform with student, company and admin dashboards, internship applications, CV uploads and video interview integration.",
    techStack: ["React", "Tailwind CSS", "Express", "MongoDB", "WebRTC"],
    featured: true,
    image: "/hero/project-futuredesk.jpg",
    gradient: "from-amber-600/30 to-blue-900/30",
    liveUrl: "",
    githubUrl: "https://github.com/januuthayan1967-cloud/internship-finder",
    highlights: [
      "Comprehensive multi-tenant dashboards for students, recruiters, and platform administrators",
      "Interactive job application tracker with structured CV uploading and filtering",
      "WebRTC real-time live video interview calling integration"
    ],
    deliverables: ["Recruitment Web SaaS", "WebRTC Video Gateway", "Admin Dashboard"],
    order: 1
  },
  {
    id: "luxevista-resort",
    title: "LuxeVista Resort – Mobile Application",
    category: "Mobile Application",
    subtitle: "Android Room & Service Reservation Mobile Suite",
    description: "Created an Android resort booking app with room and service reservations, local database persistence and PDF vouchers.",
    techStack: ["Java", "Android Studio", "SQLite", "JUnit", "Robolectric"],
    featured: true,
    image: "/hero/project-luxevista.jpg",
    gradient: "from-amber-600/30 to-slate-900/30",
    liveUrl: "",
    githubUrl: "https://github.com/januuthayan1967-cloud/LuxeVistaResortApp",
    highlights: [
      "Native Android suite with real-time room discovery, booking, and concierge services",
      "Offline-first transactional local persistence powered by SQLite with database migrations",
      "Canvas-driven PDF voucher generation and 53 automated unit and integration tests with Robolectric"
    ],
    deliverables: ["Native Android App", "SQLite Persistence Layer", "Automated Test Suite"],
    order: 2
  },
  {
    id: "portfolio-website",
    title: "Full-Stack Portfolio Website",
    category: "Full-Stack Web",
    subtitle: "Interactive 3D Portfolio & Autonomous Management Console",
    description: "Deployed interactive portfolio with an administration dashboard and project galleries.",
    techStack: ["React", "Three.js", "Express", "MongoDB Atlas", "Cloudinary", "Vercel"],
    featured: true,
    image: "/hero/project-analytics.jpg",
    gradient: "from-amber-500/30 to-indigo-950/30",
    liveUrl: "https://portfolio-website-src.vercel.app/",
    githubUrl: "https://github.com/januuthayan1967-cloud/portfolio-website",
    highlights: [
      "Interactive 3D WebGL atmosphere with Three.js and responsive luxury aesthetic",
      "Secure executive administration console with JWT authentication and real-time MongoDB Atlas sync",
      "Cloudinary media integration and production serverless deployment on Vercel"
    ],
    deliverables: ["Full-Stack Web Application", "Executive Admin Console", "MongoDB Cloud Architecture"],
    order: 3
  },
  {
    id: "stellar-classification",
    title: "Stellar Classification Using Machine Learning",
    category: "Machine Learning",
    subtitle: "Astronomical Object Classification Pipeline & Web Interface",
    description: "Compared machine learning models for stellar-object classification and built a prediction interface.",
    techStack: ["Python", "Scikit-learn", "XGBoost", "CatBoost", "Flask"],
    featured: true,
    image: "/hero/project-analytics.jpg",
    gradient: "from-blue-600/30 to-purple-900/30",
    liveUrl: "",
    githubUrl: "https://github.com/januuthayan1967-cloud/stellar-classification-project",
    highlights: [
      "End-to-end scientific ML pipeline evaluating multiple models for stellar-object classification",
      "Comparative model evaluation across XGBoost, CatBoost, Random Forest, Decision Tree, and Logistic Regression",
      "Lightweight Flask REST inference API with interactive prediction web interface"
    ],
    deliverables: ["ML Training Pipeline", "Comparative Evaluation Report", "Flask Inference Web App"],
    order: 4
  },
  {
    id: "fitzone-fitness",
    title: "FitZone Fitness Center – Gym Web Application",
    category: "Web Application",
    subtitle: "Gym Website & Reservation Booking Management Portal",
    description: "Gym website with reservation booking.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    featured: false,
    image: "/hero/project-fitzone.jpg",
    gradient: "from-amber-500/30 to-slate-900/30",
    liveUrl: "",
    githubUrl: "https://github.com/januuthayan1967-cloud/fitzone-gym-web",
    highlights: [
      "Integrated fitness portal handling member subscriptions and trainer session booking",
      "Relational MySQL schema design with transactional integrity and administrative controls",
      "Dynamic client-side reservation workflows built with vanilla JavaScript and PHP"
    ],
    deliverables: ["Web Application", "Relational Database Schema", "Administrative Dashboard"],
    order: 5
  },
  {
    id: "ocean-view-resort",
    title: "Ocean View Resort Management System",
    category: "Enterprise Systems",
    subtitle: "Hotel Booking and Management System with PDF Billing",
    description: "Hotel booking and management system with administrative features and PDF billing.",
    techStack: ["Java EE", "JSP", "Servlets", "JDBC", "MySQL"],
    featured: false,
    image: "/hero/project-luxevista.jpg",
    gradient: "from-blue-500/30 to-slate-950/30",
    liveUrl: "",
    githubUrl: "https://github.com/januuthayan1967-cloud/OceanViewResort",
    highlights: [
      "Java EE MVC architecture implementing Servlets, JavaServer Pages (JSP), and JDBC",
      "Administrative management portal for room reservations and staff scheduling",
      "Automated PDF billing invoice generation and relational MySQL storage"
    ],
    deliverables: ["Java EE Enterprise System", "Relational Database Layer", "PDF Billing Generator"],
    order: 6
  },
  {
    id: "paws-shop-erp",
    title: "The Paws Shop – Pet Supply Management",
    category: "Desktop Application",
    subtitle: "Pet Supply Management & Point-of-Sale System",
    description: "Pet supply management system.",
    techStack: ["Java", "SQL"],
    featured: false,
    image: "/hero/project-paws.jpg",
    gradient: "from-blue-500/30 to-slate-950/30",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Object-oriented Java desktop application for product catalog and inventory management",
      "Point-of-sale receipting, transaction auditing, and supplier reorder threshold triggers",
      "Relational SQL database integration ensuring ledger consistency"
    ],
    deliverables: ["Java Desktop Application", "SQL Database Layer", "User Documentation"],
    order: 7
  },
  {
    id: "upcountry-warriors",
    title: "Upcountry Warriors – Player & Team Management",
    category: "Desktop Application",
    subtitle: "Player and Team Management Application",
    description: "Player and team management application.",
    techStack: ["C++", "SQL"],
    featured: false,
    image: "/hero/project-warriors.jpg",
    gradient: "from-amber-700/30 to-indigo-950/30",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Object-oriented C++ application architecture for sports team roster management",
      "SQL connectivity layer for player profiles, statistics, and tournament tracking",
      "Low-latency data processing and structured memory management"
    ],
    deliverables: ["C++ Application Engine", "Database Integration Layer"],
    order: 8
  }
];

export const verifiedSkills = [
  {
    category: "Languages",
    icon: "Code",
    order: 0,
    items: [
      { name: "JavaScript", level: 95 },
      { name: "Java", level: 90 },
      { name: "Python", level: 90 },
      { name: "PHP", level: 85 },
      { name: "SQL", level: 90 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "C++", level: 85 },
      { name: "C#", level: 80 }
    ]
  },
  {
    category: "Frontend Development",
    icon: "Layout",
    order: 1,
    items: [
      { name: "React", level: 95 },
      { name: "Vite", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Three.js", level: 88 },
      { name: "Framer Motion", level: 85 }
    ]
  },
  {
    category: "Backend Development",
    icon: "Server",
    order: 2,
    items: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 92 },
      { name: "Flask", level: 88 },
      { name: "Java EE", level: 85 },
      { name: "REST APIs", level: 95 },
      { name: "JWT Auth", level: 92 }
    ]
  },
  {
    category: "Databases",
    icon: "Database",
    order: 3,
    items: [
      { name: "MongoDB Atlas", level: 92 },
      { name: "MySQL", level: 90 },
      { name: "SQLite", level: 90 }
    ]
  },
  {
    category: "Development Tools",
    icon: "Terminal",
    order: 4,
    items: [
      { name: "Git & GitHub", level: 95 },
      { name: "Visual Studio Code", level: 95 },
      { name: "Android Studio", level: 90 },
      { name: "Visual Studio", level: 85 },
      { name: "NetBeans", level: 85 },
      { name: "WAMP", level: 85 },
      { name: "Jupyter Notebook", level: 88 },
      { name: "Google Colab", level: 88 },
      { name: "phpMyAdmin", level: 88 }
    ]
  },
  {
    category: "Additional Technologies",
    icon: "Cpu",
    order: 5,
    items: [
      { name: "WebRTC", level: 88 },
      { name: "Cloudinary", level: 90 },
      { name: "Vercel", level: 92 },
      { name: "Machine Learning", level: 85 },
      { name: "MobileNetV3", level: 85 },
      { name: "JUnit & Robolectric", level: 88 }
    ]
  }
];

export const verifiedEducation = [
  {
    degree: "BSc (Hons) Software Engineering",
    institution: "ICBT Campus (affiliated with Cardiff Metropolitan University, UK)",
    period: "Coursework completed; final results pending",
    badge: "Results Pending",
    description: "Completed comprehensive software engineering curriculum covering advanced full-stack web applications, distributed systems, mobile computing, and AI-integrated systems.",
    order: 0
  },
  {
    degree: "Higher National Diploma in Computing & Software Engineering",
    institution: "ICBT Campus (affiliated with Cardiff Metropolitan University)",
    period: "Completed",
    badge: "HND Completed",
    description: "In-depth foundation in enterprise software architecture, database management systems, object-oriented software engineering, and web development.",
    order: 1
  },
  {
    degree: "G.C.E. Advanced Level — Physical Science Stream",
    institution: "Sri Lanka",
    period: "2021",
    badge: "Physical Science",
    description: "Rigorous scientific foundation in Combined Mathematics, Physics, and Chemistry.",
    order: 2
  },
  {
    degree: "G.C.E. Ordinary Level Examination",
    institution: "Sri Lanka",
    period: "2018",
    badge: "Ordinary Level",
    description: "Completed secondary education with distinctions across Mathematics, Science, and Information Technology.",
    order: 3
  }
];

async function syncAll() {
  console.log('[SYNC] Connecting to MongoDB Atlas...');
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  await mongoose.connect(uri);
  console.log(`[SYNC] Connected to database: ${mongoose.connection.name}`);

  // 1. Profile
  await Profile.deleteMany({});
  await Profile.create(verifiedProfile);
  console.log('✓ Profile synchronized in MongoDB Atlas');

  // 2. Projects
  await Project.deleteMany({});
  await Project.insertMany(verifiedProjects);
  console.log(`✓ Projects synchronized in MongoDB Atlas (${verifiedProjects.length} projects)`);

  // 3. Skills
  await SkillCategory.deleteMany({});
  await SkillCategory.insertMany(verifiedSkills);
  console.log(`✓ Skills categories synchronized in MongoDB Atlas (${verifiedSkills.length} categories)`);

  // 4. Education
  await Education.deleteMany({});
  await Education.insertMany(verifiedEducation);
  console.log(`✓ Education milestones synchronized in MongoDB Atlas (${verifiedEducation.length} milestones)`);

  await mongoose.disconnect();
  console.log('[SYNC] Disconnected from MongoDB Atlas.');

  // Synchronize local fallback db.json as well
  let existingDb = {};
  if (fs.existsSync(DB_FILE)) {
    try {
      existingDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch (e) {}
  }

  const updatedDb = {
    ...existingDb,
    profile: {
      ...verifiedProfile,
      avatarImage: existingDb.profile?.avatarImage || "",
      avatarImagePublicId: existingDb.profile?.avatarImagePublicId || "",
      avatarImageUpdatedAt: existingDb.profile?.avatarImageUpdatedAt || null
    },
    projects: verifiedProjects,
    skills: verifiedSkills,
    education: verifiedEducation
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(updatedDb, null, 2), 'utf-8');
  console.log(`✓ Local fallback database synchronized at ${DB_FILE}`);
}

syncAll().catch((err) => {
  console.error('[SYNC ERROR]:', err);
  process.exit(1);
});
