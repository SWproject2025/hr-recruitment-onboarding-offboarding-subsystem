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
exports.EmployeeProfileController = void 0;
const common_1 = require("@nestjs/common");
const employee_profile_service_1 = require("./employee-profile.service");
const update_contact_dto_1 = require("./dto/update-contact.dto");
const change_request_dto_1 = require("./dto/change-request.dto");
let EmployeeProfileController = class EmployeeProfileController {
    employeeProfileService;
    constructor(employeeProfileService) {
        this.employeeProfileService = employeeProfileService;
    }
    async getProfile(id) {
        return this.employeeProfileService.getProfile(id);
    }
    async updateContactInfo(id, dto, req) {
        return this.employeeProfileService.updateContactInfo(id, dto);
    }
    async submitChangeRequest(id, dto) {
        return this.employeeProfileService.submitChangeRequest(id, dto.changes, dto.reason);
    }
    async getTeam(managerId) {
        return this.employeeProfileService.getTeamProfiles(managerId);
    }
    async approveRequest(requestId, adminId) {
        return this.employeeProfileService.approveChangeRequest(requestId);
    }
    async adminUpdate(id, dto, req) {
        return this.employeeProfileService.adminUpdateProfile(id, dto);
    }
};
exports.EmployeeProfileController = EmployeeProfileController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)(':id/contact'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_dto_1.UpdateContactDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "updateContactInfo", null);
__decorate([
    (0, common_1.Post)(':id/change-request'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_request_dto_1.CreateChangeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "submitChangeRequest", null);
__decorate([
    (0, common_1.Get)('team/:managerId'),
    __param(0, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Post)('change-request/:requestId/approve'),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, common_1.Param)('adminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "approveRequest", null);
__decorate([
    (0, common_1.Put)('admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "adminUpdate", null);
exports.EmployeeProfileController = EmployeeProfileController = __decorate([
    (0, common_1.Controller)('employee-profile'),
    __metadata("design:paramtypes", [employee_profile_service_1.EmployeeProfileService])
], EmployeeProfileController);
//# sourceMappingURL=employee-profile.controller.js.map