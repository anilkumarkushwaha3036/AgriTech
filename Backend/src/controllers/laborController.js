const User = require('../models/User');

// @desc    Get all laborers
// @route   GET /api/labor
// @access  Public
const getLaborers = async (req, res) => {
  try {
    const laborers = await User.find({ role: 'laborer' }).select('-password');
    res.json(laborers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLaborers };
