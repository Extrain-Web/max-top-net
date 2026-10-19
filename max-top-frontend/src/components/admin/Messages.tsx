"use client";

import { useEffect, useState } from 'react';
import { Loader2, Trash2, Mail, Phone, MapPin, Package as PkgIcon, Check } from 'lucide-react';
import { apiGet, apiSend } from '@/lib/api';

interface Msg {
  _id: string; name: string; email: string; phone: string; subject: string;
  message: string; type: string; package: string; address: string; read: boolean; createdAt: string;
}

export default function Messages() {
  const [items, setItems] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setItems(await apiGet<Msg[]>('/messages')); } catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const markRead = async (m: Msg) => {
    if (m.read) return;
    await apiSend(`/messages/${m._id}/read`, 'PUT');
    setItems((p) => p.map((x) => (x._id === m._id ? { ...x, read: true } : x)));
  };
  const remove = async (m: Msg) => {
    if (!confirm('Delete this message?')) return;
    await apiSend(`/messages/${m._id}`, 'DELETE');
    setItems((p) => p.filter((x) => x._id !== m._id));
  };

  return (
    <div>
      <div className="res-head"><div><h2>Messages / Connection Requests</h2><p style={{ color: '#64788f', fontSize: '0.9rem' }}>{items.length} messages</p></div></div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64788f' }}><Loader2 className="spin" /> Loading...</div>
      ) : (
        <div className="res-list">
          {items.map((m) => (
            <div key={m._id} className="res-item" style={{ alignItems: 'flex-start', flexDirection: 'column', background: m.read ? '#fff' : '#f0f9e8', borderLeft: m.read ? 'none' : '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div>
                  <h4 style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>
                    {m.name} {!m.read && <span className="badge-on">New</span>}
                  </h4>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', color: '#64788f', fontSize: '0.85rem', marginTop: 6 }}>
                    {m.phone && <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><Phone size={14} /> {m.phone}</span>}
                    {m.email && <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><Mail size={14} /> {m.email}</span>}
                    {m.package && <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><PkgIcon size={14} /> {m.package}</span>}
                    {m.address && <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><MapPin size={14} /> {m.address}</span>}
                  </div>
                </div>
                <div className="res-actions">
                  {!m.read && <button className="icon-btn edit" onClick={() => markRead(m)} title="Mark as read"><Check size={16} /></button>}
                  <button className="icon-btn del" onClick={() => remove(m)}><Trash2 size={16} /></button>
                </div>
              </div>
              {m.subject && <p style={{ color: 'var(--ink)', fontWeight: 600, marginTop: 8 }}>{m.subject}</p>}
              {m.message && <p style={{ color: '#475569', fontSize: '0.92rem', marginTop: 4 }}>{m.message}</p>}
              <span style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: 8 }}>{new Date(m.createdAt).toLocaleString()}</span>
            </div>
          ))}
          {!items.length && <p style={{ color: '#64788f', textAlign: 'center', padding: '2rem' }}>No messages.</p>}
        </div>
      )}
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}
