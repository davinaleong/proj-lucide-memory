import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from '../../hooks/useGameLogic';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock the audio hooks
vi.mock('../../hooks/useAudio', () => ({
  useGameAudio: () => ({
    playMatchSuccess: vi.fn(),
    playMatchFail: vi.fn(),
    playLevelComplete: vi.fn(),
  }),
}));

describe('useGameLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.gameState.currentLevel).toBe(1);
      expect(result.current.gameState.gameStatus).toBe('idle');
      expect(result.current.gameState.score).toBe(0);
      expect(result.current.gameState.cards).toHaveLength(0);
    });

    it('should provide level configurations', () => {
      const { result } = renderHook(() => useGameLogic());

      const level1Config = result.current.getLevelConfig(1);
      expect(level1Config.pairCount).toBe(6);
      expect(level1Config.gridRows).toBe(3);
      expect(level1Config.gridCols).toBe(4);

      const level2Config = result.current.getLevelConfig(2);
      expect(level2Config.pairCount).toBe(8);
    });
  });

  describe('game start', () => {
    it('should start game with correct cards', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      expect(result.current.gameState.gameStatus).toBe('playing');
      expect(result.current.gameState.cards).toHaveLength(12); // 6 pairs
      expect(result.current.gameState.currentLevel).toBe(1);
    });

    it('should create matching pairs', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      const cards = result.current.gameState.cards;
      const pairCounts = cards.reduce((acc, card) => {
        acc[card.pairId] = (acc[card.pairId] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      // Each pairId should appear exactly twice
      Object.values(pairCounts).forEach(count => {
        expect(count).toBe(2);
      });
    });
  });

  describe('card interactions', () => {
    it('should flip a card when clicked', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      const firstCardId = result.current.gameState.cards[0].id;

      act(() => {
        result.current.handleCardClick(firstCardId);
      });

      expect(result.current.gameState.flippedCards).toContain(firstCardId);
      expect(result.current.gameState.moves).toBe(1);
    });

    it('should handle pause and resume', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      act(() => {
        result.current.pauseGame();
      });

      expect(result.current.gameState.gameStatus).toBe('paused');

      act(() => {
        result.current.resumeGame();
      });

      expect(result.current.gameState.gameStatus).toBe('playing');
    });
  });

  describe('timer functionality', () => {
    it('should increment time when playing', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      expect(result.current.gameState.timeElapsed).toBe(0);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.gameState.timeElapsed).toBe(2);
    });

    it('should not increment time when paused', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      act(() => {
        result.current.pauseGame();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.gameState.timeElapsed).toBe(0);
    });
  });
});