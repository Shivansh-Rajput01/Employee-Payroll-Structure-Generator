import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/db.service';
import {
  calculateSalaryStructure,
  SalaryBreakdown,
} from './salary-calculator';

export interface Dataset {
  id: number;
  name: string;
  description: string;
  totalHours: number;
}

@Injectable()
export class PayrollService {
  constructor(private db: DatabaseService) {}

  // Get all employees for dropdown
  async getAllEmployees() {
    const result = await this.db.query(
      'SELECT id, name FROM employee ORDER BY name',
    );
    return result.rows;
  }

  // Create employee with salary calculation
  async createEmployee(name: string, salary: number, isPfEnabled: boolean) {
    // Validation: PF cannot be enabled for salary > 30000
    if (salary > 30000 && isPfEnabled) {
      throw new Error(
        'PF cannot be enabled for salary greater than ₹30,000. Please set isPfEnabled to false.',
      );
    }

    // Insert employee into database
    const result = await this.db.query(
      'INSERT INTO employee (name, salary, is_pf_applicable) VALUES ($1, $2, $3) RETURNING *',
      [name, salary, isPfEnabled],
    );

    const employee = result.rows[0];

    // Calculate salary structure
    const salaryStructure = calculateSalaryStructure(
      name,
      salary,
      isPfEnabled,
    );

    return {
      id: employee.id,
      ...salaryStructure,
    };
  }

  // Get employee salary structure
  async getEmployeeSalaryStructure(empId: number): Promise<SalaryBreakdown> {
    const result = await this.db.query(
      'SELECT id, name, salary, is_pf_applicable FROM employee WHERE id = $1',
      [empId],
    );

    if (result.rows.length === 0) {
      throw new Error('Employee not found');
    }

    const employee = result.rows[0];

    return calculateSalaryStructure(
      employee.name,
      parseFloat(employee.salary),
      employee.is_pf_applicable,
    );
  }

  // Get available datasets for dropdown
  async getAvailableDatasets(): Promise<Dataset[]> {
    return [
      {
        id: 1,
        name: 'Dataset 1',
        description: 'Break every 45 minutes for 3 minutes',
        totalHours: 8.2,
      },
      {
        id: 2,
        name: 'Dataset 2',
        description: 'Break every 2 hours for 5 minutes',
        totalHours: 8.0,
      },
      {
        id: 3,
        name: 'Dataset 3',
        description: 'Random breaks - realistic behavior',
        totalHours: 8.0,
      },
      {
        id: 4,
        name: 'Dataset 4',
        description: 'Random breaks - half day (5h 45m)',
        totalHours: 5.75,
      },
    ];
  }

  // Calculate salary based on employee and dataset
  async calculateSalaryWithDataset(
    employeeId: number,
    datasetId: number,
    date?: string,
  ) {
    // Get employee details
    const empResult = await this.db.query(
      'SELECT id, name, salary, is_pf_applicable FROM employee WHERE id = $1',
      [employeeId],
    );

    if (empResult.rows.length === 0) {
      throw new Error('Employee not found');
    }

    const employee = empResult.rows[0];
    const targetDate = date || '2026-01-06';

    // Get time logs for the specific dataset pattern
    // We'll use the date to filter and calculate total hours
    const timeLogResult = await this.db.query(
      `SELECT 
        punch_in_time, 
        punch_out_time,
        EXTRACT(EPOCH FROM (punch_out_time - punch_in_time))/3600 as hours_worked
      FROM time_log 
      WHERE employee_id = $1 
        AND DATE(punch_in_time) = $2
      ORDER BY punch_in_time`,
      [employeeId, targetDate],
    );

    // Calculate total hours worked
    let totalHoursWorked = 0;
    const sessions = timeLogResult.rows.map((row) => {
      const hours = parseFloat(row.hours_worked);
      totalHoursWorked += hours;
      return {
        punchIn: row.punch_in_time,
        punchOut: row.punch_out_time,
        hoursWorked: parseFloat(hours.toFixed(2)),
      };
    });

    // Get dataset info
    const datasets = await this.getAvailableDatasets();
    const selectedDataset = datasets.find((d) => d.id === datasetId);

    if (!selectedDataset) {
      throw new Error('Invalid dataset ID');
    }

    // Calculate base salary structure
    const baseSalary = parseFloat(employee.salary);
    const isPfEnabled = employee.is_pf_applicable;

    // Calculate salary based on attendance
    // If worked < 8 hours, apply proportional deduction
    const requiredHours = 8;
    let effectiveSalary = baseSalary;

    if (totalHoursWorked < requiredHours) {
      // Proportional salary based on hours worked
      effectiveSalary = (baseSalary / requiredHours) * totalHoursWorked;
    }

    // Calculate salary structure with effective salary
    const salaryStructure = calculateSalaryStructure(
      employee.name,
      effectiveSalary,
      isPfEnabled,
    );

    return {
      employee: {
        id: employee.id,
        name: employee.name,
        baseSalary: baseSalary,
      },
      dataset: selectedDataset,
      attendance: {
        date: targetDate,
        totalHoursWorked: parseFloat(totalHoursWorked.toFixed(2)),
        requiredHours: requiredHours,
        sessions: sessions,
        attendancePercentage: parseFloat(
          ((totalHoursWorked / requiredHours) * 100).toFixed(2),
        ),
      },
      salaryCalculation: {
        ...salaryStructure,
        deductionApplied: totalHoursWorked < requiredHours,
        deductionReason:
          totalHoursWorked < requiredHours
            ? `Worked ${totalHoursWorked.toFixed(2)} hours out of ${requiredHours} required hours`
            : null,
      },
    };
  }
}
