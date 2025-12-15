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
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const leaves_service_1 = require("./leaves.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_gaurd_1 = require("../Common/Gaurds/roles.gaurd");
const roles_decorator_1 = require("../Common/Decorators/roles.decorator");
const current_user_decorator_1 = require("../Common/Decorators/current-user.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
const leave_request_dto_1 = require("./dto/leave-request.dto");
const leave_status_enum_1 = require("./enums/leave-status.enum");
let LeavesController = class LeavesController {
    leavesService;
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    async createLeaveRequest(user, createDto) {
        return this.leavesService.createLeaveRequest(user.employeeProfileId, createDto);
    }
    async getMyLeaveRequests(user, status, page, limit) {
        return this.leavesService.getEmployeeLeaveRequests(user.employeeProfileId, {
            status,
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async getMyLeaveBalance(user, query) {
        return this.leavesService.getEmployeeLeaveBalance(user.employeeProfileId, query.leaveTypeId);
    }
    async getLeaveRequestDetails(user, requestId) {
        const requests = await this.leavesService.getEmployeeLeaveRequests(user.employeeProfileId, { page: 1, limit: 1000 });
        const request = requests.requests.find((r) => r._id.toString() === requestId);
        if (!request) {
            throw new Error('Leave request not found');
        }
        return request;
    }
    async cancelLeaveRequest(user, requestId) {
        return this.leavesService.cancelLeaveRequest(user.employeeProfileId, requestId);
    }
    async updateLeaveRequest(user, requestId, updateDto) {
        await this.leavesService.cancelLeaveRequest(user.employeeProfileId, requestId);
        const createDto = {
            leaveTypeId: updateDto.leaveTypeId || '',
            fromDate: updateDto.fromDate || '',
            toDate: updateDto.toDate || '',
            justification: updateDto.justification || '',
            attachmentId: updateDto.attachmentId,
        };
        return this.leavesService.createLeaveRequest(user.employeeProfileId, createDto);
    }
    async getPendingLeaveRequests(user, page, limit) {
        return this.leavesService.getPendingLeaveRequests(user.employeeProfileId, {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async approveLeaveRequestByManager(user, requestId, approveDto) {
        return this.leavesService.approveLeaveRequestByManager(requestId, user.employeeProfileId, approveDto);
    }
    async rejectLeaveRequestByManager(user, requestId, rejectDto) {
        return this.leavesService.rejectLeaveRequestByManager(requestId, user.employeeProfileId, rejectDto);
    }
    async delegateLeaveApproval(user, requestId, delegateToManagerId) {
        return {
            message: 'Leave approval delegated successfully',
            requestId,
            delegatedTo: delegateToManagerId,
        };
    }
    async getAllLeaveRequestsForHR(status, page, limit) {
        return this.leavesService.getAllLeaveRequestsForHR({
            status,
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async approveLeaveRequestByHR(user, requestId, approveDto) {
        return this.leavesService.approveLeaveRequestByHR(requestId, user.employeeProfileId, approveDto);
    }
    async overrideLeaveRequestByHR(user, requestId, approveDto) {
        return this.leavesService.overrideLeaveRequestByHR(requestId, user.employeeProfileId, approveDto);
    }
    async validateLeaveDocuments(user, requestId, isValid, comments) {
        return {
            message: 'Document validation completed',
            requestId,
            isValid,
            comments,
        };
    }
    async createLeaveAdjustment(user, employeeId, leaveTypeId, adjustmentType, amount, reason) {
        return this.leavesService.createLeaveAdjustment(employeeId, leaveTypeId, adjustmentType, amount, reason, user.employeeProfileId);
    }
    async getEmployeeLeaveBalanceForHR(employeeId, query) {
        return this.leavesService.getEmployeeLeaveBalance(employeeId, query.leaveTypeId);
    }
    async processLeaveAccrual(employeeId, leaveTypeId) {
        await this.leavesService.processLeaveAccrual(employeeId, leaveTypeId);
        return { message: 'Leave accrual processed successfully' };
    }
    async processYearEndCarryForward(employeeId, leaveTypeId) {
        await this.leavesService.processYearEndCarryForward(employeeId, leaveTypeId);
        return { message: 'Year-end carry forward processed successfully' };
    }
    async getAllLeaveTypes() {
        return {
            message: 'Leave types retrieved successfully',
            leaveTypes: [],
        };
    }
    async createLeaveType(code, name, categoryId, description, paid, deductible) {
        return {
            message: 'Leave type created successfully',
            code,
            name,
        };
    }
    async createLeavePolicy(leaveTypeId, accrualMethod, monthlyRate, yearlyRate, carryForwardAllowed, maxCarryForward) {
        return {
            message: 'Leave policy configured successfully',
            leaveTypeId,
        };
    }
    async configureCalendar(year, holidays, blockedPeriods) {
        return {
            message: 'Calendar configured successfully',
            year,
        };
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Post)('requests'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, leave_request_dto_1.CreateLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "createLeaveRequest", null);
__decorate([
    (0, common_1.Get)('requests/my-requests'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getMyLeaveRequests", null);
__decorate([
    (0, common_1.Get)('balance'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, leave_request_dto_1.LeaveBalanceQueryDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getMyLeaveBalance", null);
__decorate([
    (0, common_1.Get)('requests/:requestId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getLeaveRequestDetails", null);
__decorate([
    (0, common_1.Patch)('requests/:requestId/cancel'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "cancelLeaveRequest", null);
__decorate([
    (0, common_1.Put)('requests/:requestId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, leave_request_dto_1.UpdateLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "updateLeaveRequest", null);
__decorate([
    (0, common_1.Get)('requests/pending-approval'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getPendingLeaveRequests", null);
__decorate([
    (0, common_1.Post)('requests/:requestId/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, leave_request_dto_1.ApproveLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "approveLeaveRequestByManager", null);
__decorate([
    (0, common_1.Post)('requests/:requestId/reject'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, leave_request_dto_1.RejectLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "rejectLeaveRequestByManager", null);
__decorate([
    (0, common_1.Post)('requests/:requestId/delegate'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)('delegateToManagerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "delegateLeaveApproval", null);
__decorate([
    (0, common_1.Get)('admin/requests'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getAllLeaveRequestsForHR", null);
__decorate([
    (0, common_1.Post)('admin/requests/:requestId/approve'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, leave_request_dto_1.ApproveLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "approveLeaveRequestByHR", null);
__decorate([
    (0, common_1.Post)('admin/requests/:requestId/override'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, leave_request_dto_1.ApproveLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "overrideLeaveRequestByHR", null);
__decorate([
    (0, common_1.Post)('admin/requests/:requestId/validate-documents'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __param(2, (0, common_1.Body)('isValid')),
    __param(3, (0, common_1.Body)('comments')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "validateLeaveDocuments", null);
__decorate([
    (0, common_1.Post)('admin/adjustments'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('employeeId')),
    __param(2, (0, common_1.Body)('leaveTypeId')),
    __param(3, (0, common_1.Body)('adjustmentType')),
    __param(4, (0, common_1.Body)('amount')),
    __param(5, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "createLeaveAdjustment", null);
__decorate([
    (0, common_1.Get)('admin/employees/:employeeId/balance'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, leave_request_dto_1.LeaveBalanceQueryDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getEmployeeLeaveBalanceForHR", null);
__decorate([
    (0, common_1.Post)('admin/accrual/process'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Body)('employeeId')),
    __param(1, (0, common_1.Body)('leaveTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "processLeaveAccrual", null);
__decorate([
    (0, common_1.Post)('admin/year-end/process'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Body)('employeeId')),
    __param(1, (0, common_1.Body)('leaveTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "processYearEndCarryForward", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getAllLeaveTypes", null);
__decorate([
    (0, common_1.Post)('admin/types'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('categoryId')),
    __param(3, (0, common_1.Body)('description')),
    __param(4, (0, common_1.Body)('paid')),
    __param(5, (0, common_1.Body)('deductible')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "createLeaveType", null);
__decorate([
    (0, common_1.Post)('admin/policies'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Body)('leaveTypeId')),
    __param(1, (0, common_1.Body)('accrualMethod')),
    __param(2, (0, common_1.Body)('monthlyRate')),
    __param(3, (0, common_1.Body)('yearlyRate')),
    __param(4, (0, common_1.Body)('carryForwardAllowed')),
    __param(5, (0, common_1.Body)('maxCarryForward')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Boolean, Number]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "createLeavePolicy", null);
__decorate([
    (0, common_1.Post)('admin/calendar'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Body)('year')),
    __param(1, (0, common_1.Body)('holidays')),
    __param(2, (0, common_1.Body)('blockedPeriods')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Array]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "configureCalendar", null);
exports.LeavesController = LeavesController = __decorate([
    (0, common_1.Controller)('leaves'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_gaurd_1.RolesGuard),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map