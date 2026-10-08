import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

export default function ExperienceSection({ education = [] }) {
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
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            05 // ACADEMIC &amp; PROFESSIONAL TRAJECTORY
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
            Education &amp; <span className="gold-gradient-text">Milestones.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px', maxWidth: '620px' }}>
            A rigorous technical and scientific pedigree underpinning every system architecture and code solution.
          </p>
        </div>

        {/* Timeline Trace */}
        <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
          {/* Vertical gold line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--gold-primary) 0%, rgba(217, 169, 104, 0.2) 80%, transparent 100%)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {education.map((item) => (
              <div
                key={item.degree}
                style={{
                  position: 'relative',
                  paddingLeft: '56px'
                }}
              >
                {/* Node marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '11px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--surface-elevated)',
                    border: '2px solid var(--gold-primary)',
                    boxShadow: '0 0 15px var(--gold-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-light)' }} />
                </div>

                {/* Content Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '28px 32px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-gold)',
                    background: 'var(--surface-card)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-gold-strong)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-gold)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                    <span className="badge-gold">
                      <GraduationCap size={13} />
                      {item.badge}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      <Calendar size={13} color="var(--gold-primary)" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <h3
                    className="font-heading"
                    style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}
                  >
                    {item.degree}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--gold-primary)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '12px'
                    }}
                  >
                    {item.institution}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
