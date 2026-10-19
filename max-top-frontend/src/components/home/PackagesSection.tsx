"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, Zap, Crown } from 'lucide-react';
import { getData } from '@/lib/api';
import type { Package } from '@/lib/types';
import Reveal from '@/components/site/Reveal';

export default function PackagesSection() {
  const [pkgs, setPkgs] = useState<Package[]>([]);
  useEffect(() => {
    getData<Package[]>('/packages', []).then(setPkgs);
  }, []);
  if (!pkgs.length) return null;

  return (
    <section id="packages" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Our Best Plan</span>
          <h2>Select Your <span className="text-primary">Best Plan</span></h2>
          <p>Every package includes optical fiber, free connection charge and 24/7 support.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.8rem', alignItems: 'stretch' }}>
          {pkgs.map((pkg, idx) => (
            <Reveal key={pkg._id} delay={idx * 70} style={{ height: '100%' }}>
              <div
                className="pkg-card"
                style={{
                  position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
                  background: '#fff', borderRadius: 20, padding: '2.2rem 1.8rem',
                  border: pkg.popular ? '2px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: pkg.popular ? '0 24px 50px rgba(139,190,31,0.22)' : 'var(--shadow-sm)',
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: 18, right: 18, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--primary)', color: 'var(--ink)', padding: '5px 12px', borderRadius: 30, fontSize: '0.72rem', fontWeight: 800, letterSpacing: 0.5 }}>
                    <Crown size={13} /> POPULAR
                  </div>
                )}

                {/* name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.4rem' }}>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={22} color="var(--primary-700)" fill="var(--primary)" />
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', lineHeight: 1.1 }}>{pkg.name}</h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--foreground-muted)' }}>Fiber Internet</span>
                  </div>
                </div>

                {/* speed band */}
                <div style={{ background: 'linear-gradient(135deg, var(--primary-soft), #e8f4cf)', borderRadius: 16, padding: '1.3rem', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid rgba(139,190,31,0.25)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary-700)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{pkg.speed}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-700)' }}>{pkg.unit}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 600, marginTop: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Speed</div>
                </div>

                {/* price */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginBottom: '1.4rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>৳</span>
                  <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{pkg.price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', fontWeight: 600 }}>/ {pkg.period}</span>
                </div>

                <div style={{ height: 1, background: 'var(--border)', marginBottom: '1.4rem' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.6rem', flex: 1 }}>
                  {pkg.features?.map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--foreground)', fontWeight: 500, fontSize: '0.94rem' }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={13} color="var(--primary-700)" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={pkg.buttonLink || '/contact'} className={pkg.popular ? 'btn btn-primary' : 'btn btn-ghost'} style={{ width: '100%' }}>
                  {pkg.buttonText} <ChevronRight size={18} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`.pkg-card { transition: transform 0.3s ease, box-shadow 0.3s ease; } .pkg-card:hover { transform: translateY(-8px); box-shadow: 0 26px 52px rgba(15,27,45,0.12); }`}</style>
    </section>
  );
}
