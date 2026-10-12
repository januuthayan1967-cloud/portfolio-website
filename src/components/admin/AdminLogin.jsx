import React, { useState, useEffect } from 'react';
import {
  Shield,
  KeyRound,
  User,
  Lock,
  ArrowRight,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Mail,
  RefreshCw,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onClose, initialView = 'login', initialResetToken = '' }) {
  const [view, setView] = useState(initialView); // 'login' | 'forgot' | 'reset'
  
  // Login Form State
  const [username, setUsername] = useState('vanojanSE');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  
  // Reset Password State
  const [resetToken, setResetToken] = useState(initialResetToken);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Read URL for resetToken if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('resetToken');
    if (tokenFromUrl) {
      setResetToken(tokenFromUrl);
      setView('reset');
    }
  }, []);

  // 1. Handle Admin Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
          rememberMe
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
      }

      // Persist auth token safely
      localStorage.setItem('vanojan_admin_token', data.token);
      if (rememberMe) {
        localStorage.setItem('vanojan_admin_remember', 'true');
      } else {
        localStorage.removeItem('vanojan_admin_remember');
      }

      setSuccessMsg('Authentication confirmed. Welcome, Executive Administrator.');
      setTimeout(() => {
        onLoginSuccess(data.token);
      }, 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Forgot Password Request
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not process password reset request.');
      }

      setForgotSubmitted(true);
      setSuccessMsg(data.message || 'If this email belongs to the administrator, a secure reset link has been dispatched via Gmail SMTP.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Reset Password Submission
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (newPassword.length < 8) {
      setError('Password must contain at least 8 characters.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken.trim(),
          newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Password reset token is invalid or expired.');
      }

      setSuccessMsg('Your password has been securely updated. You may now log in.');
      // Clean URL params if resetToken was in URL
      if (window.history?.replaceState) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }

      setTimeout(() => {
        setPassword('');
        setView('login');
      }, 1800);
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
        background: 'rgba(3, 7, 14, 0.94)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      {/* Ambient Atmospheric Lighting */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(9, 24, 43, 0.25) 50%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }}
      />

      {/* Cinematic Modal Card */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '42px 38px',
          borderRadius: '26px',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          background: 'linear-gradient(155deg, rgba(14, 23, 40, 0.95) 0%, rgba(5, 9, 16, 0.98) 100%)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Gold Glowing Accent Top Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #FBE3BD, #D4AF37, #AA8425, transparent)'
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <X size={16} />
        </button>

        {/* Crest & Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(14, 23, 40, 0.95) 100%)',
              border: '1.5px solid #d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 28px rgba(212, 175, 55, 0.35)'
            }}
          >
            <Shield size={28} color="#d4af37" />
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: '1.65rem',
              color: '#ffffff',
              fontWeight: 800,
              letterSpacing: '0.02em',
              margin: '0 0 6px'
            }}
          >
            {view === 'login' && 'Executive Console'}
            {view === 'forgot' && 'Reset Access'}
            {view === 'reset' && 'Create New Passphrase'}
          </h2>

          <div
            className="font-mono"
            style={{
              fontSize: '0.74rem',
              color: '#d4af37',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}
          >
            {view === 'login' && 'AUTHENTICATED PORTFOLIO CONTROL'}
            {view === 'forgot' && 'GMAIL SMTP SECURITY DISPATCH'}
            {view === 'reset' && 'CRYPTOGRAPHIC PASSPHRASE UPDATE'}
          </div>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#6ee7b7',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ========================================================
            VIEW 1: ADMIN LOGIN FORM
           ======================================================== */}
        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label
                className="font-mono"
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  color: '#cbd5e1',
                  marginBottom: '8px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                Admin Identifier
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="vanojanSE"
                  style={{
                    width: '100%',
                    padding: '13px 16px 13px 44px',
                    borderRadius: '12px',
                    background: 'rgba(6, 10, 18, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)')}
                />
                <User
                  size={17}
                  color="#d4af37"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    color: '#cbd5e1',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  Access Passphrase
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccessMsg(null);
                    setView('forgot');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#d4af37',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  style={{
                    width: '100%',
                    padding: '13px 44px 13px 44px',
                    borderRadius: '12px',
                    background: 'rgba(6, 10, 18, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)')}
                />
                <Lock
                  size={17}
                  color="#d4af37"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: '#94a3b8' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#d4af37', width: '15px', height: '15px' }}
                />
                <span>Remember this terminal</span>
              </label>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#64748b' }}>
                SSL / TLS Encrypted
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                marginTop: '6px'
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={17} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Access Executive Console</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================================
            VIEW 2: FORGOT PASSWORD FORM
           ======================================================== */}
        {view === 'forgot' && (
          <div>
            {!forgotSubmitted ? (
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.6, margin: '0 0 10px' }}>
                  Enter your registered administrator email address. A single-use, 15-minute cryptographically secure reset link will be dispatched via Gmail SMTP.
                </p>

                <div>
                  <label
                    className="font-mono"
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      color: '#cbd5e1',
                      marginBottom: '8px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Administrator Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="admin@example.com"
                      style={{
                        width: '100%',
                        padding: '13px 16px 13px 44px',
                        borderRadius: '12px',
                        background: 'rgba(6, 10, 18, 0.85)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        color: '#ffffff',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)')}
                    />
                    <Mail
                      size={17}
                      color="#d4af37"
                      style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccessMsg(null);
                      setView('login');
                    }}
                    style={{
                      flex: 1,
                      padding: '13px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#cbd5e1',
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Login</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold"
                    style={{
                      flex: 1.5,
                      padding: '13px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Please check your Gmail inbox for the secure reset link. Once received, click the link to configure your new passphrase.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSubmitted(false);
                    setError(null);
                    setSuccessMsg(null);
                    setView('login');
                  }}
                  className="btn-gold"
                  style={{
                    padding: '12px 28px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW 3: RESET PASSWORD FORM (via Token)
           ======================================================== */}
        {view === 'reset' && (
          <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
              Enter your one-time verification token and choose a new high-entropy password (minimum 8 characters).
            </p>

            <div>
              <label
                className="font-mono"
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  color: '#cbd5e1',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}
              >
                Verification Reset Token
              </label>
              <input
                type="text"
                required
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                placeholder="Paste token from reset email"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: 'rgba(6, 10, 18, 0.85)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label
                className="font-mono"
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  color: '#cbd5e1',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}
              >
                New Passphrase (Min 8 characters)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new secure passphrase"
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(6, 10, 18, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label
                className="font-mono"
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  color: '#cbd5e1',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}
              >
                Confirm New Passphrase
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new passphrase"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(6, 10, 18, 0.85)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '6px'
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Securing &amp; Hashing...</span>
                </>
              ) : (
                <>
                  <span>Save New Passphrase</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setError(null);
                setSuccessMsg(null);
                setView('login');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Cancel and Return to Login
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
