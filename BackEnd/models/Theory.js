// backend/models/Theory.js
const mongoose = require('mongoose');

const theorySchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please select subject'],
    enum: ['Tamil', 'English', 'Maths', 'Science', 'SocialScience', 'Physics', 'Chemistry', 'Biology', 'ComputerScience']
  },
  title: {
    type: String,
    required: [true, 'Please provide title']
  },
  description: String,
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  links: [{
    title: String,
    url: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Theory', theorySchema);