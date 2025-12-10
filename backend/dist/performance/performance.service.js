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
exports.PerformanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appraisal_template_schema_1 = require("./models/appraisal-template.schema");
const appraisal_cycle_schema_1 = require("./models/appraisal-cycle.schema");
const appraisal_assignment_schema_1 = require("./models/appraisal-assignment.schema");
const appraisal_record_schema_1 = require("./models/appraisal-record.schema");
const appraisal_dispute_schema_1 = require("./models/appraisal-dispute.schema");
const performance_enums_1 = require("./enums/performance.enums");
let PerformanceService = class PerformanceService {
    templateModel;
    cycleModel;
    assignmentModel;
    recordModel;
    disputeModel;
    constructor(templateModel, cycleModel, assignmentModel, recordModel, disputeModel) {
        this.templateModel = templateModel;
        this.cycleModel = cycleModel;
        this.assignmentModel = assignmentModel;
        this.recordModel = recordModel;
        this.disputeModel = disputeModel;
    }
    async createTemplate(dto) {
        const created = new this.templateModel({
            ...dto,
            isActive: dto.isActive ?? true,
        });
        return created.save();
    }
    async getAllTemplates() {
        return this.templateModel.find().exec();
    }
    async getTemplateById(id) {
        return this.templateModel.findById(id).exec();
    }
    async updateTemplate(id, dto) {
        return this.templateModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
    async createCycle(dto) {
        const cycle = await this.cycleModel.create({
            name: dto.name,
            description: dto.description,
            cycleType: dto.cycleType,
            startDate: dto.startDate,
            endDate: dto.endDate,
            managerDueDate: dto.managerDueDate,
            employeeAcknowledgementDueDate: dto.employeeAcknowledgementDueDate,
            templateAssignments: dto.templateAssignments ?? [],
        });
        if (dto.seedingAssignments && dto.seedingAssignments.length > 0) {
            await this.createAssignmentsForCycleFromSeed(cycle, dto.seedingAssignments);
        }
        return cycle;
    }
    async getAllCycles() {
        return this.cycleModel.find().exec();
    }
    async getCycleById(id) {
        return this.cycleModel.findById(id).exec();
    }
    async createAssignmentsForCycleFromSeed(cycle, seeds) {
        if (!seeds || seeds.length === 0)
            return;
        const docs = seeds.map((seed) => ({
            cycleId: cycle._id,
            templateId: seed.templateId,
            employeeProfileId: seed.employeeProfileId,
            managerProfileId: seed.managerProfileId,
            status: performance_enums_1.AppraisalAssignmentStatus.NOT_STARTED,
        }));
        await this.assignmentModel.insertMany(docs);
    }
    async getAssignmentsForManager(managerProfileId, cycleId) {
        const filter = {
            managerProfileId,
        };
        if (cycleId) {
            filter.cycleId = cycleId;
        }
        return this.assignmentModel
            .find(filter)
            .populate('employeeProfileId')
            .populate('cycleId')
            .populate('templateId')
            .exec();
    }
    async getAssignmentDetailsForManager(assignmentId) {
        const assignment = await this.assignmentModel
            .findById(assignmentId)
            .populate('employeeProfileId')
            .populate('managerProfileId')
            .populate('cycleId')
            .populate('templateId')
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Appraisal assignment not found');
        }
        return assignment;
    }
    async submitManagerAppraisal(assignmentId, dto) {
        const assignment = await this.assignmentModel
            .findById(assignmentId)
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Appraisal assignment not found');
        }
        if (![
            performance_enums_1.AppraisalAssignmentStatus.NOT_STARTED,
            performance_enums_1.AppraisalAssignmentStatus.IN_PROGRESS,
            performance_enums_1.AppraisalAssignmentStatus.SUBMITTED,
        ].includes(assignment.status)) {
            throw new common_1.BadRequestException(`Cannot submit appraisal in status: ${assignment.status}`);
        }
        const record = await this.recordModel.create({
            assignmentId: assignment._id,
            cycleId: assignment.cycleId,
            templateId: assignment.templateId,
            employeeProfileId: assignment.employeeProfileId,
            managerProfileId: assignment.managerProfileId,
            ratings: dto.ratings,
            totalScore: dto.totalScore,
            overallRatingLabel: dto.overallRatingLabel,
            managerSummary: dto.managerSummary,
            strengths: dto.strengths,
            improvementAreas: dto.improvementAreas,
            status: performance_enums_1.AppraisalRecordStatus.MANAGER_SUBMITTED,
            managerSubmittedAt: new Date(),
        });
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.SUBMITTED;
        assignment.submittedAt = new Date();
        assignment.latestAppraisalId = record._id;
        await assignment.save();
        return record;
    }
    async getLatestRecordForAssignment(assignment) {
        let record = null;
        if (assignment.latestAppraisalId) {
            record = await this.recordModel
                .findById(assignment.latestAppraisalId)
                .exec();
        }
        else {
            record = await this.recordModel
                .findOne({ assignmentId: assignment._id })
                .sort({ managerSubmittedAt: -1 })
                .exec();
        }
        if (!record) {
            throw new common_1.NotFoundException('No appraisal record found for this assignment');
        }
        return record;
    }
    async publishAppraisal(assignmentId) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Appraisal assignment not found');
        }
        if (assignment.status !== performance_enums_1.AppraisalAssignmentStatus.SUBMITTED) {
            throw new common_1.BadRequestException(`Only SUBMITTED appraisals can be published. Current status: ${assignment.status}`);
        }
        const record = await this.getLatestRecordForAssignment(assignment);
        record.status = performance_enums_1.AppraisalRecordStatus.HR_PUBLISHED;
        record.hrPublishedAt = new Date();
        await record.save();
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.PUBLISHED;
        assignment.publishedAt = new Date();
        await assignment.save();
        return { assignment, record };
    }
    async getAppraisalsForEmployee(employeeProfileId, cycleId) {
        const filter = {
            employeeProfileId,
        };
        if (cycleId) {
            filter.cycleId = cycleId;
        }
        return this.assignmentModel
            .find(filter)
            .populate('managerProfileId')
            .populate('cycleId')
            .populate('templateId')
            .exec();
    }
    async getEmployeeAppraisal(assignmentId) {
        const assignment = await this.assignmentModel
            .findById(assignmentId)
            .populate('employeeProfileId')
            .populate('managerProfileId')
            .populate('cycleId')
            .populate('templateId')
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Appraisal assignment not found');
        }
        const record = await this.getLatestRecordForAssignment(assignment);
        return {
            assignment,
            appraisalRecord: record,
        };
    }
    async acknowledgeAppraisal(assignmentId) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Appraisal assignment not found');
        }
        if (assignment.status !== performance_enums_1.AppraisalAssignmentStatus.PUBLISHED) {
            throw new common_1.BadRequestException(`Cannot acknowledge appraisal in status: ${assignment.status}`);
        }
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.ACKNOWLEDGED;
        assignment.employeeAcknowledgedAt = new Date();
        await assignment.save();
        return assignment;
    }
    async submitDispute(assignmentId, employeeProfileId, dto) {
        const assignment = await this.assignmentModel
            .findById(assignmentId)
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Appraisal assignment not found');
        }
        if (![
            performance_enums_1.AppraisalAssignmentStatus.PUBLISHED,
            performance_enums_1.AppraisalAssignmentStatus.ACKNOWLEDGED,
        ].includes(assignment.status)) {
            throw new common_1.BadRequestException(`Cannot dispute appraisal in status: ${assignment.status}`);
        }
        const record = await this.getLatestRecordForAssignment(assignment);
        const dispute = await this.disputeModel.create({
            assignmentId: assignment._id,
            cycleId: assignment.cycleId,
            employeeProfileId: assignment.employeeProfileId,
            managerProfileId: assignment.managerProfileId,
            raisedByEmployeeProfileId: employeeProfileId,
            appraisalRecordId: record._id,
            reason: dto.reason,
            employeeComments: dto.employeeComments,
            status: performance_enums_1.AppraisalDisputeStatus.OPEN,
            createdAt: new Date(),
        });
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.UNDER_DISPUTE;
        assignment.disputeId = dispute._id;
        await assignment.save();
        return dispute;
    }
    async resolveDispute(disputeId, dto) {
        const dispute = await this.disputeModel.findById(disputeId).exec();
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        const assignment = await this.assignmentModel
            .findOne({ _id: dispute.assignmentId })
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Related assignment not found');
        }
        const record = await this.recordModel
            .findById(dispute.appraisalRecordId)
            .exec();
        if (!record) {
            throw new common_1.NotFoundException('Related appraisal record not found');
        }
        dispute.status = dto.status;
        dispute.hrDecisionNotes = dto.hrDecisionNotes;
        dispute.resolvedAt = new Date();
        await dispute.save();
        if (dto.status === performance_enums_1.AppraisalDisputeStatus.ADJUSTED) {
            if (dto.adjustedTotalScore !== undefined) {
                record.totalScore = dto.adjustedTotalScore;
            }
            if (dto.adjustedOverallRatingLabel !== undefined) {
                record.overallRatingLabel = dto.adjustedOverallRatingLabel;
            }
            await record.save();
        }
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.FINALIZED;
        await assignment.save();
        return { dispute, assignment, record };
    }
};
exports.PerformanceService = PerformanceService;
exports.PerformanceService = PerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appraisal_template_schema_1.AppraisalTemplate.name)),
    __param(1, (0, mongoose_1.InjectModel)(appraisal_cycle_schema_1.AppraisalCycle.name)),
    __param(2, (0, mongoose_1.InjectModel)(appraisal_assignment_schema_1.AppraisalAssignment.name)),
    __param(3, (0, mongoose_1.InjectModel)(appraisal_record_schema_1.AppraisalRecord.name)),
    __param(4, (0, mongoose_1.InjectModel)(appraisal_dispute_schema_1.AppraisalDispute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PerformanceService);
//# sourceMappingURL=performance.service.js.map