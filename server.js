const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/user-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@email.com';
const ADMIN_PASSWORD = 'Admin@123';

// Admin login route
app.post('/api/admin-login', (req, res) => {
  const { email, password } = req.body;
  console.log(`Admin login attempt with email: ${email} and password: ${password}`);
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.status(200).json({ message: 'Admin logged in' });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
});

// Admin authorization middleware
const adminAuth = (req, res, next) => {
  if (!req.headers['x-admin-auth'] || req.headers['x-admin-auth'] !== 'valid-admin-token') {
    return res.status(403).send('Not authorized');
  }
  next();
};

// Get users route (protected for admin)
app.get('/api/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
