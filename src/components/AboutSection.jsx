import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, CheckCircle2, FileText, X, Cpu, Layers, Users } from 'lucide-react';
import ArchitecturalFrame from './ArchitecturalFrame';
import CinematicAtmosphere from './CinematicAtmosphere';

export default function AboutSection({ profile }) {
  const {
    name = "Uthayagunasingam Vanojan",
    aboutImage = "/hero/image1.jpeg",
    bio = "Motivated Software Engineering graduate candidate who has completed the BSc (Hons) Software Engineering programme at ICBT Campus, affiliated with Cardiff Metropolitan University, UK, and is currently awaiting final results. Holds a Higher National Diploma (HND) in Computing and Software Engineering, with hands-on experience in full-stack web development, Android applications, database management, and AI-integrated systems. Skilled in React.js, Node.js, Java, Python, and SQL through academic and independent projects. Seeking an opportunity to contribute technical expertise and problem-solving skills as a Graduate Software Engineer.",
    resumeUrl
  } = profile || {};

  const [showJourneyModal, setShowJourneyModal] = useState(false);

  const defaultMetrics = [
    { label: "Degree Programme", value: "BSc (Hons)" },
    { label: "Academic Status", value: "Results Pending" },
    { label: "Featured Systems", value: "9 Projects" },
    { label: "Higher Diploma", value: "HND Graduate" }
  ];

  const metrics = (profile?.metrics?.length === 4) ? profile.metrics : defaultMetrics;

  const journeyPillars = [
    {
      title: "Problem Solving",
      icon: Cpu,
      desc: "Deconstructing complex enterprise challenges into clean, modular, and maintainable logic."
    },
    {
      title: "Clean Architecture",
      icon: Layers,
      desc: "Building resilient microservices, normalized databases, and scalable distributed patterns."
    },
    {
      title: "User Focused",
      icon: Users,
      desc: "Crafting intuitive, accessible, and high-performance digital experiences with cinematic aesthetics."
    }
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      {/* Cinematic Ambient Atmosphere Background (Extending Hero Visuals) */}
      <CinematicAtmosphere variant="about" particlesCount={16} />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER EYEBROW (Matches Reference Image 1) */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span className="badge-gold">
              02 - ABOUT
            </span>
            <span
              className="font-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-gold)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              PASSION &bull; PRECISION &bull; PROGRESS
            </span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.15,
              maxWidth: '850px',
              margin: '0 0 8px 0'
            }}
          >
            Turning Complex <span className="gold-gradient-text">Ideas into Scalable Real Solutions.</span>
          </h2>
        </div>

        {/* TWO-COLUMN EDITORIAL COMPOSITION */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '50px',
            alignItems: 'center'
          }}
          className="about-main-grid"
        >
          {/* LEFT COLUMN: BIOGRAPHY, METRICS, CTA, JOURNEY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Professional Biography */}
            <p
              style={{
                fontSize: '1.06rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                fontWeight: 300,
                margin: 0
              }}
            >
              {bio}
            </p>

            {/* 4 Stat Metrics Cards (Matches Reference Image 1) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px'
              }}
              className="about-metrics-row"
            >
              {metrics.map((m) => (
                <div 
                  key={m.label} 
                  style={{ 
                    padding: '16px 14px',
                    borderRadius: '16px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--card-shadow, 0 8px 24px rgba(0, 0, 0, 0.4))',
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease'
                  }}
                  className="about-stat-card"
                >
                  <span
                    className="font-heading gold-gradient-text"
                    style={{ fontSize: '1.85rem', fontWeight: 800, lineHeight: 1.1 }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginTop: '6px',
                      fontWeight: 600,
                      lineHeight: 1.3
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Download CV & Let's Connect (Matches Reference Image 1) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              {Boolean(resumeUrl && resumeUrl.trim() !== '' && resumeUrl !== '#') ? (
                <a
                  href={resumeUrl.startsWith('/api/cv') || resumeUrl.startsWith('http') ? resumeUrl : `/api/cv/download?v=${Date.now()}`}
                  download={profile?.activeCv?.originalFilename || "Vanojan_CV.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold reference-primary"
                  style={{ 
                    padding: '0.85rem 2.2rem', 
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '9999px',
                    textDecoration: 'none'
                  }}
                >
                  <span>Download CV</span>
                  <ArrowUpRight size={17} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="btn-ghost-luxury"
                  title="Executive CV is currently being updated by the administrator"
                  style={{ 
                    padding: '0.85rem 1.8rem', 
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '9999px',
                    opacity: 0.55,
                    cursor: 'not-allowed',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>CV Updating</span>
                </button>
              )}

              <a
                href="#contact"
                className="btn-ghost-luxury"
                style={{ 
                  padding: '0.85rem 1.9rem', 
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--text-main)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(214, 165, 72, 0.15)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageSquare size={13} color="var(--gold-bright, #FFD978)" />
                </div>
                <span>Let's Connect</span>
              </a>
            </div>

            {/* MY JOURNEY SUBSECTION (Matches Reference Image 1) */}
            <div
              style={{
                marginTop: '6px',
                padding: '24px 26px',
                borderRadius: '22px',
                border: '1.5px solid var(--border-gold)',
                background: 'var(--surface-card)',
                boxShadow: 'var(--card-shadow, 0 10px 30px rgba(0, 0, 0, 0.5))'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    MY JOURNEY
                  </span>
                  <span 
                    style={{ 
                      fontSize: '0.68rem', 
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(214, 165, 72, 0.12)',
                      border: '1px solid rgba(242, 200, 121, 0.35)',
                      color: 'var(--gold-bright, #FFD978)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600
                    }}
                  >
                    Passion Driven Developer
                  </span>
                </div>

                <button
                  onClick={() => setShowJourneyModal(true)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #F2C879 0%, #D6A548 100%)',
                    border: 'none',
                    color: '#0B1018',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 10px rgba(214, 165, 72, 0.35)'
                  }}
                >
                  <span>Read More</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
                A quick look at my journey, values and what drives me to build better solutions.
              </p>

              {/* 3 Journey Pillar Cards (Matches Reference Image 1) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px'
                }}
                className="about-pillars-grid"
              >
                {journeyPillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.title}
                      style={{
                        padding: '16px 14px',
                        borderRadius: '16px',
                        background: 'var(--surface-elevated)',
                        border: '1px solid var(--border-gold)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      className="pillar-card"
                    >
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: 'rgba(214, 165, 72, 0.12)',
                          border: '1px solid rgba(242, 200, 121, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-bright, #FFD978)',
                          boxShadow: '0 0 12px rgba(214, 165, 72, 0.2)'
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="font-heading" style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {p.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PORTRAIT IN ARCHITECTURAL FRAME (Matches Reference Image 1) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ArchitecturalFrame
              imageSrc={aboutImage}
              altText={name}
              imagePosition="center 18%"
              imageScale={1.08}
              sideText="GRADUATE SOFTWARE ENGINEER • FULL-STACK DEVELOPER"
            >
              {/* Overlay Glass Badge at Bottom of Frame (Matches Reference Image 1) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: 'rgba(7, 13, 24, 0.90)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(242, 200, 121, 0.65)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(214, 165, 72, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 25,
                  pointerEvents: 'auto'
                }}
              >
                <div>
                  <div className="font-heading" style={{ fontSize: '0.86rem', fontWeight: 800, color: '#F5F0E8', letterSpacing: '0.04em' }}>
                    GRADUATE SOFTWARE ENGINEER
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--gold-bright, #FFD978)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                    FULL-STACK DEVELOPER
                  </div>
                </div>
                <Sparkles size={16} color="var(--gold-bright, #FFD978)" />
              </div>
            </ArchitecturalFrame>
          </div>
        </div>
      </div>

      {/* JOURNEY DEEP DIVE MODAL */}
      {showJourneyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 12, 21, 0.94)',
            backdropFilter: 'blur(20px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowJourneyModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              background: 'var(--surface-card)',
              border: '1.5px solid var(--border-gold)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px var(--gold-glow)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowJourneyModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(214, 165, 72, 0.1)',
                border: '1px solid var(--border-gold)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div className="badge-gold" style={{ marginBottom: '12px' }}>
              PROFESSIONAL TRAJECTORY
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '14px' }}>
              Engineering Rigour &amp; Visual Mastery
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '16px' }}>
              Motivated Software Engineering graduate candidate who has completed the BSc (Hons) Software Engineering programme at ICBT Campus, affiliated with Cardiff Metropolitan University, UK, and is currently awaiting final results. Holds a Higher National Diploma (HND) in Computing and Software Engineering, with hands-on experience in full-stack web development, Android applications, database management, and AI-integrated systems.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Skilled in React.js, Node.js, Java, Python, and SQL through academic and independent projects. Seeking an opportunity to contribute technical expertise and problem-solving skills as a Graduate Software Engineer.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .about-metrics-row {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .about-pillars-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
