import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

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
            05 // ACADEMIC & PROFESSIONAL TRAJECTORY
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
            Education &amp; <span className="gold-gradient-text">Milestones.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px', maxWidth: '620px' }}>
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
              background: 'linear-gradient(to bottom, #d4af37 0%, rgba(212, 175, 55, 0.2) 80%, transparent 100%)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {education.map((item, idx) => (
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
                    background: '#0d1526',
                    border: '2px solid #d4af37',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f3d078' }} />
                </div>

                {/* Content Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '28px 32px',
                    borderRadius: '16px',
                    border: '1px solid rgba(212, 175, 55, 0.18)',
                    background: 'linear-gradient(145deg, rgba(14, 22, 38, 0.6) 0%, rgba(8, 12, 22, 0.8) 100%)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.18)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                    <span className="badge-gold">
                      <GraduationCap size={13} />
                      {item.badge}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      <Calendar size={13} color="#d4af37" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <h3
                    className="font-editorial"
                    style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}
                  >
                    {item.degree}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.9rem',
                      color: '#d4af37',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '12px'
                    }}
                  >
                    {item.institution}
                  </div>

                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.7 }}>
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
