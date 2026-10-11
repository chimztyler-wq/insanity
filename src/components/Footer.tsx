import React from 'react';
import { BrandIcon } from './BrandIcon';
import { useNavigation } from '../navigation';

export function Footer() {
  const { navigate } = useNavigation();

  return (
    <footer className="relative z-10 border-t border-white/[0.04]">
      <div className="max-w-[1160px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <BrandIcon className="w-5 h-5" />
          <span className="text-[15px] font-semibold text-white tracking-tight">Insanity</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://discord.gg/ezbeam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-600 hover:text-white transition-colors"
          >
            Discord
          </a>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-neutral-600 hover:text-white transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/rewards')}
            className="text-xs text-neutral-600 hover:text-white transition-colors cursor-pointer"
          >
            Rewards
          </button>
        </div>
      </div>
    </footer>
  );
}
