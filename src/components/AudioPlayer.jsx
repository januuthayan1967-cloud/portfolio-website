import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ musicSettings, activeTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const isEnabled = musicSettings?.isEnabled ?? true;
  const defaultVolume = typeof musicSettings?.defaultVolume === 'number' ? musicSettings.defaultVolume : 0.55;
  const rawTrackUrl = activeTrack?.url || musicSettings?.activeTrackUrl || '/audio/mybackground.mpeg';
  const trackTitle = activeTrack?.title || musicSettings?.activeTrackTitle || 'Cinematic Ambient Soundscape';

  // Format track URL: add timestamp if remote or dynamic API endpoint to prevent caching stale music
  const resolvedTrackUrl = React.useMemo(() => {
    if (!rawTrackUrl) return '/audio/mybackground.mpeg';
    if (rawTrackUrl.startsWith('/api/music/stream') && !rawTrackUrl.includes('?v=')) {
      return `${rawTrackUrl}?v=${activeTrack?.updatedAt ? new Date(activeTrack.updatedAt).getTime() : Date.now()}`;
    }
    return rawTrackUrl;
  }, [rawTrackUrl, activeTrack?.updatedAt]);

  useEffect(() => {
    // If globally disabled, do not initialize audio
    if (!isEnabled) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Single managed HTMLAudioElement instance for background ambient audio
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = defaultVolume;
    audio.src = resolvedTrackUrl;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        setIsPlaying(false);
      }
    };

    const handleError = () => {
      console.warn(`[AudioPlayer] Error loading audio track: ${audio.src}. Attempting fallback...`);
      // Fallback chain: custom URL -> /audio/mybackground.mpeg -> /audio/mybackground.mp3
      if (audio.src && !audio.src.includes('/audio/mybackground.mpeg') && !audio.src.includes('/audio/mybackground.mp3')) {
        audio.src = '/audio/mybackground.mpeg';
        audio.load();
      } else if (audio.src && audio.src.includes('/audio/mybackground.mpeg')) {
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
  }, [isEnabled]);

  // Update volume smoothly when settings change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = defaultVolume;
    }
  }, [defaultVolume]);

  // Update track source dynamically if active track changes while retaining playback state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isEnabled) return;

    // Check if URL actually changed
    const currentSrc = audio.src;
    const isDifferent = !currentSrc.includes(resolvedTrackUrl.split('?')[0]);

    if (isDifferent) {
      const wasPlaying = !audio.paused && isPlaying;
      audio.src = resolvedTrackUrl;
      audio.load();
      if (wasPlaying) {
        audio.play().catch((err) => {
          console.warn('[AudioPlayer] Playback resume prevented by browser policy:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [resolvedTrackUrl, isEnabled]);

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

  // If background music is globally disabled in Admin settings, hide the player
  if (!isEnabled) {
    return null;
  }

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
        title={isPlaying ? `Mute ambient track: "${trackTitle}"` : `Play ambient track: "${trackTitle}"`}
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
