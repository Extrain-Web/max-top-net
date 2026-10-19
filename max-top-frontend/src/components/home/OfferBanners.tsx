"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Gift } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { OfferBanner } from '@/lib/types';
import Reveal from '@/components/site/Reveal';

type ThemeKey = 'eid' | 'puja' | 'boishakh' | 'discount' | 'general';

const THEMES: Record<ThemeKey, { grad: string; accent: string; accentText: string; soft: string }> = {
  eid: { grad: 'linear-gradient(135deg,#06402b 0%,#0c6a46 55%,#12855a 100%)', accent: '#f6ce5b', accentText: '#3a2a04', soft: 'rgba(246,206,91,0.18)' },
  puja: { grad: 'linear-gradient(135deg,#6a1b9a 0%,#c2185b 55%,#e8541b 100%)', accent: '#ffd84d', accentText: '#4a1206', soft: 'rgba(255,216,77,0.18)' },
  boishakh: { grad: 'linear-gradient(135deg,#a51f14 0%,#d13224 55%,#e85d3a 100%)', accent: '#ffe6b0', accentText: '#5a1206', soft: 'rgba(255,230,176,0.2)' },
  discount: { grad: 'linear-gradient(135deg,#3f6d0f 0%,#6a9a16 50%,#8bbe1f 100%)', accent: '#ffffff', accentText: '#3f6d0f', soft: 'rgba(255,255,255,0.18)' },
  general: { grad: 'linear-gradient(135deg,#0f1b2d 0%,#163a5e 55%,#0e6b63 100%)', accent: '#8bbe1f', accentText: '#0f1b2d', soft: 'rgba(139,190,31,0.16)' },
};

/* ---------- decorative motifs per theme ---------- */
function Decoration({ theme, accent }: { theme: ThemeKey; accent: string }) {
  const common = { position: 'absolute' as const, pointerEvents: 'none' as const };
  if (theme === 'eid') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <svg style={{ ...common, top: 18, right: 24, opacity: 0.95 }} width="90" height="90" viewBox="0 0 100 100">
          <path d="M72 50a28 28 0 1 1-20-26.8A22 22 0 1 0 72 50Z" fill={accent} />
        </svg>
        {[[18, '12%'], [10, '26%'], [14, '20%'], [8, '34%']].map(([s, top], i) => (
          <svg key={i} style={{ ...common, top: top as string, left: `${8 + i * 7}%`, opacity: 0.8 }} width={s as number} height={s as number} viewBox="0 0 24 24">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill={accent} />
          </svg>
        ))}
        {/* lanterns */}
        {[20, 46, 72].map((l, i) => (
          <div key={i} style={{ ...common, top: -4, left: `${l}%`, opacity: 0.85 }}>
            <div style={{ width: 1.5, height: 22 + i * 6, background: accent, margin: '0 auto', opacity: 0.6 }} />
            <div style={{ width: 16, height: 24, borderRadius: '50% 50% 45% 45%', background: accent, opacity: 0.9 }} />
          </div>
        ))}
        <svg style={{ ...common, bottom: -2, left: 0, width: '100%', opacity: 0.18 }} height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
          <path d="M0 60 Q50 10 100 60 T200 60 T300 60 T400 60" fill="none" stroke={accent} strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (theme === 'puja' || theme === 'boishakh') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <svg style={{ ...common, top: '50%', right: 20, transform: 'translateY(-50%)', opacity: 0.9 }} width="120" height="120" viewBox="0 0 100 100">
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x="49" y="6" width="2" height="18" rx="1" fill={accent} transform={`rotate(${i * 22.5} 50 50)`} opacity={0.85} />
          ))}
          <circle cx="50" cy="50" r="16" fill="none" stroke={accent} strokeWidth="2" />
          <circle cx="50" cy="50" r="7" fill={accent} />
        </svg>
        {[[12, '14%'], [9, '70%'], [7, '40%']].map(([s, top], i) => (
          <svg key={i} style={{ ...common, top: top as string, left: `${10 + i * 6}%`, opacity: 0.7 }} width={s as number} height={s as number} viewBox="0 0 24 24">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill={accent} />
          </svg>
        ))}
        {/* diya */}
        <div style={{ ...common, bottom: 18, right: '36%' }}>
          <div style={{ width: 10, height: 16, background: accent, borderRadius: '0 0 50% 50%', opacity: 0.9 }} />
          <div style={{ width: 6, height: 10, background: '#fff', borderRadius: '50% 50% 50% 50%', margin: '-14px auto 0', opacity: 0.8 }} />
        </div>
      </div>
    );
  }
  // discount / general -> sunburst + confetti
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg style={{ ...common, top: '-30%', right: '-8%', opacity: 0.16 }} width="300" height="300" viewBox="0 0 100 100">
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x="49.5" y="0" width="1.4" height="50" fill={accent} transform={`rotate(${i * 15} 50 50)`} />
        ))}
      </svg>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} style={{ ...common, top: `${(i * 37) % 90}%`, left: `${(i * 53) % 95}%`, width: 7, height: 7, borderRadius: i % 2 ? '50%' : 2, background: accent, opacity: 0.4, transform: `rotate(${i * 30}deg)` }} />
      ))}
    </div>
  );
}

