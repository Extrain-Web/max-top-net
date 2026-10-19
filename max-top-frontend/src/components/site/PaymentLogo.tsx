"use client";

import { imgUrl } from '@/lib/api';
import type { PaymentMethod } from '@/lib/types';

/** Renders an uploaded payment logo, or a clean brand-coloured name badge as fallback. */
export default function PaymentLogo({
  method,
  height = 40,
}: {
  method: Pick<PaymentMethod, 'name' | 'logo' | 'color'>;
  height?: number;
}) {
  if (method.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgUrl(method.logo)} alt={method.name} style={{ height, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />;
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
