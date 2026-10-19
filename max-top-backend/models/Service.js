const mongoose = require('mongoose');

// ServicesOverview circular cards on homepage
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    image: { type: String, default: '' },
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
