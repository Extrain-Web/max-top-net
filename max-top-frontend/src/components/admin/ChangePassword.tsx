"use client";

import { useState } from 'react';
import { Loader2, KeyRound } from 'lucide-react';
import { apiSend } from '@/lib/api';

export default function ChangePassword() {
  const [cur, setCur] = useState('');
  const [nw, setNw] = useState('');
  const [cf, setCf] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (nw !== cf) return setMsg({ type: 'err', text: 'New passwords do not match' });
    if (nw.length < 6) return setMsg({ type: 'err', text: 'Password must be at least 6 characters' });
    setBusy(true);
    try {
      await apiSend('/auth/change-password', 'PUT', { currentPassword: cur, newPassword: nw });
      setMsg({ type: 'ok', text: 'Password changed successfully!' });
      setCur(''); setNw(''); setCf('');
    } catch (e: any) {
      setMsg({ type: 'err', text: e.message || 'Failed' });
    } finally { setBusy(false); }
  };

  return (
    <div>
      <div className="res-head"><h2>Change Password</h2></div>
      <form onSubmit={submit} style={{ maxWidth: 460, background: '#fff', borderRadius: 16, padding: '1.8rem', display: 'grid', gap: '1.1rem', boxShadow: '0 4px 16px rgba(15,27,45,0.06)' }}>
        {msg && <div className={`admin-alert ${msg.type === 'ok' ? 'ok' : 'err'}`}>{msg.text}</div>}
        <div><label className="label">Current Password</label><input className="field" type="password" required value={cur} onChange={(e) => setCur(e.target.value)} /></div>
        <div><label className="label">New Password</label><input className="field" type="password" required value={nw} onChange={(e) => setNw(e.target.value)} /></div>
        <div><label className="label">New Password (again)</label><input className="field" type="password" required value={cf} onChange={(e) => setCf(e.target.value)} /></div>
        <button className="btn btn-primary" disabled={busy} style={{ justifyContent: 'center' }}>
          {busy ? <><Loader2 size={16} className="spin" /> Changing...</> : <><KeyRound size={16} /> Change Password</>}
        </button>
      </form>
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}
