const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const DoctorSlot = require('./models/DoctorSlot');
const historyRoutes = require('./routes/history'); // Adjust path if necessary

// Other middleware and route setups

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false },
  })
);

// Routes
const doctorRouter = require('./routes/doctor');
const patientRouter = require('./routes/patient');
app.use('/api/history', historyRoutes);

app.use('/api/patient', patientRouter);
app.use('/api/doctors', doctorRouter);

app.get('/api/doctors/slots', async (req, res) => {
  try {
    const doctors = await DoctorSlot.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching all doctor slots', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to fetch patient appointments
app.get('/api/patient/:user_id/appointments', async (req, res) => {
  const { user_id } = req.params;

  try {
    const doctorSlots = await DoctorSlot.find({ "days.9AM.patientid": user_id }); // Adjust the query if necessary
    let appointments = [];

    doctorSlots.forEach(docSlot => {
      for (const [day, slots] of Object.entries(docSlot.days)) {
        for (const [time, slot] of Object.entries(slots)) {
          if (slot.patientid.includes(user_id)) {
            appointments.push({
              doctorUsername: docSlot.doctorusername, // Fix the key to match the schema
              day,
              slot: time,
            });
          }
        }
      }
    });

    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching patient appointments', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to book appointment
app.post('/api/patient/book-appointment', async (req, res) => {
  const { doctorUsername, day, slot, patientUsername } = req.body;

  try {
    const doctorSlot = await DoctorSlot.findOne({ doctorusername: doctorUsername }); // Fix the key to match the schema

    if (!doctorSlot) {
      return res.status(404).json({ error: 'Doctor slots not found' });
    }

    if (doctorSlot.days[day][slot].patientid.includes(patientUsername)) {
      return res.status(400).json({ error: 'Slot already booked' });
    }

    doctorSlot.days[day][slot].patientid.push(patientUsername);
    await doctorSlot.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error booking appointment', error);
    res.status(500).json({ error: 'Server error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
