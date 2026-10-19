const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    text: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    avatar: { type: String, default: '' }, // image url (optional); falls back to initial
    bg: { type: String, default: '#6610f2' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
