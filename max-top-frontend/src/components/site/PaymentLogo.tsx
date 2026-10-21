"use client";

import { imgUrl } from '@/lib/api';
import type { PaymentMethod } from '@/lib/types';

// Built-in brand logos (served from the frontend's /public/payments folder).
// Keyed by a normalized method name.
const BUILTIN: Record<string, string> = {
  bkash: '/payments/bkash.png?v=2',
  nagad: '/payments/nagad.svg?v=2',
  rocket: '/payments/rocket.png?v=2',
  upay: '/payments/upay.webp?v=2',
  sslcommerz: '/payments/sslcommerz.png?v=2',
  sslcommerce: '/payments/sslcommerz.png?v=2',
};

const normalize = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

/** Renders the payment logo: admin-uploaded first, then a built-in brand logo,
 *  then a clean brand-coloured name badge as a final fallback. */
export default function PaymentLogo({
  method,
  height = 40,
  className = '',
}: {
  method: Pick<PaymentMethod, 'name' | 'logo' | 'color'>;
  height?: number;
  className?: string;
}) {
  const builtin = BUILTIN[normalize(method.name)];
  const src = method.logo ? imgUrl(method.logo) : builtin;
  const slug = normalize(method.name);

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={method.name}
        className={`payment-logo payment-logo-${slug} ${className}`.trim()}
        style={{ height, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
      />
    );
  }

  const color = method.color || '#8bbe1f';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height,
        padding: `0 ${height * 0.42}px`,
        borderRadius: height * 0.26,
        background: '#fff',
        border: `1.5px solid ${color}22`,
        boxShadow: '0 2px 8px rgba(15,27,45,0.06)',
        color,
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: height * 0.42,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {method.name}
    </span>
  );
}
