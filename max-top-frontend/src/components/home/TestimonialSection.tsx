"use client";

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { Review } from '@/lib/types';

function usePerView() {
  const [pv, setPv] = useState(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPv(w < 640 ? 1 : w < 1000 ? 2 : 3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return pv;
}

export default function TestimonialSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const perView = usePerView();

  useEffect(() => {
    getData<Review[]>('/reviews', []).then(setReviews);
  }, []);

  const maxIndex = Math.max(0, reviews.length - perView);
  useEffect(() => { setIndex((i) => Math.min(i, maxIndex)); }, [maxIndex]);

  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  useEffect(() => {
    if (reviews.length <= perView) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [reviews.length, perView, next]);

  const dots = useMemo(() => Array.from({ length: maxIndex + 1 }), [maxIndex]);
  if (!reviews.length) return null;

  const canSlide = reviews.length > perView;

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><Star size={14} /> Testimonials</span>
          <h2>Valuable <span className="text-primary">Customers</span> Feedback</h2>
          <p>Thousands of customers across the country have upgraded their digital life with MaxTopNet.</p>
        </div>

        <div style={{ position: 'relative' }}>
          {/* viewport */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                transform: `translateX(-${index * (100 / perView)}%)`,
                transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {reviews.map((r) => (
                <div key={r._id} style={{ flex: `0 0 ${100 / perView}%`, maxWidth: `${100 / perView}%`, padding: '0.6rem 0.8rem' }}>
                  <div className="card" style={{ padding: '2.2rem 1.8rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <Quote size={40} color="var(--primary-soft)" fill="var(--primary-soft)" style={{ position: 'absolute', top: 18, right: 18 }} />
                    <div style={{ display: 'flex', gap: 4, marginBottom: '1.2rem' }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={17} fill={idx < r.rating ? '#f6a609' : '#e2e8f0'} color={idx < r.rating ? '#f6a609' : '#e2e8f0'} />
                      ))}
                    </div>
                    <p style={{ fontStyle: 'italic', color: 'var(--foreground-muted)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1.8rem', flex: 1 }}>
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      {r.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgUrl(r.avatar)} alt={r.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                          {r.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: 2 }}>{r.name}</h4>
                        <p style={{ color: 'var(--foreground-muted)', fontSize: '0.82rem' }}>{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* arrows */}
          {canSlide && (
            <>
              <button onClick={prev} aria-label="Previous" className="rev-arrow" style={{ left: -8 }}><ChevronLeft size={22} /></button>
              <button onClick={next} aria-label="Next" className="rev-arrow" style={{ right: -8 }}><ChevronRight size={22} /></button>
            </>
          )}
        </div>

        {/* dots */}
        {canSlide && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 9, marginTop: '1.8rem' }}>
            {dots.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} style={{ width: i === index ? 28 : 10, height: 10, borderRadius: 20, border: 'none', background: i === index ? 'var(--primary)' : '#d9e0e8', transition: 'all 0.3s', cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .rev-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5; width: 46px; height: 46px; border-radius: 50%; border: 1px solid var(--border); background: #fff; color: var(--ink); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow); transition: all 0.25s; }
        .rev-arrow:hover { background: var(--primary); color: var(--ink); border-color: var(--primary); }
        @media (max-width: 1100px){ .rev-arrow { display: none; } }
      `}</style>
    </section>
  );
}
