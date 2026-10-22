"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { ServiceItem } from '@/lib/types';
import { usePage } from '@/lib/usePage';
import PageBanner from '@/components/site/PageBanner';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { useConnection } from '@/components/site/ConnectionModal';

export default function ServicePage() {
  const page = usePage('service');
  const { open } = useConnection();
  const [items, setItems] = useState<ServiceItem[]>([]);

  useEffect(() => {
    getData<ServiceItem[]>('/service-items', []).then(setItems);
  }, []);

  return (
    <>
      <PageBanner title={page?.title || 'Our Services'} subtitle={page?.subtitle || 'Everything your digital life needs — in one place'} bannerImage={page?.bannerImage} crumb="Service" />
      <section className="section">
        <div className="container">
          {page?.intro && (
            <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 2.5rem', color: 'var(--foreground-muted)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {page.intro}
            </p>
          )}

          <div className="grid auto-fit-280">
            {items.map((s, i) => {
              const card = (
                <div className="card card-hover svc-card" style={{ padding: '2.2rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                  <div className="svc-card-ic" style={{ width: 70, height: 70, borderRadius: 18, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', overflow: 'hidden', transition: 'all 0.3s' }}>
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgUrl(s.image)} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Icon name={s.icon} size={34} color="var(--primary-700)" />
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.7rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.65, fontSize: '0.96rem', flex: 1 }}>{s.description}</p>
                  {s.link && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.92rem', marginTop: '1.2rem' }}>
                      Learn More <ArrowRight size={15} />
                    </span>
                  )}
                </div>
              );
              return (
                <Reveal key={s._id} delay={i * 70} style={{ height: '100%' }}>
                  {s.link ? <Link href={s.link} style={{ height: '100%', display: 'block' }}>{card}</Link> : card}
                </Reveal>
              );
            })}
          </div>

          {!items.length && <p style={{ textAlign: 'center', color: 'var(--foreground-muted)' }}>Services coming soon.</p>}

          {/* CTA */}
          <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'linear-gradient(120deg, var(--ink), var(--ink-700))', borderRadius: 24, padding: '3rem 1.5rem', color: '#fff' }}>
            <h2 style={{ color: '#fff', fontSize: '1.9rem', marginBottom: '0.8rem' }}>Need any of these services?</h2>
            <p style={{ color: '#c3cfdc', maxWidth: 560, margin: '0 auto 1.6rem' }}>Get in touch with our team — we&apos;ll set you up quickly and professionally.</p>
            <button onClick={open} className="btn btn-primary">সংযোগ করুন</button>
          </div>
        </div>
      </section>
      <style>{`.svc-card:hover .svc-card-ic { background: var(--primary); } .svc-card:hover .svc-card-ic svg { color: var(--ink) !important; }`}</style>
    </>
  );
}
