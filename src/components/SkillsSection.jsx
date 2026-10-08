import React, { useState } from 'react';
import { Code, Server, Database, Terminal, Cpu, ShieldCheck } from 'lucide-react';

export default function SkillsSection({ skills = [] }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={20} color="#d4af37" />;
      case 'Server': return <Server size={20} color="#d4af37" />;
      case 'Database': return <Database size={20} color="#d4af37" />;
      case 'Terminal': return <Terminal size={20} color="#d4af37" />;
      default: return <Cpu size={20} color="#d4af37" />;
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
            04 // TECHNICAL MASTERY
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
            Engineering <span className="gold-gradient-text">Competencies</span> &amp; Systems.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px', maxWidth: '620px' }}>
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
                  border: activeCategoryIndex === idx ? '1px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.07)',
                  background: activeCategoryIndex === idx ? 'rgba(212, 175, 55, 0.12)' : 'rgba(11, 18, 33, 0.5)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategoryIndex === idx ? '0 10px 30px rgba(212, 175, 55, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(212, 175, 55, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <div>
                    <div
                      className="font-editorial"
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: activeCategoryIndex === idx ? '#ffffff' : '#cbd5e1'
                      }}
                    >
                      {cat.category}
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}
                    >
                      {cat.items?.length || 0} Specializations
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    color: activeCategoryIndex === idx ? '#d4af37' : 'rgba(255, 255, 255, 0.3)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s ease',
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
              border: '1px solid rgba(212, 175, 55, 0.25)',
              background: 'linear-gradient(145deg, rgba(14, 22, 38, 0.75) 0%, rgba(8, 12, 22, 0.9) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <h3 className="font-editorial" style={{ fontSize: '1.35rem', color: '#ffffff', fontWeight: 700 }}>
                  {activeCategory.category}
                </h3>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: '#d4af37' }}>
                  PROFICIENCY & ARCHITECTURAL MASTERY
                </span>
              </div>
              <ShieldCheck size={24} color="#d4af37" />
            </div>

            {/* Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeCategory.items?.map((item) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 500 }}>
                      {item.name}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: '#f3d078' }}>
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
                        background: 'linear-gradient(90deg, #d4af37 0%, #f59e0b 50%, #fcd34d 100%)',
                        boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
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
                background: 'rgba(212, 175, 55, 0.06)',
                border: '1px solid rgba(212, 175, 55, 0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ color: '#d4af37' }}>✦</span>
              <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
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
