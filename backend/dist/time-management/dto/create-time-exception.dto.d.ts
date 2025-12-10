import { TimeExceptionType, TimeExceptionStatus } from '../models/enums';
export declare class CreateTimeExceptionDto {
    employeeId: string;
    type: TimeExceptionType;
    attendanceRecordId: string;
    assignedTo: string;
    status?: TimeExceptionStatus;
    reason?: string;
}
