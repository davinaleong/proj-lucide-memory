# Audio Assets for Lucide Memory

This directory contains audio files used by the memory card game. The sound manager expects the following audio files:

## Required Audio Files

### Card Interaction Sounds ✅ **AVAILABLE**
- `card-flip.mp3` - Played when a card is flipped
- `click.mp3` - Played when buttons are clicked

### Game Feedback Sounds ✅ **AVAILABLE**
- `match-success.mp3` - Played when cards match successfully
- `match-fail.mp3` - Played when cards don't match
- `level-completed.mp3` - Played when a level is completed
- `game-over.mp3` - Additional sound for game completion scenarios

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

**Current Implementation**: Using MP3 format for all sound effects
- **MP3**: Widely supported, optimized for web delivery
- **File Sizes**: Optimized for quick loading and minimal bandwidth usage
- **Quality**: High-quality audio suitable for game feedback

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
- ✅ **All SFX files loaded** - Complete audio experience ready

## Current Audio Files Status ✅ **COMPLETE**

**All Required Audio Files Present:**
1. ✅ `card-flip.mp3` - Card interaction sound
2. ✅ `click.mp3` - Button interaction sound  
3. ✅ `match-success.mp3` - Successful match feedback
4. ✅ `match-fail.mp3` - Failed match feedback
5. ✅ `level-completed.mp3` - Level completion celebration
6. ✅ `game-over.mp3` - Additional game completion sound
7. ✅ Background music files (3 WAV tracks)

**File Specifications:**
- Format: MP3 (optimized for web)
- Size: Appropriately sized for quick loading
- Quality: High-fidelity audio for immersive experience

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