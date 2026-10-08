import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenAdmin, profile, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Identity', href: '#hero', id: 'hero' },
    { name: 'Biography', href: '#about', id: 'about' },
    { name: 'Selected Works', href: '#projects', id: 'projects' },
    { name: 'Capabilities', href: '#skills', id: 'skills' },
    { name: 'Trajectory', href: '#experience', id: 'experience' },
    { name: 'Inquiries', href: '#contact', id: 'contact' }
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
        background: scrolled ? 'var(--surface-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent'
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
              border: '1px solid var(--border-gold)',
              background: 'linear-gradient(135deg, rgba(217, 169, 104, 0.2), var(--surface-card))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-editorial)',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              boxShadow: '0 0 15px var(--gold-glow)'
            }}
          >
            UV
          </div>
          <div>
            <div
              className="font-heading"
              style={{
                fontSize: '1.02rem',
                letterSpacing: '0.08em',
                fontWeight: 700,
                color: 'var(--text-main)',
                lineHeight: 1.2
              }}
            >
              VANOJAN
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.64rem',
                letterSpacing: '0.14em',
                color: 'var(--gold-primary)',
                textTransform: 'uppercase'
              }}
            >
              Solutions Architect
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '20px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.02em',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--gold-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                  padding: '4px 0',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ fontSize: '0.65rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-mono)' }}>
                  0{idx + 1}
                </span>
                <span>{link.name}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--gold-primary)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Switch to Dark Cinematic Mode' : 'Switch to Warm Ivory Light Mode'}
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 10px',
              cursor: 'pointer',
              color: 'var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease'
            }}
            aria-label="Toggle visual theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Discrete Admin Portal Lock */}
          <button
            onClick={onOpenAdmin}
            title="Executive Admin Dashboard"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              color: 'var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.25s ease'
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
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
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
            gap: '16px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontSize: '1.02rem',
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                0{idx + 1} //
              </span>
              <span>{link.name}</span>
            </a>
          ))}
          <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              Initiate Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="btn-ghost-luxury"
              style={{ padding: '0.75rem 1.2rem' }}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 920px) {
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
