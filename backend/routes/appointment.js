const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  doctorUsername: String,
  patientUsername: String,
  day: String,
  slots: [String],
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Appointment Route
router.post('/appointments', async (req, res) => {
  try {
    const { doctorUsername, patientUsername, day, slots } = req.body;

    // Create a new appointment
    const appointment = new Appointment({
      doctorUsername,
      patientUsername,
      day,
      slots,
    });

    // Save the appointment to the database
    await appointment.save();

    res.status(201).send('Appointment created successfully');
  } catch (error) {
    console.error('Error creating appointment', error);
    res.status(500).send('Failed to create appointment');
  }
});

module.exports = router;
