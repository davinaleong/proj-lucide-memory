import React from 'react';
import { Button } from '../common/Button';
import { PageLayout } from '../layout/PageLayout';
import { Trophy, Target, Clock, Play } from 'lucide-react';
import type { PlayerProgress } from '../../types';

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
    <PageLayout variant="centered">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-montserrat font-bold bg-gradient-to-r from-blue via-dark-blue to-sky-blue bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-blue font-montserrat">
          Your memory progress
        </p>
      </div>
        
        {/* Stats Grid */}
        <div className="stats-grid mb-8">
          <div className="bg-gradient-to-br from-slate to-slate-200 rounded-xl p-4 text-center border-2 border-blue shadow-lg transform hover:scale-105 transition-transform">
            <Target className="w-8 h-8 text-blue mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-dark-blue">
              {playerProgress.highestLevel}
            </div>
            <div className="text-sm font-montserrat text-blue">
              Highest Level
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate to-slate-200 rounded-xl p-4 text-center border-2 border-orange shadow-lg transform hover:scale-105 transition-transform">
            <Trophy className="w-8 h-8 text-orange mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-dark-blue">
              {playerProgress.bestScore.toLocaleString()}
            </div>
            <div className="text-sm font-montserrat text-blue">
              Best Score
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate to-slate-200 rounded-xl p-4 text-center border-2 border-sky-blue shadow-lg transform hover:scale-105 transition-transform">
            <Play className="w-8 h-8 text-sky-blue mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-dark-blue">
              {playerProgress.totalGamesPlayed}
            </div>
            <div className="text-sm font-montserrat text-blue">
              Games Played
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate to-slate-200 rounded-xl p-4 text-center border-2 border-blue shadow-lg transform hover:scale-105 transition-transform">
            <Clock className="w-8 h-8 text-blue mx-auto mb-2" />
            <div className="text-2xl font-montserrat font-bold text-dark-blue">
              {formatTime(playerProgress.averageTime)}
            </div>
            <div className="text-sm font-montserrat text-blue">
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
          <div className="text-sm font-montserrat text-blue mb-2">
            Ready for Level {playerProgress.highestLevel + 1}?
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 border-2 border-blue shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue via-sky-blue to-dark-blue rounded-full transition-all duration-500 shadow-lg" 
              style={{ width: `${Math.min((playerProgress.highestLevel / 10) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
    </PageLayout>
  );
};