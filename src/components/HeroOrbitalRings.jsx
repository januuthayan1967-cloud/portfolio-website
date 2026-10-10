import React from 'react';

/**
 * HeroOrbitalRings: Recreates the delicate, glowing 3D perspective orbital rings
 * with electric cyan and champagne gold gradients and traveling photon nodes from the reference.
 */
export default function HeroOrbitalRings() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '680px',
        height: '680px',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <svg
        viewBox="0 0 680 680"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
      >
        <defs>
          {/* Champagne Gold Orbital Gradient */}
          <linearGradient id="orbGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBE3BD" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#D9A968" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#D9A968" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D9A968" stopOpacity="0.6" />
          </linearGradient>

          {/* Electric Cyan Orbital Gradient */}
          <linearGradient id="orbCyanGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="nodeGlowGold" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="nodeGlowCyan" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary Tilted Champagne Gold Orbital Ring */}
        <ellipse
          cx="340"
          cy="340"
          rx="310"
          ry="155"
          transform="rotate(-26 340 340)"
          fill="none"
          stroke="url(#orbGoldGrad)"
          strokeWidth="1.4"
          filter="url(#nodeGlowGold)"
        />

        {/* Fine dashed secondary concentric trace */}
        <ellipse
          cx="340"
          cy="340"
          rx="320"
          ry="160"
          transform="rotate(-26 340 340)"
          fill="none"
          stroke="rgba(217, 169, 104, 0.22)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
        />

        {/* Secondary Tilted Sapphire/Cyan Orbital Ring */}
        <ellipse
          cx="340"
          cy="340"
          rx="275"
          ry="125"
          transform="rotate(38 340 340)"
          fill="none"
          stroke="url(#orbCyanGrad)"
          strokeWidth="1.2"
          filter="url(#nodeGlowCyan)"
        />

        {/* Third outer faint geometric boundary */}
        <circle
          cx="340"
          cy="340"
          r="260"
          fill="none"
          stroke="rgba(245, 240, 232, 0.04)"
          strokeWidth="1"
        />

        {/* Illuminated Photon Nodes / Celestial Beads on Rings */}
        {/* Node 1: Top-Right on Gold Ring */}
        <g transform="rotate(-26 340 340)">
          <circle cx="610" cy="305" r="4.5" fill="#FFF" filter="url(#nodeGlowGold)" />
          <circle cx="610" cy="305" r="9" fill="none" stroke="#D9A968" strokeWidth="1" opacity="0.6" />
          <circle cx="70" cy="375" r="3.5" fill="#FBE3BD" filter="url(#nodeGlowGold)" />
        </g>

        {/* Node 2: On Cyan Ring */}
        <g transform="rotate(38 340 340)">
          <circle cx="560" cy="310" r="4" fill="#38BDF8" filter="url(#nodeGlowCyan)" />
          <circle cx="560" cy="310" r="8" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
          <circle cx="120" cy="370" r="3" fill="#BAE6FD" filter="url(#nodeGlowCyan)" />
        </g>
      </svg>
    </div>
  );
}
