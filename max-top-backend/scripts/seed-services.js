require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs'); const path = require('path');
const ServiceItem = require('../models/ServiceItem');
const DATA = [
  { title: 'Broadband Internet', description: 'Ultra-fast fiber optic internet with 99.9% uptime for home and office.', icon: 'Wifi', order: 0 },
  { title: 'FTP Server', description: "Access the country's largest library of movies, series, games and software.", icon: 'Server', order: 1 },
  { title: 'Live TV', description: 'Hundreds of crystal-clear HD channels right at home.', icon: 'Tv', order: 2 },
  { title: 'Game Server', description: 'Low-latency BDIX routing for a smooth, lag-free gaming experience.', icon: 'Gamepad2', order: 3 },
  { title: 'CC Camera', description: 'Professional CCTV installation, setup and 24/7 monitoring solutions.', icon: 'Video', order: 4 },
  { title: 'Attendance Machine', description: 'Biometric & RFID attendance machine supply, installation and setup.', icon: 'Fingerprint', order: 5 },
  { title: 'Installation & Setup', description: 'Expert network, router and device installation and configuration.', icon: 'Wrench', order: 6 },
  { title: 'E-commerce Solutions', description: 'Complete e-commerce website and online store setup for your business.', icon: 'ShoppingCart', order: 7 },
];
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const count = await ServiceItem.countDocuments();
  if (count === 0) { await ServiceItem.insertMany(DATA); console.log('seeded', DATA.length, 'service items'); }
  else console.log('service items already exist:', count);
  // write seed-data json for production auto-import
  const docs = await mongoose.connection.db.collection('serviceitems').find({}).toArray();
  fs.writeFileSync(path.join(__dirname,'..','seed-data','serviceitems.json'), JSON.stringify(docs, null, 2));
  console.log('wrote seed-data/serviceitems.json');
  await mongoose.connection.close(); process.exit(0);
})();
