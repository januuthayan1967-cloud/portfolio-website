import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const toggleAudio = () => {
    if (!isPlaying) {
      // Start ambient drone using Web Audio API
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContext();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm harmonic cinematic chord (F - C - A - E deep subtle pad)
        const frequencies = [87.31, 130.81, 164.81, 220.0];
        const oscs = frequencies.map((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          return osc;
        });

        oscillatorsRef.current = oscs;
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio playback error:', err);
      }
    } else {
      // Graceful fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        setTimeout(() => {
          oscillatorsRef.current.forEach(osc => osc.stop());
          oscillatorsRef.current = [];
          setIsPlaying(false);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 100
      }}
    >
      <button
        onClick={toggleAudio}
        title={isPlaying ? 'Mute ambient soundscape' : 'Enable cinematic ambient soundscape'}
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '9999px',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          background: 'rgba(10, 16, 28, 0.75)',
          color: isPlaying ? '#d4af37' : '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 15px rgba(212, 175, 55, 0.25)' : 'none'
        }}
      >
        {isPlaying ? (
          <>
            <Volume2 size={15} color="#d4af37" />
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '10px', background: '#d4af37', borderRadius: '1px', animation: 'pulseGold 1s infinite alternate' }}></span>
              <span style={{ display: 'inline-block', width: '3px', height: '14px', background: '#d4af37', borderRadius: '1px', animation: 'pulseGold 0.8s infinite alternate' }}></span>
              <span style={{ display: 'inline-block', width: '3px', height: '8px', background: '#d4af37', borderRadius: '1px', animation: 'pulseGold 1.2s infinite alternate' }}></span>
            </span>
            <span>CINEMATIC AUDIO ON</span>
          </>
        ) : (
          <>
            <VolumeX size={15} />
            <span>SOUND AMBIENCE</span>
          </>
        )}
      </button>
    </div>
  );
}
