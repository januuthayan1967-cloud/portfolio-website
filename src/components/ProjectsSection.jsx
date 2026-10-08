import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, CheckCircle, X } from 'lucide-react';

export default function ProjectsSection({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Featured', 'Full-Stack Web', 'Mobile & Hospitality', 'Enterprise Software', 'Systems & Analytics'];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return p.featured;
    return p.category === activeFilter;
  });

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

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
          <div className="badge-gold">03 // SELECTED WORKS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  lineHeight: 1.2
                }}
              >
                Architectural <span className="gold-gradient-text">Systems</span> &amp; Case Studies.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px', maxWidth: '600px' }}>
                End-to-end engineered software solutions constructed with modular stability, performance indexing, and modern UX design.
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
                    transition: 'all 0.25s ease',
                    border: activeFilter === cat ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: activeFilter === cat ? 'rgba(217, 169, 104, 0.18)' : 'var(--surface-card)',
                    color: activeFilter === cat ? 'var(--gold-primary)' : 'var(--text-muted)',
                    boxShadow: activeFilter === cat ? '0 0 15px var(--gold-glow)' : 'none'
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid var(--border-gold)',
                background: 'var(--surface-card)',
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
                e.currentTarget.style.borderColor = 'var(--border-gold-strong)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px var(--gold-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-gold)';
                e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.4)';
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
                  className="font-heading"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
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
                    color: 'var(--gold-primary)',
                    letterSpacing: '0.04em',
                    marginBottom: '14px'
                  }}
                >
                  {project.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
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
                        <span style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', marginTop: '2px' }}>✦</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Tech Stack badges & action */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'var(--surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-secondary)'
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
                      color: 'var(--gold-primary)',
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
                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 8, 14, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
              border: '1px solid var(--border-gold-strong)',
              background: 'var(--surface-card-solid)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px var(--gold-glow)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: '8px' }}>
                  {selectedProject.category}
                </span>
                <h3
                  id="modal-title"
                  className="font-heading"
                  style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '6px' }}
                >
                  {selectedProject.title}
                </h3>
                <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--gold-primary)' }}>
                  {selectedProject.subtitle}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '24px' }}>
              {selectedProject.description}
            </p>

            {/* Architecture Highlights */}
            <div style={{ marginBottom: '24px' }}>
              <h4
                className="font-mono"
                style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '12px' }}
              >
                Key Architecture &amp; Engineering Highlights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProject.highlights?.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={16} color="var(--gold-primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Matrix */}
            <div style={{ marginBottom: '28px' }}>
              <h4
                className="font-mono"
                style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}
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
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
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
