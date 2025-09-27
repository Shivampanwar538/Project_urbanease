const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../controllers/serviceController');

// GET all services
router.get('/', getAll);

// GET single service by ID
router.get('/:id', getById);

// POST create a new service
router.post('/', create);

// PUT update service by ID
router.put('/:id', update);

// DELETE service by ID
router.delete('/:id', remove);

module.exports = router;
