import { TimeManagementService } from './time-management.service';
import { CreateAttendanceRecordDto, UpdateAttendanceRecordDto, CreateAttendanceCorrectionRequestDto, UpdateAttendanceCorrectionRequestDto, CreateOvertimeRuleDto, UpdateOvertimeRuleDto, CreateLatenessRuleDto, UpdateLatenessRuleDto, CreateHolidayDto, UpdateHolidayDto, CreateShiftDto, UpdateShiftDto, CreateShiftAssignmentDto, UpdateShiftAssignmentDto, CreateShiftTypeDto, UpdateShiftTypeDto, CreateScheduleRuleDto, UpdateScheduleRuleDto, CreateTimeExceptionDto, UpdateTimeExceptionDto, CreateNotificationLogDto, UpdateNotificationLogDto, AttendanceRecordQueryDto, CorrectionRequestQueryDto, TimeExceptionQueryDto, ShiftAssignmentQueryDto, HolidayQueryDto, NotificationLogQueryDto, CheckAvailabilityDto, ScheduleInterviewDto, UpdateInterviewScheduleDto } from './dto';
export declare class TimeManagementController {
    private readonly timeManagementService;
    constructor(timeManagementService: TimeManagementService);
    createAttendanceRecord(data: CreateAttendanceRecordDto): Promise<import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllAttendanceRecords(query: AttendanceRecordQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findAttendanceRecordById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateAttendanceRecord(id: string, data: UpdateAttendanceRecordDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteAttendanceRecord(id: string): Promise<{
        message: string;
    }>;
    createCorrectionRequest(data: CreateAttendanceCorrectionRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllCorrectionRequests(query: CorrectionRequestQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findCorrectionRequestById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateCorrectionRequest(id: string, data: UpdateAttendanceCorrectionRequestDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteCorrectionRequest(id: string): Promise<{
        message: string;
    }>;
    createOvertimeRule(data: CreateOvertimeRuleDto): Promise<import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllOvertimeRules(query: any): Promise<(import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOvertimeRuleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateOvertimeRule(id: string, data: UpdateOvertimeRuleDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteOvertimeRule(id: string): Promise<{
        message: string;
    }>;
    createLatenessRule(data: CreateLatenessRuleDto): Promise<import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllLatenessRules(query: any): Promise<(import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findLatenessRuleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateLatenessRule(id: string, data: UpdateLatenessRuleDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteLatenessRule(id: string): Promise<{
        message: string;
    }>;
    createHoliday(data: CreateHolidayDto): Promise<import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllHolidays(query: HolidayQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findHolidayById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateHoliday(id: string, data: UpdateHolidayDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteHoliday(id: string): Promise<{
        message: string;
    }>;
    createShift(data: CreateShiftDto): Promise<import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllShifts(query: any): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findShiftById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateShift(id: string, data: UpdateShiftDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteShift(id: string): Promise<{
        message: string;
    }>;
    createShiftAssignment(data: CreateShiftAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllShiftAssignments(query: ShiftAssignmentQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findShiftAssignmentById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateShiftAssignment(id: string, data: UpdateShiftAssignmentDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteShiftAssignment(id: string): Promise<{
        message: string;
    }>;
    createShiftType(data: CreateShiftTypeDto): Promise<import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllShiftTypes(query: any): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findShiftTypeById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateShiftType(id: string, data: UpdateShiftTypeDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteShiftType(id: string): Promise<{
        message: string;
    }>;
    createScheduleRule(data: CreateScheduleRuleDto): Promise<import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllScheduleRules(query: any): Promise<(import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findScheduleRuleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateScheduleRule(id: string, data: UpdateScheduleRuleDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteScheduleRule(id: string): Promise<{
        message: string;
    }>;
    createTimeException(data: CreateTimeExceptionDto): Promise<import("mongoose").Document<unknown, {}, import("./models/time-exception.schema").TimeException, {}, {}> & import("./models/time-exception.schema").TimeException & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllTimeExceptions(query: TimeExceptionQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/time-exception.schema").TimeException, {}, {}> & import("./models/time-exception.schema").TimeException & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findTimeExceptionById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/time-exception.schema").TimeException, {}, {}> & import("./models/time-exception.schema").TimeException & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateTimeException(id: string, data: UpdateTimeExceptionDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/time-exception.schema").TimeException, {}, {}> & import("./models/time-exception.schema").TimeException & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteTimeException(id: string): Promise<{
        message: string;
    }>;
    createNotificationLog(data: CreateNotificationLogDto): Promise<import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllNotificationLogs(query: NotificationLogQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findNotificationLogById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateNotificationLog(id: string, data: UpdateNotificationLogDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteNotificationLog(id: string): Promise<{
        message: string;
    }>;
    checkPanelAvailability(data: CheckAvailabilityDto): Promise<any>;
    scheduleInterview(data: ScheduleInterviewDto): Promise<any>;
    updateInterviewSchedule(interviewId: string, data: UpdateInterviewScheduleDto): Promise<any>;
}
