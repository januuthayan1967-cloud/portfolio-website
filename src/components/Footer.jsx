import React from 'react';
import { ArrowUp, Shield } from 'lucide-react';
import CinematicAtmosphere from './CinematicAtmosphere';

export default function Footer({ onOpenAdmin, profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '60px 0 35px',
        borderTop: '1px solid var(--border-gold)',
        background: 'var(--surface-card)',
        boxShadow: '0 -4px 25px rgba(212, 162, 58, 0.05)',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <CinematicAtmosphere variant="footer" particlesCount={8} showEnergyBeam={false} />
      <div className="container-luxury" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {/* Brand Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                border: '1.5px solid var(--border-gold)',
                background: 'var(--surface-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cinzel, Georgia, serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--text-gold)',
                boxShadow: '0 2px 8px rgba(212, 162, 58, 0.12)'
              }}
            >
              UV
            </div>
            <div>
              <span className="font-heading" style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-main)' }}>
                VANOJAN
              </span>
              <div className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--text-gold)', letterSpacing: '0.15em', fontWeight: 600 }}>
                GRADUATE SOFTWARE ENGINEER &bull; FULL-STACK DEVELOPER
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <a href="#hero" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Home</a>
            <a href="#about" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>About</a>
            <a href="#projects" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Projects</a>
            <a href="#skills" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Skills</a>
            <a href="#experience" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Experience</a>
            <a href="#contact" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Contact</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            title="Return to Top"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--surface-elevated)',
              border: '1.5px solid var(--border-gold)',
              color: 'var(--text-gold)',
              boxShadow: 'var(--card-shadow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 162, 58, 0.18)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface-elevated)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Shortcut */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(245, 240, 232, 0.06)',
            gap: '16px'
          }}
        >
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Uthayagunasingam Vanojan. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Shield size={12} />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
