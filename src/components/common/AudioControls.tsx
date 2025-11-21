import React from 'react';
import { Volume2, VolumeX, Music, SkipForward } from 'lucide-react';
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
    playButtonClick,
    skipToNextTrack,
    getCurrentTrackInfo,
    isBackgroundMusicPlaying
  } = useGameAudio();

  const [isPlaying, setIsPlaying] = React.useState(isBackgroundMusicPlaying());
  const [currentTrackInfo, setCurrentTrackInfo] = React.useState(getCurrentTrackInfo());

  // Update playing state and track info periodically
  React.useEffect(() => {
    const interval = setInterval(() => {
      const playing = isBackgroundMusicPlaying();
      const trackInfo = getCurrentTrackInfo();
      setIsPlaying(playing);
      setCurrentTrackInfo(trackInfo);
    }, 1000);

    return () => clearInterval(interval);
  }, [isBackgroundMusicPlaying, getCurrentTrackInfo]);

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
    if (isPlaying) {
      stopBackgroundMusic();
      setIsPlaying(false);
    } else {
      playBackgroundMusic();
      setIsPlaying(true);
    }
  };

  const handleSkipTrack = () => {
    playButtonClick();
    skipToNextTrack();
    setCurrentTrackInfo(getCurrentTrackInfo());
  };

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* Mute/Unmute Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleMuteToggle}
        className="flex items-center gap-2 rounded-sm px-3 py-2 min-w-[5ch]"
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
      {showVolumeSlider && (
        <div className="flex items-center gap-2 min-w-[120px]">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : masterVolume}
            onChange={handleVolumeChange}
            disabled={isMuted}
            className={`volume-slider w-20 sm:w-24 h-2 rounded-lg cursor-pointer transition-opacity ${
              isMuted ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Master volume"
            style={{
              background: isMuted 
                ? `linear-gradient(to right, #94a3b8 0%, #94a3b8 100%)`
                : `linear-gradient(to right, #2563eb 0%, #2563eb ${masterVolume * 100}%, #cbd5e1 ${masterVolume * 100}%, #cbd5e1 100%)`
            }}
          />
          <span className={`text-xs font-medium min-w-[2.5rem] text-right ${
            isMuted ? 'text-slate-400' : 'text-blue-600'
          }`}>
            {isMuted ? 'Muted' : `${Math.round(masterVolume * 100)}%`}
          </span>
        </div>
      )}

      {/* Background Music Controls */}
      {showBackgroundMusicToggle && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackgroundMusicToggle}
            className={`flex items-center gap-2 rounded-sm px-3 py-2 min-w-[5ch] ${
              isPlaying 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'text-slate-600'
            }`}
            aria-label={isPlaying ? 'Stop background music' : 'Play background music'}
          >
            <Music className={`w-4 h-4 ${
              isPlaying ? 'text-blue-600' : 'text-slate-500'
            }`} />
            <span className="hidden sm:inline text-sm">
              Music
            </span>
          </Button>
          
          {/* Skip Track Button - only show when music is playing */}
          {isPlaying && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkipTrack}
              className="flex items-center gap-1 rounded-sm px-2 py-2"
              aria-label={`Skip to next track. Current: ${currentTrackInfo.name} (${currentTrackInfo.index + 1}/${currentTrackInfo.total})`}
            >
              <SkipForward className="w-4 h-4 text-slate-600" />
            </Button>
          )}
          
          {/* Current track info - show on larger screens when playing */}
          {isPlaying && (
            <div className="hidden md:block text-xs text-slate-600 max-w-[120px] truncate">
              {currentTrackInfo.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
}