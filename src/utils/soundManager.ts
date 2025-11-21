import { Howl } from 'howler';

export type SoundType = 
  | 'cardFlip' 
  | 'matchSuccess' 
  | 'matchFail' 
  | 'levelComplete' 
  | 'gameOver'
  | 'buttonClick' 
  | 'backgroundMusic';

interface SoundConfig {
  src: string[];
  volume?: number;
  loop?: boolean;
  preload?: boolean;
}

class SoundManager {
  private sounds: Map<SoundType, Howl> = new Map();
  private backgroundMusicTracks: Howl[] = [];
  private currentTrackIndex: number = 0;
  private isBackgroundMusicEnabled: boolean = false;
  private isMuted: boolean = false;
  private masterVolume: number = 0.7;

  constructor() {
    this.initializeSounds();
    this.loadSettings();
  }

  private initializeSounds() {
    const soundConfigs: Record<SoundType, SoundConfig> = {
      cardFlip: {
        src: ['/sounds/card-flip.mp3'],
        volume: 0.3,
        preload: true
      },
      matchSuccess: {
        src: ['/sounds/match-success.mp3'],
        volume: 0.5,
        preload: true
      },
      matchFail: {
        src: ['/sounds/match-fail.mp3'],
        volume: 0.4,
        preload: true
      },
      levelComplete: {
        src: ['/sounds/level-completed.mp3'],
        volume: 0.8,
        preload: true
      },
      gameOver: {
        src: ['/sounds/game-over.mp3'],
        volume: 0.7,
        preload: true
      },
      buttonClick: {
        src: ['/sounds/click.mp3'],
        volume: 0.3,
        preload: true
      },
      backgroundMusic: {
        src: ['/sounds/placeholder.mp3'], // Placeholder - we'll create individual tracks
        volume: 0.2,
        loop: false,
        preload: false
      }
    };

    // Create Howl instances for each sound (except background music)
    Object.entries(soundConfigs).forEach(([soundType, config]) => {
      if (soundType !== 'backgroundMusic') {
        const sound = new Howl({
          src: config.src,
          volume: (config.volume || 0.5) * this.masterVolume,
          loop: config.loop || false,
          preload: config.preload || true,
          onloaderror: (_, error) => {
            console.warn(`Failed to load sound: ${soundType}`, error);
          },
          onplayerror: (_, error) => {
            console.warn(`Failed to play sound: ${soundType}`, error);
          }
        });

        this.sounds.set(soundType as SoundType, sound);
      }
    });

    // Initialize background music rotation system
    this.initializeBackgroundMusic();
  }

  private initializeBackgroundMusic() {
    const backgroundTracks = [
      '/sounds/Steady-Focus_AdobeStock_1801511466.wav',
      '/sounds/Calm-Beauty_AdobeStock_1773129888.wav', 
      '/sounds/Easy-Vibes_AdobeStock_1773129821.wav'
    ];

    // Create individual Howl instances for each background track
    this.backgroundMusicTracks = backgroundTracks.map((trackSrc, index) => {
      return new Howl({
        src: [trackSrc],
        volume: 0.2 * this.masterVolume,
        loop: false, // Don't loop individual tracks - we'll handle rotation
        preload: true,
        html5: true, // Use HTML5 for long audio files
        format: ['wav'],
        onend: () => {
          // When current track ends, play the next one
          if (this.isBackgroundMusicEnabled) {
            this.playNextTrack();
          }
        },
        onloaderror: (_, error) => {
          console.warn(`Failed to load background track ${index}:`, error);
        },
        onplayerror: (_, error) => {
          console.warn(`Failed to play background track ${index}:`, error);
          // If current track fails, try the next one
          if (this.isBackgroundMusicEnabled) {
            this.playNextTrack();
          }
        }
      });
    });

    // Shuffle the initial order to add variety
    this.currentTrackIndex = Math.floor(Math.random() * this.backgroundMusicTracks.length);
  }

  private playNextTrack() {
    if (!this.isBackgroundMusicEnabled || this.isMuted || this.backgroundMusicTracks.length === 0) {
      return;
    }

    // Stop current track if playing
    this.stopAllBackgroundTracks();

    // Move to next track (with wraparound)
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.backgroundMusicTracks.length;
    
    // Play the next track
    const nextTrack = this.backgroundMusicTracks[this.currentTrackIndex];
    if (nextTrack) {
      console.log(`Playing background track ${this.currentTrackIndex + 1}/${this.backgroundMusicTracks.length}`);
      nextTrack.play();
    }
  }

  private stopAllBackgroundTracks() {
    this.backgroundMusicTracks.forEach(track => {
      if (track.playing()) {
        track.stop();
      }
    });
  }

  private pauseAllBackgroundTracks() {
    this.backgroundMusicTracks.forEach(track => {
      if (track.playing()) {
        track.pause();
      }
    });
  }

  private resumeCurrentBackgroundTrack() {
    if (!this.isBackgroundMusicEnabled || this.isMuted) return;
    
    const currentTrack = this.backgroundMusicTracks[this.currentTrackIndex];
    if (currentTrack && !currentTrack.playing()) {
      currentTrack.play();
    }
  }

