const express = require('express');
const { getTheoryBySubject, createTheory } = require('../controllers/theoryController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:subject')
  .get(protect, getTheoryBySubject);

router.route('/')
  .post(protect, admin, createTheory);

module.exports = router;