function Banner({ o, large }: { o: OfferBanner; large?: boolean }) {
  const t = THEMES[(o.theme || 'discount') as ThemeKey] || THEMES.discount;
  const inner = (
    <div
      className="offer-card"
      style={{
        position: 'relative', borderRadius: 22, overflow: 'hidden', height: '100%',
        minHeight: large ? 300 : 210, background: t.grad, boxShadow: 'var(--shadow)',
        cursor: o.link ? 'pointer' : 'default',
      }}
    >
      <Decoration theme={(o.theme || 'discount') as ThemeKey} accent={t.accent} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: large ? '2rem' : '1rem', height: '100%', padding: large ? '2.4rem' : '1.7rem' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {o.badge && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.accent, color: t.accentText, padding: large ? '6px 16px' : '5px 12px', borderRadius: 30, fontSize: large ? '0.82rem' : '0.7rem', fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>
              <Gift size={13} /> {o.badge}
            </span>
          )}
          <h3 style={{ color: '#fff', fontSize: large ? 'clamp(1.7rem,3vw,2.5rem)' : '1.35rem', lineHeight: 1.12, marginBottom: o.discount ? 8 : 10, textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
            {o.title}
          </h3>
          {o.discount && (
            <div style={{ display: 'inline-block', color: t.accent, fontWeight: 900, fontSize: large ? '2rem' : '1.4rem', fontFamily: 'var(--font-display)', marginBottom: 8, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {o.discount}
            </div>
          )}
          {o.subtitle && (
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: large ? '1.02rem' : '0.86rem', lineHeight: 1.5, marginBottom: 16, maxWidth: 440 }}>{o.subtitle}</p>
          )}
          {o.buttonText && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.accent, color: t.accentText, padding: large ? '11px 24px' : '9px 18px', borderRadius: 10, fontWeight: 800, fontSize: large ? '0.98rem' : '0.84rem', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
              {o.buttonText} <ArrowRight size={16} />
            </span>
          )}
        </div>

        {o.image && (
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `2px dashed ${t.accent}`, opacity: 0.7 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgUrl(o.image)} alt={o.title} style={{ width: large ? 150 : 92, height: large ? 150 : 92, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${t.accent}`, boxShadow: '0 10px 26px rgba(0,0,0,0.3)' }} />
          </div>
        )}
      </div>
    </div>
  );
  return o.link ? <Link href={o.link} style={{ height: '100%', display: 'block' }}>{inner}</Link> : inner;
}

export default function OfferBanners() {
  const [offers, setOffers] = useState<OfferBanner[]>([]);
  useEffect(() => {
    getData<OfferBanner[]>('/offers', []).then(setOffers);
  }, []);
  if (!offers.length) return null;

  const large = offers.filter((o) => o.size === 'large');
  const small = offers.filter((o) => o.size !== 'large');

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><Gift size={14} /> Special Offers</span>
          <h2>Exciting <span className="text-primary">Offers &amp; Deals</span></h2>
          <p>Celebrate every festival and special day with amazing offers from MaxTopNet — grab yours now!</p>
        </div>

        {large.length > 0 && (
          <div className="grid" style={{ gridTemplateColumns: large.length > 1 ? 'repeat(auto-fit, minmax(360px, 1fr))' : '1fr', gap: '1.6rem', marginBottom: small.length ? '1.6rem' : 0 }}>
            {large.map((o, i) => (
              <Reveal key={o._id} delay={i * 100} style={{ height: '100%' }}><Banner o={o} large /></Reveal>
            ))}
          </div>
        )}

        {small.length > 0 && (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.6rem' }}>
            {small.map((o, i) => (
              <Reveal key={o._id} delay={i * 100} style={{ height: '100%' }}><Banner o={o} /></Reveal>
            ))}
          </div>
        )}
      </div>
      <style>{`.offer-card { transition: transform 0.35s ease, box-shadow 0.35s ease; } .offer-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }`}</style>
    </section>
  );
}
