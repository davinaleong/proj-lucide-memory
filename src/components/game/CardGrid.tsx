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
      className="game-grid"
      style={{
        '--grid-cols': gridCols
      } as React.CSSProperties}
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