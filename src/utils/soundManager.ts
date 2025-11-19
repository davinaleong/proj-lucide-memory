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
        src: [
          '/sounds/Steady-Focus_AdobeStock_1801511466.wav',
          '/sounds/Calm-Beauty_AdobeStock_1773129888.wav', 
          '/sounds/Easy-Vibes_AdobeStock_1773129821.wav'
        ],
        volume: 0.2,
        loop: true,
        preload: true // Preload background music for auto-play
      }
    };

    // Create Howl instances for each sound
    Object.entries(soundConfigs).forEach(([soundType, config]) => {
      const sound = new Howl({
        src: config.src,
        volume: (config.volume || 0.5) * this.masterVolume,
        loop: config.loop || false,
        preload: config.preload || true,
        html5: soundType === 'backgroundMusic', // Use HTML5 for long audio
        format: soundType === 'backgroundMusic' ? ['wav'] : undefined, // Specify WAV format for background music
        onloaderror: (_, error) => {
          console.warn(`Failed to load sound: ${soundType}`, error);
        },
        onplayerror: (_, error) => {
          console.warn(`Failed to play sound: ${soundType}`, error);
        }
      });

      this.sounds.set(soundType as SoundType, sound);
    });
  }

  private loadSettings() {
    try {
      const savedSettings = localStorage.getItem('lucide-memory-audio-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.isMuted = settings.isMuted || false;
        this.masterVolume = settings.masterVolume || 0.7;
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
        masterVolume: this.masterVolume
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

  // Background music specific methods
  playBackgroundMusic(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isMuted) {
        resolve();
        return;
      }

      const sound = this.sounds.get('backgroundMusic');
      if (sound) {
        // Check if already playing
        if (sound.playing()) {
          resolve();
          return;
        }

        // Set up success/error handlers
        const onPlay = () => {
          sound.off('play', onPlay);
          sound.off('playerror', onError);
          console.log('Background music started successfully');
          resolve();
        };

        const onError = (error: unknown) => {
          sound.off('play', onPlay);
          sound.off('playerror', onError);
          console.warn('Failed to play background music:', error);
          reject(new Error('Failed to play background music'));
        };

        sound.on('play', onPlay);
        sound.on('playerror', onError);
        
        try {
          const playId = sound.play();
          if (playId === undefined) {
            sound.off('play', onPlay);
            sound.off('playerror', onError);
            reject(new Error('Failed to start background music'));
          }
        } catch (error) {
          sound.off('play', onPlay);
          sound.off('playerror', onError);
          reject(error);
        }
      } else {
        reject(new Error('Background music sound not found'));
      }
    });
  }

  stopBackgroundMusic(): void {
    this.stop('backgroundMusic');
  }

  pauseBackgroundMusic(): void {
    this.pause('backgroundMusic');
  }

  resumeBackgroundMusic(): void {
    this.resume('backgroundMusic');
  }

  isBackgroundMusicPlaying(): boolean {
    const sound = this.sounds.get('backgroundMusic');
    return sound ? sound.playing() : false;
  }

  // Cleanup method
  unload(): void {
    this.sounds.forEach(sound => {
      sound.unload();
    });
    this.sounds.clear();
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Export for React components
export { SoundManager };