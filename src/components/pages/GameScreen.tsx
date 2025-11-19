import React from 'react';
import { GameHeader } from '../game/GameHeader';
import { CardGrid } from '../game/CardGrid';
import { ProgressBar } from '../game/ProgressBar';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Pause, Home } from 'lucide-react';
import type { GameState } from '../../types';

interface GameScreenProps {
  gameState: GameState;
  gridCols: number;
  onCardClick: (cardId: number) => void;
  onPause: () => void;
  onHome: () => void;
  onResume?: () => void;
  showPauseModal?: boolean;
  showCompletionModal?: boolean;
  onNextLevel?: () => void;
  onPlayAgain?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  gridCols,
  onCardClick,
  onPause,
  onHome,
  onResume,
  showPauseModal = false,
  showCompletionModal = false,
  onNextLevel,
  onPlayAgain
}) => {
  const totalPairs = gameState.cards.length / 2;
  const matchedPairs = gameState.matchedPairs.length;
  const isGameDisabled = gameState.gameStatus !== 'playing';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Game Header */}
      <GameHeader
        level={gameState.currentLevel}
        score={gameState.score}
        moves={gameState.moves}
        timeElapsed={gameState.timeElapsed}
      />
      
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <div className="bg-white border-b border-gray-300 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button
              onClick={onHome}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            
            <h2 className="text-xl font-montserrat font-bold text-black">
              Level {gameState.currentLevel}
            </h2>
            
            <Button
              onClick={onPause}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </Button>
          </div>
        </div>
        
        {/* Card Grid */}
        <div className="flex-1 flex items-center justify-center p-4">
          <CardGrid
            cards={gameState.cards}
            onCardClick={onCardClick}
            disabled={isGameDisabled}
            gridCols={gridCols}
          />
        </div>
        
        {/* Progress Section */}
        <div className="bg-white border-t-2 border-black p-6">
          <div className="max-w-2xl mx-auto">
            <ProgressBar
              current={matchedPairs}
              total={totalPairs}
              label="Progress"
            />
          </div>
        </div>
      </div>
      
      {/* Pause Modal */}
      <Modal
        isOpen={showPauseModal}
        onClose={onResume || (() => {})}
        title="Game Paused"
      >
        <div className="text-center">
          <p className="text-gray-600 font-montserrat mb-6">
            Take a break! Your progress is saved.
          </p>
          <div className="space-y-3">
            <Button
              onClick={onResume}
              size="lg"
              className="w-full"
            >
              RESUME
            </Button>
            <Button
              onClick={onHome}
              variant="outline"
              size="lg"
              className="w-full"
            >
              HOME
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Level Completion Modal */}
      <Modal
        isOpen={showCompletionModal}
        onClose={() => {}}
        title="Level Complete!"
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="text-3xl font-montserrat font-bold text-black mb-2">
              🎉
            </div>
            <p className="text-gray-600 font-montserrat mb-4">
              Congratulations! You completed Level {gameState.currentLevel}!
            </p>
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <div className="text-lg font-montserrat font-bold text-black">
                Final Score: {gameState.score.toLocaleString()}
              </div>
              <div className="text-sm font-montserrat text-gray-600">
                Moves: {gameState.moves} | Time: {Math.floor(gameState.timeElapsed / 60)}:{(gameState.timeElapsed % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {onNextLevel && (
              <Button
                onClick={onNextLevel}
                size="lg"
                className="w-full"
              >
                NEXT LEVEL
              </Button>
            )}
            <Button
              onClick={onPlayAgain}
              variant="outline"
              size="lg"
              className="w-full"
            >
              PLAY AGAIN
            </Button>
            <Button
              onClick={onHome}
              variant="outline"
              size="lg"
              className="w-full"
            >
              HOME
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};