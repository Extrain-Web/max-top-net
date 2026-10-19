"use client";

import { useEffect, useState } from 'react';
import { Gamepad2, Signal, MapPin } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { GameServer } from '@/lib/types';
import { usePage } from '@/lib/usePage';
import PageBanner from '@/components/site/PageBanner';
import Reveal from '@/components/site/Reveal';

export default function GameServerPage() {
  const page = usePage('game-server');
  const [servers, setServers] = useState<GameServer[]>([]);

  useEffect(() => {
    getData<GameServer[]>('/game-servers', []).then(setServers);
  }, []);

  return (
    <>
      <PageBanner title={page?.title || 'Game Servers'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />
      <section className="section">
        <div className="container">
          {page?.intro && (
            <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 2.5rem', color: 'var(--foreground-muted)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {page.intro}
            </p>
          )}

          <div className="grid auto-fit-280">
            {servers.map((s, i) => {
              const inner = (
                <div className="card card-hover" style={{ padding: '1.8rem', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      {s.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgUrl(s.logo)} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Gamepad2 size={28} color="var(--primary-700)" />
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.2rem' }}>{s.name}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: 20, marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Signal size={18} color="var(--primary-700)" />
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1.05rem' }}>{s.ping || '—'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>Ping</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={18} color="var(--primary-700)" />
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1.05rem' }}>{s.region}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>Region</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
              return (
                <Reveal key={s._id} delay={i * 60} style={{ height: '100%' }}>
                  {s.url ? <a href={s.url} target="_blank" rel="noreferrer" style={{ height: '100%', display: 'block' }}>{inner}</a> : inner}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
