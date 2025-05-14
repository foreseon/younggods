import { useRef, useState, useEffect } from 'react';

const tracks = [
  {
    title: 'SoundHelix ‑ Song 1',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'SoundHelix ‑ Song 2',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'SoundHelix ‑ Song 3',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Listen for global play-music event triggered by the landing page
  useEffect(() => {
    const handler = () => setIsPlaying(true);
    window.addEventListener('play-music', handler);
    return () => window.removeEventListener('play-music', handler);
  }, []);

  // Play / pause when isPlaying or trackIndex changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked; ignore error
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, trackIndex]);

  // Update time info
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timeListener = () => setCurrentTime(audio.currentTime);
    const durationListener = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', timeListener);
    audio.addEventListener('loadedmetadata', durationListener);

    return () => {
      audio.removeEventListener('timeupdate', timeListener);
      audio.removeEventListener('loadedmetadata', durationListener);
    };
  }, [trackIndex]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const playNext = () => {
    setTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const format = (t) => {
    if (!t && t !== 0) return '0:00';
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="fixed w-1 h-1 overflow-hidden pointer-events-none top-0 left-0">
      {/* Hidden audio element that handles playback */}
      <audio
        ref={audioRef}
        src={tracks[trackIndex].src}
        onEnded={playNext}
      />
    </div>
  );
} 