import React, { useState } from 'react';
import {
  X,
  Send,
  Mail,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export default function EmailReplyModal({
  message,
  token,
  onClose,
  onReplySuccess,
  showToast
}) {
  const [subject, setSubject] = useState(() => `Re: ${message.subject || 'Portfolio Inquiry'}`);
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) {
      setError('Please enter your response before sending.');
      return;
    }

    setSending(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/messages/${message.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: subject.trim(),
          reply: replyBody.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch reply via Gmail SMTP');
      }

      showToast?.(`Reply dispatched via Gmail SMTP to ${message.email}`);
      onReplySuccess?.(message.id, data.reply);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: 'rgba(2, 5, 11, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          background: 'linear-gradient(155deg, #0e172a 0%, #060911 100%)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-gold">GMAIL SMTP DISPATCH</span>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                EXECUTIVE REPLY
              </span>
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.45rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>
              Compose Direct Response
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Reply Modal"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Error notification */}
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

        {/* Original Message Summary Box */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            background: 'rgba(10, 16, 28, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '22px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={14} color="#d4af37" />
              <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>{message.name}</strong>
              <span className="font-mono" style={{ color: '#94a3b8', fontSize: '0.78rem' }}>&lt;{message.email}&gt;</span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {new Date(message.date).toLocaleString()}
            </span>
          </div>

          <div style={{ color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic', background: 'rgba(6, 9, 16, 0.6)', padding: '10px 14px', borderRadius: '8px', borderLeft: '2px solid #d4af37' }}>
            "{message.message.length > 220 ? `${message.message.slice(0, 220)}...` : message.message}"
          </div>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
              Recipient Verified Address (Locked from Database)
            </label>
            <input
              type="text"
              readOnly
              value={message.email}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                background: 'rgba(6, 9, 16, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#d4af37',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
              Response Subject Line
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                background: 'rgba(6, 9, 16, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
              Executive Response Body (Formatted HTML/Text delivered to recipient)
            </label>
            <textarea
              required
              rows={6}
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Write your professional response to this inquiry..."
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(6, 9, 16, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                color: '#ffffff',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={sending}
              className="btn-gold"
              style={{
                flex: 2,
                padding: '12px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: sending ? 'not-allowed' : 'pointer',
                opacity: sending ? 0.75 : 1
              }}
            >
              {sending ? (
                <>
                  <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Dispatching via Gmail SMTP...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Direct Response</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
