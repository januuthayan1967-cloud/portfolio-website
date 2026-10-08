import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAdmin, profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Identity', href: '#hero' },
    { name: 'Biography', href: '#about' },
    { name: 'Selected Works', href: '#projects' },
    { name: 'Capabilities', href: '#skills' },
    { name: 'Trajectory', href: '#experience' },
    { name: 'Inquiries', href: '#contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled ? '12px 0' : '22px 0',
        background: scrolled ? 'rgba(6, 8, 13, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent'
      }}
    >
      <div className="container-luxury" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Crest */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(15, 23, 42, 0.8))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-editorial)',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#f8fafc',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)'
            }}
          >
            UV
          </div>
          <div>
            <div
              className="font-editorial"
              style={{
                fontSize: '1.05rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.2
              }}
            >
              VANOJAN
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.16em',
                color: '#d4af37',
                textTransform: 'uppercase'
              }}
            >
              Software Architect
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f3d078')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
            >
              <span style={{ fontSize: '0.65rem', color: '#d4af37', fontFamily: 'var(--font-mono)' }}>
                0{idx + 1}
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Discrete Admin Portal Lock */}
          <button
            onClick={onOpenAdmin}
            title="Admin Dashboard Portal"
            style={{
              background: 'rgba(14, 22, 38, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '8px',
              padding: '8px 10px',
              cursor: 'pointer',
              color: '#d4af37',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d4af37';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Shield size={14} />
            <span className="hidden-mobile">ADMIN</span>
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="btn-gold hidden-mobile"
            style={{
              padding: '0.6rem 1.3rem',
              fontSize: '0.82rem'
            }}
          >
            <span>Consultation</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            margin: '12px 16px 0',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#f8fafc',
                textDecoration: 'none',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ color: '#d4af37', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                0{idx + 1} //
              </span>
              <span>{link.name}</span>
            </a>
          ))}
          <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', gap: '10px' }}>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold"
              style={{ flex: 1, padding: '0.7rem' }}
            >
              Initiate Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="btn-ghost-luxury"
              style={{ padding: '0.7rem 1.2rem' }}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
