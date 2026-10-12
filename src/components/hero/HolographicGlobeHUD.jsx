import React, { useEffect, useRef } from 'react';

/**
 * HolographicGlobeHUD: Recreates the futuristic floating 3D globe HUD panel
 * visible to the right of the portrait in the reference image.
 * Features:
 * - Luminous 3D holographic Earth globe with sapphire atmosphere & cyan rim glow
 * - Continents & latitude/longitude coordinate grid rotating in 3D
 * - Inclined champagne-gold orbital ring with orbiting satellite node
 * - "BUILDING SCALABLE SOLUTIONS" technical typography
 * - Small gold analytics 3-bar icon
 */
export default function HolographicGlobeHUD({ style = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let rotation = 0;

    // Generate random pseudo-continent points on sphere for holographic look
    const numPoints = 140;
    const spherePoints = [];
    for (let i = 0; i < numPoints; i++) {
      const lat = (Math.random() - 0.5) * Math.PI; // -pi/2 to pi/2
      const lon = Math.random() * Math.PI * 2; // 0 to 2pi
      spherePoints.push({ lat, lon, size: Math.random() > 0.8 ? 1.8 : 1.1 });
    }

    const radius = 43;
    const cx = canvas.width / 2;
    const cy = 54;

    const render = () => {
      rotation += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Atmosphere Radial Glow Behind Globe (Radiant Golden Aura)
      const atmoGlow = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.45);
      atmoGlow.addColorStop(0, 'rgba(255, 225, 100, 0.75)');
      atmoGlow.addColorStop(0.45, 'rgba(212, 175, 55, 0.35)');
      atmoGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = atmoGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Fill with deep obsidian metallic polished lighting
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.08,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#423010'); // warm gold specular reflection
      sphereGrad.addColorStop(0.35, '#161005'); // deep obsidian black
      sphereGrad.addColorStop(0.85, '#0A0702'); // deep dark shadow
      sphereGrad.addColorStop(1, '#FFD700'); // brilliant golden rim

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip to sphere for surface details
      ctx.clip();

      // 3. Rotating Latitude Lines (Parallels in shimmering gold)
      ctx.strokeStyle = 'rgba(255, 235, 170, 0.42)';
      ctx.lineWidth = 0.85;
      [-0.55, -0.3, 0, 0.3, 0.55].forEach((latRatio) => {
        const y = cy + Math.sin(latRatio * Math.PI) * radius;
        const rLat = Math.cos(latRatio * Math.PI) * radius;
        if (rLat > 2) {
          ctx.beginPath();
          ctx.ellipse(cx, y, rLat, rLat * 0.28, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // 4. Rotating Longitude Lines (Meridians in shimmering gold)
      for (let m = 0; m < 6; m++) {
        const angle = rotation + (m * Math.PI) / 3;
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        ctx.strokeStyle = sinAngle > 0 ? 'rgba(255, 235, 170, 0.48)' : 'rgba(255, 235, 170, 0.15)';
        ctx.lineWidth = sinAngle > 0 ? 1.0 : 0.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(cosAngle) * radius, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Rotating Surface Constellation / Landmass Dots in warm gold
      spherePoints.forEach((pt) => {
        const currLon = pt.lon + rotation;
        const x3d = Math.cos(pt.lat) * Math.sin(currLon);
        const y3d = Math.sin(pt.lat);
        const z3d = Math.cos(pt.lat) * Math.cos(currLon);

        if (z3d > -0.15) {
          const px = cx + x3d * radius;
          const py = cy + y3d * radius;
          const alpha = Math.max(0.2, (z3d + 0.15) / 1.15);

          ctx.fillStyle = `rgba(255, 245, 200, ${alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(px, py, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Brilliant Gold Rim Highlight on sphere edge
      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius);
      rimGrad.addColorStop(0, 'rgba(255, 215, 0, 0)');
      rimGrad.addColorStop(0.7, 'rgba(255, 215, 0, 0.45)');
      rimGrad.addColorStop(1, 'rgba(255, 230, 130, 0.95)');
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 7. Outer Concentric Tilted Gold Orbital Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35); // tilt angle ~20 deg

      // Gold orbital ring
      ctx.strokeStyle = 'rgba(255, 240, 180, 0.92)';
      ctx.lineWidth = 1.35;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.36, radius * 0.44, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting Satellite Node
      const satAngle = rotation * 1.4;
      const satX = Math.cos(satAngle) * (radius * 1.36);
      const satY = Math.sin(satAngle) * (radius * 0.44);

      // Node glow
      const nodeGlow = ctx.createRadialGradient(satX, satY, 0, satX, satY, 10);
      nodeGlow.addColorStop(0, '#FFFFFF');
      nodeGlow.addColorStop(0.35, 'rgba(255, 230, 140, 0.9)');
      nodeGlow.addColorStop(1, 'rgba(217, 169, 104, 0)');
      ctx.fillStyle = nodeGlow;
      ctx.beginPath();
      ctx.arc(satX, satY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Core node dot
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(satX, satY, 2.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="holographic-globe-hud gold-transformation-card"
      style={{
        width: '144px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 32%, rgba(0, 0, 0, 0.06) 62%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(142deg, #FFE17D 0%, #F5C542 18%, #D4AF37 42%, #BD8E1C 68%, #E5BE53 86%, #FDE380 100%)',
        border: '1.5px solid #FFF5D6',
        borderRadius: '16px',
        padding: '12px 12px 14px 12px',
        boxShadow: '0 20px 48px rgba(184, 134, 11, 0.45), 0 0 35px rgba(255, 215, 0, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.85), inset 0 -2.5px 5px rgba(138, 86, 0, 0.45)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 25,
        userSelect: 'none',
        ...style
      }}
    >
      {/* 3D Holographic Globe Canvas */}
      <canvas
        ref={canvasRef}
        width={130}
        height={108}
        style={{
          width: '130px',
          height: '108px',
          display: 'block'
        }}
      />

      {/* Technical Typography & Analytics Bar Icon */}
      <div
        style={{
          width: '100%',
          marginTop: '6px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(120, 85, 20, 0.24)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#150E04',
              lineHeight: 1.2
            }}
          >
            BUILDING
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#1E1406',
              lineHeight: 1.2
            }}
          >
            SCALABLE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#281B09',
              lineHeight: 1.2
            }}
          >
            SOLUTIONS
          </span>
        </div>

        {/* Gold Analytics 3-Bar Chart Icon in Obsidian Bronze */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '3px',
            paddingBottom: '2px',
            opacity: 0.95
          }}
          title="System Scalability Metrics"
        >
          <div
            style={{
              width: '3.5px',
              height: '8px',
              borderRadius: '1px',
              background: '#2B1E0A'
            }}
          />
          <div
            style={{
              width: '3.5px',
              height: '13px',
              borderRadius: '1px',
              background: '#231807'
            }}
          />
          <div
            style={{
              width: '3.5px',
              height: '18px',
              borderRadius: '1px',
              background: '#150E04'
            }}
          />
        </div>
      </div>
    </div>
  );
}
