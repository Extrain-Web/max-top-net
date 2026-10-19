"use client";

import { useEffect, useState } from 'react';
import { Phone, ExternalLink } from 'lucide-react';
import { getData } from '@/lib/api';
import type { PaymentMethod } from '@/lib/types';
import { usePage } from '@/lib/usePage';
import { useSite } from '@/components/site/SiteProvider';
import PageBanner from '@/components/site/PageBanner';
import PaymentLogo from '@/components/site/PaymentLogo';
import Reveal from '@/components/site/Reveal';

export default function PaymentPage() {
  const page = usePage('payment');
  const { settings } = useSite();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    getData<PaymentMethod[]>('/payment-methods', []).then(setMethods);
  }, []);

  return (
    <>
      <PageBanner title={page?.title || 'Payment'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />
      <section className="section">
        <div className="container">
          {page?.intro && (
            <p style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 2.5rem', color: 'var(--foreground-muted)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {page.intro}
            </p>
          )}

          <div className="grid auto-fit-320">
            {methods.map((m, i) => {
              const accent = m.color || 'var(--primary)';
              const inner = (
                <div className="card card-hover" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: m.link ? 'pointer' : 'default' }}>
                  {/* top accent strip with logo */}
                  <div style={{ padding: '1.6rem 1.8rem 1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid var(--border)', background: `linear-gradient(120deg, #fff, ${accent}0f)` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ height: 64, minWidth: 92, borderRadius: 14, background: '#fff', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 14px', flexShrink: 0 }}>
                        <PaymentLogo method={m} height={46} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', lineHeight: 1.1 }}>{m.name}</h3>
                        <span className="pill pill-green" style={{ marginTop: 5 }}>{m.type}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1.4rem 1.8rem', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                    {m.instructions && <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.instructions}</p>}
                    {m.link && (
                      <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 10, background: 'var(--primary)', color: 'var(--ink)', fontWeight: 800, fontSize: '0.95rem' }}>
                        Pay Bill <ExternalLink size={16} />
                      </span>
                    )}
                  </div>
                </div>
              );
              return (
                <Reveal key={m._id} delay={i * 70} style={{ height: '100%' }}>
                  {m.link ? <a href={m.link} target="_blank" rel="noreferrer" style={{ height: '100%', display: 'block', textDecoration: 'none', color: 'inherit' }}>{inner}</a> : inner}
                </Reveal>
              );
            })}
          </div>

          {/* Help */}
          <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'var(--primary-soft)', borderRadius: 20, padding: '2.5rem 1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>Facing payment issues?</h2>
            <p style={{ color: 'var(--foreground-muted)', marginBottom: '1.4rem' }}>After paying your bill, call us with your transaction ID.</p>
            <a href={`tel:${settings.topbarPhone}`} className="btn btn-primary"><Phone size={18} /> {settings.topbarPhone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
