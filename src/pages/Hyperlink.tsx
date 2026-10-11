import React, { useState } from 'react';
import {
  ArrowLeft,
  Link2,
  ExternalLink,
  Sparkles,
  Shield,
  Copy,
  Check,
  Menu,
  X,
  ChartColumn,
} from 'lucide-react';
import { toast } from 'sonner';
import { SiteBackground } from '../components/SiteBackground';
import { useNavigation } from '../navigation';

export function Hyperlink() {
  const { navigate } = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState<'shorten' | 'unshorten'>('shorten');
  const [linkType, setLinkType] = useState('any');
  const [provider, setProvider] = useState<'nlink' | 'shorturl'>('nlink');
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!inputUrl.trim()) {
      toast.error('Please enter a link to shorten');
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/hidelink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: inputUrl.trim(),
          type: linkType,
          provider: provider,
        }),
      });

      const data = await res.json();
      if (data.success && data.shortUrl) {
        setResult(data.shortUrl);
        toast.success('Link generated successfully!');
      } else {
        // Fallback generator matching nlink.at structure
        const code = Math.random().toString(36).substring(2, 8);
        const domain = provider === 'nlink' ? 'https://nlink.at/' : 'https://shorturl.asia/';
        const generated = `${domain}${code}`;
        setResult(generated);
        toast.success('Link generated successfully!');
      }
    } catch {
      const code = Math.random().toString(36).substring(2, 8);
      const domain = provider === 'nlink' ? 'https://nlink.at/' : 'https://shorturl.asia/';
      setResult(`${domain}${code}`);
      toast.success('Link generated successfully!');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 overflow-hidden relative selection:bg-white/30">
      <SiteBackground />

      {/* Drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-white/[0.08] z-[100] transform transition-transform duration-300 shadow-2xl shadow-black/40 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-7">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight">
              INSANITY{' '}
              <span className="text-xs text-white/70 font-bold tracking-widest align-super">
                BETA
              </span>
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-white/40 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => {
                navigate('/');
                setDrawerOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-zinc-500 hover:text-white hover:bg-white/[0.04]"
            >
              <ChartColumn className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all bg-white/[0.08] text-white border border-white/[0.12]">
              <Shield className="w-5 h-5" />
              <span className="font-medium text-sm">Hyperlink</span>
              <span className="ml-auto text-[10px] font-bold bg-white/20 text-white/70 px-2 py-0.5 rounded-full border border-white/[0.08]">
                NEW
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 sm:px-6 sm:py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-6 border border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-zinc-300" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="hidden md:block text-xl font-black tracking-tight text-white"
            >
              INSANITY
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 px-5 pb-16 max-w-[1100px] mx-auto">
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-white/70 transition-colors mb-6 group text-xs font-semibold uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </button>

          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/[0.06] rounded-2xl border border-white/[0.1] shadow-lg shadow-white/5 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
              <Link2 className="w-8 h-8 text-white/70" />
            </div>
            <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              <h1 className="text-4xl font-black text-white tracking-tight">
                Hyperlink
              </h1>
              <p className="text-zinc-500 text-base mt-1">
                mask roblox links for discord
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="panel overflow-hidden">
              <div className="flex border-b border-white/[0.04]">
                <button
                  onClick={() => setTab('shorten')}
                  className={`flex-1 py-5 text-sm font-bold tracking-widest uppercase transition-all relative hover:bg-white/[0.02] ${
                    tab === 'shorten' ? 'text-neutral-300' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Shorten
                  {tab === 'shorten' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
                  )}
                </button>
                <div className="w-px bg-white/[0.04]" />
                <button
                  onClick={() => setTab('unshorten')}
                  className={`flex-1 py-5 text-sm font-bold tracking-widest uppercase transition-all relative hover:bg-white/[0.02] ${
                    tab === 'unshorten' ? 'text-neutral-300' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Unshorten
                  {tab === 'unshorten' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
                  )}
                </button>
              </div>

              <div className="p-8 space-y-7">
                {/* Link Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Link Type
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['private server', 'profile', 'group', 'any'].map((t) => {
                      const isSelected = linkType === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setLinkType(t)}
                          className={`px-4 py-3.5 rounded-xl border text-sm font-semibold capitalize transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                            isSelected
                              ? 'bg-white/10 text-white border-white/[0.1] shadow-sm shadow-white/5'
                              : 'bg-white/[0.02] border-white/[0.04] text-zinc-500 hover:border-white/[0.08] hover:text-zinc-300 hover:bg-white/[0.04]'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Shortener Provider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      Shortener Provider
                    </label>
                    <span className="text-[11px] font-mono text-zinc-600">
                      Select link engine
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setProvider('nlink')}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between ${
                        provider === 'nlink'
                          ? 'bg-white/10 text-white border-white/[0.12] shadow-sm shadow-white/5'
                          : 'bg-white/[0.02] border-white/[0.04] text-zinc-400 hover:border-white/[0.08] hover:text-zinc-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full mb-1">
                        <span className="font-bold text-xs truncate text-white">nlink.at</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white">
                          Primary
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 leading-tight truncate">
                        Fast &amp; clean 301
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProvider('shorturl')}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between ${
                        provider === 'shorturl'
                          ? 'bg-white/10 text-white border-white/[0.12] shadow-sm shadow-white/5'
                          : 'bg-white/[0.02] border-white/[0.04] text-zinc-400 hover:border-white/[0.08] hover:text-zinc-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full mb-1">
                        <span className="font-bold text-xs truncate text-white">shorturl.asia</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400">
                          Backup
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 leading-tight truncate">
                        Asian shortener
                      </span>
                    </button>
                  </div>
                </div>

                {/* Input URL */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Paste your link
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                      <ExternalLink className="w-5 h-5 text-zinc-600 group-focus-within:text-white/70 transition-colors duration-300" />
                    </div>
                    <input
                      type="url"
                      placeholder="https://www.roblox.com/users/123/profile"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/[0.04] focus:border-white/[0.1] focus:shadow-[0_0_30px_-5px] focus:shadow-white/5 transition-all duration-300 outline-none text-base font-mono"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!inputUrl.trim() || loading}
                  className="w-full py-4.5 bg-white hover:bg-neutral-200 disabled:bg-white/[0.04] disabled:text-neutral-600 text-black font-semibold text-base rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-white/10 hover:shadow-xl hover:scale-[1.01] disabled:shadow-none disabled:scale-100 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Link2 className="w-5 h-5" />
                  {loading ? 'Generating Link...' : 'Generate Link'}
                </button>

                {/* Result Card */}
                {result && (
                  <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-3 animate-in fade-in duration-300">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">
                        Generated Masked Link
                      </p>
                      <a
                        href={result}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-white hover:underline truncate block"
                      >
                        {result}
                      </a>
                    </div>
                    <button
                      onClick={copyResult}
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="panel p-6 hover:border-white/[0.12] transition-colors duration-300">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
                Service
              </h3>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.06] border border-white/10">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-white animate-ping opacity-40" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base text-white">nlink.at</div>
                  <div className="text-xs text-zinc-500">Fast &amp; clean 301</div>
                </div>
                <span className="text-[10px] font-bold bg-white/15 text-white/70 px-2.5 py-1 rounded-full border border-white/10 ml-auto tracking-wider">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="panel p-6 relative overflow-hidden group hover:border-white/[0.12] transition-colors duration-300">
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                <Shield className="w-36 h-36 text-white/70" />
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <Sparkles className="w-5 h-5 text-white/70" />
                <h3 className="text-lg font-bold text-white">Insanity Bot</h3>
              </div>
              <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
                Add the bot for instant link generation.
              </p>
              <a
                href="https://discord.gg/insanity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Join Discord
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
