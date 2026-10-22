"use client";

import { useSite } from './SiteProvider';
import { useConnection } from './ConnectionModal';

export default function FloatingButtons() {
  const { settings } = useSite();
  const { open } = useConnection();

  return (
    <button onClick={open} className="float-connect" aria-label="Get connection">
      {settings.getConnectionText || 'Get Connection'}
    </button>
  );
}
