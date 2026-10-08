import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!visible) setVisible(true);
    };

    const updateTrail = () => {
      trailX += (targetX - trailX) * 0.18;
      trailY += (targetY - trailY) * 0.18;
      setTrail({ x: trailX, y: trailY });
      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Watch hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('role') === 'tab' ||
        target.classList.contains('interactive-hover')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Central precise gold dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
          width: '6px',
          height: '6px',
          backgroundColor: '#F2CA8E',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s ease',
          boxShadow: '0 0 10px #D9A968'
        }}
        aria-hidden="true"
      />
      {/* Outer subtle luxury aura ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${trail.x - (hovered ? 24 : 16)}px, ${trail.y - (hovered ? 24 : 16)}px, 0)`,
          width: hovered ? '48px' : '32px',
          height: hovered ? '48px' : '32px',
          border: '1px solid rgba(217, 169, 104, 0.45)',
          backgroundColor: hovered ? 'rgba(217, 169, 104, 0.1)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease',
          boxShadow: hovered ? '0 0 20px rgba(217, 169, 104, 0.25)' : 'none'
        }}
        aria-hidden="true"
      />
    </>
  );
}
