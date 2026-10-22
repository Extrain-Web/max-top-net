"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Loader2, Plug } from 'lucide-react';
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

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {show && (
        <div className="conn-backdrop" onClick={close}>
          <div className="conn-modal" onClick={(e) => e.stopPropagation()}>
            <button className="conn-close" onClick={close} aria-label="Close"><X size={20} /></button>

            <div className="conn-head">
              <span className="conn-ic"><Plug size={22} /></span>
              <div>
                <h3>সংযোগ নিন (Get Connection)</h3>
                <p>ফর্মটি পূরণ করুন — আমরা দ্রুত আপনার সাথে যোগাযোগ করব।</p>
              </div>
            </div>

            {status === 'done' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem 0.5rem' }}>
                <CheckCircle2 size={54} color="var(--primary)" style={{ margin: '0 auto 0.8rem' }} />
                <h4 style={{ marginBottom: 6 }}>ধন্যবাদ!</h4>
                <p style={{ color: 'var(--foreground-muted)' }}>আপনার অনুরোধ পেয়েছি। শীঘ্রই যোগাযোগ করা হবে।</p>
                <button className="btn btn-ghost" onClick={close} style={{ marginTop: '1.2rem' }}>বন্ধ করুন</button>
              </div>
            ) : (
              <form onSubmit={submit} className="conn-form">
                <div className="conn-row">
                  <div>
                    <label className="label">নাম *</label>
                    <input className="field" required value={form.name} onChange={(e) => upd('name', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">মোবাইল নম্বর *</label>
                    <input className="field" required value={form.phone} onChange={(e) => upd('phone', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="label">ঠিকানা / এলাকা *</label>
                  <input className="field" required value={form.address} onChange={(e) => upd('address', e.target.value)} placeholder="গ্রাম/এলাকা, বাসা নং" />
                </div>
                <div>
                  <label className="label">প্যাকেজ</label>
                  <select className="field" value={form.package} onChange={(e) => upd('package', e.target.value)}>
                    <option value="">নির্বাচন করুন (ঐচ্ছিক)</option>
                    {pkgs.map((p) => <option key={p._id} value={`${p.speed} Mbps - ${p.name}`}>{p.speed} Mbps - {p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">বার্তা (ঐচ্ছিক)</label>
                  <textarea className="field" style={{ minHeight: 80 }} value={form.message} onChange={(e) => upd('message', e.target.value)} />
                </div>
                {status === 'error' && <p style={{ color: 'var(--danger)', fontSize: '0.88rem' }}>{err}</p>}
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                  {status === 'sending' ? <><Loader2 size={18} className="conn-spin" /> পাঠানো হচ্ছে...</> : <><Send size={18} /> অনুরোধ পাঠান</>}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--foreground-muted)' }}>
                  অথবা সরাসরি কল করুন: <a href={`tel:${settings.topbarPhone}`} style={{ color: 'var(--primary-700)', fontWeight: 700 }}>{settings.topbarPhone}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .conn-backdrop { position: fixed; inset: 0; z-index: 10000; background: rgba(15,27,45,0.72); backdrop-filter: blur(5px); display: flex; align-items: flex-start; justify-content: center; padding: 5vh 1rem 2rem; overflow-y: auto; }
        .conn-modal { position: relative; width: 100%; max-width: 480px; background: #fff; border-radius: 20px; padding: 1.8rem; box-shadow: 0 30px 70px rgba(0,0,0,0.4); animation: connPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275); margin: auto; }
        .conn-close { position: absolute; top: 14px; right: 14px; width: 38px; height: 38px; border-radius: 50%; border: none; background: #f1f5f9; color: var(--ink); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .conn-close:hover { background: #e2e8f0; }
        .conn-head { display: flex; gap: 14px; align-items: center; margin-bottom: 1.4rem; padding-right: 2rem; }
        .conn-ic { width: 52px; height: 52px; border-radius: 14px; background: var(--primary); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: var(--shadow-primary); }
        .conn-head h3 { font-size: 1.2rem; line-height: 1.2; }
        .conn-head p { color: var(--foreground-muted); font-size: 0.85rem; margin-top: 3px; }
        .conn-form { display: grid; gap: 0.9rem; }
        .conn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
        .conn-spin { animation: spinSlow 1s linear infinite; }
        @keyframes connPop { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media (max-width: 460px){ .conn-row { grid-template-columns: 1fr; } .conn-modal { padding: 1.4rem; } }
      `}</style>
    </Ctx.Provider>
  );
}
