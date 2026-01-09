// Constants
const MAX_PF = 2880;
const PT_AMOUNT = 200;
const PF_PERCENTAGE = 0.24;
const BASE_PERCENTAGE = 0.40;
const HRA_PERCENTAGE = 0.40;
const TA_PERCENTAGE = 0.10;
const DA_PERCENTAGE = 0.15;

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

/**
 * Calculate salary structure based on salary amount and PF status
 * 
 * Rules:
 * 1. Salary > 30000: No PF, PT deducted first
 * 2. Salary 12000-30000: PF + PT deducted first, then structure calculated
 * 3. Salary <= 12000: Only PF (if enabled), no PT, no structure
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

  if (salary > 30000) {
    // High salary: No PF, PT deducted first
    pt = PT_AMOUNT;
    const remaining = salary - pt;
    
    baseSalary = remaining * BASE_PERCENTAGE;
    hra = baseSalary * HRA_PERCENTAGE;
    ta = baseSalary * TA_PERCENTAGE;
    da = baseSalary * DA_PERCENTAGE;
    bonus = remaining - (baseSalary + hra + ta + da);
    netPay = remaining;
  } 
  else if (salary >= 12000) {
    // Mid salary: PF + PT deducted first
    if (isPfEnabled) {
      pf = Math.min(salary * PF_PERCENTAGE, MAX_PF);
    }
    pt = PT_AMOUNT;
    
    const remaining = salary - pf - pt;
    baseSalary = remaining * BASE_PERCENTAGE;
    hra = baseSalary * HRA_PERCENTAGE;
    ta = baseSalary * TA_PERCENTAGE;
    da = baseSalary * DA_PERCENTAGE;
    bonus = remaining - (baseSalary + hra + ta + da);
    netPay = remaining;
  } 
  else {
    // Low salary: Only PF (if enabled)
    if (isPfEnabled) {
      pf = Math.min(salary * PF_PERCENTAGE, MAX_PF);
      netPay = salary - pf;
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
