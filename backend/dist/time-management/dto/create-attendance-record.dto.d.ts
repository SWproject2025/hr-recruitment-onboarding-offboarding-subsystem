import { PunchType } from '../models/enums';
export declare class PunchDto {
    type: PunchType;
    time: Date;
}
export declare class CreateAttendanceRecordDto {
    employeeId: string;
    punches?: PunchDto[];
    totalWorkMinutes?: number;
    hasMissedPunch?: boolean;
    exceptionIds?: string[];
    finalisedForPayroll?: boolean;
}
