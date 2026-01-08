// Quick test file to verify salary calculations
// Run with: npx ts-node test-salary-calculations.ts

import { calculateSalaryStructure } from './src/payroll/salary-calculator';

console.log('=== Testing Salary Calculations ===\n');

// Test Case 1: Salary > 30000 (No PF)
console.log('Test 1: Salary ₹50,000 (> ₹30,000)');
const test1 = calculateSalaryStructure('Senior Manager', 50000, true);
console.log(test1);
console.log('Expected: No PF, PT = 200, Net Pay = 49800');
console.log('Actual Net Pay:', test1.netPay);
console.log('✓ Pass:', test1.pf === 0 && test1.pt === 200 && test1.netPay === 49800);
console.log('\n---\n');

// Test Case 2: Salary 12000-30000 with PF
console.log('Test 2: Salary ₹25,000 with PF enabled');
const test2 = calculateSalaryStructure('Mid Level', 25000, true);
console.log(test2);
console.log('Expected: PF = 2880, PT = 200');
console.log('Actual PF:', test2.pf, 'PT:', test2.pt);
console.log('Salary after PF:', 25000 - 2880, '= 22120');
console.log('Base (40% of 22120):', 22120 * 0.4, '= 8848');
console.log('✓ Pass:', test2.pf === 2880 && test2.pt === 200);
console.log('\n---\n');

// Test Case 3: Salary 12000-30000 without PF
console.log('Test 3: Salary ₹20,000 without PF');
const test3 = calculateSalaryStructure('Mid Level No PF', 20000, false);
console.log(test3);
console.log('Expected: PF = 0, PT = 200, Net Pay = 19800');
console.log('Actual Net Pay:', test3.netPay);
console.log('✓ Pass:', test3.pf === 0 && test3.pt === 200 && test3.netPay === 19800);
console.log('\n---\n');

// Test Case 4: Salary <= 12000 with PF
console.log('Test 4: Salary ₹10,000 with PF enabled');
const test4 = calculateSalaryStructure('Junior', 10000, true);
console.log(test4);
console.log('Expected: PF = 2400 (24%), Net Pay = 7600');
console.log('Actual PF:', test4.pf, 'Net Pay:', test4.netPay);
console.log('✓ Pass:', test4.pf === 2400 && test4.netPay === 7600);
console.log('\n---\n');

// Test Case 5: Salary <= 12000 without PF
console.log('Test 5: Salary ₹8,000 without PF');
const test5 = calculateSalaryStructure('Intern', 8000, false);
console.log(test5);
console.log('Expected: PF = 0, Net Pay = 8000');
console.log('Actual Net Pay:', test5.netPay);
console.log('✓ Pass:', test5.pf === 0 && test5.netPay === 8000);
console.log('\n---\n');

// Test Case 6: Edge case - exactly 12000 with PF
console.log('Test 6: Salary ₹12,000 with PF (edge case)');
const test6 = calculateSalaryStructure('Edge Case', 12000, true);
console.log(test6);
console.log('Expected: PF = 2880, PT = 200');
console.log('Actual PF:', test6.pf, 'PT:', test6.pt);
console.log('✓ Pass:', test6.pf === 2880 && test6.pt === 200);
console.log('\n---\n');

// Test Case 7: Edge case - exactly 30000 with PF
console.log('Test 7: Salary ₹30,000 with PF (edge case)');
const test7 = calculateSalaryStructure('Edge Case 2', 30000, true);
console.log(test7);
console.log('Expected: PF = 2880, PT = 200');
console.log('Actual PF:', test7.pf, 'PT:', test7.pt);
console.log('✓ Pass:', test7.pf === 2880 && test7.pt === 200);
console.log('\n---\n');

console.log('=== All Tests Complete ===');
