import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, FastForward } from 'lucide-react';
import { playTudumSound } from '../utils/tudumAudio.js';

interface TudumLoaderProps {
  onComplete: () => void;
  profileName?: string;
  mode?: 'full' | 'quick';
}

const QUIRKY_TICKERS = [
  'TA-DUM! Optimizing neural synapses for maximum binge-learning...',
  'Calibrating collaborative filtering so you never fail a quiz...',
  'Converting late-night caffeine into PyTorch & scikit-learn models...',
  'Detecting skill gaps: Zero impostor syndrome detected...',
  'Generating personalized curriculum with 99.4% recommendation accuracy...',
  'Are you still learning? Yes, always.',
];

const FLOATING_MATH_GLYPHS = [
  { text: '∇ Loss → 0', delay: '0.4s', x: '18%', y: '32%', color: 'text-red-400' },
  { text: 'softmax(z)', delay: '0.6s', x: '78%', y: '28%', color: 'text-amber-400' },
  { text: 'O(1)', delay: '0.5s', x: '15%', y: '68%', color: 'text-cyan-400' },
  { text: 'f(x) = σ(Wx + b)', delay: '0.7s', x: '75%', y: '65%', color: 'text-emerald-400' },
  { text: 'Attention(Q,K,V)', delay: '0.8s', x: '25%', y: '18%', color: 'text-purple-400' },
  { text: '🧠 +100 XP', delay: '0.65s', x: '82%', y: '45%', color: 'text-pink-400' },
  { text: '🎓 Certified', delay: '0.9s', x: '22%', y: '82%', color: 'text-rose-400' },
  { text: '☕ Coffee = Code', delay: '0.75s', x: '72%', y: '80%', color: 'text-yellow-400' },
];

