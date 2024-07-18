const express = require('express');
const router = express.Router();
let Doctor = require('../models/Doctor');

// Login route
router.post('/login', (req, res) => {
  const { user_id, password } = req.body;
  Doctor.findOne({ user_id, password })
    .then(doctor => {
      if (doctor) {
        req.session.user = { id: doctor.user_id, role: 'doctor' }; // Save user data in session
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get('/check', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
module.exports = router;


