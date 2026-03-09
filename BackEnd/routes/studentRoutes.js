// backend/routes/studentRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createStudent,
  getStudent,
  getAllStudents
} = require('../controllers/studentController');

const router = express.Router();

// Protect all routes
router.use(protect);

// Get all students (admin only) and create student
router.route('/')
  .get(admin, getAllStudents)
  .post(createStudent);

// Get single student
router.route('/:id')
  .get(getStudent);

module.exports = router;