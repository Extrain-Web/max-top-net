import { ICON_NAMES } from '@/components/site/Icon';

export type FieldType =
  | 'text' | 'textarea' | 'number' | 'toggle' | 'image' | 'select' | 'color' | 'stringArray' | 'objectArray';

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  options?: string[];
  itemFields?: { name: string; placeholder: string }[];
  placeholder?: string;
  half?: boolean;
}

export interface ResourceConfig {
  endpoint: string;
  title: string;
  singular: string;
  titleKey: string;
  subKey?: string;
  imageKey?: string;
  fields: FieldDef[];
  defaultItem: Record<string, any>;
}

const order: FieldDef = { name: 'order', label: 'Order', type: 'number', half: true };
const active: FieldDef = { name: 'active', label: 'Active', type: 'toggle' };

export const RESOURCES: Record<string, ResourceConfig> = {
  hero: {
    endpoint: '/hero', title: 'Hero Slider', singular: 'Slide', titleKey: 'title', subKey: 'highlight', imageKey: 'image',
    fields: [
      { name: 'badge', label: 'Badge / Eyebrow', half: true },
      { name: 'title', label: 'Title', half: true },
      { name: 'highlight', label: 'Highlight (colored part)', half: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
      { name: 'primaryBtnText', label: 'Primary Button Text', half: true },
      { name: 'primaryBtnLink', label: 'Primary Button Link', half: true },
      { name: 'secondaryBtnText', label: 'Secondary Button Text', half: true },
      { name: 'secondaryBtnLink', label: 'Secondary Button Link', half: true },
      order, active,
    ],
    defaultItem: { badge: '', title: '', highlight: '', description: '', image: '', primaryBtnText: 'Get Connection', primaryBtnLink: '/contact', secondaryBtnText: 'View Packages', secondaryBtnLink: '#packages', order: 0, active: true },
  },
  offers: {
    endpoint: '/offers', title: 'Offer Banners (Festival)', singular: 'Offer', titleKey: 'title', subKey: 'badge', imageKey: 'image',
    fields: [
      { name: 'theme', label: 'Festival Theme (design)', type: 'select', options: ['eid', 'puja', 'boishakh', 'discount', 'general'], half: true },
      { name: 'size', label: 'Size', type: 'select', options: ['large', 'small'], half: true },
      { name: 'badge', label: 'Badge (e.g. EID SPECIAL)', half: true },
      { name: 'discount', label: 'Discount (e.g. 50% OFF)', half: true },
      { name: 'title', label: 'Title' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'image', label: 'Image (optional — added to the design)', type: 'image' },
      { name: 'buttonText', label: 'Button Text', half: true },
      { name: 'link', label: 'Link', half: true },
      order, active,
    ],
    defaultItem: { theme: 'discount', size: 'small', badge: '', discount: '', title: '', subtitle: '', image: '', buttonText: 'Grab Offer', link: '/contact', order: 0, active: true },
  },
  services: {
    endpoint: '/services', title: 'Service Circles', singular: 'Service', titleKey: 'title', imageKey: 'image',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'link', label: 'Link (optional)', half: true },
      order, active,
    ],
    defaultItem: { title: '', image: '', link: '', order: 0, active: true },
  },
  packages: {
    endpoint: '/packages', title: 'Packages', singular: 'Package', titleKey: 'name', subKey: 'price',
    fields: [
      { name: 'name', label: 'Package Name', half: true },
      { name: 'speed', label: 'Speed (e.g. 15)', half: true },
      { name: 'unit', label: 'Unit', half: true },
      { name: 'price', label: 'Price (৳)', half: true },
      { name: 'period', label: 'Period', half: true },
      { name: 'features', label: 'Features', type: 'stringArray', placeholder: 'Enter a feature' },
      { name: 'popular', label: 'Popular (highlight badge)', type: 'toggle' },
      { name: 'buttonText', label: 'Button Text', half: true },
      { name: 'buttonLink', label: 'Button Link', half: true },
      order, active,
    ],
    defaultItem: { name: '', speed: '', unit: 'Mbps', price: '', period: 'Month', features: ['Optical Fiber Connection', 'Connection Charge Free', '24/7 Customer Support'], popular: false, buttonText: 'Choose Plan', buttonLink: '/contact', order: 0, active: true },
  },
  features: {
    endpoint: '/features', title: 'Features (Why Choose Us)', singular: 'Feature', titleKey: 'title', subKey: 'desc',
    fields: [
      { name: 'icon', label: 'Icon', type: 'select', options: ICON_NAMES },
      { name: 'title', label: 'Title' },
      { name: 'desc', label: 'Description', type: 'textarea' },
      order, active,
    ],
    defaultItem: { icon: 'Zap', title: '', desc: '', order: 0, active: true },
  },
  faqs: {
    endpoint: '/faqs', title: 'FAQ', singular: 'FAQ', titleKey: 'question', subKey: 'answer',
    fields: [
      { name: 'question', label: 'Question' },
      { name: 'answer', label: 'Answer', type: 'textarea' },
      order, active,
    ],
    defaultItem: { question: '', answer: '', order: 0, active: true },
  },
  reviews: {
    endpoint: '/reviews', title: 'Reviews / Feedback', singular: 'Review', titleKey: 'name', subKey: 'role', imageKey: 'avatar',
    fields: [
      { name: 'name', label: 'Name', half: true },
      { name: 'role', label: 'Role / Profession', half: true },
      { name: 'text', label: 'Feedback Text', type: 'textarea' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number', half: true },
      { name: 'bg', label: 'Avatar Color', type: 'color', half: true },
      { name: 'avatar', label: 'Photo (optional)', type: 'image' },
      order, active,
    ],
    defaultItem: { name: '', role: '', text: '', rating: 5, bg: '#6610f2', avatar: '', order: 0, active: true },
  },
  partners: {
    endpoint: '/partners', title: 'Technology Partners', singular: 'Partner', titleKey: 'name', imageKey: 'logo',
    fields: [
      { name: 'name', label: 'Name', half: true },
      { name: 'link', label: 'Link (optional)', half: true },
      { name: 'logo', label: 'Logo', type: 'image' },
      order, active,
    ],
    defaultItem: { name: '', link: '', logo: '', order: 0, active: true },
  },
  areas: {
    endpoint: '/areas', title: 'Area Coverage', singular: 'Area', titleKey: 'name', subKey: 'district',
    fields: [
      { name: 'name', label: 'Area Name', half: true },
      { name: 'district', label: 'District', half: true },
      { name: 'status', label: 'Status', type: 'select', options: ['available', 'coming-soon'] },
      order, active,
    ],
    defaultItem: { name: '', district: '', status: 'available', order: 0, active: true },
  },
  ftp: {
    endpoint: '/ftp', title: 'FTP Server Links', singular: 'FTP Link', titleKey: 'name', subKey: 'category', imageKey: 'logo',
    fields: [
      { name: 'name', label: 'Name', half: true },
      { name: 'category', label: 'Category', half: true },
      { name: 'url', label: 'URL' },
      { name: 'logo', label: 'Logo (optional)', type: 'image' },
      { name: 'description', label: 'Description', type: 'textarea' },
      order, active,
    ],
    defaultItem: { name: '', category: 'General', url: '', logo: '', description: '', order: 0, active: true },
  },
  channels: {
    endpoint: '/channels', title: 'Live TV Channels', singular: 'Channel', titleKey: 'name', subKey: 'category', imageKey: 'logo',
    fields: [
      { name: 'name', label: 'Name', half: true },
      { name: 'category', label: 'Category', half: true },
      { name: 'logo', label: 'Logo', type: 'image' },
      { name: 'url', label: 'Link / Stream URL (optional)' },
      order, active,
    ],
    defaultItem: { name: '', category: 'General', logo: '', url: '', order: 0, active: true },
  },
  'game-servers': {
    endpoint: '/game-servers', title: 'Game Servers', singular: 'Game Server', titleKey: 'name', subKey: 'region', imageKey: 'logo',
    fields: [
      { name: 'name', label: 'Name', half: true },
      { name: 'ping', label: 'Ping (e.g. 30ms)', half: true },
      { name: 'region', label: 'Region', half: true },
      { name: 'url', label: 'URL (optional)' },
      { name: 'logo', label: 'Logo', type: 'image' },
      order, active,
    ],
    defaultItem: { name: '', ping: '', region: 'Local', url: '', logo: '', order: 0, active: true },
  },
  'payment-methods': {
    endpoint: '/payment-methods', title: 'Payment Methods', singular: 'Payment Method', titleKey: 'name', subKey: 'number', imageKey: 'logo',
    fields: [
      { name: 'name', label: 'Name (bKash/Nagad...)', half: true },
      { name: 'type', label: 'Type', half: true },
      { name: 'number', label: 'Number / Account', half: true },
      { name: 'color', label: 'Brand Color (badge)', type: 'color', half: true },
      { name: 'link', label: 'Bill Payment Link (on click)' },
      { name: 'logo', label: 'Logo (optional — else brand badge)', type: 'image' },
      { name: 'instructions', label: 'Instructions', type: 'textarea' },
      order, active,
    ],
    defaultItem: { name: '', type: 'Personal', number: '', color: '#8bbe1f', link: 'https://maxtoptech.ispdigital.cloud/BillPayment/Index', logo: '', instructions: '', order: 0, active: true },
  },
  'service-items': {
    endpoint: '/service-items', title: 'Services (Service Page)', singular: 'Service', titleKey: 'title', subKey: 'description', imageKey: 'image',
    fields: [
      { name: 'title', label: 'Service Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'icon', label: 'Icon', type: 'select', options: ICON_NAMES },
      { name: 'image', label: 'Image (optional — shown instead of icon)', type: 'image' },
      { name: 'link', label: 'Link (optional)', half: true },
      order, active,
    ],
    defaultItem: { title: '', description: '', icon: 'Wifi', image: '', link: '', order: 0, active: true },
  },
};

/* Singleton schemas */
export const ABOUT_FIELDS: FieldDef[] = [
  { name: 'badge', label: 'Badge', half: true },
  { name: 'title', label: 'Title', half: true },
  { name: 'highlight', label: 'Highlight (colored part)', half: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'points', label: 'Points', type: 'stringArray', placeholder: 'Enter a point' },
  { name: 'buttonText', label: 'Button Text', half: true },
  { name: 'buttonLink', label: 'Button Link', half: true },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'experienceYears', label: 'Experience (years)', half: true },
  { name: 'experienceLabel', label: 'Experience Label', half: true },
];

