// Import relevant packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getResponse } = require('./chat');

// Initialize Express server
const server = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_jwt_secret';

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));

// Handlers
const handleProfileHome = (req, res) => {
  res.send('Welcome to the Express server!');
};

const handleChatbotPredict = (req, res) => {
  const text = req.body.message;
  const response = getResponse(text);
  const message = { answer: response };
  res.json(message);
};

// Routes
server.get('/', handleProfileHome);
server.post('/predict', handleChatbotPredict);
server.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token, user: { id: user.id, username: user.username } });
});

// Error handler (optional for production)
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`);
});
