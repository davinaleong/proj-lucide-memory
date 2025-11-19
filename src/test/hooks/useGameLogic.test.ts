import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from '../../hooks/useGameLogic';

// Mock the sound manager
vi.mock('../../utils/soundManager', () => ({
  soundManager: {
    play: vi.fn(),
  },
}));

// Mock the audio hooks
vi.mock('../../hooks/useAudio', () => ({
  useGameAudio: () => ({
    playCardFlip: vi.fn(),
    playMatchSuccess: vi.fn(),
    playMatchFail: vi.fn(),
    playLevelComplete: vi.fn(),
    playGameOver: vi.fn(),
  }),
}));

describe('useGameLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with level 1 by default', () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.gameState.currentLevel).toBe(1);
      expect(result.current.gameState.cards).toHaveLength(0); // No cards until game starts
      expect(result.current.gameState.gameStatus).toBe('idle');
    });

    it('should have initial player progress', () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.playerProgress.highestLevel).toBe(1);
      expect(result.current.playerProgress.bestScore).toBe(0);
      expect(result.current.playerProgress.totalGamesPlayed).toBe(0);
      expect(result.current.playerProgress.hasPlayed).toBe(false);
    });

    it('should provide level configuration for different levels', () => {
      const { result } = renderHook(() => useGameLogic());

      const level1Config = result.current.getLevelConfig(1);
      expect(level1Config.level).toBe(1);
      expect(level1Config.pairCount).toBe(6);
      expect(level1Config.gridRows).toBe(3);
      expect(level1Config.gridCols).toBe(4);

      const level2Config = result.current.getLevelConfig(2);
      expect(level2Config.level).toBe(2);
      expect(level2Config.pairCount).toBe(8);
    });
  });

  describe('game flow', () => {
    it('should start a new game correctly', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      expect(result.current.gameState.gameStatus).toBe('playing');
      expect(result.current.gameState.currentLevel).toBe(1);
      expect(result.current.gameState.score).toBe(0);
      expect(result.current.gameState.moves).toBe(0);
      expect(result.current.gameState.timeElapsed).toBe(0);
      expect(result.current.gameState.cards).toHaveLength(12); // 6 pairs for level 1
    });

    it('should reset game state when starting new game', () => {
      const { result } = renderHook(() => useGameLogic());

      // Start and modify game state
      act(() => {
        result.current.startGame(1);
      });

      act(() => {
        result.current.handleCardClick(0);
      });

      // Start new game should reset everything
      act(() => {
        result.current.startGame(1);
      });

      expect(result.current.gameState.flippedCards).toHaveLength(0);
      expect(result.current.gameState.score).toBe(0);
      expect(result.current.gameState.moves).toBe(0);
      expect(result.current.gameState.matchedPairs).toHaveLength(0);
    });

    it('should pause and resume game', () => {
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

    it('should increment timer when playing', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      expect(result.current.gameState.timeElapsed).toBe(0);

      act(() => {
        vi.advanceTimersByTime(3000); // Advance 3 seconds
      });

      expect(result.current.gameState.timeElapsed).toBe(3);
    });
  });

  describe('card interactions', () => {
    it('should flip card when clicked', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      const firstCardId = result.current.gameState.cards[0].id;

      act(() => {
        result.current.handleCardClick(firstCardId);
      });

      expect(result.current.gameState.flippedCards).toContain(firstCardId);
      const flippedCard = result.current.gameState.cards.find(c => c.id === firstCardId);
      expect(flippedCard?.isFlipped).toBe(true);
      expect(result.current.gameState.moves).toBe(1);
    });

    it('should not flip already flipped cards', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      const firstCardId = result.current.gameState.cards[0].id;

      // Flip card first time
      act(() => {
        result.current.handleCardClick(firstCardId);
      });

      const movesAfterFirst = result.current.gameState.moves;

      // Try to flip same card again
      act(() => {
        result.current.handleCardClick(firstCardId);
      });

      // Moves should not increase
      expect(result.current.gameState.moves).toBe(movesAfterFirst);
    });

    it('should handle successful match', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      // Find matching pair by looking for same pairId
      const cards = result.current.gameState.cards;
      const firstCard = cards[0];
      const matchingCard = cards.find((c, i) => i > 0 && c.pairId === firstCard.pairId);

      if (matchingCard) {
        act(() => {
          result.current.handleCardClick(firstCard.id);
        });
        act(() => {
          result.current.handleCardClick(matchingCard.id);
        });

        expect(result.current.gameState.matchedPairs).toContain(firstCard.pairId);
        expect(result.current.gameState.score).toBeGreaterThan(0);
        expect(result.current.gameState.flippedCards).toHaveLength(0);

        const card1 = result.current.gameState.cards.find(c => c.id === firstCard.id);
        const card2 = result.current.gameState.cards.find(c => c.id === matchingCard.id);
        
        expect(card1?.isMatched).toBe(true);
        expect(card2?.isMatched).toBe(true);
      }
    });

    it('should handle failed match', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      // Find non-matching pair
      const cards = result.current.gameState.cards;
      const firstCard = cards[0];
      const nonMatchingCard = cards.find(c => c.pairId !== firstCard.pairId && c.id !== firstCard.id);

      if (nonMatchingCard) {
        act(() => {
          result.current.handleCardClick(firstCard.id);
        });
        act(() => {
          result.current.handleCardClick(nonMatchingCard.id);
        });

        // Wait for flip back timeout
        act(() => {
          vi.advanceTimersByTime(1500);
        });

        expect(result.current.gameState.matchedPairs).toHaveLength(0);
        expect(result.current.gameState.flippedCards).toHaveLength(0);

        const card1 = result.current.gameState.cards.find(c => c.id === firstCard.id);
        const card2 = result.current.gameState.cards.find(c => c.id === nonMatchingCard.id);
        
        expect(card1?.isFlipped).toBe(false);
        expect(card2?.isFlipped).toBe(false);
        expect(card1?.isMatched).toBe(false);
        expect(card2?.isMatched).toBe(false);
      }
    });

    it('should prevent more than 2 cards flipped at once', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      const cards = result.current.gameState.cards;

      // Flip two cards first
      act(() => {
        result.current.handleCardClick(cards[0].id);
      });
      act(() => {
        result.current.handleCardClick(cards[1].id);
      });

      const movesAfterTwo = result.current.gameState.moves;

      // Try to flip a third card
      act(() => {
        result.current.handleCardClick(cards[2].id);
      });

      // Should not allow third card flip
      expect(result.current.gameState.moves).toBe(movesAfterTwo);
      expect(result.current.gameState.flippedCards.length).toBeLessThanOrEqual(2);
    });
  });

  describe('score calculation', () => {
    it('should calculate score based on time and moves', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      const initialScore = result.current.gameState.score;

      // Find matching pair and make match
      const cards = result.current.gameState.cards;
      const firstCard = cards[0];
      const matchingCard = cards.find((c, i) => i > 0 && c.pairId === firstCard.pairId);

      if (matchingCard) {
        act(() => {
          result.current.handleCardClick(firstCard.id);
        });
        act(() => {
          result.current.handleCardClick(matchingCard.id);
        });

        expect(result.current.gameState.score).toBeGreaterThan(initialScore);
      }
    });

    it('should award level multiplier bonus', () => {
      const { result: result1 } = renderHook(() => useGameLogic());
      const { result: result2 } = renderHook(() => useGameLogic());
      
      // Start level 1 game
      act(() => {
        result1.current.startGame(1);
      });

      // Start level 2 game
      act(() => {
        result2.current.startGame(2);
      });

      // Make similar matches on both levels
      const cards1 = result1.current.gameState.cards;
      const cards2 = result2.current.gameState.cards;

      if (cards1.length > 0 && cards2.length > 0) {
        const firstCard1 = cards1[0];
        const matchingCard1 = cards1.find((c, i) => i > 0 && c.pairId === firstCard1.pairId);

        const firstCard2 = cards2[0];
        const matchingCard2 = cards2.find((c, i) => i > 0 && c.pairId === firstCard2.pairId);

        if (matchingCard1 && matchingCard2) {
          // Make match on level 1
          act(() => {
            result1.current.handleCardClick(firstCard1.id);
          });
          act(() => {
            result1.current.handleCardClick(matchingCard1.id);
          });

          // Make match on level 2
          act(() => {
            result2.current.handleCardClick(firstCard2.id);
          });
          act(() => {
            result2.current.handleCardClick(matchingCard2.id);
          });

          // Level 2 should have higher score due to multiplier
          expect(result2.current.gameState.score).toBeGreaterThan(result1.current.gameState.score);
        }
      }
    });
  });

  describe('game completion', () => {
    it('should detect game completion', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      const cards = result.current.gameState.cards;
      const pairIds = [...new Set(cards.map(c => c.pairId))];

      // Match all pairs
      pairIds.forEach(pairId => {
        const pair = cards.filter(c => c.pairId === pairId);
        act(() => {
          result.current.handleCardClick(pair[0].id);
        });
        act(() => {
          result.current.handleCardClick(pair[1].id);
        });
      });

      expect(result.current.gameState.gameStatus).toBe('completed');
    });

    it('should update player progress on completion', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.startGame(1);
      });

      const initialProgress = result.current.playerProgress;

      // Complete the game
      const cards = result.current.gameState.cards;
      const pairIds = [...new Set(cards.map(c => c.pairId))];

      pairIds.forEach(pairId => {
        const pair = cards.filter(c => c.pairId === pairId);
        act(() => {
          result.current.handleCardClick(pair[0].id);
        });
        act(() => {
          result.current.handleCardClick(pair[1].id);
        });
      });

      // Wait for completion effects
      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.playerProgress.hasPlayed).toBe(true);
      expect(result.current.playerProgress.totalGamesPlayed).toBeGreaterThan(initialProgress.totalGamesPlayed);
      expect(result.current.playerProgress.bestScore).toBeGreaterThanOrEqual(result.current.gameState.score);
    });
  });

  describe('level management', () => {
    it('should start different levels with correct card counts', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });
      expect(result.current.gameState.cards.length).toBe(12); // 6 pairs

      act(() => {
        result.current.startGame(2);
      });
      expect(result.current.gameState.cards.length).toBe(16); // 8 pairs

      act(() => {
        result.current.startGame(3);
      });
      expect(result.current.gameState.cards.length).toBe(24); // 12 pairs
    });

    it('should generate unique pairs for each level', () => {
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

      // Should have 6 unique pairs for level 1
      expect(Object.keys(pairCounts)).toHaveLength(6);
    });
  });

  describe('persistence', () => {
    it('should persist player progress to localStorage', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.startGame(1);
      });

      // Complete a game to trigger progress update
      const cards = result.current.gameState.cards;
      const pairIds = [...new Set(cards.map(c => c.pairId))];

      pairIds.forEach(pairId => {
        const pair = cards.filter(c => c.pairId === pairId);
        act(() => {
          result.current.handleCardClick(pair[0].id);
        });
        act(() => {
          result.current.handleCardClick(pair[1].id);
        });
      });

      const savedProgress = localStorage.getItem('lucide-memory-progress');
      expect(savedProgress).toBeTruthy();

      const parsedProgress = JSON.parse(savedProgress!);
      expect(parsedProgress.hasPlayed).toBe(true);
      expect(parsedProgress.totalGamesPlayed).toBeGreaterThan(0);
    });

    it('should restore player progress from localStorage', () => {
      // Set up localStorage with saved progress
      const mockProgress = {
        highestLevel: 3,
        bestScore: 1500,
        totalGamesPlayed: 5,
        averageTime: 120,
        hasPlayed: true,
      };

      localStorage.setItem('lucide-memory-progress', JSON.stringify(mockProgress));

      const { result } = renderHook(() => useGameLogic());

      expect(result.current.playerProgress.highestLevel).toBe(3);
      expect(result.current.playerProgress.bestScore).toBe(1500);
      expect(result.current.playerProgress.totalGamesPlayed).toBe(5);
      expect(result.current.playerProgress.hasPlayed).toBe(true);
    });

    it('should handle shuffled card arrangements', () => {
      const { result } = renderHook(() => useGameLogic());

      const arrangements: string[] = [];
      
      // Generate multiple game instances to test shuffling
      for (let i = 0; i < 5; i++) {
        act(() => {
          result.current.startGame(1);
        });
        
        const cardOrder = result.current.gameState.cards.map(c => `${c.icon}-${c.pairId}`).join(',');
        arrangements.push(cardOrder);
      }

      // Check that at least some arrangements are different
      const uniqueArrangements = new Set(arrangements);
      expect(uniqueArrangements.size).toBeGreaterThan(1);
    });
  });
});