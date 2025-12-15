import { LeavesService } from './leaves.service';
import type { CurrentUserData } from '../Common/Decorators/current-user.decorator';
import { CreateLeaveRequestDto, UpdateLeaveRequestDto, ApproveLeaveRequestDto, RejectLeaveRequestDto, LeaveBalanceQueryDto } from './dto/leave-request.dto';
import { LeaveStatus } from './enums/leave-status.enum';
export declare class LeavesController {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    createLeaveRequest(user: CurrentUserData, createDto: CreateLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getMyLeaveRequests(user: CurrentUserData, status?: LeaveStatus, page?: string, limit?: string): Promise<{
        requests: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getMyLeaveBalance(user: CurrentUserData, query: LeaveBalanceQueryDto): Promise<{
        leaveType: import("mongoose").Types.ObjectId;
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
    getLeaveRequestDetails(user: CurrentUserData, requestId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    cancelLeaveRequest(user: CurrentUserData, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateLeaveRequest(user: CurrentUserData, requestId: string, updateDto: UpdateLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getPendingLeaveRequests(user: CurrentUserData, page?: string, limit?: string): Promise<{
        requests: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByManager(user: CurrentUserData, requestId: string, approveDto: ApproveLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    rejectLeaveRequestByManager(user: CurrentUserData, requestId: string, rejectDto: RejectLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    delegateLeaveApproval(user: CurrentUserData, requestId: string, delegateToManagerId: string): Promise<{
        message: string;
        requestId: string;
        delegatedTo: string;
    }>;
    getAllLeaveRequestsForHR(status?: LeaveStatus, page?: string, limit?: string): Promise<{
        requests: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByHR(user: CurrentUserData, requestId: string, approveDto: ApproveLeaveRequestDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    overrideLeaveRequestByHR(user: CurrentUserData, requestId: string, approveDto: ApproveLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    validateLeaveDocuments(user: CurrentUserData, requestId: string, isValid: boolean, comments?: string): Promise<{
        message: string;
        requestId: string;
        isValid: boolean;
        comments: string | undefined;
    }>;
    createLeaveAdjustment(user: CurrentUserData, employeeId: string, leaveTypeId: string, adjustmentType: string, amount: number, reason: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-adjustment.schema").LeaveAdjustment, {}, {}> & import("./models/leave-adjustment.schema").LeaveAdjustment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-adjustment.schema").LeaveAdjustment, {}, {}> & import("./models/leave-adjustment.schema").LeaveAdjustment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getEmployeeLeaveBalanceForHR(employeeId: string, query: LeaveBalanceQueryDto): Promise<{
        leaveType: import("mongoose").Types.ObjectId;
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
    processLeaveAccrual(employeeId: string, leaveTypeId: string): Promise<{
        message: string;
    }>;
    processYearEndCarryForward(employeeId: string, leaveTypeId: string): Promise<{
        message: string;
    }>;
    getAllLeaveTypes(): Promise<{
        message: string;
        leaveTypes: never[];
    }>;
    createLeaveType(code: string, name: string, categoryId: string, description?: string, paid?: boolean, deductible?: boolean): Promise<{
        message: string;
        code: string;
        name: string;
    }>;
    createLeavePolicy(leaveTypeId: string, accrualMethod: string, monthlyRate?: number, yearlyRate?: number, carryForwardAllowed?: boolean, maxCarryForward?: number): Promise<{
        message: string;
        leaveTypeId: string;
    }>;
    configureCalendar(year: number, holidays: any[], blockedPeriods?: any[]): Promise<{
        message: string;
        year: number;
    }>;
}
