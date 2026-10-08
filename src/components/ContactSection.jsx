import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';
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

      // Trigger golden celebratory confetti burst
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#f59e0b', '#fcd34d', '#38bdf8']
      });

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
            className="font-editorial"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2
            }}
          >
            Let's Engineer <span className="gold-gradient-text">Exceptional</span> Systems.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px', maxWidth: '600px' }}>
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
                border: '1px solid rgba(212, 175, 55, 0.2)',
                background: 'rgba(14, 22, 38, 0.55)',
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
                    background: 'rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Mail size={20} color="#d4af37" />
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                    Direct Email
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#f8fafc', marginTop: '2px' }}>
                    {email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(email, 'email')}
                title="Copy email to clipboard"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: copiedField === 'email' ? '#10b981' : '#d4af37',
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
                border: '1px solid rgba(212, 175, 55, 0.2)',
                background: 'rgba(14, 22, 38, 0.55)',
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
                    background: 'rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Phone size={20} color="#d4af37" />
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                    Phone / WhatsApp
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#f8fafc', marginTop: '2px' }}>
                    {phone}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(phone, 'phone')}
                title="Copy phone to clipboard"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: copiedField === 'phone' ? '#10b981' : '#d4af37',
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
                border: '1px solid rgba(212, 175, 55, 0.2)',
                background: 'rgba(14, 22, 38, 0.55)',
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
                  background: 'rgba(212, 175, 55, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MapPin size={20} color="#d4af37" />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                  Base of Operations
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#f8fafc', marginTop: '2px' }}>
                  {location}
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div
              style={{
                padding: '20px',
                borderRadius: '14px',
                background: 'rgba(212, 175, 55, 0.06)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Sparkles size={18} color="#d4af37" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Inquiries are routed directly to the real-time encrypted dashboard inbox. Expected response turnaround is typically within 12 hours.
              </div>
            </div>
          </div>

          {/* RIGHT: High-End Message Formulation Form */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              background: 'linear-gradient(145deg, rgba(14, 22, 38, 0.7) 0%, rgba(8, 12, 22, 0.9) 100%)'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label
                    className="font-mono"
                    style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase' }}
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
                      background: 'rgba(6, 8, 13, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label
                    className="font-mono"
                    style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase' }}
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
                      background: 'rgba(6, 8, 13, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase' }}
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
                    background: 'rgba(6, 8, 13, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.25s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                />
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  Project Details & Specifications *
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
                    background: 'rgba(6, 8, 13, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: 1.6,
                    transition: 'border-color 0.25s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                />
              </div>

              {status.error && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', padding: '10px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)' }}>
                  {status.error}
                </div>
              )}

              {status.success && (
                <div style={{ color: '#10b981', fontSize: '0.85rem', padding: '12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
