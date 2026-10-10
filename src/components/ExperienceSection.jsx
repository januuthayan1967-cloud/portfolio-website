import React, { useState } from 'react';
import { Calendar, Briefcase, GraduationCap, Building2, MapPin, Sparkles } from 'lucide-react';

export default function ExperienceSection({ education = [] }) {
  const [activeTab, setActiveTab] = useState('experience');

  const experienceItems = [
    {
      period: "2023 - Present",
      role: "Full-Stack Developer",
      company: "Tech Solutions Company",
      desc: "Building scalable web platforms and enterprise solutions using modern technologies.",
      highlights: ["Architected microservices & REST APIs", "Reduced query latency by 45%", "Engineered high-performance React frontend"]
    },
    {
      period: "2022 - 2023",
      role: "Software Engineer (Intern)",
      company: "Innovation Labs",
      desc: "Developed and maintained web applications, collaborated with cross-functional teams.",
      highlights: ["Spearheaded automated testing workflows", "Collaborated on multi-tenant architecture", "Implemented responsive UI designs"]
    },
    {
      period: "2021 - 2022",
      role: "Freelance Developer",
      company: "Independent",
      desc: "Delivered custom solutions for various clients across different industries.",
      highlights: ["Engineered bespoke client portals", "Custom database schema modeling", "Delivered 100% on-time deployments"]
    }
  ];

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="badge-gold">05 // EXPERIENCE</span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              CHRONOLOGICAL TRAJECTORY
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
              PROFESSIONAL <span className="gold-gradient-text">JOURNEY</span>
            </h2>

            {/* Toggle Tab: Professional vs Academic */}
            <div
              style={{
                display: 'inline-flex',
                padding: '4px',
                borderRadius: '9999px',
                background: 'rgba(14, 22, 36, 0.8)',
                border: '1px solid var(--border-gold)'
              }}
            >
              <button
                onClick={() => setActiveTab('experience')}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeTab === 'experience' ? 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)' : 'transparent',
                  color: activeTab === 'experience' ? '#0B1018' : 'var(--text-muted)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                Work Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeTab === 'education' ? 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)' : 'transparent',
                  color: activeTab === 'education' ? '#0B1018' : 'var(--text-muted)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                Education
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            DESKTOP: CINEMATIC HORIZONTAL TIMELINE
           ======================================================== */}
        <div className="desktop-timeline" style={{ position: 'relative', marginTop: '20px' }}>
          {/* Glowing Horizontal Axis */}
          <div className="timeline-line-h" />

          <div className="timeline-track-h">
            {(activeTab === 'experience' ? experienceItems : education).map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Node on Line */}
                <div className="timeline-node-h" />

                {/* Card Below Node */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '18px',
                    border: '1px solid rgba(217, 169, 104, 0.25)',
                    background: 'rgba(14, 22, 36, 0.75)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.35s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--gold-light)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(217, 169, 104, 0.25)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  {/* Period Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge-gold" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                      <Calendar size={12} />
                      {item.period}
                    </span>
                  </div>

                  {/* Title / Role */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      marginTop: '4px'
                    }}
                  >
                    {item.role || item.degree}
                  </h3>

                  {/* Organization */}
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--gold-primary)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {item.company || item.institution}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6
                    }}
                  >
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            MOBILE: VERTICAL TIMELINE (Consistent with reference)
           ======================================================== */}
        <div className="mobile-timeline" style={{ position: 'relative' }}>
          {/* Vertical gold line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '14px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--gold-primary) 0%, rgba(217, 169, 104, 0.2) 90%, transparent 100%)',
              boxShadow: '0 0 10px var(--gold-glow)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {(activeTab === 'experience' ? experienceItems : education).map((item, idx) => (
              <div key={idx} style={{ position: 'relative', paddingLeft: '44px' }}>
                {/* Node */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '5px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#0B1018',
                    border: '2px solid var(--gold-primary)',
                    boxShadow: '0 0 12px var(--gold-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-light)' }} />
                </div>

                {/* Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(217, 169, 104, 0.25)',
                    background: 'rgba(14, 22, 36, 0.75)'
                  }}
                >
                  <span className="badge-gold" style={{ fontSize: '0.7rem', padding: '2px 8px', marginBottom: '8px' }}>
                    {item.period}
                  </span>
                  <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {item.role || item.degree}
                  </h3>
                  <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', marginBottom: '8px' }}>
                    {item.company || item.institution}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .desktop-timeline {
          display: block;
        }
        .mobile-timeline {
          display: none;
        }
        @media (max-width: 900px) {
          .desktop-timeline {
            display: none !important;
          }
          .mobile-timeline {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
