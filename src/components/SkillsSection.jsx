import React from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Smartphone, 
  Terminal, 
  Palette,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';
import CinematicAtmosphere from './CinematicAtmosphere';

// Brand SVG Icons crafted to match the reference design exactly
const BrandIcons = {
  React: () => (
    <svg width="18" height="18" viewBox="0 0 115.3 100" fill="#61DAFB">
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(30 57.65 50)" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(90 57.65 50)" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(150 57.65 50)" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <circle cx="57.65" cy="50" r="9" fill="#61DAFB" />
    </svg>
  ),
  Nextjs: () => (
    <svg width="18" height="18" viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path d="M149.508 157.086L69.856 54H54V125.97H66.8837V69.7578L139.691 163.535C143.109 161.564 146.394 159.404 149.508 157.086Z" fill="white" />
      <rect x="115" y="54" width="13" height="72" fill="white" />
    </svg>
  ),
  TypeScript: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path d="M72 80V96H56V80H40V64H88V80H72Z" fill="white" />
      <text x="64" y="90" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="56" textAnchor="middle">TS</text>
    </svg>
  ),
  JavaScript: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#F7DF1E" />
      <text x="64" y="90" fill="#000000" fontFamily="sans-serif" fontWeight="900" fontSize="56" textAnchor="middle">JS</text>
    </svg>
  ),
  Java: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#5382A1" />
      <text x="64" y="86" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="50" textAnchor="middle">Java</text>
    </svg>
  ),
  Python: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <path d="M63.6 12C36.6 12 38.3 23.7 38.3 23.7L38.4 35.8H64.3V39.5H27.7C27.7 39.5 12 37.7 12 64.6C12 91.5 25.7 89.9 25.7 89.9H33.9V78.4C33.9 78.4 33.4 64.6 47.4 64.6H73.3V52.8C73.3 52.8 74.3 39.5 63.6 39.5H63.6V12ZM52.2 20.3C55.4 20.3 58 22.9 58 26.1C58 29.3 55.4 31.9 52.2 31.9C49 31.9 46.4 29.3 46.4 26.1C46.4 22.9 49 20.3 52.2 20.3Z" fill="#3776AB" />
      <path d="M64.4 116C91.4 116 89.7 104.3 89.7 104.3L89.6 92.2H63.7V88.5H100.3C100.3 88.5 116 90.3 116 63.4C116 36.5 102.3 38.1 102.3 38.1H94.1V49.6C94.1 49.6 94.6 63.4 80.6 63.4H54.7V75.2C54.7 75.2 53.7 88.5 64.4 88.5H64.4V116ZM75.8 107.7C72.6 107.7 70 105.1 70 101.9C70 98.7 72.6 96.1 75.8 96.1C79 96.1 81.6 98.7 81.6 101.9C81.6 105.1 79 107.7 75.8 107.7Z" fill="#FFD43B" />
    </svg>
  ),
  PHP: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <ellipse cx="64" cy="64" rx="60" ry="40" fill="#777BB4" />
      <text x="64" y="78" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="42" textAnchor="middle">PHP</text>
    </svg>
  ),
  SQL: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#003B57" />
      <text x="64" y="85" fill="#38BDF8" fontFamily="sans-serif" fontWeight="900" fontSize="42" textAnchor="middle">SQL</text>
    </svg>
  ),
  CPP: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#00599C" />
      <text x="64" y="85" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="46" textAnchor="middle">C++</text>
    </svg>
  ),
  CSharp: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#239120" />
      <text x="64" y="85" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="46" textAnchor="middle">C#</text>
    </svg>
  ),
  HTML5: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <polygon points="19,112 10,12 118,12 109,112 64,124" fill="#E44D26" />
      <polygon points="64,114 100,104 107,24 64,24" fill="#F16529" />
      <path d="M64 48H86L84 68H64V84L78 80L79 72H92L90 92L64 100V48Z" fill="white" />
      <path d="M64 48H42L44 68H64V48ZM64 84V100L38 92L36 68H49L50 80L64 84Z" fill="#EBEBEB" />
    </svg>
  ),
  Threejs: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="64" cy="64" r="64" fill="#000000" />
      <path d="M64 24L100 88H28L64 24Z" fill="none" stroke="white" strokeWidth="8" strokeLinejoin="round" />
      <circle cx="64" cy="48" r="6" fill="#FDE047" />
    </svg>
  ),
  Tailwind: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#38BDF8">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
    </svg>
  ),
  FramerMotion: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <polygon points="64,14 114,64 14,64" fill="#EA4C89" />
      <polygon points="14,64 64,114 114,64" fill="#0055FF" />
    </svg>
  ),
  Nodejs: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <polygon points="64,14 114,43 114,101 64,130 14,101 14,43" fill="#339933" />
      <text x="64" y="85" fill="white" fontFamily="sans-serif" fontWeight="800" fontSize="48" textAnchor="middle">N</text>
    </svg>
  ),
  Express: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="64" cy="64" r="64" fill="#1E293B" />
      <text x="64" y="78" fill="white" fontFamily="sans-serif" fontWeight="800" fontSize="36" textAnchor="middle">ex</text>
    </svg>
  ),
  Flask: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31L4.66 19.3A2 2 0 0 0 6.36 22h11.28a2 2 0 0 0 1.7-2.7L14 9.31V2" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3h-4" />
    </svg>
  ),
  RestAPI: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Jwt: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  MongoDB: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <path d="M64 4C64 4 38 40 38 72C38 88 50 106 64 124C78 106 90 88 90 72C90 40 64 4 64 4Z" fill="#13AA52" />
      <path d="M64 4C64 4 62 44 62 74C62 88 64 124 64 124C78 106 90 88 90 72C90 40 64 4 64 4Z" fill="#119245" />
    </svg>
  ),
  MySQL: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#00618A" />
      <text x="64" y="85" fill="#E48E00" fontFamily="sans-serif" fontWeight="900" fontSize="36" textAnchor="middle">MySQL</text>
    </svg>
  ),
  SQLite: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#003B57" />
      <text x="64" y="85" fill="#38BDF8" fontFamily="sans-serif" fontWeight="900" fontSize="34" textAnchor="middle">SQL</text>
    </svg>
  ),
  Android: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="44" cy="52" r="5" fill="#3DDC84" />
      <circle cx="84" cy="52" r="5" fill="#3DDC84" />
      <path d="M34 68C34 46 48 32 64 32C80 32 94 46 94 68H34Z" fill="#3DDC84" />
      <line x1="46" y1="28" x2="38" y2="16" stroke="#3DDC84" strokeWidth="6" strokeLinecap="round" />
      <line x1="82" y1="28" x2="90" y2="16" stroke="#3DDC84" strokeWidth="6" strokeLinecap="round" />
      <rect x="34" y="74" width="60" height="36" rx="6" fill="#3DDC84" />
    </svg>
  ),
  Git: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#F05032" />
      <path d="M88 40L40 88M40 40L88 88" stroke="white" strokeWidth="12" strokeLinecap="round" />
      <circle cx="40" cy="40" r="12" fill="white" />
      <circle cx="88" cy="88" r="12" fill="white" />
      <circle cx="64" cy="64" r="12" fill="white" />
    </svg>
  ),
  Vite: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <polygon points="64,12 118,28 64,116 10,28" fill="#BD34FE" />
      <polygon points="64,16 112,30 64,110 16,30" fill="#41D1FF" />
      <polygon points="66,24 40,68 62,68 56,104 88,52 66,52" fill="#FFD43B" />
    </svg>
  ),
  WebRTC: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  MachineLearning: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
};

