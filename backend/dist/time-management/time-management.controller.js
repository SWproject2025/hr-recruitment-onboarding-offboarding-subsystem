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
exports.TimeManagementController = void 0;
const common_1 = require("@nestjs/common");
const time_management_service_1 = require("./time-management.service");
const dto_1 = require("./dto");
let TimeManagementController = class TimeManagementController {
    timeManagementService;
    constructor(timeManagementService) {
        this.timeManagementService = timeManagementService;
    }
    async createAttendanceRecord(data) {
        return this.timeManagementService.createAttendanceRecord(data);
    }
    async findAllAttendanceRecords(query) {
        return this.timeManagementService.findAllAttendanceRecords(query);
    }
    async findAttendanceRecordById(id) {
        return this.timeManagementService.findAttendanceRecordById(id);
    }
    async updateAttendanceRecord(id, data) {
        return this.timeManagementService.updateAttendanceRecord(id, data);
    }
    async deleteAttendanceRecord(id) {
        await this.timeManagementService.deleteAttendanceRecord(id);
        return { message: 'Attendance record deleted successfully' };
    }
    async createCorrectionRequest(data) {
        return this.timeManagementService.createCorrectionRequest(data);
    }
    async findAllCorrectionRequests(query) {
        return this.timeManagementService.findAllCorrectionRequests(query);
    }
    async findCorrectionRequestById(id) {
        return this.timeManagementService.findCorrectionRequestById(id);
    }
    async updateCorrectionRequest(id, data) {
        return this.timeManagementService.updateCorrectionRequest(id, data);
    }
    async deleteCorrectionRequest(id) {
        await this.timeManagementService.deleteCorrectionRequest(id);
        return { message: 'Correction request deleted successfully' };
    }
    async createOvertimeRule(data) {
        return this.timeManagementService.createOvertimeRule(data);
    }
    async findAllOvertimeRules(query) {
        return this.timeManagementService.findAllOvertimeRules(query);
    }
    async findOvertimeRuleById(id) {
        return this.timeManagementService.findOvertimeRuleById(id);
    }
    async updateOvertimeRule(id, data) {
        return this.timeManagementService.updateOvertimeRule(id, data);
    }
    async deleteOvertimeRule(id) {
        await this.timeManagementService.deleteOvertimeRule(id);
        return { message: 'Overtime rule deleted successfully' };
    }
    async createLatenessRule(data) {
        return this.timeManagementService.createLatenessRule(data);
    }
    async findAllLatenessRules(query) {
        return this.timeManagementService.findAllLatenessRules(query);
    }
    async findLatenessRuleById(id) {
        return this.timeManagementService.findLatenessRuleById(id);
    }
    async updateLatenessRule(id, data) {
        return this.timeManagementService.updateLatenessRule(id, data);
    }
    async deleteLatenessRule(id) {
        await this.timeManagementService.deleteLatenessRule(id);
        return { message: 'Lateness rule deleted successfully' };
    }
    async createHoliday(data) {
        return this.timeManagementService.createHoliday(data);
    }
    async findAllHolidays(query) {
        return this.timeManagementService.findAllHolidays(query);
    }
    async findHolidayById(id) {
        return this.timeManagementService.findHolidayById(id);
    }
    async updateHoliday(id, data) {
        return this.timeManagementService.updateHoliday(id, data);
    }
    async deleteHoliday(id) {
        await this.timeManagementService.deleteHoliday(id);
        return { message: 'Holiday deleted successfully' };
    }
    async createShift(data) {
        return this.timeManagementService.createShift(data);
    }
    async findAllShifts(query) {
        return this.timeManagementService.findAllShifts(query);
    }
    async findShiftById(id) {
        return this.timeManagementService.findShiftById(id);
    }
    async updateShift(id, data) {
        return this.timeManagementService.updateShift(id, data);
    }
    async deleteShift(id) {
        await this.timeManagementService.deleteShift(id);
        return { message: 'Shift deleted successfully' };
    }
    async createShiftAssignment(data) {
        return this.timeManagementService.createShiftAssignment(data);
    }
    async findAllShiftAssignments(query) {
        return this.timeManagementService.findAllShiftAssignments(query);
    }
    async findShiftAssignmentById(id) {
        return this.timeManagementService.findShiftAssignmentById(id);
    }
    async updateShiftAssignment(id, data) {
        return this.timeManagementService.updateShiftAssignment(id, data);
    }
    async deleteShiftAssignment(id) {
        await this.timeManagementService.deleteShiftAssignment(id);
        return { message: 'Shift assignment deleted successfully' };
    }
    async createShiftType(data) {
        return this.timeManagementService.createShiftType(data);
    }
    async findAllShiftTypes(query) {
        return this.timeManagementService.findAllShiftTypes(query);
    }
    async findShiftTypeById(id) {
        return this.timeManagementService.findShiftTypeById(id);
    }
    async updateShiftType(id, data) {
        return this.timeManagementService.updateShiftType(id, data);
    }
    async deleteShiftType(id) {
        await this.timeManagementService.deleteShiftType(id);
        return { message: 'Shift type deleted successfully' };
    }
    async createScheduleRule(data) {
        return this.timeManagementService.createScheduleRule(data);
    }
    async findAllScheduleRules(query) {
        return this.timeManagementService.findAllScheduleRules(query);
    }
    async findScheduleRuleById(id) {
        return this.timeManagementService.findScheduleRuleById(id);
    }
    async updateScheduleRule(id, data) {
        return this.timeManagementService.updateScheduleRule(id, data);
    }
    async deleteScheduleRule(id) {
        await this.timeManagementService.deleteScheduleRule(id);
        return { message: 'Schedule rule deleted successfully' };
    }
    async createTimeException(data) {
        return this.timeManagementService.createTimeException(data);
    }
    async findAllTimeExceptions(query) {
        return this.timeManagementService.findAllTimeExceptions(query);
    }
    async findTimeExceptionById(id) {
        return this.timeManagementService.findTimeExceptionById(id);
    }
    async updateTimeException(id, data) {
        return this.timeManagementService.updateTimeException(id, data);
    }
    async deleteTimeException(id) {
        await this.timeManagementService.deleteTimeException(id);
        return { message: 'Time exception deleted successfully' };
    }
    async createNotificationLog(data) {
        return this.timeManagementService.createNotificationLog(data);
    }
    async findAllNotificationLogs(query) {
        return this.timeManagementService.findAllNotificationLogs(query);
    }
    async findNotificationLogById(id) {
        return this.timeManagementService.findNotificationLogById(id);
    }
    async updateNotificationLog(id, data) {
        return this.timeManagementService.updateNotificationLog(id, data);
    }
    async deleteNotificationLog(id) {
        await this.timeManagementService.deleteNotificationLog(id);
        return { message: 'Notification log deleted successfully' };
    }
    async checkPanelAvailability(data) {
        return this.timeManagementService.checkPanelAvailability(data);
    }
    async scheduleInterview(data) {
        return this.timeManagementService.scheduleInterview(data);
    }
    async updateInterviewSchedule(interviewId, data) {
        return this.timeManagementService.updateInterviewSchedule(interviewId, data);
    }
};
exports.TimeManagementController = TimeManagementController;
__decorate([
    (0, common_1.Post)('attendance-records'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAttendanceRecordDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createAttendanceRecord", null);
__decorate([
    (0, common_1.Get)('attendance-records'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AttendanceRecordQueryDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllAttendanceRecords", null);
__decorate([
    (0, common_1.Get)('attendance-records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAttendanceRecordById", null);
__decorate([
    (0, common_1.Put)('attendance-records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAttendanceRecordDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateAttendanceRecord", null);
__decorate([
    (0, common_1.Delete)('attendance-records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteAttendanceRecord", null);
__decorate([
    (0, common_1.Post)('correction-requests'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAttendanceCorrectionRequestDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createCorrectionRequest", null);
__decorate([
    (0, common_1.Get)('correction-requests'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CorrectionRequestQueryDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllCorrectionRequests", null);
__decorate([
    (0, common_1.Get)('correction-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findCorrectionRequestById", null);
__decorate([
    (0, common_1.Put)('correction-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAttendanceCorrectionRequestDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateCorrectionRequest", null);
__decorate([
    (0, common_1.Delete)('correction-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteCorrectionRequest", null);
__decorate([
    (0, common_1.Post)('overtime-rules'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOvertimeRuleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createOvertimeRule", null);
__decorate([
    (0, common_1.Get)('overtime-rules'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllOvertimeRules", null);
__decorate([
    (0, common_1.Get)('overtime-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findOvertimeRuleById", null);
__decorate([
    (0, common_1.Put)('overtime-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateOvertimeRuleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateOvertimeRule", null);
__decorate([
    (0, common_1.Delete)('overtime-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteOvertimeRule", null);
__decorate([
    (0, common_1.Post)('lateness-rules'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLatenessRuleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createLatenessRule", null);
__decorate([
    (0, common_1.Get)('lateness-rules'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllLatenessRules", null);
__decorate([
    (0, common_1.Get)('lateness-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findLatenessRuleById", null);
__decorate([
    (0, common_1.Put)('lateness-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateLatenessRuleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateLatenessRule", null);
__decorate([
    (0, common_1.Delete)('lateness-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteLatenessRule", null);
__decorate([
    (0, common_1.Post)('holidays'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateHolidayDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createHoliday", null);
__decorate([
    (0, common_1.Get)('holidays'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.HolidayQueryDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllHolidays", null);
__decorate([
    (0, common_1.Get)('holidays/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findHolidayById", null);
__decorate([
    (0, common_1.Put)('holidays/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateHolidayDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateHoliday", null);
__decorate([
    (0, common_1.Delete)('holidays/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteHoliday", null);
__decorate([
    (0, common_1.Post)('shifts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateShiftDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createShift", null);
__decorate([
    (0, common_1.Get)('shifts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllShifts", null);
__decorate([
    (0, common_1.Get)('shifts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findShiftById", null);
__decorate([
    (0, common_1.Put)('shifts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateShiftDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateShift", null);
__decorate([
    (0, common_1.Delete)('shifts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteShift", null);
__decorate([
    (0, common_1.Post)('shift-assignments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateShiftAssignmentDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createShiftAssignment", null);
__decorate([
    (0, common_1.Get)('shift-assignments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ShiftAssignmentQueryDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllShiftAssignments", null);
__decorate([
    (0, common_1.Get)('shift-assignments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findShiftAssignmentById", null);
__decorate([
    (0, common_1.Put)('shift-assignments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateShiftAssignmentDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateShiftAssignment", null);
__decorate([
    (0, common_1.Delete)('shift-assignments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteShiftAssignment", null);
__decorate([
    (0, common_1.Post)('shift-types'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateShiftTypeDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createShiftType", null);
__decorate([
    (0, common_1.Get)('shift-types'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllShiftTypes", null);
__decorate([
    (0, common_1.Get)('shift-types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findShiftTypeById", null);
__decorate([
    (0, common_1.Put)('shift-types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateShiftTypeDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateShiftType", null);
__decorate([
    (0, common_1.Delete)('shift-types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteShiftType", null);
__decorate([
    (0, common_1.Post)('schedule-rules'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateScheduleRuleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createScheduleRule", null);
__decorate([
    (0, common_1.Get)('schedule-rules'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllScheduleRules", null);
__decorate([
    (0, common_1.Get)('schedule-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findScheduleRuleById", null);
__decorate([
    (0, common_1.Put)('schedule-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateScheduleRuleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateScheduleRule", null);
__decorate([
    (0, common_1.Delete)('schedule-rules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteScheduleRule", null);
__decorate([
    (0, common_1.Post)('time-exceptions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTimeExceptionDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createTimeException", null);
__decorate([
    (0, common_1.Get)('time-exceptions'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeExceptionQueryDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllTimeExceptions", null);
__decorate([
    (0, common_1.Get)('time-exceptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findTimeExceptionById", null);
__decorate([
    (0, common_1.Put)('time-exceptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTimeExceptionDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateTimeException", null);
__decorate([
    (0, common_1.Delete)('time-exceptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteTimeException", null);
__decorate([
    (0, common_1.Post)('notification-logs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateNotificationLogDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createNotificationLog", null);
__decorate([
    (0, common_1.Get)('notification-logs'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.NotificationLogQueryDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findAllNotificationLogs", null);
__decorate([
    (0, common_1.Get)('notification-logs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "findNotificationLogById", null);
__decorate([
    (0, common_1.Put)('notification-logs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateNotificationLogDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateNotificationLog", null);
__decorate([
    (0, common_1.Delete)('notification-logs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteNotificationLog", null);
__decorate([
    (0, common_1.Post)('interview-scheduling/check-availability'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CheckAvailabilityDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "checkPanelAvailability", null);
__decorate([
    (0, common_1.Post)('interview-scheduling/schedule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ScheduleInterviewDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "scheduleInterview", null);
__decorate([
    (0, common_1.Put)('interview-scheduling/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateInterviewScheduleDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateInterviewSchedule", null);
exports.TimeManagementController = TimeManagementController = __decorate([
    (0, common_1.Controller)('time-management'),
    __metadata("design:paramtypes", [time_management_service_1.TimeManagementService])
], TimeManagementController);
//# sourceMappingURL=time-management.controller.js.map