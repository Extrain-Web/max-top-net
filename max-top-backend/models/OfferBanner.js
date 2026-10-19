const mongoose = require('mongoose');

// Festival / promotional offer banners (Eid, Puja, etc.)
const offerBannerSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    badge: { type: String, default: '' }, // e.g. "EID OFFER", "PUJA SPECIAL"
    discount: { type: String, default: '' }, // e.g. "50% OFF", "1 MONTH FREE"
    image: { type: String, default: '' }, // optional product/offer visual
    link: { type: String, default: '' },
    buttonText: { type: String, default: 'Grab Offer' },
    theme: { type: String, enum: ['eid', 'puja', 'boishakh', 'discount', 'general'], default: 'discount' }, // festive design theme
    size: { type: String, enum: ['large', 'small'], default: 'small' }, // layout hint
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OfferBanner', offerBannerSchema);
