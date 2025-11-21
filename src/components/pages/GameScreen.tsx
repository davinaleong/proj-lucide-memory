import React from 'react';
import { CardGrid } from '../game/CardGrid';
import { ProgressBar } from '../game/ProgressBar';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { AudioControls } from '../common/AudioControls';
import { PageLayout } from '../layout/PageLayout';
import { Menu, Home, Trophy, Clock, MousePointer, Target } from 'lucide-react';
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
  const [showGameMenu, setShowGameMenu] = React.useState(false);
  const totalPairs = gameState.cards.length / 2;
  const matchedPairs = gameState.matchedPairs.length;
  const isGameDisabled = gameState.gameStatus !== 'playing';

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PageLayout variant="fullscreen">
      {/* Simplified Header */}
      <div className="bg-gradient-to-r from-slate via-white to-slate-200 border-b-2 border-blue shadow-lg">
        <div className="flex justify-between items-center p-3 sm:p-4">
          <Button
            onClick={() => setShowGameMenu(true)}
            variant="outline"
            size="sm"
            className="flex items-center justify-center space-x-1 min-w-[3rem] rounded-sm"
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-montserrat font-bold bg-gradient-to-r from-blue to-dark-blue bg-clip-text text-transparent">
              Level {gameState.currentLevel}
            </h1>
            <div className="text-sm text-blue font-montserrat">
              {matchedPairs}/{totalPairs} pairs
            </div>
          </div>
          
          <Button
            onClick={onHome}
            variant="outline"
            size="sm"
            className="flex items-center justify-center space-x-1 min-w-[3rem] rounded-sm"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Card Grid - Full Focus */}
      <div className="flex-1 flex items-center justify-center p-4">
        <CardGrid
          cards={gameState.cards}
          onCardClick={onCardClick}
          disabled={isGameDisabled}
          gridCols={gridCols}
        />
      </div>
      
      {/* Game Menu Modal */}
      <Modal
        isOpen={showGameMenu}
        onClose={() => setShowGameMenu(false)}
        title="Game Menu"
      >
        <div className="space-y-6">
          {/* Game Stats */}
          <div>
            <h3 className="text-lg font-montserrat font-bold text-dark-blue mb-3">Statistics</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="flex items-center space-x-2 bg-gradient-to-br from-white to-slate rounded-sm p-2 sm:p-3 border border-blue shadow-md min-w-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-montserrat text-blue uppercase tracking-wide">Score</div>
                  <div className="text-sm sm:text-lg font-montserrat font-bold text-dark-blue truncate">{gameState.score.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-br from-white to-slate rounded-sm p-2 sm:p-3 border border-blue shadow-md min-w-0">
                <MousePointer className="w-4 h-4 sm:w-5 sm:h-5 text-sky-blue flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-montserrat text-blue uppercase tracking-wide">Moves</div>
                  <div className="text-sm sm:text-lg font-montserrat font-bold text-dark-blue truncate">{gameState.moves}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-br from-white to-slate rounded-sm p-2 sm:p-3 border border-blue shadow-md min-w-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-dark-blue flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-montserrat text-blue uppercase tracking-wide">Time</div>
                  <div className="text-sm sm:text-lg font-montserrat font-bold text-dark-blue truncate">{formatTime(gameState.timeElapsed)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-br from-white to-slate rounded-sm p-2 sm:p-3 border border-blue shadow-md min-w-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-montserrat text-blue uppercase tracking-wide">Progress</div>
                  <div className="text-sm sm:text-lg font-montserrat font-bold text-dark-blue truncate">{matchedPairs}/{totalPairs}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <h3 className="text-lg font-montserrat font-bold text-dark-blue mb-3">Progress</h3>
            <ProgressBar
              current={matchedPairs}
              total={totalPairs}
              label="Pairs Matched"
            />
          </div>

          {/* Audio Controls */}
          <div>
            <h3 className="text-lg font-montserrat font-bold text-dark-blue mb-3">Audio Settings</h3>
            <div className="overflow-hidden">
              <AudioControls 
                showBackgroundMusicToggle={true}
                showVolumeSlider={true}
                className="justify-center flex-wrap"
              />
            </div>
          </div>

          {/* Game Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => {
                setShowGameMenu(false);
                onPause();
              }}
              variant="outline"
              size="lg"
              className="w-full"
            >
              PAUSE GAME
            </Button>
            <Button
              onClick={() => {
                setShowGameMenu(false);
                onHome();
              }}
              variant="outline"
              size="lg"
              className="w-full"
            >
              EXIT TO HOME
            </Button>
          </div>
        </div>
      </Modal>

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
            <div className="bg-gray-100 rounded-sm p-4 border border-gray-300">
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
    </PageLayout>
  );
};