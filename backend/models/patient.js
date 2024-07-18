const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  user_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
