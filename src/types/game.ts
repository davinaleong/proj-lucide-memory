export interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: number;
}

export interface GameState {
  currentLevel: number;
  score: number;
  moves: number;
  timeElapsed: number;
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number[];
  gameStatus: 'playing' | 'paused' | 'completed' | 'idle';
}

export interface PlayerProgress {
  highestLevel: number;
  bestScore: number;
  totalGamesPlayed: number;
  averageTime: number;
  hasPlayed: boolean;
}

export interface LevelConfig {
  level: number;
  gridRows: number;
  gridCols: number;
  pairCount: number;
  icons: string[];
}