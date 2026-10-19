"use client";

import { useEffect, useState } from 'react';
import { getData, imgUrl } from '@/lib/api';
import type { Partner } from '@/lib/types';

export default function TechnologyPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  useEffect(() => {
    getData<Partner[]>('/partners', []).then(setPartners);
  }, []);
  if (!partners.length) return null;

  const loop = [...partners, ...partners];

  return (
    <section className="section" style={{ background: 'var(--surface)', overflow: 'hidden' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Trusted By</span>
          <h2>Our <span className="text-primary">Technology Partners</span></h2>
          <p>Powered by world-class infrastructure and global CDN networks.</p>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        <div className="marquee" style={{ display: 'flex', width: 'max-content', gap: '1.6rem', animation: 'marquee 28s linear infinite' }}>
          {loop.map((p, i) => (
            <div key={i} className="card" style={{ width: 220, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 2rem', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgUrl(p.logo)} alt={p.name} style={{ maxHeight: 42, maxWidth: 150, width: 'auto', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
      <style>{`.marquee:hover { animation-play-state: paused; }`}</style>
    </section>
  );
}
