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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcDraftController = void 0;
const common_1 = require("@nestjs/common");
const calc_draft_service_1 = require("./calc-draft.service");
const create_calc_draft_dto_1 = require("./dto/create-calc-draft.dto");
const update_calc_draft_dto_1 = require("./dto/update-calc-draft.dto");
const payroll_execution_enum_1 = require("../enums/payroll-execution-enum");
const mongoose_1 = __importDefault(require("mongoose"));
let CalcDraftController = class CalcDraftController {
    calcDraftService;
    constructor(calcDraftService) {
        this.calcDraftService = calcDraftService;
    }
    createPayrollDraft(createCalcDraftDto) {
        return this.calcDraftService.createPayrollRun(createCalcDraftDto);
    }
    async processDraftGeneration(id, employeeData) {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        return this.calcDraftService.processDraftGeneration(objectId, employeeData);
    }
    updateDraft(id, updateCalcDraftDto) {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const updateData = updateCalcDraftDto;
        return this.calcDraftService.updateRunStatus(objectId, payroll_execution_enum_1.PayRollStatus.DRAFT);
    }
    updateDraftStatus(id, statusDto) {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        return this.calcDraftService.updateRunStatus(objectId, statusDto.status);
    }
    addPenalty(employeeId, addPenaltyDto) {
        return { message: 'Penalty added', employeeId, penalty: addPenaltyDto.penalty };
    }
    getExceptionsByDraft(draftId) {
        const objectId = new mongoose_1.default.Types.ObjectId(draftId);
        return this.calcDraftService.getExceptionsByRun(objectId);
    }
    recalculateEmployeeSalary(draftId, employeeId, employeeData) {
        const draftObjectId = new mongoose_1.default.Types.ObjectId(draftId);
        const employeeObjectId = new mongoose_1.default.Types.ObjectId(employeeId);
        return this.calcDraftService.recalculateEmployeeSalary(draftObjectId, employeeObjectId, employeeData);
    }
    generatePayslip(draftId, employeeId) {
        const draftObjectId = new mongoose_1.default.Types.ObjectId(draftId);
        const employeeObjectId = new mongoose_1.default.Types.ObjectId(employeeId);
        return this.calcDraftService.generatePayslip(draftObjectId, employeeObjectId);
    }
    async getSalaryBreakdown(employeeId) {
        return {
            message: 'Salary breakdown endpoint',
            employeeId
        };
    }
    calculateGrossSalary(employeeData) {
        return this.calcDraftService.calculateGrossSalary(employeeData);
    }
    calculateNetSalary(employeeData) {
        return this.calcDraftService.calculateNetSalary(employeeData);
    }
    calculateFinalSalary(employeeData) {
        return this.calcDraftService.calculateFinalSalary(employeeData);
    }
    getAllPayrollDrafts(status) {
        return {
            message: 'Get all payroll drafts',
            filter: status ? { status } : 'all'
        };
    }
    deletePayrollDraft(id) {
        return {
            message: 'Payroll draft deleted',
            id
        };
    }
    flagDraftAnomalies(id) {
        return {
            message: 'Anomaly detection triggered',
            draftId: id
        };
    }
};
exports.CalcDraftController = CalcDraftController;
__decorate([
    (0, common_1.Post)('draft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calc_draft_dto_1.CreateCalcDraftDto]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "createPayrollDraft", null);
__decorate([
    (0, common_1.Post)('draft/:id/process'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], CalcDraftController.prototype, "processDraftGeneration", null);
__decorate([
    (0, common_1.Patch)('draft/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_calc_draft_dto_1.UpdateCalcDraftDto]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "updateDraft", null);
__decorate([
    (0, common_1.Patch)('draft/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "updateDraftStatus", null);
__decorate([
    (0, common_1.Post)('employee/:employeeId/penalty'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "addPenalty", null);
__decorate([
    (0, common_1.Get)('draft/:draftId/exceptions'),
    __param(0, (0, common_1.Param)('draftId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "getExceptionsByDraft", null);
__decorate([
    (0, common_1.Post)('draft/:draftId/employee/:employeeId/recalculate'),
    __param(0, (0, common_1.Param)('draftId')),
    __param(1, (0, common_1.Param)('employeeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "recalculateEmployeeSalary", null);
__decorate([
    (0, common_1.Post)('draft/:draftId/employee/:employeeId/payslip'),
    __param(0, (0, common_1.Param)('draftId')),
    __param(1, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "generatePayslip", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId/salary-breakdown'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CalcDraftController.prototype, "getSalaryBreakdown", null);
__decorate([
    (0, common_1.Post)('calculate/gross'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "calculateGrossSalary", null);
__decorate([
    (0, common_1.Post)('calculate/net'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "calculateNetSalary", null);
__decorate([
    (0, common_1.Post)('calculate/final'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "calculateFinalSalary", null);
__decorate([
    (0, common_1.Get)('drafts'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "getAllPayrollDrafts", null);
__decorate([
    (0, common_1.Delete)('draft/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "deletePayrollDraft", null);
__decorate([
    (0, common_1.Post)('draft/:id/flag-anomalies'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalcDraftController.prototype, "flagDraftAnomalies", null);
exports.CalcDraftController = CalcDraftController = __decorate([
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [calc_draft_service_1.CalcDraftService])
], CalcDraftController);
//# sourceMappingURL=calc-draft.controller.js.map