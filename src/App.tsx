import { useState, useEffect, useCallback } from 'react';
import { WelcomeScreen, PlayerDashboard, GameScreen } from './components';
import { useGameLogic } from './hooks';
import { useGameAudio } from './hooks/useAudio';
import './App.css';

type GameView = 'welcome' | 'dashboard' | 'game';

function App() {
  const [currentView, setCurrentView] = useState<GameView>('welcome');
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const {
    gameState,
    playerProgress,
    startGame,
    handleCardClick,
    pauseGame,
    resumeGame,
    getLevelConfig
  } = useGameLogic();

  const { playBackgroundMusic, stopBackgroundMusic } = useGameAudio();

  // Navigation handlers with useCallback for performance
  const handleStart = useCallback(() => {
    if (playerProgress?.hasPlayed) {
      setCurrentView('dashboard');
    } else {
      startGame(1);
      setCurrentView('game');
    }
  }, [playerProgress?.hasPlayed, startGame]);

  const handleContinue = useCallback(() => {
    startGame(playerProgress?.highestLevel || 1);
    setCurrentView('game');
  }, [playerProgress?.highestLevel, startGame]);

  const handleNewGame = useCallback(() => {
    startGame(1);
    setCurrentView('game');
  }, [startGame]);

  const handleHome = useCallback(() => {
    setCurrentView('welcome');
    setShowPauseModal(false);
    setShowCompletionModal(false);
    stopBackgroundMusic(); // Stop music when leaving game
  }, [stopBackgroundMusic]);

  const handlePause = useCallback(() => {
    pauseGame();
    setShowPauseModal(true);
  }, [pauseGame]);

  const handleResume = useCallback(() => {
    resumeGame();
    setShowPauseModal(false);
  }, [resumeGame]);

  const handleNextLevel = useCallback(() => {
    const nextLevel = gameState.currentLevel + 1;
    startGame(nextLevel);
    setShowCompletionModal(false);
  }, [gameState.currentLevel, startGame]);

  const handlePlayAgain = useCallback(() => {
    startGame(gameState.currentLevel);
    setShowCompletionModal(false);
  }, [gameState.currentLevel, startGame]);

  // Handle game completion
  useEffect(() => {
    if (gameState.gameStatus === 'completed') {
      setShowCompletionModal(true);
    }
  }, [gameState.gameStatus]);

  // Start background music when entering game page, stop when leaving
  useEffect(() => {
    if (currentView === 'game') {
      const startGameMusic = async () => {
        try {
          await playBackgroundMusic();
          setHasUserInteracted(true);
          console.log('Background music started on game page');
        } catch (error) {
          console.log('Failed to start background music on game page:', error);
        }
      };

      startGameMusic();
    } else {
      // Stop background music when not on game page
      stopBackgroundMusic();
      console.log('Background music stopped - left game page');
    }
  }, [currentView, playBackgroundMusic, stopBackgroundMusic]);

  // Handle user interaction to start music if on game page and not already playing
  useEffect(() => {
    const handleGamePageInteraction = async () => {
      if (currentView === 'game' && !hasUserInteracted) {
        try {
          await playBackgroundMusic();
          setHasUserInteracted(true);
          console.log('Background music started after user interaction on game page');
        } catch (error) {
          console.warn('Failed to start background music after user interaction:', error);
        }
      }
    };

    if (currentView === 'game' && !hasUserInteracted) {
      const events = ['click', 'touchstart', 'keydown'];
      events.forEach(event => {
        document.addEventListener(event, handleGamePageInteraction, { once: true });
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleGamePageInteraction);
        });
      };
    }
  }, [currentView, hasUserInteracted, playBackgroundMusic]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (currentView === 'game' && gameState.gameStatus === 'playing') {
          handlePause();
        } else if (showPauseModal) {
          handleResume();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentView, gameState.gameStatus, showPauseModal, handlePause, handleResume]);

  // Get current level configuration
  const levelConfig = getLevelConfig(gameState.currentLevel);

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return (
          <WelcomeScreen
            playerProgress={playerProgress}
            onStart={handleStart}
          />
        );
      
      case 'dashboard':
        return playerProgress ? (
          <PlayerDashboard
            playerProgress={playerProgress}
            onContinue={handleContinue}
            onNewGame={handleNewGame}
          />
        ) : null;
      
      case 'game':
        return (
          <GameScreen
            gameState={gameState}
            gridCols={levelConfig.gridCols}
            onCardClick={handleCardClick}
            onPause={handlePause}
            onHome={handleHome}
            onResume={handleResume}
            showPauseModal={showPauseModal}
            showCompletionModal={showCompletionModal}
            onNextLevel={handleNextLevel}
            onPlayAgain={handlePlayAgain}
          />
        );
      
      default:
        return (
          <WelcomeScreen
            playerProgress={playerProgress}
            onStart={handleStart}
          />
        );
    }
  };

  return (
    <div className="App font-montserrat min-h-screen bg-gray-100">
      {renderCurrentView()}
    </div>
  );
}

export default App;
