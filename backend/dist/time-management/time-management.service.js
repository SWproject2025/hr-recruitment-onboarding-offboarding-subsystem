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
exports.TimeManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_record_schema_1 = require("./models/attendance-record.schema");
const attendance_correction_request_schema_1 = require("./models/attendance-correction-request.schema");
const overtime_rule_schema_1 = require("./models/overtime-rule.schema");
const lateness_rule_schema_1 = require("./models/lateness-rule.schema");
const holiday_schema_1 = require("./models/holiday.schema");
const shift_schema_1 = require("./models/shift.schema");
const shift_assignment_schema_1 = require("./models/shift-assignment.schema");
const shift_type_schema_1 = require("./models/shift-type.schema");
const schedule_rule_schema_1 = require("./models/schedule-rule.schema");
const time_exception_schema_1 = require("./models/time-exception.schema");
const notification_log_schema_1 = require("./models/notification-log.schema");
let TimeManagementService = class TimeManagementService {
    attendanceRecordModel;
    correctionRequestModel;
    overtimeRuleModel;
    latenessRuleModel;
    holidayModel;
    shiftModel;
    shiftAssignmentModel;
    shiftTypeModel;
    scheduleRuleModel;
    timeExceptionModel;
    notificationLogModel;
    constructor(attendanceRecordModel, correctionRequestModel, overtimeRuleModel, latenessRuleModel, holidayModel, shiftModel, shiftAssignmentModel, shiftTypeModel, scheduleRuleModel, timeExceptionModel, notificationLogModel) {
        this.attendanceRecordModel = attendanceRecordModel;
        this.correctionRequestModel = correctionRequestModel;
        this.overtimeRuleModel = overtimeRuleModel;
        this.latenessRuleModel = latenessRuleModel;
        this.holidayModel = holidayModel;
        this.shiftModel = shiftModel;
        this.shiftAssignmentModel = shiftAssignmentModel;
        this.shiftTypeModel = shiftTypeModel;
        this.scheduleRuleModel = scheduleRuleModel;
        this.timeExceptionModel = timeExceptionModel;
        this.notificationLogModel = notificationLogModel;
    }
    async createAttendanceRecord(data) {
        const recordData = {
            ...data,
            employeeId: new mongoose_2.Types.ObjectId(data.employeeId),
        };
        if (data.exceptionIds) {
            recordData.exceptionIds = data.exceptionIds.map(id => new mongoose_2.Types.ObjectId(id));
        }
        return this.attendanceRecordModel.create(recordData);
    }
    async findAllAttendanceRecords(filter) {
        return this.attendanceRecordModel.find(filter).populate('employeeId').populate('exceptionIds').exec();
    }
    async findAttendanceRecordById(id) {
        return this.attendanceRecordModel.findById(id).populate('employeeId').populate('exceptionIds').exec();
    }
    async updateAttendanceRecord(id, data) {
        return this.attendanceRecordModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteAttendanceRecord(id) {
        await this.attendanceRecordModel.findByIdAndDelete(id).exec();
    }
    async createCorrectionRequest(data) {
        const requestData = { ...data };
        if (data.employeeId && typeof data.employeeId === 'string') {
            requestData.employeeId = new mongoose_2.Types.ObjectId(data.employeeId);
        }
        const attendanceRecordId = data.attendanceRecord;
        if (attendanceRecordId && typeof attendanceRecordId === 'string') {
            requestData.attendanceRecord = new mongoose_2.Types.ObjectId(attendanceRecordId);
        }
        return this.correctionRequestModel.create(requestData);
    }
    async findAllCorrectionRequests(filter) {
        return this.correctionRequestModel.find(filter).populate('employeeId').populate('attendanceRecord').exec();
    }
    async findCorrectionRequestById(id) {
        return this.correctionRequestModel.findById(id).populate('employeeId').populate('attendanceRecord').exec();
    }
    async updateCorrectionRequest(id, data) {
        return this.correctionRequestModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteCorrectionRequest(id) {
        await this.correctionRequestModel.findByIdAndDelete(id).exec();
    }
    async createOvertimeRule(data) {
        return this.overtimeRuleModel.create(data);
    }
    async findAllOvertimeRules(filter) {
        return this.overtimeRuleModel.find(filter).exec();
    }
    async findOvertimeRuleById(id) {
        return this.overtimeRuleModel.findById(id).exec();
    }
    async updateOvertimeRule(id, data) {
        return this.overtimeRuleModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteOvertimeRule(id) {
        await this.overtimeRuleModel.findByIdAndDelete(id).exec();
    }
    async createLatenessRule(data) {
        return this.latenessRuleModel.create(data);
    }
    async findAllLatenessRules(filter) {
        return this.latenessRuleModel.find(filter).exec();
    }
    async findLatenessRuleById(id) {
        return this.latenessRuleModel.findById(id).exec();
    }
    async updateLatenessRule(id, data) {
        return this.latenessRuleModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteLatenessRule(id) {
        await this.latenessRuleModel.findByIdAndDelete(id).exec();
    }
    async createHoliday(data) {
        return this.holidayModel.create(data);
    }
    async findAllHolidays(filter) {
        return this.holidayModel.find(filter).exec();
    }
    async findHolidayById(id) {
        return this.holidayModel.findById(id).exec();
    }
    async updateHoliday(id, data) {
        return this.holidayModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteHoliday(id) {
        await this.holidayModel.findByIdAndDelete(id).exec();
    }
    async createShift(data) {
        const shiftData = {
            ...data,
            shiftType: new mongoose_2.Types.ObjectId(data.shiftType),
        };
        return this.shiftModel.create(shiftData);
    }
    async findAllShifts(filter) {
        return this.shiftModel.find(filter).populate('shiftType').exec();
    }
    async findShiftById(id) {
        return this.shiftModel.findById(id).populate('shiftType').exec();
    }
    async updateShift(id, data) {
        return this.shiftModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteShift(id) {
        await this.shiftModel.findByIdAndDelete(id).exec();
    }
    async createShiftAssignment(data) {
        const assignmentData = {
            ...data,
            shiftId: new mongoose_2.Types.ObjectId(data.shiftId),
        };
        if (data.employeeId) {
            assignmentData.employeeId = new mongoose_2.Types.ObjectId(data.employeeId);
        }
        if (data.departmentId) {
            assignmentData.departmentId = new mongoose_2.Types.ObjectId(data.departmentId);
        }
        if (data.positionId) {
            assignmentData.positionId = new mongoose_2.Types.ObjectId(data.positionId);
        }
        if (data.scheduleRuleId) {
            assignmentData.scheduleRuleId = new mongoose_2.Types.ObjectId(data.scheduleRuleId);
        }
        return this.shiftAssignmentModel.create(assignmentData);
    }
    async findAllShiftAssignments(filter) {
        return this.shiftAssignmentModel.find(filter)
            .populate('employeeId')
            .populate('departmentId')
            .populate('positionId')
            .populate('shiftId')
            .populate('scheduleRuleId')
            .exec();
    }
    async findShiftAssignmentById(id) {
        return this.shiftAssignmentModel.findById(id)
            .populate('employeeId')
            .populate('departmentId')
            .populate('positionId')
            .populate('shiftId')
            .populate('scheduleRuleId')
            .exec();
    }
    async updateShiftAssignment(id, data) {
        return this.shiftAssignmentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteShiftAssignment(id) {
        await this.shiftAssignmentModel.findByIdAndDelete(id).exec();
    }
    async createShiftType(data) {
        return this.shiftTypeModel.create(data);
    }
    async findAllShiftTypes(filter) {
        return this.shiftTypeModel.find(filter).exec();
    }
    async findShiftTypeById(id) {
        return this.shiftTypeModel.findById(id).exec();
    }
    async updateShiftType(id, data) {
        return this.shiftTypeModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteShiftType(id) {
        await this.shiftTypeModel.findByIdAndDelete(id).exec();
    }
    async createScheduleRule(data) {
        return this.scheduleRuleModel.create(data);
    }
    async findAllScheduleRules(filter) {
        return this.scheduleRuleModel.find(filter).exec();
    }
    async findScheduleRuleById(id) {
        return this.scheduleRuleModel.findById(id).exec();
    }
    async updateScheduleRule(id, data) {
        return this.scheduleRuleModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteScheduleRule(id) {
        await this.scheduleRuleModel.findByIdAndDelete(id).exec();
    }
    async createTimeException(data) {
        const exceptionData = {
            ...data,
            employeeId: new mongoose_2.Types.ObjectId(data.employeeId),
            attendanceRecordId: new mongoose_2.Types.ObjectId(data.attendanceRecordId),
            assignedTo: new mongoose_2.Types.ObjectId(data.assignedTo),
        };
        return this.timeExceptionModel.create(exceptionData);
    }
    async findAllTimeExceptions(filter) {
        return this.timeExceptionModel.find(filter)
            .populate('employeeId')
            .populate('attendanceRecordId')
            .populate('assignedTo')
            .exec();
    }
    async findTimeExceptionById(id) {
        return this.timeExceptionModel.findById(id)
            .populate('employeeId')
            .populate('attendanceRecordId')
            .populate('assignedTo')
            .exec();
    }
    async updateTimeException(id, data) {
        return this.timeExceptionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteTimeException(id) {
        await this.timeExceptionModel.findByIdAndDelete(id).exec();
    }
    async createNotificationLog(data) {
        const logData = {
            ...data,
            to: new mongoose_2.Types.ObjectId(data.to),
        };
        return this.notificationLogModel.create(logData);
    }
    async findAllNotificationLogs(filter) {
        return this.notificationLogModel.find(filter).populate('to').exec();
    }
    async findNotificationLogById(id) {
        return this.notificationLogModel.findById(id).populate('to').exec();
    }
    async updateNotificationLog(id, data) {
        return this.notificationLogModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteNotificationLog(id) {
        await this.notificationLogModel.findByIdAndDelete(id).exec();
    }
    async checkPanelAvailability(data) {
        return {
            message: 'Availability check not yet implemented',
            panelMemberIds: data.panelMemberIds,
            startDate: data.startDate,
            endDate: data.endDate,
        };
    }
    async scheduleInterview(data) {
        return {
            message: 'Interview scheduling not yet implemented',
            applicationId: data.applicationId,
            scheduledDate: data.scheduledDate,
        };
    }
    async updateInterviewSchedule(interviewId, data) {
        return {
            message: 'Interview schedule update not yet implemented',
            interviewId,
            updates: data,
        };
    }
};
exports.TimeManagementService = TimeManagementService;
exports.TimeManagementService = TimeManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(1, (0, mongoose_1.InjectModel)(attendance_correction_request_schema_1.AttendanceCorrectionRequest.name)),
    __param(2, (0, mongoose_1.InjectModel)(overtime_rule_schema_1.OvertimeRule.name)),
    __param(3, (0, mongoose_1.InjectModel)(lateness_rule_schema_1.LatenessRule.name)),
    __param(4, (0, mongoose_1.InjectModel)(holiday_schema_1.Holiday.name)),
    __param(5, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __param(6, (0, mongoose_1.InjectModel)(shift_assignment_schema_1.ShiftAssignment.name)),
    __param(7, (0, mongoose_1.InjectModel)(shift_type_schema_1.ShiftType.name)),
    __param(8, (0, mongoose_1.InjectModel)(schedule_rule_schema_1.ScheduleRule.name)),
    __param(9, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __param(10, (0, mongoose_1.InjectModel)(notification_log_schema_1.NotificationLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TimeManagementService);
//# sourceMappingURL=time-management.service.js.map