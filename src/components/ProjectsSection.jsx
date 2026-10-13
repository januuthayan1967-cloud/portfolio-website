import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Eye,
  Layers
} from 'lucide-react';
import CinematicAtmosphere from './CinematicAtmosphere';
import { trackProjectView } from '../utils/analytics';

export default function ProjectsSection({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryProject, setGalleryProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      const slug = selectedProject.slug || selectedProject._id || selectedProject.id || selectedProject.title;
      trackProjectView(slug, selectedProject.title);
    }
  }, [selectedProject]);

  const categories = ['All', 'Web Apps', 'Mobile', 'Enterprise', 'Systems', 'UI/UX'];

  // Map category filters gracefully
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    const cat = (p.category || '').toLowerCase();
    if (activeFilter === 'Web Apps') return cat.includes('web') || cat.includes('full-stack');
    if (activeFilter === 'Mobile') return cat.includes('mobile') || cat.includes('hospitality') || cat.includes('android');
    if (activeFilter === 'Enterprise') return cat.includes('enterprise');
    if (activeFilter === 'Systems') return cat.includes('system') || cat.includes('analytics') || cat.includes('desktop') || cat.includes('machine learning');
    if (activeFilter === 'UI/UX') return cat.includes('web') || cat.includes('full-stack') || cat.includes('mobile');
    return true;
  });

  // Extract gallery images for a project
  const getGalleryItems = (project) => {
    if (!project) return [];
    if (Array.isArray(project.gallery) && project.gallery.length > 0) {
      return project.gallery;
    }
    return [
      {
        url: project.image || '/hero/project-analytics.jpg',
        caption: project.title,
        description: project.subtitle || project.description
      }
    ];
  };

  const openGallery = (project, startIndex = 0) => {
    setGalleryProject(project);
    setGalleryIndex(startIndex);
  };

  const closeGallery = () => {
    setGalleryProject(null);
    setGalleryIndex(0);
  };

  // Keyboard navigation for lightbox & details modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (galleryProject) closeGallery();
        else if (selectedProject) setSelectedProject(null);
      } else if (galleryProject) {
        const items = getGalleryItems(galleryProject);
        if (e.key === 'ArrowRight') {
          setGalleryIndex((prev) => (prev + 1) % items.length);
        } else if (e.key === 'ArrowLeft') {
          setGalleryIndex((prev) => (prev - 1 + items.length) % items.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryProject, selectedProject]);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      <CinematicAtmosphere variant="projects" particlesCount={14} />

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
                      padding: '7px 18px',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: isActive ? '1.5px solid #D4A23A' : '1px solid var(--border-gold)',
                      background: isActive
                        ? 'linear-gradient(135deg, #F2CE83 0%, #D4A23A 100%)'
                        : 'var(--surface-card)',
                      color: isActive ? '#111827' : 'var(--text-secondary)',
                      boxShadow: isActive ? '0 4px 14px rgba(212, 162, 58, 0.28)' : 'none'
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
                  color: 'var(--text-gold)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px'
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project) => {
            const galleryCount = (project.gallery && project.gallery.length > 0) ? project.gallery.length : 1;
            return (
              <div
                key={project.id}
                className="glass-panel"
                style={{
                  borderRadius: '18px',
                  padding: '16px',
                  border: '1.5px solid var(--border-gold)',
                  background: 'var(--surface-card)',
                  boxShadow: 'var(--card-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s var(--ease-cinematic)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--gold-primary)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                {/* Image Preview Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '190px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    background: '#070C15',
                    cursor: 'pointer'
                  }}
                  onClick={() => openGallery(project, 0)}
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
                      e.currentTarget.src = '/hero/project-analytics.jpg';
                    }}
                  />

                  {/* Cinematic gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(7, 12, 21, 0.82) 0%, transparent 60%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Top-Right Action Buttons: Live URL & GitHub URL */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Launch live demo"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(7, 12, 21, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(217, 169, 104, 0.4)',
                        color: 'var(--gold-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        zIndex: 2,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="View GitHub Repository"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: project.liveUrl ? '48px' : '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(7, 12, 21, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(217, 169, 104, 0.4)',
                        color: 'var(--gold-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        zIndex: 2,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Github size={14} />
                    </a>
                  )}

                  {/* Gallery Badge on Image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: 'rgba(7, 12, 21, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(217, 169, 104, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: 'var(--gold-light)',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <Images size={12} />
                    <span>{galleryCount} Screenshots</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div style={{ flex: 1 }}>
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.2rem',
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
                      fontSize: '0.72rem',
                      color: 'var(--gold-primary)',
                      letterSpacing: '0.04em',
                      marginBottom: '12px'
                    }}
                  >
                    {project.subtitle || project.category}
                  </p>
                </div>

                {/* Tech Badges Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'var(--surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-subtle)',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
                    <button
                      onClick={() => setSelectedProject(project)}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: 'rgba(212, 162, 58, 0.12)',
                        border: '1px solid var(--border-gold)',
                        color: 'var(--text-gold)',
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={12} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => openGallery(project, 0)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: 'var(--surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Images size={12} />
                      <span>Gallery</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Open ${project.title} details`}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#070C15',
                      boxShadow: '0 2px 10px rgba(217, 169, 104, 0.4)',
                      flexShrink: 0,
                      cursor: 'pointer'
                    }}
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          FULL-SCREEN LIGHTBOX GALLERY MODAL (Cloudinary Screenshots)
         ======================================================== */}
      {galleryProject && (() => {
        const galleryItems = getGalleryItems(galleryProject);
        const currentItem = galleryItems[galleryIndex] || galleryItems[0];

        return (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 7, 14, 0.96)',
              backdropFilter: 'blur(24px)',
              zIndex: 1200,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              color: '#ffffff'
            }}
            onClick={closeGallery}
          >
            {/* Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                zIndex: 10
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="badge-gold" style={{ marginRight: '10px' }}>
                  PROJECT GALLERY &bull; {galleryIndex + 1} / {galleryItems.length}
                </span>
                <span className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  {galleryProject.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => {
                    closeGallery();
                    setSelectedProject(galleryProject);
                  }}
                  className="btn-ghost-luxury"
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>

                <button
                  onClick={closeGallery}
                  aria-label="Close Lightbox"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Central Stage with Image and Navigation Arrows */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: 0
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {galleryItems.length > 1 && (
                <button
                  onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 20,
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(12, 19, 32, 0.85)',
                    border: '1px solid rgba(217, 169, 104, 0.4)',
                    color: 'var(--gold-light)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Main Image Display */}
              <div
                style={{
                  maxWidth: '92%',
                  maxHeight: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={currentItem.url}
                  alt={currentItem.caption || galleryProject.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 'calc(80vh - 120px)',
                    objectFit: 'contain',
                    borderRadius: '14px',
                    border: '1px solid rgba(217, 169, 104, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(217, 169, 104, 0.2)'
                  }}
                />

                {/* Caption / Description Bar */}
                {(currentItem.caption || currentItem.description) && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      background: 'rgba(12, 19, 32, 0.85)',
                      border: '1px solid rgba(217, 169, 104, 0.25)',
                      textAlign: 'center',
                      maxWidth: '700px'
                    }}
                  >
                    {currentItem.caption && (
                      <span className="font-heading" style={{ color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600, marginRight: '8px' }}>
                        {currentItem.caption}
                      </span>
                    )}
                    {currentItem.description && (
                      <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                        {currentItem.description}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Next Button */}
              {galleryItems.length > 1 && (
                <button
                  onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryItems.length)}
                  aria-label="Next image"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 20,
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(12, 19, 32, 0.85)',
                    border: '1px solid rgba(217, 169, 104, 0.4)',
                    color: 'var(--gold-light)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Thumbnails Filmstrip */}
            {galleryItems.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  paddingTop: '16px',
                  overflowX: 'auto',
                  zIndex: 10
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {galleryItems.map((item, idx) => {
                  const isCurrent = idx === galleryIndex;
                  return (
                    <button
                      key={item.id || idx}
                      onClick={() => setGalleryIndex(idx)}
                      style={{
                        width: '64px',
                        height: '46px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: isCurrent ? '2px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                        opacity: isCurrent ? 1 : 0.6,
                        padding: 0,
                        background: 'transparent',
                        cursor: 'pointer',
                        transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                        boxShadow: isCurrent ? '0 0 15px var(--gold-glow)' : 'none'
                      }}
                    >
                      <img
                        src={item.url}
                        alt={`Thumbnail ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* ========================================================
          FULL PROJECT DETAILS MODAL
         ======================================================== */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 9, 16, 0.94)',
            backdropFilter: 'blur(20px)',
            zIndex: 1100,
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
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--surface-card)',
              border: '1.5px solid var(--border-gold)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: 'var(--card-shadow-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close details"
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

            {/* Clickable Image to Launch Lightbox */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '24px',
                border: '1px solid var(--border-gold)',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => openGallery(selectedProject, 0)}
            >
              <img
                src={selectedProject.image || '/hero/project-analytics.jpg'}
                alt={selectedProject.title}
                style={{ width: '100%', maxHeight: '360px', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  background: 'rgba(7, 12, 21, 0.85)',
                  border: '1px solid var(--gold-light)',
                  color: 'var(--gold-light)',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                }}
              >
                <Images size={14} />
                <span>Open Fullscreen Gallery</span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              {selectedProject.description}
            </p>

            {/* Architecture Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
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
                      background: 'var(--surface-elevated)',
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
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
              <button
                onClick={() => openGallery(selectedProject, 0)}
                className="btn-ghost-luxury"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem' }}
              >
                <Images size={15} />
                <span>Open Screenshot Gallery</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
