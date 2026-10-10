import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Smartphone, 
  Terminal, 
  Palette, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function SkillsSection({ skills = [] }) {
  const [activeTab, setActiveTab] = useState('All');

  // Curated categories matching the 6 panels in the reference image
  const skillPanels = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Code2 size={18} color="var(--gold-primary)" />,
      skills: [
        { name: 'React', badge: 'v18+', color: '#61DAFB' },
        { name: 'Next.js', badge: 'SSR/SSG', color: '#FFFFFF' },
        { name: 'TypeScript', badge: 'Strict', color: '#3178C6' },
        { name: 'JavaScript', badge: 'ES6+', color: '#F7DF1E' },
        { name: 'HTML5/CSS3', badge: 'Modern', color: '#E34F26' },
        { name: 'Three.js', badge: 'WebGL', color: '#F5F0E8' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: <Server size={18} color="var(--gold-primary)" />,
      skills: [
        { name: 'Node.js', badge: 'Runtime', color: '#68A063' },
        { name: 'Express.js', badge: 'REST API', color: '#FFFFFF' },
        { name: 'Python', badge: 'Async', color: '#3776AB' },
        { name: 'REST APIs', badge: 'Microservices', color: '#D9A968' },
        { name: 'JWT Auth', badge: 'Security', color: '#10B981' }
      ]
    },
    {
      id: 'database',
      title: 'Database & Cloud',
      icon: <Database size={18} color="var(--gold-primary)" />,
      skills: [
        { name: 'MongoDB', badge: 'NoSQL', color: '#13AA52' },
        { name: 'PostgreSQL', badge: 'Relational', color: '#4169E1' },
        { name: 'AWS', badge: 'Cloud', color: '#FF9900' },
        { name: 'Firebase', badge: 'Realtime', color: '#FFCA28' },
        { name: 'SQLite', badge: 'Embedded', color: '#003B57' }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: <Smartphone size={18} color="var(--gold-primary)" />,
      skills: [
        { name: 'React Native', badge: 'Cross-platform', color: '#61DAFB' },
        { name: 'Android / Java', badge: 'Native SDK', color: '#3DDC84' },
        { name: 'Flutter', badge: 'Dart', color: '#02569B' }
      ]
    },
    {
      id: 'devops',
      title: 'Tools & DevOps',
      icon: <Terminal size={18} color="var(--gold-primary)" />,
      skills: [
        { name: 'Git & GitHub', badge: 'VCS', color: '#F05032' },
        { name: 'Docker', badge: 'Containers', color: '#2496ED' },
        { name: 'Linux', badge: 'CLI/SSH', color: '#FCC624' },
        { name: 'Vite', badge: 'Bundler', color: '#646CFF' },
        { name: 'CI/CD Pipelines', badge: 'Automated', color: '#10B981' }
      ]
    },
    {
      id: 'design',
      title: 'Design & Others',
      icon: <Palette size={18} color="var(--gold-primary)" />,
      skills: [
        { name: 'Figma', badge: 'Prototyping', color: '#F24E1E' },
        { name: 'UI/UX Design', badge: 'Design System', color: '#A259FF' },
        { name: 'Responsive UI', badge: 'Mobile-first', color: '#38BDF8' },
        { name: 'Performance Opt', badge: 'Lighthouse', color: '#D9A968' }
      ]
    }
  ];

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="badge-gold">04 // SKILLS</span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              TECHNICAL MATRIX
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.15
              }}
            >
              TECHNICAL <span className="gold-gradient-text">EXPERTISE</span>
            </h2>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--gold-light)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'rgba(217, 169, 104, 0.1)',
                border: '1px solid rgba(217, 169, 104, 0.3)'
              }}
            >
              <span>View All Skills</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* 6 CATEGORIZED CARDS GRID (Reference layout) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}
          className="skills-panels-grid"
        >
          {skillPanels.map((panel) => (
            <div
              key={panel.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(217, 169, 104, 0.22)',
                background: 'rgba(14, 22, 36, 0.72)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                transition: 'all 0.35s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--gold-light)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--gold-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(217, 169, 104, 0.22)';
                e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(217, 169, 104, 0.14)',
                    border: '1px solid rgba(217, 169, 104, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {panel.icon}
                </div>
                <h3
                  className="font-heading"
                  style={{
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {panel.title}
                </h3>
              </div>

              {/* Badges / Tech list */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {panel.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      background: 'rgba(20, 31, 50, 0.65)',
                      border: '1px solid rgba(245, 240, 232, 0.08)'
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: skill.color || 'var(--gold-primary)',
                        boxShadow: `0 0 8px ${skill.color || 'var(--gold-primary)'}`
                      }}
                    />
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.66rem',
                        color: 'var(--gold-primary)',
                        opacity: 0.8
                      }}
                    >
                      {skill.badge}
                    </span>
                  </div>
                ))}
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
