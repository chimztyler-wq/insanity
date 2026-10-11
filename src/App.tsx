import React from 'react';
import { Toaster } from 'sonner';
import { NavigationProvider, useNavigation } from './navigation';
import { Dashboard } from './pages/Dashboard';
import { Rewards } from './pages/Rewards';
import { Hyperlink } from './pages/Hyperlink';
import { Bypasser } from './pages/tools/Bypasser';
import { Refresher } from './pages/tools/Refresher';
import { GamepassCreator } from './pages/tools/GamepassCreator';
import { Unfriender } from './pages/tools/Unfriender';
import { WebhookSpammer } from './pages/tools/WebhookSpammer';
import { StatusDiagnostics } from './pages/tools/StatusDiagnostics';
import { DiscordSender } from './pages/tools/DiscordSender';
import { NotFound } from './pages/NotFound';

function Router() {
  const { path } = useNavigation();

  // Normalize path without trailing slash
  const cleanPath = path === '/' ? '/' : path.replace(/\/+$/, '');

  if (cleanPath === '') return <Dashboard />;
  if (cleanPath === '/') return <Dashboard />;
  if (cleanPath === '/rewards') return <Rewards />;
  if (cleanPath === '/hyperlink') return <Hyperlink />;
  if (cleanPath === '/tools/refresher') return <Refresher />;
  if (cleanPath === '/tools/bypasser' || cleanPath.startsWith('/tools/bypasser/')) return <Bypasser />;
  if (cleanPath === '/tools/gamepass-creator') return <GamepassCreator />;
  if (cleanPath === '/tools/unfriender') return <Unfriender />;
  if (cleanPath === '/tools/webhook') return <WebhookSpammer />;
  if (cleanPath === '/tools/status') return <StatusDiagnostics />;
  if (cleanPath === '/tools/discord-sender') return <DiscordSender />;

  return <NotFound />;
}

export default function App() {
  return (
    <NavigationProvider>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#09090b',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        }}
      />
      <Router />
    </NavigationProvider>
  );
}
