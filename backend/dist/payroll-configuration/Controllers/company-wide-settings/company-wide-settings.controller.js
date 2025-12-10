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
exports.CompanyWideSettingsController = void 0;
const common_1 = require("@nestjs/common");
const payroll_configuration_service_1 = require("../../payroll-configuration.service");
const roles_decorator_1 = require("../../../Common/Decorators/roles.decorator");
const roles_gaurd_1 = require("../../../Common/Gaurds/roles.gaurd");
const employee_profile_enums_1 = require("../../../employee-profile/enums/employee-profile.enums");
const createCompanyWideSetting_dto_1 = require("../../dtos/createCompanyWideSetting.dto");
const updateCompanyWideSetting_dto_1 = require("../../dtos/updateCompanyWideSetting.dto");
let CompanyWideSettingsController = class CompanyWideSettingsController {
    service;
    constructor(service) {
        this.service = service;
    }
    update(id, updateCompanyWideSettingDto) {
        return this.service.updateCompanyWideSeting(id, updateCompanyWideSettingDto);
    }
    get() {
        return this.service.findAllCompanyWideSettings();
    }
    getOne(id) {
        return this.service.findOneCompanyWideSetting(id);
    }
    create(createCompanyWideSettingDto, id) {
        return this.service.createCompanyWideSeting(createCompanyWideSettingDto, id);
    }
};
exports.CompanyWideSettingsController = CompanyWideSettingsController;
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateCompanyWideSetting_dto_1.UpdateCompanyWideSettingDto]),
    __metadata("design:returntype", void 0)
], CompanyWideSettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyWideSettingsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyWideSettingsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCompanyWideSetting_dto_1.CreateCompanyWideSettingDto, String]),
    __metadata("design:returntype", void 0)
], CompanyWideSettingsController.prototype, "create", null);
exports.CompanyWideSettingsController = CompanyWideSettingsController = __decorate([
    (0, common_1.Controller)('company-wide-settings'),
    (0, common_1.UseGuards)(roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_configuration_service_1.PayrollConfigurationService])
], CompanyWideSettingsController);
//# sourceMappingURL=company-wide-settings.controller.js.map