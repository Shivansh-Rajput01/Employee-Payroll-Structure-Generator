# Railway Deployment Guide

## Steps to Fix Your Deployment

### 1. Add PostgreSQL Database to Railway

1. Go to your Railway project dashboard
2. Click **"New"** → **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically provision a PostgreSQL database

### 2. Verify Environment Variables

Railway automatically sets `DATABASE_URL` when you add PostgreSQL. Verify in your Railway project settings:

- Go to your backend service
- Click on **"Variables"** tab
- You should see `DATABASE_URL` (automatically added by Railway)
- Optionally verify `PORT` is set (Railway usually auto-detects from your code)

### 3. Redeploy Your Application

After adding the database:
1. Push your updated code to your repository
2. Railway will automatically redeploy
3. Or manually trigger a redeploy from Railway dashboard

### 4. Test Your API

Once deployed, test your endpoint:

```bash
POST https://employee-payroll-structure-generator-production.up.railway.app/employee
Content-Type: application/json

{
  "name": "John Doe",
  "salary": 25000,
  "isPfEnabled": true
}
```

### 5. Check Logs

If you still face issues, check Railway logs:
1. Go to your Railway project
2. Click on your backend service
3. Click on **"Deployments"** tab
4. Click on the latest deployment
5. View logs to see connection status and any errors

You should see:
- "Connecting to database using DATABASE_URL..."
- "Database connection successful!"
- "Application is running on: ..."

## What Was Changed

The database service now:
- Uses `DATABASE_URL` connection string (Railway's default)
- Falls back to individual env variables for local development
- Includes SSL configuration for Railway PostgreSQL
- Has better error logging for debugging
- Tests the connection on startup

## Local Development

Your local `.env` file still works as before. The code automatically detects whether to use `DATABASE_URL` (Railway) or individual variables (local).
