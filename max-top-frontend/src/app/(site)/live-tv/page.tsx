"use client";

import { useEffect, useMemo, useState } from 'react';
import { Tv, Play } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { Channel } from '@/lib/types';
import { usePage } from '@/lib/usePage';
import PageBanner from '@/components/site/PageBanner';
import Reveal from '@/components/site/Reveal';

export default function LiveTvPage() {
  const page = usePage('live-tv');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    getData<Channel[]>('/channels', []).then(setChannels);
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(channels.map((c) => c.category)))], [channels]);
  const filtered = channels.filter((c) => cat === 'All' || c.category === cat);

  return (
    <>
      <PageBanner title={page?.title || 'Live TV'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />
      <section className="section">
        <div className="container">
          {page?.intro && (
            <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 2.5rem', color: 'var(--foreground-muted)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {page.intro}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className="pill" style={{ cursor: 'pointer', border: 'none', padding: '8px 18px', background: cat === c ? 'var(--primary)' : 'var(--primary-soft)', color: cat === c ? '#fff' : 'var(--primary-700)' }}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((c, i) => {
              const inner = (
                <div className="card card-hover channel-card" style={{ padding: '1.6rem 1rem', textAlign: 'center', height: '100%', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ width: 84, height: 84, borderRadius: 18, margin: '0 auto 1rem', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {c.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgUrl(c.logo)} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                    ) : (
                      <Tv size={34} color="var(--primary-700)" />
                    )}
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{c.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--foreground-muted)' }}>{c.category}</span>
                  <div className="play-ov" style={{ position: 'absolute', inset: 0, background: 'rgba(15,27,45,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}>
                    <span style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Play size={22} fill="#fff" />
                    </span>
                  </div>
                </div>
              );
              return (
                <Reveal key={c._id} delay={i * 50} style={{ height: '100%' }}>
                  {c.url ? <a href={c.url} target="_blank" rel="noreferrer" style={{ height: '100%', display: 'block' }}>{inner}</a> : inner}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <style>{`.channel-card:hover .play-ov { opacity: 1; }`}</style>
    </>
  );
}
