import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, X, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  onClose,
  title,
}) => {
  const [progress, setProgress] = useState(18); // default to a pleasant initial progress for realism
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const totalDuration = 210; // 3 mins 30 secs = 210 seconds

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            onTogglePlay();
            return 0;
          }
          return prev + 0.5 * speed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, onTogglePlay]);

  const currentSeconds = Math.floor((progress / 100) * totalDuration);
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const speeds = [1, 1.25, 1.5, 2];
  const nextSpeed = () => {
    const idx = speeds.indexOf(speed);
    setSpeed(speeds[(idx + 1) % speeds.length]);
  };

  return (
    <div
      id="article-audio-player-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[680px] bg-[#202124] text-white rounded-2xl p-4 shadow-2xl z-50 border border-[#3c4043] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="p-1.5 bg-[#4285f4] rounded-full shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="truncate">
            <p className="text-xs font-medium text-white truncate font-google-sans">
              Listening: {title}
            </p>
            <p className="text-[11px] text-[#9aa0a6]">Gemini Neural AI Audio Voice</p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={nextSpeed}
            className="text-xs font-semibold px-2 py-0.5 rounded bg-[#303134] hover:bg-[#3c4043] text-[#8ab4f8] transition-colors"
            title="Playback Speed"
          >
            {speed}x
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-[#9aa0a6] hover:text-white rounded transition-colors"
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 text-[#9aa0a6] hover:text-white rounded transition-colors ml-1"
            aria-label="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Scrubber */}
      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="w-9 h-9 rounded-full bg-white text-[#202124] flex items-center justify-center hover:bg-[#f1f3f4] transition-all transform active:scale-95 shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        <span className="text-[11px] text-[#9aa0a6] tabular-nums shrink-0">
          {formatTime(currentSeconds)}
        </span>

        <div className="relative flex-1 group">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#3c4043] rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
          />
        </div>

        <span className="text-[11px] text-[#9aa0a6] tabular-nums shrink-0">
          {formatTime(totalDuration)}
        </span>
      </div>
    </div>
  );
};
