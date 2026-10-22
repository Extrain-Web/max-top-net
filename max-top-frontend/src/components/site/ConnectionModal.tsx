"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Loader2, Plug, Phone, Clock, Wallet } from 'lucide-react';
import { apiSend, getData } from '@/lib/api';
import { useSite } from './SiteProvider';

type Pkg = { _id: string; name: string; speed: string };

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useConnection = () => useContext(Ctx);

export default function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSite();
  const [show, setShow] = useState(false);
  const [pkgs, setPkgs] = useState<Pkg[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '', package: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  useEffect(() => {
    getData<Pkg[]>('/packages', []).then(setPkgs);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  const open = () => { setStatus('idle'); setShow(true); };
  const close = () => setShow(false);
  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending'); setErr('');
    try {
      await apiSend('/messages', 'POST', { ...form, type: 'connection', subject: 'New Connection Request' });
      setStatus('done');
      setForm({ name: '', phone: '', address: '', package: '', message: '' });
    } catch (e: any) {
      setErr(e.message || 'Something went wrong'); setStatus('error');
    }
  };

  const benefits = [
    { icon: <Clock size={16} />, text: 'Installation within 24–48 hours' },
    { icon: <CheckCircle2 size={16} />, text: '24/7 customer support' },
    { icon: <Wallet size={16} />, text: 'Free connection charge' },
  ];

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {show && (
        <div className="conn-backdrop" onClick={close}>
          <div className="conn-modal" onClick={(e) => e.stopPropagation()}>
            <button className="conn-close" onClick={close} aria-label="Close"><X size={20} /></button>

            {/* Left info panel */}
            <div className="conn-aside">
              <span className="conn-ic"><Plug size={24} /></span>
              <h3>Get Connection</h3>
              <p>Fill out the form and our team will reach out to you shortly to set up your connection.</p>
              <ul className="conn-benefits">
                {benefits.map((b, i) => (
                  <li key={i}>{b.icon} {b.text}</li>
                ))}
              </ul>
              <a href={`tel:${settings.topbarPhone}`} className="conn-call">
                <Phone size={16} /> {settings.topbarPhone}
              </a>
            </div>

            {/* Right form */}
            <div className="conn-main">
              {status === 'done' ? (
                <div className="conn-done">
                  <CheckCircle2 size={56} color="var(--primary)" />
                  <h4>Thank You!</h4>
                  <p>We&apos;ve received your request and will contact you soon.</p>
                  <button className="btn btn-ghost" onClick={close}>Close</button>
                </div>
              ) : (
                <form onSubmit={submit} className="conn-form">
                  <div className="conn-row">
                    <div>
                      <label className="label">Name *</label>
                      <input className="field" required value={form.name} onChange={(e) => upd('name', e.target.value)} />
                    </div>
                    <div>
                      <label className="label">Mobile Number *</label>
                      <input className="field" required value={form.phone} onChange={(e) => upd('phone', e.target.value)} />
                    </div>
                  </div>
                  <div className="conn-row">
                    <div>
                      <label className="label">Address / Area *</label>
                      <input className="field" required value={form.address} onChange={(e) => upd('address', e.target.value)} placeholder="Area, house no." />
                    </div>
                    <div>
                      <label className="label">Package</label>
                      <select className="field" value={form.package} onChange={(e) => upd('package', e.target.value)}>
                        <option value="">Select (optional)</option>
                        {pkgs.map((p) => <option key={p._id} value={`${p.speed} Mbps - ${p.name}`}>{p.speed} Mbps - {p.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Message (optional)</label>
                    <textarea className="field" style={{ minHeight: 64 }} value={form.message} onChange={(e) => upd('message', e.target.value)} />
                  </div>
                  {status === 'error' && <p style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{err}</p>}
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                    {status === 'sending' ? <><Loader2 size={18} className="conn-spin" /> Sending...</> : <><Send size={18} /> Send Request</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .conn-backdrop { position: fixed; inset: 0; z-index: 10000; background: rgba(15,27,45,0.72); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; overflow-y: auto; }
        .conn-modal { position: relative; width: 100%; max-width: 760px; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 70px rgba(0,0,0,0.4); animation: connPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275); margin: auto; display: grid; grid-template-columns: 0.82fr 1.18fr; }
        .conn-close { position: absolute; top: 14px; right: 14px; z-index: 3; width: 36px; height: 36px; border-radius: 50%; border: none; background: rgba(255,255,255,0.85); color: var(--ink); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .conn-close:hover { background: #fff; }
        .conn-aside { background: linear-gradient(150deg, var(--ink) 0%, var(--ink-700) 100%); color: #fff; padding: 2rem 1.8rem; display: flex; flex-direction: column; }
        .conn-ic { width: 52px; height: 52px; border-radius: 14px; background: var(--primary); color: var(--ink); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-primary); margin-bottom: 1.1rem; }
        .conn-aside h3 { color: #fff; font-size: 1.5rem; line-height: 1.15; margin-bottom: 0.6rem; }
        .conn-aside p { color: #c3cfdc; font-size: 0.9rem; line-height: 1.55; margin-bottom: 1.4rem; }
        .conn-benefits { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: auto; }
        .conn-benefits li { display: flex; align-items: center; gap: 9px; font-size: 0.86rem; color: #e6edf4; }
        .conn-benefits li svg { color: var(--primary); flex-shrink: 0; }
        .conn-call { display: inline-flex; align-items: center; gap: 8px; margin-top: 1.4rem; color: var(--primary); font-weight: 800; font-size: 1.05rem; }
        .conn-main { padding: 2rem 1.8rem; display: flex; flex-direction: column; justify-content: center; }
        .conn-form { display: grid; gap: 0.85rem; }
        .conn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
        .conn-done { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; padding: 1rem 0; }
        .conn-done h4 { font-size: 1.3rem; }
        .conn-done p { color: var(--foreground-muted); }
        .conn-spin { animation: spinSlow 1s linear infinite; }
        @keyframes connPop { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media (max-width: 680px){
          .conn-modal { grid-template-columns: 1fr; max-width: 440px; }
          .conn-aside { padding: 1.5rem 1.4rem; }
          .conn-aside p { display: none; }
          .conn-benefits { display: none; }
          .conn-aside h3 { font-size: 1.25rem; margin-bottom: 0; }
          .conn-ic { margin-bottom: 0.8rem; }
          .conn-call { margin-top: 0.9rem; }
          .conn-main { padding: 1.5rem 1.4rem; }
          .conn-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </Ctx.Provider>
  );
}
