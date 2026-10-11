import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteBackground } from '../components/SiteBackground';
import { BrandIcon } from '../components/BrandIcon';
import { useNavigation } from '../navigation';

export function NotFound() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-black text-zinc-300 overflow-hidden relative selection:bg-white/30">
      <SiteBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
        <div className="relative inline-flex mb-8">
          <div className="absolute -inset-10 blur-[70px] rounded-full pointer-events-none bg-white/[0.08]" />
          <div className="relative inline-flex p-5 bg-white/[0.04] border border-white/[0.1] rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.08)]">
            <BrandIcon className="w-14 h-14 text-white" />
          </div>
        </div>
        <h1 className="text-7xl sm:text-9xl font-bold tracking-tight text-white mb-4">404</h1>
        <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
          Page not found
        </p>
        <p className="text-neutral-500 max-w-md mb-10 text-sm sm:text-base leading-relaxed">
          The requested resource does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold px-6 py-3 rounded-full transition-all text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
        >
          Return to Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
