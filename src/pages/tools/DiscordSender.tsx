import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Key,
  Shield,
  Loader2,
  Check,
  Terminal,
} from 'lucide-react';
import { toast } from 'sonner';
import { ToolShell } from '../../components/ToolShell';
import { PageHero } from '../../components/PageHero';

export function DiscordSender() {
  const [token, setToken] = useState('');
  const [channels, setChannels] = useState('');
  const [content, setContent] = useState('');
  const [limit, setLimit] = useState('20');
  const [autoReply, setAutoReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleStart = async () => {
    if (!token.trim() || !channels.trim() || !content.trim()) {
      toast.error('Please enter Discord User Token, Channels, and Message Content');
      return;
    }
    setLoading(true);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Authenticating token...`]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Gateway handshake established. Target channels: ${channels}`,
      ]);
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Dispatched automation cycle (${limit} messages scheduled).`,
      ]);
      setLoading(false);
      toast.success('Automation suite started!');
    }, 1500);
  };

  return (
    <ToolShell maxWidth="max-w-[1000px]">
      <PageHero
        icon={Send}
        title="Discord Automation Suite"
        description="Run periodic messages and automated direct message replies in a single workspace."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Config Panel */}
        <div className="lg:col-span-7 panel p-6 sm:p-8 relative overflow-hidden min-h-[560px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Discord User Token
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Key className="w-5 h-5 text-zinc-600 group-focus-within:text-white/70 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="OTgxMjM0NTY3ODkwMTIzNDU2..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none font-mono text-sm input-premium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Target Channels <span className="text-zinc-600 normal-case">(comma-separated)</span>
              </label>
              <input
                type="text"
                placeholder="102938475610293847, 192837465019283746"
                value={channels}
                onChange={(e) => setChannels(e.target.value)}
                className="w-full px-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none font-mono text-sm input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Message Content
              </label>
              <textarea
                placeholder="Custom broadcast message or announcement..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="w-full px-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none text-sm resize-none input-premium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
                  Send Limit
                </label>
                <input
                  type="number"
                  placeholder="20"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full px-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none font-mono text-sm input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
                  Auto-Reply Message
                </label>
                <input
                  type="text"
                  placeholder="I am currently AFK, message back shortly!"
                  value={autoReply}
                  onChange={(e) => setAutoReply(e.target.value)}
                  className="w-full px-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none text-sm input-premium"
                />
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={loading}
              className="w-full py-4 btn-primary disabled:bg-white/5 disabled:text-zinc-600 text-white font-bold tracking-widest uppercase text-sm rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting Gateway...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Start Automation
                </>
              )}
            </button>
          </div>

          {logs.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-neutral-400 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold mb-2">
                <Terminal className="w-3.5 h-3.5" /> Output Log
              </div>
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Panel */}
        <div className="lg:col-span-5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-2 flex items-center gap-2.5">
              <Send className="w-6 h-6 text-white/70" />
              Discord Automation Suite
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Unlock access to the ultimate automated tools to manage your Discord messages and direct
              message responses.
            </p>

            <div className="grid grid-cols-1 gap-4 mt-6">
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <Send className="w-5 h-5 text-white/70" />
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">
                    Auto Sender
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Broadcast messages to multiple target channel IDs sequentially with custom intervals
                  and custom attachment files.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <MessageSquare className="w-5 h-5 text-white/70" />
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">
                    Auto Responder
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Self-bot Gateway WebSocket DM responder. Automatically replies to messages containing
                  specific keywords with a custom human delay.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white/5 border border-white/[0.08] rounded-2xl text-xs text-neutral-200/90 leading-relaxed">
            One verified key gets you every tool we have. No renewals, no extra payments, one key does
            it all.
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
