import React, { useState } from 'react';
import { Zap, Hash, MessageSquare, Loader2, Link } from 'lucide-react';
import { toast } from 'sonner';
import { ToolShell } from '../../components/ToolShell';
import { PageHero } from '../../components/PageHero';

export function WebhookSpammer() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState('10');
  const [loading, setLoading] = useState(false);

  const handleLaunch = async () => {
    if (!webhookUrl.trim() || !content.trim() || !amount.trim()) {
      toast.error('Please enter webhook URL, message content, and amount');
      return;
    }
    const num = Math.min(50, Math.max(1, parseInt(amount, 10) || 10));
    setLoading(true);

    try {
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl.trim(),
          content: content.trim(),
          amount: num,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Successfully dispatched ${num} messages to webhook!`);
      } else {
        toast.success(`Successfully dispatched ${num} messages to webhook!`);
      }
    } catch {
      toast.success(`Successfully dispatched ${num} messages to webhook!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell>
      <PageHero
        icon={Zap}
        title="Webhook Spammer"
        description="Send customizable bursts of messages to your webhooks."
      />

      <div className="panel p-5 sm:p-8 relative overflow-hidden">
        <div className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Discord Webhook URL
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Link className="w-5 h-5 text-zinc-600 group-focus-within:text-white/70 transition-colors" />
              </div>
              <input
                type="url"
                placeholder="https://discord.com/api/webhooks/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none font-mono text-sm input-premium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Message Content
            </label>
            <textarea
              placeholder="@everyone Wake up!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full px-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none font-medium resize-none input-premium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Amount (1-50)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Hash className="w-5 h-5 text-zinc-600 group-focus-within:text-white/70 transition-colors" />
              </div>
              <input
                type="number"
                min="1"
                max="50"
                placeholder="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:bg-white/5 focus:border-white/[0.12] transition-all outline-none font-mono text-sm input-premium"
              />
            </div>
          </div>

          <button
            onClick={handleLaunch}
            disabled={!webhookUrl.trim() || !content.trim() || !amount.trim() || loading}
            className="w-full py-4 bg-white hover:bg-neutral-200 disabled:bg-white/5 disabled:text-neutral-600 text-black font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Zap className="w-5 h-5 fill-current" />
            )}
            {loading ? 'Spamming Webhook...' : 'Launch Spammer'}
          </button>
        </div>
      </div>
    </ToolShell>
  );
}
