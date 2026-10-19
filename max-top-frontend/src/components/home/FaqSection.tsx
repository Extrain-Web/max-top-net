"use client";

import { useEffect, useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { getData } from '@/lib/api';
import type { Faq } from '@/lib/types';
import Reveal from '@/components/site/Reveal';

export default function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [open, setOpen] = useState(0);
  useEffect(() => {
    getData<Faq[]>('/faqs', []).then(setFaqs);
  }, []);
  if (!faqs.length) return null;

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="grid faq-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' }}>
          <Reveal>
            <span className="eyebrow"><HelpCircle size={14} /> FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '2rem' }}>Frequently Asked <span className="text-primary">Questions</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={faq._id} className="card" style={{ padding: 0, border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border)', overflow: 'hidden', background: '#fff' }}>
                    <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', textAlign: 'left' }}>
                      <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</span>
                      <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: isOpen ? 'var(--primary)' : 'var(--primary-soft)', color: isOpen ? '#fff' : 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <div style={{ maxHeight: isOpen ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                      <p style={{ padding: '0 1.4rem 1.3rem', color: 'var(--foreground-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={150} className="faq-illu">
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ position: 'absolute', inset: '8%', borderRadius: '50%', background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)' }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/interfaq.png" alt="FAQ" style={{ position: 'relative', width: '100%', maxWidth: 680, margin: '0 auto', transform: 'translateY(2.5rem)' }} />
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 860px){ .faq-grid { grid-template-columns: 1fr !important; } .faq-illu { display: none; } }`}</style>
    </section>
  );
}
