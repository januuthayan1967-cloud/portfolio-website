import React, { useState } from 'react';
import { Shield, KeyRound, User, Lock, ArrowRight, X, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('vanojan2026');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      localStorage.setItem('vanojan_admin_token', data.token);
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(3, 5, 8, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 36px',
          borderRadius: '24px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          background: 'linear-gradient(145deg, #0d1526 0%, #06080d 100%)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.2)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        {/* Crest */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(15, 23, 42, 0.9))',
              border: '1px solid #d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)'
            }}
          >
            <Shield size={28} color="#d4af37" />
          </div>
          <h2 className="font-editorial" style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 700 }}>
            Executive Console
          </h2>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: '#d4af37', marginTop: '4px' }}>
            AUTHENTICATED PORTFOLIO MANAGEMENT
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
              Admin Identifier
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '10px',
                  background: 'rgba(6, 8, 13, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
              <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
              Access Passphrase
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '10px',
                  background: 'rgba(6, 8, 13, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
              <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Quick Default Credentials Note */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              fontSize: '0.76rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <KeyRound size={14} color="#d4af37" style={{ flexShrink: 0 }} />
            <span>Default access prefilled: <strong style={{ color: '#d4af37' }}>admin</strong> / <strong style={{ color: '#d4af37' }}>vanojan2026</strong></span>
          </div>

          {error && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '0.82rem',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: '100%', padding: '0.95rem', marginTop: '6px' }}
          >
            {loading ? 'Authenticating...' : 'Unlock Management Console'}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
