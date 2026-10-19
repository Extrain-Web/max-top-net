const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    district: { type: String, default: '' },
    status: { type: String, enum: ['available', 'coming-soon'], default: 'available' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Area', areaSchema);
