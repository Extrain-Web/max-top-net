"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, User, ChevronDown } from 'lucide-react';
import { useSite } from './SiteProvider';
import Icon from './Icon';
import { useConnection } from './ConnectionModal';
import { getData, imgUrl } from '@/lib/api';
import type { ServiceItem, FtpLink } from '@/lib/types';

type NavItem = { label: string; href: string; dropdown?: 'service' | 'ftp' };

const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Service', href: '/service', dropdown: 'service' },
  { label: 'FTP Server', href: '/ftp-server', dropdown: 'ftp' },
  { label: 'Area Coverage', href: '/area-coverage' },
  { label: 'Payment', href: '/payment' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
];

export default function Header() {
  const { settings } = useSite();
  const { open: openConnection } = useConnection();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [ftp, setFtp] = useState<FtpLink[]>([]);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    getData<ServiceItem[]>('/service-items', []).then(setServices);
    getData<FtpLink[]>('/ftp', []).then(setFtp);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const connectText = settings.supportButtonText || 'Get Connection';

  const dropItems = (kind: 'service' | 'ftp') =>
    kind === 'service'
      ? services.map((s) => ({ label: s.title, icon: s.icon }))
      : ftp.map((f) => ({ label: f.name, icon: 'Server' }));

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
            <div className="topbar-links">
              <Link href="/about">About us</Link>
              <Link href="/payment">Payment</Link>
            </div>
            <a href={`tel:${settings.topbarPhone}`} className="topbar-hotline">
              <span className="th-ic"><Phone size={16} /></span>
              <span className="th-txt">
                <small>Hotline (24/7)</small>
                <strong>{settings.topbarPhone}</strong>
              </span>
            </a>
          </div>
        </div>
      )}

      <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {Brand}

          <nav className="nav-links">
            {NAV.map((n) => {
              const items = n.dropdown ? dropItems(n.dropdown) : [];
              if (n.dropdown && items.length) {
                return (
                  <div key={n.href} className="nav-dd">
                    <Link href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`}>
                      {n.label} <ChevronDown size={15} style={{ marginLeft: 2 }} />
                    </Link>
                    <div className="nav-dropdown">
                      <div className="container">
                        <div className="nav-dd-head">
                          {n.dropdown === 'service' ? 'Our Services' : 'FTP Server Categories'}
                        </div>
                        <div className="nav-dropdown-inner">
                          {items.map((it, i) => (
                            <Link key={i} href={n.href} className="nav-dd-item">
                              <span className="nav-dd-ic"><Icon name={it.icon} size={20} color="var(--primary-700)" /></span>
                              {it.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/admin" aria-label="Admin Login" style={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', padding: '8px' }}>
              <User size={22} />
            </Link>
            <button onClick={openConnection} className="btn btn-primary nav-support" style={{ padding: '10px 22px', fontSize: '0.92rem' }}>
              {connectText}
            </button>
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
          {NAV.map((n) => {
            const items = n.dropdown ? dropItems(n.dropdown) : [];
            if (n.dropdown && items.length) {
              const expanded = mobileSub === n.dropdown;
              return (
                <div key={n.href}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`} style={{ flex: 1 }}>{n.label}</Link>
                    <button onClick={() => setMobileSub(expanded ? null : n.dropdown!)} aria-label="Toggle submenu" style={{ background: 'transparent', border: 'none', padding: 10, color: 'var(--ink)' }}>
                      <ChevronDown size={18} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                  </div>
                  {expanded && (
                    <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column' }}>
                      {items.map((it, i) => (
                        <Link key={i} href={n.href} className="nav-link" style={{ fontSize: '0.92rem', padding: '9px 12px', color: 'var(--foreground-muted)' }}>{it.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`}>{n.label}</Link>
            );
          })}
          <button onClick={() => { setOpen(false); openConnection(); }} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {connectText}
          </button>
        </div>
      </div>
    </header>
  );
}
