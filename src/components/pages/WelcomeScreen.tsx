import React from 'react';
import { Button } from '../common/Button';
import { PlayerProgress } from '../../types/game';

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center border-2 border-black">
        {/* Title */}
        <h1 className="text-4xl font-montserrat font-bold text-black mb-6">
          Lucide Memory
        </h1>
        
        {/* Welcome Message */}
        <div className="mb-8">
          {isReturningPlayer ? (
            <div>
              <h2 className="text-xl font-montserrat font-medium text-black mb-4">
                Welcome back, Memory Master!
              </h2>
              <p className="text-gray-600 font-montserrat">
                Ready to continue your journey?
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-montserrat font-medium text-black mb-4">
                Welcome to Lucide Memory!
              </h2>
              <p className="text-gray-600 font-montserrat mb-2">
                Test your memory skills by matching pairs of cards.
              </p>
              <p className="text-gray-600 font-montserrat">
                Start with easy levels and progress to more challenging ones!
              </p>
            </div>
          )}
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
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};