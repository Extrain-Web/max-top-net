"use client";

import { useEffect, useState } from 'react';
import { getData } from '@/lib/api';
import type { Feature } from '@/lib/types';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';

export default function FeaturesSection() {
  const [items, setItems] = useState<Feature[]>([]);
  useEffect(() => {
    getData<Feature[]>('/features', []).then(setItems);
  }, []);
  if (!items.length) return null;

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Core Advantages</span>
          <h2>Why Choose <span className="text-primary">MaxTopNet?</span></h2>
          <p>We deliver the best internet experience with cutting-edge technology and exceptional customer service.</p>
        </div>

        <div className="grid auto-fit-320">
          {items.map((f, i) => (
            <Reveal key={f._id} delay={i * 80} style={{ height: '100%' }}>
              <div className="card card-hover" style={{ padding: '2.3rem', height: '100%' }}>
                <div style={{ width: 66, height: 66, borderRadius: 16, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem' }}>
                  <Icon name={f.icon} size={32} color="var(--primary-700)" />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.7rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.65, fontSize: '0.96rem' }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
