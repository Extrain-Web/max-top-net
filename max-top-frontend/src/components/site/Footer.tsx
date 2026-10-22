"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, QrCode, Landmark } from 'lucide-react';
import { useSite } from './SiteProvider';
import SocialIcon from './Social';

const PARTNERS = [
  { name: 'BTCL', img: '/partners/btcl.svg' },
  { name: 'BTRC', img: '/partners/btrc.png' },
  { name: 'Summit Communications', img: '/partners/summit.png' },
  { name: 'aamra', img: '/partners/aamra.png' },
  { name: 'bKash', img: '/payments/bkash.png?v=2' },
  { name: 'Nagad', img: '/payments/nagad.svg?v=2' },
  { name: 'Rocket', img: '/payments/rocket.png?v=2' },
  { name: 'Visa', img: '/partners/visa.svg' },
  { name: 'Mastercard', img: '/partners/mastercard.svg' },
];

export default function Footer() {
  const { settings } = useSite();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid" style={{ paddingBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <h2 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '1rem' }}>
              {settings.logoTextLight}
              <span style={{ color: 'var(--primary)' }}>{settings.logoTextBold}</span>
            </h2>
            <p style={{ color: '#aab8c8', lineHeight: 1.8, fontSize: '0.95rem' }}>{settings.footerAbout}</p>
            <div className="footer-social">
              {settings.socials?.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform}>
                  <SocialIcon platform={s.platform} size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {settings.footerQuickLinks?.map((l, i) => (
                <Link key={i} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <Link href="/about">About Us</Link>
              <Link href="/area-coverage">Area Coverage</Link>
              <Link href="/payment">Payment</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#aab8c8', fontSize: '0.95rem' }}>
              <a href={`tel:${settings.phone}`} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Phone size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} /> {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Mail size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} /> {settings.email}
              </a>
              <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} /> {settings.address}
              </span>
              {settings.topbarText && (
                <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <ShieldCheck size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} /> {settings.topbarText}
                </span>
              )}
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4>Our Partners</h4>
            <div className="footer-partners">
              {PARTNERS.map((p, i) => (
                <span key={i} className="fp-card" title={p.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} />
                </span>
              ))}
              <span className="fp-card" title="Bangla QR"><QrCode size={22} color="#0b3b6f" /></span>
              <span className="fp-card" title="Bank Transfer"><Landmark size={22} color="#0b3b6f" /></span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <span className="footer-copy">
            &copy; {year} {settings.logoTextLight}{settings.logoTextBold}. All rights reserved. &nbsp;|&nbsp; Designed with ♥ for Bangladesh
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/faysy1756641916.png" alt="Accepted payment methods" className="footer-pay" />
        </div>
      </div>
    </footer>
  );
}
