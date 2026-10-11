import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * PortraitIdentityPanel: Reconstructs the integrated glass identity panel
 * overlapping the lower portion of the portrait chassis from the reference image.
 * Features:
 * - Deep navy translucent glass with backdrop blur
 * - Fine champagne gold edge detailing
 * - Warm ivory name typography
 * - Small uppercase gold designation: SOLUTIONS ARCHITECT · LEAD ENGINEER
 * - Glowing emerald green availability indicator
 * - Gold outlined circular arrow button linking to #contact
 */
export default function PortraitIdentityPanel({
  name = "Uthayagunasingam Vanojan",
  title = "SOLUTIONS ARCHITECT · LEAD ENGINEER",
  status = "Available for Opportunities",
  contactHref = "#contact",
  style = {}
}) {
  return (
    <div
      className="portrait-identity-panel"
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        right: '16px',
        padding: '14px 18px',
        borderRadius: '16px',
        background: 'rgba(10, 17, 28, 0.90)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(217, 169, 104, 0.42)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(217, 169, 104, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        zIndex: 20,
        pointerEvents: 'auto',
        userSelect: 'none',
        ...style
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Name, Designation & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <div
            className="font-heading"
            style={{
              fontSize: '1.02rem',
              fontWeight: 800,
              color: '#F5F0E8',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {name}
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              color: 'var(--gold-primary)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              marginTop: '1px'
            }}
          >
            {title}
          </div>

          {/* Green Availability Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              marginTop: '4px'
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '8px',
                height: '8px'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.4)',
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              />
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px #10B981'
                }}
              />
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.68rem',
                color: '#CBD2DE',
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Circular Gold Outlined Arrow Button */}
        <a
          href={contactHref}
          aria-label="Contact Solutions Architect"
          className="identity-contact-arrow"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(217, 169, 104, 0.15) 0%, rgba(14, 22, 36, 0.8) 100%)',
            border: '1.5px solid var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-light)',
            textDecoration: 'none',
            flexShrink: 0,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4), 0 0 12px rgba(217, 169, 104, 0.25)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <ArrowRight size={17} />
        </a>
      </div>

      <style>{`
        .identity-contact-arrow:hover {
          background: linear-gradient(135deg, #FBE3BD 0%, #D9A968 100%) !important;
          color: #0B1018 !important;
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 20px rgba(217, 169, 104, 0.6) !important;
        }
      `}</style>
    </div>
  );
}
