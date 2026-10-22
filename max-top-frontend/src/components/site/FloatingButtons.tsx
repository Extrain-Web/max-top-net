"use client";

import { FaWhatsapp } from 'react-icons/fa6';
import { useSite } from './SiteProvider';
import { useConnection } from './ConnectionModal';

export default function FloatingButtons() {
  const { settings } = useSite();
  const { open } = useConnection();

  const wa =
    settings.socials?.find((s) => s.platform === 'whatsapp')?.url ||
    `https://wa.me/${(settings.topbarPhone || settings.phone || '').replace(/\D/g, '')}`;

  return (
    <>
      <button onClick={open} className="float-connect" aria-label="Get connection">
        {settings.getConnectionText || 'Get Connection'}
      </button>

      <a href={wa} target="_blank" rel="noreferrer" className="float-whatsapp" aria-label="WhatsApp">
        <FaWhatsapp size={30} />
      </a>

      <style>{`
        .float-whatsapp { position: fixed; bottom: 96px; right: 26px; z-index: 1900; width: 58px; height: 58px; border-radius: 50%; background: #25D366; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 22px rgba(37,211,102,0.45); transition: transform 0.2s; }
        .float-whatsapp:hover { transform: scale(1.08); }
        @media (max-width: 480px){ .float-whatsapp { bottom: 82px; right: 18px; width: 52px; height: 52px; } }
      `}</style>
    </>
  );
}
