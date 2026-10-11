import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowUpRight, UploadCloud, Image, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ profile }) {
  const {
    email = "uthayanvanojan5@gmail.com",
    phone = "+94 75 029 2685",
    location = "Sri Lanka"
  } = profile || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    imageUrl: '',
    imagePublicId: ''
  });

  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleAttachmentChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setStatus({ loading: false, success: false, error: 'Attachment exceeds 8MB maximum size.' });
      return;
    }
    setUploadingAttachment(true);
    setStatus((s) => ({ ...s, error: null }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('tag', 'user_upload');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload attachment');
      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
        imagePublicId: data.public_id
      }));
    } catch (err) {
      setStatus({ loading: false, success: false, error: `Upload error: ${err.message}` });
    } finally {
      setUploadingAttachment(false);
    }
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
      setFormData({ name: '', email: '', subject: '', message: '', imageUrl: '', imagePublicId: '' });

      // Trigger celebration confetti
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        confetti({
          particleCount: 50,
          spread: 55,
          origin: { y: 0.75 },
          colors: ['#D9A968', '#F2CA8E', '#14283B', '#E5A84B']
        });
      }

      setTimeout(() => {
        setStatus((s) => ({ ...s, success: false }));
      }, 5000);
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
      <div className="ambient-glow-gold" style={{ bottom: '10%', right: '10%', opacity: 0.5 }} />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="badge-gold">06 // CONTACT</span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              COMMISSION &bull; COLLABORATION
            </span>
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.15
            }}
          >
            LET'S BUILD <span className="gold-gradient-text">SOMETHING GREAT</span>
          </h2>
        </div>

        {/* TWO-COLUMN CONTACT COMPOSITION (Exact match to reference) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr',
            gap: '40px',
            alignItems: 'start'
          }}
          className="contact-main-grid"
        >
          {/* LEFT: DIRECT CONTACT INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Email item */}
            <div
              className="glass-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(217, 169, 104, 0.22)',
                background: 'rgba(14, 22, 36, 0.72)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(217, 169, 104, 0.15)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-primary)',
                    flexShrink: 0
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Email
                  </div>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      textDecoration: 'none'
                    }}
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(email, 'email')}
                title="Copy Email"
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedField === 'email' ? 'var(--gold-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Phone item */}
            <div
              className="glass-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(217, 169, 104, 0.22)',
                background: 'rgba(14, 22, 36, 0.72)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(217, 169, 104, 0.15)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-primary)',
                    flexShrink: 0
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Phone
                  </div>
                  <a
                    href={`tel:${phone}`}
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      textDecoration: 'none'
                    }}
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(phone, 'phone')}
                title="Copy Phone"
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedField === 'phone' ? 'var(--gold-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                {copiedField === 'phone' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Location item */}
            <div
              className="glass-panel"
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(217, 169, 104, 0.22)',
                background: 'rgba(14, 22, 36, 0.72)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(217, 169, 104, 0.15)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-primary)',
                  flexShrink: 0
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Location
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {location}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: ELEGANT CONTACT FORM */}
          <div
            className="glass-panel"
            style={{
              padding: '32px',
              borderRadius: '24px',
              border: '1px solid rgba(217, 169, 104, 0.3)',
              background: 'rgba(14, 22, 36, 0.8)'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Row 1: Name and Email */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}
                className="contact-form-row"
              >
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(20, 31, 50, 0.65)',
                      border: '1px solid rgba(245, 240, 232, 0.1)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      transition: 'border-color 0.25s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(245, 240, 232, 0.1)')}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(20, 31, 50, 0.65)',
                      border: '1px solid rgba(245, 240, 232, 0.1)',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      transition: 'border-color 0.25s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(245, 240, 232, 0.1)')}
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(20, 31, 50, 0.65)',
                    border: '1px solid rgba(245, 240, 232, 0.1)',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    transition: 'border-color 0.25s'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(245, 240, 232, 0.1)')}
                />
              </div>

              {/* Row 3: Message */}
              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(20, 31, 50, 0.65)',
                    border: '1px solid rgba(245, 240, 232, 0.1)',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.25s'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(245, 240, 232, 0.1)')}
                />
              </div>

              {/* Optional Cloudinary Image Attachment */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(20, 31, 50, 0.45)',
                  border: '1px dashed rgba(217, 169, 104, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(217, 169, 104, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-primary)'
                    }}
                  >
                    <Image size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      Attach Reference Screenshot
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Optional mockup, architecture sketch or brief (Max 8MB)
                    </div>
                  </div>
                </div>

                {formData.imageUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={formData.imageUrl}
                      alt="Uploaded preview"
                      style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--gold-light)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: '', imagePublicId: '' }))}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        color: '#f87171',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <X size={12} />
                      <span>Remove</span>
                    </button>
                  </div>
                ) : (
                  <label
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      background: 'rgba(217, 169, 104, 0.15)',
                      border: '1px solid rgba(217, 169, 104, 0.35)',
                      color: 'var(--gold-light)',
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: uploadingAttachment ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <UploadCloud size={14} />
                    <span>{uploadingAttachment ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingAttachment}
                      onChange={handleAttachmentChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>

              {/* Status alerts */}
              {status.success && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10B981',
                    color: '#6EE7B7',
                    fontSize: '0.85rem',
                    textAlign: 'center'
                  }}
                >
                  ✓ Inquiry transmitted successfully. I will connect with you shortly!
                </div>
              )}

              {status.error && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #EF4444',
                    color: '#FCA5A5',
                    fontSize: '0.85rem',
                    textAlign: 'center'
                  }}
                >
                  ✕ {status.error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  cursor: status.loading ? 'not-allowed' : 'pointer'
                }}
              >
                <span>{status.loading ? 'Transmitting...' : 'Send Message'}</span>
                <ArrowUpRight size={17} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
