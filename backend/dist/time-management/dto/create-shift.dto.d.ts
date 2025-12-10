import { PunchPolicy } from '../models/enums';
export declare class CreateShiftDto {
    name: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    punchPolicy?: PunchPolicy;
    graceInMinutes?: number;
    graceOutMinutes?: number;
    requiresApprovalForOvertime?: boolean;
    active?: boolean;
}
