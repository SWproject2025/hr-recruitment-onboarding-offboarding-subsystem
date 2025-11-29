import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { PayrollTrackingService } from './payroll-tracking.service';
import { PayslipQueryDto } from './dto/payslips/payslip-query.dto';
import { PayslipDownloadDto } from './dto/payslips/payslip-download.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser, CurrentUserData } from '../auth/decorators/current-user.decorator';
import { SystemRole } from '../employee-profile/enums/employee-profile.enums';

@Controller('payroll-tracking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PayrollTrackingController {
  constructor(private readonly payrollTrackingService: PayrollTrackingService) {}

  // ==================== Employee Endpoints ====================
  // All employee endpoints require authentication and employee role

  /**
   * List employee payslips with filters
   * REQ-PY-13
   */
  @Get('employee/payslips')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getPayslipHistory(
    @CurrentUser() user: CurrentUserData,
    @Query() query: PayslipQueryDto,
  ) {
    return this.payrollTrackingService.getPayslipHistory(
      user.employeeProfileId,
      query,
    );
  }

  /**
   * Get payslip details
   * REQ-PY-1, REQ-PY-2
   */
  @Get('employee/payslips/:payslipId')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getPayslip(
    @CurrentUser() user: CurrentUserData,
    @Param('payslipId') payslipId: string,
  ) {
    return this.payrollTrackingService.getPayslip(
      user.employeeProfileId,
      payslipId,
    );
  }

  /**
   * Download payslip PDF
   * REQ-PY-1
   */
  @Get('employee/payslips/:payslipId/download')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async downloadPayslip(
    @CurrentUser() user: CurrentUserData,
    @Param('payslipId') payslipId: string,
    @Query() downloadDto: PayslipDownloadDto,
    @Res() res: Response,
  ) {
    const result = await this.payrollTrackingService.downloadPayslip(
      user.employeeProfileId,
      payslipId,
      downloadDto.format,
    );

    // For now, return JSON response
    // PDF generation will be handled by PDF generator utility
    return res.status(HttpStatus.OK).json({
      message: 'Payslip download initiated',
      ...result,
    });
  }

  /**
   * Get payslip status
   * REQ-PY-2
   */
  @Get('employee/payslips/:payslipId/status')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getPayslipStatus(
    @CurrentUser() user: CurrentUserData,
    @Param('payslipId') payslipId: string,
  ) {
    return this.payrollTrackingService.getPayslipStatus(
      user.employeeProfileId,
      payslipId,
    );
  }

  /**
   * Get comprehensive salary details
   * REQ-PY-3, REQ-PY-5, REQ-PY-7, REQ-PY-8, REQ-PY-9, REQ-PY-10, REQ-PY-11, REQ-PY-14
   */
  @Get('employee/salary-details')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getEmployeeSalaryDetails(@CurrentUser() user: CurrentUserData) {
    return this.payrollTrackingService.getEmployeeSalaryDetails(
      user.employeeProfileId,
    );
  }

  /**
   * Download tax documents for a specific year
   * REQ-PY-15
   */
  @Get('employee/tax-documents/:year')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async downloadTaxDocuments(
    @CurrentUser() user: CurrentUserData,
    @Param('year') year: string,
  ) {
    const yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber)) {
      throw new BadRequestException('Invalid year parameter');
    }
    return this.payrollTrackingService.downloadTaxDocuments(
      user.employeeProfileId,
      yearNumber,
    );
  }
}
