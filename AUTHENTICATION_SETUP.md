# Authentication Setup Guide

This guide will help you set up the authentication system for your ResumeAI application.

## What's Been Implemented

✅ **Frontend Authentication System**
- Complete sign-in/sign-up forms with validation
- Password visibility toggles
- Form validation using Zod
- Authentication state management with React Context
- User profile dropdown in navigation
- Protected routes and authentication guards
- API service layer with axios interceptors

## Backend API Requirements

Your backend needs to implement these endpoints:

### Authentication Endpoints

```
POST /api/auth/signin
POST /api/auth/signup
POST /api/auth/signout
GET /api/auth/me
GET /api/auth/google
POST /api/auth/refresh
```

### Expected Request/Response Formats

#### Sign In
```typescript
// Request
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### Sign Up
```typescript
// Request
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### Get Current User
```typescript
// Request
GET /api/auth/me
Authorization: Bearer <token>

// Response
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

## Environment Variables

Create a `.env` file in your project root:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Google OAuth (if using Google Sign-In)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Other configuration
VITE_APP_NAME=ResumeAI
VITE_APP_VERSION=1.0.0
```

## Quick Backend Setup (Node.js/Express Example)

Here's a minimal Express.js backend setup:

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret_here';
const users = []; // In production, use a database

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Sign up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      avatar: null
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign in
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password: _, ...userData } = user;
  res.json({ user: userData });
});

// Sign out
app.post('/api/auth/signout', (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({ message: 'Signed out successfully' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## Testing the Authentication

1. Start your backend server
2. Set the `VITE_API_URL` environment variable
3. Run your frontend application
4. Try signing up with a new account
5. Try signing in with the created account
6. Check that the user profile appears in the navigation

## Features Included

- ✅ Form validation with error messages
- ✅ Password visibility toggles
- ✅ Loading states during authentication
- ✅ Toast notifications for success/error
- ✅ Automatic token management
- ✅ User profile dropdown
- ✅ Sign out functionality
- ✅ Protected route handling
- ✅ Google OAuth integration (frontend ready)

## Next Steps

1. Set up your backend API with the required endpoints
2. Configure environment variables
3. Test the authentication flow
4. Add additional security features (rate limiting, password reset, etc.)
5. Implement Google OAuth on the backend if needed

The authentication system is now fully functional on the frontend and ready to connect to your backend API! 