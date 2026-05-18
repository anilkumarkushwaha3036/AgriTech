const express = require('express');
const router = express.Router();
const { getEquipment, getEquipmentById, createEquipment, getMyEquipment, updateEquipmentStatus } = require('../controllers/equipmentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getEquipment)
  .post(protect, createEquipment);
  
router.route('/my').get(protect, getMyEquipment);
router.route('/:id').get(getEquipmentById);
router.route('/:id/status').put(protect, updateEquipmentStatus);

module.exports = router;
