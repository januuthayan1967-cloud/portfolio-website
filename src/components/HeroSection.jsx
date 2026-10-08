import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Terminal, Github, Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';

export default function HeroSection({ profile }) {
  const {
    name = "Uthayagunasingam Vanojan",
    shortName = "Vanojan",
    title = "Full-Stack Software Engineer & Solutions Architect",
    tagline = "Bridging architectural rigour and cinematic aesthetic depth to engineer unforgettable software experiences.",
    heroImage = "/hero/image2.jpeg",
    statusText = "Open for high-impact engineering & architecture engagements",
    email = "uthayanvanojan5@gmail.com",
    github = "https://github.com",
    linkedin = "https://linkedin.com",
    twitter = "https://twitter.com",
    metrics = []
  } = profile || {};

  // Micro-parallax on mouse movement for portrait
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const portraitRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!portraitRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '135px',
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cinematic Ambient Glow matching photograph lighting */}
      <div
        className="ambient-glow-gold"
        style={{ top: '15%', left: '35%', opacity: 0.7 }}
      />
      <div
        className="ambient-glow-navy"
        style={{ top: '25%', right: '-5%', opacity: 0.8 }}
      />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '52px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* LEFT: Asymmetrical Editorial Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Introductory Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                className="badge-gold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px var(--gold-glow)'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                    display: 'inline-block'
                  }}
                />
                {statusText}
              </span>
            </div>

            {/* Name & Title Typography */}
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.84rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontWeight: 600
                }}
              >
                {name} &bull; {title}
              </div>

              {/* Main Headline */}
              <h1
                className="font-heading"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.3rem)',
                  lineHeight: 1.12,
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: 'var(--text-main)',
                  marginBottom: '16px'
                }}
              >
                Architectural <br />
                <span className="gold-gradient-text">Precision.</span> <br />
                Cinematic <span className="silver-gradient-text">Depth.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  lineHeight: 1.75,
                  fontWeight: 300
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', paddingTop: '4px' }}>
              <a href="#projects" className="btn-gold">
                <span>Explore Selected Works</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#about"
                className="btn-ghost-luxury"
              >
                <Terminal size={16} color="var(--gold-primary)" />
                <span>Biography &amp; Stack</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '6px' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Connect //
              </span>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold-primary)';
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Github size={16} />
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold-primary)';
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Linkedin size={16} />
              </a>

              <a
                href={`mailto:${email}`}
                title="Send Direct Email"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold-primary)';
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Mail size={16} />
              </a>
            </div>

            {/* Live Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '14px',
                marginTop: '12px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass-panel"
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-gold)',
                    background: 'var(--surface-card)'
                  }}
                >
                  <div
                    className="font-heading gold-gradient-text"
                    style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1.1 }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginTop: '4px'
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual Centerpiece — Authentic Portrait (image2.jpeg) with Micro-Tilt */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Ambient Backlight Aura mimicking studio lamps */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '-10%',
                width: '320px',
                height: '320px',
                background: 'radial-gradient(circle, rgba(217, 169, 104, 0.3) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '-10%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(20, 40, 59, 0.35) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Frame Chassis with Subtle Micro-tilt */}
            <div
              ref={portraitRef}
              className="hero-portrait-frame"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '430px',
                background: 'linear-gradient(145deg, rgba(20, 31, 50, 0.6) 0%, var(--bg-primary) 100%)',
                backdropFilter: 'blur(10px)',
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: 'transform 0.25s ease-out, box-shadow 0.4s ease'
              }}
            >
              {/* Corner decorative architectural ticks */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '16px',
                  height: '16px',
                  borderTop: '2px solid var(--gold-primary)',
                  borderLeft: '2px solid var(--gold-primary)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '16px',
                  height: '16px',
                  borderTop: '2px solid var(--gold-primary)',
                  borderRight: '2px solid var(--gold-primary)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  width: '16px',
                  height: '16px',
                  borderBottom: '2px solid var(--gold-primary)',
                  borderLeft: '2px solid var(--gold-primary)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  width: '16px',
                  height: '16px',
                  borderBottom: '2px solid var(--gold-primary)',
                  borderRight: '2px solid var(--gold-primary)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />

              {/* The Original Photograph image2.jpeg */}
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <img
                  src={heroImage}
                  alt="Uthayagunasingam Vanojan — Full-Stack Software Engineer"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '9 / 16',
                    objectFit: 'cover',
                    filter: 'contrast(1.02) saturate(1.02)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle Cinematic Vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(11, 16, 24, 0.85) 0%, rgba(11, 16, 24, 0.15) 30%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Floating Architectural Badge at Base */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'var(--surface-glass)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-gold)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                  zIndex: 15
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div
                      className="font-heading"
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {name}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--gold-primary)',
                        letterSpacing: '0.1em',
                        marginTop: '2px'
                      }}
                    >
                      SOLUTIONS ARCHITECT &bull; LEAD ENGINEER
                    </div>
                  </div>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(217, 169, 104, 0.15)',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-primary)'
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px'
          }}
        >
          <a
            href="#about"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              transition: 'color 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <span>DISCOVER BIOGRAPHY</span>
            <ArrowDown size={14} className="animate-float" color="var(--gold-primary)" />
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
