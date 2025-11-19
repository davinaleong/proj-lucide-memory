import React, { useState } from 'react';
import { WelcomeScreen, PlayerDashboard, GameScreen } from './components';
import { useGameLogic } from './hooks';
import './App.css';

type GameView = 'welcome' | 'dashboard' | 'game';

function App() {
  const [currentView, setCurrentView] = useState<GameView>('welcome');
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  const {
    gameState,
    playerProgress,
    startGame,
    handleCardClick,
    pauseGame,
    resumeGame,
    getLevelConfig
  } = useGameLogic();

  // Navigation handlers
  const handleStart = () => {
    if (playerProgress?.hasPlayed) {
      setCurrentView('dashboard');
    } else {
      startGame(1);
      setCurrentView('game');
    }
  };

  const handleContinue = () => {
    startGame(playerProgress?.highestLevel || 1);
    setCurrentView('game');
  };

  const handleNewGame = () => {
    startGame(1);
    setCurrentView('game');
  };

  const handleHome = () => {
    setCurrentView('welcome');
    setShowPauseModal(false);
    setShowCompletionModal(false);
  };

  const handlePause = () => {
    pauseGame();
    setShowPauseModal(true);
  };

  const handleResume = () => {
    resumeGame();
    setShowPauseModal(false);
  };

  const handleNextLevel = () => {
    const nextLevel = gameState.currentLevel + 1;
    startGame(nextLevel);
    setShowCompletionModal(false);
  };

  const handlePlayAgain = () => {
    startGame(gameState.currentLevel);
    setShowCompletionModal(false);
  };

  // Handle game completion
  React.useEffect(() => {
    if (gameState.gameStatus === 'completed') {
      setShowCompletionModal(true);
    }
  }, [gameState.gameStatus]);

  // Get current level configuration
  const levelConfig = getLevelConfig(gameState.currentLevel);

  return (
    <div className="App font-montserrat">
      {currentView === 'welcome' && (
        <WelcomeScreen
          playerProgress={playerProgress}
          onStart={handleStart}
        />
      )}
      
      {currentView === 'dashboard' && playerProgress && (
        <PlayerDashboard
          playerProgress={playerProgress}
          onContinue={handleContinue}
          onNewGame={handleNewGame}
        />
      )}
      
      {currentView === 'game' && (
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
      )}
    </div>
  );
}

export default App;
