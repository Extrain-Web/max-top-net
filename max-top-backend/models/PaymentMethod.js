const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' }, // bKash, Nagad, Rocket, Upay, SSLCommerz
    logo: { type: String, default: '' },
    number: { type: String, default: '' },
    type: { type: String, default: 'Personal' }, // Personal, Agent, Merchant
    instructions: { type: String, default: '' },
    link: { type: String, default: 'https://maxtoptech.ispdigital.cloud/BillPayment/Index' }, // bill-pay URL
    color: { type: String, default: '#8bbe1f' }, // brand color for badge fallback
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
