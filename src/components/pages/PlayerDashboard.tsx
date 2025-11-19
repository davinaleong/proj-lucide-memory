import React from 'react';
import { Button } from '../common/Button';
import { Trophy, Target, Clock, Play } from 'lucide-react';
import { PlayerProgress } from '../../types/game';

interface PlayerDashboardProps {
  playerProgress: PlayerProgress;
  onContinue: () => void;
  onNewGame: () => void;
}

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({
  playerProgress,
  onContinue,
  onNewGame
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 border-2 border-black">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-montserrat font-bold text-black mb-2">
            Player Dashboard
          </h1>
          <p className="text-gray-600 font-montserrat">
            Your memory mastery progress
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-300">
            <Target className="w-8 h-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-black">
              {playerProgress.highestLevel}
            </div>
            <div className="text-sm font-montserrat text-gray-600">
              Highest Level
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-300">
            <Trophy className="w-8 h-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-black">
              {playerProgress.bestScore.toLocaleString()}
            </div>
            <div className="text-sm font-montserrat text-gray-600">
              Best Score
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-300">
            <Play className="w-8 h-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-black">
              {playerProgress.totalGamesPlayed}
            </div>
            <div className="text-sm font-montserrat text-gray-600">
              Games Played
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-300">
            <Clock className="w-8 h-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-black">
              {formatTime(playerProgress.averageTime)}
            </div>
            <div className="text-sm font-montserrat text-gray-600">
              Avg. Time
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full"
          >
            CONTINUE
          </Button>
          
          <Button
            onClick={onNewGame}
            variant="outline"
            size="lg"
            className="w-full"
          >
            NEW GAME
          </Button>
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="text-sm font-montserrat text-gray-500 mb-2">
            Ready for Level {playerProgress.highestLevel + 1}?
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 border border-gray-300">
            <div 
              className="h-full bg-black rounded-full" 
              style={{ width: `${Math.min((playerProgress.highestLevel / 10) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};