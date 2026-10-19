"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSite } from './SiteProvider';
import SocialIcon from './Social';

export default function Footer() {
  const { settings } = useSite();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2.5rem', paddingBottom: '2rem' }}>
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
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: '0.4rem', justifyContent: 'center' }}>
                <Send size={16} /> Get Connection
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {year} {settings.logoTextLight}{settings.logoTextBold}. All rights reserved. &nbsp;|&nbsp; Designed with ♥ for Bangladesh
      </div>
    </footer>
  );
}
