import { describe, it, expect } from 'vitest';
import type { Card, GameState, PlayerProgress, LevelConfig } from '../../types';

describe('Type Interfaces', () => {
  describe('Card interface', () => {
    it('should have all required properties', () => {
      const card: Card = {
        id: 1,
        icon: 'Heart',
        isFlipped: false,
        isMatched: false,
        pairId: 0
      };

      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('icon');
      expect(card).toHaveProperty('isFlipped');
      expect(card).toHaveProperty('isMatched');
      expect(card).toHaveProperty('pairId');
      
      expect(typeof card.id).toBe('number');
      expect(typeof card.icon).toBe('string');
      expect(typeof card.isFlipped).toBe('boolean');
      expect(typeof card.isMatched).toBe('boolean');
      expect(typeof card.pairId).toBe('number');
    });
  });

  describe('GameState interface', () => {
    it('should have all required properties with correct types', () => {
      const gameState: GameState = {
        currentLevel: 1,
        score: 100,
        moves: 10,
        timeElapsed: 60,
        cards: [],
        flippedCards: [1, 2],
        matchedPairs: [0],
        gameStatus: 'playing'
      };

      expect(gameState).toHaveProperty('currentLevel');
      expect(gameState).toHaveProperty('score');
      expect(gameState).toHaveProperty('moves');
      expect(gameState).toHaveProperty('timeElapsed');
      expect(gameState).toHaveProperty('cards');
      expect(gameState).toHaveProperty('flippedCards');
      expect(gameState).toHaveProperty('matchedPairs');
      expect(gameState).toHaveProperty('gameStatus');

      expect(typeof gameState.currentLevel).toBe('number');
      expect(typeof gameState.score).toBe('number');
      expect(typeof gameState.moves).toBe('number');
      expect(typeof gameState.timeElapsed).toBe('number');
      expect(Array.isArray(gameState.cards)).toBe(true);
      expect(Array.isArray(gameState.flippedCards)).toBe(true);
      expect(Array.isArray(gameState.matchedPairs)).toBe(true);
      expect(['playing', 'paused', 'completed', 'idle']).toContain(gameState.gameStatus);
    });
  });

  describe('PlayerProgress interface', () => {
    it('should have all required properties with correct types', () => {
      const progress: PlayerProgress = {
        highestLevel: 3,
        bestScore: 1500,
        totalGamesPlayed: 5,
        averageTime: 120,
        hasPlayed: true
      };

      expect(progress).toHaveProperty('highestLevel');
      expect(progress).toHaveProperty('bestScore');
      expect(progress).toHaveProperty('totalGamesPlayed');
      expect(progress).toHaveProperty('averageTime');
      expect(progress).toHaveProperty('hasPlayed');

      expect(typeof progress.highestLevel).toBe('number');
      expect(typeof progress.bestScore).toBe('number');
      expect(typeof progress.totalGamesPlayed).toBe('number');
      expect(typeof progress.averageTime).toBe('number');
      expect(typeof progress.hasPlayed).toBe('boolean');
    });
  });

  describe('LevelConfig interface', () => {
    it('should have all required properties with correct types', () => {
      const config: LevelConfig = {
        level: 1,
        gridRows: 3,
        gridCols: 4,
        pairCount: 6,
        icons: ['Heart', 'Star', 'Circle']
      };

      expect(config).toHaveProperty('level');
      expect(config).toHaveProperty('gridRows');
      expect(config).toHaveProperty('gridCols');
      expect(config).toHaveProperty('pairCount');
      expect(config).toHaveProperty('icons');

      expect(typeof config.level).toBe('number');
      expect(typeof config.gridRows).toBe('number');
      expect(typeof config.gridCols).toBe('number');
      expect(typeof config.pairCount).toBe('number');
      expect(Array.isArray(config.icons)).toBe(true);
      expect(config.icons.every(icon => typeof icon === 'string')).toBe(true);
    });
  });
});