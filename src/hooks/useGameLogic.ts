import { useState, useEffect, useCallback } from 'react';
import type { GameState, Card, PlayerProgress, LevelConfig } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { useGameAudio } from './useAudio';

// Level configurations
const LEVEL_CONFIGS: LevelConfig[] = [
  { level: 1, gridRows: 3, gridCols: 4, pairCount: 6, icons: ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond'] },
  { level: 2, gridRows: 4, gridCols: 4, pairCount: 8, icons: ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond', 'Hexagon', 'Pentagon'] },
  { level: 3, gridRows: 4, gridCols: 6, pairCount: 12, icons: ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond', 'Hexagon', 'Pentagon', 'Octagon', 'Plus', 'Minus', 'X'] },
  { level: 4, gridRows: 5, gridCols: 6, pairCount: 15, icons: ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond', 'Hexagon', 'Pentagon', 'Octagon', 'Plus', 'Minus', 'X', 'Sun', 'Moon', 'Cloud'] }
];

const INITIAL_PLAYER_PROGRESS: PlayerProgress = {
  highestLevel: 1,
  bestScore: 0,
  totalGamesPlayed: 0,
  averageTime: 0,
  hasPlayed: false
};

export function useGameLogic() {
  const [playerProgress, setPlayerProgress] = useLocalStorage<PlayerProgress>('lucide-memory-progress', INITIAL_PLAYER_PROGRESS);
  const { playMatchSuccess, playMatchFail, playLevelComplete } = useGameAudio();
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    moves: 0,
    timeElapsed: 0,
    cards: [],
    flippedCards: [],
    matchedPairs: [],
    gameStatus: 'idle'
  });
  const [gameTimer, setGameTimer] = useState<number | null>(null);

  // Initialize cards for a level
  const initializeCards = useCallback((level: number): Card[] => {
    const config = LEVEL_CONFIGS[level - 1] || LEVEL_CONFIGS[0];
    const cards: Card[] = [];
    
    // Create pairs of cards
    for (let i = 0; i < config.pairCount; i++) {
      const icon = config.icons[i % config.icons.length];
      cards.push(
        { id: i * 2, icon, isFlipped: false, isMatched: false, pairId: i },
        { id: i * 2 + 1, icon, isFlipped: false, isMatched: false, pairId: i }
      );
    }
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Update card IDs after shuffle
    cards.forEach((card, index) => {
      card.id = index;
    });
    
    return cards;
  }, []);

  // Start a new game
  const startGame = useCallback((level: number = 1) => {
    const cards = initializeCards(level);
    setGameState({
      currentLevel: level,
      score: 0,
      moves: 0,
      timeElapsed: 0,
      cards,
      flippedCards: [],
      matchedPairs: [],
      gameStatus: 'playing'
    });
  }, [initializeCards]);

  // Handle card click
  const handleCardClick = useCallback((cardId: number) => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'playing') return prevState;
      
      const card = prevState.cards[cardId];
      if (card.isFlipped || card.isMatched || prevState.flippedCards.length >= 2) {
        return prevState;
      }

      const newFlippedCards = [...prevState.flippedCards, cardId];
      const newCards = prevState.cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      );
      const newMoves = prevState.moves + 1;

      // Check for match if two cards are flipped
      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards;
        const firstCard = newCards[firstCardId];
        const secondCard = newCards[secondCardId];
        
        if (firstCard.pairId === secondCard.pairId) {
          // Match found - play success sound
          playMatchSuccess();
          
          const matchedCards = newCards.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isMatched: true } : c
          );
          
          const newMatchedPairs = [...prevState.matchedPairs, firstCard.pairId];
          const baseScore = 100;
          const timeBonus = Math.max(0, 50 - prevState.timeElapsed);
          const moveBonus = Math.max(0, 100 - newMoves * 2);
          const levelMultiplier = prevState.currentLevel;
          const matchScore = (baseScore + timeBonus + moveBonus) * levelMultiplier;
          
          const isLevelComplete = newMatchedPairs.length === prevState.cards.length / 2;
          
          // Play level complete sound if game is finished
          if (isLevelComplete) {
            setTimeout(() => playLevelComplete(), 500);
          }
          
          return {
            ...prevState,
            cards: matchedCards,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            score: prevState.score + matchScore,
            gameStatus: isLevelComplete ? 'completed' : 'playing'
          };
        } else {
          // No match - play fail sound and flip cards back after delay
          setTimeout(() => playMatchFail(), 600);
          
          setTimeout(() => {
            setGameState(currentState => ({
              ...currentState,
              cards: currentState.cards.map(c => 
                c.id === firstCardId || c.id === secondCardId 
                  ? { ...c, isFlipped: false } : c
              ),
              flippedCards: []
            }));
          }, 1000);
          
          return {
            ...prevState,
            cards: newCards,
            flippedCards: newFlippedCards,
            moves: newMoves
          };
        }
      }

      return {
        ...prevState,
        cards: newCards,
        flippedCards: newFlippedCards,
        moves: newMoves
      };
    });
  }, []);

  // Pause/Resume game
  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
  }, []);

  // Complete game and update progress
  const completeGame = useCallback(() => {
    if (gameState.gameStatus !== 'completed') return;
    
    setPlayerProgress(prev => {
      const newProgress = {
        ...prev,
        hasPlayed: true,
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        bestScore: Math.max(prev.bestScore, gameState.score),
        highestLevel: Math.max(prev.highestLevel, gameState.currentLevel),
        averageTime: prev.totalGamesPlayed > 0 
          ? Math.round((prev.averageTime * prev.totalGamesPlayed + gameState.timeElapsed) / (prev.totalGamesPlayed + 1))
          : gameState.timeElapsed
      };
      return newProgress;
    });
  }, [gameState, setPlayerProgress]);

  // Get level configuration
  const getLevelConfig = useCallback((level: number): LevelConfig => {
    return LEVEL_CONFIGS[level - 1] || LEVEL_CONFIGS[LEVEL_CONFIGS.length - 1];
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
      setGameTimer(timer);
      return () => clearInterval(timer);
    } else if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }
  }, [gameState.gameStatus]);

  // Complete game effect
  useEffect(() => {
    if (gameState.gameStatus === 'completed') {
      completeGame();
    }
  }, [gameState.gameStatus, completeGame]);

  return {
    gameState,
    playerProgress,
    startGame,
    handleCardClick,
    pauseGame,
    resumeGame,
    getLevelConfig
  };
}