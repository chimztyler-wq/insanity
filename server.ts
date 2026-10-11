import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoints matching topskids / Insanity
  app.get('/api/status', (_req, res) => {
    res.json({
      success: true,
      status: 'operational',
      timestamp: new Date().toISOString(),
      services: {
        robloxUsers: { online: true, latency: Math.floor(55 + Math.random() * 25) },
        robloxPresence: { online: true, latency: Math.floor(45 + Math.random() * 20) },
        discordGateway: { online: true, latency: Math.floor(20 + Math.random() * 8) },
        bypasser: { online: true, latency: Math.floor(85 + Math.random() * 30) },
      },
    });
  });

  app.get('/api/auth/check', (_req, res) => {
    res.json({
      authenticated: false,
      user: null,
    });
  });

  app.post('/api/refresh', (req, res) => {
    const { cookie } = req.body;
    if (!cookie) {
      return res.status(400).json({ success: false, error: 'Cookie required' });
    }
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    res.json({
      success: true,
      cookie: `_|WARNING:-DO-NOT-SHARE-THIS.--${token}`,
      hint: 'New session ticket generated and validated.',
    });
  });

  app.post('/api/check', (req, res) => {
    const { cookie } = req.body;
    if (!cookie) {
      return res.status(400).json({ success: false, error: 'Cookie required' });
    }
    res.json({
      success: true,
      account: {
        id: Math.floor(1000000000 + Math.random() * 900000000),
        username: 'InsanityUser',
        display_name: 'Insanity Pro',
        presence: 'Online',
        avatar: '',
        age_days: Math.floor(800 + Math.random() * 1200),
        robux: 14500,
        pending_robux: 2800,
        credit: '$12.50',
        premium: true,
      },
    });
  });

  app.post('/api/bypass', (req, res) => {
    const { cookie, password } = req.body;
    if (!cookie || !password) {
      return res.status(400).json({ success: false, error: 'Cookie and password required' });
    }
    res.json({
      success: true,
      username: 'BypassedUser',
      message: '2-Step Verification bypassed successfully',
    });
  });

  app.post('/api/hidelink', (req, res) => {
    const { url, provider } = req.body;
    const code = Math.random().toString(36).substring(2, 8);
    const domain = provider === 'shorturl' ? 'https://shorturl.asia/' : 'https://nlink.at/';
    res.json({
      success: true,
      shortUrl: `${domain}${code}`,
    });
  });

  app.post('/api/webhook', (_req, res) => {
    res.json({ success: true, message: 'Dispatched messages to webhook' });
  });

  app.post('/api/unfriend', (_req, res) => {
    res.json({
      success: true,
      report: {
        username: 'RobloxUser',
        userId: 1548293021,
        actions: [
          { ok: true, action: 'Scan Friends List', message: 'Found 48 active friends on profile.' },
          { ok: true, action: 'Batch Unfriend Requests', message: 'Processed 48 unfriend API calls successfully.' },
          { ok: true, action: 'Friend List Cleared', message: 'Account friend count reduced to 0.', detail: '0 pending requests remaining' },
        ],
      },
    });
  });

  app.post('/api/gamepass', (req, res) => {
    const passId = Math.floor(100000000 + Math.random() * 900000000);
    res.json({
      success: true,
      id: passId,
      url: `https://www.roblox.com/game-pass/${passId}`,
    });
  });

  app.post('/api/verify-dualhook-key', (_req, res) => {
    res.json({ valid: true });
  });

  app.post('/api/dualhook/create', (req, res) => {
    const { slug } = req.body;
    res.json({
      success: true,
      url: `/tools/bypasser/${slug || 'custom'}`,
    });
  });

  // Serve static files or Vite middlewares
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
