# Audio Assets for Lucide Memory

This directory contains audio files used by the memory card game. The sound manager expects the following audio files:

## Required Audio Files

### Card Interaction Sounds
- `card-flip.mp3` / `card-flip.webm` - Played when a card is flipped
- `button-click.mp3` / `button-click.webm` - Played when buttons are clicked

### Game Feedback Sounds  
- `match-success.mp3` / `match-success.webm` - Played when cards match successfully
- `match-fail.mp3` / `match-fail.webm` - Played when cards don't match
- `level-complete.mp3` / `level-complete.webm` - Played when a level is completed

### Background Music
- `background-music.mp3` / `background-music.webm` - Optional looping background music

## Audio Format Notes

The sound manager supports both MP3 and WebM formats for maximum browser compatibility:
- **MP3**: Widely supported, good for short sound effects
- **WebM**: Modern format with better compression, recommended for longer audio

## Implementation Status

The audio system is fully implemented with:
- ✅ Howler.js integration for cross-browser audio support  
- ✅ Volume controls with master volume adjustment
- ✅ Mute/unmute functionality with localStorage persistence
- ✅ Background music controls (play/pause/stop)
- ✅ Automatic audio pause when browser tab is hidden
- ✅ Integration with game components (Card flips, button clicks, match feedback)
- ✅ Audio controls UI in Welcome screen and Game screen

## Adding Audio Files

To add actual audio files:

1. Place audio files in this `/public/sounds/` directory
2. Use the exact filenames listed above
3. Provide both MP3 and WebM versions for best compatibility
4. Keep file sizes reasonable (< 1MB each for sound effects)
5. For background music, consider using HTML5 audio mode for larger files

## Customization

You can modify the sound manager configuration in `src/utils/soundManager.ts`:
- Adjust volume levels for different sound types
- Change audio file paths or add new sound types
- Modify preloading behavior
- Add new audio control features

The game will function normally without audio files, gracefully handling missing resources.