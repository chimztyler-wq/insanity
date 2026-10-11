import React, { useState } from 'react';
import { Menu, X, ChartColumn, Zap, Shield } from 'lucide-react';
import { BrandIcon } from './BrandIcon';
import { useNavigation } from '../navigation';

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { path, navigate } = useNavigation();

  const navItems = [
    { label: 'Dashboard', icon: ChartColumn, page: '/' },
    { label: 'Earn Robux', icon: Zap, page: '/rewards' },
    { label: 'Insanity Hyperlink', icon: Shield, page: '/hyperlink' },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#050505] border-r border-white/[0.06] z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-10 shrink-0">
            <div className="flex items-center gap-2.5">
              <BrandIcon className="w-6 h-6" />
              <span className="text-[15px] font-semibold text-white tracking-tight">
                Insanity
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-neutral-600 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = path === item.page;
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.page);
                    setDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                    isActive
                      ? 'bg-white/[0.06] text-white border border-white/[0.08]'
                      : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/[0.06] md:hidden shrink-0">
            <a
              href="https://discord.gg/ezbeam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-xl transition-all text-sm hover:bg-neutral-200"
            >
              Sign in with Discord
            </a>
          </div>
        </div>
      </div>

      {/* Top Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] pt-3 px-4 md:px-6">
        <div
          className="max-w-[1160px] mx-auto flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-full px-5 py-2.5 border border-white/[0.06]"
          style={{ minWidth: 'auto' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 hover:bg-white/5 rounded-full transition-all"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white"
            >
              <BrandIcon className="w-5 h-5" />
              <span>Insanity</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-400">
            <a href="#tools" className="hover:text-white transition-colors">
              Tools
            </a>
            <a href="#sites" className="hover:text-white transition-colors">
              Sites
            </a>
            <a
              href="https://discord.gg/ezbeam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://discord.gg/ezbeam"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-all"
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
