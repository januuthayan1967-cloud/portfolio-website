import React from 'react';
import { Award, Compass, Cpu, FileText, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';

export default function AboutSection({ profile }) {
  const {
    name = "Uthayagunasingam Vanojan",
    aboutImage = "/hero/image1.jpeg",
    bio = "",
    philosophy = "Great engineering is not merely functional—it possesses clarity, performance, and an undeniable artistic presence.",
    location = "Jaffna, Sri Lanka",
    email = "uthayanvanojan5@gmail.com",
    phone = "+94 75 029 2685"
  } = profile || {};

  const principles = [
    {
      title: "Architectural Integrity",
      desc: "Constructing modular, scalable distributed systems with clean separation of concerns and rigorous database normalization."
    },
    {
      title: "Cinematic Visuals & 3D",
      desc: "Bridging the gap between engineering logic and artistic aesthetics through WebGL, micro-interactions, and harmonic palettes."
    },
    {
      title: "Zero-Compromise Performance",
      desc: "Optimizing execution speed, low memory footprints, and sub-millisecond query responses across web, mobile, and desktop."
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
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            02 // BIOGRAPHY & ETHOS
          </div>
          <h2
            className="font-editorial"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2
            }}
          >
            The Intersection of <span className="gold-gradient-text">Engineering</span> &amp; <span className="silver-gradient-text">Artistry.</span>
          </h2>
        </div>

        {/* Two-Column Editorial Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}
          className="about-grid"
        >
          {/* LEFT: Standing Portrait Card (image1.jpeg) */}
          <div style={{ position: 'relative' }}>
            <div
              className="glass-panel"
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
              }}
            >
              <img
                src={aboutImage}
                alt="Uthayagunasingam Vanojan Portrait"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '9 / 16',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.02) saturate(1.02)'
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(6, 8, 13, 0.9) 0%, transparent 50%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Bottom Quote Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'rgba(10, 16, 28, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                <div
                  className="font-editorial"
                  style={{
                    fontSize: '0.92rem',
                    fontStyle: 'italic',
                    color: '#f8fafc',
                    lineHeight: 1.5
                  }}
                >
                  "{philosophy}"
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: '#d4af37',
                    marginTop: '8px',
                    letterSpacing: '0.08em'
                  }}
                >
                  — U. VANOJAN, PRINCIPAL ENGINEER
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Narrative & Credentials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h3
                className="font-editorial"
                style={{ fontSize: '1.65rem', fontWeight: 600, color: '#f8fafc', marginBottom: '16px' }}
              >
                Crafting Software that Leaves a Lasting Impression
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '16px' }}>
                {bio}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.75 }}>
                Having engineered systems ranging from offline-first mobile applications in Java and SQLite to scalable cloud platforms in React, Node, and MongoDB, I approach software engineering as an architectural craft. Every line of code, every API schema, and every pixel is intentional.
              </p>
            </div>

            {/* Core Architectural Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {principles.map((p, idx) => (
                <div
                  key={p.title}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    background: 'rgba(14, 22, 38, 0.45)',
                    transition: 'border-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <CheckCircle2 size={16} color="#d4af37" />
                    <span className="font-editorial" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff' }}>
                      {p.title}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', paddingLeft: '26px', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Contact & Info Meta */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#d4af37" />
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#d4af37" />
                <a href={`mailto:${email}`} style={{ fontSize: '0.85rem', color: '#cbd5e1', textDecoration: 'none' }}>
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 0.85fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
