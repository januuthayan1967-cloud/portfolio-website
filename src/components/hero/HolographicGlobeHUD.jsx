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

      // 1. Atmosphere Radial Glow Behind Globe
      const atmoGlow = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.4);
      atmoGlow.addColorStop(0, 'rgba(14, 165, 233, 0.42)');
      atmoGlow.addColorStop(0.5, 'rgba(2, 132, 199, 0.18)');
      atmoGlow.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = atmoGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Fill with deep royal sapphire lighting
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#2563EB'); // luminous sapphire blue
      sphereGrad.addColorStop(0.4, '#0F172A'); // deep navy
      sphereGrad.addColorStop(0.85, '#070D18'); // deep dark
      sphereGrad.addColorStop(1, '#38BDF8'); // cyan rim

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip to sphere for surface details
      ctx.clip();

      // 3. Rotating Latitude Lines (Parallels)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
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

      // 4. Rotating Longitude Lines (Meridians)
      for (let m = 0; m < 6; m++) {
        const angle = rotation + (m * Math.PI) / 3;
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        ctx.strokeStyle = sinAngle > 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.1)';
        ctx.lineWidth = sinAngle > 0 ? 1.0 : 0.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(cosAngle) * radius, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Rotating Surface Constellation / Landmass Dots
      spherePoints.forEach((pt) => {
        const currLon = pt.lon + rotation;
        const x3d = Math.cos(pt.lat) * Math.sin(currLon);
        const y3d = Math.sin(pt.lat);
        const z3d = Math.cos(pt.lat) * Math.cos(currLon);

        if (z3d > -0.15) {
          const px = cx + x3d * radius;
          const py = cy + y3d * radius;
          const alpha = Math.max(0.2, (z3d + 0.15) / 1.15);

          ctx.fillStyle = `rgba(186, 230, 253, ${alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(px, py, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Cyan Rim Highlight on sphere edge
      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius);
      rimGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      rimGrad.addColorStop(1, 'rgba(56, 189, 248, 0.75)');
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
      ctx.strokeStyle = 'rgba(242, 199, 124, 0.65)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.36, radius * 0.44, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting Satellite Node
      const satAngle = rotation * 1.4;
      const satX = Math.cos(satAngle) * (radius * 1.36);
      const satY = Math.sin(satAngle) * (radius * 0.44);

      // Node glow
      const nodeGlow = ctx.createRadialGradient(satX, satY, 0, satX, satY, 9);
      nodeGlow.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
      nodeGlow.addColorStop(0.3, 'rgba(242, 199, 124, 0.8)');
      nodeGlow.addColorStop(1, 'rgba(217, 169, 104, 0)');
      ctx.fillStyle = nodeGlow;
      ctx.beginPath();
      ctx.arc(satX, satY, 9, 0, Math.PI * 2);
      ctx.fill();

      // Core node dot
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(satX, satY, 2.2, 0, Math.PI * 2);
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
      className="holographic-globe-hud"
      style={{
        width: '144px',
        background: 'rgba(10, 17, 28, 0.86)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(217, 169, 104, 0.35)',
        borderRadius: '16px',
        padding: '12px 12px 14px 12px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 28px rgba(2, 132, 199, 0.2)',
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
          borderTop: '1px solid rgba(217, 169, 104, 0.18)',
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
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--text-main)',
              lineHeight: 1.2
            }}
          >
            BUILDING
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.64rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--gold-light)',
              lineHeight: 1.2
            }}
          >
            SCALABLE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.64rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--text-secondary)',
              lineHeight: 1.2
            }}
          >
            SOLUTIONS
          </span>
        </div>

        {/* Gold Analytics 3-Bar Chart Icon */}
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
              background: 'linear-gradient(to top, #9E7438, #D9A968)'
            }}
          />
          <div
            style={{
              width: '3.5px',
              height: '13px',
              borderRadius: '1px',
              background: 'linear-gradient(to top, #D9A968, #F2C77C)',
              boxShadow: '0 0 6px rgba(242, 199, 124, 0.6)'
            }}
          />
          <div
            style={{
              width: '3.5px',
              height: '18px',
              borderRadius: '1px',
              background: 'linear-gradient(to top, #F2C77C, #FFF5DE)',
              boxShadow: '0 0 10px rgba(242, 199, 124, 0.85)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
