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
    { num: '06', name: 'Inquiries', href: '#contact', id: 'contact' }
  ];

  return (
    <header className="reference-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled ? '10px 0' : '16px 0',
        background: scrolled 
          ? (theme === 'light' ? 'rgba(255, 252, 247, 0.94)' : 'rgba(7, 10, 16, 0.88)') 
          : (theme === 'light' ? 'rgba(255, 252, 247, 0.65)' : 'rgba(7, 10, 16, 0.55)'),
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderBottom: scrolled ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)'
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
              border: theme === 'light' ? '1.5px solid #D4A23A' : '1.5px solid #F2C77C',
              background: theme === 'light'
                ? 'linear-gradient(135deg, #FFFDF8 0%, #FEF3C7 100%)'
                : 'linear-gradient(135deg, rgba(217, 169, 104, 0.25) 0%, rgba(10, 15, 24, 0.95) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme === 'light'
                ? '0 2px 10px rgba(212, 162, 58, 0.2)'
                : '0 0 20px rgba(217, 169, 104, 0.35)'
            }}
          >
            <span
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '1.18rem',
                fontWeight: 700,
                color: theme === 'light' ? '#B7791F' : '#FFF5DE',
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
                fontSize: '1.08rem',
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
                color: 'var(--text-gold)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600
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
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 16, 26, 0.72)',
            border: theme === 'light' ? '1.5px solid var(--border-gold)' : '1px solid rgba(217, 169, 104, 0.22)',
            borderRadius: '9999px',
            padding: '4px 10px',
            boxShadow: theme === 'light'
              ? '0 10px 25px rgba(212, 162, 58, 0.1), inset 0 1px 0 #ffffff'
              : '0 12px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? (theme === 'light' ? '#111827' : '#FFFFFF')
                    : (theme === 'light' ? '#475569' : 'rgba(203, 210, 222, 0.75)'),
                  textDecoration: 'none',
                  transition: 'all 0.22s ease'
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: theme === 'light' ? '#B7791F' : (isActive ? '#D9A968' : 'rgba(217, 169, 104, 0.45)'),
                    fontWeight: 700
                  }}
                >
                  {link.num}
                </span>
                <span className="font-sans">{link.name}</span>

                {/* Glowing Yellow/Gold underline indicator for active item */}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '2.5px',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #F2CE83, #D4A23A)',
                      boxShadow: '0 0 8px rgba(212, 162, 58, 0.6)'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Quick Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Search Portfolio"
              aria-label="Search"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(12, 18, 28, 0.75)',
                border: '1px solid rgba(245, 240, 232, 0.12)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(217, 169, 104, 0.5)';
                e.currentTarget.style.color = '#FFF5DE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.12)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Search size={15} />
            </button>
          )}

          {/* Luxury Theme Toggle Slider */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            aria-pressed={theme === 'light'}
            title={theme === 'dark' ? 'Switch to Ivory Light Mode' : 'Switch to Midnight Dark Mode'}
            style={{
              position: 'relative',
              width: '56px',
              height: '30px',
              borderRadius: '9999px',
              background: 'rgba(12, 18, 28, 0.85)',
              border: '1px solid rgba(217, 169, 104, 0.35)',
              cursor: 'pointer',
              padding: '2px 3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)'
            }}
          >
            <Sun size={12} style={{ color: 'rgba(242, 202, 142, 0.65)', marginLeft: '4px' }} />
            <Moon size={12} style={{ color: 'rgba(242, 202, 142, 0.65)', marginRight: '4px' }} />
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: theme === 'dark' ? '28px' : '3px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFF5DE 0%, #E5A84B 100%)',
                boxShadow: '0 0 10px rgba(229, 168, 75, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B1018',
                transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </button>

          {/* Consultation Button */}
          <a
            href="#contact"
            className="btn-gold consultation-btn"
            style={{
              padding: '0.62rem 1.35rem',
              fontSize: '0.84rem',
              fontWeight: 700,
              gap: '6px',
              background: 'linear-gradient(135deg, #FFF5DE 0%, #E5BA7D 40%, #D9A968 70%, #B88544 100%)',
              color: '#0B1018',
              boxShadow: '0 0 22px rgba(217, 169, 104, 0.5), 0 4px 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            <span>Consultation</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Admin / Menu Grid Button (4 Dots ::) */}
          <button
            onClick={onOpenAdmin}
            title="Management Console (Ctrl+Shift+A)"
            aria-label="App Menu"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(12, 18, 28, 0.8)',
              border: '1px solid rgba(217, 169, 104, 0.3)',
              color: '#D9A968',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 169, 104, 0.18)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(12, 18, 28, 0.8)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="5" cy="5" r="1.5" />
              <circle cx="11" cy="5" r="1.5" />
              <circle cx="5" cy="11" r="1.5" />
              <circle cx="11" cy="11" r="1.5" />
            </svg>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation"
            className="mobile-nav-toggle"
            style={{
              width: '38px',
              height: '38px',
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
            background: theme === 'light' ? 'rgba(255, 252, 247, 0.98)' : 'rgba(7, 10, 16, 0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 85,
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-gold)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                  color: activeSection === link.id ? 'var(--text-gold)' : 'var(--text-main)',
                  background: activeSection === link.id ? 'rgba(212, 162, 58, 0.15)' : 'var(--surface-card)',
                  border: '1.5px solid var(--border-gold)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontWeight: 700 }}>
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
        @media (max-width: 860px) {
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
