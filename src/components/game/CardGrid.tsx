import React from 'react';
import { Card } from './Card';
import { Card as CardType } from '../../types/game';

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
        grid gap-3 w-full max-w-2xl mx-auto p-4
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