const mongoose = require('mongoose');

// Live TV channels
const channelSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    logo: { type: String, default: '' },
    category: { type: String, default: 'General' }, // News, Sports, Entertainment, Kids...
    url: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Channel', channelSchema);
