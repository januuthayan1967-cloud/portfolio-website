import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

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
      trailX += (targetX - trailX) * 0.15;
      trailY += (targetY - trailY) * 0.15;
      setTrail({ x: trailX, y: trailY });
      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
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
      {/* Central precise dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
          width: '6px',
          height: '6px',
          backgroundColor: '#f6d87e',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.05s ease-out, opacity 0.2s',
          boxShadow: '0 0 10px #d4af37'
        }}
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
          border: '1px solid rgba(212, 175, 55, 0.45)',
          backgroundColor: hovered ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out, border-color 0.25s ease-out',
          boxShadow: hovered ? '0 0 20px rgba(212, 175, 55, 0.25)' : 'none'
        }}
      />
    </>
  );
}
