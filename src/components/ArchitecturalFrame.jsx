import React from 'react';

/**
 * ArchitecturalFrame: Reconstructs the multi-layered futuristic chamfered photo frame
 * with glowing illuminated gold edges, traveling golden light, pulsing nodes,
 * and tech coordinates matching Reference Image 1 & 2.
 */
export default function ArchitecturalFrame({ 
  imageSrc = "/hero/image1.jpeg", 
  altText = "Uthayagunasingam Vanojan — Solutions Architect", 
  children, 
  aspectRatio = "420 / 530",
  imagePosition = "center 18%",
  imageScale = 1.08,
  sideText = "FULL-STACK ENGINEER • SOLUTIONS ARCHITECT"
}) {
  const chassisPath = "M 38,8 L 382,8 L 412,38 L 412,492 L 382,522 L 38,522 L 8,492 L 8,38 Z";

  return (
    <div 
      className="architectural-frame-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        aspectRatio: aspectRatio,
        filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 28px rgba(214, 165, 72, 0.35))',
        transition: 'transform 0.4s var(--ease-cinematic), filter 0.4s ease'
      }}
    >
      {/* 1. Ambient Sapphire & Gold Backlight Aura */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          background: 'radial-gradient(circle at 35% 30%, rgba(255, 217, 120, 0.28) 0%, rgba(2, 132, 199, 0.24) 45%, rgba(14, 25, 44, 0.55) 70%, transparent 85%)',
          filter: 'blur(38px)',
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '24px'
        }}
      />

      {/* 2. Clipped Inner Container Housing Photograph */}
      <div
        style={{
          position: 'absolute',
          inset: '8px',
          clipPath: 'polygon(32px 0%, calc(100% - 32px) 0%, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0% calc(100% - 32px), 0% 32px)',
          background: '#070D18',
          overflow: 'hidden',
          zIndex: 1,
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.85)'
        }}
      >
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

        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 13, 24, 0.94) 0%, rgba(7, 13, 24, 0.3) 35%, transparent 65%)',
            pointerEvents: 'none'
          }}
        />

        {/* Ambient Warm Golden Rim Light overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60%',
            height: '70%',
            background: 'radial-gradient(circle at 10% 20%, rgba(255, 217, 120, 0.18) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        {/* Moving Light Reflection Sheen */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(115deg, transparent 40%, rgba(255, 241, 188, 0.12) 48%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 241, 188, 0.12) 52%, transparent 60%)',
            pointerEvents: 'none',
            animation: 'shimmerLightSweep 8.5s ease-in-out infinite'
          }}
        />
      </div>

      {/* 3. SVG Multi-Layered Illuminated Architectural HUD Frame Overlay */}
      <svg
        viewBox="0 0 420 530"
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
          <linearGradient id="chassisGradAbout" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1BC" />
            <stop offset="25%" stopColor="#FFD978" />
            <stop offset="50%" stopColor="#F2C879" />
            <stop offset="75%" stopColor="#D6A548" />
            <stop offset="100%" stopColor="#98631F" />
          </linearGradient>

          <linearGradient id="travelLightGradAbout" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF1BC" />
            <stop offset="100%" stopColor="#FFD978" />
          </linearGradient>

          <filter id="neonGoldBloomAbout" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intenseBloomAbout" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="5.5" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Contour Line */}
        <path
          d={chassisPath}
          fill="none"
          stroke="url(#chassisGradAbout)"
          strokeWidth="1.8"
          filter="url(#neonGoldBloomAbout)"
          opacity="0.95"
        />

        {/* Slow Golden Light Traveling Along Contour */}
        <path
          d={chassisPath}
          fill="none"
          stroke="url(#travelLightGradAbout)"
          strokeWidth="2.8"
          strokeDasharray="120 600"
          strokeLinecap="round"
          filter="url(#neonGoldBloomAbout)"
          style={{ animation: 'travelGoldLight 7s linear infinite' }}
        />

        {/* Inner Secondary Technical Line */}
        <path
          d="M 44,14 L 376,14 L 406,44 L 406,486 L 376,516 L 44,516 L 14,486 L 14,44 Z"
          fill="none"
          stroke="rgba(242, 200, 121, 0.42)"
          strokeWidth="1"
          strokeDasharray="12 4 4 4"
        />

        {/* ILLUMINATED CORNER BRACKETS */}
        {/* Top-Left */}
        <path
          d="M 8,68 L 8,38 L 38,8 L 68,8"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#intenseBloomAbout)"
        />
        <circle cx="38" cy="8" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="8" cy="38" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />

        {/* Top-Right */}
        <path
          d="M 352,8 L 382,8 L 412,38 L 412,68"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#intenseBloomAbout)"
        />
        <circle cx="382" cy="8" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="412" cy="38" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />

        {/* Bottom-Left */}
        <path
          d="M 8,462 L 8,492 L 38,522 L 68,522"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#intenseBloomAbout)"
        />
        <circle cx="8" cy="492" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="38" cy="522" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />

        {/* Bottom-Right */}
        <path
          d="M 352,522 L 382,522 L 412,492 L 412,462"
          fill="none"
          stroke="#FFF1BC"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#intenseBloomAbout)"
        />
        <circle cx="382" cy="522" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />
        <circle cx="412" cy="492" r="3.2" fill="#FFF" filter="url(#neonGoldBloomAbout)" style={{ animation: 'cornerPulse 3s infinite ease-in-out' }} />

        {/* Top Center Stepped Notch Accents */}
        <path
          d="M 180,8 L 190,14 L 230,14 L 240,8"
          fill="none"
          stroke="url(#chassisGradAbout)"
          strokeWidth="2.2"
        />
        <circle cx="210" cy="14" r="2.5" fill="#FFF1BC" />

        {/* Bottom Center Notch Accents */}
        <path
          d="M 180,522 L 190,516 L 230,516 L 240,522"
          fill="none"
          stroke="url(#chassisGradAbout)"
          strokeWidth="2.2"
        />

        {/* Side Midpoint Crosshair Ticks */}
        <line x1="2" y1="265" x2="14" y2="265" stroke="#FFD978" strokeWidth="2" />
        <line x1="406" y1="265" x2="418" y2="265" stroke="#FFD978" strokeWidth="2" />
      </svg>

      {/* Vertical Coordinate Marking along right inner edge */}
      {sideText && (
        <div
          style={{
            position: 'absolute',
            right: '16px',
            top: '48%',
            transform: 'translateY(-50%) rotate(90deg)',
            transformOrigin: 'center right',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            color: 'var(--gold-bright, #FFD978)',
            textShadow: '0 0 12px rgba(255, 217, 120, 0.75)',
            opacity: 0.9,
            zIndex: 15,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontWeight: 600
          }}
        >
          {sideText}
        </div>
      )}

      {/* Children Elements (Overlays like bottom nameplate) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 25, pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
}
