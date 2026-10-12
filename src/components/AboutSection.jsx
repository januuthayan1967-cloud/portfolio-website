import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, CheckCircle2, FileText, X } from 'lucide-react';
import ArchitecturalFrame from './ArchitecturalFrame';

export default function AboutSection({ profile }) {
  const {
    name = "Uthayagunasingam Vanojan",
    aboutImage = "/hero/image1.jpeg",
    bio = "I am Uthayagunasingam Vanojan, a Full-Stack Software Engineer and Solutions Architect passionate about building scalable systems, elegant user experiences and impactful digital solutions.",
    resumeUrl
  } = profile || {};

  const [showJourneyModal, setShowJourneyModal] = useState(false);

  const metrics = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Delivered", value: "15+" },
    { label: "Core Technologies", value: "8+" },
    { label: "Commitment", value: "100%" }
  ];

  const journeyPillars = [
    {
      title: "Problem Solving",
      desc: "Deconstructing complex enterprise challenges into clean, modular, and maintainable logic."
    },
    {
      title: "Clean Architecture",
      desc: "Building resilient microservices, normalized databases, and scalable distributed patterns."
    },
    {
      title: "User Focused",
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
      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER EYEBROW */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span className="badge-gold">02 // ABOUT</span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
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
              maxWidth: '850px'
            }}
          >
            Turning Complex Ideas into <span className="gold-gradient-text">Scalable Real Solutions.</span>
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
          {/* LEFT: BIOGRAPHY, METRICS, JOURNEY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Professional Biography */}
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontWeight: 300
              }}
            >
              {bio}
            </p>

            {/* 4 Stat Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                padding: '20px 0',
                borderTop: '1px solid rgba(245, 240, 232, 0.08)',
                borderBottom: '1px solid rgba(245, 240, 232, 0.08)'
              }}
              className="about-metrics-row"
            >
              {metrics.map((m) => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    className="font-heading gold-gradient-text"
                    style={{ fontSize: '1.85rem', fontWeight: 800, lineHeight: 1.1 }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginTop: '4px'
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Download CV & Let's Connect */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <a
                href={resumeUrl || "#contact"}
                download={resumeUrl ? "Vanojan_CV.pdf" : undefined}
                target={resumeUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ padding: '0.85rem 2rem', fontSize: '0.88rem' }}
              >
                <span>Download CV</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#contact"
                className="btn-ghost-luxury"
                style={{ padding: '0.85rem 1.8rem', fontSize: '0.88rem' }}
              >
                <MessageSquare size={16} color="var(--gold-primary)" />
                <span>Let's Connect</span>
              </a>
            </div>

            {/* MY JOURNEY SUBSECTION */}
            <div
              className="glass-panel"
              style={{
                marginTop: '10px',
                padding: '24px 28px',
                borderRadius: '20px',
                border: '1px solid rgba(217, 169, 104, 0.25)',
                background: 'rgba(14, 22, 36, 0.65)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    MY JOURNEY
                  </span>
                  <span className="badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                    Passion Driven Developer
                  </span>
                </div>

                <button
                  onClick={() => setShowJourneyModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold-light)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Read More</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
                A quick look at my journey, values and what drives me to build scalable, high-impact digital solutions.
              </p>

              {/* 3 Journey Pillar Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px'
                }}
                className="about-pillars-grid"
              >
                {journeyPillars.map((p) => (
                  <div
                    key={p.title}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: 'rgba(20, 31, 50, 0.45)',
                      border: '1px solid rgba(245, 240, 232, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)' }}>
                      <CheckCircle2 size={13} />
                      <span className="font-heading" style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {p.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {p.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PORTRAIT PHOTOGRAPH (image1.jpeg) IN ARCHITECTURAL FRAME */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ArchitecturalFrame
              imageSrc={aboutImage}
              altText={name}
              imagePosition="center 20%"
              imageScale={1.08}
              sideText="FULL-STACK ENGINEER • SOLUTIONS ARCHITECT"
            >
              {/* Overlay Badge at Bottom of Frame */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: 'rgba(14, 22, 36, 0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(217, 169, 104, 0.45)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7), 0 0 15px var(--gold-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 25,
                  pointerEvents: 'auto'
                }}
              >
                <div>
                  <div className="font-heading" style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.04em' }}>
                    FULL-STACK ENGINEER
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--gold-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    SOLUTIONS ARCHITECT
                  </div>
                </div>
                <Sparkles size={16} color="var(--gold-primary)" />
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
            background: 'rgba(11, 16, 24, 0.92)',
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
              border: '1px solid var(--border-gold)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowJourneyModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(217, 169, 104, 0.1)',
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
              Graduated with a Higher National Diploma in Computing &amp; Software Engineering from ICBT Campus, affiliated with Cardiff Metropolitan University. My work focuses on end-to-end distributed system engineering, high-throughput microservices, and bespoke 3D interactive web experiences.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Every solution adheres to strict principles of separation of concerns, defensive programming, automated transactional consistency, and modern design standards.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
        @media (max-width: 640px) {
          .about-metrics-row {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .about-pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
