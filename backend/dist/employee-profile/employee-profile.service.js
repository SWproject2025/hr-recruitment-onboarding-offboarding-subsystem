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
exports.EmployeeProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_profile_schema_1 = require("./models/employee-profile.schema");
const ep_change_request_schema_1 = require("./models/ep-change-request.schema");
const candidate_schema_1 = require("./models/candidate.schema");
const employee_system_role_schema_1 = require("./models/employee-system-role.schema");
const qualification_schema_1 = require("./models/qualification.schema");
const employee_profile_enums_1 = require("./enums/employee-profile.enums");
const employee_profile_enums_2 = require("./enums/employee-profile.enums");
let EmployeeProfileService = class EmployeeProfileService {
    employeeProfileModel;
    changeRequestModel;
    candidateModel;
    systemRoleModel;
    qualificationModel;
    constructor(employeeProfileModel, changeRequestModel, candidateModel, systemRoleModel, qualificationModel) {
        this.employeeProfileModel = employeeProfileModel;
        this.changeRequestModel = changeRequestModel;
        this.candidateModel = candidateModel;
        this.systemRoleModel = systemRoleModel;
        this.qualificationModel = qualificationModel;
    }
    async getProfile(employeeId) {
        const profile = await this.employeeProfileModel.findById(employeeId).exec();
        if (!profile)
            throw new common_1.NotFoundException(`Employee profile with ID ${employeeId} not found`);
        return profile;
    }
    async updateContactInfo(employeeId, updateDto) {
        if (Object.keys(updateDto).length === 0) {
            throw new common_1.BadRequestException('No valid contact information provided for update.');
        }
        const updated = await this.employeeProfileModel
            .findByIdAndUpdate(employeeId, { $set: updateDto }, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Employee profile with ID ${employeeId} not found`);
        return updated;
    }
    async submitChangeRequest(employeeId, changes, reason) {
        const newRequest = new this.changeRequestModel({
            requestId: new mongoose_2.Types.ObjectId().toString(),
            employeeProfileId: new mongoose_2.Types.ObjectId(employeeId),
            requestDescription: JSON.stringify(changes),
            reason: reason,
            status: employee_profile_enums_1.ProfileChangeStatus.PENDING,
            submittedAt: new Date(),
        });
        return newRequest.save();
    }
    async getTeamProfiles(managerEmployeeId) {
        const managerProfile = await this.employeeProfileModel.findById(managerEmployeeId).exec();
        if (!managerProfile || !managerProfile.primaryPositionId) {
            throw new common_1.NotFoundException('Manager profile or position not found');
        }
        return this.employeeProfileModel.find({
            supervisorPositionId: managerProfile.primaryPositionId
        }).exec();
    }
    async approveChangeRequest(requestId) {
        const request = await this.changeRequestModel.findById(requestId);
        if (!request)
            throw new common_1.NotFoundException('Change request not found');
        if (request.status !== employee_profile_enums_1.ProfileChangeStatus.PENDING)
            throw new common_1.BadRequestException('Request is already processed');
        const requestedChanges = JSON.parse(request.requestDescription);
        const updatedProfile = await this.employeeProfileModel.findByIdAndUpdate(request.employeeProfileId, { $set: requestedChanges }, { new: true }).exec();
        if (!updatedProfile)
            throw new common_1.NotFoundException(`Employee profile not found`);
        request.status = employee_profile_enums_1.ProfileChangeStatus.APPROVED;
        request.processedAt = new Date();
        await request.save();
        return updatedProfile;
    }
    async rejectChangeRequest(requestId) {
        const request = await this.changeRequestModel.findById(requestId);
        if (!request)
            throw new common_1.NotFoundException('Change request not found');
        request.status = employee_profile_enums_1.ProfileChangeStatus.REJECTED;
        request.processedAt = new Date();
        return request.save();
    }
    async adminUpdateProfile(employeeId, updateData) {
        const updated = await this.employeeProfileModel
            .findByIdAndUpdate(employeeId, { $set: updateData }, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Employee profile with ID ${employeeId} not found`);
        return updated;
    }
    async createCandidate(dto) {
        const candidate = new this.candidateModel({
            ...dto,
            departmentId: dto.departmentId ? new mongoose_2.Types.ObjectId(dto.departmentId) : undefined,
            positionId: dto.positionId ? new mongoose_2.Types.ObjectId(dto.positionId) : undefined,
            status: employee_profile_enums_2.CandidateStatus.APPLIED,
            applicationDate: dto.applicationDate ? new Date(dto.applicationDate) : new Date(),
        });
        return candidate.save();
    }
    async getAllCandidates() {
        return this.candidateModel.find().exec();
    }
    async getCandidateById(id) {
        const candidate = await this.candidateModel.findById(id).exec();
        if (!candidate)
            throw new common_1.NotFoundException(`Candidate with ID ${id} not found`);
        return candidate;
    }
    async updateCandidate(id, updateData) {
        const updated = await this.candidateModel
            .findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Candidate with ID ${id} not found`);
        return updated;
    }
    async deleteCandidate(id) {
        const result = await this.candidateModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException(`Candidate with ID ${id} not found`);
    }
};
exports.EmployeeProfileService = EmployeeProfileService;
exports.EmployeeProfileService = EmployeeProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(1, (0, mongoose_1.InjectModel)(ep_change_request_schema_1.EmployeeProfileChangeRequest.name)),
    __param(2, (0, mongoose_1.InjectModel)(candidate_schema_1.Candidate.name)),
    __param(3, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __param(4, (0, mongoose_1.InjectModel)(qualification_schema_1.EmployeeQualification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], EmployeeProfileService);
//# sourceMappingURL=employee-profile.service.js.map