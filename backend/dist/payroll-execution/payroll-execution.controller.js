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
exports.PayrollExecutionController = void 0;
const common_1 = require("@nestjs/common");
const payroll_execution_service_1 = require("./payroll-execution.service");
const editSigningBonusDto_1 = require("./dto/editSigningBonusDto");
const editBenefitDto_1 = require("./dto/editBenefitDto");
const validatePayrollPeriodDto_1 = require("./dto/validatePayrollPeriodDto");
const approvePayrollPeriodDto_1 = require("./dto/approvePayrollPeriodDto");
const rejectPayrollPeriodDto_1 = require("./dto/rejectPayrollPeriodDto");
const editPayrollPeriodDto_1 = require("./dto/editPayrollPeriodDto");
const startPayrollInitiationDto_1 = require("./dto/startPayrollInitiationDto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_gaurd_1 = require("../Common/Gaurds/roles.gaurd");
const roles_decorator_1 = require("../Common/Decorators/roles.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
let PayrollExecutionController = class PayrollExecutionController {
    payrollExecutionService;
    constructor(payrollExecutionService) {
        this.payrollExecutionService = payrollExecutionService;
    }
    async getPendingSigningBonuses() {
        return await this.payrollExecutionService.getPendingSigningBonuses();
    }
    async getSigningBonusById(id) {
        return await this.payrollExecutionService.getSigningBonusById(id);
    }
    async approveSigningBonus(id) {
        return await this.payrollExecutionService.approveSigningBonus(id);
    }
    async rejectSigningBonus(id) {
        return await this.payrollExecutionService.rejectSigningBonus(id);
    }
    async editSigningBonus(id, editSigningBonusDto) {
        return await this.payrollExecutionService.editSigningBonus(id, editSigningBonusDto.givenAmount, editSigningBonusDto.paymentDate);
    }
    async getPendingBenefits() {
        return await this.payrollExecutionService.getPendingBenefits();
    }
    async getBenefitById(id) {
        return await this.payrollExecutionService.getBenefitById(id);
    }
    async approveBenefit(id) {
        return await this.payrollExecutionService.approveBenefit(id);
    }
    async rejectBenefit(id) {
        return await this.payrollExecutionService.rejectBenefit(id);
    }
    async editBenefit(id, editBenefitDto) {
        return await this.payrollExecutionService.editBenefit(id, editBenefitDto.givenAmount);
    }
    async getSuggestedPayrollPeriod() {
        return await this.payrollExecutionService.getSuggestedPayrollPeriod();
    }
    async validatePayrollPeriod(validatePayrollPeriodDto) {
        return await this.payrollExecutionService.validatePayrollPeriod(validatePayrollPeriodDto.payrollPeriod);
    }
    async getPayrollRunById(id) {
        return await this.payrollExecutionService.getPayrollRunById(id);
    }
    async approvePayrollPeriod(id, approvePayrollPeriodDto) {
        return await this.payrollExecutionService.approvePayrollPeriod(id, approvePayrollPeriodDto.payrollManagerId);
    }
    async rejectPayrollPeriod(id, rejectPayrollPeriodDto) {
        return await this.payrollExecutionService.rejectPayrollPeriod(id, rejectPayrollPeriodDto.rejectionReason);
    }
    async editPayrollPeriod(id, editPayrollPeriodDto) {
        return await this.payrollExecutionService.editPayrollPeriod(id, editPayrollPeriodDto.payrollPeriod);
    }
    async startPayrollInitiation(startPayrollInitiationDto) {
        return await this.payrollExecutionService.startPayrollInitiation(startPayrollInitiationDto.runId, startPayrollInitiationDto.payrollPeriod, startPayrollInitiationDto.payrollSpecialistId, startPayrollInitiationDto.entity);
    }
    async checkPreRunApprovalsComplete() {
        return await this.payrollExecutionService.checkPreRunApprovalsComplete();
    }
    async publishDraftForApproval(runId) {
        return await this.payrollExecutionService.publishDraftForApproval(runId);
    }
    async approveByPayrollManager(runId, body) {
        return await this.payrollExecutionService.approveByPayrollManager(runId, body.approverId);
    }
    async rejectByPayrollManager(runId, body) {
        return await this.payrollExecutionService.rejectByPayrollManager(runId, body.reason, body.approverId);
    }
    async approveByFinanceStaff(runId, body) {
        return await this.payrollExecutionService.approveByFinanceStaff(runId, body.approverId);
    }
    async rejectByFinanceStaff(runId, body) {
        return await this.payrollExecutionService.rejectByFinanceStaff(runId, body.reason, body.approverId);
    }
    async getAllPayrollRuns(status, entity, startDate, endDate) {
        const filters = { status, entity, startDate, endDate };
        return await this.payrollExecutionService.getAllPayrollRuns(filters);
    }
    async freezePayroll(runId, body) {
        return await this.payrollExecutionService.freezePayroll(runId, body.reason);
    }
    async unfreezePayroll(runId, body) {
        return await this.payrollExecutionService.unfreezePayroll(runId, body.unlockReason);
    }
    async getApprovalsByRunId(runId) {
        return await this.payrollExecutionService.getApprovalsByRunId(runId);
    }
    async createPayrollAdjustment(runId, body) {
        return await this.payrollExecutionService.createPayrollAdjustment(runId, body.employeeId, body.type, body.amount, body.reason);
    }
    async resolveException(runId, employeeId, body) {
        return await this.payrollExecutionService.resolveException(runId, employeeId, body.resolutionNote);
    }
    async generatePayslips(runId) {
        return await this.payrollExecutionService.generatePayslips(runId);
    }
    async distributePayslips(runId) {
        return await this.payrollExecutionService.distributePayslips(runId);
    }
    async markPayrollAsPaid(runId) {
        return await this.payrollExecutionService.markPayrollAsPaid(runId);
    }
    async flagPayrollExceptions(runId) {
        return await this.payrollExecutionService.flagPayrollExceptions(runId);
    }
    async getPayrollRunExceptions(runId) {
        return await this.payrollExecutionService.getPayrollRunExceptions(runId);
    }
    async reviewPayrollDraft(runId) {
        return await this.payrollExecutionService.reviewPayrollDraft(runId);
    }
    async getPayrollForManagerReview(runId) {
        return await this.payrollExecutionService.getPayrollForManagerReview(runId);
    }
    async getPayrollForFinanceReview(runId) {
        return await this.payrollExecutionService.getPayrollForFinanceReview(runId);
    }
    async getAllPayslips(runId, employeeName, department) {
        return await this.payrollExecutionService.getAllPayslips(runId, employeeName, department);
    }
    async getPayslipById(id) {
        return await this.payrollExecutionService.getPayslipById(id);
    }
};
exports.PayrollExecutionController = PayrollExecutionController;
__decorate([
    (0, common_1.Get)('signing-bonuses/pending'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPendingSigningBonuses", null);
__decorate([
    (0, common_1.Get)('signing-bonuses/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getSigningBonusById", null);
__decorate([
    (0, common_1.Patch)('signing-bonuses/:id/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "approveSigningBonus", null);
__decorate([
    (0, common_1.Patch)('signing-bonuses/:id/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "rejectSigningBonus", null);
__decorate([
    (0, common_1.Patch)('signing-bonuses/:id/edit'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, editSigningBonusDto_1.EditSigningBonusDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "editSigningBonus", null);
__decorate([
    (0, common_1.Get)('benefits/pending'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPendingBenefits", null);
__decorate([
    (0, common_1.Get)('benefits/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getBenefitById", null);
__decorate([
    (0, common_1.Patch)('benefits/:id/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "approveBenefit", null);
__decorate([
    (0, common_1.Patch)('benefits/:id/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "rejectBenefit", null);
__decorate([
    (0, common_1.Patch)('benefits/:id/edit'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, editBenefitDto_1.EditBenefitDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "editBenefit", null);
__decorate([
    (0, common_1.Get)('payroll-period/suggested'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getSuggestedPayrollPeriod", null);
__decorate([
    (0, common_1.Post)('payroll-period/validate'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validatePayrollPeriodDto_1.ValidatePayrollPeriodDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "validatePayrollPeriod", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPayrollRunById", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:id/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approvePayrollPeriodDto_1.ApprovePayrollPeriodDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "approvePayrollPeriod", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:id/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rejectPayrollPeriodDto_1.RejectPayrollPeriodDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "rejectPayrollPeriod", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:id/edit'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, editPayrollPeriodDto_1.EditPayrollPeriodDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "editPayrollPeriod", null);
__decorate([
    (0, common_1.Post)('payroll-runs/start'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [startPayrollInitiationDto_1.StartPayrollInitiationDto]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "startPayrollInitiation", null);
__decorate([
    (0, common_1.Get)('pre-run-check'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "checkPreRunApprovalsComplete", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/publish'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "publishDraftForApproval", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/manager-approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "approveByPayrollManager", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/manager-reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "rejectByPayrollManager", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/finance-approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "approveByFinanceStaff", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/finance-reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "rejectByFinanceStaff", null);
__decorate([
    (0, common_1.Get)('payroll-runs'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('entity')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getAllPayrollRuns", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/freeze'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "freezePayroll", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/unfreeze'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "unfreezePayroll", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:runId/approvals'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getApprovalsByRunId", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:runId/adjustments'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "createPayrollAdjustment", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/exceptions/:employeeId/resolve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Param)('employeeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "resolveException", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:runId/payslips/generate'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "generatePayslips", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/payslips/distribute'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "distributePayslips", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:runId/mark-paid'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "markPayrollAsPaid", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:runId/exceptions/flag'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "flagPayrollExceptions", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:runId/exceptions'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPayrollRunExceptions", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:runId/review/draft'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "reviewPayrollDraft", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:runId/review/manager'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPayrollForManagerReview", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:runId/review/finance'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPayrollForFinanceReview", null);
__decorate([
    (0, common_1.Get)('payslips'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Query)('runId')),
    __param(1, (0, common_1.Query)('employeeName')),
    __param(2, (0, common_1.Query)('department')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getAllPayslips", null);
__decorate([
    (0, common_1.Get)('payslips/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollExecutionController.prototype, "getPayslipById", null);
exports.PayrollExecutionController = PayrollExecutionController = __decorate([
    (0, common_1.Controller)('payroll-execution'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_execution_service_1.PayrollExecutionService])
], PayrollExecutionController);
//# sourceMappingURL=payroll-execution.controller.js.map