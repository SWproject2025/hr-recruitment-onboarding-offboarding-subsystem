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
exports.PerformanceController = void 0;
const common_1 = require("@nestjs/common");
const performance_service_1 = require("./performance.service");
const create_appraisal_template_dto_1 = require("./dto/create-appraisal-template.dto");
const update_appraisal_template_dto_1 = require("./dto/update-appraisal-template.dto");
const create_appraisal_cycle_dto_1 = require("./dto/create-appraisal-cycle.dto");
const submit_appraisal_dto_1 = require("./dto/submit-appraisal.dto");
const ResolveDisputeDto_1 = require("./dto/ResolveDisputeDto");
let PerformanceController = class PerformanceController {
    performanceService;
    constructor(performanceService) {
        this.performanceService = performanceService;
    }
    createTemplate(dto) {
        return this.performanceService.createTemplate(dto);
    }
    getAllTemplates() {
        return this.performanceService.getAllTemplates();
    }
    getTemplateById(id) {
        return this.performanceService.getTemplateById(id);
    }
    updateTemplate(id, dto) {
        return this.performanceService.updateTemplate(id, dto);
    }
    createCycle(dto) {
        return this.performanceService.createCycle(dto);
    }
    getAllCycles() {
        return this.performanceService.getAllCycles();
    }
    getCycleById(id) {
        return this.performanceService.getCycleById(id);
    }
    getManagerAssignments(managerProfileId, cycleId) {
        return this.performanceService.getAssignmentsForManager(managerProfileId, cycleId);
    }
    getManagerAssignmentDetails(assignmentId) {
        return this.performanceService.getAssignmentDetailsForManager(assignmentId);
    }
    submitManagerAppraisal(assignmentId, dto) {
        return this.performanceService.submitManagerAppraisal(assignmentId, dto);
    }
    publishAppraisal(assignmentId) {
        return this.performanceService.publishAppraisal(assignmentId);
    }
    getEmployeeAppraisals(employeeProfileId, cycleId) {
        return this.performanceService.getAppraisalsForEmployee(employeeProfileId, cycleId);
    }
    getEmployeeAppraisal(assignmentId) {
        return this.performanceService.getEmployeeAppraisal(assignmentId);
    }
    acknowledgeAppraisal(assignmentId) {
        return this.performanceService.acknowledgeAppraisal(assignmentId);
    }
    submitDispute(assignmentId, dto) {
        return this.performanceService.submitDispute(assignmentId, dto.employeeProfileId, { reason: dto.reason, employeeComments: dto.employeeComments });
    }
    resolveDispute(disputeId, dto) {
        return this.performanceService.resolveDispute(disputeId, dto);
    }
};
exports.PerformanceController = PerformanceController;
__decorate([
    (0, common_1.Post)('templates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appraisal_template_dto_1.CreateAppraisalTemplateDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAllTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Patch)('templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appraisal_template_dto_1.UpdateAppraisalTemplateDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Post)('cycles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appraisal_cycle_dto_1.CreateAppraisalCycleDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createCycle", null);
__decorate([
    (0, common_1.Get)('cycles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAllCycles", null);
__decorate([
    (0, common_1.Get)('cycles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getCycleById", null);
__decorate([
    (0, common_1.Get)('manager/:managerProfileId/assignments'),
    __param(0, (0, common_1.Param)('managerProfileId')),
    __param(1, (0, common_1.Query)('cycleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getManagerAssignments", null);
__decorate([
    (0, common_1.Get)('manager/assignments/:assignmentId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getManagerAssignmentDetails", null);
__decorate([
    (0, common_1.Post)('manager/assignments/:assignmentId/submit'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_appraisal_dto_1.SubmitAppraisalDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "submitManagerAppraisal", null);
__decorate([
    (0, common_1.Post)('hr/assignments/:assignmentId/publish'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "publishAppraisal", null);
__decorate([
    (0, common_1.Get)('employee/:employeeProfileId/appraisals'),
    __param(0, (0, common_1.Param)('employeeProfileId')),
    __param(1, (0, common_1.Query)('cycleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getEmployeeAppraisals", null);
__decorate([
    (0, common_1.Get)('employee/appraisals/:assignmentId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getEmployeeAppraisal", null);
__decorate([
    (0, common_1.Post)('employee/appraisals/:assignmentId/acknowledge'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "acknowledgeAppraisal", null);
__decorate([
    (0, common_1.Post)('employee/appraisals/:assignmentId/dispute'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "submitDispute", null);
__decorate([
    (0, common_1.Post)('hr/disputes/:disputeId/resolve'),
    __param(0, (0, common_1.Param)('disputeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ResolveDisputeDto_1.ResolveDisputeDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "resolveDispute", null);
exports.PerformanceController = PerformanceController = __decorate([
    (0, common_1.Controller)('performance'),
    __metadata("design:paramtypes", [performance_service_1.PerformanceService])
], PerformanceController);
//# sourceMappingURL=performance.controller.js.map