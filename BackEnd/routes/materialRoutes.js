const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllMaterials,
  getMaterialsBySubject,
  getMaterialsByLanguage,
  getMaterialsByType,
  getRecentMaterials,
  searchMaterials,
  getMaterialStats,
  deleteMaterial
} = require('../controllers/materialController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Search route (should be before /:subject to avoid conflict)
router.get('/search', searchMaterials);

// Stats route (admin only)
router.get('/stats', admin, getMaterialStats);

// Recent materials
router.get('/recent/:limit?', getRecentMaterials);

// Get by language
router.get('/language/:language', getMaterialsByLanguage);

// Get by type
router.get('/type/:type', getMaterialsByType);

// Get all materials
router.get('/', getAllMaterials);

// Get by subject
router.get('/:subject', getMaterialsBySubject);

// Delete material (admin only)
router.delete('/:id', admin, deleteMaterial);

module.exports = router;