import React from 'react';
import { Shield, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin, profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '80px 0 40px',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        background: 'rgba(5, 7, 11, 0.95)',
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
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(15, 23, 42, 0.8))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#f8fafc'
                }}
              >
                UV
              </div>
              <span className="font-editorial" style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em', color: '#ffffff' }}>
                UTHAYAGUNASINGAM VANOJAN
              </span>
            </div>
            <p style={{ color: '#8b9bb4', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '340px' }}>
              Full-Stack Software Engineer & Solutions Architect. Art-directed and engineered around authentic personal portrait photography with dark cinematic luxury aesthetics.
            </p>
          </div>

          {/* Sitemaps */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: '#d4af37', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Navigation Architecture
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#hero" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Identity &amp; Vision</a>
              <a href="#about" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Biography &amp; Ethos</a>
              <a href="#projects" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Selected Systems</a>
              <a href="#skills" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Technical Mastery</a>
              <a href="#experience" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Education Trajectory</a>
              <a href="#contact" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}>Initiate Dialogue</a>
            </div>
          </div>

          {/* Admin & Security */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: '#d4af37', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Management Portal
            </div>
            <p style={{ color: '#8b9bb4', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '14px' }}>
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
              <Shield size={14} color="#d4af37" />
              <span>ACCESS ADMIN DASHBOARD</span>
            </button>
            <div style={{ color: '#64748b', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
              Shortcut: press <kbd style={{ background: '#1e293b', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>Ctrl+Shift+A</kbd>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} Uthayagunasingam Vanojan. All rights reserved. Built with React &amp; Three.js.
          </div>

          <button
            onClick={scrollToTop}
            title="Back to Top"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d4af37';
              e.currentTarget.style.color = '#06080d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
              e.currentTarget.style.color = '#d4af37';
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
