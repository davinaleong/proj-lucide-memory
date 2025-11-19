import React from 'react';
import * as Icons from 'lucide-react';
import type { Card as CardType } from '../../types';
import { useGameAudio } from '../../hooks/useAudio';

interface CardProps {
  card: CardType;
  onClick: (cardId: number) => void;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled = false }) => {
  const IconComponent = (Icons as any)[card.icon] || Icons.Circle;
  const { playCardFlip } = useGameAudio();
  
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      playCardFlip();
      onClick(card.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-full aspect-square rounded-xl border-2 cursor-pointer
        transition-all duration-300 transform hover:scale-105 shadow-lg
        ${card.isFlipped || card.isMatched 
          ? 'bg-gradient-to-br from-slate to-white border-blue shadow-xl' 
          : 'bg-gradient-to-br from-dark-blue via-blue to-sky-blue border-slate hover:border-blue hover:shadow-xl'
        }
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${card.isMatched ? 'ring-2 ring-orange animate-pulse' : ''}
      `}
    >
      {/* Card Back */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center rounded-xl
          transition-opacity duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-slate to-white rounded-full opacity-30 animate-pulse"></div>
      </div>
      
      {/* Card Front */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center rounded-xl
          transition-opacity duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <IconComponent className={`w-8 h-8 ${
          card.isMatched ? 'text-orange animate-bounce' : 'text-blue'
        }`} />
      </div>
    </div>
  );
};