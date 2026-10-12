import React from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Smartphone, 
  Terminal, 
  Palette,
  ArrowRight
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
  Python: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <path d="M63.6 12C36.6 12 38.3 23.7 38.3 23.7L38.4 35.8H64.3V39.5H27.7C27.7 39.5 12 37.7 12 64.6C12 91.5 25.7 89.9 25.7 89.9H33.9V78.4C33.9 78.4 33.4 64.6 47.4 64.6H73.3V52.8C73.3 52.8 74.3 39.5 63.6 39.5H63.6V12ZM52.2 20.3C55.4 20.3 58 22.9 58 26.1C58 29.3 55.4 31.9 52.2 31.9C49 31.9 46.4 29.3 46.4 26.1C46.4 22.9 49 20.3 52.2 20.3Z" fill="#3776AB" />
      <path d="M64.4 116C91.4 116 89.7 104.3 89.7 104.3L89.6 92.2H63.7V88.5H100.3C100.3 88.5 116 90.3 116 63.4C116 36.5 102.3 38.1 102.3 38.1H94.1V49.6C94.1 49.6 94.6 63.4 80.6 63.4H54.7V75.2C54.7 75.2 53.7 88.5 64.4 88.5H64.4V116ZM75.8 107.7C72.6 107.7 70 105.1 70 101.9C70 98.7 72.6 96.1 75.8 96.1C79 96.1 81.6 98.7 81.6 101.9C81.6 105.1 79 107.7 75.8 107.7Z" fill="#FFD43B" />
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
  Postgres: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="64" cy="64" r="64" fill="#336791" />
      <path d="M64 28C46 28 36 40 36 56C36 74 46 92 60 98V86C52 82 48 72 48 62C48 50 56 40 64 40C72 40 80 50 80 62C80 72 76 82 68 86V98C82 92 92 74 92 56C92 40 82 28 64 28Z" fill="white" />
    </svg>
  ),
  AWS: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#FF9900" />
      <path d="M30 75C54 90 80 90 100 75" stroke="#232F3E" strokeWidth="10" strokeLinecap="round" />
      <polygon points="102,74 96,86 106,82" fill="#232F3E" />
    </svg>
  ),
  Firebase: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <path d="M26 98L44 24L58 52L26 98Z" fill="#FFA000" />
      <path d="M102 98L80 40L26 98H102Z" fill="#FFCA28" />
      <path d="M102 98L80 40L58 52L102 98Z" fill="#F57C00" />
    </svg>
  ),
  SQLite: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="20" fill="#003B57" />
      <text x="64" y="85" fill="#38BDF8" fontFamily="sans-serif" fontWeight="900" fontSize="34" textAnchor="middle">SQL</text>
    </svg>
  ),
  ReactNative: () => (
    <svg width="18" height="18" viewBox="0 0 115.3 100" fill="#61DAFB">
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(30 57.65 50)" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(90 57.65 50)" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(150 57.65 50)" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <circle cx="57.65" cy="50" r="9" fill="#61DAFB" />
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
  Flutter: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <path d="M78 12L24 66L42 84L114 12H78Z" fill="#42A5F5" />
      <path d="M78 72L50 100L68 118L114 72H78Z" fill="#0D47A1" />
      <path d="M50 100L68 82L86 100L68 118L50 100Z" fill="#29B6F6" />
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
  Docker: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="64" cy="64" r="64" fill="#2496ED" />
      <rect x="32" y="52" width="14" height="12" fill="white" rx="2" />
      <rect x="50" y="52" width="14" height="12" fill="white" rx="2" />
      <rect x="68" y="52" width="14" height="12" fill="white" rx="2" />
      <rect x="50" y="36" width="14" height="12" fill="white" rx="2" />
      <path d="M22 68C26 88 50 94 74 94C102 94 112 78 112 68H22Z" fill="white" />
    </svg>
  ),
  Linux: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="64" cy="64" r="64" fill="#0F172A" />
      <ellipse cx="64" cy="68" rx="30" ry="38" fill="white" />
      <circle cx="52" cy="50" r="6" fill="#0F172A" />
      <circle cx="76" cy="50" r="6" fill="#0F172A" />
      <polygon points="64,58 54,68 74,68" fill="#F59E0B" />
    </svg>
  ),
  Vite: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <polygon points="64,12 118,28 64,116 10,28" fill="#BD34FE" />
      <polygon points="64,16 112,30 64,110 16,30" fill="#41D1FF" />
      <polygon points="66,24 40,68 62,68 56,104 88,52 66,52" fill="#FFD43B" />
    </svg>
  ),
  CICD: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  ),
  Figma: () => (
    <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
      <circle cx="44" cy="40" r="20" fill="#F24E1E" />
      <circle cx="84" cy="40" r="20" fill="#FF7262" />
      <circle cx="44" cy="64" r="20" fill="#A259FF" />
      <circle cx="84" cy="64" r="20" fill="#1ABCFE" />
      <circle cx="44" cy="88" r="20" fill="#0ACF83" />
    </svg>
  ),
  UIUX: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Responsive: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Performance: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
};

