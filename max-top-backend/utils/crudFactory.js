const express = require('express');
const { protect } = require('../middleware/auth');

/**
 * Build a REST router for a Mongoose collection model.
 * Public: GET /          -> list (query ?all=1 to include inactive)
 *         GET /:id        -> single
 * Admin:  POST /          -> create
 *         PUT /:id        -> update
 *         DELETE /:id     -> delete
 *         PUT /reorder/bulk -> [{id, order}]
 */
function crudRouter(Model, { sort = { order: 1, createdAt: -1 } } = {}) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const filter = {};
      if (!req.query.all && Model.schema.path('active')) filter.active = true;
      const docs = await Model.find(filter).sort(sort);
      res.json(docs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', protect, async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.put('/reorder/bulk', protect, async (req, res) => {
    try {
      const items = req.body.items || [];
      await Promise.all(
        items.map((it) => Model.findByIdAndUpdate(it.id, { order: it.order }))
      );
      res.json({ ok: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.put('/:id', protect, async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', protect, async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ ok: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
}

/**
 * Build a router for a singleton document (identified by key: 'main').
 * Public: GET /     -> the document (auto-created if missing)
 * Admin:  PUT /     -> update
 */
function singletonRouter(Model) {
  const router = express.Router();

  async function getOrCreate() {
    let doc = await Model.findOne({ key: 'main' });
    if (!doc) doc = await Model.create({ key: 'main' });
    return doc;
  }

  router.get('/', async (req, res) => {
    try {
      res.json(await getOrCreate());
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/', protect, async (req, res) => {
    try {
      const doc = await getOrCreate();
      const payload = { ...req.body };
      delete payload.key;
      Object.assign(doc, payload);
      await doc.save();
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
}

module.exports = { crudRouter, singletonRouter };
