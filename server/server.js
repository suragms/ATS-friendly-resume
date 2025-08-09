const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here_change_in_production';
const PORT = process.env.PORT || 3001;

// In-memory storage (replace with database in production)
const users = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Sign up endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      avatar: null,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    
    console.log(`New user registered: ${email}`);
    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Sign in endpoint
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    
    console.log(`User signed in: ${email}`);
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error during signin' });
  }
});

// Get current user endpoint
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { password: _, ...userData } = user;
    res.json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign out endpoint
app.post('/api/auth/signout', (req, res) => {
  // In a real app, you might want to blacklist the token
  // For now, we'll just return success
  res.json({ message: 'Signed out successfully' });
});

// Google OAuth endpoint (placeholder)
app.get('/api/auth/google', (req, res) => {
  res.json({ 
    message: 'Google OAuth not implemented yet',
    authUrl: 'https://accounts.google.com/oauth/authorize?client_id=your_client_id&redirect_uri=your_redirect_uri&scope=email profile&response_type=code'
  });
});

// Refresh token endpoint
app.post('/api/auth/refresh', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate new token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Resume endpoints (placeholder)
app.get('/api/resumes', authenticateToken, (req, res) => {
  res.json({ resumes: [] });
});

app.post('/api/resumes', authenticateToken, (req, res) => {
  res.json({ message: 'Resume creation not implemented yet' });
});

// User profile endpoints (placeholder)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password: _, ...userData } = user;
  res.json({ user: userData });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST /api/auth/signup - Register new user`);
  console.log(`   POST /api/auth/signin - Sign in user`);
  console.log(`   GET  /api/auth/me - Get current user`);
  console.log(`   POST /api/auth/signout - Sign out user`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`\n🔧 Make sure your frontend is configured to use: http://localhost:${PORT}/api`);
}); 