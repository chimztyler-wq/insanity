import React, { useEffect, useRef } from 'react';

function FloatingParticles({ count = 10 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const size = 1 + 2 * Math.random();
      const dur = 30 + 40 * Math.random();
      const delay = -Math.random() * dur;
      const left = 100 * Math.random();
      const drift = (Math.random() - 0.5) * 40;
      const opacity = 0.1 + 0.2 * Math.random();

      p.style.cssText = `
        position: absolute;
        left: ${left}%;
        bottom: -4px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, ${opacity});
        box-shadow: 0 0 ${4 * size}px rgba(255, 255, 255, ${0.4 * opacity});
        --particle-opacity: ${opacity};
        --particle-drift: ${drift}px;
        animation: float-up ${dur}s linear infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
        will-change: transform, opacity;
      `;
      el.appendChild(p);
      items.push(p);
    }

    return () => {
      items.forEach((item) => item.remove());
    };
  }, [count]);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}

export function SiteBackground({ particleCount = 10 }: { particleCount?: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black moon-glow-bg">
      <div
        className="absolute inset-0 cyber-grid-bg"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 80%)',
        }}
      />
      <div className="spotlight-left" />
      <div className="spotlight-right" />
      <div className="spotlight-left-narrow" style={{ animationDelay: '-2s' }} />
      <div className="spotlight-right-narrow" style={{ animationDelay: '-2s' }} />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-white/[0.02] blur-[200px] rounded-full" />
      <FloatingParticles count={particleCount} />
    </div>
  );
}
