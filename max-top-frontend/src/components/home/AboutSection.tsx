"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { About } from '@/lib/types';
import Reveal from '@/components/site/Reveal';

export default function AboutSection() {
  const [about, setAbout] = useState<About | null>(null);
  useEffect(() => {
    getData<About | null>('/about', null).then(setAbout);
  }, []);
  if (!about) return null;

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <Reveal>
          <span className="eyebrow">{about.badge}</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', marginBottom: '1.2rem' }}>
            {about.title} <span style={{ color: 'var(--primary)' }}>{about.highlight}</span>
          </h2>
          <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.08rem' }}>
            {about.description}
          </p>
          <div style={{ display: 'grid', gap: '1.1rem', marginBottom: '2.3rem' }}>
            {about.points?.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <span style={{ background: 'var(--primary-soft)', borderRadius: '50%', padding: 6, display: 'flex', flexShrink: 0 }}>
                  <CheckCircle2 size={20} color="var(--primary-700)" />
                </span>
                <span style={{ fontWeight: 500, fontSize: '1.05rem', color: 'var(--ink)' }}>{p}</span>
              </div>
            ))}
          </div>
          <Link href={about.buttonLink || '/about'} className="btn btn-primary">{about.buttonText}</Link>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -18, right: -18, width: '100%', height: '100%', border: '3px solid var(--primary)', borderRadius: 24, opacity: 0.4 }} />
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', aspectRatio: '4/4.4' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgUrl(about.image)} alt="About MaxTopNet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 28, left: -20, background: '#fff', padding: '1.2rem 1.4rem', borderRadius: 16, boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: 'var(--primary)', color: '#fff', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
                {about.experienceYears}
              </div>
              <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem', maxWidth: 120, lineHeight: 1.3 }}>
                {about.experienceLabel}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 860px){ .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
