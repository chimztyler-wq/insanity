import React from 'react';
import {
  Megaphone,
  ChevronRight,
  Wallet,
  Youtube,
  Music2,
  Users,
  CheckCircle,
  TriangleAlert,
  ChevronDown,
} from 'lucide-react';
import { ToolTopBar } from '../components/ToolTopBar';
import { SiteBackground } from '../components/SiteBackground';
import { useNavigation } from '../navigation';

export function Rewards() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-black text-zinc-300 overflow-hidden relative selection:bg-white/30">
      <SiteBackground />
      <ToolTopBar />

      <div className="relative z-10 pt-32 px-6 pb-20 max-w-[1000px] mx-auto">
        {/* Advertisers banner */}
        <div className="mb-14">
          <div className="panel p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="p-3 bg-white/10 rounded-xl border border-white/[0.08] shrink-0">
              <Megaphone className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-extrabold tracking-tight">
                Looking for advertisers
              </h3>
              <p className="text-zinc-500 text-sm mt-0.5">
                Join our advertising Discord — ready-to-post videos, thumbnails, titles and more.
              </p>
            </div>
            <a
              href="https://discord.gg/nRtsXw8s2"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/15 text-zinc-200 hover:text-neutral-200 font-bold text-xs uppercase tracking-widest rounded-xl border border-white/10 hover:border-white/[0.12] transition-all"
            >
              Join now
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Video promo showcase */}
        <div className="mb-16 animate-in fade-in duration-700">
          <div className="panel overflow-hidden relative">
            <video
              src="/videos/promo.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full aspect-video object-contain bg-black"
            />
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 backdrop-blur border border-white/[0.12] text-xs font-bold text-neutral-300">
              <Wallet className="w-4 h-4 text-white/70" />
              2,000 Views = 5,000 R$
            </div>
            <div className="ground-fog" />
          </div>

          <div className="text-center mt-10">
            <h1 className="text-5xl font-black text-white tracking-tight mb-4 uppercase italic font-display">
              Edit Our Video. <span className="text-white">Post for Rewards.</span>
            </h1>
            <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Download the original above, make it{' '}
              <strong className="text-white">your own edit</strong>, send it back through our{' '}
              <strong className="text-white">Discord support ticket</strong>. Once approved, post
              it, hit the view milestones and{' '}
              <strong className="text-white">claim your rewards</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/videos/promo.mp4"
                download="promo.mp4"
                className="inline-flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/20 px-8 py-4 rounded-xl transition-all"
              >
                <Youtube className="w-5 h-5" />
                Download Original Video
              </a>
              <a
                href="https://discord.gg/zmWTKfHFM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-200 text-black font-semibold text-sm px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                Join Discord &amp; Submit Your Edit
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="panel p-5">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-black mb-3">
                1
              </span>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">
                Edit the video
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Download it above and make it your own: clips, captions, sound, effects.
              </p>
            </div>

            <div className="panel p-5">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/[0.08] text-white/70 font-black mb-3">
                2
              </span>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">
                Send it to our Discord
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Open a support ticket and attach your edit. Our team reviews and approves it.
              </p>
            </div>

            <div className="panel p-5">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black mb-3">
                3
              </span>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">
                Post it for rewards
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Once approved, post it on YouTube or TikTok. Hit the view milestones and claim your
                Robux.
              </p>
            </div>
          </div>

          <a
            href="#payouts"
            className="mt-12 flex flex-col items-center gap-2 text-zinc-500 hover:text-white/70 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-widest">
              Scroll down for more
            </span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </div>

        {/* Payout Rates */}
        <div id="payouts" className="mb-12 scroll-mt-32">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight font-display">
              Payout <span className="text-white">Rates</span>
            </h2>
            <p className="text-zinc-500 font-medium mt-2">
              Every view counts, here's what you earn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* YouTube */}
            <div className="panel panel-clickable p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  YouTube
                </h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-medium text-zinc-400">2,000 Views</span>
                  <span className="font-bold text-white">5,000 R$</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-medium text-zinc-400">6,000 Views</span>
                  <span className="font-bold text-white">15,000 R$</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-medium text-zinc-400">10,000 Views</span>
                  <span className="font-bold text-white">
                    25,000 R$ <span className="text-zinc-600 text-sm font-normal">or</span> Korblox Acc
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-zinc-400">20,000 Views</span>
                  <span className="font-bold text-white/70">
                    50,000 R$ + Korblox &amp; Headless
                  </span>
                </li>
                <li className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-white/70/80 uppercase tracking-widest">
                    Rate
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    5,000 R$ per every 2,000 views
                  </span>
                </li>
              </ul>
            </div>

            {/* TikTok */}
            <div className="panel panel-clickable p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Music2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  TikTok
                </h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-medium text-zinc-400">7,000 Views</span>
                  <span className="font-bold text-white">
                    4,500 R$ <span className="text-zinc-600 text-sm font-normal">or</span> 3 Stacked Accs
                  </span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-medium text-zinc-400">15,000 Views</span>
                  <span className="font-bold text-white">
                    7,500 R$ <span className="text-zinc-600 text-sm font-normal">or</span> Stacked Limiteds Acc
                  </span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-medium text-zinc-400">45,000 Views</span>
                  <span className="font-bold text-white/70">
                    15,000 R$ <span className="text-zinc-600 text-sm font-normal">or</span> Korblox &amp; Headless
                  </span>
                </li>
                <li className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-white/70/80 uppercase tracking-widest">
                    Bonus
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    +100 R$ per 150 views above 45k
                  </span>
                </li>
              </ul>
            </div>

            {/* Discord Invites */}
            <div className="md:col-span-2 panel p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/[0.12]">
                    <Users className="w-6 h-6 text-white/70" />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                    Discord Invites
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">5 Invites</span>
                    <span className="font-bold text-white">1 Stacked Account</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">10 Invites</span>
                    <span className="font-bold text-white">2 Stacked Accounts</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">15 Invites</span>
                    <span className="font-bold text-white">3 Stacked Accounts</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">20 Invites</span>
                    <span className="font-bold text-white">4 Stacked Accounts</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">30 Invites</span>
                    <span className="font-bold text-white">5 Stacked Accounts</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">40 Invites</span>
                    <span className="font-bold text-white">3,000 Robux</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">50 Invites</span>
                    <span className="font-bold text-white">4,500 R$ + 4 Stacked Accs</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">60 Invites</span>
                    <span className="font-bold text-white">5,000 R$ + 6 Stacked Accs</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">80 Invites</span>
                    <span className="font-bold text-white">10,000 R$ + 8 Stacked Accs</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-medium text-zinc-400">100 Invites</span>
                    <span className="font-bold text-white">15,000 R$ + 10 Stacked Accs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-400">120 Invites</span>
                    <span className="font-bold text-white/70">Headless + Korblox Acc</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-400">120+ Invites</span>
                    <span className="font-bold text-white/70">+500 R$ per 2 invites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="panel p-6 sm:p-8">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              How It Works
            </h3>
            <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                <strong className="text-white">1. Download the original:</strong> Grab our promo
                video from the section above.
              </p>
              <p>
                <strong className="text-white">2. Edit it your way:</strong> Cut clips, add captions,
                sound, effects, make the video stand out. Original edits perform best.
              </p>
              <p>
                <strong className="text-white">3. Post it on YouTube:</strong> Once your edit is
                done, upload it to YouTube.
              </p>
              <p>
                <strong className="text-white">4. Send it in support:</strong> Open a support ticket
                in our Discord server, attach your edited video and your YouTube link. Our team reviews
                and approves it.
              </p>
              <p>
                <strong className="text-white">5. Claim your rewards:</strong> Hit the view milestones
                above and open a ticket to claim your Robux, Accounts, or Real Money!
              </p>
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-yellow-500/70" />
              Important Notes
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">•</span> Edits must be approved through a Discord
                support ticket before posting.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">•</span> All rewards are manually verified by our
                team.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">•</span> Absolutely NO botting or fake engagement
                allowed.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">•</span> Content must remain public until fully
                verified.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">•</span> Please allow 2-4 hours for processing
                time.
              </li>
              <li className="flex items-start gap-2 mt-4 pt-4 border-t border-white/5">
                <div>
                  <strong className="text-white">Supported Payment Methods:</strong>
                  <br />
                  Robux, Crypto (BTC/LTC), CashApp, PayPal, Nitro.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
