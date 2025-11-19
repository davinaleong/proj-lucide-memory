import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { Card, GameState, PlayerProgress, LevelConfig } from '../types';

// Custom render function that includes any providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// Re-export specific testing utilities
export { 
  screen, 
  waitFor, 
  fireEvent, 
  act,
  within,
  getByRole,
  getByText,
  queryByRole,
  queryByText 
} from '@testing-library/react';
export { customRender as render };

// Test data factories
export const createMockCard = (overrides: Partial<Card> = {}): Card => ({
  id: 0,
  icon: 'Heart',
  isFlipped: false,
  isMatched: false,
  pairId: 0,
  ...overrides,
});

export const createMockGameState = (overrides: Partial<GameState> = {}): GameState => ({
  currentLevel: 1,
  score: 0,
  moves: 0,
  timeElapsed: 0,
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  gameStatus: 'idle',
  ...overrides,
});

export const createMockPlayerProgress = (overrides: Partial<PlayerProgress> = {}): PlayerProgress => ({
  highestLevel: 1,
  bestScore: 0,
  totalGamesPlayed: 0,
  averageTime: 0,
  hasPlayed: false,
  ...overrides,
});

export const createMockLevelConfig = (overrides: Partial<LevelConfig> = {}): LevelConfig => ({
  level: 1,
  gridRows: 3,
  gridCols: 4,
  pairCount: 6,
  icons: ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond'],
  ...overrides,
});

// Helper to create a set of matching cards
export const createMatchingCardPair = (pairId: number, icon: string): [Card, Card] => [
  createMockCard({ id: pairId * 2, icon, pairId }),
  createMockCard({ id: pairId * 2 + 1, icon, pairId }),
];

// Helper to create a complete card grid
export const createCardGrid = (pairCount: number): Card[] => {
  const cards: Card[] = [];
  const icons = ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond', 'Hexagon', 'Pentagon'];
  
  for (let i = 0; i < pairCount; i++) {
    const icon = icons[i % icons.length];
    const [card1, card2] = createMatchingCardPair(i, icon);
    cards.push(card1, card2);
  }
  
  // Shuffle and reassign IDs
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  cards.forEach((card, index) => {
    card.id = index;
  });
  
  return cards;
};