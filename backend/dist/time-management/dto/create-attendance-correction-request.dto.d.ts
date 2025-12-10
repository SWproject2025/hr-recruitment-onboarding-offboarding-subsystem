import { CorrectionRequestStatus } from '../models/enums';
export declare class CreateAttendanceCorrectionRequestDto {
    employeeId: string;
    attendanceRecord: string;
    reason?: string;
    status?: CorrectionRequestStatus;
}
