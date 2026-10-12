import React from 'react';

/**
 * CinematicAtmosphere: Reusable ambient background layer that extends the Hero's
 * cinematic visual language (deep midnight gradients, electric blue energy beams,
 * thin architectural geometry, glowing intersection nodes, and golden/sapphire spark particles)
 * across the entire application.
 * 
 * Works seamlessly in both Dark Mode (cinematic midnight blue + gold) and 
 * Light Mode (soft ivory/champagne + subtle pale blue architectural accents).
 */
export default function CinematicAtmosphere({ 
  variant = "standard", 
  particlesCount = 14,
  showEnergyBeam = true,
  showGridLines = true,
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
          opacity: 0.85
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
          opacity: 0.9
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
            opacity: 0.75
          }}
        />
      )}

      {/* 3. Architectural Constellation Geometry & Intersection Nodes */}
      {showGridLines && (
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.35
          }}
        >
          {/* Subtle Vertical Architectural Guide Line */}
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

      {/* 4. Sparse Glowing Particles (Gold and Sapphire) */}
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
