const express = require('express');
const { getTestBySubject, submitTest } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:subject')
  .get(protect, getTestBySubject);

router.route('/:subject/submit')
  .post(protect, submitTest);

module.exports = router;