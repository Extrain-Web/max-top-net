"use client";

import {
  Headphones, Zap, Gamepad2, Wifi, ShieldCheck, Server, Globe, Signal,
  Tv, Download, MapPin, CreditCard, Users, Clock, Rocket, Award,
  Network, Cloud, Cable, MonitorPlay, Router, Star,
  Video, Camera, Wrench, ShoppingCart, GraduationCap, Fingerprint,
  Settings, Headset, Building2, Cpu, type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Headphones, Zap, Gamepad2, Wifi, ShieldCheck, Server, Globe, Signal,
  Tv, Download, MapPin, CreditCard, Users, Clock, Rocket, Award,
  Network, Cloud, Cable, MonitorPlay, Router, Star,
  Video, Camera, Wrench, ShoppingCart, GraduationCap, Fingerprint,
  Settings, Headset, Building2, Cpu,
};

export default function Icon({
  name,
  size = 24,
  color,
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const Cmp = map[name] || Zap;
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} />;
}

export const ICON_NAMES = Object.keys(map);
