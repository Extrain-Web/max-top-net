const mongoose = require('mongoose');

// Contact form / connection request submissions
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, default: '' },
    type: { type: String, default: 'contact' }, // contact | connection
    package: { type: String, default: '' },
    address: { type: String, default: '' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
