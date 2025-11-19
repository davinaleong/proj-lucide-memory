import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAudio, useGameAudio } from '../../hooks/useAudio';

// Mock the sound manager
vi.mock('../../utils/soundManager', () => ({
  soundManager: {
    play: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    setVolume: vi.fn(),
    setMasterVolume: vi.fn(),
    getMasterVolume: vi.fn().mockReturnValue(0.7),
    mute: vi.fn(),
    unmute: vi.fn(),
    toggleMute: vi.fn(),
    isMutedState: vi.fn().mockReturnValue(false),
    playBackgroundMusic: vi.fn().mockResolvedValue(undefined),
    stopBackgroundMusic: vi.fn(),
    pauseBackgroundMusic: vi.fn(),
    resumeBackgroundMusic: vi.fn(),
    isBackgroundMusicPlaying: vi.fn().mockReturnValue(false),
  },
}));

describe('useAudio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should provide audio control methods', () => {
    const { result } = renderHook(() => useAudio());

    expect(typeof result.current.play).toBe('function');
    expect(typeof result.current.stop).toBe('function');
    expect(typeof result.current.pause).toBe('function');
    expect(typeof result.current.resume).toBe('function');
    expect(typeof result.current.setVolume).toBe('function');
    expect(typeof result.current.setMasterVolume).toBe('function');
    expect(typeof result.current.getMasterVolume).toBe('function');
    expect(typeof result.current.mute).toBe('function');
    expect(typeof result.current.unmute).toBe('function');
    expect(typeof result.current.toggleMute).toBe('function');
  });

  it('should provide background music controls', () => {
    const { result } = renderHook(() => useAudio());

    expect(typeof result.current.playBackgroundMusic).toBe('function');
    expect(typeof result.current.stopBackgroundMusic).toBe('function');
    expect(typeof result.current.pauseBackgroundMusic).toBe('function');
    expect(typeof result.current.resumeBackgroundMusic).toBe('function');
  });

  it('should provide current audio state', () => {
    const { result } = renderHook(() => useAudio());

    expect(typeof result.current.isMuted).toBe('boolean');
    expect(typeof result.current.masterVolume).toBe('number');
    expect(result.current.isMuted).toBe(false);
    expect(result.current.masterVolume).toBe(0.7);
  });

  it('should call sound manager methods when audio controls are used', async () => {
    const { soundManager } = await import('../../utils/soundManager');
    const { result } = renderHook(() => useAudio());

    act(() => {
      result.current.play('cardFlip');
    });
    expect(soundManager.play).toHaveBeenCalledWith('cardFlip');

    act(() => {
      result.current.mute();
    });
    expect(soundManager.mute).toHaveBeenCalled();

    act(() => {
      result.current.setMasterVolume(0.5);
    });
    expect(soundManager.setMasterVolume).toHaveBeenCalledWith(0.5);
  });

  it('should handle visibility change events', async () => {
    const { soundManager } = await import('../../utils/soundManager');
    renderHook(() => useAudio());

    // Simulate tab becoming hidden
    Object.defineProperty(document, 'hidden', { value: true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));

    expect(soundManager.pauseBackgroundMusic).toHaveBeenCalled();

    // Simulate tab becoming visible
    Object.defineProperty(document, 'hidden', { value: false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));

    expect(soundManager.resumeBackgroundMusic).toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useAudio());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'visibilitychange',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});

describe('useGameAudio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should extend useAudio with game-specific methods', () => {
    const { result } = renderHook(() => useGameAudio());

    // Should have all useAudio methods
    expect(typeof result.current.play).toBe('function');
    expect(typeof result.current.mute).toBe('function');

    // Should have game-specific methods
    expect(typeof result.current.playCardFlip).toBe('function');
    expect(typeof result.current.playMatchSuccess).toBe('function');
    expect(typeof result.current.playMatchFail).toBe('function');
    expect(typeof result.current.playLevelComplete).toBe('function');
    expect(typeof result.current.playGameOver).toBe('function');
    expect(typeof result.current.playButtonClick).toBe('function');
  });

  it('should call correct sound types for game actions', async () => {
    const { soundManager } = await import('../../utils/soundManager');
    const { result } = renderHook(() => useGameAudio());

    act(() => {
      result.current.playCardFlip();
    });
    expect(soundManager.play).toHaveBeenCalledWith('cardFlip');

    act(() => {
      result.current.playMatchSuccess();
    });
    expect(soundManager.play).toHaveBeenCalledWith('matchSuccess');

    act(() => {
      result.current.playMatchFail();
    });
    expect(soundManager.play).toHaveBeenCalledWith('matchFail');

    act(() => {
      result.current.playLevelComplete();
    });
    expect(soundManager.play).toHaveBeenCalledWith('levelComplete');

    act(() => {
      result.current.playGameOver();
    });
    expect(soundManager.play).toHaveBeenCalledWith('gameOver');

    act(() => {
      result.current.playButtonClick();
    });
    expect(soundManager.play).toHaveBeenCalledWith('buttonClick');
  });

  it('should maintain stable references for callback functions', () => {
    const { result, rerender } = renderHook(() => useGameAudio());

    const firstRenderCallbacks = {
      playCardFlip: result.current.playCardFlip,
      playMatchSuccess: result.current.playMatchSuccess,
      playButtonClick: result.current.playButtonClick,
    };

    rerender();

    expect(result.current.playCardFlip).toBe(firstRenderCallbacks.playCardFlip);
    expect(result.current.playMatchSuccess).toBe(firstRenderCallbacks.playMatchSuccess);
    expect(result.current.playButtonClick).toBe(firstRenderCallbacks.playButtonClick);
  });
});