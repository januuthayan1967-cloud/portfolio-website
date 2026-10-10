import React from 'react';
import { ArrowUp, Shield } from 'lucide-react';

export default function Footer({ onOpenAdmin, profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '60px 0 35px',
        borderTop: '1px solid rgba(217, 169, 104, 0.2)',
        background: 'rgba(11, 16, 24, 0.95)',
        zIndex: 10
      }}
    >
      <div className="container-luxury">
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
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: '1.5px solid var(--gold-primary)',
                background: 'linear-gradient(135deg, rgba(217, 169, 104, 0.25) 0%, rgba(14, 22, 36, 0.9) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cinzel, Georgia, serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'var(--gold-light)'
              }}
            >
              UV
            </div>
            <div>
              <span className="font-heading" style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-main)' }}>
                VANOJAN
              </span>
              <div className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--gold-primary)', letterSpacing: '0.15em' }}>
                SOLUTIONS ARCHITECT &bull; LEAD ENGINEER
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <a href="#hero" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', textDecoration: 'none', transition: 'color 0.2s' }}>Home</a>
            <a href="#about" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', textDecoration: 'none', transition: 'color 0.2s' }}>About</a>
            <a href="#projects" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', textDecoration: 'none', transition: 'color 0.2s' }}>Projects</a>
            <a href="#skills" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', textDecoration: 'none', transition: 'color 0.2s' }}>Skills</a>
            <a href="#experience" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', textDecoration: 'none', transition: 'color 0.2s' }}>Experience</a>
            <a href="#contact" style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            title="Return to Top"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(14, 22, 36, 0.8)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 169, 104, 0.2)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(14, 22, 36, 0.8)';
              e.currentTarget.style.transform = 'none';
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
