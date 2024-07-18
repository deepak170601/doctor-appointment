const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// Patient login route
router.post('/login', (req, res) => {
  const { user_id, password } = req.body;

  Patient.findOne({ user_id, password })
    .then(patient => {
      if (patient) {
        req.session.user = { id: patient.user_id, role: 'patient' };
        res.json({ success: true, user: patient });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to fetch patient details by user_id
router.get('/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  Patient.findOne({ user_id })
    .then(patient => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(patient);
    })
    .catch(err => res.status(500).json({ error: 'Server error', details: err }));
});

module.exports = router;