export const POPUP_FIELDS: FieldDef[] = [
  { name: 'image', label: 'Popup Image', type: 'image' },
  { name: 'link', label: 'Link (on click)', half: true },
  { name: 'delaySeconds', label: 'Delay before showing (seconds)', type: 'number', half: true },
  { name: 'enabled', label: 'Popup Enabled', type: 'toggle' },
];

export const SETTINGS_FIELDS: FieldDef[] = [
  { name: 'logoTextLight', label: 'Logo Text (first part)', half: true },
  { name: 'logoTextBold', label: 'Logo Text (colored part)', half: true },
  { name: 'logo', label: 'Logo Image (optional — shown instead of text)', type: 'image' },
  { name: 'primaryColor', label: 'Theme Color', type: 'color', half: true },
  { name: 'topbarPhone', label: 'Topbar Phone', half: true },
  { name: 'topbarText', label: 'Topbar Text', half: true },
  { name: 'topbarEnabled', label: 'Show Topbar', type: 'toggle' },
  { name: 'supportButtonText', label: 'Support Button Text', half: true },
  { name: 'supportButtonLink', label: 'Support Button Link', half: true },
  { name: 'getConnectionText', label: 'Get Connection Button Text', half: true },
  { name: 'phone', label: 'Phone Number', half: true },
  { name: 'email', label: 'Email', half: true },
  { name: 'address', label: 'Address' },
  { name: 'mapEmbed', label: 'Google Map Embed URL', type: 'text' },
  { name: 'footerAbout', label: 'Footer Description', type: 'textarea' },
  { name: 'footerQuickLinks', label: 'Footer Quick Links', type: 'objectArray', itemFields: [{ name: 'label', placeholder: 'Label' }, { name: 'href', placeholder: 'Link' }] },
  { name: 'socials', label: 'Social Links', type: 'objectArray', itemFields: [{ name: 'platform', placeholder: 'facebook/youtube...' }, { name: 'url', placeholder: 'URL' }] },
  { name: 'seoTitle', label: 'SEO Title' },
  { name: 'seoDescription', label: 'SEO Description', type: 'textarea' },
  { name: 'payBannerEnabled', label: 'Show Payment Banner (after hero)', type: 'toggle' },
  { name: 'payBannerTitle', label: 'Payment Banner Title', half: true },
  { name: 'payBannerLink', label: 'Payment Banner Link', half: true },
  { name: 'payBannerSubtitle', label: 'Payment Banner Subtitle' },
];

export const PAGE_SLUGS = [
  { slug: 'service', name: 'Service' },
  { slug: 'ftp-server', name: 'FTP Server' },
  { slug: 'live-tv', name: 'Live TV' },
  { slug: 'game-server', name: 'Game Server' },
  { slug: 'area-coverage', name: 'Area Coverage' },
  { slug: 'payment', name: 'Payment' },
  { slug: 'about', name: 'About Us' },
  { slug: 'contact', name: 'Contact Us' },
];

export const PAGE_FIELDS: FieldDef[] = [
  { name: 'title', label: 'Title', half: true },
  { name: 'subtitle', label: 'Subtitle', half: true },
  { name: 'bannerImage', label: 'Banner Image', type: 'image' },
  { name: 'intro', label: 'Intro Text', type: 'textarea' },
];
