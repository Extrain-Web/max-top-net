"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ShieldCheck, User } from 'lucide-react';
import { useSite } from './SiteProvider';
import SocialIcon from './Social';
import { imgUrl } from '@/lib/api';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'FTP Server', href: '/ftp-server' },
  { label: 'Area Coverage', href: '/area-coverage' },
  { label: 'Payment', href: '/payment' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
];

export default function Header() {
  const { settings } = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const Brand = (
    <Link href="/" className="brand">
      {settings.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgUrl(settings.logo)} alt="logo" style={{ height: 44 }} />
      ) : (
        <>
          {settings.logoTextLight}
          <b>{settings.logoTextBold}</b>
        </>
      )}
    </Link>
  );

  return (
    <header className="site-header">
      {settings.topbarEnabled && (
        <div className="topbar">
          <div className="container">
            <a href={`tel:${settings.topbarPhone}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={15} /> 24/7 Call: {settings.topbarPhone}
            </a>
            <div className="topbar-socials">
              <span className="topbar-text-hide" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={15} /> {settings.topbarText}
              </span>
              {settings.socials?.slice(0, 4).map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform}>
                  <SocialIcon platform={s.platform} size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {Brand}

          <nav className="nav-links">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/admin" aria-label="Admin Login" style={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', padding: '8px' }}>
              <User size={22} />
            </Link>
            <Link href={settings.supportButtonLink || '/contact'} className="btn btn-ghost nav-support" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              {settings.supportButtonText}
            </Link>
            <button className="nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        <div className="mobile-backdrop" onClick={() => setOpen(false)} />
        <div className="mobile-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="brand" style={{ fontSize: '1.4rem' }}>
              {settings.logoTextLight}
              <b>{settings.logoTextBold}</b>
            </span>
            <button onClick={() => setOpen(false)} className="nav-toggle" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`}>
              {n.label}
            </Link>
          ))}
          <Link href={settings.supportButtonLink || '/contact'} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {settings.supportButtonText}
          </Link>
        </div>
      </div>
    </header>
  );
}
