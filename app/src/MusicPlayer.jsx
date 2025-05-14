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
    <div className="fixed top-4 left-4 w-80 bg-gradient-to-r from-gray-950/90 to-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-800/50 flex flex-col gap-3 px-4 py-3 text-white/90 select-none z-50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Control buttons */}
        <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-1.5">
          {/* Previous */}
          <button
            onClick={playPrev}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-xl hover:bg-white/10 transition-all duration-200"
            aria-label="Previous track"
          >
            ⏮️
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-2xl transition-all duration-200"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          {/* Next */}
          <button
            onClick={playNext}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-xl hover:bg-white/10 transition-all duration-200"
            aria-label="Next track"
          >
            ⏭️
          </button>
        </div>

        {/* Time counter */}
        <div className="ml-auto flex-shrink-0 text-xs font-mono text-white/60">
          {format(currentTime)} / {format(duration)}
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative group">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer accent-white/90 hover:accent-white transition-all duration-200
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-200
            group-hover:[&::-webkit-slider-thumb]:scale-125"
        />
        
        {/* Progress indicator */}
        <div 
          className="absolute bottom-0 left-0 h-1.5 bg-white/30 rounded-full pointer-events-none transition-all duration-200"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={tracks[trackIndex].src}
        onEnded={playNext}
      />
    </div>
  );
} 