// Helper function to resolve skill icons
function getSkillIcon(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('react') && !n.includes('native')) return BrandIcons.React;
  if (n.includes('javascript') || n === 'js') return BrandIcons.JavaScript;
  if (n.includes('typescript') || n === 'ts') return BrandIcons.TypeScript;
  if (n.includes('python')) return BrandIcons.Python;
  if (n.includes('java ee') || n.includes('jsp') || n.includes('servlet')) return BrandIcons.Java;
  if (n.includes('java') && !n.includes('script')) return BrandIcons.Java;
  if (n.includes('c++')) return BrandIcons.CPP;
  if (n.includes('c#')) return BrandIcons.CSharp;
  if (n.includes('php')) return BrandIcons.PHP;
  if (n.includes('mysql')) return BrandIcons.MySQL;
  if (n.includes('sqlite')) return BrandIcons.SQLite;
  if (n.includes('sql')) return BrandIcons.SQL;
  if (n.includes('html') || n.includes('css')) return BrandIcons.HTML5;
  if (n.includes('three')) return BrandIcons.Threejs;
  if (n.includes('tailwind')) return BrandIcons.Tailwind;
  if (n.includes('framer')) return BrandIcons.FramerMotion;
  if (n.includes('node')) return BrandIcons.Nodejs;
  if (n.includes('express')) return BrandIcons.Express;
  if (n.includes('flask')) return BrandIcons.Flask;
  if (n.includes('rest') || n.includes('api')) return BrandIcons.RestAPI;
  if (n.includes('jwt') || n.includes('auth')) return BrandIcons.Jwt;
  if (n.includes('mongo')) return BrandIcons.MongoDB;
  if (n.includes('android')) return BrandIcons.Android;
  if (n.includes('git')) return BrandIcons.Git;
  if (n.includes('vite')) return BrandIcons.Vite;
  if (n.includes('webrtc')) return BrandIcons.WebRTC;
  if (n.includes('machine learning') || n.includes('mobilenet') || n.includes('gemini')) return BrandIcons.MachineLearning;
  return BrandIcons.JavaScript;
}

