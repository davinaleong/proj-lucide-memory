import React from 'react';
import { Button } from '../common/Button';
import { AudioControls } from '../common/AudioControls';
import type { PlayerProgress } from '../../types';

interface WelcomeScreenProps {
  playerProgress: PlayerProgress | null;
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  playerProgress,
  onStart
}) => {
  const isReturningPlayer = playerProgress?.hasPlayed;

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl min-w-sm max-w-md w-full p-4 sm:p-8 text-center border-2 border-blue backdrop-blur-sm">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-montserrat font-bold bg-gradient-to-r from-blue via-dark-blue to-sky-blue bg-clip-text text-transparent mb-4 sm:mb-6">
          Lucide Memory
        </h1>
        
        {/* Welcome Message */}
        <div className="mb-4">
          {isReturningPlayer ? (
            <div>
              <h2 className="text-lg sm:text-xl font-montserrat font-medium text-dark-blue mb-3 sm:mb-4">
                Welcome back, Memory Master!
              </h2>
              <p className="text-sm sm:text-base text-blue font-montserrat">
                Ready to continue your journey?
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-montserrat font-medium text-dark-blue mb-4">
                Welcome to Lucide Memory!
              </h2>
              <p className="text-blue font-montserrat mb-2">
                Test your memory skills by matching pairs of cards.
              </p>
              <p className="text-blue font-montserrat">
                Start with easy levels and progress to more challenging ones!
              </p>
            </div>
          )}
        </div>
        
        {/* Audio Controls */}
        <div className="mb-6 p-4 bg-slate rounded-lg border-2 border-slate-200">
          <AudioControls 
            showBackgroundMusicToggle={true}
            showVolumeSlider={true}
            className="justify-center"
          />
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full"
        >
          START
        </Button>
        
        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue to-dark-blue rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-sky-blue to-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-orange to-blue rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};