# API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Create Employee

Creates a new employee in the system.

**Endpoint**: `POST /payroll/employee`

**Request Body**:
```json
{
  "name": "string",
  "salary": number,
  "isPfApplicable": boolean
}
```

**Example Request**:
```json
{
  "name": "Alice Smith",
  "salary": 30000,
  "isPfApplicable": true
}
```

**Response** (201 Created):
```json
{
  "id": 1,
  "name": "Alice Smith",
  "salary": "30000.00",
  "is_pf_applicable": true
}
```

**Business Rules**:
- If salary < 12000: Treated as STIPEND (no deductions)
- If salary >= 12000: Treated as SALARY (with structure)
- PF applicable only if isPfApplicable is true

---

### 2. Insert Time Logs

Inserts 30 days of time log data for an employee based on a dataset pattern.

**Endpoint**: `POST /payroll/time-logs/:employeeId`

**Path Parameters**:
- `employeeId` (number): Employee ID

**Request Body**:
```json
{
  "dataset": number
}
```

**Dataset Options**:
- `1`: Break every 45 minutes for 3 minutes (~8.5 hours/day)
- `2`: Break every 2 hours for 5 minutes (~8 hours/day)
- `3`: Random breaks, total working time > 8 hours
- `4`: Random breaks, total working time < 8 hours

**Example Request**:
```json
{
  "dataset": 1
}
```

**Response** (201 Created):
```json
{
  "inserted": 330,
  "dataset": 1
}
```

**Notes**:
- Generates time logs for 30 consecutive days starting from 2026-01-01
- Office timing: 10:00 AM - 7:00 PM
- No continuous working period > 2 hours

---

### 3. Generate Salary Slip

Generates a detailed salary slip for an employee for a specific month.

**Endpoint**: `GET /payroll/salary-slip/:employeeId`

**Path Parameters**:
- `employeeId` (number): Employee ID

**Query Parameters**:
- `month` (number): Month (1-12)
- `year` (number): Year (e.g., 2026)

**Example Request**:
```
GET /payroll/salary-slip/1?month=1&year=2026
```

**Response** (200 OK):

**For STIPEND (salary < 12000)**:
```json
{
  "employeeName": "Bob Johnson",
  "grossSalary": 10000,
  "salaryType": "STIPEND",
  "baseSalary": 0,
  "hra": 0,
  "ta": 0,
  "da": 0,
  "pf": 0,
  "professionalTax": 0,
  "bonus": 0,
  "leaveDeduction": 0,
  "netPay": 10000,
  "workedDays": 30,
  "totalLeaves": 0,
  "unpaidLeaves": 0
}
```

**For SALARY (salary >= 12000, PF enabled)**:
```json
{
  "employeeName": "Alice Smith",
  "grossSalary": 30000,
  "salaryType": "SALARY",
  "baseSalary": 8920,
  "hra": 3568,
  "ta": 892,
  "da": 1338,
  "pf": 2880,
  "professionalTax": 200,
  "bonus": 2122,
  "leaveDeduction": 0,
  "netPay": 16840,
  "workedDays": 30,
  "totalLeaves": 0,
  "unpaidLeaves": 0
}
```

**For SALARY (salary >= 12000, PF disabled)**:
```json
{
  "employeeName": "Charlie Brown",
  "grossSalary": 30000,
  "salaryType": "SALARY",
  "baseSalary": 12000,
  "hra": 4800,
  "ta": 1200,
  "da": 1800,
  "pf": 0,
  "professionalTax": 0,
  "bonus": 4200,
  "leaveDeduction": 0,
  "netPay": 24000,
  "workedDays": 30,
  "totalLeaves": 0,
  "unpaidLeaves": 0
}
```

**With Leave Deductions**:
```json
{
  "employeeName": "Alice Smith",
  "grossSalary": 30000,
  "salaryType": "SALARY",
  "baseSalary": 8653.33,
  "hra": 3461.33,
  "ta": 865.33,
  "da": 1298,
  "pf": 2880,
  "professionalTax": 200,
  "bonus": 2028.67,
  "leaveDeduction": 2000,
  "netPay": 16306.66,
  "workedDays": 28,
  "totalLeaves": 4,
  "unpaidLeaves": 2
}
```

---

## Business Logic Details

### Salary Type Classification
- **STIPEND**: salary < 12000
  - No deductions
  - Net pay = gross salary
- **SALARY**: salary >= 12000
  - Full salary structure applies

### Salary Structure (for SALARY type)
1. **Base Salary** = 40% of total salary
2. **HRA** = 40% of base salary
3. **TA** = 10% of base salary
4. **DA** = 15% of base salary
5. **Bonus** = Base Salary - (HRA + TA + DA)

### PF Deductions (if applicable)
- **PF** = ₹2,880 (fixed)
- **Professional Tax** = ₹200 (fixed)
- Deducted from BASE SALARY before calculating HRA, TA, DA

### Attendance Rules
- **Full Day**: Worked >= 6.5 hours
- **Half Day**: Worked >= 5 hours and < 6.5 hours
- **Leave**: Worked < 5 hours

### Leave Policy
- **Paid Leaves**: 2 days per 30-day cycle
- **Unpaid Leaves**: Any leaves beyond 2
- **Per Day Salary** = Monthly Salary / 30
- **Leave Deduction** = Unpaid Leaves × Per Day Salary
- Leave deduction applied BEFORE salary structure calculation

### Calculation Order
1. Calculate unpaid leaves
2. Apply leave deduction to gross salary
3. Calculate base salary (40% of remaining)
4. Deduct PF and Professional Tax (if applicable)
5. Calculate HRA, TA, DA from adjusted base
6. Calculate bonus
7. Sum all components for net pay

---

## Error Responses

**400 Bad Request**:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

**404 Not Found**:
```json
{
  "statusCode": 404,
  "message": "Employee not found",
  "error": "Not Found"
}
```

**500 Internal Server Error**:
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## SQL Query Optimization

The salary slip generation uses a single optimized SQL query with:
- **CTEs** (Common Table Expressions) for configuration and calculations
- **JOINs** for combining employee and attendance data
- **Aggregations** for calculating daily hours and attendance summary
- **EXTRACT(EPOCH)** for precise time calculations

This approach minimizes database round-trips and performs calculations at the database level for optimal performance.
