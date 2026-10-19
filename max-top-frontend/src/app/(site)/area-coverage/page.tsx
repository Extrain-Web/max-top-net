"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, CheckCircle2, Clock } from 'lucide-react';
import { getData } from '@/lib/api';
import type { Area } from '@/lib/types';
import { usePage } from '@/lib/usePage';
import { useSite } from '@/components/site/SiteProvider';
import PageBanner from '@/components/site/PageBanner';
import Reveal from '@/components/site/Reveal';

export default function AreaCoveragePage() {
  const page = usePage('area-coverage');
  const { settings } = useSite();
  const [areas, setAreas] = useState<Area[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    getData<Area[]>('/areas', []).then(setAreas);
  }, []);

  const filtered = useMemo(
    () => areas.filter((a) => `${a.name} ${a.district}`.toLowerCase().includes(q.toLowerCase())),
    [areas, q]
  );
  const available = filtered.filter((a) => a.status === 'available');
  const soon = filtered.filter((a) => a.status === 'coming-soon');

  const Card = ({ a }: { a: Area }) => (
    <div className="card" style={{ padding: '1.3rem 1.5rem', display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: a.status === 'available' ? 'var(--primary-soft)' : '#fef3c7', color: a.status === 'available' ? 'var(--primary-700)' : '#b45309' }}>
        {a.status === 'available' ? <CheckCircle2 size={22} /> : <Clock size={22} />}
      </span>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.05rem' }}>{a.name}</h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)' }}>{a.district}</span>
      </div>
      <span className={`pill ${a.status === 'available' ? 'pill-green' : 'pill-soon'}`}>
        {a.status === 'available' ? 'Available' : 'Coming Soon'}
      </span>
    </div>
  );

  return (
    <>
      <PageBanner title={page?.title || 'Area Coverage'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />
      <section className="section">
        <div className="container">
          {page?.intro && (
            <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 2rem', color: 'var(--foreground-muted)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {page.intro}
            </p>
          )}

          <div style={{ maxWidth: 520, margin: '0 auto 3rem', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)' }} />
            <input className="field" placeholder="Search your area..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 48, padding: '15px 16px 15px 48px' }} />
          </div>

          {available.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 color="var(--primary)" /> Current Coverage
              </h2>
              <div className="grid auto-fit-280">
                {available.map((a, i) => <Reveal key={a._id} delay={i * 40}><Card a={a} /></Reveal>)}
              </div>
            </div>
          )}

          {soon.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Clock color="#b45309" /> Coming Soon
              </h2>
              <div className="grid auto-fit-280">
                {soon.map((a, i) => <Reveal key={a._id} delay={i * 40}><Card a={a} /></Reveal>)}
              </div>
            </div>
          )}

          {!filtered.length && <p style={{ textAlign: 'center', color: 'var(--foreground-muted)' }}>No areas found.</p>}

          {/* Map */}
          <div style={{ marginTop: '3.5rem', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow)', aspectRatio: '16/7' }}>
            <iframe 
              src={settings.mapEmbed ? (settings.mapEmbed.includes('<iframe') ? (settings.mapEmbed.match(/src="([^"]+)"/)?.[1] || '') : settings.mapEmbed) : `https://maps.google.com/maps?q=${encodeURIComponent(settings.address || 'Banaripara, Barisal, Bangladesh')}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
              style={{ width: '100%', height: '100%', border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
            />
          </div>

          {/* CTA */}
          <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'linear-gradient(120deg, var(--ink), var(--ink-700))', borderRadius: 24, padding: '3rem 1.5rem', color: '#fff' }}>
            <MapPin size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.8rem' }}>Your area not listed?</h2>
            <p style={{ color: '#c3cfdc', maxWidth: 520, margin: '0 auto 1.6rem' }}>No worries! We are expanding fast. Get in touch and we&apos;ll arrange coverage for your area.</p>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
