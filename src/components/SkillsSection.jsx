import React, { useState } from 'react';
import { Code, Server, Database, Terminal, Cpu, ShieldCheck } from 'lucide-react';

export default function SkillsSection({ skills = [] }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={20} color="var(--gold-primary)" />;
      case 'Server': return <Server size={20} color="var(--gold-primary)" />;
      case 'Database': return <Database size={20} color="var(--gold-primary)" />;
      case 'Terminal': return <Terminal size={20} color="var(--gold-primary)" />;
      default: return <Cpu size={20} color="var(--gold-primary)" />;
    }
  };

  const activeCategory = skills[activeCategoryIndex] || skills[0] || { items: [] };

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
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            04 // CAPABILITIES &amp; SYSTEMS
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
            Engineering <span className="gold-gradient-text">Competencies</span> &amp; Systems.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px', maxWidth: '620px' }}>
            A comprehensive matrix of languages, runtime frameworks, low-level architectures, and database paradigms cultivated across production environments.
          </p>
        </div>

        {/* Layout: Category Selector Tabs + Deep Dive Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}
          className="skills-grid"
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {skills.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategoryIndex(idx)}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  border: activeCategoryIndex === idx ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  background: activeCategoryIndex === idx ? 'rgba(217, 169, 104, 0.12)' : 'var(--surface-card)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  boxShadow: activeCategoryIndex === idx ? '0 10px 30px var(--gold-glow)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(217, 169, 104, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <div>
                    <div
                      className="font-heading"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: activeCategoryIndex === idx ? 'var(--text-main)' : 'var(--text-secondary)'
                      }}
                    >
                      {cat.category}
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}
                    >
                      {cat.items?.length || 0} Specializations
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    color: activeCategoryIndex === idx ? 'var(--gold-primary)' : 'var(--text-muted)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.25s ease',
                    transform: activeCategoryIndex === idx ? 'translateX(4px)' : 'none'
                  }}
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Active Skills Proficiency Display */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '20px',
              border: '1px solid var(--border-gold)',
              background: 'var(--surface-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  {activeCategory.category}
                </h3>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>
                  PROFICIENCY &amp; ARCHITECTURAL MASTERY
                </span>
              </div>
              <ShieldCheck size={24} color="var(--gold-primary)" />
            </div>

            {/* Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeCategory.items?.map((item) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 500 }}>
                      {item.name}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--gold-primary)' }}>
                      {item.level}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${item.level}%`,
                        borderRadius: '9999px',
                        background: 'linear-gradient(90deg, #D9A968 0%, #E5A84B 50%, #F2CA8E 100%)',
                        boxShadow: '0 0 10px var(--gold-glow)',
                        transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Editorial Footer Tag */}
            <div
              style={{
                marginTop: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(217, 169, 104, 0.06)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ color: 'var(--gold-primary)' }}>✦</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Continually benchmarking and adopting modern distributed engineering patterns and low-latency rendering pipelines.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .skills-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
      `}</style>
    </section>
  );
}
