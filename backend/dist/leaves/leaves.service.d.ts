import { Model, Types } from 'mongoose';
import { LeaveRequest, LeaveRequestDocument } from './models/leave-request.schema';
import { LeaveTypeDocument } from './models/leave-type.schema';
import { LeaveEntitlementDocument } from './models/leave-entitlement.schema';
import { LeavePolicyDocument } from './models/leave-policy.schema';
import { LeaveAdjustment, LeaveAdjustmentDocument } from './models/leave-adjustment.schema';
import { CalendarDocument } from './models/calendar.schema';
import { LeaveStatus } from './enums/leave-status.enum';
import { CreateLeaveRequestDto, ApproveLeaveRequestDto, RejectLeaveRequestDto } from './dto/leave-request.dto';
export declare class LeavesService {
    private leaveRequestModel;
    private leaveTypeModel;
    private leaveEntitlementModel;
    private leavePolicyModel;
    private leaveAdjustmentModel;
    private calendarModel;
    constructor(leaveRequestModel: Model<LeaveRequestDocument>, leaveTypeModel: Model<LeaveTypeDocument>, leaveEntitlementModel: Model<LeaveEntitlementDocument>, leavePolicyModel: Model<LeavePolicyDocument>, leaveAdjustmentModel: Model<LeaveAdjustmentDocument>, calendarModel: Model<CalendarDocument>);
    createLeaveRequest(employeeId: string, createDto: CreateLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    getEmployeeLeaveRequests(employeeId: string, filters?: {
        status?: LeaveStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        requests: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getEmployeeLeaveBalance(employeeId: string, leaveTypeId?: string): Promise<{
        leaveType: Types.ObjectId;
        yearlyEntitlement: number;
        accruedActual: number;
        accruedRounded: number;
        carryForward: number;
        taken: number;
        pending: number;
        remaining: number;
        lastAccrualDate: Date | undefined;
        nextResetDate: Date | undefined;
    }[]>;
    cancelLeaveRequest(employeeId: string, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getPendingLeaveRequests(managerId: string, filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        requests: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByManager(requestId: string, managerId: string, approveDto: ApproveLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    rejectLeaveRequestByManager(requestId: string, managerId: string, rejectDto: RejectLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllLeaveRequestsForHR(filters?: {
        status?: LeaveStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        requests: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByHR(requestId: string, hrAdminId: string, approveDto: ApproveLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    overrideLeaveRequestByHR(requestId: string, hrAdminId: string, approveDto: ApproveLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    createLeaveAdjustment(employeeId: string, leaveTypeId: string, adjustmentType: string, amount: number, reason: string, hrUserId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveAdjustment, {}, {}> & LeaveAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    private calculateLeaveDuration;
    private checkLeaveEligibility;
    private checkOverlappingLeaves;
    processLeaveAccrual(employeeId: string, leaveTypeId: string): Promise<void>;
    processYearEndCarryForward(employeeId: string, leaveTypeId: string): Promise<void>;
}
