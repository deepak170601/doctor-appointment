require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const History = require('./models/History'); // Adjust the path to your History model if necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');

  const patients = ['diva123', 'nivas123', 'deepak69'];
  const doctorNames = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Jones'];
  const dates = [
    new Date('2023-01-01'), new Date('2023-01-02'), new Date('2023-01-03'), 
    new Date('2023-01-04'), new Date('2023-01-05'), new Date('2023-01-06'),
    new Date('2023-01-07'), new Date('2023-01-08'), new Date('2023-01-09'), 
    new Date('2023-01-10'), new Date('2023-01-11'), new Date('2023-01-12'),
    new Date('2023-01-13'), new Date('2023-01-14'), new Date('2023-01-15'), 
    new Date('2023-01-16'), new Date('2023-01-17'), new Date('2023-01-18'),
    new Date('2023-01-19'), new Date('2023-01-20')
  ];

  const historyData = [];

  for (let i = 0; i < 20; i++) {
    const patient_id = patients[i % patients.length];
    const doctorname = doctorNames[i % doctorNames.length];
    const date = dates[i % dates.length];
    historyData.push({ patient_id, doctorname, date });
  }

  History.insertMany(historyData)
    .then(() => {
      console.log('Inserted 20 history records');
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error inserting history records', error);
      mongoose.connection.close();
    });

}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});
