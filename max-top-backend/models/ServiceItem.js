const mongoose = require('mongoose');

// Services shown on the dedicated /service page (cards).
const serviceItemSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Wifi' }, // lucide icon name
    image: { type: String, default: '' }, // optional image (used instead of icon)
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceItem', serviceItemSchema);
