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
    <section className="hero-full">
      <div className="hero-slides">
        {slides.map((s, idx) => (
          <div key={s._id} className={`hero-slide ${idx === i ? 'active' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgUrl(s.image)} alt={s.title || 'Banner'} />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous" className="hero-arrow" style={{ left: 20 }}><ChevronLeft size={24} /></button>
          <button onClick={next} aria-label="Next" className="hero-arrow" style={{ right: 20 }}><ChevronRight size={24} /></button>
          <div className="hero-dots">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={idx === i ? 'active' : ''} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
