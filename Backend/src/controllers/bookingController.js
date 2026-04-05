const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { provider, itemType, itemId, startDate, endDate, totalAmount } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'No item provided for booking' });
    }

    const booking = new Booking({
      seeker: req.user._id,
      provider,
      itemType,
      itemId,
      startDate,
      endDate,
      totalAmount
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's made bookings (seeker)
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ seeker: req.user._id })
      .populate('provider', 'name phone')
      .populate('itemId'); 
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookings requested from user (provider)
// @route   GET /api/bookings/myrequests
// @access  Private
const getMyRequests = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user._id })
      .populate('seeker', 'name phone')
      .populate('itemId');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (approve/complete/cancel)
// @route   PUT /api/bookings/:id/status
// @access  Private
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; 
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      if (booking.provider.toString() !== req.user._id.toString() && status === 'approved') {
         return res.status(401).json({ message: 'Not authorized to approve this booking' });
      }
      
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getMyRequests, updateBookingStatus };
