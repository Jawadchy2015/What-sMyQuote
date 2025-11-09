const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
// Load environment variables (like your DB string)
dotenv.config();

const app = express()
const port = 3000

// Model calls
const Phone = require('./models/Phone');
const Plan = require('./models/Plan');

// import functions
const { sendWelcomeEmail } = require('./public/scripts/login_signup/success_email');

// --- 1. NEW: Add Middleware to parse JSON bodies ---
// This is crucial for your API to read {email, password}
app.use(express.json());

// --- 2. NEW: Connect to MongoDB ---
// Make sure you have a MONGODB_URI in a .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB 🍃'))
    .catch(err => console.error('MongoDB connection error:', err));

// This middleware tells Express to look for files (like index.html) 
// inside the 'public' folder and serve them directly.
app.use(express.static('public'));

// Note: The app.get('/') route is no longer needed because 
// Express.static will automatically serve public/index.html 
// when the user navigates to the root URL.

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

// ===================================
// API ENDPOINTS FOR AUTHENTICATION
// ===================================

// --- SIGNUP / REGISTER ROUTE ---
app.post('/api/signup', async (req, res) => {
    try {

		console.log("CREATING")
        // 1. Get user data from the request body
        const { username, email, password } = req.body;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create the new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword // Store the hashed password
        });

        // 5. Save the user to the database
        await newUser.save();

        // send welcome email
        sendWelcomeEmail(email, username);
        // 6. Send a success response
        res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// --- LOGIN ROUTE ---
app.post('/api/login', async (req, res) => {
    try {
        // 1. Get user data from request body
        const { email, password } = req.body;

        // 2. Find the user in the database
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // 3. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // 4. Passwords match! Create a JSON Web Token (JWT)
        const payload = {
            user: {
                id: user.id, // This is the user's ID from MongoDB
                email: user.email
            }
        };

        // Sign the token with a secret key (from your .env file)
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Add JWT_SECRET=yourrandomsecretkey to your .env file
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                // 5. Send the token back to the client
                res.status(200).json({ token: token });
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// fetch phones
app.get('/api/phones', async (req, res) => {
    try {
        const phones = await Phone.find({}); // Fetches all phones
        // console.log(phones)
        res.json(phones);
    } catch (error) {
        console.error('Error fetching phones:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// fetch plans
app.get('/api/plans', async (req, res) => {
    try {
        // Find the single document that contains all plan data
        const planData = await Plan.findOne({});
        console.log(planData)
        
        if (!planData) {
            return res.status(404).json({ error: 'Plan data not found.' });
        }
        
        res.json(planData);
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({ error: 'Failed to fetch plan data' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
