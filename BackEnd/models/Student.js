// backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true
  },
  std: {
    type: String,
    required: [true, 'Please select standard'],
    enum: ['6th', '7th', '8th', '9th', '10th', '11th', '12th']
  },
  subject: {
    type: String,
    required: [true, 'Please select subject'],
    enum: ['Tamil', 'English', 'Maths', 'Science', 'SocialScience', 'Physics', 'Chemistry', 'Biology', 'ComputerScience']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);