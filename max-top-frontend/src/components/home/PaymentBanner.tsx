"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wallet, ArrowRight } from 'lucide-react';
import { getData } from '@/lib/api';
import type { PaymentMethod } from '@/lib/types';
import { useSite } from '@/components/site/SiteProvider';
import PaymentLogo from '@/components/site/PaymentLogo';

export default function PaymentBanner() {
  const { settings } = useSite();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    getData<PaymentMethod[]>('/payment-methods', []).then(setMethods);
  }, []);

  if (settings.payBannerEnabled === false) return null;
  if (!methods.length) return null;

  const link = settings.payBannerLink || '/payment';

  return (
    <section style={{ padding: '2.5rem 0', background: 'var(--surface)' }}>
      <div className="container">
        <Link
          href={link}
          className="pay-banner"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.6rem',
            background: 'linear-gradient(120deg, #fff 0%, var(--primary-soft) 100%)',
            border: '1px solid rgba(139,190,31,0.3)', borderRadius: 20, padding: '1.6rem 2rem',
            boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s',
          }}
        >
          {/* left: text */}
          <div className="pay-banner-text" style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 240, flex: 1 }}>
            <span style={{ width: 58, height: 58, borderRadius: 16, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-primary)' }}>
              <Wallet size={28} color="var(--ink)" />
            </span>
            <div>
              <h3 style={{ fontSize: '1.35rem', lineHeight: 1.15, marginBottom: 4 }}>{settings.payBannerTitle || 'Pay Your Bill Online'}</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.92rem' }}>{settings.payBannerSubtitle || 'Fast & secure bill payment'}</p>
            </div>
          </div>

          {/* middle: logos */}
          <div className="pay-banner-logos" style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
            {methods.map((m) => (
              <PaymentLogo key={m._id} method={m} height={52} />
            ))}
          </div>

          {/* right: cta */}
          <div className="pay-cta-wrap" style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
            <span className="btn btn-primary pay-cta" style={{ flexShrink: 0 }}>
              Pay Bill <ArrowRight size={18} />
            </span>
          </div>
        </Link>
      </div>
      <style>{`
        .pay-banner:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: var(--primary); }
        .pay-banner:hover .pay-cta { background: var(--primary-600); }

        /* Desktop optical logo heights */
        .pay-banner-logos .payment-logo-bkash { height: 48px !important; }
        .pay-banner-logos .payment-logo-nagad { height: 48px !important; }
        .pay-banner-logos .payment-logo-sslcommerz { height: 32px !important; }
        .pay-banner-logos .payment-logo-rocket { height: 50px !important; }
        .pay-banner-logos .payment-logo-upay { height: 48px !important; }

        @media (max-width: 768px){
          .pay-banner {
            padding: 1.3rem 1.1rem !important;
            gap: 1.25rem !important;
          }
          .pay-banner-text {
            width: 100% !important;
            min-width: 0 !important;
          }
          .pay-banner-logos {
            width: 100% !important;
            gap: 12px 14px !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }
          .pay-banner-logos .payment-logo {
            width: auto !important;
            max-width: 100% !important;
          }
          .pay-banner-logos .payment-logo-bkash {
            height: 42px !important;
          }
          .pay-banner-logos .payment-logo-nagad {
            height: 42px !important;
          }
          .pay-banner-logos .payment-logo-sslcommerz {
            height: 28px !important;
          }
          .pay-banner-logos .payment-logo-rocket {
            height: 40px !important;
          }
          .pay-banner-logos .payment-logo-upay {
            height: 38px !important;
          }
          .pay-banner-logos span {
            height: 38px !important;
            font-size: 14px !important;
            padding: 0 12px !important;
          }
          .pay-cta-wrap {
            width: 100% !important;
            display: flex !important;
            justify-content: flex-end !important;
          }
        }
        @media (max-width: 380px){
          .pay-banner-logos {
            gap: 8px 12px !important;
          }
          .pay-banner-logos .payment-logo-bkash { height: 35px !important; }
          .pay-banner-logos .payment-logo-nagad { height: 35px !important; }
          .pay-banner-logos .payment-logo-sslcommerz { height: 24px !important; }
          .pay-banner-logos .payment-logo-rocket { height: 34px !important; }
          .pay-banner-logos .payment-logo-upay { height: 32px !important; }
          .pay-banner-logos span {
            height: 32px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
