let audioCtx: AudioContext | null = null;
let isMuted = false;

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("geofauna_muted", muted ? "true" : "false");
  }
}

export function getSoundMuted(): boolean {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("geofauna_muted");
    if (saved !== null) {
      isMuted = saved === "true";
    }
  }
  return isMuted;
}

function getAudioContext(): AudioContext | null {
  if (isMuted || typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Gentle tactile pop/tick when painting on the map
 */
export function playPaintTick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // AudioContext issues gracefully ignored
  }
}

/**
 * Gentle click sound on tool select or clear
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {}
}

/**
 * Rich chord fanfare on guess reveal
 */
export function playScoreReveal(grade: "S" | "A" | "B" | "C" | "D") {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const freqs =
      grade === "S"
        ? [523.25, 659.25, 783.99, 1046.5] // C Major fanfare
        : grade === "A"
        ? [440.0, 554.37, 659.25, 880.0] // A Major bright
        : grade === "B"
        ? [349.23, 440.0, 523.25] // F Major warm
        : grade === "C"
        ? [293.66, 369.99, 440.0] // D Major gentle
        : [261.63, 311.13, 392.0]; // C minor / neutral

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.09;
      const duration = 0.45;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {}
}
