# Employee Payroll System - Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v14 or higher)
3. **npm** or **yarn**

## Database Setup

### Step 1: Install PostgreSQL

If you don't have PostgreSQL installed:
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### Step 2: Create Database

Open PostgreSQL command line (psql) or use pgAdmin:

```sql
CREATE DATABASE payroll_db;
```

### Step 3: Run Schema Script

Connect to the database and run the schema file:

```bash
psql -U postgres -d payroll_db -f database-schema.sql
```

Or copy the contents of `database-schema.sql` and execute in pgAdmin or psql.

## Backend Setup

### Step 1: Install Dependencies

```bash
cd Backend
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the Backend folder:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payroll_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
PORT=3000
```

### Step 3: Start Backend Server

```bash
npm run start:dev
```

The backend will run on `http://localhost:3000`

## Frontend Setup

### Step 1: Install Dependencies

```bash
cd Frontend
npm install
```

### Step 2: Start Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing the Application

### 1. Create an Employee

**API Endpoint**: `POST http://localhost:3000/payroll/employee`

**Request Body**:
```json
{
  "name": "John Doe",
  "salary": 25000,
  "isPfApplicable": true
}
```

**Response**:
```json
{
  "id": 1,
  "name": "John Doe",
  "salary": "25000.00",
  "is_pf_applicable": true
}
```

### 2. Insert Time Logs

**API Endpoint**: `POST http://localhost:3000/payroll/time-logs/:employeeId`

**Request Body**:
```json
{
  "dataset": 1
}
```

Dataset options:
- `1`: Break every 45 minutes (3 min break) - ~8.5 hours/day
- `2`: Break every 2 hours (5 min break) - ~8 hours/day
- `3`: Random breaks, >8 hours work
- `4`: Random breaks, <8 hours work

**Response**:
```json
{
  "inserted": 330,
  "dataset": 1
}
```

### 3. Generate Salary Slip

**API Endpoint**: `GET http://localhost:3000/payroll/salary-slip/:employeeId?month=1&year=2026`

**Response**:
```json
{
  "employeeName": "John Doe",
  "grossSalary": 25000,
  "salaryType": "SALARY",
  "baseSalary": 6840,
  "hra": 2736,
  "ta": 684,
  "da": 1026,
  "pf": 2880,
  "professionalTax": 200,
  "bonus": 1394,
  "leaveDeduction": 0,
  "netPay": 13680,
  "workedDays": 30,
  "totalLeaves": 0,
  "unpaidLeaves": 0
}
```

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running:
   ```bash
   # Windows
   pg_ctl status
   
   # Mac/Linux
   sudo service postgresql status
   ```

2. Check credentials in `.env` file

3. Ensure database exists:
   ```bash
   psql -U postgres -l
   ```

### Port Already in Use

If port 3000 is already in use, change the PORT in `.env`:
```env
PORT=3001
```

And update the API_URL in Frontend components.

## Project Structure

```
Backend/
├── src/
│   ├── database/
│   │   └── db.service.ts          # PostgreSQL connection pool
│   ├── payroll/
│   │   ├── payroll.controller.ts  # API endpoints
│   │   ├── payroll.service.ts     # Business logic
│   │   ├── payroll.module.ts      # Module definition
│   │   └── salary-calculator.ts   # Salary calculation logic
│   ├── app.module.ts
│   └── main.ts
├── database-schema.sql             # Database schema
├── sample-data.sql                 # Sample data reference
└── .env.example                    # Environment template

Frontend/
├── src/
│   ├── components/
│   │   ├── EmployeeForm.tsx       # Create employee
│   │   ├── TimeLogForm.tsx        # Add time logs
│   │   └── SalarySlip.tsx         # Generate salary slip
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
```

## Next Steps

1. Test with different salary amounts (< 12000 for stipend, >= 12000 for salary)
2. Test with PF enabled and disabled
3. Try different time log datasets
4. Generate salary slips for different months
