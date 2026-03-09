const Test = require('../models/Test');

// @desc    Get test by subject
// @route   GET /api/tests/:subject
const getTestBySubject = async (req, res) => {
  try {
    const test = await Test.findOne({ subject: req.params.subject });
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit test answers
// @route   POST /api/tests/:subject/submit
const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    const test = await Test.findOne({ subject: req.params.subject });
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let score = 0;
    test.questions.forEach((q, index) => {
      if (answers[index] === q.answer) score++;
    });

    res.json({ score, total: test.questions.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTestBySubject, submitTest };