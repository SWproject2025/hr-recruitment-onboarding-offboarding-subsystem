import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import type { Response } from 'express';
import { PayrollTrackingService } from './payroll-tracking.service';
import { PayslipQueryDto } from './dto/payslips/payslip-query.dto';
import { PayslipDownloadDto } from './dto/payslips/payslip-download.dto';
import { CreateDisputeDto } from './dto/disputes/create-dispute.dto';
import { ApproveDisputeDto } from './dto/disputes/approve-dispute.dto';
import { RejectDisputeDto } from './dto/disputes/reject-dispute.dto';
import { CreateClaimDto } from './dto/claims/create-claim.dto';
import { ApproveClaimDto } from './dto/claims/approve-claim.dto';
import { RejectClaimDto } from './dto/claims/reject-claim.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { CurrentUserData } from '../auth/decorators/current-user.decorator';
import { SystemRole } from '../employee-profile/enums/employee-profile.enums';

@Controller('payroll-tracking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PayrollTrackingController {
  constructor(private readonly payrollTrackingService: PayrollTrackingService) { }

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
    const pdfBuffer = await this.payrollTrackingService.downloadPayslip(
      user.employeeProfileId,
      payslipId,
      downloadDto.format || 'pdf',
    );

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=payslip-${payslipId}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send PDF buffer as response
    return res.send(pdfBuffer);
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
   * Get tax documents data for a specific year (JSON response)
   * REQ-PY-15
   */
  @Get('employee/tax-documents/:year')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getTaxDocuments(
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

  /**
   * Download tax documents as PDF for a specific year
   * REQ-PY-15
   */
  @Get('employee/tax-documents/:year/download')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async downloadTaxDocuments(
    @CurrentUser() user: CurrentUserData,
    @Param('year') year: string,
    @Res() res: Response,
  ) {
    const yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber)) {
      throw new BadRequestException('Invalid year parameter');
    }

    const pdfBuffer = await this.payrollTrackingService.downloadTaxDocumentsPDF(
      user.employeeProfileId,
      yearNumber,
    );

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=tax-document-${yearNumber}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send PDF buffer as response
    return res.send(pdfBuffer);
  }

  /**
   * Create dispute
   * REQ-PY-16
   */
  @Post('employee/disputes')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async createDispute(
    @CurrentUser() user: CurrentUserData,
    @Body() createDisputeDto: CreateDisputeDto,
  ) {
    return this.payrollTrackingService.createDispute(
      user.employeeProfileId,
      createDisputeDto,
    );
  }

  /**
   * List employee disputes
   * REQ-PY-18
   */
  @Get('employee/disputes')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getEmployeeDisputes(
    @CurrentUser() user: CurrentUserData,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getEmployeeDisputes(user.employeeProfileId, {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  /**
   * Get dispute status
   * REQ-PY-18
   */
  @Get('employee/disputes/:disputeId')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getDisputeStatus(
    @CurrentUser() user: CurrentUserData,
    @Param('disputeId') disputeId: string,
  ) {
    return this.payrollTrackingService.getDisputeStatus(
      user.employeeProfileId,
      disputeId,
    );
  }

  /**
   * Submit expense claim
   * REQ-PY-17
   */
  @Post('employee/claims')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async createClaim(
    @CurrentUser() user: CurrentUserData,
    @Body() createClaimDto: CreateClaimDto,
  ) {
    return this.payrollTrackingService.createClaim(
      user.employeeProfileId,
      createClaimDto,
    );
  }

  /**
   * List employee claims
   * REQ-PY-18
   */
  @Get('employee/claims')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getEmployeeClaims(
    @CurrentUser() user: CurrentUserData,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getEmployeeClaims(user.employeeProfileId, {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  /**
   * Get claim status
   * REQ-PY-18
   */
  @Get('employee/claims/:claimId')
  @Roles(SystemRole.DEPARTMENT_EMPLOYEE)
  async getClaimStatus(
    @CurrentUser() user: CurrentUserData,
    @Param('claimId') claimId: string,
  ) {
    return this.payrollTrackingService.getClaimStatus(
      user.employeeProfileId,
      claimId,
    );
  }

  // ==================== Payroll Specialist Endpoints ====================

  /**
   * List disputes for review
   * REQ-PY-39
   */
  @Get('specialist/disputes/pending')
  @Roles(SystemRole.PAYROLL_SPECIALIST)
  async getDisputesForReview(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getDisputesForReview({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  /**
   * Approve dispute
   * REQ-PY-39
   */
  @Post('specialist/disputes/:disputeId/approve')
  @Roles(SystemRole.PAYROLL_SPECIALIST)
  async approveDispute(
    @CurrentUser() user: CurrentUserData,
    @Param('disputeId') disputeId: string,
    @Body() approveDisputeDto: ApproveDisputeDto,
  ) {
    return this.payrollTrackingService.approveDispute(
      disputeId,
      user.employeeProfileId,
      approveDisputeDto,
    );
  }

  /**
   * Reject dispute
   * REQ-PY-39
   */
  @Post('specialist/disputes/:disputeId/reject')
  @Roles(SystemRole.PAYROLL_SPECIALIST)
  async rejectDispute(
    @CurrentUser() user: CurrentUserData,
    @Param('disputeId') disputeId: string,
    @Body() rejectDisputeDto: RejectDisputeDto,
  ) {
    return this.payrollTrackingService.rejectDispute(
      disputeId,
      user.employeeProfileId,
      rejectDisputeDto,
    );
  }

  /**
   * List claims for review
   * REQ-PY-42
   */
  @Get('specialist/claims/pending')
  @Roles(SystemRole.PAYROLL_SPECIALIST)
  async getClaimsForReview(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getClaimsForReview({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  /**
   * Approve claim
   * REQ-PY-42
   */
  @Post('specialist/claims/:claimId/approve')
  @Roles(SystemRole.PAYROLL_SPECIALIST)
  async approveClaim(
    @CurrentUser() user: CurrentUserData,
    @Param('claimId') claimId: string,
    @Body() approveClaimDto: ApproveClaimDto,
  ) {
    return this.payrollTrackingService.approveClaim(
      claimId,
      user.employeeProfileId,
      approveClaimDto,
    );
  }

  /**
   * Reject claim
   * REQ-PY-42
   */
  @Post('specialist/claims/:claimId/reject')
  @Roles(SystemRole.PAYROLL_SPECIALIST)
  async rejectClaim(
    @CurrentUser() user: CurrentUserData,
    @Param('claimId') claimId: string,
    @Body() rejectClaimDto: RejectClaimDto,
  ) {
    return this.payrollTrackingService.rejectClaim(
      claimId,
      user.employeeProfileId,
      rejectClaimDto,
    );
  }

  // ==================== Payroll Manager Endpoints ====================

  /**
   * List pending approvals (disputes and claims)
   * REQ-PY-40, REQ-PY-43
   */
  @Get('manager/approvals/pending')
  @Roles(SystemRole.PAYROLL_MANAGER)
  async getPendingManagerApprovals(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getPendingManagerApprovals({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  /**
   * Confirm dispute approval
   * REQ-PY-40
   */
  @Post('manager/disputes/:disputeId/confirm-approval')
  @Roles(SystemRole.PAYROLL_MANAGER)
  async confirmDisputeApproval(
    @CurrentUser() user: CurrentUserData,
    @Param('disputeId') disputeId: string,
  ) {
    return this.payrollTrackingService.confirmDisputeApproval(
      disputeId,
      user.employeeProfileId,
    );
  }

  /**
   * Confirm claim approval
   * REQ-PY-43
   */
  @Post('manager/claims/:claimId/confirm-approval')
  @Roles(SystemRole.PAYROLL_MANAGER)
  async confirmClaimApproval(
    @CurrentUser() user: CurrentUserData,
    @Param('claimId') claimId: string,
  ) {
    return this.payrollTrackingService.confirmClaimApproval(
      claimId,
      user.employeeProfileId,
    );
  }

  // ==================== Finance Staff Endpoints ====================

  /**
   * View approved disputes
   * REQ-PY-41
   */
  @Get('finance/disputes/approved')
  @Roles(SystemRole.FINANCE_STAFF)
  async getApprovedDisputes(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getApprovedDisputes({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  /**
   * View approved claims
   * REQ-PY-44
   */
  @Get('finance/claims/approved')
  @Roles(SystemRole.FINANCE_STAFF)
  async getApprovedClaims(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.payrollTrackingService.getApprovedClaims({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }
}
