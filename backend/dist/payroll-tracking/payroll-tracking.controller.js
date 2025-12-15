"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollTrackingController = void 0;
const common_1 = require("@nestjs/common");
const payroll_tracking_service_1 = require("./payroll-tracking.service");
const payslip_query_dto_1 = require("./dto/payslips/payslip-query.dto");
const payslip_download_dto_1 = require("./dto/payslips/payslip-download.dto");
const create_dispute_dto_1 = require("./dto/disputes/create-dispute.dto");
const approve_dispute_dto_1 = require("./dto/disputes/approve-dispute.dto");
const reject_dispute_dto_1 = require("./dto/disputes/reject-dispute.dto");
const create_claim_dto_1 = require("./dto/claims/create-claim.dto");
const approve_claim_dto_1 = require("./dto/claims/approve-claim.dto");
const reject_claim_dto_1 = require("./dto/claims/reject-claim.dto");
const create_refund_dto_1 = require("./dto/refunds/create-refund.dto");
const tax_report_dto_1 = require("./dto/reports/tax-report.dto");
const payroll_report_dto_1 = require("./dto/reports/payroll-report.dto");
const department_report_dto_1 = require("./dto/reports/department-report.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_gaurd_1 = require("../Common/Gaurds/roles.gaurd");
const roles_decorator_1 = require("../Common/Decorators/roles.decorator");
const current_user_decorator_1 = require("../Common/Decorators/current-user.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
let PayrollTrackingController = class PayrollTrackingController {
    payrollTrackingService;
    constructor(payrollTrackingService) {
        this.payrollTrackingService = payrollTrackingService;
    }
    async getPayslipHistory(user, query) {
        return this.payrollTrackingService.getPayslipHistory(user.employeeProfileId, query);
    }
    async getPayslip(user, payslipId) {
        return this.payrollTrackingService.getPayslip(user.employeeProfileId, payslipId);
    }
    async downloadPayslip(user, payslipId, downloadDto, res) {
        const pdfBuffer = await this.payrollTrackingService.downloadPayslip(user.employeeProfileId, payslipId, downloadDto.format || 'pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=payslip-${payslipId}.pdf`);
        res.setHeader('Content-Length', pdfBuffer.length);
        return res.send(pdfBuffer);
    }
    async getPayslipStatus(user, payslipId) {
        return this.payrollTrackingService.getPayslipStatus(user.employeeProfileId, payslipId);
    }
    async getEmployeeSalaryDetails(user) {
        return this.payrollTrackingService.getEmployeeSalaryDetails(user.employeeProfileId);
    }
    async getTaxDocuments(user, year) {
        const yearNumber = parseInt(year, 10);
        if (isNaN(yearNumber)) {
            throw new common_1.BadRequestException('Invalid year parameter');
        }
        return this.payrollTrackingService.downloadTaxDocuments(user.employeeProfileId, yearNumber);
    }
    async downloadTaxDocuments(user, year, res) {
        const yearNumber = parseInt(year, 10);
        if (isNaN(yearNumber)) {
            throw new common_1.BadRequestException('Invalid year parameter');
        }
        const pdfBuffer = await this.payrollTrackingService.downloadTaxDocumentsPDF(user.employeeProfileId, yearNumber);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=tax-document-${yearNumber}.pdf`);
        res.setHeader('Content-Length', pdfBuffer.length);
        return res.send(pdfBuffer);
    }
    async createDispute(user, createDisputeDto) {
        return this.payrollTrackingService.createDispute(user.employeeProfileId, createDisputeDto);
    }
    async getEmployeeDisputes(user, page, limit) {
        return this.payrollTrackingService.getEmployeeDisputes(user.employeeProfileId, {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async getDisputeStatus(user, disputeId) {
        return this.payrollTrackingService.getDisputeStatus(user.employeeProfileId, disputeId);
    }
    async createClaim(user, createClaimDto) {
        return this.payrollTrackingService.createClaim(user.employeeProfileId, createClaimDto);
    }
    async getEmployeeClaims(user, page, limit) {
        return this.payrollTrackingService.getEmployeeClaims(user.employeeProfileId, {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async getClaimStatus(user, claimId) {
        return this.payrollTrackingService.getClaimStatus(user.employeeProfileId, claimId);
    }
    async getDisputesForReview(page, limit) {
        return this.payrollTrackingService.getDisputesForReview({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async approveDispute(user, disputeId, approveDisputeDto) {
        return this.payrollTrackingService.approveDispute(disputeId, user.employeeProfileId, approveDisputeDto);
    }
    async rejectDispute(user, disputeId, rejectDisputeDto) {
        return this.payrollTrackingService.rejectDispute(disputeId, user.employeeProfileId, rejectDisputeDto);
    }
    async getClaimsForReview(page, limit) {
        return this.payrollTrackingService.getClaimsForReview({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async approveClaim(user, claimId, approveClaimDto) {
        return this.payrollTrackingService.approveClaim(claimId, user.employeeProfileId, approveClaimDto);
    }
    async rejectClaim(user, claimId, rejectClaimDto) {
        return this.payrollTrackingService.rejectClaim(claimId, user.employeeProfileId, rejectClaimDto);
    }
    async getDepartmentReport(filters) {
        if (!filters.departmentId) {
            throw new common_1.BadRequestException('Department ID is required');
        }
        return this.payrollTrackingService.generateDepartmentPayrollReport(filters.departmentId, filters);
    }
    async getPendingManagerApprovals(page, limit) {
        return this.payrollTrackingService.getPendingManagerApprovals({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async confirmDisputeApproval(user, disputeId) {
        return this.payrollTrackingService.confirmDisputeApproval(disputeId, user.employeeProfileId);
    }
    async confirmClaimApproval(user, claimId) {
        return this.payrollTrackingService.confirmClaimApproval(claimId, user.employeeProfileId);
    }
    async getApprovedDisputes(page, limit) {
        return this.payrollTrackingService.getApprovedDisputes({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async getApprovedClaims(page, limit) {
        return this.payrollTrackingService.getApprovedClaims({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async createRefundForDispute(user, disputeId, createRefundDto) {
        return this.payrollTrackingService.createRefundForDispute(disputeId, user.employeeProfileId, createRefundDto);
    }
    async createRefundForClaim(user, claimId, createRefundDto) {
        return this.payrollTrackingService.createRefundForClaim(claimId, user.employeeProfileId, createRefundDto);
    }
    async getTaxReport(filters) {
        return this.payrollTrackingService.generateTaxReport(filters);
    }
    async getInsuranceReport(filters) {
        return this.payrollTrackingService.generateInsuranceReport(filters);
    }
    async getBenefitsReport(filters) {
        return this.payrollTrackingService.generateBenefitsReport(filters);
    }
    async getMonthEndSummary(month, year) {
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        if (isNaN(monthNum) || isNaN(yearNum)) {
            throw new common_1.BadRequestException('Invalid month or year parameter');
        }
        return this.payrollTrackingService.generateMonthEndSummary(monthNum, yearNum);
    }
    async getYearEndSummary(year) {
        const yearNum = parseInt(year, 10);
        if (isNaN(yearNum)) {
            throw new common_1.BadRequestException('Invalid year parameter');
        }
        return this.payrollTrackingService.generateYearEndSummary(yearNum);
    }
};
exports.PayrollTrackingController = PayrollTrackingController;
__decorate([
    (0, common_1.Get)('employee/payslips'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payslip_query_dto_1.PayslipQueryDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getPayslipHistory", null);
__decorate([
    (0, common_1.Get)('employee/payslips/:payslipId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('payslipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getPayslip", null);
__decorate([
    (0, common_1.Get)('employee/payslips/:payslipId/download'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('payslipId')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, payslip_download_dto_1.PayslipDownloadDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "downloadPayslip", null);
__decorate([
    (0, common_1.Get)('employee/payslips/:payslipId/status'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('payslipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getPayslipStatus", null);
__decorate([
    (0, common_1.Get)('employee/salary-details'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getEmployeeSalaryDetails", null);
__decorate([
    (0, common_1.Get)('employee/tax-documents/:year'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getTaxDocuments", null);
__decorate([
    (0, common_1.Get)('employee/tax-documents/:year/download'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('year')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "downloadTaxDocuments", null);
__decorate([
    (0, common_1.Post)('employee/disputes'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dispute_dto_1.CreateDisputeDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "createDispute", null);
__decorate([
    (0, common_1.Get)('employee/disputes'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getEmployeeDisputes", null);
__decorate([
    (0, common_1.Get)('employee/disputes/:disputeId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('disputeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getDisputeStatus", null);
__decorate([
    (0, common_1.Post)('employee/claims'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_claim_dto_1.CreateClaimDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "createClaim", null);
__decorate([
    (0, common_1.Get)('employee/claims'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getEmployeeClaims", null);
__decorate([
    (0, common_1.Get)('employee/claims/:claimId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('claimId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getClaimStatus", null);
__decorate([
    (0, common_1.Get)('specialist/disputes/pending'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getDisputesForReview", null);
__decorate([
    (0, common_1.Post)('specialist/disputes/:disputeId/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('disputeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, approve_dispute_dto_1.ApproveDisputeDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "approveDispute", null);
__decorate([
    (0, common_1.Post)('specialist/disputes/:disputeId/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('disputeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, reject_dispute_dto_1.RejectDisputeDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "rejectDispute", null);
__decorate([
    (0, common_1.Get)('specialist/claims/pending'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getClaimsForReview", null);
__decorate([
    (0, common_1.Post)('specialist/claims/:claimId/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('claimId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, approve_claim_dto_1.ApproveClaimDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "approveClaim", null);
__decorate([
    (0, common_1.Post)('specialist/claims/:claimId/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('claimId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, reject_claim_dto_1.RejectClaimDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "rejectClaim", null);
__decorate([
    (0, common_1.Get)('specialist/reports/department'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_report_dto_1.DepartmentReportDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getDepartmentReport", null);
__decorate([
    (0, common_1.Get)('manager/approvals/pending'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getPendingManagerApprovals", null);
__decorate([
    (0, common_1.Post)('manager/disputes/:disputeId/confirm-approval'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('disputeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "confirmDisputeApproval", null);
__decorate([
    (0, common_1.Post)('manager/claims/:claimId/confirm-approval'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('claimId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "confirmClaimApproval", null);
__decorate([
    (0, common_1.Get)('finance/disputes/approved'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getApprovedDisputes", null);
__decorate([
    (0, common_1.Get)('finance/claims/approved'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getApprovedClaims", null);
__decorate([
    (0, common_1.Post)('finance/refunds/disputes/:disputeId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('disputeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_refund_dto_1.CreateRefundDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "createRefundForDispute", null);
__decorate([
    (0, common_1.Post)('finance/refunds/claims/:claimId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('claimId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_refund_dto_1.CreateRefundDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "createRefundForClaim", null);
__decorate([
    (0, common_1.Get)('finance/reports/taxes'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tax_report_dto_1.TaxReportDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getTaxReport", null);
__decorate([
    (0, common_1.Get)('finance/reports/insurance'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_report_dto_1.PayrollReportDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getInsuranceReport", null);
__decorate([
    (0, common_1.Get)('finance/reports/benefits'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_report_dto_1.PayrollReportDto]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getBenefitsReport", null);
__decorate([
    (0, common_1.Get)('finance/reports/month-end/:month/:year'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('month')),
    __param(1, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getMonthEndSummary", null);
__decorate([
    (0, common_1.Get)('finance/reports/year-end/:year'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollTrackingController.prototype, "getYearEndSummary", null);
exports.PayrollTrackingController = PayrollTrackingController = __decorate([
    (0, common_1.Controller)('payroll-tracking'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_tracking_service_1.PayrollTrackingService])
], PayrollTrackingController);
//# sourceMappingURL=payroll-tracking.controller.js.map