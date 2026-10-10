import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

export default function ProjectsSection({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web Apps', 'Mobile', 'Enterprise', 'Systems', 'UI/UX'];

  // Map category filters gracefully
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Web Apps') return p.category?.toLowerCase().includes('web');
    if (activeFilter === 'Mobile') return p.category?.toLowerCase().includes('mobile');
    if (activeFilter === 'Enterprise') return p.category?.toLowerCase().includes('enterprise');
    if (activeFilter === 'Systems') return p.category?.toLowerCase().includes('system') || p.category?.toLowerCase().includes('analytics');
    if (activeFilter === 'UI/UX') return true;
    return true;
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
        
        {/* SECTION HEADER WITH FILTERS */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="badge-gold">03 // PROJECTS</span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              CURATED CASE STUDIES
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.15
              }}
            >
              FEATURED <span className="gold-gradient-text">WORKS</span>
            </h2>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: isActive ? '1.5px solid var(--gold-light)' : '1px solid rgba(245, 240, 232, 0.1)',
                      background: isActive ? 'linear-gradient(135deg, rgba(217, 169, 104, 0.25) 0%, rgba(14, 22, 36, 0.9) 100%)' : 'rgba(14, 22, 36, 0.7)',
                      color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                      boxShadow: isActive ? '0 0 16px var(--gold-glow)' : 'none'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}

              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginLeft: '12px',
                  color: 'var(--gold-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  textDecoration: 'none'
                }}
              >
                <span>View All Projects</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* PROJECT CARDS GRID (Exact match to reference visual) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '16px',
                border: '1px solid rgba(217, 169, 104, 0.22)',
                background: 'rgba(14, 22, 36, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.35s var(--ease-cinematic)',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--gold-light)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 25px var(--gold-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(217, 169, 104, 0.22)';
                e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* Image Preview Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: '#0B1018'
                }}
              >
                <img
                  src={project.image || '/hero/project-analytics.jpg'}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s var(--ease-cinematic)'
                  }}
                  onError={(e) => {
                    // Fallback to existing preview if custom image not found
                    e.currentTarget.src = '/hero/project-analytics.jpg';
                  }}
                />

                {/* Subtle dark gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(11, 16, 24, 0.75) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Top-Right Glass External Link Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(14, 22, 36, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(217, 169, 104, 0.4)',
                    color: 'var(--gold-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div style={{ flex: 1 }}>
                <h3
                  className="font-heading"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '4px',
                    lineHeight: 1.3
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--gold-primary)',
                    letterSpacing: '0.04em',
                    marginBottom: '14px'
                  }}
                >
                  {project.subtitle || project.category}
                </p>
              </div>

              {/* Bottom: Tech Badges & Circular Gold Action Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(245, 240, 232, 0.08)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(20, 31, 50, 0.6)',
                        border: '1px solid rgba(245, 240, 232, 0.08)',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B1018',
                    boxShadow: '0 2px 10px rgba(217, 169, 104, 0.4)',
                    flexShrink: 0
                  }}
                >
                  &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL PROJECT DETAILS MODAL */}
      {selectedProject && (
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
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px var(--gold-glow)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(217, 169, 104, 0.1)',
                border: '1px solid var(--border-gold)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span className="badge-navy">{selectedProject.category}</span>
              {selectedProject.featured && <span className="badge-gold">Featured System</span>}
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.85rem', color: 'var(--text-main)', marginBottom: '6px' }}>
              {selectedProject.title}
            </h3>

            <p className="font-mono" style={{ fontSize: '0.84rem', color: 'var(--gold-primary)', marginBottom: '20px' }}>
              {selectedProject.subtitle}
            </p>

            <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', border: '1px solid var(--border-subtle)' }}>
              <img
                src={selectedProject.image || '/hero/project-analytics.jpg'}
                alt={selectedProject.title}
                style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }}
              />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              {selectedProject.description}
            </p>

            {/* Architecture Highlights */}
            {selectedProject.highlights && (
              <div style={{ marginBottom: '24px' }}>
                <h4 className="font-heading" style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                  Architecture &amp; Key Highlights
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="var(--gold-primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div style={{ marginBottom: '28px' }}>
              <h4 className="font-heading" style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                Technologies &amp; Frameworks
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.techStack?.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: 'rgba(20, 31, 50, 0.7)',
                      border: '1px solid var(--border-gold)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-main)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem' }}
                >
                  <span>Launch Live System</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-luxury"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem' }}
                >
                  <Github size={15} />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
