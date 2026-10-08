import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin, profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '80px 0 40px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--surface-card)',
        zIndex: 10
      }}
    >
      <div className="container-luxury">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-gold)',
                  background: 'linear-gradient(135deg, rgba(217, 169, 104, 0.2), var(--surface-card))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--text-main)'
                }}
              >
                UV
              </div>
              <span className="font-heading" style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--text-main)' }}>
                UTHAYAGUNASINGAM VANOJAN
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '340px' }}>
              Full-Stack Software Engineer &amp; Solutions Architect. Art-directed around authentic personal portrait photography with dark cinematic luxury aesthetics.
            </p>
          </div>

          {/* Sitemaps */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Navigation Architecture
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#hero" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Identity &amp; Vision</a>
              <a href="#about" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Biography &amp; Ethos</a>
              <a href="#projects" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Selected Systems</a>
              <a href="#skills" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Technical Mastery</a>
              <a href="#experience" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Education Trajectory</a>
              <a href="#contact" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Initiate Dialogue</a>
            </div>
          </div>

          {/* Admin & Security */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Management Portal
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '14px' }}>
              Secure administrative access for real-time portfolio data mutation, message review, analytics, and project editing.
            </p>
            <button
              onClick={onOpenAdmin}
              className="btn-ghost-luxury"
              style={{
                padding: '0.65rem 1.2rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <Shield size={14} color="var(--gold-primary)" />
              <span>ACCESS ADMIN DASHBOARD</span>
            </button>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
              Shortcut: press <kbd style={{ background: 'var(--surface-elevated)', padding: '2px 6px', borderRadius: '4px', color: 'var(--gold-primary)' }}>Ctrl+Shift+A</kbd>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Uthayagunasingam Vanojan. All rights reserved. Built with React &amp; Three.js.
          </div>

          <button
            onClick={scrollToTop}
            title="Back to Top"
            style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-gold)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-primary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold-primary)';
              e.currentTarget.style.color = '#0B1018';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface-elevated)';
              e.currentTarget.style.color = 'var(--gold-primary)';
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
