// backend/controllers/uploadController.js
const Upload = require('../models/Upload');
const path = require('path');

// @desc    Upload content
// @route   POST /api/uploads
// @access  Private/Admin
const uploadContent = async (req, res) => {
  try {
    const { adminName, language, subject, uploadType } = req.body;
    
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // Create URL for the uploaded file
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const upload = await Upload.create({
      adminName,
      language,
      subject,
      uploadType,
      fileName: req.file.originalname,
      fileUrl: fileUrl,
      publicId: req.file.filename // Store filename as publicId
    });

    res.status(201).json({
      success: true,
      data: upload
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all uploads
// @route   GET /api/uploads
// @access  Public
const getUploads = async (req, res) => {
  try {
    const { subject, language, type } = req.query;
    let filter = {};
    
    if (subject) filter.subject = subject;
    if (language) filter.language = language;
    if (type) filter.uploadType = type;

    const uploads = await Upload.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: uploads.length,
      data: uploads
    });

  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete upload
// @route   DELETE /api/uploads/:id
// @access  Private/Admin
const deleteUpload = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);
    
    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'Upload not found'
      });
    }

    // Delete file from local storage
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../uploads', upload.publicId);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await upload.deleteOne();

    res.json({
      success: true,
      message: 'Upload deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting upload:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  uploadContent,
  getUploads,
  deleteUpload
};