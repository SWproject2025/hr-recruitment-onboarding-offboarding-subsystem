"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppraisalCycleDto = exports.SeedAssignmentDto = exports.CycleTemplateAssignmentDto = void 0;
class CycleTemplateAssignmentDto {
    templateId;
    departmentIds;
}
exports.CycleTemplateAssignmentDto = CycleTemplateAssignmentDto;
class SeedAssignmentDto {
    employeeProfileId;
    managerProfileId;
    templateId;
}
exports.SeedAssignmentDto = SeedAssignmentDto;
class CreateAppraisalCycleDto {
    name;
    description;
    cycleType;
    startDate;
    endDate;
    managerDueDate;
    employeeAcknowledgementDueDate;
    templateAssignments;
    seedingAssignments;
}
exports.CreateAppraisalCycleDto = CreateAppraisalCycleDto;
//# sourceMappingURL=create-appraisal-cycle.dto.js.map