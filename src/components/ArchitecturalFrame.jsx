import React from 'react';

/**
 * ArchitecturalFrame: Reconstructs the multi-layered sci-fi cyber-luxury chamfered photo frame
 * with glowing illuminated gold neon edges, corner brackets, and tech coordinates from the reference.
 */
export default function ArchitecturalFrame({ 
  imageSrc, 
  altText, 
  children, 
  aspectRatio = "420 / 530",
  imagePosition = "center 18%",
  imageScale = 1.08,
  sideText = "FULL-STACK ENGINEER • SOLUTIONS ARCHITECT"
}) {
  return (
    <div 
      className="architectural-frame-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        aspectRatio: aspectRatio,
        filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(217, 169, 104, 0.28))'
      }}
    >
      {/* Ambient Sapphire & Gold Backlight Aura */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          background: 'radial-gradient(circle at 35% 30%, rgba(217, 169, 104, 0.28) 0%, rgba(20, 40, 59, 0.35) 50%, transparent 75%)',
          filter: 'blur(35px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Clipped Inner Container Housing Photograph */}
      <div
        style={{
          position: 'absolute',
          inset: '8px',
          clipPath: 'polygon(32px 0%, calc(100% - 32px) 0%, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0% calc(100% - 32px), 0% 32px)',
          background: '#0B1018',
          overflow: 'hidden',
          zIndex: 1
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
            filter: 'contrast(1.04) saturate(1.04)'
          }}
          loading="eager"
        />

        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 16, 24, 0.92) 0%, rgba(11, 16, 24, 0.25) 35%, transparent 65%)',
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
            background: 'radial-gradient(circle at 10% 20%, rgba(245, 208, 157, 0.2) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* SVG Multi-Layered Illuminated Architectural HUD Frame Overlay */}
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
          {/* Champagne Gold Neon Linear Gradient */}
          <linearGradient id="goldChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBE3BD" />
            <stop offset="35%" stopColor="#D9A968" />
            <stop offset="70%" stopColor="#E5A84B" />
            <stop offset="100%" stopColor="#9E7438" />
          </linearGradient>

          {/* Neon Bloom Filter */}
          <filter id="neonGoldBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intenseBloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Fine Neon Contour Line */}
        <path
          d="M 38,8 L 382,8 L 412,38 L 412,492 L 382,522 L 38,522 L 8,492 L 8,38 Z"
          fill="none"
          stroke="url(#goldChassisGrad)"
          strokeWidth="1.5"
          filter="url(#neonGoldBloom)"
          opacity="0.85"
        />

        {/* Inner Secondary Technical Line */}
        <path
          d="M 44,14 L 376,14 L 406,44 L 406,486 L 376,516 L 44,516 L 14,486 L 14,44 Z"
          fill="none"
          stroke="rgba(217, 169, 104, 0.35)"
          strokeWidth="1"
          strokeDasharray="12 4 4 4"
        />

        {/* HEAVY ILLUMINATED CORNER BRACKETS WITH HIGH-INTENSITY BLOOM */}
        {/* Top-Left Corner Bracket */}
        <path
          d="M 8,68 L 8,38 L 38,8 L 68,8"
          fill="none"
          stroke="#FBE3BD"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#intenseBloom)"
        />
        {/* Top-Left Accent Dot */}
        <circle cx="38" cy="8" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />
        <circle cx="8" cy="38" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />

        {/* Top-Right Corner Bracket */}
        <path
          d="M 352,8 L 382,8 L 412,38 L 412,68"
          fill="none"
          stroke="#FBE3BD"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#intenseBloom)"
        />
        {/* Top-Right Accent Dot */}
        <circle cx="382" cy="8" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />
        <circle cx="412" cy="38" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />

        {/* Bottom-Left Corner Bracket */}
        <path
          d="M 8,462 L 8,492 L 38,522 L 68,522"
          fill="none"
          stroke="#FBE3BD"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#intenseBloom)"
        />
        {/* Bottom-Left Accent Dot */}
        <circle cx="8" cy="492" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />
        <circle cx="38" cy="522" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />

        {/* Bottom-Right Corner Bracket */}
        <path
          d="M 352,522 L 382,522 L 412,492 L 412,462"
          fill="none"
          stroke="#FBE3BD"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#intenseBloom)"
        />
        {/* Bottom-Right Accent Dot */}
        <circle cx="382" cy="522" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />
        <circle cx="412" cy="492" r="3" fill="#FFF" filter="url(#neonGoldBloom)" />

        {/* Top Center Stepped Notch Accents */}
        <path
          d="M 180,8 L 190,14 L 230,14 L 240,8"
          fill="none"
          stroke="url(#goldChassisGrad)"
          strokeWidth="2"
        />
        <circle cx="210" cy="14" r="2.5" fill="#FBE3BD" />

        {/* Bottom Center Notch Accents */}
        <path
          d="M 180,522 L 190,516 L 230,516 L 240,522"
          fill="none"
          stroke="url(#goldChassisGrad)"
          strokeWidth="2"
        />

        {/* Side Midpoint Crosshair Ticks */}
        <line x1="2" y1="265" x2="14" y2="265" stroke="#FBE3BD" strokeWidth="2" />
        <line x1="406" y1="265" x2="418" y2="265" stroke="#FBE3BD" strokeWidth="2" />
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
            color: 'var(--gold-light)',
            textShadow: '0 0 10px rgba(217, 169, 104, 0.6)',
            opacity: 0.85,
            zIndex: 15,
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
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
