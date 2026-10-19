const express = require('express');
const Admin = require('../models/Admin');
const { signToken, protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: (email || '').toLowerCase().trim() });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
    const ok = await admin.comparePassword(password || '');
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
    const token = signToken(admin);
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password');
  if (!admin) return res.status(404).json({ message: 'Not found' });
  res.json(admin);
});

// PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Not found' });
    const ok = await admin.comparePassword(currentPassword || '');
    if (!ok) return res.status(400).json({ message: 'Current password is incorrect' });
    if (!newPassword || newPassword.length < 6)
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    admin.password = newPassword;
    await admin.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Not found' });
    if (req.body.name) admin.name = req.body.name;
    if (req.body.email) admin.email = req.body.email.toLowerCase().trim();
    await admin.save();
    res.json({ id: admin._id, name: admin.name, email: admin.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
