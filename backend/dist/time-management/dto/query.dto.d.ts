import { CorrectionRequestStatus, TimeExceptionType, TimeExceptionStatus, ShiftAssignmentStatus, HolidayType } from '../models/enums';
export declare class AttendanceRecordQueryDto {
    employeeId?: string;
    startDate?: string;
    endDate?: string;
    finalisedForPayroll?: boolean;
}
export declare class CorrectionRequestQueryDto {
    employeeId?: string;
    status?: CorrectionRequestStatus;
}
export declare class TimeExceptionQueryDto {
    employeeId?: string;
    type?: TimeExceptionType;
    status?: TimeExceptionStatus;
    assignedTo?: string;
}
export declare class ShiftAssignmentQueryDto {
    employeeId?: string;
    departmentId?: string;
    positionId?: string;
    shiftId?: string;
    status?: ShiftAssignmentStatus;
    startDate?: string;
    endDate?: string;
}
export declare class HolidayQueryDto {
    type?: HolidayType;
    startDate?: string;
    endDate?: string;
    active?: boolean;
}
export declare class NotificationLogQueryDto {
    to?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
}
