import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Search, LayoutGrid } from 'lucide-react';

export default function Navbar({ onOpenAdmin, profile, theme, onToggleTheme, onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 220;

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

  const navLinks = [
    { num: '01', name: 'Home', href: '#hero', id: 'hero' },
    { num: '02', name: 'About', href: '#about', id: 'about' },
    { num: '03', name: 'Projects', href: '#projects', id: 'projects' },
    { num: '04', name: 'Skills', href: '#skills', id: 'skills' },
    { num: '05', name: 'Experience', href: '#experience', id: 'experience' },
    { num: '06', name: 'Contact', href: '#contact', id: 'contact' }
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
        padding: scrolled ? '10px 0' : '18px 0',
        background: scrolled ? 'rgba(11, 16, 24, 0.88)' : 'rgba(11, 16, 24, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(217, 169, 104, 0.2)' : '1px solid rgba(245, 240, 232, 0.05)'
      }}
    >
      <div className="container-luxury" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* BRAND LOGO: Monogram + Editorial Name */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit',
            flexShrink: 0
          }}
        >
          {/* Gold UV Monogram Crest */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              border: '1.5px solid var(--gold-primary)',
              background: 'linear-gradient(135deg, rgba(217, 169, 104, 0.25) 0%, rgba(14, 22, 36, 0.9) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px var(--gold-glow)'
            }}
          >
            <span
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--gold-light)',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}
            >
              UV
            </span>
          </div>

          <div>
            <div
              className="font-heading"
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--text-main)',
                lineHeight: 1.15
              }}
            >
              VANOJAN
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.62rem',
                color: 'var(--gold-primary)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500
              }}
            >
              SOLUTIONS ARCHITECT
            </div>
          </div>
        </a>

        {/* CENTER NAVIGATION PILL (DESKTOP) */}
        <nav
          className="desktop-nav-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(14, 21, 34, 0.75)',
            border: '1px solid rgba(217, 169, 104, 0.25)',
            borderRadius: '9999px',
            padding: '4px 8px',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(217, 169, 104, 0.16)' : 'transparent',
                  border: isActive ? '1px solid rgba(217, 169, 104, 0.4)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 16px rgba(217, 169, 104, 0.25)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: isActive ? 'var(--gold-primary)' : 'rgba(217, 169, 104, 0.55)',
                    fontWeight: 600
                  }}
                >
                  {link.num}
                </span>
                <span className="font-sans">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Quick Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Search Portfolio"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(14, 22, 36, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-gold)';
                e.currentTarget.style.color = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Search size={16} />
            </button>
          )}

          {/* Luxury Theme Toggle Slider */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Ivory Light Mode' : 'Switch to Midnight Dark Mode'}
            style={{
              position: 'relative',
              width: '54px',
              height: '30px',
              borderRadius: '9999px',
              background: 'rgba(14, 22, 36, 0.85)',
              border: '1px solid var(--border-gold)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F2CA8E 0%, #D9A968 100%)',
                boxShadow: '0 2px 8px rgba(217, 169, 104, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B1018',
                transform: theme === 'dark' ? 'translateX(22px)' : 'translateX(0px)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {theme === 'dark' ? <Moon size={13} strokeWidth={2.5} /> : <Sun size={13} strokeWidth={2.5} />}
            </div>
          </button>

          {/* Consultation Button */}
          <a
            href="#contact"
            className="btn-gold consultation-btn"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              gap: '6px'
            }}
          >
            <span>Consultation</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Admin / Menu Grid Button */}
          <button
            onClick={onOpenAdmin}
            title="Management Console (Ctrl+Shift+A)"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(14, 22, 36, 0.8)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 169, 104, 0.15)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(14, 22, 36, 0.8)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <LayoutGrid size={16} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation"
            className="mobile-nav-toggle"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-gold)',
              background: 'var(--surface-card)',
              color: 'var(--text-main)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(11, 16, 24, 0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 85,
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-gold)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: activeSection === link.id ? 'var(--gold-light)' : 'var(--text-main)',
                  background: activeSection === link.id ? 'rgba(217, 169, 104, 0.12)' : 'rgba(20, 31, 50, 0.4)',
                  border: '1px solid var(--border-gold)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--gold-primary)' }}>
                  {link.num}
                </span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
            >
              <span>Consultation ↗</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="btn-ghost-luxury"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.85rem' }}
            >
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav-pill {
          display: flex;
        }
        .mobile-nav-toggle {
          display: none;
        }
        @media (max-width: 960px) {
          .desktop-nav-pill {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          .consultation-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
