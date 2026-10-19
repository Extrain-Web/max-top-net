const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    logo: { type: String, default: '' },
    ping: { type: String, default: '' }, // e.g. "5ms"
    region: { type: String, default: 'Local' },
    url: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GameServer', gameServerSchema);
