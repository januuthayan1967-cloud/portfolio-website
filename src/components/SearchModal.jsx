import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpRight, Code2, Layers, Briefcase } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, projects = [], skills = [] }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11, 16, 24, 0.92)',
        backdropFilter: 'blur(24px)',
        zIndex: 120,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'rgba(14, 22, 36, 0.95)',
          border: '1.5px solid var(--border-gold)',
          borderRadius: '24px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 30px var(--gold-glow)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid rgba(245, 240, 232, 0.08)',
            gap: '14px'
          }}
        >
          <Search size={20} color="var(--gold-primary)" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, technologies, or capabilities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '1.05rem',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px' }}>
          {query.trim() === '' ? (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Type keywords such as "React", "Mobile", "LuxeVista", or "Database" to locate engineering assets.
            </div>
          ) : filteredProjects.length === 0 ? (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matches found for "{query}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredProjects.map((p) => (
                <a
                  key={p.id}
                  href="#projects"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(20, 31, 50, 0.4)',
                    border: '1px solid rgba(245, 240, 232, 0.06)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                    e.currentTarget.style.background = 'rgba(217, 169, 104, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.06)';
                    e.currentTarget.style.background = 'rgba(20, 31, 50, 0.4)';
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {p.title}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--gold-primary)' }}>
                      {p.category} &bull; {p.subtitle}
                    </div>
                  </div>
                  <ArrowUpRight size={16} color="var(--gold-primary)" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
