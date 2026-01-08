# Payroll System API Documentation

## Base URL
```
http://localhost:3000
```

## API Endpoints

### 1. Get All Employees
Returns a list of all employees (for dropdown selection).

**Endpoint:** `GET /employees`

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe"
  },
  {
    "id": 2,
    "name": "Jane Smith"
  }
]
```

**Example:**
```bash
curl http://localhost:3000/employees
```

---

### 2. Create Employee
Creates a new employee and returns their salary structure.

**Endpoint:** `POST /employee`

**Request Body:**
```json
{
  "name": "John Doe",
  "salary": 25000,
  "isPfEnabled": true,
  "dataset": 1
}
```

**Parameters:**
- `name` (string, required): Employee name
- `salary` (number, required): Monthly salary
- `isPfEnabled` (boolean, required): Whether PF should be deducted
- `dataset` (number, required): Dataset type (1, 2, or 3)

**Response:**
```json
{
  "id": 1,
  "employeeName": "John Doe",
  "salary": 25000,
  "isPfEnabled": true,
  "dataset": 1,
  "baseSalary": 7600,
  "hra": 3040,
  "ta": 760,
  "da": 1140,
  "pf": 2880,
  "pt": 200,
  "bonus": 2660,
  "netPay": 16800
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "salary": 25000,
    "isPfEnabled": true,
    "dataset": 1
  }'
```

---

### 3. Get Employee Salary Structure
Returns the salary structure for a specific employee.

**Endpoint:** `GET /employee/:empId`

**Parameters:**
- `empId` (number, required): Employee ID

**Response:**
```json
{
  "employeeName": "John Doe",
  "salary": 25000,
  "isPfEnabled": true,
  "dataset": 1,
  "baseSalary": 7600,
  "hra": 3040,
  "ta": 760,
  "da": 1140,
  "pf": 2880,
  "pt": 200,
  "bonus": 2660,
  "netPay": 16800
}
```

**Example:**
```bash
curl http://localhost:3000/employee/1
```

---

## Salary Calculation Logic

### Case 1: Salary > ₹30,000
- **No PF deduction**
- Base Salary = 40% of salary
- HRA = 40% of base salary
- TA = 10% of base salary
- DA = 15% of base salary
- Bonus = Salary - (Base + HRA + TA + DA)
- PT = ₹200
- **Net Pay = Salary - PT**

**Example (₹35,000):**
```
Base Salary = 35000 × 0.4 = 14000
HRA = 14000 × 0.4 = 5600
TA = 14000 × 0.1 = 1400
DA = 14000 × 0.15 = 2100
Bonus = 35000 - (14000 + 5600 + 1400 + 2100) = 11900
PT = 200
Net Pay = 35000 - 200 = 34800
```

---

### Case 2: Salary between ₹12,000 and ₹30,000

#### If PF Enabled:
- PF = 24% of salary (max ₹2,880)
- Salary after PF = Salary - PF
- Base Salary = 40% of (Salary after PF)
- HRA = 40% of base salary
- TA = 10% of base salary
- DA = 15% of base salary
- Bonus = (Salary after PF) - (Base + HRA + TA + DA)
- PT = ₹200
- **Net Pay = Salary after PF - PT**

**Example (₹25,000 with PF):**
```
PF = min(25000 × 0.24, 2880) = 2880
Salary after PF = 25000 - 2880 = 22120
Base Salary = 22120 × 0.4 = 8848
HRA = 8848 × 0.4 = 3539.2
TA = 8848 × 0.1 = 884.8
DA = 8848 × 0.15 = 1327.2
Bonus = 22120 - (8848 + 3539.2 + 884.8 + 1327.2) = 7520.8
PT = 200
Net Pay = 22120 - 200 = 21920
```

#### If PF Not Enabled:
- Base Salary = 40% of salary
- HRA = 40% of base salary
- TA = 10% of base salary
- DA = 15% of base salary
- Bonus = Salary - (Base + HRA + TA + DA)
- PT = ₹200
- **Net Pay = Salary - PT**

**Example (₹25,000 without PF):**
```
Base Salary = 25000 × 0.4 = 10000
HRA = 10000 × 0.4 = 4000
TA = 10000 × 0.1 = 1000
DA = 10000 × 0.15 = 1500
Bonus = 25000 - (10000 + 4000 + 1000 + 1500) = 8500
PT = 200
Net Pay = 25000 - 200 = 24800
```

---

### Case 3: Salary ≤ ₹12,000

#### If PF Enabled:
- PF = 24% of salary (max ₹2,880)
- **Net Pay = Salary - PF**
- No other deductions

**Example (₹10,000 with PF):**
```
PF = min(10000 × 0.24, 2880) = 2400
Net Pay = 10000 - 2400 = 7600
```

#### If PF Not Enabled:
- **Net Pay = Salary**
- No deductions

**Example (₹10,000 without PF):**
```
Net Pay = 10000
```

---

## Dataset Types

The `dataset` field represents different work timing patterns:

- **Dataset 1**: Regular 9-5 schedule
- **Dataset 2**: Flexible hours
- **Dataset 3**: Shift work

This field is stored for reference but doesn't affect salary calculation.

---

## Error Responses

### Employee Not Found
```json
{
  "statusCode": 500,
  "message": "Employee not found"
}
```

### Invalid Dataset
```json
{
  "statusCode": 400,
  "message": "Dataset must be between 1 and 3"
}
```

### Missing Required Fields
```json
{
  "statusCode": 400,
  "message": "Validation failed"
}
```

---

## Testing Examples

### Test Case 1: High Salary (> ₹30,000)
```bash
curl -X POST http://localhost:3000/employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Senior Manager",
    "salary": 50000,
    "isPfEnabled": true,
    "dataset": 1
  }'
```

Expected: No PF deduction, only PT deducted

---

### Test Case 2: Mid Salary with PF (₹12,000 - ₹30,000)
```bash
curl -X POST http://localhost:3000/employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mid Level",
    "salary": 20000,
    "isPfEnabled": true,
    "dataset": 2
  }'
```

Expected: PF = ₹2,880, PT = ₹200, full salary structure

---

### Test Case 3: Mid Salary without PF
```bash
curl -X POST http://localhost:3000/employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mid Level No PF",
    "salary": 20000,
    "isPfEnabled": false,
    "dataset": 2
  }'
```

Expected: No PF, only PT = ₹200, full salary structure

---

### Test Case 4: Low Salary with PF (≤ ₹12,000)
```bash
curl -X POST http://localhost:3000/employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Junior",
    "salary": 10000,
    "isPfEnabled": true,
    "dataset": 3
  }'
```

Expected: PF = ₹2,400, no other deductions

---

### Test Case 5: Low Salary without PF
```bash
curl -X POST http://localhost:3000/employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Intern",
    "salary": 8000,
    "isPfEnabled": false,
    "dataset": 1
  }'
```

Expected: No deductions, Net Pay = Salary
