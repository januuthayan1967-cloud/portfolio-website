import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0B1018, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch (err) {
      setHasWebGL(false);
      return;
    }

    // 1. CELESTIAL AMBER & SAPPHIRE PARTICLES
    const particleCount = 140; // Balanced density to prevent clutter
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xD9A968);
    const amberColor = new THREE.Color(0xE5A84B);
    const navyColor = new THREE.Color(0x38BDF8);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 130;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      // 75% champagne/amber gold, 25% subtle sapphire
      const isGold = Math.random() > 0.25;
      const c = isGold ? (Math.random() > 0.5 ? goldColor : amberColor) : navyColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
    grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.12)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. REFINED ARCHITECTURAL ORBITAL RINGS
    const ringGeo1 = new THREE.TorusGeometry(32, 0.07, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xD9A968,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(36, 0.05, 16, 140);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x60A5FA,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 3. SMOOTH CAMERA LERP WITH PASSIVE LISTENER
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia
      targetX += (mouseX * 10 - targetX) * 0.035;
      targetY += (mouseY * 6 - targetY) * 0.035;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Controlled subtle rotations
      particles.rotation.y = elapsedTime * 0.018;
      particles.rotation.x = Math.sin(elapsedTime * 0.012) * 0.06;

      ring1.rotation.z = elapsedTime * 0.028;
      ring1.rotation.x = Math.PI / 3 + Math.cos(elapsedTime * 0.018) * 0.08;

      ring2.rotation.y = -elapsedTime * 0.02;
      ring2.rotation.z = Math.sin(elapsedTime * 0.025) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(217, 169, 104, 0.06), transparent 70%)'
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.82
      }}
      aria-hidden="true"
    />
  );
}
