import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Download, ShieldCheck, Layers, GitCommit } from 'lucide-react';

export default function HeroSection({ profile }) {
  const {
    name = "Uthayagunasingam Vanojan",
    shortName = "Vanojan",
    title = "Full-Stack Software Engineer & Solutions Architect",
    tagline = "Bridging architectural rigour and cinematic aesthetic depth to engineer unforgettable software experiences.",
    heroImage = "/hero/image2.jpeg",
    statusText = "Open for high-impact engineering & architecture engagements",
    metrics = []
  } = profile || {};

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
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
            gap: '48px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* LEFT: Editorial Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Status Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                className="badge-gold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    display: 'inline-block'
                  }}
                />
                {statusText}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.22em',
                  color: '#d4af37',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: 600
                }}
              >
                Full-Stack Systems Architect & Engineer
              </div>
              <h1
                className="font-editorial"
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}
              >
                Architectural <br />
                <span className="gold-gradient-text">Precision.</span> <br />
                Cinematic <span className="silver-gradient-text">Depth.</span>
              </h1>
              <p
                style={{
                  fontSize: '1.08rem',
                  color: '#cbd5e1',
                  maxWidth: '560px',
                  lineHeight: 1.75,
                  fontWeight: 300
                }}
              >
                {tagline}
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
              <a href="#projects" className="btn-gold">
                <span>Explore Selected Works</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#about"
                className="btn-ghost-luxury"
              >
                <Terminal size={16} color="#d4af37" />
                <span>Biography & Stack</span>
              </a>
            </div>

            {/* Live Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '16px',
                marginTop: '16px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass-panel"
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    background: 'rgba(11, 18, 33, 0.5)'
                  }}
                >
                  <div
                    className="font-editorial gold-gradient-text"
                    style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1.1 }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.68rem',
                      color: '#94a3b8',
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

          {/* RIGHT: The Visual Centerpiece — Authentic Portrait (image2.jpeg) */}
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
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
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
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Frame Chassis */}
            <div
              className="hero-portrait-frame"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '430px',
                background: 'linear-gradient(145deg, rgba(20, 30, 50, 0.6) 0%, rgba(6, 8, 13, 0.95) 100%)',
                backdropFilter: 'blur(10px)'
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
                  borderTop: '2px solid #d4af37',
                  borderLeft: '2px solid #d4af37',
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
                  borderTop: '2px solid #d4af37',
                  borderRight: '2px solid #d4af37',
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
                  borderBottom: '2px solid #d4af37',
                  borderLeft: '2px solid #d4af37',
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
                  borderBottom: '2px solid #d4af37',
                  borderRight: '2px solid #d4af37',
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
                    filter: 'contrast(1.02) saturate(1.03)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle Cinematic Vignette & Bottom Gradient to blend naturally */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(6, 8, 13, 0.85) 0%, rgba(6, 8, 13, 0.15) 30%, transparent 60%)',
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
                  background: 'rgba(8, 13, 24, 0.88)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.7)',
                  zIndex: 15
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div
                      className="font-editorial"
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {name}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        color: '#d4af37',
                        letterSpacing: '0.1em',
                        marginTop: '2px'
                      }}
                    >
                      SYSTEMS ARCHITECT & ENGINEER
                    </div>
                  </div>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4af37'
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
              color: '#8b9bb4',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              transition: 'color 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#d4af37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8b9bb4')}
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={14} className="animate-float" color="#d4af37" />
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
