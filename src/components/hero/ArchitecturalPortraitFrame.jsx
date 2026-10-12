import React from 'react';

/**
 * ArchitecturalPortraitFrame: Reconstructs the futuristic architectural portrait chassis
 * from Reference Image 2 with pixel-precise geometry, layered metallic champagne-gold borders,
 * traveling golden light animation, pulsing illuminated corners, and sapphire backlighting.
 * 
 * Palette:
 * - Bright Gold: #FFD978
 * - Metallic Gold: #D6A548
 * - Champagne Gold: #F2C879
 * - Deep Gold: #98631F
 * - Highlight Gold: #FFF1BC
 */
export default function ArchitecturalPortraitFrame({
  imageSrc = "/hero/image2.jpeg",
  altText = "Uthayagunasingam Vanojan — Solutions Architect",
  imagePosition = "center 38%",
  imageScale = 1.05,
  sideText = "FULL-STACK ENGINEER",
  children
}) {
  // SVG Path definition for the chamfered architectural chassis contour
  const chassisPath = "M 40,8 L 270,8 L 280,20 L 345,20 L 355,8 L 420,8 L 452,40 L 452,340 L 458,346 L 458,374 L 452,380 L 452,580 L 420,612 L 40,612 L 8,580 L 8,40 Z";

  return (
    <div
      className="architectural-portrait-frame-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '465px',
        margin: '0 auto',
        aspectRatio: '460 / 630',
        zIndex: 5,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease'
      }}
    >
      {/* 1. Ambient Sapphire & Gold Backlight Aura */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          background: 'radial-gradient(circle at 45% 35%, rgba(242, 200, 121, 0.28) 0%, rgba(2, 132, 199, 0.26) 45%, rgba(11, 25, 44, 0.55) 70%, transparent 85%)',
          filter: 'blur(45px)',
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '24px'
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
          overflow: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)'
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
            filter: 'contrast(1.05) saturate(1.04)',
            transition: 'opacity 0.4s ease, transform 0.5s ease'
          }}
          loading="eager"
        />

        {/* Ambient Dark Navy Gradient Vignette at Bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 13, 24, 0.95) 0%, rgba(7, 13, 24, 0.35) 28%, rgba(7, 13, 24, 0.05) 55%, transparent 75%)',
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
            background: 'radial-gradient(circle at 15% 25%, rgba(255, 217, 120, 0.16) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        {/* Diagonal Moving Light Reflection Sheen */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(115deg, transparent 40%, rgba(255, 241, 188, 0.12) 48%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 241, 188, 0.12) 52%, transparent 60%)',
            pointerEvents: 'none',
            animation: 'shimmerLightSweep 9s ease-in-out infinite'
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
          {/* Metallic Gold Gradient */}
          <linearGradient id="chassisGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1BC" />
            <stop offset="25%" stopColor="#FFD978" />
            <stop offset="50%" stopColor="#F2C879" />
            <stop offset="75%" stopColor="#D6A548" />
            <stop offset="100%" stopColor="#98631F" />
          </linearGradient>

          {/* Traveling Light Pulse Gradient */}
          <linearGradient id="travelLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF1BC" />
            <stop offset="100%" stopColor="#FFD978" />
          </linearGradient>

          {/* High-Intensity Gold Bloom Filter */}
          <filter id="chassisGoldBloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" result="blur1" />
            <feGaussianBlur stdDeviation="1.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Node Bloom Filter */}
          <filter id="chassisNodeBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* LAYER A: BASE OUTER ARCHITECTURAL CONTOUR LINE */}
        <path
          d={chassisPath}
          fill="none"
          stroke="url(#chassisGoldGrad)"
          strokeWidth="1.8"
          filter="url(#chassisGoldBloom)"
          opacity="0.95"
        />

        {/* LAYER A2: SLOW GOLDEN LIGHT TRAVELING ALONG THE FRAME */}
        <path
          d={chassisPath}
          fill="none"
          stroke="url(#travelLightGrad)"
          strokeWidth="2.8"
          strokeDasharray="140 650"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
          style={{
            animation: 'travelGoldLight 7.5s linear infinite'
          }}
        />

        {/* LAYER B: SECONDARY INSET TECHNICAL DASHED CONTOUR */}
        <path
          d="M 46,14 L 268,14 L 278,26 L 347,26 L 357,14 L 414,14 L 446,46 L 446,574 L 414,606 L 46,606 L 14,574 L 14,46 Z"
          fill="none"
          stroke="rgba(242, 200, 121, 0.45)"
          strokeWidth="0.9"
          strokeDasharray="14 4 4 4"
        />

        {/* Tertiary Fine Hairline for Technical Depth */}
        <path
          d="M 52,20 L 265,20 M 360,20 L 410,20 M 440,52 L 440,568 M 410,600 L 52,600 M 20,568 L 20,52"
          fill="none"
          stroke="rgba(255, 217, 120, 0.24)"
          strokeWidth="0.6"
        />

        {/* LAYER C: HEAVY ILLUMINATED CORNER BRACKETS & PULSING NODES */}
        
        {/* --- 1. TOP-LEFT CORNER --- */}
        <path
          d="M 8,78 L 8,40 L 40,8 L 84,8"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.8"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        <path
          d="M 16,68 L 16,44 L 44,16 L 72,16"
          fill="none"
          stroke="#F2C879"
          strokeWidth="1.8"
        />
        <circle cx="40" cy="8" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="8" cy="40" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="84" cy="8" r="2.4" fill="#FFD978" />
        <circle cx="8" cy="78" r="2.4" fill="#FFD978" />

        {/* --- 2. TOP-RIGHT CORNER --- */}
        <path
          d="M 382,8 L 420,8 L 452,40 L 452,78"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.8"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        <path
          d="M 392,16 L 416,16 L 444,44 L 444,68"
          fill="none"
          stroke="#F2C879"
          strokeWidth="1.8"
        />
        <circle cx="420" cy="8" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="452" cy="40" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="382" cy="8" r="2.4" fill="#FFD978" />

        {/* --- 3. BOTTOM-LEFT CORNER --- */}
        <path
          d="M 8,542 L 8,580 L 40,612 L 78,612"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.8"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        <path
          d="M 16,552 L 16,576 L 44,604 L 68,604"
          fill="none"
          stroke="#F2C879"
          strokeWidth="1.8"
        />
        <circle cx="8" cy="580" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="40" cy="612" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />

        {/* --- 4. BOTTOM-RIGHT CORNER WITH CIRCUIT TRACK --- */}
        <path
          d="M 452,542 L 452,580 L 420,612 L 382,612"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.8"
          strokeLinecap="round"
          filter="url(#chassisGoldBloom)"
        />
        <path
          d="M 444,552 L 444,576 L 416,604 L 392,604"
          fill="none"
          stroke="#F2C879"
          strokeWidth="1.8"
        />
        {/* Circuit Track extending from Bottom-Right */}
        <path
          d="M 420,612 L 420,625 L 438,625"
          fill="none"
          stroke="#F2C879"
          strokeWidth="1.5"
        />
        <circle cx="438" cy="625" r="2.6" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />
        <circle cx="452" cy="580" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="420" cy="612" r="3.4" fill="#FFFFFF" filter="url(#chassisNodeBloom)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />

        {/* LAYER D: TOP ARCHITECTURAL STEPPED NOTCH */}
        <path
          d="M 276,20 L 284,20 L 341,20 L 349,20"
          fill="none"
          stroke="#FFD978"
          strokeWidth="2.4"
        />
        <circle cx="312" cy="20" r="2.4" fill="#FFF1BC" filter="url(#chassisNodeBloom)" />
        <line x1="160" y1="2" x2="160" y2="14" stroke="#FFD978" strokeWidth="1.6" />
        <line x1="170" y1="4" x2="170" y2="12" stroke="rgba(242, 200, 121, 0.7)" strokeWidth="1.2" />
        <line x1="180" y1="4" x2="180" y2="12" stroke="rgba(242, 200, 121, 0.7)" strokeWidth="1.2" />

        {/* LAYER E: RIGHT SIDE MECHANICAL LATCH BRACKET */}
        <path
          d="M 452,340 L 460,346 L 460,374 L 452,380"
          fill="none"
          stroke="#FFD978"
          strokeWidth="2.2"
          filter="url(#chassisGoldBloom)"
        />
        <circle cx="460" cy="360" r="2.8" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />

        {/* Left Side Precision Crosshair & Node */}
        <line x1="1" y1="310" x2="15" y2="310" stroke="#FFD978" strokeWidth="2" />
        <circle cx="8" cy="310" r="2.6" fill="#FFFFFF" filter="url(#chassisNodeBloom)" />

        {/* Sapphire Highlight Nodes */}
        <circle cx="8" cy="140" r="2.4" fill="#38BDF8" opacity="0.9" />
        <circle cx="452" cy="220" r="2.4" fill="#38BDF8" opacity="0.9" />
        <line x1="447" y1="220" x2="457" y2="220" stroke="#38BDF8" strokeWidth="1.4" opacity="0.9" />
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
            fontSize: '0.64rem',
            letterSpacing: '0.28em',
            color: 'var(--gold-bright, #FFD978)',
            textShadow: '0 0 12px rgba(255, 217, 120, 0.8), 0 0 24px rgba(214, 165, 72, 0.5)',
            opacity: 0.95,
            zIndex: 15,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            fontWeight: 600
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
