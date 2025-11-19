import React from 'react';
import * as Icons from 'lucide-react';
import type { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  onClick: (cardId: number) => void;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled = false }) => {
  const IconComponent = (Icons as any)[card.icon] || Icons.Circle;
  
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-full aspect-square rounded-lg border-2 cursor-pointer
        transition-all duration-300 transform hover:scale-105
        ${card.isFlipped || card.isMatched 
          ? 'bg-white border-black' 
          : 'bg-black border-gray-300 hover:border-gray-500'
        }
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${card.isMatched ? 'ring-2 ring-gray-400' : ''}
      `}
    >
      {/* Card Back */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center rounded-lg
          transition-opacity duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <div className="w-8 h-8 bg-white rounded opacity-20"></div>
      </div>
      
      {/* Card Front */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center rounded-lg
          transition-opacity duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <IconComponent className="w-8 h-8 text-black" />
      </div>
    </div>
  );
};