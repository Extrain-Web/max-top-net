require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const PaymentMethod = require('../models/PaymentMethod');

const BILL = 'https://maxtoptech.ispdigital.cloud/BillPayment/Index';

const COLORS = { bKash: '#E2136E', Nagad: '#EC1C24', Rocket: '#8C2C8E', Upay: '#E8530E', SSLCommerz: '#0F5FA6' };

(async () => {
  await connectDB();

  // remove the placeholder bank transfer (not requested)
  await PaymentMethod.deleteMany({ name: /bank/i });

  // ensure link + color on all existing, keep their logos/numbers
  const all = await PaymentMethod.find();
  for (const m of all) {
    m.link = BILL;
    if (COLORS[m.name]) m.color = COLORS[m.name];
    await m.save();
  }

  // upsert Upay and SSLCommerz
  const ensure = async (name, order, type) => {
    let m = await PaymentMethod.findOne({ name });
    if (!m) {
      await PaymentMethod.create({ name, order, type, link: BILL, color: COLORS[name], number: '01873379982', instructions: 'Pay your bill securely via the online portal.' });
      console.log('added', name);
    }
  };
  await ensure('Upay', 3, 'Personal');
  await ensure('SSLCommerz', 4, 'Cards');

  const final = await PaymentMethod.find().sort({ order: 1 });
  console.log('methods:', final.map((m) => `${m.name}(${m.color})`).join(', '));
  await mongoose.connection.close();
  process.exit(0);
})();
