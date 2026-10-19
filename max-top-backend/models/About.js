const mongoose = require('mongoose');

// Singleton: About section on homepage
const aboutSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    badge: { type: String, default: 'About MaxtopTech' },
    title: { type: String, default: 'Connecting You To' },
    highlight: { type: String, default: 'The World' },
    description: {
      type: String,
      default:
        'We are dedicated to providing the best internet service in the region. Enjoy uninterrupted browsing, gaming, and streaming with our state-of-the-art fiber optic infrastructure.',
    },
    points: {
      type: [String],
      default: [
        'High-speed fiber optic network with 99.9% uptime',
        'Dedicated BDIX connectivity for ultra-fast local content',
        '24/7 proactive customer support with instant response',
      ],
    },
    buttonText: { type: String, default: 'Discover More' },
    buttonLink: { type: String, default: '/about' },
    image: { type: String, default: '' },
    experienceYears: { type: String, default: '10+' },
    experienceLabel: { type: String, default: 'Years of Experience' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
