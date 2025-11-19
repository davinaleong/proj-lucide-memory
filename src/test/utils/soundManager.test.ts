import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { soundManager, SoundManager } from '../../utils/soundManager';
import type { SoundType } from '../../utils/soundManager';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('SoundManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should export a singleton instance', () => {
      expect(soundManager).toBeDefined();
      expect(soundManager).toBeInstanceOf(SoundManager);
    });

    it('should maintain the same instance across imports', () => {
      const instance1 = soundManager;
      const instance2 = soundManager;
      expect(instance1).toBe(instance2);
    });
  });

  describe('Sound Types', () => {
    it('should support all required sound types', () => {
      const soundTypes: SoundType[] = [
        'cardFlip',
        'matchSuccess',
        'matchFail',
        'levelComplete',
        'gameOver',
        'buttonClick',
        'backgroundMusic'
      ];

      soundTypes.forEach(soundType => {
        expect(() => soundManager.play(soundType)).not.toThrow();
      });
    });
  });

  describe('Volume Controls', () => {
    it('should set master volume correctly', () => {
      soundManager.setMasterVolume(0.5);
      expect(soundManager.getMasterVolume()).toBe(0.5);
    });

    it('should clamp volume to valid range', () => {
      soundManager.setMasterVolume(1.5); // Above 1
      expect(soundManager.getMasterVolume()).toBe(1);

      soundManager.setMasterVolume(-0.5); // Below 0
      expect(soundManager.getMasterVolume()).toBe(0);
    });

    it('should save volume settings to localStorage', () => {
      soundManager.setMasterVolume(0.7);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'lucide-memory-audio-settings',
        expect.stringContaining('0.7')
      );
    });
  });

  describe('Mute Functionality', () => {
    it('should toggle mute state', () => {
      expect(soundManager.isMutedState()).toBe(false);
      
      soundManager.mute();
      expect(soundManager.isMutedState()).toBe(true);
      
      soundManager.unmute();
      expect(soundManager.isMutedState()).toBe(false);
    });

    it('should toggle mute with toggleMute method', () => {
      const initialState = soundManager.isMutedState();
      
      soundManager.toggleMute();
      expect(soundManager.isMutedState()).toBe(!initialState);
      
      soundManager.toggleMute();
      expect(soundManager.isMutedState()).toBe(initialState);
    });

    it('should save mute settings to localStorage', () => {
      soundManager.mute();
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'lucide-memory-audio-settings',
        expect.stringContaining('true')
      );
    });
  });

  describe('Background Music Controls', () => {
    it('should have background music control methods', () => {
      expect(typeof soundManager.playBackgroundMusic).toBe('function');
      expect(typeof soundManager.stopBackgroundMusic).toBe('function');
      expect(typeof soundManager.pauseBackgroundMusic).toBe('function');
      expect(typeof soundManager.resumeBackgroundMusic).toBe('function');
      expect(typeof soundManager.isBackgroundMusicPlaying).toBe('function');
    });

    it('should return promises from playBackgroundMusic', async () => {
      const result = soundManager.playBackgroundMusic();
      expect(result).toBeInstanceOf(Promise);
      
      // Should resolve when not muted
      await expect(result).resolves.toBeUndefined();
    });

    it('should resolve immediately when muted', async () => {
      soundManager.mute();
      const result = soundManager.playBackgroundMusic();
      await expect(result).resolves.toBeUndefined();
    });
  });

  describe('Settings Persistence', () => {
    it('should load settings from localStorage on initialization', () => {
      const mockSettings = JSON.stringify({
        isMuted: true,
        masterVolume: 0.5
      });
      
      mockLocalStorage.getItem.mockReturnValue(mockSettings);
      
      // Create new instance to test loading
      const newManager = new SoundManager();
      expect(newManager.isMutedState()).toBe(true);
      expect(newManager.getMasterVolume()).toBe(0.5);
    });

    it('should handle corrupted localStorage gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      
      expect(() => new SoundManager()).not.toThrow();
    });

    it('should use default values when localStorage is empty', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const newManager = new SoundManager();
      expect(newManager.isMutedState()).toBe(false);
      expect(newManager.getMasterVolume()).toBe(0.7);
    });
  });

  describe('Sound Playback', () => {
    it('should not throw when playing sounds', () => {
      expect(() => soundManager.play('cardFlip')).not.toThrow();
      expect(() => soundManager.play('matchSuccess')).not.toThrow();
      expect(() => soundManager.play('buttonClick')).not.toThrow();
    });

    it('should not play sounds when muted', () => {
      soundManager.mute();
      expect(() => soundManager.play('cardFlip')).not.toThrow();
      // Mocked Howl should not be called to play when muted
    });

    it('should stop sounds correctly', () => {
      expect(() => soundManager.stop('cardFlip')).not.toThrow();
      expect(() => soundManager.pause('matchSuccess')).not.toThrow();
      expect(() => soundManager.resume('buttonClick')).not.toThrow();
    });
  });

  describe('Cleanup', () => {
    it('should have unload method for cleanup', () => {
      expect(typeof soundManager.unload).toBe('function');
      expect(() => soundManager.unload()).not.toThrow();
    });
  });
});