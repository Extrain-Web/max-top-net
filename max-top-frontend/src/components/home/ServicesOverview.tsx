"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData, imgUrl } from '@/lib/api';
import type { Service } from '@/lib/types';
import Reveal from '@/components/site/Reveal';

export default function ServicesOverview() {
  const [items, setItems] = useState<Service[]>([]);
  useEffect(() => {
    getData<Service[]>('/services', []).then(setItems);
  }, []);
  if (!items.length) return null;

  return (
    <section className="section" style={{ paddingBottom: '2rem' }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`, gap: '2.5rem' }}>
          {items.map((svc, i) => {
            const card = (
              <div style={{ textAlign: 'center' }} className="svc-item">
                <div className="svc-ring" style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 1.4rem' }}>
                  <div className="svc-ring-bg" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 180deg, var(--primary), #5f8512, var(--primary))', transition: 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: 'var(--shadow)' }} />
                  <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', overflow: 'hidden', background: '#fff' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="svc-img" src={imgUrl(svc.image)} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1.12rem', lineHeight: 1.4, maxWidth: 240, margin: '0 auto' }}>{svc.title}</h3>
              </div>
            );
            return (
              <Reveal key={svc._id} delay={i * 90}>
                {svc.link ? <Link href={svc.link}>{card}</Link> : card}
              </Reveal>
            );
          })}
        </div>
      </div>
      <style>{`
        .svc-item:hover .svc-ring-bg { transform: rotate(180deg) scale(1.04); }
        .svc-item:hover .svc-img { transform: scale(1.1); }
        .svc-item { cursor: pointer; }
      `}</style>
    </section>
  );
}
