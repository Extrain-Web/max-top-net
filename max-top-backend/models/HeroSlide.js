const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema(
  {
    badge: { type: String, default: '' },
    title: { type: String, default: '' },
    highlight: { type: String, default: '' }, // colored part of title
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    primaryBtnText: { type: String, default: 'Get Connection' },
    primaryBtnLink: { type: String, default: '/contact' },
    secondaryBtnText: { type: String, default: 'View Packages' },
    secondaryBtnLink: { type: String, default: '#packages' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
