import React, { useState, useRef } from 'react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Play, 
  Briefcase, 
  Layers, 
  Code2, 
  Star, 
  Compass, 
  Cpu, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Globe2,
  X
} from 'lucide-react';

export default function HeroSection({ profile }) {
  const {
    name = "Uthayagunasingam Vanojan",
    shortName = "Vanojan",
    title = "Full-Stack Software Engineer & Solutions Architect",
    tagline = "Bridging architectural rigour and cinematic aesthetic depth to engineer unforgettable software experiences.",
    heroImage = "/hero/image2.jpeg",
    statusText = "OPEN FOR HIGH-IMPACT ENGINEERING & ARCHITECTURE ENGAGEMENTS",
    location = "SRI LANKA, EARTH",
    email = "uthayanvanojan5@gmail.com",
    github = "https://github.com",
    linkedin = "https://linkedin.com",
    twitter = "https://twitter.com"
  } = profile || {};

  // Active discipline mode toggle on the right
  const [activeMode, setActiveMode] = useState('Develop');
  const [activeThumb, setActiveThumb] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Micro-parallax on mouse movement for portrait
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const portraitRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!portraitRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const thumbnails = [
    { src: heroImage, title: 'Portrait View' },
    { src: '/hero/project-analytics.jpg', title: 'Workstation Setup' },
    { src: '/hero/image1.jpeg', title: 'Architectural View' }
  ];

  const modes = [
    { id: 'Design', icon: <Sparkles size={14} />, label: 'Design' },
    { id: 'Develop', icon: <Code2 size={14} />, label: 'Develop' },
    { id: 'Architect', icon: <Layers size={14} />, label: 'Architect' },
    { id: 'Innovate', icon: <Cpu size={14} />, label: 'Innovate' }
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '70px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cinematic Ambient Glow matching photograph lighting */}
      <div className="ambient-glow-gold" style={{ top: '10%', left: '30%', opacity: 0.65 }} />
      <div className="ambient-glow-navy" style={{ top: '20%', right: '-5%', opacity: 0.75 }} />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        
        {/* TOP STATUS BADGE */}
        <div style={{ marginBottom: '28px', display: 'flex' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(14, 22, 36, 0.75)',
              border: '1px solid rgba(217, 169, 104, 0.35)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--gold-glow)',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--gold-primary)',
                boxShadow: '0 0 10px var(--gold-primary)',
                display: 'inline-block'
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-main)',
                letterSpacing: '0.08em',
                fontWeight: 600
              }}
            >
              {statusText}
            </span>
            <span style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', marginLeft: '6px' }}>&rarr;</span>
          </a>
        </div>

        {/* MAIN HERO SPLIT GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '40px',
            alignItems: 'center'
          }}
          className="hero-main-grid"
        >
          {/* LEFT: EDITORIAL TYPOGRAPHY & STATS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* Meta Row: Name, Location, Floating Tag */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                {name.toUpperCase()}
              </span>
              <span style={{ color: 'rgba(217, 169, 104, 0.4)' }}>|</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>📍</span> {location}
              </span>

              {/* Floating Pill Tag */}
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(20, 40, 59, 0.45)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#93C5FD',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8' }} />
                FULL-STACK &bull; SOLUTIONS ARCHITECT
              </span>
            </div>

            {/* Giant Editorial Title */}
            <div>
              <h1
                className="font-heading"
                style={{
                  fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)',
                  lineHeight: 1.08,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-main)',
                  marginBottom: '18px'
                }}
              >
                Architectural <br />
                <span className="gold-gradient-text" style={{ textShadow: '0 0 35px rgba(217, 169, 104, 0.35)' }}>
                  Precision.
                </span> <br />
                <span>Cinematic Depth.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.08rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  lineHeight: 1.75,
                  fontWeight: 300
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Action Buttons & Handwritten Annotation */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '18px', position: 'relative' }}>
              <a href="#projects" className="btn-gold" style={{ padding: '0.9rem 2.2rem', fontSize: '0.92rem' }}>
                <span>Explore Selected Works</span>
                <ArrowUpRight size={17} />
              </a>

              <button
                onClick={() => setShowVideoModal(true)}
                className="btn-ghost-luxury"
                style={{ padding: '0.85rem 1.8rem', fontSize: '0.92rem', gap: '10px' }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(217, 169, 104, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-primary)'
                  }}
                >
                  <Play size={12} fill="var(--gold-primary)" />
                </div>
                <span>Watch Intro</span>
              </button>

              {/* Hand-drawn script annotation with arrow */}
              <div
                className="script-annotation hero-script-note"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginLeft: '8px'
                }}
              >
                <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                  <path d="M2 15C10 2 24 4 30 14M30 14L22 13M30 14L28 6" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>See my work in action</span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '6px' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                CONNECT WITH ME
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="social-circle-btn"
                >
                  <Github size={16} />
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="social-circle-btn"
                >
                  <Linkedin size={16} />
                </a>

                <a
                  href={`mailto:${email}`}
                  title="Direct Email"
                  className="social-circle-btn"
                >
                  <Mail size={16} />
                </a>

                <a
                  href={twitter}
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter / X"
                  className="social-circle-btn"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* 4 STATS CARDS ROW (Exact match to reference) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginTop: '10px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(245, 240, 232, 0.08)'
              }}
              className="hero-stats-row"
            >
              {/* Stat 1 */}
              <div className="glass-panel" style={{ padding: '16px 14px', borderRadius: '14px', background: 'rgba(14, 22, 36, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
                  <Briefcase size={16} />
                  <span className="font-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>3+</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  YEARS EXPERIENCE
                </div>
              </div>

              {/* Stat 2 */}
              <div className="glass-panel" style={{ padding: '16px 14px', borderRadius: '14px', background: 'rgba(14, 22, 36, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
                  <Layers size={16} />
                  <span className="font-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>12+</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  DELIVERED SYSTEMS
                </div>
              </div>

              {/* Stat 3 */}
              <div className="glass-panel" style={{ padding: '16px 14px', borderRadius: '14px', background: 'rgba(14, 22, 36, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
                  <Code2 size={16} />
                  <span className="font-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>950+</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  CODE COMMITS
                </div>
              </div>

              {/* Stat 4 */}
              <div className="glass-panel" style={{ padding: '16px 14px', borderRadius: '14px', background: 'rgba(14, 22, 36, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', marginBottom: '4px' }}>
                  <Star size={16} />
                  <span className="font-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>100%</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  SATISFACTION
                </div>
              </div>
            </div>

            {/* Bottom Scroll to explore indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px' }}>
              <a
                href="#about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  color: 'var(--text-muted)'
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '28px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '5px'
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '6px',
                      borderRadius: '2px',
                      background: 'var(--gold-primary)',
                      animation: 'floatSlow 2s ease-in-out infinite'
                    }}
                  />
                </div>
                <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  SCROLL TO EXPLORE
                </span>
              </a>

              {/* Progress bar line */}
              <div
                style={{
                  flex: 1,
                  maxWidth: '120px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--gold-primary) 0%, transparent 100%)',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>

          {/* RIGHT: ARCHITECTURAL PHOTO FRAME + 3D STAGE */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 3D Orbital Rings Behind Portrait */}
            <div className="orbital-container">
              <div className="orbital-ring orbital-ring-1" />
              <div className="orbital-ring orbital-ring-2" />
            </div>

            {/* TOP-RIGHT FLOATING 3D GLASS CARD */}
            <div
              className="floating-orb-card"
              style={{
                position: 'absolute',
                top: '-25px',
                right: '-20px',
                zIndex: 25,
                background: 'rgba(14, 22, 36, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(217, 169, 104, 0.35)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--gold-glow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '180px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(20, 40, 59, 0.8) 100%)',
                    border: '1px solid #38BDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38BDF8'
                  }}
                >
                  <Globe2 size={18} className="animate-pulse" />
                </div>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                  <span style={{ width: '3px', height: '6px', background: 'var(--gold-primary)', borderRadius: '1px' }} />
                  <span style={{ width: '3px', height: '10px', background: 'var(--gold-primary)', borderRadius: '1px' }} />
                  <span style={{ width: '3px', height: '14px', background: 'var(--gold-primary)', borderRadius: '1px' }} />
                </div>
              </div>
              <div className="font-mono" style={{ fontSize: '0.64rem', color: 'var(--text-main)', letterSpacing: '0.06em', fontWeight: 600 }}>
                BUILDING SCALABLE SOLUTIONS
              </div>
            </div>

            {/* RIGHT VERTICAL MODE PILLS */}
            <div
              className="vertical-mode-stack"
              style={{
                position: 'absolute',
                right: '-48px',
                top: '40%',
                transform: 'translateY(-50%)',
                zIndex: 25,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {modes.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: '12px',
                      background: isActive ? 'linear-gradient(135deg, rgba(217, 169, 104, 0.35) 0%, rgba(14, 22, 36, 0.9) 100%)' : 'rgba(14, 22, 36, 0.75)',
                      border: isActive ? '1.5px solid var(--gold-light)' : '1px solid rgba(245, 240, 232, 0.1)',
                      color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                      boxShadow: isActive ? '0 0 20px var(--gold-glow)' : 'none',
                      cursor: 'pointer',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600
                    }}
                  >
                    <span>{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* THE ARCHITECTURAL GLOWING PHOTO FRAME */}
            <div className="arch-photo-container">
              <div
                ref={portraitRef}
                className="arch-frame"
                style={{
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
                }}
              >
                {/* 4 Architectural Golden Corner Notches */}
                <div className="arch-corner arch-corner-tl" />
                <div className="arch-corner arch-corner-tr" />
                <div className="arch-corner arch-corner-bl" />
                <div className="arch-corner arch-corner-br" />

                {/* Tech label on side */}
                <div className="arch-side-label" style={{ right: '-32px' }}>
                  FULL-STACK ENGINEER &bull; ARCHITECT
                </div>

                {/* Inner Image Container */}
                <div className="arch-inner-box">
                  <img
                    src={thumbnails[activeThumb].src}
                    alt={name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '9 / 12',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'contrast(1.02) saturate(1.03)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    loading="eager"
                  />

                  {/* Subtle Cinematic Vignette */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 16, 24, 0.9) 0%, rgba(11, 16, 24, 0.2) 30%, transparent 60%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Floating Nameplate Overlay at Base */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '18px',
                    right: '18px',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: 'rgba(14, 22, 36, 0.88)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(217, 169, 104, 0.4)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 15px var(--gold-glow)',
                    zIndex: 20
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div>
                      <div
                        className="font-heading"
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {name}
                      </div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: '0.64rem',
                          color: 'var(--gold-primary)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginTop: '2px'
                        }}
                      >
                        SOLUTIONS ARCHITECT &bull; LEAD ENGINEER
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                        <span style={{ fontSize: '0.68rem', color: '#CBD2DE', fontFamily: 'var(--font-mono)' }}>Available for Opportunities</span>
                      </div>
                    </div>

                    <a
                      href="#contact"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0B1018',
                        textDecoration: 'none',
                        boxShadow: '0 2px 10px rgba(217, 169, 104, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Thumbnail Selector Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '16px'
                }}
              >
                <button
                  onClick={() => setActiveThumb((prev) => (prev > 0 ? prev - 1 : thumbnails.length - 1))}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(14, 22, 36, 0.8)',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={14} />
                </button>

                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumb(idx)}
                    style={{
                      width: '48px',
                      height: '34px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeThumb === idx ? '2px solid var(--gold-light)' : '1px solid rgba(245, 240, 232, 0.15)',
                      padding: 0,
                      cursor: 'pointer',
                      boxShadow: activeThumb === idx ? '0 0 12px var(--gold-glow)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={thumb.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}

                <button
                  onClick={() => setActiveThumb((prev) => (prev < thumbnails.length - 1 ? prev + 1 : 0))}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(14, 22, 36, 0.8)',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Giant Subtle Background Watermark Numeral */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-30px',
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '5.5rem',
                fontWeight: 800,
                color: 'rgba(217, 169, 104, 0.05)',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
                lineHeight: 1
              }}
            >
              01
            </div>
          </div>
        </div>
      </div>

      {/* WATCH INTRO MODAL */}
      {showVideoModal && (
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
          onClick={() => setShowVideoModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px var(--gold-glow)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(217, 169, 104, 0.1)',
                border: '1px solid var(--border-gold)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div className="badge-gold" style={{ marginBottom: '12px' }}>
              CINEMATIC PORTFOLIO REEL
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '8px' }}>
              Architectural Craftsmanship in Action
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Experience the convergence of distributed system architecture, responsive frontend perfection, and cinematic 3D interaction designed and engineered by Uthayagunasingam Vanojan.
            </p>

            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                background: '#0B1018',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src="/hero/project-analytics.jpg"
                alt="Showreel preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(11, 16, 24, 0.3) 0%, rgba(11, 16, 24, 0.8) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B1018',
                    boxShadow: '0 0 30px rgba(217, 169, 104, 0.6)'
                  }}
                >
                  <Play size={26} fill="#0B1018" style={{ marginLeft: '4px' }} />
                </div>
                <span className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--gold-light)' }}>
                  INTERACTIVE REEL &bull; 4K ULTRA-HD
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive & Visual Styles */}
      <style>{`
        .social-circle-btn {
          color: var(--text-secondary);
          background: rgba(14, 22, 36, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .social-circle-btn:hover {
          color: var(--gold-light);
          border-color: var(--gold-primary);
          background: rgba(217, 169, 104, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px var(--gold-glow);
        }

        @media (max-width: 1024px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .floating-orb-card {
            display: none !important;
          }
          .vertical-mode-stack {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hero-stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-script-note {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
