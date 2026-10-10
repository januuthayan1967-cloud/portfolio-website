import React, { useState, useRef } from 'react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Play, 
  Sparkles, 
  Code2, 
  Layers, 
  Cpu, 
  X,
  Briefcase,
  Star
} from 'lucide-react';
import ArchitecturalFrame from './ArchitecturalFrame';
import HeroOrbitalRings from './HeroOrbitalRings';

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

  const [activeMode, setActiveMode] = useState('Develop');
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Micro-parallax on mouse movement
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 5, y: -y * 5 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const modes = [
    { id: 'Design', icon: <Sparkles size={14} />, label: 'Design' },
    { id: 'Develop', icon: <Code2 size={14} />, label: 'Develop' },
    { id: 'Architect', icon: <Layers size={14} />, label: 'Architect' },
    { id: 'Innovate', icon: <Cpu size={14} />, label: 'Innovate' }
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cinematic Ambient Atmosphere matching reference */}
      <div 
        style={{
          position: 'absolute',
          top: '12%',
          left: '32%',
          width: '580px',
          height: '580px',
          background: 'radial-gradient(circle, rgba(217, 169, 104, 0.16) 0%, rgba(20, 40, 59, 0.22) 55%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(20, 40, 59, 0.4) 0%, rgba(11, 16, 24, 0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }} 
      />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        
        {/* TOP STATUS BADGE */}
        <div style={{ marginBottom: '24px', display: 'flex' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 18px',
              borderRadius: '9999px',
              background: 'rgba(14, 22, 36, 0.8)',
              border: '1px solid rgba(217, 169, 104, 0.35)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 16px var(--gold-glow)',
              textDecoration: 'none',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s ease'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--gold-primary)',
                boxShadow: '0 0 10px var(--gold-primary)',
                display: 'inline-block'
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-main)',
                letterSpacing: '0.08em',
                fontWeight: 600
              }}
            >
              {statusText}
            </span>
            <span style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', marginLeft: '4px' }}>&rarr;</span>
          </a>
        </div>

        {/* MAIN HERO SPLIT GRID (Proportions match reference) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.18fr 0.82fr',
            gap: '36px',
            alignItems: 'center'
          }}
          className="hero-main-grid"
        >
          {/* ========================================================
              LEFT COLUMN: EDITORIAL TYPOGRAPHY, ACTIONS & STATS
             ======================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Subhead Row: Name and Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.84rem',
                  letterSpacing: '0.18em',
                  color: 'var(--gold-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                {name.toUpperCase()}
              </span>
              <span style={{ color: 'rgba(217, 169, 104, 0.4)', fontSize: '0.8rem' }}>|</span>
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
            </div>

            {/* Giant Editorial Headline */}
            <div>
              <h1
                style={{
                  fontFamily: "'Cinzel', 'Sora', sans-serif",
                  fontSize: 'clamp(2.7rem, 5.2vw, 4.6rem)',
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Architectural<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFF1D6 0%, #D9A968 45%, #B58238 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 25px rgba(217, 169, 104, 0.4))'
                  }}
                >
                  Precision.
                </span><br />
                <span>Cinematic Depth.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  lineHeight: 1.7,
                  fontWeight: 300
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '4px' }}>
              <a 
                href="#projects" 
                className="btn-gold" 
                style={{ 
                  padding: '0.9rem 2.2rem', 
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 25px rgba(217, 169, 104, 0.4)'
                }}
              >
                <span>Explore My Work</span>
                <ArrowUpRight size={17} />
              </a>

              <button
                onClick={() => setShowVideoModal(true)}
                className="btn-ghost-luxury"
                style={{ 
                  padding: '0.85rem 1.8rem', 
                  fontSize: '0.9rem', 
                  gap: '10px' 
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FBE3BD 0%, #D9A968 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B1018',
                    boxShadow: '0 2px 10px rgba(217, 169, 104, 0.5)'
                  }}
                >
                  <Play size={11} fill="#0B1018" style={{ marginLeft: '1px' }} />
                </div>
                <span>Watch Intro</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '4px' }}>
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
                <a href={github} target="_blank" rel="noreferrer" title="GitHub" className="hero-social-btn">
                  <Github size={15} />
                </a>
                <a href={linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="hero-social-btn">
                  <Linkedin size={15} />
                </a>
                <a href={`mailto:${email}`} title="Email" className="hero-social-btn">
                  <Mail size={15} />
                </a>
                <a href={twitter} target="_blank" rel="noreferrer" title="Twitter / X" className="hero-social-btn">
                  <Twitter size={15} />
                </a>
              </div>
            </div>

            {/* 4 STATS CARDS ROW (Exact proportions matching reference) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginTop: '8px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(245, 240, 232, 0.08)'
              }}
              className="hero-stats-row"
            >
              {/* Stat 1 */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '14px 16px', 
                  borderRadius: '14px', 
                  background: 'rgba(14, 22, 36, 0.7)',
                  border: '1px solid rgba(217, 169, 104, 0.22)' 
                }}
              >
                <div 
                  className="font-heading"
                  style={{ 
                    fontSize: '1.6rem', 
                    fontWeight: 800, 
                    color: 'var(--gold-light)', 
                    lineHeight: 1.1 
                  }}
                >
                  3+
                </div>
                <div 
                  className="font-mono" 
                  style={{ 
                    fontSize: '0.62rem', 
                    color: 'var(--text-muted)', 
                    letterSpacing: '0.04em', 
                    textTransform: 'uppercase', 
                    marginTop: '4px' 
                  }}
                >
                  YEARS EXPERIENCE
                </div>
              </div>

              {/* Stat 2 */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '14px 16px', 
                  borderRadius: '14px', 
                  background: 'rgba(14, 22, 36, 0.7)',
                  border: '1px solid rgba(217, 169, 104, 0.22)' 
                }}
              >
                <div 
                  className="font-heading"
                  style={{ 
                    fontSize: '1.6rem', 
                    fontWeight: 800, 
                    color: 'var(--gold-light)', 
                    lineHeight: 1.1 
                  }}
                >
                  12+
                </div>
                <div 
                  className="font-mono" 
                  style={{ 
                    fontSize: '0.62rem', 
                    color: 'var(--text-muted)', 
                    letterSpacing: '0.04em', 
                    textTransform: 'uppercase', 
                    marginTop: '4px' 
                  }}
                >
                  DELIVERED SYSTEMS
                </div>
              </div>

              {/* Stat 3 */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '14px 16px', 
                  borderRadius: '14px', 
                  background: 'rgba(14, 22, 36, 0.7)',
                  border: '1px solid rgba(217, 169, 104, 0.22)' 
                }}
              >
                <div 
                  className="font-heading"
                  style={{ 
                    fontSize: '1.6rem', 
                    fontWeight: 800, 
                    color: 'var(--gold-light)', 
                    lineHeight: 1.1 
                  }}
                >
                  950+
                </div>
                <div 
                  className="font-mono" 
                  style={{ 
                    fontSize: '0.62rem', 
                    color: 'var(--text-muted)', 
                    letterSpacing: '0.04em', 
                    textTransform: 'uppercase', 
                    marginTop: '4px' 
                  }}
                >
                  CODE COMMITS
                </div>
              </div>

              {/* Stat 4 */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '14px 16px', 
                  borderRadius: '14px', 
                  background: 'rgba(14, 22, 36, 0.7)',
                  border: '1px solid rgba(217, 169, 104, 0.22)' 
                }}
              >
                <div 
                  className="font-heading"
                  style={{ 
                    fontSize: '1.6rem', 
                    fontWeight: 800, 
                    color: 'var(--gold-light)', 
                    lineHeight: 1.1 
                  }}
                >
                  100%
                </div>
                <div 
                  className="font-mono" 
                  style={{ 
                    fontSize: '0.62rem', 
                    color: 'var(--text-muted)', 
                    letterSpacing: '0.04em', 
                    textTransform: 'uppercase', 
                    marginTop: '4px' 
                  }}
                >
                  SATISFACTION
                </div>
              </div>
            </div>

            {/* Bottom Scroll To Explore Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
              <a
                href="#about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  color: 'var(--text-muted)'
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '26px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '4px'
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '5px',
                      borderRadius: '2px',
                      background: 'var(--gold-primary)',
                      animation: 'floatSlow 2s ease-in-out infinite'
                    }}
                  />
                </div>
                <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  SCROLL TO EXPLORE
                </span>
              </a>

              <div
                style={{
                  flex: 1,
                  maxWidth: '100px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--gold-primary) 0%, transparent 100%)',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: ARCHITECTURAL PHOTO FRAME & 3D STAGE
             ======================================================== */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: 'transform 0.25s ease-out'
            }}
          >
            {/* 3D Perspective Glowing Orbital Rings */}
            <HeroOrbitalRings />

            {/* TOP-RIGHT FLOATING GLASS BADGE (Matching Reference) */}
            <div
              className="hero-floating-top-badge"
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-10px',
                zIndex: 25,
                background: 'rgba(14, 22, 36, 0.88)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(217, 169, 104, 0.35)',
                borderRadius: '14px',
                padding: '10px 14px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px var(--gold-glow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              <div 
                className="font-mono" 
                style={{ 
                  fontSize: '0.62rem', 
                  color: 'var(--gold-primary)', 
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                FULL-STACK
              </div>
              <div 
                className="font-heading" 
                style={{ 
                  fontSize: '0.78rem', 
                  color: 'var(--text-main)', 
                  fontWeight: 700,
                  letterSpacing: '0.04em'
                }}
              >
                ENGINEER
              </div>
              <div 
                className="font-mono" 
                style={{ 
                  fontSize: '0.62rem', 
                  color: 'var(--gold-primary)', 
                  letterSpacing: '0.08em'
                }}
              >
                SOLUTIONS ARCHITECT
              </div>
            </div>

            {/* RIGHT VERTICAL MODE PILLS (Matching Reference) */}
            <div
              className="hero-vertical-modes"
              style={{
                position: 'absolute',
                right: '-46px',
                top: '45%',
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
                      padding: '7px 14px',
                      borderRadius: '12px',
                      background: isActive ? 'linear-gradient(135deg, rgba(217, 169, 104, 0.35) 0%, rgba(14, 22, 36, 0.9) 100%)' : 'rgba(14, 22, 36, 0.78)',
                      border: isActive ? '1.5px solid var(--gold-light)' : '1px solid rgba(245, 240, 232, 0.1)',
                      color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                      boxShadow: isActive ? '0 0 20px var(--gold-glow)' : 'none',
                      cursor: 'pointer',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                      fontSize: '0.76rem',
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
            <ArchitecturalFrame
              imageSrc={heroImage}
              altText={name}
              imagePosition="center 16%"
              imageScale={1.12}
              sideText="FULL-STACK ENGINEER • SOLUTIONS ARCHITECT"
            >
              {/* Floating Bottom Nameplate Capsule (Matching Reference) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: 'rgba(14, 22, 36, 0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(217, 169, 104, 0.45)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px var(--gold-glow)',
                  zIndex: 25
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div>
                    <div
                      className="font-heading"
                      style={{
                        fontSize: '0.96rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {name.toUpperCase()}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.62rem',
                        color: 'var(--gold-primary)',
                        letterSpacing: '0.12em',
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
                      background: 'linear-gradient(135deg, #FBE3BD 0%, #D9A968 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0B1018',
                      textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(217, 169, 104, 0.5)',
                      flexShrink: 0
                    }}
                  >
                    &rarr;
                  </a>
                </div>
              </div>
            </ArchitecturalFrame>

            {/* GOLDEN CURSIVE SIGNATURE (Matching Reference) */}
            <div
              className="hero-signature"
              style={{
                position: 'absolute',
                bottom: '-28px',
                right: '-32px',
                zIndex: 25,
                pointerEvents: 'none'
              }}
            >
              <svg width="110" height="55" viewBox="0 0 110 55" fill="none">
                {/* Flowing handwritten script "Vanojan" */}
                <path 
                  d="M10 35 C20 10 25 10 32 32 C38 45 42 25 48 30 C55 35 60 20 68 32 C74 40 82 25 90 28 C96 30 102 24 105 18" 
                  stroke="url(#sigGrad)" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  filter="drop-shadow(0 0 8px rgba(217, 169, 104, 0.6))"
                />
                <path 
                  d="M60 42 C75 44 95 38 102 32 M96 30 L104 32 L98 38" 
                  stroke="url(#sigGrad)" 
                  strokeWidth="1.6" 
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBE3BD" />
                    <stop offset="60%" stopColor="#D9A968" />
                    <stop offset="100%" stopColor="#B88544" />
                  </linearGradient>
                </defs>
              </svg>
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
                    background: 'linear-gradient(135deg, #FBE3BD 0%, #D9A968 100%)',
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

      {/* Hero Styles */}
      <style>{`
        .hero-social-btn {
          color: var(--text-secondary);
          background: rgba(14, 22, 36, 0.8);
          border: 1px solid rgba(245, 240, 232, 0.1);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .hero-social-btn:hover {
          color: var(--gold-light);
          border-color: var(--gold-primary);
          background: rgba(217, 169, 104, 0.18);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px var(--gold-glow);
        }

        @media (max-width: 1024px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          .hero-floating-top-badge {
            display: none !important;
          }
          .hero-vertical-modes {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hero-stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-signature {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
