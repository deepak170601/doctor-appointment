const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  patientid: [String]
});

const daySchema = new mongoose.Schema({
  "9AM": slotSchema,
  "10AM": slotSchema,
  "11AM": slotSchema,
  "12PM": slotSchema,
  "1PM": slotSchema,
  "2PM": slotSchema,
  "3PM": slotSchema,
  "4PM": slotSchema,
  "5PM": slotSchema,
  "6PM": slotSchema
});

const doctorSlotSchema = new mongoose.Schema({
  doctorusername: {
    type: String,
    required: true
  },
  days: {
    Monday: daySchema,
    Tuesday: daySchema,
    Wednesday: daySchema,
    Thursday: daySchema,
    Friday: daySchema,
    Saturday: daySchema
  }
}, { timestamps: true });

module.exports = mongoose.model('DoctorSlot', doctorSlotSchema);
