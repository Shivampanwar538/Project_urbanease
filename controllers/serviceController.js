const Service = require('../models/Service');

// @desc Get all services
exports.getAll = async (req, res, next) => {
  try {
    const services = await Service.find({});
    res.json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

// @desc Get single service by ID
exports.getById = async (req, res, next) => {
  try {
    const s = await Service.findById(req.params.id);
    if (!s) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ success: true, service: s });
  } catch (err) {
    next(err);
  }
};

// @desc Add a new service
exports.create = async (req, res, next) => {
  try {
    const { name, description, category, price, icon } = req.body;
    const newService = await Service.create({ name, description, category, price, icon });
    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    next(err);
  }
};

// @desc Update a service
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ success: true, service: updated });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a service
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    next(err);
  }
};
