// backend/controllers/studentController.js
const Student = require('../models/Student');

// @desc    Create student details
// @route   POST /api/students
// @access  Private
const createStudent = async (req, res) => {
  try {
    const { name, std, subject } = req.body;

    // Validation
    if (!name || !std || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const student = await Student.create({
      name,
      std,
      subject,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get student details
// @route   GET /api/students/:id
// @access  Private
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if user owns this student record
    if (student.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this student record'
      });
    }

    res.json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all students (admin only)
// @route   GET /api/students
// @access  Private/Admin
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId', 'name email');
    
    res.json({
      success: true,
      count: students.length,
      data: students
    });

  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createStudent,
  getStudent,
  getAllStudents
};