import { useCallback, useEffect, useState } from 'react';
import { soundManager } from '../utils/soundManager';
import type { SoundType } from '../utils/soundManager';

export interface AudioControls {
  play: (soundType: SoundType) => void;
  stop: (soundType: SoundType) => void;
  pause: (soundType: SoundType) => void;
  resume: (soundType: SoundType) => void;
  setVolume: (soundType: SoundType, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  getMasterVolume: () => number;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  masterVolume: number;
  playBackgroundMusic: () => Promise<void>;
  stopBackgroundMusic: () => void;
  pauseBackgroundMusic: () => void;
  resumeBackgroundMusic: () => void;
  isBackgroundMusicPlaying: () => boolean;
}

export function useAudio(): AudioControls {
  const [isMuted, setIsMuted] = useState(soundManager.isMutedState());
  const [masterVolume, setMasterVolumeState] = useState(soundManager.getMasterVolume());

  // Listen for visibility changes to pause/resume background music
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        soundManager.pauseBackgroundMusic();
      } else {
        soundManager.resumeBackgroundMusic();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const play = useCallback((soundType: SoundType) => {
    soundManager.play(soundType);
  }, []);

  const stop = useCallback((soundType: SoundType) => {
    soundManager.stop(soundType);
  }, []);

  const pause = useCallback((soundType: SoundType) => {
    soundManager.pause(soundType);
  }, []);

  const resume = useCallback((soundType: SoundType) => {
    soundManager.resume(soundType);
  }, []);

  const setVolume = useCallback((soundType: SoundType, volume: number) => {
    soundManager.setVolume(soundType, volume);
  }, []);

  const setMasterVolume = useCallback((volume: number) => {
    soundManager.setMasterVolume(volume);
    setMasterVolumeState(volume);
  }, []);

  const getMasterVolume = useCallback(() => {
    return soundManager.getMasterVolume();
  }, []);

  const mute = useCallback(() => {
    soundManager.mute();
    setIsMuted(true);
  }, []);

  const unmute = useCallback(() => {
    soundManager.unmute();
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    soundManager.toggleMute();
    setIsMuted(soundManager.isMutedState());
  }, []);

  const playBackgroundMusic = useCallback(() => {
    return soundManager.playBackgroundMusic();
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    soundManager.stopBackgroundMusic();
  }, []);

  const pauseBackgroundMusic = useCallback(() => {
    soundManager.pauseBackgroundMusic();
  }, []);

  const resumeBackgroundMusic = useCallback(() => {
    soundManager.resumeBackgroundMusic();
  }, []);

  const isBackgroundMusicPlaying = useCallback(() => {
    return soundManager.isBackgroundMusicPlaying();
  }, []);

  return {
    play,
    stop,
    pause,
    resume,
    setVolume,
    setMasterVolume,
    getMasterVolume,
    mute,
    unmute,
    toggleMute,
    isMuted,
    masterVolume,
    playBackgroundMusic,
    stopBackgroundMusic,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
    isBackgroundMusicPlaying
  };
}

// Convenience hooks for specific use cases
export function useGameAudio() {
  const audio = useAudio();

  const playCardFlip = useCallback(() => audio.play('cardFlip'), [audio]);
  const playMatchSuccess = useCallback(() => audio.play('matchSuccess'), [audio]);
  const playMatchFail = useCallback(() => audio.play('matchFail'), [audio]);
  const playLevelComplete = useCallback(() => audio.play('levelComplete'), [audio]);
  const playButtonClick = useCallback(() => audio.play('buttonClick'), [audio]);

  return {
    ...audio,
    playCardFlip,
    playMatchSuccess,
    playMatchFail,
    playLevelComplete,
    playButtonClick
  };
}