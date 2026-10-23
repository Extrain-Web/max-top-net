"use client";

import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { HeroSlide } from '@/lib/types';

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    getData<HeroSlide[]>('/hero', []).then(setSlides);
  }, []);

  const next = useCallback(() => setI((p) => (slides.length ? (p + 1) % slides.length : 0)), [slides.length]);
  const prev = () => setI((p) => (slides.length ? (p - 1 + slides.length) % slides.length : 0));

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [slides.length, next]);

  if (!slides.length) {
    return <div style={{ height: 'min(82vh, 680px)', minHeight: 520, background: '#e8eef5' }} />;
  }

  return (
    <section className="hero-full" style={{ position: 'relative', overflow: 'hidden' }}>
      {slides.map((s, idx) => (
        <div
          key={s._id}
          style={{
            position: 'absolute', inset: 0,
            opacity: idx === i ? 1 : 0,
            transition: 'opacity 1s ease',
            zIndex: idx === i ? 1 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgUrl(s.image)}
            alt={s.title || 'Banner'}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous" className="hero-arrow" style={{ left: 20 }}><ChevronLeft size={24} /></button>
          <button onClick={next} aria-label="Next" className="hero-arrow" style={{ right: 20 }}><ChevronRight size={24} /></button>
          <div style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', gap: 10 }}>
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} style={{ width: idx === i ? 30 : 11, height: 11, borderRadius: 20, border: 'none', background: idx === i ? 'var(--primary)' : 'rgba(255,255,255,0.55)', transition: 'all 0.3s', cursor: 'pointer' }} />
            ))}
          </div>
        </>
      )}

      <style>{`
        .hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 4; width: 50px; height: 50px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.12); backdrop-filter: blur(4px); color: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.25s; }
        .hero-arrow:hover { background: var(--primary); color: var(--ink); border-color: var(--primary); }
        @media (max-width: 640px){ .hero-arrow { display: none; } }
      `}</style>
    </section>
  );
}
