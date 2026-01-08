import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller()
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  // API 1: Get all employees (for dropdown)
  @Get('employees')
  async getAllEmployees() {
    return this.payrollService.getAllEmployees();
  }

  // API 2: Create employee
  @Post('employee')
  async createEmployee(
    @Body()
    body: {
      name: string;
      salary: number;
      isPfEnabled: boolean;
    },
  ) {
    return this.payrollService.createEmployee(
      body.name,
      body.salary,
      body.isPfEnabled,
    );
  }

  // API 3: Get employee salary structure
  @Get('employee/:empId')
  async getEmployeeSalaryStructure(@Param('empId') empId: string) {
    return this.payrollService.getEmployeeSalaryStructure(parseInt(empId));
  }

  // API 4: Get available datasets (for dropdown)
  @Get('datasets')
  async getAvailableDatasets() {
    return this.payrollService.getAvailableDatasets();
  }

  // API 5: Calculate salary based on employee and dataset
  @Post('calculate-salary')
  async calculateSalaryWithDataset(
    @Body()
    body: {
      employeeId: number;
      datasetId: number;
      date?: string; // Optional: specific date to calculate for (default: 2026-01-06)
    },
  ) {
    return this.payrollService.calculateSalaryWithDataset(
      body.employeeId,
      body.datasetId,
      body.date,
    );
  }
}
