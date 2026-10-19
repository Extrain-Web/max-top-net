"use client";

import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Server, Search } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { FtpLink } from '@/lib/types';
import { usePage } from '@/lib/usePage';
import PageBanner from '@/components/site/PageBanner';
import Reveal from '@/components/site/Reveal';

export default function FtpServerPage() {
  const page = usePage('ftp-server');
  const [links, setLinks] = useState<FtpLink[]>([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  useEffect(() => {
    getData<FtpLink[]>('/ftp', []).then(setLinks);
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(links.map((l) => l.category)))], [links]);
  const filtered = links.filter(
    (l) => (cat === 'All' || l.category === cat) && l.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageBanner title={page?.title || 'FTP Server'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />
      <section className="section">
        <div className="container">
          {page?.intro && (
            <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 2.5rem', color: 'var(--foreground-muted)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {page.intro}
            </p>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className="pill" style={{ cursor: 'pointer', border: 'none', background: cat === c ? 'var(--primary)' : 'var(--primary-soft)', color: cat === c ? '#fff' : 'var(--primary-700)' }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', minWidth: 240 }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)' }} />
              <input className="field" placeholder="Search server..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 42 }} />
            </div>
          </div>

          <div className="grid auto-fit-280">
            {filtered.map((l, i) => (
              <Reveal key={l._id} delay={i * 60} style={{ height: '100%' }}>
                <a href={l.url} target="_blank" rel="noreferrer" className="card card-hover" style={{ padding: '1.8rem', height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      {l.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgUrl(l.logo)} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Server size={26} color="var(--primary-700)" />
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem' }}>{l.name}</h3>
                      <span className="pill pill-green" style={{ marginTop: 4 }}>{l.category}</span>
                    </div>
                  </div>
                  {l.description && <p style={{ color: 'var(--foreground-muted)', fontSize: '0.92rem', flex: 1 }}>{l.description}</p>}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.92rem' }}>
                    Visit Server <ExternalLink size={15} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          {!filtered.length && <p style={{ textAlign: 'center', color: 'var(--foreground-muted)' }}>No servers found.</p>}
        </div>
      </section>
    </>
  );
}
