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

### Background Music (Auto-plays on app start)
**Current Files Available:**
- `Calm-Beauty_AdobeStock_1773129888.wav` - Peaceful ambient track
- `Easy-Vibes_AdobeStock_1773129821.wav` - Relaxed background music  
- `Steady-Focus_AdobeStock_1801511466.wav` - Concentration-focused ambient music

**Sound Manager Configuration:**
- **Primary Track**: `Steady-Focus_AdobeStock_1801511466.wav` (default, plays first)
- **Fallback Tracks**: `Calm-Beauty_AdobeStock_1773129888.wav`, `Easy-Vibes_AdobeStock_1773129821.wav`
- **Auto-Play Behavior**: 
  - Starts automatically when entering the game page (not on app launch)
  - If browser blocks autoplay, waits for first user interaction on the game page
  - Loops continuously during gameplay
  - Automatically stops when leaving the game page (returning to welcome/dashboard)
- **Format**: Ambient, non-intrusive music designed for concentration and focus
- **Volume**: Set to 20% by default, adjustable via in-game volume controls
- **Performance**: WAV files are preloaded for instant playback without delay

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
- ✅ **Auto-playing background music** using current WAV files
- ✅ Automatic audio pause when browser tab is hidden
- ✅ Integration with game components (Card flips, button clicks, match feedback)
- ✅ Audio controls UI in game screen for user control
- ✅ Browser autoplay policy handling with user interaction fallback

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

## Current Audio Assets Details

### Background Music Tracks (Adobe Stock Licensed)
1. **Steady Focus** (`Steady-Focus_AdobeStock_1801511466.wav`)
   - **Style**: Concentration-focused ambient music
   - **Usage**: Primary background track (plays first)
   - **Mood**: Calm, steady, promotes focus

2. **Calm Beauty** (`Calm-Beauty_AdobeStock_1773129888.wav`)
   - **Style**: Peaceful ambient soundscape
   - **Usage**: Fallback track #1
   - **Mood**: Serene, beautiful, relaxing

3. **Easy Vibes** (`Easy-Vibes_AdobeStock_1773129821.wav`)
   - **Style**: Relaxed background music
   - **Usage**: Fallback track #2  
   - **Mood**: Easy-going, laid-back, comfortable

**Auto-Play Sequence**: The sound manager attempts to play tracks in order (Steady Focus → Calm Beauty → Easy Vibes) and uses the first successfully loaded track for continuous looping during gameplay. Music automatically stops when returning to the welcome screen or dashboard.