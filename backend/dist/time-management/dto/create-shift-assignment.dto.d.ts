import { ShiftAssignmentStatus } from '../models/enums';
export declare class CreateShiftAssignmentDto {
    employeeId?: string;
    departmentId?: string;
    positionId?: string;
    shiftId: string;
    scheduleRuleId?: string;
    startDate: Date;
    endDate?: Date;
    status?: ShiftAssignmentStatus;
}
