"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { getData } from '@/lib/api';
import type { Settings } from '@/lib/types';

const DEFAULT_SETTINGS: Settings = {
  logo: '',
  logoTextLight: 'Max',
  logoTextBold: 'topTech',
  topbarPhone: '01873379982',
  topbarText: 'BTRC Approved Tariff',
  topbarEnabled: true,
  supportButtonText: 'Maxtop Support',
  supportButtonLink: '/contact',
  getConnectionText: 'Get Connection',
  phone: '+880 1873 379982',
  email: 'support@maxtopnet.com',
  address: 'Banaripara, Barisal, Bangladesh',
  mapEmbed: '',
  footerAbout: '',
  footerQuickLinks: [],
  socials: [],
  seoTitle: 'MaxTopNet',
  seoDescription: '',
  primaryColor: '#8bbe1f',
};

const SiteContext = createContext<{ settings: Settings; loading: boolean }>({
  settings: DEFAULT_SETTINGS,
  loading: true,
});

export const useSite = () => useContext(SiteContext);

export default function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData<Settings>('/settings', DEFAULT_SETTINGS).then((s) => {
      const brandColor =
        s.primaryColor && s.primaryColor.toLowerCase() !== '#ff151b'
          ? s.primaryColor
          : '#8bbe1f';
      setSettings({ ...DEFAULT_SETTINGS, ...s, primaryColor: brandColor });
      setLoading(false);
      document.documentElement.style.setProperty('--primary', brandColor);
    });
  }, []);

  return (
    <SiteContext.Provider value={{ settings, loading }}>{children}</SiteContext.Provider>
  );
}
