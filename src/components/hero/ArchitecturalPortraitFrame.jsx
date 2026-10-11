import React from 'react';

/**
 * ArchitecturalPortraitFrame: Reconstructs the multi-layer angular architectural chassis
 * from the reference image with pixel-precise geometry.
 * 
 * Features:
 * - Chamfered upper & lower corners
 * - Architectural stepped downward notch on the top edge
 * - Mechanical latch bracket on the right edge
 * - Multi-layer concentric thin gold outlines
 * - Broken-line architectural border segments & precision ticks
 * - Technical circuit paths with illuminated glowing connector nodes
 * - Illuminated gold corner segments (#F2C77C, #D9A968, #9B6A35) with intense bloom
 * - Subtle sapphire edge highlights
 * - Vertical technical text "FULL-STACK ENGINEER" along right edge
 */
export default function ArchitecturalPortraitFrame({
  imageSrc = "/hero/image2.jpeg",
  altText = "Uthayagunasingam Vanojan — Solutions Architect",
  imagePosition = "center 12%",
  imageScale = 1.14,
  sideText = "FULL-STACK ENGINEER",
  children
}) {
  return (
    <div
      className="architectural-portrait-frame-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        aspectRatio: '460 / 620',
        zIndex: 5
      }}
    >
      {/* 1. Cinematic Ambient Backlight Aura (Sapphire & Champagne Gold) */}
      <div
        style={{
          position: 'absolute',
          inset: '-7%',
          background: 'radial-gradient(circle at 45% 35%, rgba(217, 169, 104, 0.32) 0%, rgba(2, 132, 199, 0.24) 45%, rgba(20, 40, 59, 0.45) 65%, transparent 80%)',
          filter: 'blur(38px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* 2. Clipped Inner Photo Chassis Housing the Photograph */}
      <div
        style={{
          position: 'absolute',
          inset: '8px',
          clipPath: 'polygon(36px 0%, calc(100% - 36px) 0%, 100% 36px, 100% calc(100% - 36px), calc(100% - 36px) 100%, 36px 100%, 0% calc(100% - 36px), 0% 36px)',
          background: '#070D18',
          zIndex: 2,
          overflow: 'hidden'
        }}
      >
        {/* Authentic Photograph */}
        <img
          src={imageSrc}
          alt={altText}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: imagePosition,
            transform: `scale(${imageScale})`,
            display: 'block',
            filter: 'contrast(1.04) saturate(1.04)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}
          loading="eager"
        />

        {/* Ambient Dark Navy Gradient Vignette at Bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 13, 24, 0.94) 0%, rgba(7, 13, 24, 0.35) 28%, rgba(7, 13, 24, 0.04) 55%, transparent 75%)',
            pointerEvents: 'none'
          }}
        />

        {/* Warm Golden Room Light Overlay Accent on Left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '55%',
            height: '65%',
            background: 'radial-gradient(circle at 15% 25%, rgba(242, 199, 124, 0.18) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 3. Multi-Layer SVG Architectural HUD Chassis Overlay */}
      <svg
        viewBox="0 0 460 620"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'visible'
        }}
      >
        <defs>
          {/* Champagne Gold Gradient */}
          <linearGradient id="chassisGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5DE" />
            <stop offset="30%" stopColor="#F2C77C" />
            <stop offset="70%" stopColor="#D9A968" />
            <stop offset="100%" stopColor="#9B6A35" />
          </linearGradient>

          {/* High-Intensity Gold Bloom Filter */}
          <filter id="chassisGoldBloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Fine Node Bloom Filter */}
          <filter id="chassisNodeBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========================================================
            LAYER A: OUTER ARCHITECTURAL CONTOUR LINE
           ======================================================== */}
        <path
          d="M 40,8 L 270,8 L 280,20 L 345,20 L 355,8 L 420,8 L 452,40 L 452,340 L 456,345 L 456,375 L 452,380 L 452,580 L 420,612 L 40,612 L 8,580 L 8,40 Z"
          fill="none"
          stroke="url(#chassisGoldGrad)"
          strokeWidth="1.6"
          filter="url(#chassisGoldBloom)"
          opacity="0.9"
        />

        {/* ========================================================
            LAYER B: SECONDARY INSET TECHNICAL DASHED CONTOUR
           ======================================================== */}
        <path
          d="M 46,14 L 268,14 L 278,26 L 347,26 L 357,14 L 414,14 L 446,46 L 446,574 L 414,606 L 46,606 L 14,574 L 14,46 Z"
          fill="none"
          stroke="rgba(217, 169, 104, 0.42)"
          strokeWidth="0.9"
          strokeDasharray="14 4 4 4"
        />

        {/* Tertiary Fine Hairline for Depth */}
        <path
          d="M 52,20 L 265,20 M 360,20 L 410,20 M 440,52 L 440,568 M 410,600 L 52,600 M 20,568 L 20,52"
          fill="none"
          stroke="rgba(242, 199, 124, 0.2)"
          strokeWidth="0.6"
        />

        {/* ========================================================
            LAYER C: HEAVY ILLUMINATED CORNER BRACKETS (GOLD & BLOOM)
           ======================================================== */}

        {/* --- 1. TOP-LEFT CORNER BRACKET --- */}
        <path
          d="M 8,75 L 8,40 L 40,8 L 80,8"
          fill="none"
          stroke="#FFF5DE"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        {/* Top-Left Stepped Inner Accent Bracket */}
        <path
          d="M 16,65 L 16,44 L 44,16 L 70,16"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="1.6"
        />
        {/* Top-Left Glowing Gold Connector Nodes */}
        <circle cx="40" cy="8" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="8" cy="40" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="80" cy="8" r="2.2" fill="#F2C77C" />
        <circle cx="8" cy="75" r="2.2" fill="#F2C77C" />

        {/* --- 2. TOP-RIGHT CORNER BRACKET --- */}
        <path
          d="M 385,8 L 420,8 L 452,40 L 452,75"
          fill="none"
          stroke="#FFF5DE"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        {/* Top-Right Stepped Inner Accent Bracket */}
        <path
          d="M 395,16 L 416,16 L 444,44 L 444,65"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="1.6"
        />
        {/* Top-Right Glowing Connector Nodes */}
        <circle cx="420" cy="8" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="452" cy="40" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="385" cy="8" r="2.2" fill="#F2C77C" />

        {/* --- 3. BOTTOM-LEFT CORNER BRACKET --- */}
        <path
          d="M 8,545 L 8,580 L 40,612 L 75,612"
          fill="none"
          stroke="#FFF5DE"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        {/* Bottom-Left Stepped Inner Accent Bracket */}
        <path
          d="M 16,555 L 16,576 L 44,604 L 65,604"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="1.6"
        />
        {/* Bottom-Left Glowing Connector Nodes */}
        <circle cx="8" cy="580" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="40" cy="612" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />

        {/* --- 4. BOTTOM-RIGHT CORNER BRACKET WITH CIRCUIT TRACK --- */}
        <path
          d="M 452,545 L 452,580 L 420,612 L 385,612"
          fill="none"
          stroke="#FFF5DE"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        {/* Bottom-Right Stepped Inner Accent Bracket */}
        <path
          d="M 444,555 L 444,576 L 416,604 L 395,604"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="1.6"
        />
        {/* Circuit Track extending from Bottom-Right */}
        <path
          d="M 420,612 L 420,624 L 436,624"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="1.4"
        />
        <circle cx="436" cy="624" r="2.5" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="452" cy="580" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="420" cy="612" r="3.2" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />

        {/* ========================================================
            LAYER D: TOP ARCHITECTURAL STEPPED NOTCH DETAILS
           ======================================================== */}
        <path
          d="M 276,20 L 284,20 L 341,20 L 349,20"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="2.2"
        />
        <circle cx="312" cy="20" r="2.2" fill="#FFF5DE" filter="url(#chassisNodeBloom)" />

        {/* Top Ticks */}
        <line x1="160" y1="3" x2="160" y2="13" stroke="#F2C77C" strokeWidth="1.4" />
        <line x1="170" y1="5" x2="170" y2="11" stroke="rgba(217, 169, 104, 0.6)" strokeWidth="1" />
        <line x1="180" y1="5" x2="180" y2="11" stroke="rgba(217, 169, 104, 0.6)" strokeWidth="1" />

        {/* ========================================================
            LAYER E: RIGHT SIDE MECHANICAL LATCH BRACKET
           ======================================================== */}
        <path
          d="M 452,340 L 460,346 L 460,374 L 452,380"
          fill="none"
          stroke="#F2C77C"
          strokeWidth="2"
          filter="url(#chassisGoldBloom)"
        />
        <circle cx="460" cy="360" r="2.5" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />

        {/* Left Side Precision Crosshair & Node */}
        <line x1="2" y1="310" x2="14" y2="310" stroke="#F2C77C" strokeWidth="1.8" />
        <circle cx="8" cy="310" r="2.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />

        {/* Delicate Sapphire Highlight Points */}
        <circle cx="8" cy="140" r="2.2" fill="#38BDF8" opacity="0.8" />
        <circle cx="452" cy="220" r="2.2" fill="#38BDF8" opacity="0.8" />
        <line x1="448" y1="220" x2="456" y2="220" stroke="#38BDF8" strokeWidth="1.2" opacity="0.85" />
      </svg>

      {/* 4. Vertical Technical Coordinate Text along Right Inner Edge */}
      {sideText && (
        <div
          style={{
            position: 'absolute',
            right: '18px',
            top: '38%',
            transform: 'translateY(-50%) rotate(90deg)',
            transformOrigin: 'center right',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            color: 'var(--gold-light)',
            textShadow: '0 0 10px rgba(217, 169, 104, 0.7)',
            opacity: 0.9,
            zIndex: 15,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          {sideText}
        </div>
      )}

      {/* 5. Children Elements (Overlays like bottom identity panel) */}
      {children}
    </div>
  );
}
