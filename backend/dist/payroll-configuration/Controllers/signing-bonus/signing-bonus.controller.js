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
exports.SigningBonusController = void 0;
const common_1 = require("@nestjs/common");
const payroll_configuration_service_1 = require("../../payroll-configuration.service");
const roles_decorator_1 = require("../../../Common/Decorators/roles.decorator");
const roles_gaurd_1 = require("../../../Common/Gaurds/roles.gaurd");
const employee_profile_enums_1 = require("../../../employee-profile/enums/employee-profile.enums");
const createSigningBonus_dto_1 = require("../../dtos/createSigningBonus.dto");
const updateSigningBonus_dto_1 = require("../../dtos/updateSigningBonus.dto");
let SigningBonusController = class SigningBonusController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, req) {
        return this.service.createSigningBonus(dto, req.user._id);
    }
    update(id, dto, req) {
        return this.service.updateSigningBonus(id, dto, req.user._id);
    }
    getAll() {
        return this.service.findAllSigningBonuses();
    }
    getOne(id) {
        return this.service.findOneSigningBonus(id);
    }
};
exports.SigningBonusController = SigningBonusController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSigningBonus_dto_1.CreateSigningBonusDto, Object]),
    __metadata("design:returntype", void 0)
], SigningBonusController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateSigningBonus_dto_1.UpdateSigningBonusDto, Object]),
    __metadata("design:returntype", void 0)
], SigningBonusController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SigningBonusController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SigningBonusController.prototype, "getOne", null);
exports.SigningBonusController = SigningBonusController = __decorate([
    (0, common_1.Controller)('signing-bonus'),
    (0, common_1.UseGuards)(roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_configuration_service_1.PayrollConfigurationService])
], SigningBonusController);
//# sourceMappingURL=signing-bonus.controller.js.map