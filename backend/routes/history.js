const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Route to get history for a specific patient
router.get('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;
    const history = await History.find({ patient_id });
    res.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching history', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;
