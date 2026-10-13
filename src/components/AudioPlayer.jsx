import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Single managed HTMLAudioElement instance for background ambient audio
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.55;

    // Use primary custom audio file path
    audio.src = '/audio/mybackground.mpeg';

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      // Ensure continuous seamless loop
      if (audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        setIsPlaying(false);
      }
    };

    const handleError = () => {
      // Fallback: If browser strictly rejects .mpeg extension, try .mp3
      if (audio.src && audio.src.endsWith('/audio/mybackground.mpeg')) {
        console.warn('Audio fallback: switching from /audio/mybackground.mpeg to /audio/mybackground.mp3');
        audio.src = '/audio/mybackground.mp3';
        audio.load();
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      // User interaction: Play/Resume audio from current position
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            // Autoplay rejection or abort handling
            if (err.name !== 'AbortError') {
              console.warn('Audio playback prevented by browser policy:', err);
            }
            setIsPlaying(false);
          });
      }
    } else {
      // User interaction: Pause audio immediately, preserving current playback position
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '24px',
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
