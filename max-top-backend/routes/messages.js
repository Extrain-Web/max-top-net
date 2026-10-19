const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/messages  (public - contact form)
router.post('/', async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json({ ok: true, id: msg._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/messages (admin)
router.get('/', protect, async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: -1 });
  res.json(msgs);
});

// GET /api/messages/unread-count (admin)
router.get('/unread-count', protect, async (req, res) => {
  const count = await Message.countDocuments({ read: false });
  res.json({ count });
});

// PUT /api/messages/:id/read (admin)
router.put('/:id/read', protect, async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(msg);
});

// DELETE /api/messages/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
