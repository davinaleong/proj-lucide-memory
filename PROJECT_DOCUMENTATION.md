# Lucide Memory - Project Documentation

## Overview
Lucide Memory is a React-based memory card matching game featuring a progressive difficulty system, scoring mechanics, and an immersive visual design with pattern backgrounds and audio feedback.

## Project Structure
```
proj-lucide-memory/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/Montserrat/
│   │   └── images/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## Technology Stack
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **Styling**: CSS3 with custom properties
- **Typography**: Montserrat font family
- **Icons**: Lucide React (for card symbols)

---

## Game Flow & User Experience

### Page 1: Welcome Screen
**Purpose**: Entry point for both new and returning players

#### For First-Time Players
- **Title**: "Lucide Memory"
- **Welcome Message**: 
  ```
  Welcome to Lucide Memory!
  Test your memory skills by matching pairs of cards.
  Start with easy levels and progress to more challenging ones!
  ```
- **Action**: `[START]` button

#### For Returning Players
- **Title**: "Lucide Memory"
- **Welcome Back Message**: 
  ```
  Welcome back, Memory Master!
  Ready to continue your journey?
  ```
- **Action**: `[START]` button

**Visual Design**:
- Uses `bg-middle` repeatable pattern background
- Centered layout with game branding
- Smooth transition animations

---

### Page 2: Player Dashboard
**Purpose**: Show progress and allow game mode selection (returning players only)

#### Display Elements
- **Previous Level**: Shows the highest level achieved
- **Previous Score**: Displays the best score from previous sessions
- **Actions**: 
  - `[CONTINUE]` - Resume from last level
  - `[NEW GAME]` - Start fresh from level 1

**Data Persistence**:
- Player progress stored in localStorage
- Score history maintained across sessions
- Level progression tracked

**Visual Design**:
- Uses `bg-middle` repeatable pattern background
- Card-based layout showing stats
- Progress indicators

---

### Page 3: Game Screen
**Purpose**: Main gameplay interface

#### Game Information Panel
- **Level**: Current difficulty level (affects grid size and card count)
- **Score**: Current session score with point calculations
- **Moves**: Number of card flips made
- **Time**: Elapsed game time (MM:SS format)

#### Game Area
- **Cards Grid**: Dynamic layout based on level
  - Level 1: 4x3 grid (12 cards, 6 pairs)
  - Level 2: 4x4 grid (16 cards, 8 pairs)
  - Level 3: 6x4 grid (24 cards, 12 pairs)
  - Level 4+: Progressively larger grids

#### Progress Indicator
- **Progress Bar**: Shows completion percentage
- Visual feedback for matched pairs
- Level completion celebrations

**Visual Design**:
- `bg-top`: Pattern for upper section (game info)
- `bg-bottom`: Pattern for lower section (controls/progress)
- Clean card grid in center area
- Responsive layout for different screen sizes

---

## Visual Design System

### Background Patterns

#### bg-middle
- **Usage**: Pages 1 & 2 backgrounds
- **Type**: Repeatable seamless pattern
- **Style**: Subtle, non-distracting texture
- **Implementation**: CSS background-image with repeat

#### bg-top  
- **Usage**: Top section of game page (Page 3)
- **Type**: Horizontal decorative pattern
- **Elements**: Game info backdrop
- **Style**: Complements game UI elements

#### bg-bottom
- **Usage**: Bottom section of game page (Page 3)  
- **Type**: Horizontal decorative pattern
- **Elements**: Progress bar and controls backdrop
- **Style**: Grounding visual element

### Typography
- **Primary Font**: Montserrat
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Usage**: 
  - Headers: Bold
  - Body text: Regular
  - UI elements: Medium

### Color Scheme
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --background: #f8fafc;
  --surface: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
}
```

---

## Game Mechanics

### Scoring System
- **Base Points**: 100 per matched pair
- **Time Bonus**: Faster matches = higher multiplier
- **Move Penalty**: Fewer moves = bonus points
- **Level Multiplier**: Higher levels = increased point values

