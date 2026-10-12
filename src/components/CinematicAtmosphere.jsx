import React from 'react';

/**
 * CinematicAtmosphere: Reusable ambient optical background layer that extends the Hero's
 * exact optical visual language:
 * 1. Deep midnight blue/sapphire nebula & champagne-gold atmospheric radial gradients
 * 2. Diagonal electric blue energy beams (mirroring hero-blue-beam)
 * 3. Optical tilted orbital energy tracks with cyan & gold gradients, dashed concentric lines,
 *    and glowing photon nodes (directly inspired by OrbitalEnergyBackground)
 * 4. Thin architectural constellation geometry & glowing intersection nodes
 * 5. Floating celestial amber and sapphire spark particles (mirroring ThreeCanvas)
 * 
 * Works seamlessly in both Dark Mode (midnight blue + gold + electric blue) and 
 * Light Mode (soft ivory/champagne + pale blue optical architectural lines).
 */
export default function CinematicAtmosphere({ 
  variant = "standard", 
  particlesCount = 14,
  showEnergyBeam = true,
  showGridLines = true,
  showOrbitalTracks = true,
  opticalIntensity = 1,
  style = {} 
}) {
  // Pre-calculated deterministic particle positions
  const particles = [
    { top: '12%', left: '8%', size: 4, isBlue: true, delay: '0s' },
    { top: '24%', left: '88%', size: 3, isBlue: false, delay: '1.2s' },
    { top: '38%', left: '4%', size: 3, isBlue: false, delay: '2.4s' },
    { top: '48%', left: '92%', size: 5, isBlue: true, delay: '0.6s' },
    { top: '62%', left: '14%', size: 3, isBlue: false, delay: '1.8s' },
    { top: '72%', left: '82%', size: 4, isBlue: false, delay: '3.1s' },
    { top: '86%', left: '6%', size: 4, isBlue: true, delay: '0.9s' },
    { top: '92%', left: '74%', size: 3, isBlue: false, delay: '2.1s' },
    { top: '18%', left: '42%', size: 3, isBlue: false, delay: '1.5s' },
    { top: '65%', left: '50%', size: 4, isBlue: true, delay: '2.7s' },
    { top: '82%', left: '32%', size: 3, isBlue: false, delay: '0.3s' },
    { top: '30%', left: '70%', size: 4, isBlue: false, delay: '1.9s' },
    { top: '55%', left: '25%', size: 3, isBlue: true, delay: '3.3s' },
    { top: '78%', left: '94%', size: 4, isBlue: false, delay: '0.7s' },
  ].slice(0, particlesCount);

  // Optical track position based on section variant
  const getOrbitPosition = () => {
    switch (variant) {
      case 'about':
        return { top: '35%', right: '-8%', left: 'auto', transform: 'translateY(-50%) scale(0.95)' };
      case 'projects':
        return { top: '50%', right: '-10%', left: 'auto', transform: 'translateY(-50%) scale(1.05)' };
      case 'skills':
        return { top: '45%', left: '-8%', right: 'auto', transform: 'translateY(-50%) scale(1.0)' };
      case 'experience':
        return { top: '30%', right: '-5%', left: 'auto', transform: 'translateY(-50%) scale(0.9)' };
      case 'contact':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.1)' };
      case 'footer':
        return { top: '40%', right: '15%', left: 'auto', transform: 'translateY(-50%) scale(0.7)' };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.0)' };
    }
  };

  const orbitPos = getOrbitPosition();

  return (
    <div 
      className="cinematic-atmosphere-layer"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        ...style
      }}
      aria-hidden="true"
    >
      {/* 1. Deep Atmospheric Radial Gradients (Sapphire & Amber/Gold) */}
      <div 
        className="atmosphere-nebula-sapphire"
        style={{
          position: 'absolute',
          top: variant === 'contact' ? '40%' : '15%',
          right: variant === 'about' ? '5%' : '0%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 70, 106, 0.22) 0%, rgba(2, 132, 199, 0.10) 40%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          opacity: 0.85 * opticalIntensity
        }}
      />
      <div 
        className="atmosphere-nebula-gold"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: variant === 'about' ? '0%' : '8%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle at 50% 50%, rgba(214, 165, 72, 0.14) 0%, rgba(156, 100, 34, 0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
          borderRadius: '50%',
          opacity: 0.9 * opticalIntensity
        }}
      />

      {/* 2. Diagonal Electric Blue Energy Beams */}
      {showEnergyBeam && (
        <div 
          className="atmosphere-energy-beam"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(42deg, transparent 20%, rgba(11, 55, 92, 0.18) 22%, rgba(56, 189, 248, 0.08) 23%, transparent 26%), linear-gradient(138deg, transparent 62%, rgba(11, 65, 106, 0.16) 64%, transparent 68%)',
            opacity: 0.75 * opticalIntensity
          }}
        />
      )}

      {/* 3. Optical Orbital Energy Tracks (Directly from Hero's OrbitalEnergyBackground) */}
      {showOrbitalTracks && variant !== 'footer' && (
        <div
          className="atmosphere-orbital-tracks"
          style={{
            position: 'absolute',
            width: '680px',
            height: '680px',
            opacity: 0.42 * opticalIntensity,
            ...orbitPos
          }}
        >
          <svg
            viewBox="0 0 780 780"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible'
            }}
          >
            <defs>
              <linearGradient id={`atmGoldGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF5DE" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#F2C77C" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#D9A968" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#9B6A35" stopOpacity="0.65" />
              </linearGradient>

              <linearGradient id={`atmSapphireGrad-${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#0284C7" stopOpacity="0.35" />
                <stop offset="75%" stopColor="#0369A1" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.65" />
              </linearGradient>

              <filter id={`atmGlowGold-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id={`atmGlowCyan-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
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
                stroke={`url(#atmSapphireGrad-${variant})`}
                strokeWidth="1.2"
                filter={`url(#atmGlowCyan-${variant})`}
              />
              <ellipse
                cx="390"
                cy="390"
                rx="352"
                ry="152"
                fill="none"
                stroke="rgba(56, 189, 248, 0.18)"
                strokeWidth="0.8"
                strokeDasharray="4 8"
              />
              {/* Photon beads */}
              <circle cx="710" cy="365" r="4" fill="#38BDF8" filter={`url(#atmGlowCyan-${variant})`} />
              <circle cx="710" cy="365" r="1.5" fill="#FFFFFF" />
              <circle cx="85" cy="420" r="3" fill="#38BDF8" filter={`url(#atmGlowCyan-${variant})`} />
            </g>

            {/* Primary Champagne Gold Orbital Ring (Tilted -26 deg) */}
            <g transform="rotate(-26 390 390)">
              <ellipse
                cx="390"
                cy="390"
                rx="325"
                ry="140"
                fill="none"
                stroke={`url(#atmGoldGrad-${variant})`}
                strokeWidth="1.2"
                filter={`url(#atmGlowGold-${variant})`}
              />
              <ellipse
                cx="390"
                cy="390"
                rx="305"
                ry="130"
                fill="none"
                stroke="rgba(217, 169, 104, 0.2)"
                strokeWidth="0.8"
                strokeDasharray="6 4 2 4"
              />
              {/* Photon beads */}
              <circle cx="690" cy="355" r="4" fill="#FFF5DE" filter={`url(#atmGlowGold-${variant})`} />
              <circle cx="690" cy="355" r="1.5" fill="#FFFFFF" />
              <circle cx="95" cy="425" r="3" fill="#F2C77C" filter={`url(#atmGlowGold-${variant})`} />
            </g>
          </svg>
        </div>
      )}

      {/* 4. Architectural Constellation Geometry & Intersection Nodes */}
      {showGridLines && (
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.35 * opticalIntensity
          }}
        >
          {/* Subtle Vertical Architectural Guide Lines */}
          <line 
            x1="120" y1="0" x2="120" y2="800" 
            stroke="rgba(198, 217, 235, 0.25)" 
            strokeWidth="0.8" 
            strokeDasharray="4 8" 
          />
          <line 
            x1="1320" y1="0" x2="1320" y2="800" 
            stroke="rgba(214, 165, 72, 0.2)" 
            strokeWidth="0.8" 
            strokeDasharray="4 8" 
          />

          {/* Diagonal Energy Rays */}
          <line 
            x1="0" y1="180" x2="1440" y2="680" 
            stroke="rgba(56, 189, 248, 0.14)" 
            strokeWidth="0.75" 
            strokeDasharray="6 10" 
          />
          <line 
            x1="1440" y1="120" x2="0" y2="620" 
            stroke="rgba(214, 165, 72, 0.12)" 
            strokeWidth="0.75" 
            strokeDasharray="8 12" 
          />

          {/* Glowing Intersection Nodes */}
          <circle cx="120" cy="222" r="2.5" fill="#38BDF8" />
          <circle cx="120" cy="222" r="6" fill="rgba(56, 189, 248, 0.3)" />
          
          <circle cx="1320" cy="580" r="2.5" fill="#FFD978" />
          <circle cx="1320" cy="580" r="6" fill="rgba(255, 217, 120, 0.3)" />

          <circle cx="720" cy="430" r="2" fill="#38BDF8" opacity="0.8" />
          <circle cx="980" cy="520" r="2.5" fill="#FFD978" opacity="0.8" />
        </svg>
      )}

      {/* 5. Sparse Glowing Particles (Gold and Sapphire - Mirroring ThreeCanvas) */}
      {particles.map((p, idx) => (
        <span
          key={idx}
          className={p.isBlue ? 'atmosphere-spark atmosphere-spark-blue' : 'atmosphere-spark atmosphere-spark-gold'}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
}