  private updateBackgroundMusicVolume() {
    const volume = this.isMuted ? 0 : 0.2 * this.masterVolume;
    this.backgroundMusicTracks.forEach(track => {
      track.volume(volume);
    });
  }

  private loadSettings() {
    try {
      const savedSettings = localStorage.getItem('lucide-memory-audio-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.isMuted = settings.isMuted || false;
        this.masterVolume = settings.masterVolume || 0.7;
        this.isBackgroundMusicEnabled = settings.isBackgroundMusicEnabled || false;
        this.updateAllVolumes();
      }
    } catch (error) {
      console.warn('Failed to load audio settings:', error);
    }
  }

  private saveSettings() {
    try {
      const settings = {
        isMuted: this.isMuted,
        masterVolume: this.masterVolume,
        isBackgroundMusicEnabled: this.isBackgroundMusicEnabled
      };
      localStorage.setItem('lucide-memory-audio-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save audio settings:', error);
    }
  }

  private updateAllVolumes() {
    this.sounds.forEach((sound, soundType) => {
      const baseVolume = this.getBaseVolume(soundType);
      sound.volume(this.isMuted ? 0 : baseVolume * this.masterVolume);
    });
    // Also update background music tracks
    this.updateBackgroundMusicVolume();
  }

  private getBaseVolume(soundType: SoundType): number {
    const baseVolumes: Record<SoundType, number> = {
      cardFlip: 0.3,
      matchSuccess: 0.5,
      matchFail: 0.4,
      levelComplete: 0.8,
      gameOver: 0.7,
      buttonClick: 0.3,
      backgroundMusic: 0.2
    };
    return baseVolumes[soundType] || 0.5;
  }

  // Public methods
  play(soundType: SoundType): void {
    if (this.isMuted) return;

    const sound = this.sounds.get(soundType);
    if (sound) {
      // Stop previous instance if it's still playing (except background music)
      if (soundType !== 'backgroundMusic') {
        sound.stop();
      }
      sound.play();
    }
  }

  stop(soundType: SoundType): void {
    const sound = this.sounds.get(soundType);
    if (sound) {
      sound.stop();
    }
  }

  pause(soundType: SoundType): void {
    const sound = this.sounds.get(soundType);
    if (sound) {
      sound.pause();
    }
  }

  resume(soundType: SoundType): void {
    const sound = this.sounds.get(soundType);
    if (sound && !this.isMuted) {
      sound.play();
    }
  }

  setVolume(soundType: SoundType, volume: number): void {
    const sound = this.sounds.get(soundType);
    if (sound) {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      sound.volume(this.isMuted ? 0 : clampedVolume * this.masterVolume);
    }
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    this.saveSettings();
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }

  mute(): void {
    this.isMuted = true;
    this.updateAllVolumes();
    this.saveSettings();
  }

  unmute(): void {
    this.isMuted = false;
    this.updateAllVolumes();
    this.saveSettings();
  }

  toggleMute(): void {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  isMutedState(): boolean {
    return this.isMuted;
  }

  // Background music specific methods with rotation
  playBackgroundMusic(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isMuted || this.backgroundMusicTracks.length === 0) {
        resolve();
        return;
      }

      this.isBackgroundMusicEnabled = true;
      this.saveSettings();

      // If already playing, just resolve
      if (this.isBackgroundMusicPlaying()) {
        resolve();
        return;
      }

      // Start playing the current track
      const currentTrack = this.backgroundMusicTracks[this.currentTrackIndex];
      if (currentTrack) {
        try {
          console.log(`Starting background music rotation - Track ${this.currentTrackIndex + 1}/${this.backgroundMusicTracks.length}`);
          const playId = currentTrack.play();
          if (playId !== undefined) {
            resolve();
          } else {
            reject(new Error('Failed to start background music'));
          }
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('No background music tracks available'));
      }
    });
  }

  stopBackgroundMusic(): void {
    this.isBackgroundMusicEnabled = false;
    this.stopAllBackgroundTracks();
    this.saveSettings();
  }

  pauseBackgroundMusic(): void {
    this.pauseAllBackgroundTracks();
  }

  resumeBackgroundMusic(): void {
    if (this.isBackgroundMusicEnabled) {
      this.resumeCurrentBackgroundTrack();
    }
  }

  isBackgroundMusicPlaying(): boolean {
    return this.backgroundMusicTracks.some(track => track.playing());
  }

  // New method to manually skip to next track
  skipToNextTrack(): void {
    if (this.isBackgroundMusicEnabled) {
      this.playNextTrack();
    }
  }

  // Get current track info for UI
  getCurrentTrackInfo(): { index: number; total: number; name: string } {
    const trackNames = [
      'Steady Focus',
      'Calm Beauty',
      'Easy Vibes'
    ];
    
    return {
      index: this.currentTrackIndex,
      total: this.backgroundMusicTracks.length,
      name: trackNames[this.currentTrackIndex] || 'Unknown Track'
    };
  }

  // Cleanup method
  unload(): void {
    this.sounds.forEach(sound => {
      sound.unload();
    });
    this.sounds.clear();
    
    // Also unload background music tracks
    this.backgroundMusicTracks.forEach(track => {
      track.unload();
    });
    this.backgroundMusicTracks = [];
    this.isBackgroundMusicEnabled = false;
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Export for React components
export { SoundManager };