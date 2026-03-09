// backend/models/Test.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: 'There must be exactly 4 options'
    }
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  }
});

const testSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please select subject'],
    enum: ['Tamil', 'English', 'Maths', 'Science', 'SocialScience', 'Physics', 'Chemistry', 'Biology', 'ComputerScience']
  },
  title: {
    type: String,
    required: [true, 'Please provide test title']
  },
  questions: [questionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', testSchema);