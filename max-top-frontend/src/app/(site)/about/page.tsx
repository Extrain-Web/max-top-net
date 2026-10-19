"use client";

import Link from 'next/link';
import { Users, Wifi, Clock, Award } from 'lucide-react';
import { usePage } from '@/lib/usePage';
import PageBanner from '@/components/site/PageBanner';
import Reveal from '@/components/site/Reveal';
import AboutSection from '@/components/home/AboutSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import TechnologyPartners from '@/components/home/TechnologyPartners';

const STATS = [
  { icon: <Users size={30} />, value: '5,000+', label: 'Happy Customers' },
  { icon: <Wifi size={30} />, value: '99.9%', label: 'Network Uptime' },
  { icon: <Clock size={30} />, value: '24/7', label: 'Support Available' },
  { icon: <Award size={30} />, value: '10+', label: 'Years Experience' },
];

export default function AboutPage() {
  const page = usePage('about');
  return (
    <>
      <PageBanner title={page?.title || 'About Us'} subtitle={page?.subtitle} bannerImage={page?.bannerImage} />

      {page?.intro && (
        <section className="section-sm">
          <div className="container">
            <p style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto', color: 'var(--foreground-muted)', fontSize: '1.12rem', lineHeight: 1.8 }}>
              {page.intro}
            </p>
          </div>
        </section>
      )}

      <AboutSection />

      {/* Stats */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="grid auto-fit-240">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card card-hover" style={{ textAlign: 'center', padding: '2rem 1.2rem' }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, margin: '0 auto 1rem', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-700)' }}>
                    {s.icon}
                  </div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{s.value}</div>
                  <div style={{ color: 'var(--foreground-muted)', fontWeight: 600 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <TestimonialSection />
      <TechnologyPartners />

      <section className="section-sm">
        <div className="container">
          <div style={{ textAlign: 'center', background: 'var(--primary-soft)', borderRadius: 24, padding: '3rem 1.5rem' }}>
            <h2 style={{ fontSize: '1.9rem', marginBottom: '0.8rem' }}>Join the MaxTopNet Family</h2>
            <p style={{ color: 'var(--foreground-muted)', maxWidth: 540, margin: '0 auto 1.6rem' }}>Get a high-speed internet connection today and feel the difference.</p>
            <Link href="/contact" className="btn btn-primary">Get Connected Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
