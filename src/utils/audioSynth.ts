/**
 * Web Audio API synthesizer for SENA Institutional Anthem melody
 * Plays a triumphant brass-like harmonic march for the SENA hymn
 */

class SenaAnthemSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTimeout: number | null = null;
  private noteIndex: number = 0;
  private onNoteChange?: (noteIndex: number, verseIndex: number) => void;
  private onEnd?: () => void;

  // Notes frequencies in Hz (SENA March theme inspired melody in G major)
  private melodyNotes: { freq: number; dur: number; verse: number }[] = [
    // Intro fanfare
    { freq: 392.00, dur: 0.35, verse: 0 }, // G4
    { freq: 523.25, dur: 0.35, verse: 0 }, // C5
    { freq: 659.25, dur: 0.50, verse: 0 }, // E5
    { freq: 523.25, dur: 0.35, verse: 0 }, // C5
    { freq: 587.33, dur: 0.35, verse: 0 }, // D5
    { freq: 659.25, dur: 0.70, verse: 0 }, // E5
    // Coro: "Estudiantes del SENA adelante..."
    { freq: 523.25, dur: 0.40, verse: 1 }, // C5
    { freq: 523.25, dur: 0.40, verse: 1 }, // C5
    { freq: 587.33, dur: 0.40, verse: 1 }, // D5
    { freq: 659.25, dur: 0.40, verse: 1 }, // E5
    { freq: 523.25, dur: 0.60, verse: 1 }, // C5
    // "...por Colombia luchad con amor"
    { freq: 587.33, dur: 0.40, verse: 1 }, // D5
    { freq: 659.25, dur: 0.40, verse: 1 }, // E5
    { freq: 698.46, dur: 0.50, verse: 1 }, // F5
    { freq: 659.25, dur: 0.40, verse: 1 }, // E5
    { freq: 587.33, dur: 0.70, verse: 1 }, // D5
    // "con el ánimo noble y radiante"
    { freq: 392.00, dur: 0.35, verse: 1 }, // G4
    { freq: 587.33, dur: 0.40, verse: 1 }, // D5
    { freq: 659.25, dur: 0.40, verse: 1 }, // E5
    { freq: 587.33, dur: 0.40, verse: 1 }, // D5
    { freq: 523.25, dur: 0.50, verse: 1 }, // C5
    // "transformemos el mundo en mejor"
    { freq: 440.00, dur: 0.40, verse: 1 }, // A4
    { freq: 493.88, dur: 0.40, verse: 1 }, // B4
    { freq: 523.25, dur: 0.80, verse: 1 }, // C5
    // Estrofa I: "De la patria el futuro destino..."
    { freq: 659.25, dur: 0.40, verse: 2 }, // E5
    { freq: 659.25, dur: 0.40, verse: 2 }, // E5
    { freq: 698.46, dur: 0.40, verse: 2 }, // F5
    { freq: 783.99, dur: 0.60, verse: 2 }, // G5
    { freq: 659.25, dur: 0.40, verse: 2 }, // E5
    // "...en las manos del joven está"
    { freq: 587.33, dur: 0.40, verse: 2 }, // D5
    { freq: 523.25, dur: 0.40, verse: 2 }, // C5
    { freq: 587.33, dur: 0.80, verse: 2 }, // D5
    // "el trabajo es seguro camino"
    { freq: 659.25, dur: 0.40, verse: 2 }, // E5
    { freq: 783.99, dur: 0.40, verse: 2 }, // G5
    { freq: 698.46, dur: 0.40, verse: 2 }, // F5
    { freq: 659.25, dur: 0.40, verse: 2 }, // E5
    // "que la paz y el progreso nos da"
    { freq: 587.33, dur: 0.40, verse: 2 }, // D5
    { freq: 493.88, dur: 0.40, verse: 2 }, // B4
    { freq: 523.25, dur: 1.00, verse: 2 }, // C5 (final resolution)
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(onNoteChange?: (noteIndex: number, verseIndex: number) => void, onEnd?: () => void) {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.onNoteChange = onNoteChange;
    this.onEnd = onEnd;
    this.playNext();
  }

  private playNext() {
    if (!this.isPlaying || !this.ctx) return;

    if (this.noteIndex >= this.melodyNotes.length) {
      this.stop();
      this.onEnd?.();
      return;
    }

    const item = this.melodyNotes[this.noteIndex];
    this.onNoteChange?.(this.noteIndex, item.verse);

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    // Brass/Chime rich timbre
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(item.freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(item.freq * 2, now); // Octave overtone

    // Envelope
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + item.dur - 0.04);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + item.dur);
    osc2.stop(now + item.dur);

    this.noteIndex++;
    this.currentTimeout = window.setTimeout(() => {
      this.playNext();
    }, item.dur * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const anthemSynth = new SenaAnthemSynth();
