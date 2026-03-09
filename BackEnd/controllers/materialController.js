const Upload = require('../models/Upload');
const Theory = require('../models/Theory');
const Test = require('../models/Test');

// @desc    Get all study materials (notes & videos) grouped by subject
// @route   GET /api/materials
// @access  Private
const getAllMaterials = async (req, res) => {
  try {
    const materials = await Upload.find().sort({ createdAt: -1 });
    
    // Group by subject
    const grouped = materials.reduce((acc, item) => {
      const subject = item.subject;
      
      if (!acc[subject]) {
        acc[subject] = { 
          notes: [], 
          videos: [],
          language: item.language
        };
      }
      
      if (item.uploadType === 'Notes') {
        acc[subject].notes.push({
          id: item._id,
          fileName: item.fileName,
          fileUrl: item.fileUrl,
          language: item.language,
          uploadedBy: item.adminName,
          createdAt: item.createdAt
        });
      } else if (item.uploadType === 'Video') {
        acc[subject].videos.push({
          id: item._id,
          fileName: item.fileName,
          fileUrl: item.fileUrl,
          language: item.language,
          uploadedBy: item.adminName,
          createdAt: item.createdAt
        });
      }
      
      return acc;
    }, {});

    res.json({
      success: true,
      count: materials.length,
      data: grouped
    });

  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get materials by subject
// @route   GET /api/materials/:subject
// @access  Private
const getMaterialsBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    
    const materials = await Upload.find({ 
      subject: { $regex: new RegExp(`^${subject}$`, 'i') } 
    }).sort({ createdAt: -1 });

    const notes = materials.filter(m => m.uploadType === 'Notes');
    const videos = materials.filter(m => m.uploadType === 'Video');

    res.json({
      success: true,
      data: {
        subject,
        notes: notes.map(n => ({
          id: n._id,
          fileName: n.fileName,
          fileUrl: n.fileUrl,
          language: n.language,
          uploadedBy: n.adminName,
          createdAt: n.createdAt
        })),
        videos: videos.map(v => ({
          id: v._id,
          fileName: v.fileName,
          fileUrl: v.fileUrl,
          language: v.language,
          uploadedBy: v.adminName,
          createdAt: v.createdAt
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching materials by subject:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get materials by language
// @route   GET /api/materials/language/:language
// @access  Private
const getMaterialsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    
    const materials = await Upload.find({ 
      language: { $regex: new RegExp(`^${language}$`, 'i') } 
    }).sort({ createdAt: -1 });

    // Group by subject
    const grouped = materials.reduce((acc, item) => {
      const subject = item.subject;
      
      if (!acc[subject]) {
        acc[subject] = { notes: [], videos: [] };
      }
      
      if (item.uploadType === 'Notes') {
        acc[subject].notes.push({
          id: item._id,
          fileName: item.fileName,
          fileUrl: item.fileUrl,
          uploadedBy: item.adminName,
          createdAt: item.createdAt
        });
      } else {
        acc[subject].videos.push(item);
      }
      
      return acc;
    }, {});

    res.json({
      success: true,
      language,
      count: materials.length,
      data: grouped
    });

  } catch (error) {
    console.error('Error fetching materials by language:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get materials by type (notes/videos)
// @route   GET /api/materials/type/:type
// @access  Private
const getMaterialsByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!['Notes', 'Video'].includes(type)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid type. Must be Notes or Video' 
      });
    }

    const materials = await Upload.find({ uploadType: type })
      .sort({ createdAt: -1 });

    // Group by subject
    const grouped = materials.reduce((acc, item) => {
      const subject = item.subject;
      
      if (!acc[subject]) {
        acc[subject] = [];
      }
      
      acc[subject].push({
        id: item._id,
        fileName: item.fileName,
        fileUrl: item.fileUrl,
        language: item.language,
        uploadedBy: item.adminName,
        createdAt: item.createdAt
      });
      
      return acc;
    }, {});

    res.json({
      success: true,
      type,
      count: materials.length,
      data: grouped
    });

  } catch (error) {
    console.error('Error fetching materials by type:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get recent materials
// @route   GET /api/materials/recent/:limit
// @access  Private
const getRecentMaterials = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    
    const materials = await Upload.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      count: materials.length,
      data: materials.map(m => ({
        id: m._id,
        fileName: m.fileName,
        fileUrl: m.fileUrl,
        subject: m.subject,
        language: m.language,
        type: m.uploadType,
        uploadedBy: m.adminName,
        createdAt: m.createdAt
      }))
    });

  } catch (error) {
    console.error('Error fetching recent materials:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Search materials
// @route   GET /api/materials/search?q=query
// @access  Private
const searchMaterials = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false,
        message: 'Search query is required' 
      });
    }

    const materials = await Upload.find({
      $or: [
        { subject: { $regex: q, $options: 'i' } },
        { language: { $regex: q, $options: 'i' } },
        { fileName: { $regex: q, $options: 'i' } },
        { adminName: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      query: q,
      count: materials.length,
      data: materials
    });

  } catch (error) {
    console.error('Error searching materials:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get material statistics
// @route   GET /api/materials/stats
// @access  Private (Admin only)
const getMaterialStats = async (req, res) => {
  try {
    const totalMaterials = await Upload.countDocuments();
    const totalNotes = await Upload.countDocuments({ uploadType: 'Notes' });
    const totalVideos = await Upload.countDocuments({ uploadType: 'Video' });
    
    const subjectStats = await Upload.aggregate([
      {
        $group: {
          _id: { subject: "$subject", type: "$uploadType" },
          count: { $sum: 1 }
        }
      }
    ]);

    const languageStats = await Upload.aggregate([
      {
        $group: {
          _id: "$language",
          count: { $sum: 1 },
          notes: {
            $sum: { $cond: [{ $eq: ["$uploadType", "Notes"] }, 1, 0] }
          },
          videos: {
            $sum: { $cond: [{ $eq: ["$uploadType", "Video"] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        total: totalMaterials,
        notes: totalNotes,
        videos: totalVideos,
        bySubject: subjectStats,
        byLanguage: languageStats
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private (Admin only)
const deleteMaterial = async (req, res) => {
  try {
    const material = await Upload.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ 
        success: false,
        message: 'Material not found' 
      });
    }

    // Delete from Cloudinary (if you have cloudinary integration)
    // if (material.publicId) {
    //   await cloudinary.uploader.destroy(material.publicId);
    // }

    await material.deleteOne();

    res.json({
      success: true,
      message: 'Material deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

module.exports = {
  getAllMaterials,
  getMaterialsBySubject,
  getMaterialsByLanguage,
  getMaterialsByType,
  getRecentMaterials,
  searchMaterials,
  getMaterialStats,
  deleteMaterial
};