function getCategoryIcon(catName, iconName) {
  const n = (catName || '').toLowerCase();
  if (n.includes('language') || iconName === 'Code') return <Code2 size={22} color="#18130D" />;
  if (n.includes('front') || iconName === 'Layout') return <Layers size={22} color="#18130D" />;
  if (n.includes('back') || iconName === 'Server') return <Server size={22} color="#18130D" />;
  if (n.includes('data') || iconName === 'Database') return <Database size={22} color="#18130D" />;
  if (n.includes('tool') || iconName === 'Terminal') return <Terminal size={22} color="#18130D" />;
  return <Cpu size={22} color="#18130D" />;
}

function getCategoryDescription(catName) {
  const n = (catName || '').toLowerCase();
  if (n.includes('language')) return 'Core programming languages for full-stack, systems, and mobile software';
  if (n.includes('front')) return 'Building responsive and interactive user interfaces with modern frameworks';
  if (n.includes('back')) return 'Developing robust, scalable server architectures, microservices, and REST APIs';
  if (n.includes('data')) return 'Relational, embedded, and distributed cloud NoSQL database engines';
  if (n.includes('tool')) return 'Professional IDEs, development environments, and version control workflows';
  return 'AI microservices, WebRTC streaming, and cloud platform integrations';
}

export default function SkillsSection({ skills = [] }) {
  // Build panels from skills prop if available, or fallback to default panels
  const skillPanels = (Array.isArray(skills) && skills.length > 0)
    ? skills.map((cat, idx) => ({
        num: String(idx + 1).padStart(2, '0'),
        title: cat.category,
        desc: getCategoryDescription(cat.category),
        icon: getCategoryIcon(cat.category, cat.icon),
        skills: (cat.items || []).map((item) => {
          const badgeType = item.level >= 90 ? 'blue' : (item.level >= 85 ? 'champagne' : 'green');
          return {
            name: item.name,
            badge: item.level ? `${item.level}%` : 'Verified',
            badgeType,
            Icon: getSkillIcon(item.name)
          };
        })
      }))
    : [
        {
          num: '01',
          title: 'Languages',
          desc: 'Core programming languages for full-stack, systems, and mobile software',
          icon: <Code2 size={22} color="#18130D" />,
          skills: [
            { name: 'JavaScript', badge: '95%', badgeType: 'blue', Icon: BrandIcons.JavaScript },
            { name: 'Java', badge: '90%', badgeType: 'blue', Icon: BrandIcons.Java },
            { name: 'Python', badge: '90%', badgeType: 'blue', Icon: BrandIcons.Python },
            { name: 'PHP', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.PHP },
            { name: 'SQL', badge: '90%', badgeType: 'blue', Icon: BrandIcons.SQL },
            { name: 'HTML5 & CSS3', badge: '95%', badgeType: 'blue', Icon: BrandIcons.HTML5 },
            { name: 'C++', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.CPP },
            { name: 'C#', badge: '80%', badgeType: 'green', Icon: BrandIcons.CSharp }
          ]
        },
        {
          num: '02',
          title: 'Frontend Development',
          desc: 'Building responsive and interactive user interfaces with modern frameworks',
          icon: <Layers size={22} color="#18130D" />,
          skills: [
            { name: 'React', badge: '95%', badgeType: 'blue', Icon: BrandIcons.React },
            { name: 'Vite', badge: '90%', badgeType: 'blue', Icon: BrandIcons.Vite },
            { name: 'Tailwind CSS', badge: '92%', badgeType: 'blue', Icon: BrandIcons.Tailwind },
            { name: 'Three.js', badge: '88%', badgeType: 'champagne', Icon: BrandIcons.Threejs },
            { name: 'Framer Motion', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.FramerMotion }
          ]
        },
        {
          num: '03',
          title: 'Backend Development',
          desc: 'Developing robust, scalable server architectures, microservices, and REST APIs',
          icon: <Server size={22} color="#18130D" />,
          skills: [
            { name: 'Node.js', badge: '92%', badgeType: 'blue', Icon: BrandIcons.Nodejs },
            { name: 'Express.js', badge: '92%', badgeType: 'blue', Icon: BrandIcons.Express },
            { name: 'Flask', badge: '88%', badgeType: 'champagne', Icon: BrandIcons.Flask },
            { name: 'Java EE', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.Java },
            { name: 'REST APIs', badge: '95%', badgeType: 'blue', Icon: BrandIcons.RestAPI },
            { name: 'JWT Auth', badge: '92%', badgeType: 'blue', Icon: BrandIcons.Jwt }
          ]
        },
        {
          num: '04',
          title: 'Databases',
          desc: 'Relational, embedded, and distributed cloud NoSQL database engines',
          icon: <Database size={22} color="#18130D" />,
          skills: [
            { name: 'MongoDB Atlas', badge: '92%', badgeType: 'blue', Icon: BrandIcons.MongoDB },
            { name: 'MySQL', badge: '90%', badgeType: 'blue', Icon: BrandIcons.MySQL },
            { name: 'SQLite', badge: '90%', badgeType: 'blue', Icon: BrandIcons.SQLite }
          ]
        },
        {
          num: '05',
          title: 'Development Tools',
          desc: 'Professional IDEs, development environments, and version control workflows',
          icon: <Terminal size={22} color="#18130D" />,
          skills: [
            { name: 'Git & GitHub', badge: '95%', badgeType: 'blue', Icon: BrandIcons.Git },
            { name: 'VS Code', badge: '95%', badgeType: 'blue', Icon: BrandIcons.JavaScript },
            { name: 'Android Studio', badge: '90%', badgeType: 'blue', Icon: BrandIcons.Android },
            { name: 'Visual Studio', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.CPP },
            { name: 'NetBeans', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.Java },
            { name: 'WAMP', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.PHP },
            { name: 'Jupyter', badge: '88%', badgeType: 'champagne', Icon: BrandIcons.Python }
          ]
        },
        {
          num: '06',
          title: 'Additional Technologies',
          desc: 'AI microservices, WebRTC streaming, and cloud platform integrations',
          icon: <Cpu size={22} color="#18130D" />,
          skills: [
            { name: 'WebRTC', badge: '88%', badgeType: 'champagne', Icon: BrandIcons.WebRTC },
            { name: 'Cloudinary', badge: '90%', badgeType: 'blue', Icon: BrandIcons.JavaScript },
            { name: 'Vercel', badge: '92%', badgeType: 'blue', Icon: BrandIcons.JavaScript },
            { name: 'Machine Learning', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.MachineLearning },
            { name: 'MobileNetV3', badge: '85%', badgeType: 'champagne', Icon: BrandIcons.MachineLearning },
            { name: 'JUnit & Robolectric', badge: '88%', badgeType: 'champagne', Icon: BrandIcons.Java }
          ]
        }
      ];

  // Helper function for badge colors
  const getBadgeStyle = (type) => {
    switch (type) {
      case 'blue':
        return {
          background: 'rgba(2, 132, 199, 0.12)',
          color: '#0284C7',
          border: '1px solid rgba(2, 132, 199, 0.25)'
        };
      case 'green':
        return {
          background: 'rgba(21, 128, 61, 0.12)',
          color: '#15803D',
          border: '1px solid rgba(21, 128, 61, 0.25)'
        };
      case 'orange':
        return {
          background: 'rgba(194, 65, 12, 0.12)',
          color: '#C2410C',
          border: '1px solid rgba(194, 65, 12, 0.25)'
        };
      case 'champagne':
      default:
        return {
          background: 'rgba(217, 119, 6, 0.12)',
          color: '#B45309',
          border: '1px solid rgba(217, 119, 6, 0.25)'
        };
    }
  };

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        padding: '110px 0 120px',
        overflow: 'hidden'
      }}
    >
      <CinematicAtmosphere variant="skills" particlesCount={14} />

      {/* Subtle ambient decorative waves */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(242, 206, 131, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(212, 162, 58, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '46px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(212, 162, 58, 0.12)',
                border: '1px solid rgba(212, 162, 58, 0.35)',
                color: 'var(--text-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}
            >
              04 // SKILLS
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              TECHNICAL MATRIX
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(2.4rem, 4.4vw, 3.4rem)',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '0 0 10px 0'
                }}
              >
                TECHNICAL <span className="gold-gradient-text">EXPERTISE</span>
              </h2>
              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-muted)',
                  maxWidth: '680px',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                A comprehensive overview of my technical skills and tools that I use to build modern, scalable and efficient solutions.
              </p>
            </div>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.86rem',
                textDecoration: 'none',
                padding: '10px 22px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid rgba(226, 185, 107, 0.65)',
                boxShadow: '0 4px 15px rgba(212, 162, 58, 0.1)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 162, 58, 0.22)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 162, 58, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(226, 185, 107, 0.65)';
              }}
            >
              <span>View All Skills</span>
              <ArrowRight size={14} color="var(--gold-dark)" />
            </a>
          </div>
        </div>

        {/* 6 CATEGORIZED LUXURY CARDS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '26px'
          }}
          className="skills-panels-grid"
        >
          {skillPanels.map((panel) => (
            <div
              key={panel.num}
              style={{
                position: 'relative',
                borderRadius: '24px',
                padding: '30px 28px 28px',
                background: 'var(--surface-card)',
                border: '1.5px solid var(--border-gold)',
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '22px',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="skill-card-luxury"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                e.currentTarget.style.borderColor = 'var(--border-gold-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                e.currentTarget.style.borderColor = 'var(--border-gold)';
              }}
            >
              {/* Abstract Golden Wave Watermark in bottom right */}
              <svg
                width="220"
                height="130"
                viewBox="0 0 220 130"
                fill="none"
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '-10px',
                  pointerEvents: 'none',
                  opacity: 0.22,
                  zIndex: 0
                }}
              >
                <path
                  d="M0 130C60 120 90 70 140 60C190 50 200 20 220 0V130H0Z"
                  fill="url(#goldWaveGrad)"
                />
                <defs>
                  <linearGradient id="goldWaveGrad" x1="0" y1="0" x2="220" y2="130" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F2CE83" />
                    <stop offset="1" stopColor="#D4A23A" />
                  </linearGradient>
                </defs>
              </svg>

              {/* CARD TOP ROW: 3D Gold Badge + Title + Number */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  {/* 3D Metallic Golden Icon Badge */}
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #FDE68A 0%, #EAB308 55%, #B45309 100%)',
                      border: '1.5px solid rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 4px 14px rgba(212, 162, 58, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {panel.icon}
                  </div>

                  <div>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: '1.14rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        letterSpacing: '-0.01em',
                        margin: '0 0 4px 0',
                        lineHeight: 1.2
                      }}
                    >
                      {panel.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.45,
                        margin: 0,
                        maxWidth: '240px'
                      }}
                    >
                      {panel.desc}
                    </p>
                  </div>
                </div>

                {/* Giant Golden Number Badge */}
                <span
                  className="font-heading"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--gold-light)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    opacity: 0.95
                  }}
                >
                  {panel.num}
                </span>
              </div>

              {/* SKILLS PILLS GRID */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '9px'
                }}
              >
                {panel.skills.map((skill) => {
                  const IconComponent = skill.Icon;
                  const badgeStyle = getBadgeStyle(skill.badgeType);

                  return (
                    <div
                      key={skill.name}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(226, 185, 107, 0.45)',
                        boxShadow: '0 2px 6px rgba(212, 162, 58, 0.06)',
                        transition: 'all 0.2s ease'
                      }}
                      className="skill-pill-item"
                    >
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComponent />
                      </span>
                      <span
                        className="font-sans"
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          whiteSpace: 'nowrap',
                          ...badgeStyle
                        }}
                      >
                        {skill.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .skills-panels-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .skills-panels-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
