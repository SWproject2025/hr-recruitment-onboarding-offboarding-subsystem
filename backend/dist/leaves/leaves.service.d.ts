import { Model } from 'mongoose';
import { LeaveRequestDocument } from './leave-request.schema';
import { LeaveTypeDocument } from './leave-type.schema';
import { LeaveEntitlementDocument } from './leave-entitlement.schema';
import { LeavePolicyDocument } from './leave-policy.schema';
import { LeaveAdjustmentDocument } from './leave-adjustment.schema';
import { CalendarDocument } from './calendar.schema';
import { LeaveStatus } from '../enums/leave-status.enum';
import { CreateLeaveRequestDto, ApproveLeaveRequestDto, RejectLeaveRequestDto } from './dto/leave-request.dto';
export declare class LeavesService {
    private leaveRequestModel;
    private leaveTypeModel;
    private leaveEntitlementModel;
    private leavePolicyModel;
    private leaveAdjustmentModel;
    private calendarModel;
    constructor(leaveRequestModel: Model<LeaveRequestDocument>, leaveTypeModel: Model<LeaveTypeDocument>, leaveEntitlementModel: Model<LeaveEntitlementDocument>, leavePolicyModel: Model<LeavePolicyDocument>, leaveAdjustmentModel: Model<LeaveAdjustmentDocument>, calendarModel: Model<CalendarDocument>);
    createLeaveRequest(employeeId: string, createDto: CreateLeaveRequestDto): Promise<any>;
    getEmployeeLeaveRequests(employeeId: string, filters?: {
        status?: LeaveStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        requests: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getEmployeeLeaveBalance(employeeId: string, leaveTypeId?: string): Promise<{
        leaveType: any;
        yearlyEntitlement: any;
        accruedActual: any;
        accruedRounded: any;
        carryForward: any;
        taken: any;
        pending: any;
        remaining: any;
        lastAccrualDate: any;
        nextResetDate: any;
    }[]>;
    cancelLeaveRequest(employeeId: string, requestId: string): Promise<any>;
    getPendingLeaveRequests(managerId: string, filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        requests: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByManager(requestId: string, managerId: string, approveDto: ApproveLeaveRequestDto): Promise<any>;
    rejectLeaveRequestByManager(requestId: string, managerId: string, rejectDto: RejectLeaveRequestDto): Promise<any>;
    getAllLeaveRequestsForHR(filters?: {
        status?: LeaveStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        requests: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByHR(requestId: string, hrAdminId: string, approveDto: ApproveLeaveRequestDto): Promise<any>;
    overrideLeaveRequestByHR(requestId: string, hrAdminId: string, approveDto: ApproveLeaveRequestDto): Promise<any>;
    createLeaveAdjustment(employeeId: string, leaveTypeId: string, adjustmentType: string, amount: number, reason: string, hrUserId: string): Promise<any>;
    private calculateLeaveDuration;
    private checkLeaveEligibility;
    private checkOverlappingLeaves;
    processLeaveAccrual(employeeId: string, leaveTypeId: string): Promise<void>;
    processYearEndCarryForward(employeeId: string, leaveTypeId: string): Promise<void>;
}
