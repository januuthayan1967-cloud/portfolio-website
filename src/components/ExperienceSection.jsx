import React, { useState } from 'react';
import { Calendar, GraduationCap, Building2, MapPin, Sparkles, Award } from 'lucide-react';
import CinematicAtmosphere from './CinematicAtmosphere';

export default function ExperienceSection({ education = [] }) {
  const [activeTab, setActiveTab] = useState('education');

  // Genuine fallback education milestones from CV if not loaded from database
  const fallbackEducation = [
    {
      degree: "BSc (Hons) Software Engineering",
      institution: "ICBT Campus (affiliated with Cardiff Metropolitan University, UK)",
      period: "Coursework completed; final results pending",
      badge: "Results Pending",
      description: "Completed comprehensive software engineering curriculum covering advanced full-stack web applications, distributed systems, mobile computing, and AI-integrated systems."
    },
    {
      degree: "Higher National Diploma in Computing & Software Engineering",
      institution: "ICBT Campus (affiliated with Cardiff Metropolitan University)",
      period: "Completed",
      badge: "HND Completed",
      description: "In-depth foundation in enterprise software architecture, database management systems, object-oriented software engineering, and web development."
    },
    {
      degree: "G.C.E. Advanced Level — Physical Science Stream",
      institution: "Sri Lanka",
      period: "2021",
      badge: "Physical Science",
      description: "Rigorous scientific foundation in Combined Mathematics, Physics, and Chemistry."
    },
    {
      degree: "G.C.E. Ordinary Level Examination",
      institution: "Sri Lanka",
      period: "2018",
      badge: "Ordinary Level",
      description: "Completed secondary education with distinctions across Mathematics, Science, and Information Technology."
    }
  ];

  const displayList = (Array.isArray(education) && education.length > 0) ? education : fallbackEducation;

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      <CinematicAtmosphere variant="experience" particlesCount={14} />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="badge-gold">05 // EDUCATION</span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              ACADEMIC TRAJECTORY &amp; QUALIFICATIONS
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
              ACADEMIC <span className="gold-gradient-text">JOURNEY</span>
            </h2>

            {/* Trajectory Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                padding: '4px',
                borderRadius: '9999px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border-gold)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <button
                onClick={() => setActiveTab('education')}
                style={{
                  padding: '7px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #F2CE83 0%, #D4A23A 100%)',
                  color: '#111827',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 10px rgba(212, 162, 58, 0.25)'
                }}
              >
                Education &amp; Qualifications
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
            {displayList.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Node on Line */}
                <div className="timeline-node-h" />

                {/* Card Below Node */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '18px',
                    border: '1.5px solid var(--border-gold)',
                    background: 'var(--surface-card)',
                    boxShadow: 'var(--card-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.35s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                  }}
                >
                  {/* Period Pill & Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                      <Calendar size={12} />
                      {item.period}
                    </span>
                    {item.badge && (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(214, 165, 72, 0.12)',
                          border: '1px solid rgba(242, 200, 121, 0.35)',
                          color: 'var(--gold-bright, #FFD978)',
                          fontWeight: 600
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title / Degree */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      marginTop: '4px',
                      lineHeight: 1.3
                    }}
                  >
                    {item.degree || item.role}
                  </h3>

                  {/* Institution */}
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.80rem',
                      color: 'var(--gold-primary)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {item.institution || item.company}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {item.description || item.desc}
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
            {displayList.map((item, idx) => (
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
                    background: 'var(--surface-card)',
                    border: '2px solid var(--gold-primary)',
                    boxShadow: '0 0 12px var(--gold-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                </div>

                {/* Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1.5px solid var(--border-gold)',
                    background: 'var(--surface-card)',
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      {item.period}
                    </span>
                    {item.badge && (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.64rem',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: 'rgba(214, 165, 72, 0.12)',
                          border: '1px solid rgba(242, 200, 121, 0.35)',
                          color: 'var(--gold-bright, #FFD978)',
                          fontWeight: 600
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {item.degree || item.role}
                  </h3>
                  <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', marginBottom: '8px' }}>
                    {item.institution || item.company}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                    {item.description || item.desc}
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
