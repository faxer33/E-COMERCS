// routes/auth.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ sub: req.user._id }, 'your-secret-key'); // Replace with your secret key
  res.cookie('your-cookie-name', token, { httpOnly: true });
  res.json({ token });
});

router.get('/logout', (req, res) => {
  res.clearCookie('your-cookie-name');
  res.send('Logged out successfully');
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
