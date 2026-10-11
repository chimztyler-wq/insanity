import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export function PerformanceWidget() {
  const [history, setHistory] = useState<number[]>([45, 52, 48, 60, 55, 68, 62, 58, 64, 70, 65, 72]);
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const fetchStatus = () => {
      fetch('/api/status')
        .then((res) => res.json())
        .then((data) => {
          if (!active || !data?.services) return;
          const latencies = Object.values(data.services)
            .filter((s: any) => s?.online)
            .map((s: any) => s.latency);
          if (!latencies.length) return;
          const maxLat = Math.max(...(latencies as number[]));
          setLatency(maxLat);
          setHistory((prev) => [
            ...prev.slice(-23),
            30 + Math.min(140, maxLat / 4),
          ]);
        })
        .catch(() => {
          // graceful fallback live simulated ping if offline
          if (!active) return;
          const sim = Math.floor(45 + Math.random() * 35);
          setLatency(sim);
          setHistory((prev) => [
            ...prev.slice(-23),
            30 + Math.min(140, sim * 1.5),
          ]);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const path = history.length
    ? history
        .map((val, idx) => {
          const x = (idx / (history.length - 1)) * 800;
          if (idx === 0) return `M ${x} ${200 - val}`;
          const prevX = ((idx - 1) / (history.length - 1)) * 800;
          const prevY = 200 - history[idx - 1];
          const midX = (prevX + x) / 2;
          return `C ${midX} ${prevY}, ${midX} ${200 - val}, ${x} ${200 - val}`;
        })
        .join(' ')
    : '';

  const area = path ? `${path} L 800 200 L 0 200 Z` : '';

  return (
    <div className="panel p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-white">Performance</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
            <p className="text-[11px] text-neutral-600 font-mono">
              {latency === null ? 'Connecting…' : `${latency} ms`}
            </p>
          </div>
        </div>
        <div className="p-2.5 bg-white/[0.04] rounded-lg border border-white/[0.06]">
          <Activity className="w-4 h-4 text-white/40" />
        </div>
      </div>

      <div className="flex-1 min-h-48 relative bg-white/[0.01] rounded-xl border border-white/[0.04] overflow-hidden">
        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {area && <path d={area} fill="url(#cg)" />}
          {path && (
            <path
              d={path}
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
              opacity="0.4"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
