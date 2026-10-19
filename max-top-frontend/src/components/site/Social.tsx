"use client";

import {
  FaFacebookF, FaYoutube, FaWhatsapp, FaInstagram, FaXTwitter,
  FaLinkedinIn, FaTiktok, FaTelegram, FaGlobe,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';

const map: Record<string, IconType> = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
  telegram: FaTelegram,
};

export default function SocialIcon({ platform, size = 16 }: { platform: string; size?: number }) {
  const Cmp = map[platform?.toLowerCase()] || FaGlobe;
  return <Cmp size={size} />;
}

export const SOCIAL_PLATFORMS = Object.keys(map);
