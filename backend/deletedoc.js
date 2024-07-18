require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', async () => {
  console.log('MongoDB database connection established successfully');

  try {
    const result = await connection.collection('doctorslots').deleteMany({});
    console.log(`${result.deletedCount} documents were deleted from the doctorslots collection.`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  } finally {
    mongoose.connection.close();
  }
});
