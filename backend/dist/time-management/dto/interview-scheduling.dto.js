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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotAvailabilityDto = exports.UpdateInterviewScheduleDto = exports.ScheduleInterviewDto = exports.CheckAvailabilityDto = void 0;
const class_validator_1 = require("class-validator");
const interview_method_enum_1 = require("../../recruitment/enums/interview-method.enum");
class CheckAvailabilityDto {
    panelMemberIds;
    startDate;
    endDate;
    excludeInterviewId;
}
exports.CheckAvailabilityDto = CheckAvailabilityDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CheckAvailabilityDto.prototype, "panelMemberIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CheckAvailabilityDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CheckAvailabilityDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckAvailabilityDto.prototype, "excludeInterviewId", void 0);
class ScheduleInterviewDto {
    applicationId;
    scheduledDate;
    method;
    panelMemberIds;
    videoLink;
    location;
    notes;
}
exports.ScheduleInterviewDto = ScheduleInterviewDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ScheduleInterviewDto.prototype, "scheduledDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(interview_method_enum_1.InterviewMethod),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ScheduleInterviewDto.prototype, "panelMemberIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "videoLink", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleInterviewDto.prototype, "notes", void 0);
class UpdateInterviewScheduleDto {
    scheduledDate;
    method;
    panelMemberIds;
    videoLink;
    location;
    notes;
}
exports.UpdateInterviewScheduleDto = UpdateInterviewScheduleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateInterviewScheduleDto.prototype, "scheduledDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interview_method_enum_1.InterviewMethod),
    __metadata("design:type", String)
], UpdateInterviewScheduleDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateInterviewScheduleDto.prototype, "panelMemberIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInterviewScheduleDto.prototype, "videoLink", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInterviewScheduleDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInterviewScheduleDto.prototype, "notes", void 0);
class TimeSlotAvailabilityDto {
    panelMemberId;
    availableSlots;
    conflicts;
}
exports.TimeSlotAvailabilityDto = TimeSlotAvailabilityDto;
//# sourceMappingURL=interview-scheduling.dto.js.map