### Difficulty Progression
1. **Level 1**: 6 pairs, basic icons
2. **Level 2**: 8 pairs, similar icons
3. **Level 3**: 12 pairs, complex patterns
4. **Level 4+**: Increased pairs, advanced challenges

### Card Matching Logic
- Two-card selection system
- Flip animation with reveal delay
- Match validation and feedback
- Auto-flip back on mismatch

---

## Audio & Sound Design

### Background Music
- **Status**: TBC (To Be Confirmed)
- **Style**: Ambient, non-intrusive
- **Loop**: Seamless background track
- **Volume**: User-controllable

### Sound Effects
- **Status**: TBC (To Be Confirmed)
- **Card Flip**: Subtle click/whoosh sound
- **Match Success**: Positive chime
- **Match Failure**: Gentle negative tone
- **Level Complete**: Celebration sound
- **UI Interactions**: Button clicks, hover effects

### Audio Implementation
- HTML5 Audio API or Web Audio API
- Preloaded sound assets
- Mute/unmute toggle
- Volume controls

---

## Technical Implementation

### State Management
```typescript
interface GameState {
  currentLevel: number;
  score: number;
  moves: number;
  timeElapsed: number;
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number[];
  gameStatus: 'playing' | 'paused' | 'completed';
}

interface PlayerProgress {
  highestLevel: number;
  bestScore: number;
  totalGamesPlayed: number;
  averageTime: number;
}
```

### Component Architecture
```
App
├── Router
│   ├── WelcomeScreen
│   ├── PlayerDashboard
│   └── GameScreen
│       ├── GameHeader
│       ├── CardGrid
│       │   └── Card
│       └── ProgressBar
└── SharedComponents
    ├── Button
    ├── Modal
    └── AudioController
```

### Data Persistence
- **LocalStorage**: Player progress and preferences
- **Session Storage**: Current game state
- **Format**: JSON serialization

---

## Development Roadmap

### Phase 1: Core Game (MVP)
- [ ] Basic card matching gameplay
- [ ] Three-page navigation system
- [ ] Score tracking
- [ ] Level progression

### Phase 2: Enhanced UX
- [ ] Background patterns implementation
- [ ] Smooth animations and transitions
- [ ] Responsive design
- [ ] Progress persistence

### Phase 3: Audio Integration
- [ ] Sound effect implementation
- [ ] Background music system
- [ ] Audio controls
- [ ] Performance optimization

### Phase 4: Advanced Features
- [ ] Multiple difficulty modes
- [ ] Achievement system
- [ ] Leaderboards
- [ ] Social sharing

---

## File Structure Plan

### Components
```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   ├── game/
│   │   ├── Card.tsx
│   │   ├── CardGrid.tsx
│   │   ├── GameHeader.tsx
│   │   └── ProgressBar.tsx
│   └── pages/
│       ├── WelcomeScreen.tsx
│       ├── PlayerDashboard.tsx
│       └── GameScreen.tsx
```

### Styles
```
src/styles/
├── globals.css
├── components/
├── pages/
└── patterns/
    ├── bg-middle.css
    ├── bg-top.css
    └── bg-bottom.css
```

### Assets
```
src/assets/
├── images/
│   ├── patterns/
│   ├── icons/
│   └── backgrounds/
├── sounds/
│   ├── effects/
│   └── music/
└── fonts/
    └── Montserrat/
```

---

## Performance Considerations

### Optimization Strategies
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Route-based lazy loading
- **Audio Preloading**: Essential sounds only
- **Animation Performance**: CSS transforms over layout changes

### Browser Compatibility
- **Target**: Modern browsers (ES2018+)
- **Fallbacks**: Progressive enhancement approach
- **Testing**: Chrome, Firefox, Safari, Edge

---

## Accessibility Features

### Implementation Goals
- **Keyboard Navigation**: Full game playable without mouse
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: WCAG 2.1 AA compliance
- **Motion Preferences**: Respect reduced-motion settings
- **Focus Management**: Clear focus indicators

---

This documentation serves as the comprehensive guide for the Lucide Memory project, covering all aspects from user experience to technical implementation details.