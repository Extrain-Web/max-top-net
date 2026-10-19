"use client";

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useSite } from './SiteProvider';

export default function FloatingButtons() {
  const { settings } = useSite();
  const wa = settings.socials?.find((s) => s.platform?.toLowerCase() === 'whatsapp')?.url;

  return (
    <>
      <a
        href={wa || `tel:${settings.topbarPhone}`}
        target={wa ? '_blank' : undefined}
        rel="noreferrer"
        className="float-chat"
        aria-label="Chat with us"
      >
        <MessageCircle size={28} />
      </a>
      <Link href="/contact" className="float-connect">
        {settings.getConnectionText}
      </Link>
    </>
  );
}
