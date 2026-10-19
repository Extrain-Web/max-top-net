// One-off: replace all offer banners with the festival-themed defaults.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const OfferBanner = require('../models/OfferBanner');

const OFFERS = [
  { theme: 'eid', size: 'large', badge: 'EID SPECIAL', discount: '1 MONTH FREE', title: 'Eid Mubarak Offer', subtitle: 'Get 1 full month free on yearly connection + free installation!', buttonText: 'Grab Offer', link: '/contact', order: 0, active: true },
  { theme: 'discount', size: 'large', badge: 'NEW CONNECTION', discount: '0৳ CHARGE', title: 'Free Setup Offer', subtitle: 'Zero connection charge on every new connection this month.', buttonText: 'Apply Now', link: '/contact', order: 1, active: true },
  { theme: 'general', size: 'small', badge: 'REFER & EARN', discount: 'UP TO ৳300', title: 'Refer & Earn', subtitle: 'Refer a friend and earn bill discounts.', buttonText: 'Learn More', link: '/contact', order: 2, active: true },
  { theme: 'puja', size: 'small', badge: 'PUJA OFFER', discount: '20% OFF', title: 'Sharadiya Offer', subtitle: 'Special discount on speed upgrades this Puja.', buttonText: 'Grab Offer', link: '/contact', order: 3, active: true },
  { theme: 'boishakh', size: 'small', badge: 'BOISHAKH', discount: '15% OFF', title: 'Shubho Noboborsho', subtitle: 'Special new-year discount on new connections.', buttonText: 'Grab Offer', link: '/contact', order: 4, active: true },
];

(async () => {
  await connectDB();
  await OfferBanner.deleteMany({});
  await OfferBanner.insertMany(OFFERS);
  console.log(`✓ Replaced offers with ${OFFERS.length} festival banners`);
  await mongoose.connection.close();
  process.exit(0);
})();