export default function SkillsSection() {
  // 6 Categorized Panels matching reference image 1:1
  const skillPanels = [
    {
      num: '01',
      title: 'Frontend Development',
      desc: 'Building responsive and interactive user interfaces with modern frameworks',
      icon: <Code2 size={22} color="#18130D" />,
      skills: [
        { name: 'React', badge: 'v18+', badgeType: 'blue', Icon: BrandIcons.React },
        { name: 'Next.js', badge: 'SSR/SSG', badgeType: 'champagne', Icon: BrandIcons.Nextjs },
        { name: 'TypeScript', badge: 'Strict', badgeType: 'blue', Icon: BrandIcons.TypeScript },
        { name: 'JavaScript', badge: 'ES6+', badgeType: 'champagne', Icon: BrandIcons.JavaScript },
        { name: 'HTML5/CSS3', badge: 'Modern', badgeType: 'orange', Icon: BrandIcons.HTML5 },
        { name: 'Three.js', badge: 'WebGL', badgeType: 'champagne', Icon: BrandIcons.Threejs }
      ]
    },
    {
      num: '02',
      title: 'Backend Development',
      desc: 'Developing robust and scalable server-side applications',
      icon: <Server size={22} color="#18130D" />,
      skills: [
        { name: 'Node.js', badge: 'Runtime', badgeType: 'green', Icon: BrandIcons.Nodejs },
        { name: 'Express.js', badge: 'REST API', badgeType: 'champagne', Icon: BrandIcons.Express },
        { name: 'Python', badge: 'Async', badgeType: 'champagne', Icon: BrandIcons.Python },
        { name: 'REST APIs', badge: 'Microservices', badgeType: 'champagne', Icon: BrandIcons.RestAPI },
        { name: 'JWT Auth', badge: 'Security', badgeType: 'green', Icon: BrandIcons.Jwt }
      ]
    },
    {
      num: '03',
      title: 'Database & Cloud',
      desc: 'Managing data and cloud infrastructure for scalable solutions',
      icon: <Database size={22} color="#18130D" />,
      skills: [
        { name: 'MongoDB', badge: 'NoSQL', badgeType: 'green', Icon: BrandIcons.MongoDB },
        { name: 'PostgreSQL', badge: 'Relational', badgeType: 'blue', Icon: BrandIcons.Postgres },
        { name: 'AWS', badge: 'Cloud', badgeType: 'champagne', Icon: BrandIcons.AWS },
        { name: 'Firebase', badge: 'Realtime', badgeType: 'champagne', Icon: BrandIcons.Firebase },
        { name: 'SQLite', badge: 'Embedded', badgeType: 'blue', Icon: BrandIcons.SQLite }
      ]
    },
    {
      num: '04',
      title: 'Mobile Development',
      desc: 'Creating cross-platform mobile applications for modern devices',
      icon: <Smartphone size={22} color="#18130D" />,
      skills: [
        { name: 'React Native', badge: 'Cross-platform', badgeType: 'green', Icon: BrandIcons.ReactNative },
        { name: 'Android / Java', badge: 'Native SDK', badgeType: 'green', Icon: BrandIcons.Android },
        { name: 'Flutter', badge: 'Dart', badgeType: 'blue', Icon: BrandIcons.Flutter }
      ]
    },
    {
      num: '05',
      title: 'Tools & DevOps',
      desc: 'Streamlining development and deployment workflows',
      icon: <Terminal size={22} color="#18130D" />,
      skills: [
        { name: 'Git & GitHub', badge: 'VCS', badgeType: 'champagne', Icon: BrandIcons.Git },
        { name: 'Docker', badge: 'Containers', badgeType: 'champagne', Icon: BrandIcons.Docker },
        { name: 'Linux', badge: 'CLI/SSH', badgeType: 'champagne', Icon: BrandIcons.Linux },
        { name: 'Vite', badge: 'Bundler', badgeType: 'champagne', Icon: BrandIcons.Vite },
        { name: 'CI/CD Pipelines', badge: 'Automated', badgeType: 'green', Icon: BrandIcons.CICD }
      ]
    },
    {
      num: '06',
      title: 'Design & Others',
      desc: 'Designing beautiful and performant user experiences',
      icon: <Palette size={22} color="#18130D" />,
      skills: [
        { name: 'Figma', badge: 'Prototyping', badgeType: 'champagne', Icon: BrandIcons.Figma },
        { name: 'UI/UX Design', badge: 'Design System', badgeType: 'champagne', Icon: BrandIcons.UIUX },
        { name: 'Responsive UI', badge: 'Mobile-first', badgeType: 'blue', Icon: BrandIcons.Responsive },
        { name: 'Performance Opt', badge: 'Lighthouse', badgeType: 'champagne', Icon: BrandIcons.Performance }
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
            gridTemplateColumns: 'repeat(3, 1fr)',
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
        [data-theme="dark"] .skill-card-luxury {
          background: rgba(14, 22, 36, 0.8) !important;
          border-color: rgba(217, 169, 104, 0.25) !important;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45) !important;
        }
        [data-theme="dark"] .skill-pill-item {
          background: rgba(20, 31, 50, 0.8) !important;
          border-color: rgba(245, 240, 232, 0.1) !important;
        }
        [data-theme="dark"] .skill-pill-item span.font-sans {
          color: #F8FAFC !important;
        }

        @media (max-width: 1100px) {
          .skills-panels-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 680px) {
          .skills-panels-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
