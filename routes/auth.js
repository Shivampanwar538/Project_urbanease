const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
  return register(req, res, next);
});

router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
