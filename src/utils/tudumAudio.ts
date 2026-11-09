/**
 * Native Web Audio API Synthesizer for the iconic "TA-DUM" sound,
 * infused with a quirky academic / AI "brainwave level-up" chime.
 * 
 * 100% self-contained: No external .mp3 files needed, 0ms latency,
 * zero risk of 404s when deploying on Vercel or cloud hosts.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    console.warn('AudioContext not supported or blocked:', e);
    return null;
  }
}

export function playTudumSound(options: { quirky?: boolean; volume?: number } = {}) {
  const { quirky = true, volume = 0.85 } = options;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(volume, now);
  masterGain.connect(ctx.destination);

  // ----------------------------------------------------
  // 1. "TA" - The Anvil / Strike (0.00s)
  // ----------------------------------------------------
  // Pitch drop punch
  const strikeOsc = ctx.createOscillator();
  const strikeGain = ctx.createGain();
  strikeOsc.type = 'triangle';
  strikeOsc.frequency.setValueAtTime(140, now);
  strikeOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
  
  strikeGain.gain.setValueAtTime(0.7, now);
  strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  
  strikeOsc.connect(strikeGain);
  strikeGain.connect(masterGain);
  strikeOsc.start(now);
  strikeOsc.stop(now + 0.15);

  // Click transient (metallic bite)
  const bufferSize = ctx.sampleRate * 0.04;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(900, now);
  noiseFilter.Q.setValueAtTime(3, now);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start(now);

  // ----------------------------------------------------
  // 2. "DUMMM" - The Deep Sub-Bass & Cinematic Chord (0.16s)
  // ----------------------------------------------------
  const dumTime = now + 0.15;

  // Deep Sub Bass
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(62, dumTime);
  subOsc.frequency.exponentialRampToValueAtTime(34, dumTime + 0.4);
  
  subGain.gain.setValueAtTime(0.0, dumTime);
  subGain.gain.linearRampToValueAtTime(0.9, dumTime + 0.04);
  subGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 1.8);

  subOsc.connect(subGain);
  subGain.connect(masterGain);
  subOsc.start(dumTime);
  subOsc.stop(dumTime + 1.9);

  // Cinematic D Minor Chord Pad (D2, A2, D3, F3)
  const chordNotes = [73.42, 110.0, 146.83, 174.61]; // D2, A2, D3, F3
  chordNotes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, dumTime);
    // Slight detune for that rich analog Hollywood chorus effect
    osc.detune.setValueAtTime((idx - 1.5) * 8, dumTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, dumTime);
    filter.frequency.exponentialRampToValueAtTime(180, dumTime + 1.6);

    gain.gain.setValueAtTime(0.0, dumTime);
    gain.gain.linearRampToValueAtTime(0.25 / chordNotes.length, dumTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, dumTime + 1.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(dumTime);
    osc.stop(dumTime + 1.8);
  });

  // ----------------------------------------------------
  // 3. The Quirky Infusion: Academic / AI Level-Up Sparkle (0.45s)
  // ----------------------------------------------------
  if (quirky) {
    const sparkleNotes = [
      { f: 880.0, t: 0.45 },  // A5
      { f: 1174.6, t: 0.54 }, // D6
      { f: 1396.9, t: 0.63 }, // F6
      { f: 1760.0, t: 0.72 }, // A6 ("Brain unlocked!")
    ];

    sparkleNotes.forEach((note) => {
      const noteTime = now + note.t;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, noteTime);

      gain.gain.setValueAtTime(0.0, noteTime);
      gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });

    // Quirky playful cartoon pop at the very end (1.05s)
    const popTime = now + 0.95;
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(400, popTime);
    popOsc.frequency.exponentialRampToValueAtTime(1200, popTime + 0.08);
    popGain.gain.setValueAtTime(0.15, popTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.1);

    popOsc.connect(popGain);
    popGain.connect(masterGain);
    popOsc.start(popTime);
    popOsc.stop(popTime + 0.12);
  }
}
