const express = require('express');
const router = express.Router();
const DoctorSlot = require('../models/DoctorSlot');
const Doctor = require('../models/Doctor');

// Fetch slots for a specific doctor by username
router.get('/:username/slots', async (req, res) => {
  try {
    const { username } = req.params;
    const slots = await DoctorSlot.findOne({ doctorusername: username });
    if (!slots) {
      return res.status(404).json({ success: false, message: 'Slots not found' });
    }
    res.json({ success: true, slots: slots.days });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching slots', error });
  }
});

router.post('/:doctorUsername/slots', async (req, res) => {
  try {
    const { doctorUsername } = req.params;
    const { day, slots } = req.body;
    const { user_id } = req.session.user;

    // Validate the user
    if (!user_id || user_id !== doctorUsername) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Check if doctorSlot exists
    let doctorSlot = await DoctorSlot.findOne({ doctorusername: user_id });

    // If not, initialize a new doctorSlot document
    if (!doctorSlot) {
      doctorSlot = new DoctorSlot({ doctorusername: user_id, days: {} });
    }

    // Ensure the day exists
    if (!doctorSlot.days[day]) {
      doctorSlot.days[day] = {};
    }

    // Update the time slots for the specified day
    for (const time in slots) {
      doctorSlot.days[day][time] = slots[time] || { patientid: [] };
    }

    // Save the updated document
    await doctorSlot.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating slots:', error);
    res.status(500).json({ success: false, message: 'Error updating slots', error });
  }
});

// Fetch the current user
router.get('/current-user', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const doctor = await Doctor.findOne({ user_id, password });
    if (doctor) {
      req.session.user = doctor;
      res.json({ success: true, doctor });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Fetch all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'name specialization experience username user_id');
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching doctors', error });
  }
});

// Fetch slots for a specific doctor by day
router.get('/slots/:day', async (req, res) => {
  try {
    const { day } = req.params;
    const { user_id } = req.session.user;
    const doctorSlot = await DoctorSlot.findOne({ doctorusername: user_id });
    if (!doctorSlot) {
      return res.status(404).json({ success: false, message: 'Slots not found' });
    }
    res.json({ success: true, slots: doctorSlot.days[day] });
  } catch (error) {
    res.status (500).json({ success: false, message: 'Error fetching slots', error });
  }
});

// Delete a specific slot
router.delete('/slots/:day/:time', async (req, res) => {
  try {
    const { day, time } = req.params;
    const user_id = req.session.user.user_id;

    if (!user_id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const doctorSlot = await DoctorSlot.findOne({ doctorusername: user_id });

    if (!doctorSlot || !doctorSlot.days[day] || !doctorSlot.days[day][time]) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }

    delete doctorSlot.days[day][time];

    await doctorSlot.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting slot', error });
  }
});

module.exports = router;
