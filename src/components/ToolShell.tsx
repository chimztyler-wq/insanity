import React from 'react';
import { SiteBackground } from './SiteBackground';
import { ToolTopBar } from './ToolTopBar';

interface ToolShellProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function ToolShell({ children, maxWidth = 'max-w-[760px]' }: ToolShellProps) {
  return (
    <div className="min-h-screen bg-black text-neutral-300 overflow-x-hidden relative selection:bg-white/10">
      <SiteBackground />
      <ToolTopBar />
      <div className={`relative z-10 pt-24 px-4 pb-12 sm:pt-28 sm:px-6 ${maxWidth} mx-auto`}>
        {children}
      </div>
    </div>
  );
}
