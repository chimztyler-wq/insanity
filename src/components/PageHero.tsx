import React from 'react';

const cardAccents = {
  white: 'bg-white/5 border-white/10 text-white shadow-[0_0_40px_rgba(255,255,255,0.05)]',
  orange: 'bg-white/5 border-white/10 text-white shadow-[0_0_40px_rgba(255,255,255,0.05)]',
  red: 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.1)]',
};

const glowAccents = {
  white: 'bg-white/5',
  orange: 'bg-white/5',
  red: 'bg-red-600/15',
};

interface PageHeroProps {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  accent?: 'white' | 'orange' | 'red';
}

export function PageHero({
  icon: Icon,
  eyebrow,
  title,
  description,
  accent = 'white',
}: PageHeroProps) {
  return (
    <div className="mb-8 text-center">
      <div className="relative inline-flex mb-6">
        <div
          className={`absolute -inset-8 blur-[60px] rounded-full pointer-events-none ${glowAccents[accent]}`}
        />
        <div
          className={`relative inline-flex p-4 sm:p-5 border rounded-2xl ${cardAccents[accent]}`}
        >
          <Icon className="w-10 h-10" />
        </div>
      </div>

      {eyebrow && (
        <div>
          <span className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            {eyebrow}
          </span>
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
        {title}
      </h1>

      {description && (
        <p className="text-neutral-500 text-base sm:text-lg max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
