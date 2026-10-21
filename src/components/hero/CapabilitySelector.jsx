import React from 'react';
import { Palette, Code2, Layers, Lightbulb } from 'lucide-react';

/**
 * CapabilitySelector: Reconstructs the vertical floating capability selector
 * positioned to the right of the portrait from the reference image.
 * Features:
 * - 4 vertically arranged pill controls: Design, Develop, Architect, Innovate
 * - Width matches the Globe HUD (144px) for perfect columnar alignment
 * - Dark translucent glass with deep navy backdrop blur
 * - Initially highlights "Develop" with illuminated gold border & warm amber glow
 * - Keyboard accessible (Enter/Space, Tab, role="tablist")
 * - Refined hover and focus states
 */
export default function CapabilitySelector({ 
  activeMode = 'Develop', 
  onSelectMode, 
  style = {},
  customCapabilities
}) {
  const defaultLabels = ['Design', 'Develop', 'Architect', 'Innovate'];
  const labels = (Array.isArray(customCapabilities) && customCapabilities.length === 4)
    ? customCapabilities
    : defaultLabels;

  const icons = [<Palette size={14} />, <Code2 size={14} />, <Layers size={14} />, <Lightbulb size={14} />];
  const capabilities = labels.map((label, idx) => ({
    id: label,
    label: label,
    icon: icons[idx] || <Layers size={14} />
  }));

  return (
    <div
      className="capability-selector"
      role="tablist"
      aria-label="Engineering Capabilities"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '144px',
        background: 'rgba(9, 15, 25, 0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(217, 169, 104, 0.32)',
        borderRadius: '18px',
        padding: '6px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65), 0 0 20px rgba(217, 169, 104, 0.12)',
        zIndex: 25,
        ...style
      }}
    >
      {capabilities.map((item) => {
        const isActive = activeMode === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onClick={() => onSelectMode && onSelectMode(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectMode && onSelectMode(item.id);
              }
            }}
            className={`capability-btn ${isActive ? 'capability-active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              padding: '7px 14px',
              borderRadius: '9999px',
              background: isActive
                ? 'linear-gradient(135deg, rgba(217, 169, 104, 0.28) 0%, rgba(14, 22, 36, 0.95) 100%)'
                : 'transparent',
              border: isActive
                ? '1.5px solid #F2C77C'
                : '1.5px solid transparent',
              color: isActive ? '#FFFFFF' : '#AAB0BA',
              boxShadow: isActive
                ? '0 0 16px rgba(217, 169, 104, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : 'none',
              cursor: 'pointer',
              transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.80rem',
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '0.02em',
              outline: 'none',
              width: '100%',
              justifyContent: 'flex-start'
            }}
          >
            <span
              style={{
                color: isActive ? '#F2C77C' : 'rgba(203, 210, 222, 0.7)',
                display: 'flex',
                alignItems: 'center',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(242, 199, 124, 0.8))' : 'none',
                transition: 'color 0.2s ease'
              }}
            >
              {item.icon}
            </span>
            <span>
              {item.label}
            </span>
          </button>
        );
      })}

      <style>{`
        .capability-btn:hover:not(.capability-active) {
          background: rgba(20, 32, 52, 0.9) !important;
          border-color: rgba(217, 169, 104, 0.5) !important;
          color: var(--text-main) !important;
          transform: translateX(3px);
        }
        .capability-btn:focus-visible {
          box-shadow: 0 0 0 2px #F2C77C !important;
        }
      `}</style>
    </div>
  );
}
