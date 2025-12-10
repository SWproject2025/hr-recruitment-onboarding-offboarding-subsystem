import { InterviewMethod } from '../../recruitment/enums/interview-method.enum';
export declare class CheckAvailabilityDto {
    panelMemberIds: string[];
    startDate: Date;
    endDate: Date;
    excludeInterviewId?: string;
}
export declare class ScheduleInterviewDto {
    applicationId: string;
    scheduledDate: Date;
    method: InterviewMethod;
    panelMemberIds: string[];
    videoLink?: string;
    location?: string;
    notes?: string;
}
export declare class UpdateInterviewScheduleDto {
    scheduledDate?: Date;
    method?: InterviewMethod;
    panelMemberIds?: string[];
    videoLink?: string;
    location?: string;
    notes?: string;
}
export declare class TimeSlotAvailabilityDto {
    panelMemberId: string;
    availableSlots: {
        start: Date;
        end: Date;
    }[];
    conflicts: {
        start: Date;
        end: Date;
        reason: string;
    }[];
}