export const TudumLoader: React.FC<TudumLoaderProps> = ({
  onComplete,
  profileName,
  mode = 'full',
}) => {
  const [stage, setStage] = useState<'initial' | 'impact' | 'spectrum' | 'reveal' | 'fading'>('initial');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    // Pick random ticker
    setTickerIndex(Math.floor(Math.random() * QUIRKY_TICKERS.length));

    // Try playing sound immediately
    if (!soundPlayedRef.current && !isMuted) {
      soundPlayedRef.current = true;
      playTudumSound({ quirky: true, volume: 0.85 });
    }

    const durationMultiplier = mode === 'quick' ? 0.6 : 1.0;

    // Timeline for Tudum
    const tImpact = setTimeout(() => {
      setStage('impact');
    }, 100 * durationMultiplier);

    const tSpectrum = setTimeout(() => {
      setStage('spectrum');
    }, 750 * durationMultiplier);

    const tReveal = setTimeout(() => {
      setStage('reveal');
    }, 1800 * durationMultiplier);

    const tFading = setTimeout(() => {
      setStage('fading');
    }, (mode === 'quick' ? 1600 : 2500) * durationMultiplier);

    const tEnd = setTimeout(() => {
      onComplete();
    }, (mode === 'quick' ? 1800 : 2800) * durationMultiplier);

    return () => {
      clearTimeout(tImpact);
      clearTimeout(tSpectrum);
      clearTimeout(tReveal);
      clearTimeout(tFading);
      clearTimeout(tEnd);
    };
  }, [mode, onComplete, isMuted]);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      playTudumSound({ quirky: true, volume: 0.85 });
    } else {
      setIsMuted(true);
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden select-none transition-opacity duration-500 ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={() => {
        // Safe trigger on click if autoplay was restricted by browser
        if (!soundPlayedRef.current) {
          soundPlayedRef.current = true;
          playTudumSound({ quirky: true });
        }
      }}
    >
      {/* Background Ambient Vignette & Red Bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.18)_0%,_rgba(0,0,0,0.8)_60%,_rgba(0,0,0,1)_100%)] pointer-events-none" />

      {/* Cinematic Shockwave on Impact */}
      {stage !== 'initial' && (
        <div 
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-red-600/40 animate-ping pointer-events-none"
          style={{ animationDuration: '1.2s' }}
        />
      )}

      {/* Central Visual Showcase */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Spectrum Light Ribbons (Netflix Signature Zoom Effect) */}
        {(stage === 'spectrum' || stage === 'reveal') && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Array of dynamic vertical spectral ribbons shooting past */}
            <div className="relative w-96 h-96 flex items-center justify-center">
              {[
                { color: 'bg-red-600', angle: '-40deg', scale: '1.8', delay: '0s' },
                { color: 'bg-amber-500', angle: '-25deg', scale: '1.6', delay: '0.05s' },
                { color: 'bg-emerald-500', angle: '-10deg', scale: '1.9', delay: '0.1s' },
                { color: 'bg-cyan-500', angle: '5deg', scale: '1.7', delay: '0.08s' },
                { color: 'bg-blue-600', angle: '20deg', scale: '2.0', delay: '0.12s' },
                { color: 'bg-purple-600', angle: '35deg', scale: '1.7', delay: '0.15s' },
                { color: 'bg-pink-500', angle: '50deg', scale: '1.9', delay: '0.1s' },
              ].map((ribbon, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-96 ${ribbon.color} blur-[2px] opacity-75 rounded-full`}
                  style={{
                    transform: `rotate(${ribbon.angle}) scaleY(${ribbon.scale})`,
                    boxShadow: `0 0 25px ${ribbon.color.replace('bg-', '')}`,
                    animation: `pulse 1.2s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* The Iconic LearnFlix "L" Ribbon (Netflix-style folded ribbon lettermark) */}
        <div className="relative z-10 flex items-center justify-center transform transition-transform duration-700">
          <svg
            className={`w-36 h-48 md:w-48 md:h-64 transition-all duration-700 ease-out ${
              stage === 'initial'
                ? 'scale-50 opacity-0'
                : stage === 'impact'
                ? 'scale-110 opacity-100 drop-shadow-[0_0_35px_rgba(229,9,20,0.9)]'
                : stage === 'spectrum'
                ? 'scale-125 opacity-90 drop-shadow-[0_0_50px_rgba(229,9,20,1)]'
                : 'scale-100 opacity-100 drop-shadow-[0_0_25px_rgba(229,9,20,0.6)]'
            }`}
            viewBox="0 0 160 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Linear Gradients matching the Netflix 3D Ribbon Shadow/Light look */}
              <linearGradient id="tudum-ribbon-stem" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff1e27" />
                <stop offset="50%" stopColor="#E50914" />
                <stop offset="100%" stopColor="#96050b" />
              </linearGradient>
              <linearGradient id="tudum-ribbon-base" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff333a" />
                <stop offset="60%" stopColor="#E50914" />
                <stop offset="100%" stopColor="#6e0207" />
              </linearGradient>
              <linearGradient id="tudum-fold-shadow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2b0103" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ff1e27" stopOpacity="0" />
              </linearGradient>
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Vertical Stem of "L" with 3D curve */}
            <path
              d="M 30 15 C 30 15, 30 185, 30 185 C 30 195, 38 198, 48 198 L 74 198 C 74 198, 74 25, 74 20 C 74 15, 68 15, 62 15 Z"
              fill="url(#tudum-ribbon-stem)"
            />

            {/* Bottom Horizontal Leg of "L" */}
            <path
              d="M 40 165 L 140 165 C 150 165, 155 172, 155 180 L 155 198 C 155 205, 148 205, 138 205 L 42 205 C 34 205, 30 198, 30 190 L 30 165 Z"
              fill="url(#tudum-ribbon-base)"
            />

            {/* Diagonal Ribbon Fold Shadow (Gives the authentic Netflix 3D folded cloth look) */}
            <path
              d="M 30 165 L 74 135 L 74 198 L 30 198 Z"
              fill="url(#tudum-fold-shadow)"
            />

            {/* Quirky Learning Infusion: Glowing Graduation Cap Tassel / Neural Node on top */}
            <circle cx="52" cy="18" r="5" fill="#facc15" filter="drop-shadow(0 0 6px #facc15)" />
            <path d="M 52 23 Q 46 45 42 60" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="38" y="58" width="8" height="12" rx="2" fill="#eab308" />
          </svg>
        </div>

        {/* Quirky Infusion: Floating AI/Math Glyphs Bursting Outward */}
        {(stage === 'spectrum' || stage === 'reveal') && (
          <div className="absolute inset-0 pointer-events-none w-80 h-80 md:w-96 md:h-96">
            {FLOATING_MATH_GLYPHS.map((glyph, idx) => (
              <span
                key={idx}
                className={`absolute text-xs md:text-sm font-mono font-bold ${glyph.color} transition-all duration-700 ease-out`}
                style={{
                  top: glyph.y,
                  left: glyph.x,
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  animation: `bounce 1.5s infinite ease-in-out`,
                  animationDelay: glyph.delay,
                  textShadow: '0 0 10px currentColor',
                }}
              >
                {glyph.text}
              </span>
            ))}
          </div>
        )}

        {/* Wordmark Reveal & Profile Tagline */}
        <div className={`mt-6 text-center transition-all duration-500 ${
          stage === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-[#E50914] drop-shadow-[0_2px_12px_rgba(229,9,20,0.8)]">
            LEARNFLIX
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-medium tracking-widest uppercase mt-1">
            {profileName ? `Welcome back, ${profileName}` : 'AI-Powered Personalised Learning'}
          </p>
        </div>
      </div>

      {/* Quirky Ticker Line at Bottom */}
      <div className="absolute bottom-16 md:bottom-12 max-w-lg px-6 text-center z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <p className="text-xs text-neutral-300 font-mono tracking-tight animate-pulse">
            {QUIRKY_TICKERS[tickerIndex]}
          </p>
        </div>
      </div>

      {/* Netflix Controls: Skip Intro & Mute/Unmute */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-30">
        {/* Sound toggle button */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 hover:bg-white/10 border border-white/20 text-neutral-300 hover:text-white text-xs font-semibold tracking-wide transition cursor-pointer"
          title={isMuted ? 'Unmute Tudum' : 'Mute Tudum'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Tudum Sound ON</span>
            </>
          )}
        </button>

        {/* Skip Intro Button (Classic Netflix Placement) */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:border-white"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 text-[#E50914]" />
        </button>
      </div>
    </div>
  );
};
