import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export function AtmosphereWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [currentTime, setCurrentTime] = useState(18);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(0.5);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<any>(null);

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioContextRef.current && AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
          masterGain.connect(ctx.destination);
          gainNodeRef.current = masterGain;

          // Drone 1: 55Hz
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime);
          osc1.connect(masterGain);
          osc1.start();

          // Drone 2: 110Hz warm harmonic
          const osc2 = ctx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(110, ctx.currentTime);
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(250, ctx.currentTime);
          osc2.connect(filter);
          filter.connect(masterGain);
          osc2.start();

          oscRef.current = [osc1, osc2];
        } else if (audioContextRef.current?.state === 'suspended') {
          audioContextRef.current.resume();
        }
        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(volume * 0.15, audioContextRef.current.currentTime, 0.1);
        }
      } catch (err) {
        console.warn('Audio start error:', err);
      }
      setIsPlaying(true);
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        isPlaying ? volume * 0.15 : 0,
        audioContextRef.current.currentTime,
        0.05
      );
    }
  }, [volume, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev >= duration ? 0 : prev + 1;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <div className="panel p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <Music className="w-4 h-4 text-neutral-600" />
        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-600">
          Atmosphere
        </span>
      </div>

      <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04] flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/[0.04] rounded-lg flex items-center justify-center border border-white/[0.06]">
              <Music className="w-4 h-4 text-white/60" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Ambience</p>
              <p className="text-[11px] text-neutral-700">Loop</p>
            </div>
          </div>

          <div className="flex items-end gap-[2px] h-5">
            {[3, 7, 5, 14, 10, 6, 12, 4].map((baseHeight, idx) => (
              <div
                key={idx}
                className="w-[2px] bg-white rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(3, (baseHeight * (0.8 + Math.random() * 0.4)))}px` : '2px',
                  opacity: isPlaying ? 0.9 : 0.25,
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const val = Number(e.target.value);
              setProgress(val);
              setCurrentTime((val / 100) * duration);
            }}
            className="w-full h-[2px] bg-white/[0.08] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          />

          <div className="flex justify-between text-[10px] text-neutral-700 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentTime(0);
                  setProgress(0);
                }}
                className="text-neutral-700 hover:text-neutral-300 transition-colors"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={togglePlay}
                className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-90"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={() => {
                  setCurrentTime(duration);
                  setProgress(100);
                }}
                className="text-neutral-700 hover:text-neutral-300 transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="w-3 h-3 text-neutral-700" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-14 h-[2px] bg-white/[0.08] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
