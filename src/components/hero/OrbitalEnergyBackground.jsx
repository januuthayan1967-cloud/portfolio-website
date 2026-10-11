import React from 'react';

/**
 * OrbitalEnergyBackground: Recreates the cinematic sapphire orbital energy system
 * positioned behind the portrait frame from the reference image.
 * Features:
 * - Deep radial sapphire illumination & amber warmth
 * - Tilted thin sapphire-blue elliptical arcs & champagne-gold orbital tracks
 * - Precision glowing photon nodes (beads) with celestial halos
 * - Fine connecting constellation rays
 * - Smooth, slow, restrained orbital motion
 */
export default function OrbitalEnergyBackground({ style = {} }) {
  return (
    <div
      className="orbital-energy-system"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '780px',
        height: '780px',
        pointerEvents: 'none',
        zIndex: 0,
        ...style
      }}
    >
      {/* 1. Deep Atmospheric Radial Sapphire Glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.24) 0%, rgba(14, 116, 144, 0.14) 35%, rgba(20, 40, 59, 0.35) 55%, transparent 75%)',
          filter: 'blur(50px)',
          borderRadius: '50%'
        }}
      />

      {/* 2. Soft Gold Core Highlight */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at 45% 45%, rgba(217, 169, 104, 0.18) 0%, transparent 65%)',
          filter: 'blur(45px)',
          borderRadius: '50%'
        }}
      />

      {/* 3. SVG High-Precision Orbital Paths */}
      <svg
        viewBox="0 0 780 780"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
      >
        <defs>
          {/* Champagne Gold Gradient */}
          <linearGradient id="orbitGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5DE" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#F2C77C" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#D9A968" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#9B6A35" stopOpacity="0.65" />
          </linearGradient>

          {/* Sapphire Cyan Gradient */}
          <linearGradient id="orbitSapphireGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.35" />
            <stop offset="75%" stopColor="#0369A1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.65" />
          </linearGradient>

          {/* Gold Bloom Filter */}
          <filter id="orbitGlowGold" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sapphire Bloom Filter */}
          <filter id="orbitGlowCyan" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Constellation Connecting Vector Lines */}
        <line
          x1="220"
          y1="260"
          x2="560"
          y2="490"
          stroke="rgba(56, 189, 248, 0.16)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
        />
        <line
          x1="180"
          y1="480"
          x2="580"
          y2="280"
          stroke="rgba(217, 169, 104, 0.15)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
        />

        {/* Primary Sapphire Orbital Ring (Tilted 36 deg) */}
        <g transform="rotate(36 390 390)">
          <ellipse
            cx="390"
            cy="390"
            rx="340"
            ry="145"
            fill="none"
            stroke="url(#orbitSapphireGrad)"
            strokeWidth="1.3"
            filter="url(#orbitGlowCyan)"
          />

          {/* Dashed secondary concentric track */}
          <ellipse
            cx="390"
            cy="390"
            rx="352"
            ry="152"
            fill="none"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />

          {/* Illuminated Sapphire Nodes */}
          {/* Main East Cyan Node */}
          <circle cx="710" cy="365" r="4.5" fill="#38BDF8" filter="url(#orbitGlowCyan)" />
          <circle cx="710" cy="365" r="9" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.45" />
          <circle cx="710" cy="365" r="1.8" fill="#FFFFFF" />

          {/* West Minor Cyan Node */}
          <circle cx="85" cy="420" r="3" fill="#38BDF8" filter="url(#orbitGlowCyan)" />
          <circle cx="85" cy="420" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Primary Champagne Gold Orbital Ring (Tilted -26 deg) */}
        <g transform="rotate(-26 390 390)">
          <ellipse
            cx="390"
            cy="390"
            rx="325"
            ry="140"
            fill="none"
            stroke="url(#orbitGoldGrad)"
            strokeWidth="1.4"
            filter="url(#orbitGlowGold)"
          />

          {/* Inner concentric gold dashed trace */}
          <ellipse
            cx="390"
            cy="390"
            rx="305"
            ry="130"
            fill="none"
            stroke="rgba(217, 169, 104, 0.22)"
            strokeWidth="0.8"
            strokeDasharray="6 4 2 4"
          />

          {/* Illuminated Gold Nodes */}
          {/* East Gold Node */}
          <circle cx="690" cy="355" r="4.5" fill="#FFF5DE" filter="url(#orbitGlowGold)" />
          <circle cx="690" cy="355" r="10" fill="none" stroke="#D9A968" strokeWidth="1" opacity="0.5" />
          <circle cx="690" cy="355" r="2" fill="#FFFFFF" />

          {/* West Gold Node */}
          <circle cx="95" cy="425" r="3.2" fill="#F2C77C" filter="url(#orbitGlowGold)" />
          <circle cx="95" cy="425" r="1.4" fill="#FFFFFF" />
        </g>

        {/* Outer Circular Celestial Boundary */}
        <circle
          cx="390"
          cy="390"
          r="290"
          fill="none"
          stroke="rgba(245, 240, 232, 0.05)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* Ambient Celestial Photon Specks */}
        <circle cx="270" cy="210" r="1.5" fill="#FFF" opacity="0.6" />
        <circle cx="510" cy="190" r="1.8" fill="#F2C77C" opacity="0.7" />
        <circle cx="210" cy="530" r="1.2" fill="#38BDF8" opacity="0.65" />
        <circle cx="580" cy="560" r="1.5" fill="#FFF" opacity="0.5" />
      </svg>
    </div>
  );
}
