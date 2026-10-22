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
                <div className="svc-card">
                  <span className="svc-accent" />
                  <div className="svc-card-ic">
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgUrl(s.image)} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }} />
                    ) : (
                      <Icon name={s.icon} size={32} />
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6, fontSize: '0.94rem', flex: 1 }}>{s.description}</p>
                  <span className="svc-more">
                    Learn More <ArrowRight size={15} />
                  </span>
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
      <style>{`
        .svc-card { position: relative; background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 2.2rem 2rem; height: 100%; display: flex; flex-direction: column; overflow: hidden; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s, border-color 0.35s; }
        .svc-card:hover { transform: translateY(-8px); box-shadow: 0 26px 52px rgba(15,27,45,0.12); border-color: rgba(139,190,31,0.5); }
        .svc-accent { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--primary), var(--primary-700)); transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
        .svc-card:hover .svc-accent { transform: scaleX(1); }
        .svc-card-ic { width: 72px; height: 72px; border-radius: 18px; background: var(--primary-soft); color: var(--primary-700); display: flex; align-items: center; justify-content: center; margin-bottom: 1.4rem; transition: all 0.35s ease; }
        .svc-card:hover .svc-card-ic { background: linear-gradient(135deg, var(--primary), var(--primary-700)); color: var(--ink); transform: rotate(-6deg) scale(1.05); box-shadow: var(--shadow-primary); }
        .svc-more { display: inline-flex; align-items: center; gap: 6px; color: var(--primary-700); font-weight: 700; font-size: 0.9rem; margin-top: 1.3rem; opacity: 0; transform: translateX(-8px); transition: all 0.3s ease; }
        .svc-card:hover .svc-more { opacity: 1; transform: none; }
      `}</style>
    </>
  );
}
