const express = require('express');
const { uploadContent, getUploads } = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.route('/')
  .get(getUploads)
  .post(protect, admin, upload.single('file'), uploadContent);

module.exports = router;