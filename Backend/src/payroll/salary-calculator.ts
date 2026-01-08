export interface SalaryBreakdown {
  employeeName: string;
  salary: number;
  isPfEnabled: boolean;
  baseSalary: number;
  hra: number;
  ta: number;
  da: number;
  pf: number;
  pt: number;
  bonus: number;
  netPay: number;
}

const MAX_PF = 2880;
const PT_AMOUNT = 200;

/**
 * Simplified Salary Calculation Logic:
 * 
 * 1. Salary > 30000: No PF deduction
 * 2. Salary between 12000-30000: 
 *    - If isPfEnabled: Deduct 24% as PF (max 2880)
 *    - Calculate on remaining: Base=40%, HRA=40% of base, TA=10% of base, DA=15% of base
 *    - Bonus = Salary - (Base + HRA + TA + DA)
 *    - Deduct PT = 200
 * 3. Salary <= 12000:
 *    - If isPfEnabled: Deduct 24% as PF (max 2880)
 *    - No other deductions
 */
export function calculateSalaryStructure(
  employeeName: string,
  salary: number,
  isPfEnabled: boolean,
): SalaryBreakdown {
  let pf = 0;
  let pt = 0;
  let baseSalary = 0;
  let hra = 0;
  let ta = 0;
  let da = 0;
  let bonus = 0;
  let netPay = salary;

  // Case 1: Salary > 30000 - No PF deduction
  if (salary > 30000) {
    baseSalary = salary * 0.4;
    hra = baseSalary * 0.4;
    ta = baseSalary * 0.1;
    da = baseSalary * 0.15;
    bonus = salary - (baseSalary + hra + ta + da);
    pt = PT_AMOUNT;
    netPay = salary - pt;
  }
  // Case 2: Salary between 12000 and 30000
  else if (salary >= 12000 && salary <= 30000) {
    if (isPfEnabled) {
      pf = Math.min(salary * 0.24, MAX_PF);
      const salaryAfterPf = salary - pf;
      baseSalary = salaryAfterPf * 0.4;
      hra = baseSalary * 0.4;
      ta = baseSalary * 0.1;
      da = baseSalary * 0.15;
      bonus = salaryAfterPf - (baseSalary + hra + ta + da);
      pt = PT_AMOUNT;
      netPay = salaryAfterPf - pt;
    } else {
      baseSalary = salary * 0.4;
      hra = baseSalary * 0.4;
      ta = baseSalary * 0.1;
      da = baseSalary * 0.15;
      bonus = salary - (baseSalary + hra + ta + da);
      pt = PT_AMOUNT;
      netPay = salary - pt;
    }
  }
  // Case 3: Salary <= 12000
  else {
    if (isPfEnabled) {
      pf = Math.min(salary * 0.24, MAX_PF);
      netPay = salary - pf;
    } else {
      netPay = salary;
    }
  }

  return {
    employeeName,
    salary,
    isPfEnabled,
    baseSalary: parseFloat(baseSalary.toFixed(2)),
    hra: parseFloat(hra.toFixed(2)),
    ta: parseFloat(ta.toFixed(2)),
    da: parseFloat(da.toFixed(2)),
    pf: parseFloat(pf.toFixed(2)),
    pt: parseFloat(pt.toFixed(2)),
    bonus: parseFloat(bonus.toFixed(2)),
    netPay: parseFloat(netPay.toFixed(2)),
  };
}
