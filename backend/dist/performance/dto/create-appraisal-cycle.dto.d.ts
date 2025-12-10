import { AppraisalTemplateType } from '../enums/performance.enums';
export declare class CycleTemplateAssignmentDto {
    templateId: string;
    departmentIds?: string[];
}
export declare class SeedAssignmentDto {
    employeeProfileId: string;
    managerProfileId: string;
    templateId: string;
}
export declare class CreateAppraisalCycleDto {
    name: string;
    description?: string;
    cycleType: AppraisalTemplateType;
    startDate: string;
    endDate: string;
    managerDueDate?: string;
    employeeAcknowledgementDueDate?: string;
    templateAssignments?: CycleTemplateAssignmentDto[];
    seedingAssignments?: SeedAssignmentDto[];
}
