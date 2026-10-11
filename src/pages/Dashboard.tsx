import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Search,
  Wallet,
  Megaphone,
  Globe,
  Lock,
  Sprout,
  Shield,
  Activity,
  Gamepad2,
  BookOpen,
  ChartColumn,
  Zap,
  Send,
  UserMinus,
  ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SiteBackground } from '../components/SiteBackground';
import { PerformanceWidget } from '../components/PerformanceWidget';
import { AtmosphereWidget } from '../components/AtmosphereWidget';
import { useNavigation } from '../navigation';

const rotatingWords = ['tools.', 'security.', 'rewards.', 'power.', 'everything.'];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative text-white ml-2 sm:ml-3 text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Dashboard() {
  const { navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const toolsList = [
    {
      icon: Shield,
      title: 'Insanity Hyperlink',
      description: 'Advanced security for your sensitive links',
      badge: 'Active',
      onClick: () => navigate('/hyperlink'),
    },
    {
      icon: Activity,
      title: 'Cookie Refresher & Checker',
      description: 'Rotate, refresh, and validate your cookies',
      badge: 'Active',
      onClick: () => navigate('/tools/refresher'),
    },
    {
      icon: Gamepad2,
      title: 'Gamepass Creator',
      description: 'Create game passes on any of your games instantly',
      badge: 'Active',
      onClick: () => navigate('/tools/gamepass-creator'),
    },
    {
      icon: BookOpen,
      title: 'Methods & Tutorials',
      description: 'The complete archive of proven methods and guides.',
      badge: 'Discord',
      onClick: () => window.open('https://discord.gg/ezbeam', '_blank'),
    },
    {
      icon: ChartColumn,
      title: 'Status Checker',
      description: 'Real-time monitoring and verification',
      badge: 'Active',
      onClick: () => navigate('/tools/status'),
    },
    {
      icon: Zap,
      title: 'Webhook Spammer',
      description: 'Send customizable bursts of messages to your webhooks.',
      badge: 'Active',
      onClick: () => navigate('/tools/webhook'),
    },
    {
      icon: Send,
      title: 'Discord Auto Tools',
      description: 'Automate your presence with recurring message sender and auto responder.',
      badge: 'Active',
      onClick: () => navigate('/tools/discord-sender'),
    },
    {
      icon: UserMinus,
      title: 'Unfriender',
      description: 'Unfriend everyone on an account in one click.',
      badge: 'Active',
      onClick: () => navigate('/tools/unfriender'),
    },
  ];

  const sitesList = [
    {
      icon: Globe,
      title: 'Insanity',
      description: 'Our main site.',
      href: 'https://logged.tg/auth/beam',
      external: true,
      live: true,
    },
    {
      icon: Globe,
      title: 'Insanity | Immortal',
      description: 'Powerful collection of trusted resources.',
      href: 'https://immortal.st/?code=MjA0NDY0NTE1OTU0NjQzMzk2NQ==',
      external: true,
      live: true,
    },
    {
      icon: Lock,
      title: 'Roblox Email Bypasser',
      description: 'Fast and reliable email bypass verification.',
      href: '/tools/bypasser',
      external: false,
      live: true,
    },
    {
      icon: Sprout,
      title: 'AutoHar',
      description: 'Auto-harvest coins in your favorite Roblox games, 24/7.',
      href: 'https://rblxfun.xyz/login',
      external: true,
      live: true,
    },
  ];

  const query = searchQuery.trim().toLowerCase();
  const filteredTools = useMemo(
    () =>
      query
        ? toolsList.filter((t) =>
            `${t.title} ${t.description}`.toLowerCase().includes(query)
          )
        : toolsList,
    [query]
  );

  const filteredSites = useMemo(
    () =>
      query
        ? sitesList.filter((s) =>
            `${s.title} ${s.description}`.toLowerCase().includes(query)
          )
        : sitesList,
    [query]
  );

  return (
    <div className="min-h-screen bg-black text-neutral-300 overflow-x-hidden relative selection:bg-white/10">
      <div className="progress-bar" />
      <SiteBackground />
      <Header />

      <main className="relative z-10 max-w-[1160px] mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section id="top" className="pt-32 md:pt-44 pb-16 md:pb-24 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
              Access
              <RotatingWord />
              <br />
              <span className="text-neutral-500">Compromise everything.</span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Every tool, every site, one dashboard. The complete operations suite.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#tools"
              className="inline-flex items-center gap-2 bg-white text-black font-medium px-7 py-3 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all text-sm active:scale-95"
            >
              Browse tools
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg/ezbeam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.04] text-neutral-400 hover:text-white font-medium px-7 py-3 rounded-full border border-white/[0.08] hover:border-white/[0.15] transition-all text-sm"
            >
              Join the Discord
            </a>
          </motion.div>

          <div className="mono-strip mt-14">
            <span>{toolsList.length} Tools</span>
            <span>{sitesList.length} Sites</span>
            <span>Real-time</span>
            <span>Free</span>
          </div>
        </section>

        {/* Mobile / Inline Search */}
        <div className="lg:hidden mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-neutral-400 transition-colors" />
            <input
              type="text"
              placeholder="Search tools and sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-white/[0.15] transition-all text-white placeholder:text-neutral-700"
            />
          </div>
        </div>

        {/* Rewards Program Banner */}
        <section className="mb-14">
          <button
            onClick={() => navigate('/rewards')}
            className="w-full text-left block group cursor-pointer"
          >
            <div className="panel card-hover beam-border p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="eyebrow">
                    <Wallet className="w-3.5 h-3.5 text-white/70" />
                    Video Rewards
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mt-2 mb-3">
                    Edit our video. Post for rewards.
                  </h2>
                  <p className="text-neutral-500 text-sm md:text-base max-w-2xl leading-relaxed">
                    Grab our promo video, cut your own edit, post on YouTube or TikTok and claim free Robux, stacked accounts, or cash. Simple payouts up to 50,000 R$.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-white font-medium text-sm group-hover:translate-x-1 transition-transform">
                  <span>View Rewards Program</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </button>
        </section>

        {/* Announcement Section */}
        <section className="mb-14">
          <div className="panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Megaphone className="w-5 h-5 text-neutral-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">Looking for advertisers</p>
              <p className="text-neutral-600 text-[13px]">
                Join our advertising Discord — ready-to-post videos, thumbnails, titles and more.
              </p>
            </div>
            <a
              href="https://discord.gg/nRtsXw8s2"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium rounded-full border border-white/[0.08] hover:border-white/[0.15] transition-all"
            >
              Join Discord
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Sites Section */}
        <section id="sites" className="scroll-mt-28 mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600 mb-2 font-mono">
                Network
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Sites
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSites.map((site) => {
              const Icon = site.icon;
              const content = (
                <div className="panel card-hover panel-accent-top p-5 h-full flex flex-col group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-white/[0.04] rounded-xl border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-500">
                      <Icon className="w-[18px] h-[18px] text-neutral-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    {site.live && (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/80 uppercase tracking-wider">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                          </span>
                          Live
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-[15px] font-medium tracking-tight text-neutral-200 group-hover:text-white transition-colors">
                    {site.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-neutral-600 leading-relaxed line-clamp-2 flex-1">
                    {site.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] font-medium text-neutral-700 group-hover:text-neutral-400 transition-colors">
                    Open
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              );

              return site.external ? (
                <a
                  key={site.title}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {content}
                </a>
              ) : (
                <button
                  key={site.title}
                  onClick={() => navigate(site.href)}
                  className="block h-full text-left w-full cursor-pointer"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tools & Services Section */}
        <section id="tools" className="scroll-mt-28 mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600 mb-2 font-mono">
                Arsenal
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Tools &amp; Services
              </h2>
            </div>
            <span className="px-3 py-1 bg-white/[0.04] text-neutral-500 border border-white/[0.06] rounded-full text-[11px] font-mono tracking-wider">
              {filteredTools.length} active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  onClick={tool.onClick}
                  className="h-full cursor-pointer"
                >
                  <div className="panel card-hover panel-accent-top p-5 h-full flex flex-col group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 bg-white/[0.04] rounded-xl border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-500">
                        <Icon className="w-[18px] h-[18px] text-neutral-500 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-neutral-500 px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-full uppercase tracking-wider">
                          {tool.badge}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-[15px] font-medium tracking-tight text-neutral-200 group-hover:text-white transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-neutral-600 leading-relaxed line-clamp-2 flex-1">
                      {tool.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] font-medium text-neutral-700 group-hover:text-neutral-400 transition-colors">
                      Open
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Performance & Atmosphere Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-14">
          <div className="lg:col-span-7">
            <PerformanceWidget />
          </div>
          <div className="lg:col-span-5">
            <AtmosphereWidget />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
