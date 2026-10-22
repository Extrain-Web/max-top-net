"use client";

import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Settings as SettingsIcon, Image as ImageIcon, Grid3x3, Info, Tag,
  Package, Sparkles, HelpCircle, Star, Handshake, BellRing, FileText, Server, Tv,
  Gamepad2, MapPin, CreditCard, MessageSquare, KeyRound, LogOut, Menu, X, Loader2, Lock, Wrench,
} from 'lucide-react';
import { apiGet, login, clearToken, getToken } from '@/lib/api';
import { RESOURCES, SETTINGS_FIELDS, ABOUT_FIELDS, POPUP_FIELDS } from '@/components/admin/schemas';
import ResourceManager from '@/components/admin/ResourceManager';
import SingletonEditor from '@/components/admin/SingletonEditor';
import PagesEditor from '@/components/admin/PagesEditor';
import Messages from '@/components/admin/Messages';
import Dashboard from '@/components/admin/Dashboard';
import ChangePassword from '@/components/admin/ChangePassword';

const NAV = [
  { group: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    group: 'Homepage',
    items: [
      { id: 'settings', label: 'Site Settings', icon: SettingsIcon },
      { id: 'hero', label: 'Hero Slider', icon: ImageIcon },
      { id: 'services', label: 'Service Circles', icon: Grid3x3 },
      { id: 'about', label: 'About Section', icon: Info },
      { id: 'offers', label: 'Offer Banners', icon: Tag },
      { id: 'packages', label: 'Packages', icon: Package },
      { id: 'features', label: 'Features', icon: Sparkles },
      { id: 'faqs', label: 'FAQ', icon: HelpCircle },
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'partners', label: 'Partners', icon: Handshake },
      { id: 'popup', label: 'Popup Banner', icon: BellRing },
    ],
  },
  {
    group: 'Menu Pages',
    items: [
      { id: 'pages', label: 'Page Content', icon: FileText },
      { id: 'service-items', label: 'Services', icon: Wrench },
      { id: 'ftp', label: 'FTP Links', icon: Server },
      { id: 'channels', label: 'TV Channels', icon: Tv },
      { id: 'game-servers', label: 'Game Servers', icon: Gamepad2 },
      { id: 'areas', label: 'Area Coverage', icon: MapPin },
      { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
    ],
  },
  {
    group: 'Other',
    items: [
      { id: 'messages', label: 'Messages', icon: MessageSquare },
      { id: 'password', label: 'Password', icon: KeyRound },
    ],
  },
];

const LABELS: Record<string, string> = Object.fromEntries(
  NAV.flatMap((g) => g.items.map((i) => [i.id, i.label]))
);

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) { setAuthed(false); return; }
    apiGet('/auth/me').then(() => setAuthed(true)).catch(() => { clearToken(); setAuthed(false); });
  }, []);

  if (authed === null) {
    return <div className="admin-login"><Loader2 color="#fff" className="spin" size={40} /><style>{`.spin{animation:spinSlow 1s linear infinite}`}</style></div>;
  }

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  const renderView = () => {
    if (view === 'dashboard') return <Dashboard go={setView} />;
    if (view === 'settings') return <SingletonEditor title="Site Settings" endpoint="/settings" fields={SETTINGS_FIELDS} />;
    if (view === 'about') return <SingletonEditor title="About Section" endpoint="/about" fields={ABOUT_FIELDS} />;
    if (view === 'popup') return <SingletonEditor title="Popup Banner" endpoint="/popup" fields={POPUP_FIELDS} />;
    if (view === 'pages') return <PagesEditor />;
    if (view === 'messages') return <Messages />;
    if (view === 'password') return <ChangePassword />;
    if (RESOURCES[view]) return <ResourceManager config={RESOURCES[view]} />;
    return null;
  };

  const logout = () => { clearToken(); setAuthed(false); };

  return (
    <div className="admin-root">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand">Max<b>top</b>Admin</div>
        <nav className="admin-nav">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="group-label">{g.group}</div>
              {g.items.map((it) => {
                const I = it.icon;
                return (
                  <button key={it.id} className={`admin-nav-item ${view === it.id ? 'active' : ''}`} onClick={() => { setView(it.id); setSidebarOpen(false); }}>
                    <I size={18} /> {it.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <button className="logout" onClick={logout}><LogOut size={18} /> Log Out</button>
      </aside>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 45 }} />}

      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button className="admin-mobile-btn" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <h1>{LABELS[view] || 'Dashboard'}</h1>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Site</a>
        </div>
        <div className="admin-content">{renderView()}</div>
      </div>
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await login(email, password);
      onSuccess();
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    } finally { setBusy(false); }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Lock size={30} color="var(--primary-700)" />
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>Max<span style={{ color: 'var(--primary)' }}>top</span> Admin</h2>
          <p style={{ color: '#64788f', fontSize: '0.92rem', marginTop: 6 }}>Sign in to access the dashboard</p>
        </div>
        {err && <div className="admin-alert err">{err}</div>}
        <div style={{ marginBottom: '1rem' }}>
          <label className="label">Email</label>
          <input className="field" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@maxtopnet.com" />
        </div>
        <div style={{ marginBottom: '1.4rem' }}>
          <label className="label">Password</label>
          <input className="field" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="btn btn-primary" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
          {busy ? <><Loader2 size={18} className="spin" /> Signing in...</> : 'Sign In'}
        </button>
        <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
      </form>
    </div>
  );
}
