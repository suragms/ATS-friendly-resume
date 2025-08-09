# ResumeAI Backend Server

This is a simple Express.js backend server for the ResumeAI authentication system.

## Quick Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create environment file:**
   Create a `.env` file in the server directory with:
   ```env
   PORT=3001
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Sign in user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/signout` - Sign out user
- `POST /api/auth/refresh` - Refresh token (requires auth)

### Health Check
- `GET /api/health` - Server health check

## Testing

Once the server is running, you can test the endpoints:

1. **Health check:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Sign up:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Sign in:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

## Frontend Integration

Make sure your frontend is configured to use the correct API URL:

```env
VITE_API_URL=http://localhost:3001/api
```

## Notes

- This server uses in-memory storage for users (data is lost on restart)
- In production, replace with a proper database
- JWT tokens expire after 7 days
- CORS is configured for `http://localhost:5173` (Vite default) 