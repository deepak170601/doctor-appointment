const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true
  },
  doctorname: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('History', historySchema);
