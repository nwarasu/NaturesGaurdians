const express = require('express');
const router = express.Router();
const Species = require('../models/Species');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// CREATE new species (admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const species = new Species(req.body);
    await species.save();
    res.status(201).json(species);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all species (public)
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const species = await Species.find(filter);
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE species by ID (admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Species.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Species not found' });
    res.json({ message: 'Species deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET species by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) return res.status(404).json({ error: 'Species not found' });
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE species by ID (admin only)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Species.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Species not found' });
    res.json({ message: 'Species updated', species: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const species = await Species.find(filter);
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
