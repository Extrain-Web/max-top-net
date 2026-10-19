const mongoose = require('mongoose');

// Singleton: homepage popup modal
const popupBannerSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    image: { type: String, default: '' },
    link: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    delaySeconds: { type: Number, default: 2 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PopupBanner', popupBannerSchema);
