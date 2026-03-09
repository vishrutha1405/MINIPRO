const Theory = require('../models/Theory');

// @desc    Get theory by subject
// @route   GET /api/theory/:subject
const getTheoryBySubject = async (req, res) => {
  try {
    const theory = await Theory.findOne({ subject: req.params.subject });
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    res.json(theory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create theory
// @route   POST /api/theory
const createTheory = async (req, res) => {
  try {
    const theory = await Theory.create(req.body);
    res.status(201).json(theory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTheoryBySubject, createTheory };