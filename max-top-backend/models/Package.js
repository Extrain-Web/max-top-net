const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    speed: { type: String, default: '' }, // e.g. "15"
    unit: { type: String, default: 'Mbps' },
    price: { type: String, default: '' },
    period: { type: String, default: 'Month' },
    features: {
      type: [String],
      default: ['Optical Fiber Connection', 'Connection Charge Free', '24/7 Customer Support'],
    },
    popular: { type: Boolean, default: false },
    buttonText: { type: String, default: 'Choose Plan' },
    buttonLink: { type: String, default: '/contact' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
