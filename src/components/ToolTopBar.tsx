import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BrandIcon } from './BrandIcon';
import { useNavigation } from '../navigation';

export function ToolTopBar() {
  const { navigate } = useNavigation();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-[1160px] mx-auto flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-full px-5 py-2.5 border border-white/[0.06]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-white/5 transition-all text-neutral-400 hover:text-white"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-left"
          >
            <BrandIcon className="w-5 h-5" />
            <span className="hidden md:block text-[15px] font-semibold tracking-tight text-white">
              Insanity
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
