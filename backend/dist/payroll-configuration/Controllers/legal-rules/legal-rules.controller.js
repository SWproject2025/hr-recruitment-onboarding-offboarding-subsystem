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
exports.LegalRulesController = void 0;
const common_1 = require("@nestjs/common");
const payroll_configuration_service_1 = require("../../payroll-configuration.service");
const roles_decorator_1 = require("../../../Common/Decorators/roles.decorator");
const roles_gaurd_1 = require("../../../Common/Gaurds/roles.gaurd");
const employee_profile_enums_1 = require("../../../employee-profile/enums/employee-profile.enums");
const updateLegal_dto_1 = require("../../dtos/updateLegal.dto");
const createLegal_dto_1 = require("../../dtos/createLegal.dto");
const createTaxRules_dto_1 = require("../../dtos/createTaxRules.dto");
const updateTaxRules_dto_1 = require("../../dtos/updateTaxRules.dto");
let LegalRulesController = class LegalRulesController {
    service;
    constructor(service) {
        this.service = service;
    }
    update(id, dto, req) {
        return this.service.updateLegalRule(id, dto, req.user._id);
    }
    getAll() {
        return this.service.findAllLegalRules();
    }
    getOne(id) {
        return this.service.findOneLegalRule(id);
    }
    create(dto, req) {
        return this.service.createLegalRule(dto, req.user._id);
    }
    delete(id) {
        return this.service.deleteLegalRule(id);
    }
    createTaxRule(dto, req) {
        return this.service.createTaxRules(dto, req.user._id);
    }
    updateTaxRule(id, dto, req) {
        return this.service.updateTaxRule(id, dto, req.user._id);
    }
    deleteTaxRule(id) {
        return this.service.deleteTaxRule(id);
    }
};
exports.LegalRulesController = LegalRulesController;
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateLegal_dto_1.updateLegalDto, Object]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createLegal_dto_1.createLegalDto, Object]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTaxRules_dto_1.CreateTaxRuleDto, Object]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "createTaxRule", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateTaxRules_dto_1.UpdateTaxRuleDto, Object]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "updateTaxRule", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LegalRulesController.prototype, "deleteTaxRule", null);
exports.LegalRulesController = LegalRulesController = __decorate([
    (0, common_1.Controller)('legal-rules'),
    (0, common_1.UseGuards)(roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_configuration_service_1.PayrollConfigurationService])
], LegalRulesController);
//# sourceMappingURL=legal-rules.controller.js.map