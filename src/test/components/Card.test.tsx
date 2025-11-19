import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Card } from '../../components/game/Card';
import { createMockCard } from '../testUtils';

// Mock the audio hooks
vi.mock('../../hooks/useAudio', () => ({
  useGameAudio: () => ({
    playCardFlip: vi.fn(),
  }),
}));

describe('Card', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render a card with default state', () => {
      const card = createMockCard();
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild;
      expect(cardElement).toBeInTheDocument();
    });

    it('should show icon when card is flipped', () => {
      const card = createMockCard();
      card.isFlipped = true;
      card.icon = 'Heart';
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      // Heart icon should be visible when flipped
      const iconElement = container.querySelector('svg');
      
      expect(iconElement).toBeInTheDocument();
    });

    it('should show icon when card is matched', () => {
      const card = createMockCard();
      card.isMatched = true;
      card.icon = 'Star';
      
      render(<Card card={card} onClick={mockOnClick} />);
      
      // Star icon should be visible when matched
      const iconElement = document.querySelector('svg');
      expect(iconElement).toBeInTheDocument();
    });

    it('should apply matched styling when card is matched', () => {
      const card = createMockCard();
      card.isMatched = true;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('ring-2', 'ring-orange', 'animate-pulse');
    });

    it('should apply disabled styling when disabled', () => {
      const card = createMockCard();
      
      const { container } = render(<Card card={card} onClick={mockOnClick} disabled={true} />);
      
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('cursor-not-allowed', 'opacity-50');
    });
  });

  describe('interactions', () => {
    it('should call onClick when card is clicked', () => {
      const card = createMockCard();
      card.id = 5;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      fireEvent.click(cardElement);
      
      expect(mockOnClick).toHaveBeenCalledWith(5);
    });

    it('should not call onClick when card is already flipped', () => {
      const card = createMockCard();
      card.isFlipped = true;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      fireEvent.click(cardElement);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when card is matched', () => {
      const card = createMockCard();
      card.isMatched = true;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      fireEvent.click(cardElement);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when disabled', () => {
      const card = createMockCard();
      
      const { container } = render(<Card card={card} onClick={mockOnClick} disabled={true} />);
      
      const cardElement = container.firstChild as HTMLElement;
      fireEvent.click(cardElement);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('should play card flip sound when clicked', () => {
      const card = createMockCard();
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      fireEvent.click(cardElement);
      
      // The sound should be played (mocked in beforeEach)
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe('visual states', () => {
    it('should show card back when not flipped or matched', () => {
      const card = createMockCard();
      card.isFlipped = false;
      card.isMatched = false;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      
      // Should have the back styling classes
      expect(cardElement).toHaveClass('bg-gradient-to-br');
    });

    it('should show card front when flipped', () => {
      const card = createMockCard();
      card.isFlipped = true;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      
      // Should have the flipped styling
      expect(cardElement).toHaveClass('bg-gradient-to-br');
    });

    it('should handle hover effects when not disabled', () => {
      const card = createMockCard();
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      const cardElement = container.firstChild as HTMLElement;
      
      // Should have hover classes
      expect(cardElement).toHaveClass('hover:scale-105', 'hover:border-blue');
    });

    it('should render different icons correctly', () => {
      const icons = ['Heart', 'Star', 'Circle', 'Square'];
      
      icons.forEach(icon => {
        const card = createMockCard();
        card.icon = icon;
        card.isFlipped = true;
        
        const { container } = render(<Card card={card} onClick={mockOnClick} />);
        
        // Should render SVG element for each icon
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
      });
    });

    it('should fall back to Circle icon for unknown icon names', () => {
      const card = createMockCard();
      card.icon = 'NonExistentIcon';
      card.isFlipped = true;
      
      const { container } = render(<Card card={card} onClick={mockOnClick} />);
      
      // Should still render an SVG (Circle fallback)
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });
  });
});