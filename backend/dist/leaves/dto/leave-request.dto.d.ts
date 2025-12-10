export declare class CreateLeaveRequestDto {
    leaveTypeId: string;
    fromDate: string;
    toDate: string;
    justification: string;
    attachmentId?: string;
}
export declare class UpdateLeaveRequestDto {
    leaveTypeId?: string;
    fromDate?: string;
    toDate?: string;
    justification?: string;
    attachmentId?: string;
}
export declare class ApproveLeaveRequestDto {
    comments?: string;
}
export declare class RejectLeaveRequestDto {
    reason: string;
}
export declare class LeaveBalanceQueryDto {
    leaveTypeId?: string;
}
