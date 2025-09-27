const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res, next) => {
  const { serviceId, date, slot } = req.body;
  const service = await Service.findById(serviceId);
  if (!service) { const err = new Error('Service not found'); err.statusCode = 404; return next(err); }

  const booking = await Booking.create({
    user: req.user._id,
    service: service._id,
    date,
    slot,
    price: service.price
  });

  res.status(201).json({ success: true, booking });
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('service');
  res.json({ success: true, bookings });
};
