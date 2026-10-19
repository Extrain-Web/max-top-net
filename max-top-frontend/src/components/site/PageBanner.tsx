"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { imgUrl } from '@/lib/api';

export default function PageBanner({
  title,
  subtitle,
  bannerImage,
  crumb,
}: {
  title: string;
  subtitle?: string;
  bannerImage?: string;
  crumb?: string;
}) {
  return (
    <section
      className="page-banner"
      style={
        bannerImage
          ? {
              backgroundImage: `linear-gradient(120deg, rgba(15,27,45,0.92), rgba(28,52,80,0.82)), url(${imgUrl(bannerImage)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)' }}>{crumb || title}</span>
        </div>
      </div>
    </section>
  );
}
