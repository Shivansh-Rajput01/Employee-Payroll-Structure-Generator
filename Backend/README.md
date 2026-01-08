# Employee Payroll System - Backend

A simplified payroll system backend with 3 REST APIs for employee management and salary calculation.

## Quick Start

### 1. Setup Database
```bash
psql -U postgres
CREATE DATABASE payroll_db;
\q

psql -U postgres -d payroll_db -f database-schema.sql
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 3. Install & Run
```bash
npm install
npm run start:dev
```

Server runs on: `http://localhost:3000`

## API Endpoints

### 1. GET /employees
Get all employees for dropdown selection.

### 2. POST /employee
Create employee with salary calculation.

**Body:**
```json
{
  "name": "John Doe",
  "salary": 25000,
  "isPfEnabled": true,
  "dataset": 1
}
```

### 3. GET /employee/:empId
Get employee salary structure.

See [API-DOCS.md](./API-DOCS.md) for complete documentation.

## Salary Calculation Rules

### Salary > ₹30,000
- No PF deduction
- Full salary structure (Base, HRA, TA, DA, Bonus)
- PT = ₹200

### Salary ₹12,000 - ₹30,000
- If PF enabled: 24% PF (max ₹2,880)
- Full salary structure on remaining amount
- PT = ₹200

### Salary ≤ ₹12,000
- If PF enabled: 24% PF (max ₹2,880)
- No other deductions

## Dataset Types
- Dataset 1: Regular schedule
- Dataset 2: Flexible hours
- Dataset 3: Shift work

## Tech Stack
- NestJS
- TypeScript
- PostgreSQL
- Raw SQL (no ORM)
