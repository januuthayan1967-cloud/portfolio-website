import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, CheckCircle, X } from 'lucide-react';

export default function ProjectsSection({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Featured', 'Full-Stack Web', 'Mobile & Hospitality', 'Enterprise Software', 'Systems & Analytics'];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return p.featured;
    return p.category === activeFilter;
  });

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          <div className="badge-gold">03 // PORTFOLIO SHOWCASE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <h2
                className="font-editorial"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.2
                }}
              >
                Selected <span className="gold-gradient-text">Architectural</span> Works.
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px', maxWidth: '600px' }}>
                End-to-end engineered applications built with rigorous stability, modular clean architecture, and modern UX.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: activeFilter === cat ? '1px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: activeFilter === cat ? 'rgba(212, 175, 55, 0.18)' : 'rgba(14, 22, 38, 0.5)',
                    color: activeFilter === cat ? '#f3d078' : '#94a3b8',
                    boxShadow: activeFilter === cat ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid rgba(212, 175, 55, 0.18)',
                background: 'linear-gradient(145deg, rgba(14, 23, 42, 0.65) 0%, rgba(8, 12, 22, 0.85) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.18)';
                e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.5)';
              }}
            >
              {/* Top Meta */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge-navy">{project.category}</span>
                  {project.featured && (
                    <span className="badge-gold">
                      <Sparkles size={12} />
                      Featured
                    </span>
                  )}
                </div>

                <h3
                  className="font-editorial"
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    color: '#d4af37',
                    letterSpacing: '0.04em',
                    marginBottom: '14px'
                  }}
                >
                  {project.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#94a3b8',
                    lineHeight: 1.65,
                    marginBottom: '20px'
                  }}
                >
                  {project.description}
                </p>

                {/* Highlights List preview */}
                {project.highlights && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#d4af37', fontSize: '0.8rem', marginTop: '2px' }}>✦</span>
                        <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Tech Stack badges & action */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#cbd5e1'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#d4af37',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View Architecture Specs <ArrowUpRight size={14} />
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {project.githubUrl && (
                      <span
                        title="Repository"
                        style={{ color: '#94a3b8', transition: 'color 0.2s ease' }}
                      >
                        <Github size={16} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(4, 6, 10, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              background: '#0d1526',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(212, 175, 55, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: '8px' }}>
                  {selectedProject.category}
                </span>
                <h3
                  className="font-editorial"
                  style={{ fontSize: '1.85rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}
                >
                  {selectedProject.title}
                </h3>
                <div className="font-mono" style={{ fontSize: '0.8rem', color: '#d4af37' }}>
                  {selectedProject.subtitle}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '24px' }}>
              {selectedProject.description}
            </p>

            {/* Architecture Highlights */}
            <div style={{ marginBottom: '24px' }}>
              <h4
                className="font-mono"
                style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: '#d4af37', textTransform: 'uppercase', marginBottom: '12px' }}
              >
                Key Architecture & Engineering Highlights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProject.highlights?.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={16} color="#d4af37" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Matrix */}
            <div style={{ marginBottom: '28px' }}>
              <h4
                className="font-mono"
                style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}
              >
                Technology Stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="badge-gold"
                    style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <a
                href={selectedProject.githubUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ flex: 1 }}
              >
                <Github size={16} />
                <span>Inspect Repository</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-ghost-luxury"
                style={{ padding: '0.85rem 1.6rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
