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
exports.OrganizationStructureController = void 0;
const common_1 = require("@nestjs/common");
const organization_structure_service_1 = require("./organization-structure.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const create_position_dto_1 = require("./dto/create-position.dto");
const update_position_dto_1 = require("./dto/update-position.dto");
const create_job_requisition_dto_1 = require("./dto/create-job-requisition.dto");
const update_job_requisition_dto_1 = require("./dto/update-job-requisition.dto");
let OrganizationStructureController = class OrganizationStructureController {
    organizationStructureService;
    constructor(organizationStructureService) {
        this.organizationStructureService = organizationStructureService;
    }
    createDepartment(dto) {
        return this.organizationStructureService.createDepartment(dto);
    }
    listDepartments() {
        return this.organizationStructureService.listDepartments();
    }
    getDepartment(id) {
        return this.organizationStructureService.getDepartmentById(id);
    }
    updateDepartment(id, dto) {
        return this.organizationStructureService.updateDepartment(id, dto);
    }
    deactivateDepartment(id) {
        return this.organizationStructureService.deactivateDepartment(id);
    }
    createPosition(dto) {
        return this.organizationStructureService.createPosition(dto);
    }
    listPositions() {
        return this.organizationStructureService.listPositions();
    }
    getPosition(id) {
        return this.organizationStructureService.getPositionById(id);
    }
    updatePosition(id, dto) {
        return this.organizationStructureService.updatePosition(id, dto);
    }
    deactivatePosition(id) {
        return this.organizationStructureService.deactivatePosition(id);
    }
    createJobRequisition(dto) {
        return this.organizationStructureService.createJobRequisition(dto);
    }
    listJobRequisitions() {
        return this.organizationStructureService.listJobRequisitions();
    }
    getJobRequisition(id) {
        return this.organizationStructureService.getJobRequisitionById(id);
    }
    updateJobRequisition(id, dto) {
        return this.organizationStructureService.updateJobRequisition(id, dto);
    }
    closeJobRequisition(id) {
        return this.organizationStructureService.closeJobRequisition(id);
    }
};
exports.OrganizationStructureController = OrganizationStructureController;
__decorate([
    (0, common_1.Post)('departments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Get)('departments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "listDepartments", null);
__decorate([
    (0, common_1.Get)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Post)('departments/:id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "deactivateDepartment", null);
__decorate([
    (0, common_1.Post)('positions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_position_dto_1.CreatePositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createPosition", null);
__decorate([
    (0, common_1.Get)('positions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "listPositions", null);
__decorate([
    (0, common_1.Get)('positions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getPosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_position_dto_1.UpdatePositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updatePosition", null);
__decorate([
    (0, common_1.Post)('positions/:id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "deactivatePosition", null);
__decorate([
    (0, common_1.Post)('job-requisitions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_requisition_dto_1.CreateJobRequisitionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createJobRequisition", null);
__decorate([
    (0, common_1.Get)('job-requisitions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "listJobRequisitions", null);
__decorate([
    (0, common_1.Get)('job-requisitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getJobRequisition", null);
__decorate([
    (0, common_1.Patch)('job-requisitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_requisition_dto_1.UpdateJobRequisitionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updateJobRequisition", null);
__decorate([
    (0, common_1.Post)('job-requisitions/:id/close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "closeJobRequisition", null);
exports.OrganizationStructureController = OrganizationStructureController = __decorate([
    (0, common_1.Controller)('organization-structure'),
    __metadata("design:paramtypes", [organization_structure_service_1.OrganizationStructureService])
], OrganizationStructureController);
//# sourceMappingURL=organization-structure.controller.js.map