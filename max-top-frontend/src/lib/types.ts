export interface Social { platform: string; url: string; }
export interface QuickLink { label: string; href: string; }

export interface Settings {
  logo?: string;
  logoTextLight: string;
  logoTextBold: string;
  topbarPhone: string;
  topbarText: string;
  topbarEnabled: boolean;
  supportButtonText: string;
  supportButtonLink: string;
  getConnectionText: string;
  phone: string;
  email: string;
  address: string;
  mapEmbed: string;
  footerAbout: string;
  footerQuickLinks: QuickLink[];
  socials: Social[];
  seoTitle: string;
  seoDescription: string;
  primaryColor: string;
  payBannerEnabled?: boolean;
  payBannerTitle?: string;
  payBannerSubtitle?: string;
  payBannerLink?: string;
}

export interface HeroSlide {
  _id: string; badge: string; title: string; highlight: string; subtitle: string;
  description: string; image: string; primaryBtnText: string; primaryBtnLink: string;
  secondaryBtnText: string; secondaryBtnLink: string; order: number; active: boolean;
}

export interface OfferBanner {
  _id: string; title: string; subtitle: string; badge: string; discount: string; image: string;
  link: string; buttonText: string; theme: 'eid' | 'puja' | 'boishakh' | 'discount' | 'general';
  size: 'large' | 'small'; order: number; active: boolean;
}

export interface About {
  badge: string; title: string; highlight: string; description: string; points: string[];
  buttonText: string; buttonLink: string; image: string; experienceYears: string; experienceLabel: string;
}

export interface Service { _id: string; title: string; image: string; link: string; order: number; }
export interface Package {
  _id: string; name: string; speed: string; unit: string; price: string; period: string;
  features: string[]; popular: boolean; buttonText: string; buttonLink: string; order: number; active: boolean;
}
export interface Feature { _id: string; icon: string; title: string; desc: string; order: number; }
export interface Faq { _id: string; question: string; answer: string; order: number; }
export interface Review { _id: string; name: string; role: string; text: string; rating: number; avatar: string; bg: string; order: number; }
export interface Partner { _id: string; name: string; logo: string; link: string; order: number; }
export interface Area { _id: string; name: string; district: string; status: 'available' | 'coming-soon'; order: number; }
export interface FtpLink { _id: string; name: string; url: string; logo: string; category: string; description: string; order: number; }
export interface Channel { _id: string; name: string; logo: string; category: string; url: string; order: number; }
export interface GameServer { _id: string; name: string; logo: string; ping: string; region: string; url: string; order: number; }
export interface PaymentMethod { _id: string; name: string; logo: string; number: string; link?: string; color?: string; type: string; instructions: string; order: number; }
export interface Popup { image: string; link: string; enabled: boolean; delaySeconds: number; }
export interface PageContent { slug: string; title: string; subtitle: string; bannerImage: string; intro: string; sections: { heading: string; text: string; image: string }[]; }
