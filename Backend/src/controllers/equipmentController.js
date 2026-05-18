const Equipment = require('../models/Equipment');

// @desc    Get all available equipment
// @route   GET /api/equipment
// @access  Public
const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({ status: 'Available' }).populate('owner', 'name phone');
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single equipment
// @route   GET /api/equipment/:id
// @access  Public
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate('owner', 'name phone location');
    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ message: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new equipment listing
// @route   POST /api/equipment
// @access  Private
const createEquipment = async (req, res) => {
  try {
    const { name, description, category, pricePerDay, pricePerHour, images, specifications } = req.body;

    const equipment = new Equipment({
      owner: req.user._id,
      name,
      description,
      category,
      pricePerDay,
      pricePerHour,
      images,
      specifications,
      status: 'Available'
    });

    const createdEquipment = await equipment.save();
    res.status(201).json(createdEquipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's equipment
// @route   GET /api/equipment/my
// @access  Private
const getMyEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({ owner: req.user._id });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update equipment status
// @route   PUT /api/equipment/:id/status
// @access  Private
const updateEquipmentStatus = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    // Check ownership
    if (equipment.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this equipment' });
    }

    if (req.body.status) {
      equipment.status = req.body.status;
    }
    
    const updatedEquipment = await equipment.save();
    res.json(updatedEquipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipment, getEquipmentById, createEquipment, getMyEquipment, updateEquipmentStatus };
