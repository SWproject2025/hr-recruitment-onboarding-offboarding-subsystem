"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_request_schema_1 = require("./leave-request.schema");
const leave_type_schema_1 = require("./leave-type.schema");
const leave_entitlement_schema_1 = require("./leave-entitlement.schema");
const leave_policy_schema_1 = require("./leave-policy.schema");
const leave_adjustment_schema_1 = require("./leave-adjustment.schema");
const calendar_schema_1 = require("./calendar.schema");
const leave_status_enum_1 = require("../enums/leave-status.enum");
const accrual_method_enum_1 = require("../enums/accrual-method.enum");
let LeavesService = class LeavesService {
    leaveRequestModel;
    leaveTypeModel;
    leaveEntitlementModel;
    leavePolicyModel;
    leaveAdjustmentModel;
    calendarModel;
    constructor(leaveRequestModel, leaveTypeModel, leaveEntitlementModel, leavePolicyModel, leaveAdjustmentModel, calendarModel) {
        this.leaveRequestModel = leaveRequestModel;
        this.leaveTypeModel = leaveTypeModel;
        this.leaveEntitlementModel = leaveEntitlementModel;
        this.leavePolicyModel = leavePolicyModel;
        this.leaveAdjustmentModel = leaveAdjustmentModel;
        this.calendarModel = calendarModel;
    }
    async createLeaveRequest(employeeId, createDto) {
        const leaveType = await this.leaveTypeModel.findById(createDto.leaveTypeId);
        if (!leaveType) {
            throw new common_1.NotFoundException('Leave type not found');
        }
        const fromDate = new Date(createDto.fromDate);
        const toDate = new Date(createDto.toDate);
        const durationDays = await this.calculateLeaveDuration(fromDate, toDate);
        if (durationDays <= 0) {
            throw new common_1.BadRequestException('Invalid date range');
        }
        await this.checkLeaveEligibility(employeeId, createDto.leaveTypeId);
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(createDto.leaveTypeId),
        });
        if (!entitlement) {
            throw new common_1.BadRequestException('No leave entitlement found for this leave type');
        }
        const availableBalance = entitlement.remaining - entitlement.pending;
        if (durationDays > availableBalance) {
            throw new common_1.BadRequestException(`Insufficient leave balance. Available: ${availableBalance} days, Requested: ${durationDays} days`);
        }
        await this.checkOverlappingLeaves(employeeId, fromDate, toDate);
        const leaveRequest = new this.leaveRequestModel({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(createDto.leaveTypeId),
            dates: { from: fromDate, to: toDate },
            durationDays,
            justification: createDto.justification,
            attachmentId: createDto.attachmentId ? new mongoose_2.Types.ObjectId(createDto.attachmentId) : undefined,
            status: leave_status_enum_1.LeaveStatus.PENDING,
            approvalFlow: [
                {
                    role: 'line_manager',
                    status: leave_status_enum_1.LeaveStatus.PENDING,
                },
            ],
        });
        const savedRequest = await leaveRequest.save();
        entitlement.pending += durationDays;
        await entitlement.save();
        return savedRequest.populate([
            { path: 'leaveTypeId', select: 'code name' },
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async getEmployeeLeaveRequests(employeeId, filters) {
        const { status, page = 1, limit = 10 } = filters || {};
        const query = { employeeId: new mongoose_2.Types.ObjectId(employeeId) };
        if (status) {
            query.status = status;
        }
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            this.leaveRequestModel
                .find(query)
                .populate('leaveTypeId', 'code name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.leaveRequestModel.countDocuments(query),
        ]);
        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getEmployeeLeaveBalance(employeeId, leaveTypeId) {
        const query = { employeeId: new mongoose_2.Types.ObjectId(employeeId) };
        if (leaveTypeId) {
            query.leaveTypeId = new mongoose_2.Types.ObjectId(leaveTypeId);
        }
        const entitlements = await this.leaveEntitlementModel
            .find(query)
            .populate('leaveTypeId', 'code name paid deductible')
            .lean();
        return entitlements.map((ent) => ({
            leaveType: ent.leaveTypeId,
            yearlyEntitlement: ent.yearlyEntitlement,
            accruedActual: ent.accruedActual,
            accruedRounded: ent.accruedRounded,
            carryForward: ent.carryForward,
            taken: ent.taken,
            pending: ent.pending,
            remaining: ent.remaining,
            lastAccrualDate: ent.lastAccrualDate,
            nextResetDate: ent.nextResetDate,
        }));
    }
    async cancelLeaveRequest(employeeId, requestId) {
        const request = await this.leaveRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException('Leave request not found');
        }
        if (request.employeeId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('You can only cancel your own leave requests');
        }
        if (request.status !== leave_status_enum_1.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot cancel leave request with status: ${request.status}`);
        }
        request.status = leave_status_enum_1.LeaveStatus.CANCELLED;
        await request.save();
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: request.leaveTypeId,
        });
        if (entitlement) {
            entitlement.pending -= request.durationDays;
            await entitlement.save();
        }
        return request;
    }
    async getPendingLeaveRequests(managerId, filters) {
        const { page = 1, limit = 10 } = filters || {};
        const query = {
            status: leave_status_enum_1.LeaveStatus.PENDING,
            'approvalFlow.role': 'line_manager',
            'approvalFlow.status': leave_status_enum_1.LeaveStatus.PENDING,
        };
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            this.leaveRequestModel
                .find(query)
                .populate('leaveTypeId', 'code name')
                .populate('employeeId', 'employeeNumber firstName lastName')
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.leaveRequestModel.countDocuments(query),
        ]);
        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async approveLeaveRequestByManager(requestId, managerId, approveDto) {
        const request = await this.leaveRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException('Leave request not found');
        }
        if (request.status !== leave_status_enum_1.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot approve request with status: ${request.status}`);
        }
        const managerApproval = request.approvalFlow.find((flow) => flow.role === 'line_manager');
        if (managerApproval) {
            managerApproval.status = leave_status_enum_1.LeaveStatus.APPROVED;
            managerApproval.decidedBy = new mongoose_2.Types.ObjectId(managerId);
            managerApproval.decidedAt = new Date();
        }
        request.approvalFlow.push({
            role: 'hr_admin',
            status: leave_status_enum_1.LeaveStatus.PENDING,
        });
        await request.save();
        return request.populate([
            { path: 'leaveTypeId', select: 'code name' },
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async rejectLeaveRequestByManager(requestId, managerId, rejectDto) {
        const request = await this.leaveRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException('Leave request not found');
        }
        if (request.status !== leave_status_enum_1.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot reject request with status: ${request.status}`);
        }
        request.status = leave_status_enum_1.LeaveStatus.REJECTED;
        const managerApproval = request.approvalFlow.find((flow) => flow.role === 'line_manager');
        if (managerApproval) {
            managerApproval.status = leave_status_enum_1.LeaveStatus.REJECTED;
            managerApproval.decidedBy = new mongoose_2.Types.ObjectId(managerId);
            managerApproval.decidedAt = new Date();
        }
        await request.save();
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: request.employeeId,
            leaveTypeId: request.leaveTypeId,
        });
        if (entitlement) {
            entitlement.pending -= request.durationDays;
            await entitlement.save();
        }
        return request;
    }
    async getAllLeaveRequestsForHR(filters) {
        const { status, page = 1, limit = 10 } = filters || {};
        const query = {};
        if (status) {
            query.status = status;
        }
        else {
            query['approvalFlow.role'] = 'hr_admin';
            query['approvalFlow.status'] = leave_status_enum_1.LeaveStatus.PENDING;
        }
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            this.leaveRequestModel
                .find(query)
                .populate('leaveTypeId', 'code name')
                .populate('employeeId', 'employeeNumber firstName lastName')
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.leaveRequestModel.countDocuments(query),
        ]);
        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async approveLeaveRequestByHR(requestId, hrAdminId, approveDto) {
        const request = await this.leaveRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException('Leave request not found');
        }
        const managerApproval = request.approvalFlow.find((flow) => flow.role === 'line_manager');
        if (!managerApproval || managerApproval.status !== leave_status_enum_1.LeaveStatus.APPROVED) {
            throw new common_1.BadRequestException('Leave request must be approved by manager first');
        }
        const hrApproval = request.approvalFlow.find((flow) => flow.role === 'hr_admin');
        if (hrApproval) {
            hrApproval.status = leave_status_enum_1.LeaveStatus.APPROVED;
            hrApproval.decidedBy = new mongoose_2.Types.ObjectId(hrAdminId);
            hrApproval.decidedAt = new Date();
        }
        request.status = leave_status_enum_1.LeaveStatus.APPROVED;
        await request.save();
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: request.employeeId,
            leaveTypeId: request.leaveTypeId,
        });
        if (entitlement) {
            entitlement.pending -= request.durationDays;
            entitlement.taken += request.durationDays;
            entitlement.remaining = entitlement.accruedRounded + entitlement.carryForward - entitlement.taken;
            await entitlement.save();
        }
        return request.populate([
            { path: 'leaveTypeId', select: 'code name' },
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async overrideLeaveRequestByHR(requestId, hrAdminId, approveDto) {
        const request = await this.leaveRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException('Leave request not found');
        }
        request.status = leave_status_enum_1.LeaveStatus.APPROVED;
        request.approvalFlow.forEach((flow) => {
            flow.status = leave_status_enum_1.LeaveStatus.APPROVED;
            if (flow.role === 'hr_admin') {
                flow.decidedBy = new mongoose_2.Types.ObjectId(hrAdminId);
                flow.decidedAt = new Date();
            }
        });
        await request.save();
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: request.employeeId,
            leaveTypeId: request.leaveTypeId,
        });
        if (entitlement) {
            entitlement.pending -= request.durationDays;
            entitlement.taken += request.durationDays;
            entitlement.remaining = entitlement.accruedRounded + entitlement.carryForward - entitlement.taken;
            await entitlement.save();
        }
        return request;
    }
    async createLeaveAdjustment(employeeId, leaveTypeId, adjustmentType, amount, reason, hrUserId) {
        const adjustment = new this.leaveAdjustmentModel({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
            adjustmentType,
            amount,
            reason,
            hrUserId: new mongoose_2.Types.ObjectId(hrUserId),
        });
        await adjustment.save();
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
        });
        if (entitlement) {
            if (adjustmentType === 'ADD') {
                entitlement.yearlyEntitlement += amount;
                entitlement.remaining += amount;
            }
            else if (adjustmentType === 'DEDUCT') {
                entitlement.yearlyEntitlement -= amount;
                entitlement.remaining -= amount;
            }
            await entitlement.save();
        }
        return adjustment;
    }
    async calculateLeaveDuration(fromDate, toDate) {
        let duration = 0;
        const currentDate = new Date(fromDate);
        const holidays = await this.calendarModel.find({
            'holidays': {
                $exists: true,
            },
        }).lean();
        const holidayDates = new Set();
        holidays.forEach((calendar) => {
        });
        while (currentDate <= toDate) {
            const dayOfWeek = currentDate.getDay();
            const dateString = currentDate.toISOString().split('T')[0];
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                if (!holidayDates.has(dateString)) {
                    duration++;
                }
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return duration;
    }
    async checkLeaveEligibility(employeeId, leaveTypeId) {
        const leaveType = await this.leaveTypeModel.findById(leaveTypeId);
        if (!leaveType) {
            throw new common_1.NotFoundException('Leave type not found');
        }
        if (leaveType.minTenureMonths) {
        }
        const policy = await this.leavePolicyModel.findOne({ leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId) });
        if (policy?.eligibility) {
        }
    }
    async checkOverlappingLeaves(employeeId, fromDate, toDate) {
        const overlapping = await this.leaveRequestModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            status: { $in: [leave_status_enum_1.LeaveStatus.PENDING, leave_status_enum_1.LeaveStatus.APPROVED] },
            $or: [
                {
                    'dates.from': { $lte: toDate },
                    'dates.to': { $gte: fromDate },
                },
            ],
        });
        if (overlapping) {
            throw new common_1.BadRequestException('Leave request overlaps with existing leave');
        }
    }
    async processLeaveAccrual(employeeId, leaveTypeId) {
        const policy = await this.leavePolicyModel.findOne({ leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId) });
        if (!policy) {
            return;
        }
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
        });
        if (!entitlement) {
            return;
        }
        let accrualAmount = 0;
        if (policy.accrualMethod === accrual_method_enum_1.AccrualMethod.MONTHLY) {
            accrualAmount = policy.monthlyRate;
        }
        else if (policy.accrualMethod === accrual_method_enum_1.AccrualMethod.YEARLY) {
            accrualAmount = policy.yearlyRate / 12;
        }
        entitlement.accruedActual += accrualAmount;
        entitlement.accruedRounded = Math.floor(entitlement.accruedActual);
        entitlement.remaining = entitlement.accruedRounded + entitlement.carryForward - entitlement.taken;
        entitlement.lastAccrualDate = new Date();
        await entitlement.save();
    }
    async processYearEndCarryForward(employeeId, leaveTypeId) {
        const policy = await this.leavePolicyModel.findOne({ leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId) });
        if (!policy || !policy.carryForwardAllowed) {
            return;
        }
        const entitlement = await this.leaveEntitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
        });
        if (!entitlement) {
            return;
        }
        let carryForwardAmount = entitlement.remaining;
        if (policy.maxCarryForward > 0) {
            carryForwardAmount = Math.min(carryForwardAmount, policy.maxCarryForward);
        }
        entitlement.carryForward = carryForwardAmount;
        entitlement.accruedActual = 0;
        entitlement.accruedRounded = 0;
        entitlement.taken = 0;
        entitlement.pending = 0;
        entitlement.remaining = carryForwardAmount;
        entitlement.nextResetDate = new Date(new Date().getFullYear() + 1, 0, 1);
        await entitlement.save();
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_request_schema_1.LeaveRequest.name)),
    __param(1, (0, mongoose_1.InjectModel)(leave_type_schema_1.LeaveType.name)),
    __param(2, (0, mongoose_1.InjectModel)(leave_entitlement_schema_1.LeaveEntitlement.name)),
    __param(3, (0, mongoose_1.InjectModel)(leave_policy_schema_1.LeavePolicy.name)),
    __param(4, (0, mongoose_1.InjectModel)(leave_adjustment_schema_1.LeaveAdjustment.name)),
    __param(5, (0, mongoose_1.InjectModel)(calendar_schema_1.Calendar.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map