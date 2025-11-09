// Loads all variables from .env into process.env
const path = require('path'); // <-- ADD THIS LINE

// --- UPDATED LINE ---
// Explicitly tell dotenv to load the .env file from the project root (2 directories up)
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const Phone = require('../../models/Phone'); // Your phone model
const phoneData = require('../data/phone.json'); // The 30 examples

// Reads the connection string from your .env file
const MONGO_URI = process.env.MONGODB_URI;

// Check if MONGO_URI is loaded
if (!MONGO_URI) {
  console.error('Error: MONGODB_URI is not set in your .env file.');
  console.log('Please make sure your .env file is in the root directory and contains MONGODB_URI=your-connection-string');
  process.exit(1); // Exit the script if DB connection string is missing
}

// --- ADJUST YOUR 'Phone' MODEL PATH ---
// The old script used require('./models/Phone'), but your models folder
// is probably at the root. You may need to change line 9 to:
// const Phone = require('../../models/Phone'); 
// OR
// const Phone = require(path.resolve(__dirname, '../../models/Phone'));


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected successfully.');
    // Call the function to insert data
    seedDatabase(); 
})
.catch(err => {
    console.error('MongoDB Connection Error:', err);
});


// --- FUNCTION TO SEED THE DATABASE ---
async function seedDatabase() {
  try {
    // 1. We are NOT clearing the database.
    // The line below is intentionally commented out to add to existing data.
    // await Phone.deleteMany({});

    // 2. Insert the new data
    console.log('Inserting 30 new phone documents...');
    // insertMany will add all 30 documents from the json file
    await Phone.insertMany(phoneData);
    
    console.log('Database has been successfully updated with 30 new phones!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // 3. Close the connection
    // This is important for a standalone script so it doesn't hang.
    console.log('Closing database connection.');
    mongoose.connection.close();
  }
}