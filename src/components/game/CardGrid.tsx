import React from 'react';
import { Card } from './Card';
import type { Card as CardType } from '../../types';

interface CardGridProps {
  cards: CardType[];
  onCardClick: (cardId: number) => void;
  disabled?: boolean;
  gridCols: number;
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  disabled = false,
  gridCols
}) => {
  return (
    <div 
      className={`
        grid gap-2 w-full p-2
        sm:gap-3 sm:p-4
      `}
      style={{
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={disabled}
        />
      ))}
    </div>
  );
};