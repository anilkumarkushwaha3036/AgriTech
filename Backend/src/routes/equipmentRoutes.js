const express = require('express');
const router = express.Router();
const { getEquipment, getEquipmentById, createEquipment, getMyEquipment } = require('../controllers/equipmentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(getEquipment).post(protect, createEquipment);
router.route('/my').get(protect, getMyEquipment);
router.route('/:id').get(getEquipmentById);

module.exports = router;
