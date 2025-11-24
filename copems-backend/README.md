# COPEMS Backend Setup Instructions

## Prerequisites

- Node.js (version 14 or higher)
- MySQL/MariaDB database
- phpMyAdmin or MySQL Workbench

## Setup Steps

### 1. Database Setup

1. Open phpMyAdmin or your MySQL client
2. Run the SQL from `/backend/database/schema_update.sql` to create/update your database schema
3. Make sure your database is named `copems`

### 2. Backend Installation

1. Open terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd "C:\Users\ja\Documents\Capstone\backend"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### 3. Environment Configuration

1. Update the `.env` file in the backend folder with your database credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=copems
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   ```

### 4. Start Backend Server

```bash
npm run dev
```

The server will start on http://localhost:4000

### 5. Frontend EmailJS Configuration

1. Update `/copems/src/config/email.js` with your actual EmailJS credentials:
   ```javascript
   export const EMAIL_CONFIG = {
     PUBLIC_KEY: "your_actual_public_key",
     SERVICE_ID: "service_yhi7znt",
     TEMPLATE_ID: "template_c0p808c",
   };
   ```

### 6. Test the System

1. Make sure both frontend and backend are running
2. Try registering a new user
3. Check your email for confirmation link
4. Click the link to verify your account
5. Login with verified account

## API Endpoints

- `POST /api/user/register` - Register new user
- `POST /api/user/verify-email` - Verify email with token
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile (protected)
- `GET /api/health` - Health check

## Troubleshooting

1. **Database connection issues**: Check your MySQL service is running and credentials are correct
2. **Email not sending**: Verify EmailJS configuration and credentials
3. **CORS errors**: Make sure backend CORS_ORIGIN matches your frontend URL
4. **Token errors**: Ensure JWT_SECRET is set in .env file
