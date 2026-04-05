const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getMyRequests, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/myrequests').get(protect, getMyRequests);
router.route('/:id/status').put(protect, updateBookingStatus);

module.exports = router;
