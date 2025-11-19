import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useGameAudio } from '../../hooks/useAudio';
import { Button } from '../common/Button';

interface AudioControlsProps {
  showBackgroundMusicToggle?: boolean;
  showVolumeSlider?: boolean;
  className?: string;
}

export function AudioControls({ 
  showBackgroundMusicToggle = true, 
  showVolumeSlider = true,
  className = '' 
}: AudioControlsProps) {
  const { 
    isMuted, 
    masterVolume, 
    toggleMute, 
    setMasterVolume,
    playBackgroundMusic,
    stopBackgroundMusic,
    playButtonClick
  } = useGameAudio();

  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = React.useState(false);

  const handleMuteToggle = () => {
    playButtonClick();
    toggleMute();
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setMasterVolume(newVolume);
  };

  const handleBackgroundMusicToggle = () => {
    playButtonClick();
    if (isBackgroundMusicPlaying) {
      stopBackgroundMusic();
      setIsBackgroundMusicPlaying(false);
    } else {
      playBackgroundMusic();
      setIsBackgroundMusicPlaying(true);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Mute/Unmute Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleMuteToggle}
        className="flex items-center gap-2 px-3 py-2"
        aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-slate-500" />
        ) : (
          <Volume2 className="w-4 h-4 text-blue-600" />
        )}
        <span className="hidden sm:inline text-sm">
          {isMuted ? 'Unmuted' : 'Muted'}
        </span>
      </Button>

      {/* Volume Slider */}
      {showVolumeSlider && !isMuted && (
        <div className="flex items-center gap-2 min-w-[80px]">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={masterVolume}
            onChange={handleVolumeChange}
            className="w-16 sm:w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-blue-600
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:transition-all
                       [&::-webkit-slider-thumb]:hover:bg-blue-700
                       [&::-moz-range-thumb]:w-4
                       [&::-moz-range-thumb]:h-4
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-blue-600
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:border-0"
            aria-label="Master volume"
          />
          <span className="text-xs text-slate-600 min-w-[2.5rem] text-right">
            {Math.round(masterVolume * 100)}%
          </span>
        </div>
      )}

      {/* Background Music Toggle */}
      {showBackgroundMusicToggle && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackgroundMusicToggle}
          className={`flex items-center gap-2 px-3 py-2 ${
            isBackgroundMusicPlaying 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'text-slate-600'
          }`}
          aria-label={isBackgroundMusicPlaying ? 'Stop background music' : 'Play background music'}
        >
          <Music className={`w-4 h-4 ${
            isBackgroundMusicPlaying ? 'text-blue-600' : 'text-slate-500'
          }`} />
          <span className="hidden sm:inline text-sm">
            Music
          </span>
        </Button>
      )}
    </div>
  );
}