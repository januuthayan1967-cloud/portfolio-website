import React from 'react';
import { Award, Compass, Cpu, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';

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
      title: "Cinematic Visuals & 3D Depth",
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
        <div style={{ marginBottom: '60px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            02 // BIOGRAPHY &amp; ETHOS
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
              fontWeight: 700,
              color: 'var(--text-main)',
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
                border: '1px solid var(--border-gold)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)'
              }}
            >
              <img
                src={aboutImage}
                alt="Uthayagunasingam Vanojan — Profile"
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
                  background: 'linear-gradient(to top, rgba(11, 16, 24, 0.9) 0%, transparent 50%)',
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
                  background: 'var(--surface-glass)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-gold)'
                }}
              >
                <div
                  style={{
                    fontSize: '0.92rem',
                    fontStyle: 'italic',
                    color: 'var(--text-main)',
                    lineHeight: 1.5
                  }}
                >
                  "{philosophy}"
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--gold-primary)',
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
                className="font-heading"
                style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}
              >
                Crafting Software that Leaves a Lasting Impression
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '16px' }}>
                {bio}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                Having engineered systems ranging from offline-first mobile applications in Java and SQLite to scalable cloud platforms in React, Node, and MongoDB, I approach software engineering as an architectural craft. Every line of code, every API schema, and every pixel is intentional.
              </p>
            </div>

            {/* Core Architectural Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--surface-card)',
                    transition: 'border-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-gold-strong)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <CheckCircle2 size={16} color="var(--gold-primary)" />
                    <span className="font-heading" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {p.title}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', paddingLeft: '26px', lineHeight: 1.6 }}>
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
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--gold-primary)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--gold-primary)" />
                <a href={`mailto:${email}`} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
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
