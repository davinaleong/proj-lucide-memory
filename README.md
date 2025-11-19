# Lucide Memory

A React-based memory card matching game featuring progressive difficulty, scoring mechanics, and immersive visual design with pattern backgrounds.

## 🎮 Game Overview

Test your memory skills by matching pairs of cards! Start with easy levels and progress to more challenging ones as you become a Memory Master.

### Game Features

- **Progressive Difficulty**: Multiple levels with increasing complexity
- **Smart Scoring System**: Points based on speed, accuracy, and level
- **Player Progress**: Your achievements are saved between sessions
- **Responsive Design**: Play on any device
- **Immersive Visuals**: Beautiful pattern backgrounds and smooth animations
- **Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davinaleong/proj-lucide-memory.git
cd proj-lucide-memory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Tech Stack

- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **Styling**: CSS3 with custom properties
- **Typography**: Montserrat font family
- **Icons**: Lucide React (for card symbols)

## 🎯 Game Flow

### Welcome Screen
- Entry point for new and returning players
- Different welcome messages based on player history
- Single **START** button to begin

### Player Dashboard _(Returning Players)_
- Shows previous level achieved
- Displays best score from previous sessions
- Options to **CONTINUE** or start a **NEW GAME**

### Game Screen
- **Level indicator** and **Score tracking**
- **Move counter** and **Timer** (MM:SS format)
- Dynamic **Cards Grid** that grows with difficulty:
  - Level 1: 4×3 grid (6 pairs)
  - Level 2: 4×4 grid (8 pairs) 
  - Level 3: 6×4 grid (12 pairs)
  - Level 4+: Progressively larger grids
- **Progress Bar** showing completion percentage

## 🎨 Design System

### Visual Elements
- **bg-middle**: Repeatable pattern for welcome and dashboard screens
- **bg-top**: Decorative pattern for game screen header
- **bg-bottom**: Decorative pattern for game screen footer
- **Montserrat**: Primary typography in Regular (400), Medium (500), and Bold (700)

### Color Palette
```css
--primary-color: #6366f1    /* Indigo */
--secondary-color: #8b5cf6  /* Purple */  
--accent-color: #06b6d4     /* Cyan */
--success-color: #10b981    /* Emerald */
--warning-color: #f59e0b    /* Amber */
--error-color: #ef4444      /* Red */
```

## 📊 Scoring & Progression

### Point System
- **Base Points**: 100 per matched pair
- **Time Bonus**: Faster matches earn multipliers
- **Move Efficiency**: Fewer moves = bonus points
- **Level Multiplier**: Higher levels = increased rewards

### Difficulty Levels
1. **Level 1**: 6 pairs, basic icons
2. **Level 2**: 8 pairs, similar icons  
3. **Level 3**: 12 pairs, complex patterns
4. **Level 4+**: Increased pairs, advanced challenges

## 💾 Data Persistence

- **Player Progress**: Stored in localStorage
- **Session Data**: Maintained in sessionStorage
- **Cross-Session**: Your achievements persist between visits

## 🔧 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── game/           # Game-specific components  
│   └── pages/          # Page components
├── styles/             # CSS modules and patterns
├── assets/
│   ├── fonts/          # Montserrat font files
│   ├── images/         # Game assets and patterns
│   └── sounds/         # Audio files (planned)
└── utils/              # Helper functions
```

## 🚧 Development Roadmap

- [x] **Phase 1**: Core game mechanics and navigation
- [ ] **Phase 2**: Enhanced UX with patterns and animations  
- [ ] **Phase 3**: Audio integration (music & sound effects)
- [ ] **Phase 4**: Advanced features (achievements, leaderboards)

## 📖 Documentation

For detailed technical documentation, game mechanics, and design specifications, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`) 
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Icons powered by [Lucide React](https://lucide.dev/)
- Typography by [Google Fonts](https://fonts.google.com/)
