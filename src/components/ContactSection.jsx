import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ profile }) {
  const {
    email = "uthayanvanojan5@gmail.com",
    phone = "+94 75 029 2685",
    location = "Jaffna, Sri Lanka"
  } = profile || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message');

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Trigger subtle celebratory confetti respecting reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        confetti({
          particleCount: 55,
          spread: 55,
          origin: { y: 0.72 },
          colors: ['#D9A968', '#F2CA8E', '#14283B', '#E5A84B']
        });
      }

      setTimeout(() => {
        setStatus((s) => ({ ...s, success: false }));
      }, 6000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      {/* Background glow */}
      <div className="ambient-glow-gold" style={{ bottom: '10%', right: '15%', opacity: 0.6 }} />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            06 // INITIATE DIALOGUE
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.2
            }}
          >
            Let's Engineer <span className="gold-gradient-text">Exceptional</span> Systems.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px', maxWidth: '600px' }}>
            Whether commissioning architectural consultations, high-scale application builds, or full-time strategic engineering, send an inquiry below.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px'
          }}
          className="contact-grid"
        >
          {/* LEFT: Contact Cards & Direct Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Card */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--border-gold)',
                background: 'var(--surface-card)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(217, 169, 104, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Mail size={20} color="var(--gold-primary)" />
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Direct Email
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                    {email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(email, 'email')}
                title="Copy email to clipboard"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: copiedField === 'email' ? '#10B981' : 'var(--gold-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {copiedField === 'email' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Phone Card */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--border-gold)',
                background: 'var(--surface-card)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(217, 169, 104, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Phone size={20} color="var(--gold-primary)" />
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Phone / WhatsApp
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                    {phone}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(phone, 'phone')}
                title="Copy phone to clipboard"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: copiedField === 'phone' ? '#10B981' : 'var(--gold-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {copiedField === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Location Card */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--border-gold)',
                background: 'var(--surface-card)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(217, 169, 104, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MapPin size={20} color="var(--gold-primary)" />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Base of Operations
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                  {location}
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div
              style={{
                padding: '20px',
                borderRadius: '14px',
                background: 'rgba(217, 169, 104, 0.08)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Sparkles size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Inquiries are encrypted and routed directly to the real-time admin console. Expected response turnaround is typically within 12 hours.
              </div>
            </div>
          </div>

          {/* RIGHT: High-End Message Formulation Form */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '20px',
              border: '1px solid var(--border-gold)',
              background: 'var(--surface-card)'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label
                    className="font-mono"
                    style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'var(--surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                <div>
                  <label
                    className="font-mono"
                    style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}
                  >
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'var(--surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  Inquiry Topic / Scope
                </label>
                <input
                  type="text"
                  placeholder="e.g. Full-Stack Web Platform Architecture / Contract Engagement"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.25s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  Project Details &amp; Specifications *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share details regarding your technical requirements, architecture, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: 1.6,
                    transition: 'border-color 0.25s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              {status.error && (
                <div style={{ color: '#EF4444', fontSize: '0.85rem', padding: '10px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)' }}>
                  {status.error}
                </div>
              )}

              {status.success && (
                <div style={{ color: '#10B981', fontSize: '0.85rem', padding: '12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} />
                  <span>Your message was delivered successfully and logged to the admin dashboard.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="btn-gold"
                style={{ width: '100%', padding: '1rem', marginTop: '6px' }}
              >
                {status.loading ? (
                  <span>Transmitting Encrypted Dispatch...</span>
                ) : (
                  <>
                    <span>Transmit Project Inquiry</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
