const mongoose = require('mongoose');

const ftpLinkSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    url: { type: String, default: '' },
    logo: { type: String, default: '' },
    category: { type: String, default: 'General' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FtpLink', ftpLinkSchema);
