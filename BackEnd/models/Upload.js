// backend/models/Upload.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: [true, 'Please provide admin name'],
    trim: true
  },
  language: {
    type: String,
    required: [true, 'Please select language'],
    enum: ['Tamil', 'English', 'Hindi']
  },
  subject: {
    type: String,
    required: [true, 'Please select subject'],
    enum: ['Tamil', 'English', 'Maths', 'Science', 'SocialScience', 'Physics', 'Chemistry', 'Biology', 'ComputerScience']
  },
  uploadType: {
    type: String,
    required: [true, 'Please select upload type'],
    enum: ['Notes', 'Video']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required']
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  publicId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Upload', uploadSchema);