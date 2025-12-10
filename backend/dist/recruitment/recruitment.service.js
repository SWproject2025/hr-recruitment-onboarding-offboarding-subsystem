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
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_template_schema_1 = require("./models/job-template.schema");
const job_requisition_schema_1 = require("./models/job-requisition.schema");
const application_schema_1 = require("./models/application.schema");
const application_history_schema_1 = require("./models/application-history.schema");
const interview_schema_1 = require("./models/interview.schema");
const assessment_result_schema_1 = require("./models/assessment-result.schema");
const referral_schema_1 = require("./models/referral.schema");
const offer_schema_1 = require("./models/offer.schema");
const application_stage_enum_1 = require("./enums/application-stage.enum");
const application_status_enum_1 = require("./enums/application-status.enum");
const interview_status_enum_1 = require("./enums/interview-status.enum");
const offer_response_status_enum_1 = require("./enums/offer-response-status.enum");
const offer_final_status_enum_1 = require("./enums/offer-final-status.enum");
let RecruitmentService = class RecruitmentService {
    jobTemplateModel;
    jobRequisitionModel;
    applicationModel;
    historyModel;
    interviewModel;
    assessmentResultModel;
    referralModel;
    offerModel;
    constructor(jobTemplateModel, jobRequisitionModel, applicationModel, historyModel, interviewModel, assessmentResultModel, referralModel, offerModel) {
        this.jobTemplateModel = jobTemplateModel;
        this.jobRequisitionModel = jobRequisitionModel;
        this.applicationModel = applicationModel;
        this.historyModel = historyModel;
        this.interviewModel = interviewModel;
        this.assessmentResultModel = assessmentResultModel;
        this.referralModel = referralModel;
        this.offerModel = offerModel;
    }
    async logHistory(applicationId, oldStage, newStage, oldStatus, newStatus, changedBy) {
        await this.historyModel.create({
            applicationId,
            oldStage,
            newStage,
            oldStatus,
            newStatus,
            changedBy,
        });
    }
    validateStageOrder(oldStage, newStage) {
        const order = [
            application_stage_enum_1.ApplicationStage.SCREENING,
            application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW,
            application_stage_enum_1.ApplicationStage.HR_INTERVIEW,
            application_stage_enum_1.ApplicationStage.OFFER,
        ];
        const oldIndex = order.indexOf(oldStage);
        const newIndex = order.indexOf(newStage);
        if (newIndex < oldIndex) {
            throw new common_1.BadRequestException('Cannot move backwards in stages');
        }
        if (newIndex > oldIndex + 1) {
            throw new common_1.BadRequestException('Cannot skip stages');
        }
    }
    validateMoveToInterview(stage, requisition) {
        if (stage === application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW ||
            stage === application_stage_enum_1.ApplicationStage.HR_INTERVIEW) {
            if (requisition.publishStatus === 'closed') {
                throw new common_1.BadRequestException('Cannot move to interview stage because requisition is closed');
            }
        }
    }
    async createJobTemplate(dto) {
        return new this.jobTemplateModel(dto).save();
    }
    async findAllJobTemplates() {
        return this.jobTemplateModel.find().exec();
    }
    async findOneJobTemplate(id) {
        const template = await this.jobTemplateModel.findById(id).exec();
        if (!template)
            throw new common_1.NotFoundException('Job template not found');
        return template;
    }
    async updateJobTemplate(id, dto) {
        const update = await this.jobTemplateModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!update)
            throw new common_1.NotFoundException('Job template not found');
        return update;
    }
    async removeJobTemplate(id) {
        const result = await this.jobTemplateModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Job template not found');
        return { deleted: true };
    }
    async createJobRequisition(dto) {
        return new this.jobRequisitionModel(dto).save();
    }
    async findAllJobRequisitions() {
        return this.jobRequisitionModel.find().populate('templateId').exec();
    }
    async findOneJobRequisition(id) {
        const requisition = await this.jobRequisitionModel
            .findById(id)
            .populate('templateId')
            .exec();
        if (!requisition)
            throw new common_1.NotFoundException('Job requisition not found');
        return requisition;
    }
    async updateJobRequisition(id, dto) {
        const updated = await this.jobRequisitionModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException('Job requisition not found');
        return updated;
    }
    async removeJobRequisition(id) {
        const result = await this.jobRequisitionModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Job requisition not found');
        return { deleted: true };
    }
    async createApplication(dto) {
        const requisition = await this.findOneJobRequisition(dto.requisitionId);
        if (requisition.publishStatus === 'closed') {
            throw new common_1.BadRequestException('Cannot apply to closed requisition');
        }
        return new this.applicationModel({
            candidateId: dto.candidateId,
            requisitionId: dto.requisitionId,
            assignedHr: dto.assignedHr,
            currentStage: application_stage_enum_1.ApplicationStage.SCREENING,
            status: application_status_enum_1.ApplicationStatus.SUBMITTED,
        }).save();
    }
    async findAllApplications() {
        return this.applicationModel.find().populate('requisitionId').exec();
    }
    async findOneApplication(id) {
        const app = await this.applicationModel
            .findById(id)
            .populate('requisitionId')
            .exec();
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        return app;
    }
    async updateApplicationStatus(id, dto) {
        const app = await this.findOneApplication(id);
        const oldStatus = app.status;
        const newStatus = dto.newStatus;
        if (newStatus === application_status_enum_1.ApplicationStatus.HIRED) {
            const acceptedOffer = await this.offerModel
                .findOne({
                applicationId: app._id,
                responseStatus: offer_response_status_enum_1.OfferResponseStatus.ACCEPTED,
            })
                .exec();
            if (!acceptedOffer) {
                throw new common_1.BadRequestException('Cannot mark hired unless there is an accepted offer');
            }
            if (app.currentStage !== application_stage_enum_1.ApplicationStage.OFFER) {
                throw new common_1.BadRequestException('Cannot mark hired unless current stage is OFFER');
            }
        }
        app.status = newStatus;
        await app.save();
        await this.logHistory(app._id, app.currentStage, app.currentStage, oldStatus, newStatus, dto.changedBy);
        return app;
    }
    async updateApplicationStage(id, dto) {
        const app = await this.findOneApplication(id);
        const requisition = await this.findOneJobRequisition(app.requisitionId.toString());
        const oldStage = app.currentStage;
        const newStage = dto.newStage;
        this.validateStageOrder(oldStage, newStage);
        this.validateMoveToInterview(newStage, requisition);
        app.currentStage = newStage;
        app.status = application_status_enum_1.ApplicationStatus.IN_PROCESS;
        await app.save();
        await this.logHistory(app._id, oldStage, newStage, application_status_enum_1.ApplicationStatus.IN_PROCESS, application_status_enum_1.ApplicationStatus.IN_PROCESS, dto.changedBy);
        return app;
    }
    async rejectApplication(id, dto) {
        const app = await this.findOneApplication(id);
        const oldStatus = app.status;
        app.status = application_status_enum_1.ApplicationStatus.REJECTED;
        await app.save();
        await this.logHistory(app._id, app.currentStage, app.currentStage, oldStatus, application_status_enum_1.ApplicationStatus.REJECTED, dto.changedBy);
        return app;
    }
    async withdrawApplication(id, dto) {
        const app = await this.findOneApplication(id);
        const oldStatus = app.status;
        app.status = application_status_enum_1.ApplicationStatus.REJECTED;
        await app.save();
        await this.logHistory(app._id, app.currentStage, app.currentStage, oldStatus, application_status_enum_1.ApplicationStatus.REJECTED, dto.changedBy);
        return app;
    }
    async holdApplication(id, dto) {
        const app = await this.findOneApplication(id);
        const oldStatus = app.status;
        app.status = application_status_enum_1.ApplicationStatus.IN_PROCESS;
        await app.save();
        await this.logHistory(app._id, app.currentStage, app.currentStage, oldStatus, application_status_enum_1.ApplicationStatus.IN_PROCESS, dto.changedBy);
        return app;
    }
    async getApplicationHistory(applicationId) {
        return this.historyModel
            .find({
            applicationId: new mongoose_2.Types.ObjectId(applicationId),
        })
            .sort({ createdAt: 1 })
            .exec();
    }
    async scheduleInterview(dto) {
        const app = await this.findOneApplication(dto.applicationId);
        if (app.status === application_status_enum_1.ApplicationStatus.REJECTED) {
            throw new common_1.BadRequestException('Cannot schedule interview for a rejected application');
        }
        if (app.currentStage === application_stage_enum_1.ApplicationStage.OFFER) {
            throw new common_1.BadRequestException('Cannot schedule interview after offer stage');
        }
        const interview = await this.interviewModel.create({
            applicationId: new mongoose_2.Types.ObjectId(dto.applicationId),
            stage: dto.stage,
            scheduledDate: dto.scheduledDate,
            method: dto.method,
            panel: dto.panel.map((id) => new mongoose_2.Types.ObjectId(id)),
            videoLink: dto.videoLink || '',
            calendarEventId: dto.calendarEventId || '',
            status: interview_status_enum_1.InterviewStatus.SCHEDULED,
        });
        await this.logHistory(app._id, app.currentStage, app.currentStage, app.status, app.status, dto.changedBy);
        return interview;
    }
    async updateInterview(id, dto) {
        const interview = await this.interviewModel.findById(id).exec();
        if (!interview)
            throw new common_1.NotFoundException('Interview not found');
        if (dto.scheduledDate)
            interview.scheduledDate = dto.scheduledDate;
        if (dto.method)
            interview.method = dto.method;
        if (dto.panel) {
            interview.panel = dto.panel.map((id) => new mongoose_2.Types.ObjectId(id));
        }
        if (dto.status)
            interview.status = dto.status;
        if (dto.videoLink)
            interview.videoLink = dto.videoLink;
        if (dto.calendarEventId) {
            interview.calendarEventId = dto.calendarEventId;
        }
        if (dto.candidateFeedback) {
            interview.candidateFeedback = dto.candidateFeedback;
        }
        await interview.save();
        return interview;
    }
    async cancelInterview(id, dto) {
        const interview = await this.interviewModel.findById(id).exec();
        if (!interview)
            throw new common_1.NotFoundException('Interview not found');
        interview.status = interview_status_enum_1.InterviewStatus.CANCELLED;
        interview.candidateFeedback = dto.reason;
        await interview.save();
        return interview;
    }
    async getInterviewsForApplication(applicationId) {
        return this.interviewModel
            .find({ applicationId: new mongoose_2.Types.ObjectId(applicationId) })
            .exec();
    }
    async createAssessmentResult(dto) {
        const interview = await this.interviewModel
            .findById(dto.interviewId)
            .exec();
        if (!interview)
            throw new common_1.NotFoundException('Interview not found');
        const app = await this.findOneApplication(interview.applicationId.toString());
        if (app.status === application_status_enum_1.ApplicationStatus.REJECTED) {
            throw new common_1.BadRequestException('Cannot add assessment for a rejected application');
        }
        if (app.currentStage === application_stage_enum_1.ApplicationStage.OFFER) {
            throw new common_1.BadRequestException('Cannot add assessment after offer stage');
        }
        const assessment = await this.assessmentResultModel.create({
            interviewId: interview._id,
            interviewerId: new mongoose_2.Types.ObjectId(dto.interviewerId),
            score: dto.score,
            comments: dto.comments || '',
        });
        interview.feedbackId = assessment._id;
        await interview.save();
        return assessment;
    }
    async updateAssessmentResult(id, dto) {
        const assessment = await this.assessmentResultModel.findById(id).exec();
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment result not found');
        }
        if (dto.score !== undefined) {
            assessment.score = dto.score;
        }
        if (dto.comments !== undefined) {
            assessment.comments = dto.comments;
        }
        await assessment.save();
        return assessment;
    }
    async getAssessmentsForApplication(applicationId) {
        const interviews = await this.interviewModel
            .find({ applicationId: new mongoose_2.Types.ObjectId(applicationId) })
            .select('_id')
            .exec();
        if (!interviews.length)
            return [];
        const interviewIds = interviews.map((i) => i._id);
        return this.assessmentResultModel
            .find({ interviewId: { $in: interviewIds } })
            .exec();
    }
    async getAssessmentsForInterview(interviewId) {
        return this.assessmentResultModel
            .find({ interviewId: new mongoose_2.Types.ObjectId(interviewId) })
            .exec();
    }
    async createReferral(dto) {
        const referral = await this.referralModel.create({
            referringEmployeeId: new mongoose_2.Types.ObjectId(dto.referringEmployeeId),
            candidateId: new mongoose_2.Types.ObjectId(dto.candidateId),
            role: dto.role,
            level: dto.level,
        });
        return referral;
    }
    async updateReferral(id, dto) {
        const referral = await this.referralModel.findById(id).exec();
        if (!referral)
            throw new common_1.NotFoundException('Referral not found');
        if (dto.role)
            referral.role = dto.role;
        if (dto.level)
            referral.level = dto.level;
        await referral.save();
        return referral;
    }
    async getReferral(id) {
        const referral = await this.referralModel.findById(id).exec();
        if (!referral)
            throw new common_1.NotFoundException('Referral not found');
        return referral;
    }
    async getReferralsForCandidate(candidateId) {
        return this.referralModel
            .find({ candidateId: new mongoose_2.Types.ObjectId(candidateId) })
            .exec();
    }
    async getReferralsByEmployee(employeeId) {
        return this.referralModel
            .find({ referringEmployeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .exec();
    }
    async createOffer(dto) {
        const app = await this.findOneApplication(dto.applicationId);
        if (app.currentStage !== application_stage_enum_1.ApplicationStage.OFFER) {
            throw new common_1.BadRequestException('Cannot generate offer unless application is in OFFER stage');
        }
        const offer = await this.offerModel.create({
            applicationId: new mongoose_2.Types.ObjectId(dto.applicationId),
            candidateId: new mongoose_2.Types.ObjectId(dto.candidateId),
        });
        await this.logHistory(app._id, app.currentStage, app.currentStage, app.status, app.status, dto.changedBy);
        return offer;
    }
    async updateOfferStatus(id, dto) {
        const offer = await this.offerModel.findById(id).exec();
        if (!offer)
            throw new common_1.NotFoundException('Offer not found');
        if (dto.responseStatus !== undefined) {
            offer.responseStatus = dto.responseStatus;
        }
        if (dto.finalStatus !== undefined) {
            offer.finalStatus = dto.finalStatus;
        }
        await offer.save();
        return offer;
    }
    async acceptOffer(id, dto) {
        const offer = await this.offerModel.findById(id).exec();
        if (!offer)
            throw new common_1.NotFoundException('Offer not found');
        offer.responseStatus = offer_response_status_enum_1.OfferResponseStatus.ACCEPTED;
        offer.finalStatus = offer_final_status_enum_1.OfferFinalStatus.APPROVED;
        offer.candidateSignedAt = new Date();
        await offer.save();
        const app = await this.findOneApplication(offer.applicationId.toString());
        const oldStatus = app.status;
        app.status = application_status_enum_1.ApplicationStatus.HIRED;
        await app.save();
        await this.logHistory(app._id, app.currentStage, app.currentStage, oldStatus, application_status_enum_1.ApplicationStatus.HIRED, dto.changedBy);
        return offer;
    }
    async rejectOffer(id, dto) {
        const offer = await this.offerModel.findById(id).exec();
        if (!offer)
            throw new common_1.NotFoundException('Offer not found');
        offer.responseStatus = offer_response_status_enum_1.OfferResponseStatus.REJECTED;
        offer.finalStatus = offer_final_status_enum_1.OfferFinalStatus.REJECTED;
        await offer.save();
        const app = await this.findOneApplication(offer.applicationId.toString());
        const oldStatus = app.status;
        app.status = application_status_enum_1.ApplicationStatus.REJECTED;
        await app.save();
        await this.logHistory(app._id, app.currentStage, app.currentStage, oldStatus, application_status_enum_1.ApplicationStatus.REJECTED, dto.changedBy);
        return offer;
    }
    async getOfferForApplication(applicationId) {
        return this.offerModel
            .findOne({ applicationId: new mongoose_2.Types.ObjectId(applicationId) })
            .exec();
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_template_schema_1.JobTemplate.name)),
    __param(1, (0, mongoose_1.InjectModel)(job_requisition_schema_1.JobRequisition.name)),
    __param(2, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __param(3, (0, mongoose_1.InjectModel)(application_history_schema_1.ApplicationStatusHistory.name)),
    __param(4, (0, mongoose_1.InjectModel)(interview_schema_1.Interview.name)),
    __param(5, (0, mongoose_1.InjectModel)(assessment_result_schema_1.AssessmentResult.name)),
    __param(6, (0, mongoose_1.InjectModel)(referral_schema_1.Referral.name)),
    __param(7, (0, mongoose_1.InjectModel)(offer_schema_1.Offer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map