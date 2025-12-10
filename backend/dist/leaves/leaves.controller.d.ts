import { LeavesService } from './leaves.service';
import type { CurrentUserData } from '../auth/decorators/current-user.decorator';
import { CreateLeaveRequestDto, UpdateLeaveRequestDto, ApproveLeaveRequestDto, RejectLeaveRequestDto, LeaveBalanceQueryDto } from './dto/leave-request.dto';
import { LeaveStatus } from '../enums/leave-status.enum';
export declare class LeavesController {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    createLeaveRequest(user: CurrentUserData, createDto: CreateLeaveRequestDto): Promise<any>;
    getMyLeaveRequests(user: CurrentUserData, status?: LeaveStatus, page?: string, limit?: string): Promise<{
        requests: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getMyLeaveBalance(user: CurrentUserData, query: LeaveBalanceQueryDto): Promise<{
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
    getLeaveRequestDetails(user: CurrentUserData, requestId: string): Promise<any>;
    cancelLeaveRequest(user: CurrentUserData, requestId: string): Promise<any>;
    updateLeaveRequest(user: CurrentUserData, requestId: string, updateDto: UpdateLeaveRequestDto): Promise<any>;
    getPendingLeaveRequests(user: CurrentUserData, page?: string, limit?: string): Promise<{
        requests: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByManager(user: CurrentUserData, requestId: string, approveDto: ApproveLeaveRequestDto): Promise<any>;
    rejectLeaveRequestByManager(user: CurrentUserData, requestId: string, rejectDto: RejectLeaveRequestDto): Promise<any>;
    delegateLeaveApproval(user: CurrentUserData, requestId: string, delegateToManagerId: string): Promise<{
        message: string;
        requestId: string;
        delegatedTo: string;
    }>;
    getAllLeaveRequestsForHR(status?: LeaveStatus, page?: string, limit?: string): Promise<{
        requests: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveLeaveRequestByHR(user: CurrentUserData, requestId: string, approveDto: ApproveLeaveRequestDto): Promise<any>;
    overrideLeaveRequestByHR(user: CurrentUserData, requestId: string, approveDto: ApproveLeaveRequestDto): Promise<any>;
    validateLeaveDocuments(user: CurrentUserData, requestId: string, isValid: boolean, comments?: string): Promise<{
        message: string;
        requestId: string;
        isValid: boolean;
        comments: string | undefined;
    }>;
    createLeaveAdjustment(user: CurrentUserData, employeeId: string, leaveTypeId: string, adjustmentType: string, amount: number, reason: string): Promise<any>;
    getEmployeeLeaveBalanceForHR(employeeId: string, query: LeaveBalanceQueryDto): Promise<{
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
