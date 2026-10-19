const mongoose = require('mongoose');

// Generic content header for each menu page (title, subtitle, banner, intro)
const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // ftp-server, live-tv, game-server, area-coverage, payment, about, contact
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    intro: { type: String, default: '' },
    // Flexible extra content blocks for richer pages
    sections: {
      type: [
        {
          heading: String,
          text: String,
          image: String,
        },
      ],
      default: [],
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Page', pageSchema);
