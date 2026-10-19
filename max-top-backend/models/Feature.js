const mongoose = require('mongoose');

// "Why Choose Us" feature cards
const featureSchema = new mongoose.Schema(
  {
    icon: { type: String, default: 'Zap' }, // lucide icon name
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feature', featureSchema);
