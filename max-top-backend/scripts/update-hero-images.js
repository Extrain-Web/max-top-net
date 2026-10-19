require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const HeroSlide = require('../models/HeroSlide');
const imgs = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
];
(async () => {
  await connectDB();
  const slides = await HeroSlide.find().sort({ order: 1 });
  for (let k = 0; k < slides.length; k++) {
    slides[k].image = imgs[k % imgs.length];
    await slides[k].save();
  }
  console.log('updated', slides.length, 'hero images');
  await mongoose.connection.close(); process.exit(0);
})();
