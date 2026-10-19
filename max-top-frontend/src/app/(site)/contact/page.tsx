"use client";

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { apiSend, getData } from '@/lib/api';
import { usePage } from '@/lib/usePage';
import { useSite } from '@/components/site/SiteProvider';
import PageBanner from '@/components/site/PageBanner';
import Reveal from '@/components/site/Reveal';

type Pkg = { _id: string; name: string; speed: string };

export default function ContactPage() {
  const page = usePage('contact');
  const { settings } = useSite();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', package: '', address: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [pkgs, setPkgs] = useState<Pkg[]>([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    getData<Pkg[]>('/packages', []).then(setPkgs);
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErr('');
    try {
      await apiSend('/messages', 'POST', { ...form, type: 'connection' });
      setStatus('done');
      setForm({ name: '', email: '', phone: '', subject: '', message: '', package: '', address: '' });
    } catch (e: any) {
      setErr(e.message || 'Something went wrong');
      setStatus('error');
    }
  };

  const infos = [
    { icon: <Phone size={24} />, title: 'Call Us', value: settings.phone, href: `tel:${settings.phone}` },
    { icon: <Mail size={24} />, title: 'Email Us', value: settings.email, href: `mailto:${settings.email}` },
    { icon: <MapPin size={24} />, title: 'Our Address', value: settings.address, href: '#' },
  ];

  return (
    <>
      <PageBanner title={page?.title || 'Contact Us'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />
      <section className="section">
        <div className="container">
          <div className="grid auto-fit-280" style={{ marginBottom: '3rem' }}>
            {infos.map((info, i) => (
              <Reveal key={i} delay={i * 80}>
                <a href={info.href} className="card card-hover" style={{ padding: '2rem', textAlign: 'center', display: 'block' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, margin: '0 auto 1rem', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-700)' }}>
                    {info.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: 6 }}>{info.title}</h3>
                  <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', wordBreak: 'break-word' }}>{info.value}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="grid contact-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
            {/* Form */}
            <Reveal style={{ height: '100%' }}>
              <div className="card" style={{ padding: '2.2rem', height: '100%' }}>
                <h2 style={{ fontSize: '1.7rem', marginBottom: '0.5rem' }}>New Connection / Inquiry</h2>
                <p style={{ color: 'var(--foreground-muted)', marginBottom: '1.6rem', fontSize: '0.95rem' }}>Fill out the form and we&apos;ll get back to you quickly.</p>

                {status === 'done' ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <CheckCircle2 size={56} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ marginBottom: 8 }}>Thank You!</h3>
                    <p style={{ color: 'var(--foreground-muted)' }}>We have received your message and will contact you soon.</p>
                    <button onClick={() => setStatus('idle')} className="btn btn-ghost" style={{ marginTop: '1.4rem' }}>Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: 'grid', gap: '1rem' }}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label className="label">Name *</label>
                        <input className="field" required value={form.name} onChange={(e) => update('name', e.target.value)} />
                      </div>
                      <div>
                        <label className="label">Phone *</label>
                        <input className="field" required value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input className="field" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                    </div>

                    <div>
                      <label className="label">Message</label>
                      <textarea className="field" value={form.message} onChange={(e) => update('message', e.target.value)} />
                    </div>
                    {status === 'error' && <p style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{err}</p>}
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ justifyContent: 'center' }}>
                      {status === 'sending' ? <><Loader2 size={18} className="spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map / side */}
            <Reveal delay={150} style={{ height: '100%' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', minHeight: 420 }}>
                <iframe 
                  src={settings.mapEmbed ? (settings.mapEmbed.includes('<iframe') ? (settings.mapEmbed.match(/src="([^"]+)"/)?.[1] || '') : settings.mapEmbed) : `https://maps.google.com/maps?q=${encodeURIComponent(settings.address || 'Banaripara, Barisal, Bangladesh')}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                  style={{ width: '100%', height: '100%', border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <style>{`.spin { animation: spinSlow 1s linear infinite; } @media (max-width: 780px){ .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
