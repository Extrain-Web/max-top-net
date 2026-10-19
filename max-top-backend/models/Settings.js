const mongoose = require('mongoose');

// Singleton: one document holds all site-wide settings.
const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },

    // Branding
    logo: { type: String, default: '' }, // optional image logo
    logoTextLight: { type: String, default: 'Max' },
    logoTextBold: { type: String, default: 'topTech' },

    // Top bar
    topbarPhone: { type: String, default: '01873379982' },
    topbarText: { type: String, default: 'BTRC Approved Tariff' },
    topbarEnabled: { type: Boolean, default: true },

    // Header actions
    supportButtonText: { type: String, default: 'Maxtop Support' },
    supportButtonLink: { type: String, default: '/contact' },
    getConnectionText: { type: String, default: 'Get Connection' },

    // Contact
    phone: { type: String, default: '+880 1873 379982' },
    email: { type: String, default: 'support@maxtopnet.com' },
    address: { type: String, default: 'Banaripara, Barisal, Bangladesh' },
    mapEmbed: { type: String, default: '' },

    // Footer
    footerAbout: {
      type: String,
      default:
        'Experience the future of connectivity with ultra-fast internet and premium live TV services designed for your lifestyle.',
    },
    footerQuickLinks: {
      type: [
        {
          label: String,
          href: String,
        },
      ],
      default: [
        { label: 'Broadband Internet', href: '/' },
        { label: 'Live TV', href: '/live-tv' },
        { label: 'Game Servers', href: '/game-server' },
      ],
    },

    // Social links
    socials: {
      type: [
        {
          platform: String, // facebook, youtube, whatsapp, instagram, twitter, linkedin, tiktok
          url: String,
        },
      ],
      default: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
        { platform: 'whatsapp', url: 'https://wa.me/8801873379982' },
      ],
    },

    // SEO
    seoTitle: { type: String, default: 'MaxTopNet | Ultra-Fast Internet & TV' },
    seoDescription: {
      type: String,
      default:
        'Experience the future of connectivity with MaxTopNet. Blazing fast internet, HD Live TV, and low-latency game servers.',
    },

    // Theme color (admin can tweak brand)
    primaryColor: { type: String, default: '#94c11e' },

    // Payment banner (shown right after hero; links to the payment page)
    payBannerEnabled: { type: Boolean, default: true },
    payBannerTitle: { type: String, default: 'Pay Your Bill Online' },
    payBannerSubtitle: { type: String, default: 'Fast & secure — bKash, Nagad, Rocket, Upay & SSLCommerz' },
    payBannerLink: { type: String, default: '/payment' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
