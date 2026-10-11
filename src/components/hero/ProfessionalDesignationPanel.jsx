import React from 'react';

/**
 * ProfessionalDesignationPanel: Recreates the floating glass information card
 * positioned near the upper-left edge of the portrait composition from the reference image.
 * Features:
 * - Dark translucent glass background with deep navy backdrop blur
 * - Thin champagne-gold precision border
 * - Glowing amber/gold illuminated circular indicator node
 * - Compact technical typography:
 *     FULL-STACK
 *     SOFTWARE ENGINEER
 *     & SOLUTIONS ARCHITECT
 */
export default function ProfessionalDesignationPanel({ style = {} }) {
  return (
    <div
      className="professional-designation-panel"
      style={{
        background: 'rgba(11, 18, 30, 0.84)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(217, 169, 104, 0.35)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 18px rgba(217, 169, 104, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
        zIndex: 25,
        ...style
      }}
    >
      {/* Glowing Amber / Gold Pulsing Indicator Node */}
      <div
        style={{
          position: 'relative',
          width: '10px',
          height: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '50%',
            background: 'rgba(229, 168, 75, 0.35)',
            animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF5DE 0%, #E5A84B 100%)',
            boxShadow: '0 0 10px #E5A84B, 0 0 16px rgba(229, 168, 75, 0.6)',
            display: 'block'
          }}
        />
      </div>

      {/* Compact Technical Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: 'var(--gold-light)',
            textTransform: 'uppercase',
            lineHeight: 1.2
          }}
        >
          FULL-STACK
        </span>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-main)',
            lineHeight: 1.2
          }}
        >
          SOFTWARE ENGINEER
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.60rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            lineHeight: 1.2
          }}
        >
          &amp; SOLUTIONS ARCHITECT
        </span>
      </div>
    </div>
  );
}
