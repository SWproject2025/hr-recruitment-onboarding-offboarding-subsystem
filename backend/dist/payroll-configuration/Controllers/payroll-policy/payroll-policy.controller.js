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
exports.PayrollPolicyController = void 0;
const common_1 = require("@nestjs/common");
const payroll_configuration_service_1 = require("../../payroll-configuration.service");
const roles_decorator_1 = require("../../../Common/Decorators/roles.decorator");
const roles_gaurd_1 = require("../../../Common/Gaurds/roles.gaurd");
const employee_profile_enums_1 = require("../../../employee-profile/enums/employee-profile.enums");
const createPayrollPolicy_dto_1 = require("../../dtos/createPayrollPolicy.dto");
const updatePayrollPolicy_dto_1 = require("../../dtos/updatePayrollPolicy.dto");
let PayrollPolicyController = class PayrollPolicyController {
    payrollConfigurationService;
    constructor(payrollConfigurationService) {
        this.payrollConfigurationService = payrollConfigurationService;
    }
    createPolicy(dto, req) {
        return this.payrollConfigurationService.createPayrollPolicy(dto, req.user._id);
    }
    updatePolicy(id, dto, req) {
        return this.payrollConfigurationService.updatePayrollPolicy(dto, id, req.user._id);
    }
    getAll() {
        return this.payrollConfigurationService.getAllPayrollPolicies();
    }
    getOne(id) {
        return this.payrollConfigurationService.getOnePayrollPolicy(id);
    }
    approvePolicy(policyId, req) {
        return this.payrollConfigurationService.approvePolicy(policyId, req.user);
    }
    rejectPolicy(policyId, req) {
        return this.payrollConfigurationService.rejectPolicy(policyId, req.user);
    }
    submitPolicy(policyId, req) {
        return this.payrollConfigurationService.submaitForApproval(policyId, req.user);
    }
    delete(id) {
        return this.payrollConfigurationService.deletePolicy(id);
    }
};
exports.PayrollPolicyController = PayrollPolicyController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPayrollPolicy_dto_1.CreatePayrollPolicyDto, Object]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatePayrollPolicy_dto_1.UpdatePayrollPolicyDto, Object]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "updatePolicy", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "approvePolicy", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "rejectPolicy", null);
__decorate([
    (0, common_1.Post)(':id/publish'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "submitPolicy", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollPolicyController.prototype, "delete", null);
exports.PayrollPolicyController = PayrollPolicyController = __decorate([
    (0, common_1.Controller)('payroll-policy'),
    (0, common_1.UseGuards)(roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_configuration_service_1.PayrollConfigurationService])
], PayrollPolicyController);
//# sourceMappingURL=payroll-policy.controller.js.map