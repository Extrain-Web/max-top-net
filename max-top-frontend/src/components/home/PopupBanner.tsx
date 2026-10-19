"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { getData, imgUrl } from '@/lib/api';
import type { Popup } from '@/lib/types';

export default function PopupBanner() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    getData<Popup | null>('/popup', null).then((p) => {
      if (p && p.enabled && p.image) {
        const seen = sessionStorage.getItem('maxtop_popup_seen');
        if (!seen) {
          timer = setTimeout(() => {
            setPopup(p);
            setOpen(true);
            sessionStorage.setItem('maxtop_popup_seen', '1');
          }, (p.delaySeconds || 2) * 1000);
        }
      }
    });
    return () => clearTimeout(timer);
  }, []);

  if (!open || !popup) return null;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imgUrl(popup.image)} alt="Offer" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} />
  );

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,27,45,0.72)', backdropFilter: 'blur(5px)', padding: '1rem' }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 440, background: '#fff', borderRadius: 16, padding: 6, animation: 'popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
      >
        <button onClick={() => setOpen(false)} aria-label="Close" style={{ position: 'absolute', top: -14, right: -14, width: 38, height: 38, borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)', color: 'var(--ink)', zIndex: 2 }}>
          <X size={20} strokeWidth={2.5} />
        </button>
        {popup.link ? <Link href={popup.link} onClick={() => setOpen(false)}>{img}</Link> : img}
      </div>
    </div>
  );
}
