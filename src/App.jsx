import React, { useState, useEffect, useCallback } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import CustomCursor from './components/CustomCursor';
import AudioPlayer from './components/AudioPlayer';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TechStackRibbon from './components/TechStackRibbon';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [data, setData] = useState({
    profile: null,
    projects: [],
    skills: [],
    education: []
  });
  const [loading, setLoading] = useState(true);

  // Theme Management (Dark / Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vanojan_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vanojan_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Search Modal
  const [searchOpen, setSearchOpen] = useState(false);

  // Admin Modal & Auth State
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('vanojan_admin_token'));

  // Fetch public portfolio data
  const loadPortfolioData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Could not fetch portfolio from API, fallback to default state', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolioData();

    // Ping analytics visit
    fetch('/api/analytics/ping', { method: 'POST' }).catch(() => {});

    // Global keyboard shortcut to trigger Admin Console (Ctrl + Shift + A)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loadPortfolioData]);

  const handleLoginSuccess = (token) => {
    setAdminToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('vanojan_admin_token');
    setAdminToken(null);
  };

  if (loading && !data.profile) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--gold-primary)'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid rgba(217, 169, 104, 0.2)',
            borderTopColor: 'var(--gold-primary)',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}
        />
        <div className="font-heading" style={{ letterSpacing: '0.12em', fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>
          UTHAYAGUNASINGAM VANOJAN
        </div>
        <div className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.15em' }}>
          INITIALIZING ARCHITECTURAL ENVIRONMENT...
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Bespoke Magnetic Cursor */}
      <CustomCursor />

      {/* Cinematic 3D Three.js Background */}
      <ThreeCanvas />

      {/* Luxury Ambient Audio Toggle */}
      <AudioPlayer />

      {/* Main Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        profile={data.profile}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Flow Matching Reference Design */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection profile={data.profile} />
        <TechStackRibbon />
        <AboutSection profile={data.profile} />
        <ProjectsSection projects={data.projects} />
        <SkillsSection skills={data.skills} />
        <ExperienceSection education={data.education} />
        <ContactSection profile={data.profile} />
      </main>

      {/* Footer with Sitemaps & Admin trigger */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        profile={data.profile}
      />

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        projects={data.projects}
        skills={data.skills}
      />

      {/* ADMIN CONSOLE MODAL */}
      {adminOpen && (
        adminToken ? (
          <AdminDashboard
            token={adminToken}
            onLogout={handleLogout}
            onClose={() => setAdminOpen(false)}
            onDataRefresh={loadPortfolioData}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setAdminOpen(false)}
          />
        )
      )}
    </div>
  );
}
