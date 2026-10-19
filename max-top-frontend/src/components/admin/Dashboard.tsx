"use client";

import { useEffect, useState } from 'react';
import { Package, Tag, MessageSquare, Star, Image as ImageIcon, Server, ExternalLink } from 'lucide-react';
import { apiGet } from '@/lib/api';

export default function Dashboard({ go }: { go: (view: string) => void }) {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    (async () => {
      const safe = async (p: string) => { try { return await apiGet<any[]>(p); } catch { return []; } };
      const [packages, offers, hero, reviews, msgs] = await Promise.all([
        safe('/packages?all=1'), safe('/offers?all=1'), safe('/hero?all=1'), safe('/reviews?all=1'),
        (async () => { try { return (await apiGet<{ count: number }>('/messages/unread-count')).count; } catch { return 0; } })(),
      ]);
      setStats({ packages: packages.length, offers: offers.length, hero: hero.length, reviews: reviews.length, unread: msgs });
    })();
  }, []);

  const cards = [
    { icon: <Package size={26} />, num: stats.packages ?? '—', lbl: 'Packages', bg: '#e0f2fe', color: '#0284c7', view: 'packages' },
    { icon: <Tag size={26} />, num: stats.offers ?? '—', lbl: 'Offer Banners', bg: '#fef3c7', color: '#d97706', view: 'offers' },
    { icon: <ImageIcon size={26} />, num: stats.hero ?? '—', lbl: 'Hero Slides', bg: '#f1f8e2', color: '#5f8512', view: 'hero' },
    { icon: <Star size={26} />, num: stats.reviews ?? '—', lbl: 'Reviews', bg: '#fce7f3', color: '#db2777', view: 'reviews' },
    { icon: <MessageSquare size={26} />, num: stats.unread ?? '—', lbl: 'New Messages', bg: '#dcfce7', color: '#16a34a', view: 'messages' },
  ];

  return (
    <div>
      <div className="res-head"><div><h2>Dashboard</h2><p style={{ color: '#64788f', fontSize: '0.9rem' }}>Welcome! Control the entire website from here.</p></div>
        <a href="/" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '10px 20px' }}><ExternalLink size={16} /> View Site</a>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {cards.map((c, i) => (
          <button key={i} className="admin-stat" onClick={() => go(c.view)} style={{ cursor: 'pointer', textAlign: 'left', border: 'none' }}>
            <div className="ic" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
            <div><div className="num">{c.num}</div><div className="lbl">{c.lbl}</div></div>
          </button>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(120deg, var(--ink), var(--ink-700))', borderRadius: 18, padding: '2rem', color: '#fff' }}>
        <h3 style={{ color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: 10 }}><Server size={22} color="var(--primary)" /> Quick Guide</h3>
        <p style={{ color: '#c3cfdc', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Select any section from the left menu to add, edit or delete content.
          Images can be uploaded directly from your computer. All changes appear on the website instantly.
        </p>
      </div>
    </div>
  );
}
