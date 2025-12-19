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
const contract_schema_1 = require("./models/contract.schema");
const document_schema_1 = require("./models/document.schema");
const onboarding_schema_1 = require("./models/onboarding.schema");
const termination_request_schema_1 = require("./models/termination-request.schema");
const clearance_checklist_schema_1 = require("./models/clearance-checklist.schema");
const application_stage_enum_1 = require("./enums/application-stage.enum");
const application_status_enum_1 = require("./enums/application-status.enum");
const interview_status_enum_1 = require("./enums/interview-status.enum");
const offer_response_status_enum_1 = require("./enums/offer-response-status.enum");
const offer_final_status_enum_1 = require("./enums/offer-final-status.enum");
const onboarding_task_status_enum_1 = require("./enums/onboarding-task-status.enum");
const termination_status_enum_1 = require("./enums/termination-status.enum");
const approval_status_enum_1 = require("./enums/approval-status.enum");
let RecruitmentService = class RecruitmentService {
    jobTemplateModel;
    jobRequisitionModel;
    applicationModel;
    historyModel;
    interviewModel;
    assessmentResultModel;
    referralModel;
    offerModel;
    contractModel;
    documentModel;
    onboardingModel;
    terminationModel;
    clearanceModel;
    constructor(jobTemplateModel, jobRequisitionModel, applicationModel, historyModel, interviewModel, assessmentResultModel, referralModel, offerModel, contractModel, documentModel, onboardingModel, terminationModel, clearanceModel) {
        this.jobTemplateModel = jobTemplateModel;
        this.jobRequisitionModel = jobRequisitionModel;
        this.applicationModel = applicationModel;
        this.historyModel = historyModel;
        this.interviewModel = interviewModel;
        this.assessmentResultModel = assessmentResultModel;
        this.referralModel = referralModel;
        this.offerModel = offerModel;
        this.contractModel = contractModel;
        this.documentModel = documentModel;
        this.onboardingModel = onboardingModel;
        this.terminationModel = terminationModel;
        this.clearanceModel = clearanceModel;
    }
    async logHistory(applicationId, oldStage, newStage, oldStatus, newStatus, changedBy) {
        await this.historyModel.create({
            applicationId,
            oldStage,
            newStage,
            oldStatus,
            newStatus,
            changedBy: new mongoose_2.Types.ObjectId(changedBy),
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
        const requisitionId = app.requisitionId instanceof mongoose_2.Types.ObjectId
            ? app.requisitionId.toString()
            : app.requisitionId._id.toString();
        const requisition = await this.findOneJobRequisition(requisitionId);
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
            hrEmployeeId: dto.hrEmployeeId ? new mongoose_2.Types.ObjectId(dto.hrEmployeeId) : undefined,
            grossSalary: dto.grossSalary,
            signingBonus: dto.signingBonus,
            benefits: dto.benefits,
            conditions: dto.conditions,
            insurances: dto.insurances,
            content: dto.content,
            role: dto.role,
            deadline: dto.deadline ? new Date(dto.deadline) : undefined,
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
        await this.createOnboarding({
            employeeId: app.candidateId.toString(),
        });
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
    async createContract(dto) {
        const contract = await this.contractModel.create({
            offerId: new mongoose_2.Types.ObjectId(dto.offerId),
            acceptanceDate: dto.acceptanceDate ? new Date(dto.acceptanceDate) : new Date(),
            grossSalary: dto.grossSalary,
            signingBonus: dto.signingBonus,
            role: dto.role,
            benefits: dto.benefits,
            documentId: dto.documentId ? new mongoose_2.Types.ObjectId(dto.documentId) : undefined,
        });
        return contract;
    }
    async updateContract(id, dto) {
        const contract = await this.contractModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!contract)
            throw new common_1.NotFoundException('Contract not found');
        return contract;
    }
    async getContract(id) {
        const contract = await this.contractModel.findById(id).exec();
        if (!contract)
            throw new common_1.NotFoundException('Contract not found');
        return contract;
    }
    async getContractByOffer(offerId) {
        return this.contractModel
            .findOne({ offerId: new mongoose_2.Types.ObjectId(offerId) })
            .exec();
    }
    async signContract(id, dto) {
        const contract = await this.contractModel.findById(id).exec();
        if (!contract)
            throw new common_1.NotFoundException('Contract not found');
        if (dto.signerRole === 'employee') {
            contract.employeeSignatureUrl = dto.signatureUrl;
            contract.employeeSignedAt = new Date();
        }
        else {
            contract.employerSignatureUrl = dto.signatureUrl;
            contract.employerSignedAt = new Date();
        }
        await contract.save();
        return contract;
    }
    async filterContracts(dto) {
        const filter = {};
        if (dto.offerId)
            filter.offerId = new mongoose_2.Types.ObjectId(dto.offerId);
        return this.contractModel.find(filter).exec();
    }
    async uploadDocument(dto) {
        const document = await this.documentModel.create({
            ownerId: dto.ownerId ? new mongoose_2.Types.ObjectId(dto.ownerId) : undefined,
            type: dto.type,
            filePath: dto.filePath,
            uploadedAt: new Date(),
        });
        return document;
    }
    async updateDocument(id, dto) {
        const document = await this.documentModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!document)
            throw new common_1.NotFoundException('Document not found');
        return document;
    }
    async deleteDocument(id) {
        const document = await this.documentModel.findByIdAndDelete(id).exec();
        if (!document)
            throw new common_1.NotFoundException('Document not found');
        return document;
    }
    async getDocument(id) {
        const document = await this.documentModel.findById(id).exec();
        if (!document)
            throw new common_1.NotFoundException('Document not found');
        return document;
    }
    async getDocumentsForUser(userId) {
        return this.documentModel
            .find({ ownerId: new mongoose_2.Types.ObjectId(userId) })
            .exec();
    }
    async getDocumentsByType(type) {
        return this.documentModel.find({ type }).exec();
    }
    async filterDocuments(dto) {
        const filter = {};
        if (dto.ownerId)
            filter.ownerId = new mongoose_2.Types.ObjectId(dto.ownerId);
        if (dto.type)
            filter.type = dto.type;
        return this.documentModel.find(filter).exec();
    }
    async createOnboarding(dto) {
        const defaultTasks = dto.tasks || [
            { name: 'Upload ID Documents', department: 'HR', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
            { name: 'Email and System Setup', department: 'IT', deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
            { name: 'Office Access Card', department: 'Admin', deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
            { name: 'Benefits Enrollment', department: 'HR', deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
            { name: 'Orientation Training', department: 'HR', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        ];
        const onboarding = await this.onboardingModel.create({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            tasks: defaultTasks.map(task => ({
                ...task,
                status: onboarding_task_status_enum_1.OnboardingTaskStatus.PENDING,
            })),
            completed: false,
        });
        return onboarding;
    }
    async updateOnboarding(id, dto) {
        const onboarding = await this.onboardingModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        return onboarding;
    }
    async getOnboarding(id) {
        const onboarding = await this.onboardingModel.findById(id).exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        return onboarding;
    }
    async getOnboardingForEmployee(employeeId) {
        return this.onboardingModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .exec();
    }
    async filterOnboardings(dto) {
        const filter = {};
        if (dto.employeeId)
            filter.employeeId = new mongoose_2.Types.ObjectId(dto.employeeId);
        if (dto.completed !== undefined)
            filter.completed = dto.completed;
        return this.onboardingModel.find(filter).exec();
    }
    async addOnboardingTask(onboardingId, dto) {
        const onboarding = await this.onboardingModel.findById(onboardingId).exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        onboarding.tasks.push({
            ...dto,
            status: onboarding_task_status_enum_1.OnboardingTaskStatus.PENDING,
        });
        await onboarding.save();
        return onboarding;
    }
    async updateOnboardingTask(onboardingId, taskId, dto) {
        const onboarding = await this.onboardingModel.findById(onboardingId).exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        const task = onboarding.tasks.id(taskId);
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        Object.assign(task, dto);
        await onboarding.save();
        return onboarding;
    }
    async completeOnboardingTask(onboardingId, taskId, dto) {
        const onboarding = await this.onboardingModel.findById(onboardingId).exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        const task = onboarding.tasks.id(taskId);
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        task.status = onboarding_task_status_enum_1.OnboardingTaskStatus.COMPLETED;
        task.completedAt = new Date();
        if (dto.documentId) {
            task.documentId = new mongoose_2.Types.ObjectId(dto.documentId);
        }
        if (dto.notes) {
            task.notes = dto.notes;
        }
        await onboarding.save();
        return onboarding;
    }
    async completeOnboarding(id) {
        const onboarding = await this.onboardingModel.findById(id).exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        const allCompleted = onboarding.tasks.every((task) => task.status === onboarding_task_status_enum_1.OnboardingTaskStatus.COMPLETED);
        if (!allCompleted) {
            throw new common_1.BadRequestException('Not all tasks are completed');
        }
        onboarding.completed = true;
        onboarding.completedAt = new Date();
        await onboarding.save();
        return onboarding;
    }
    async getOnboardingProgress(id) {
        const onboarding = await this.onboardingModel.findById(id).exec();
        if (!onboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        const totalTasks = onboarding.tasks.length;
        const completedTasks = onboarding.tasks.filter((task) => task.status === onboarding_task_status_enum_1.OnboardingTaskStatus.COMPLETED).length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        return {
            totalTasks,
            completedTasks,
            progress: Math.round(progress),
            onboarding,
        };
    }
    async createTerminationRequest(dto) {
        const termination = await this.terminationModel.create({
            ...dto,
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            contractId: new mongoose_2.Types.ObjectId(dto.contractId),
            status: termination_status_enum_1.TerminationStatus.PENDING,
        });
        return termination;
    }
    async updateTerminationRequest(id, dto) {
        const termination = await this.terminationModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!termination)
            throw new common_1.NotFoundException('Termination request not found');
        return termination;
    }
    async getTerminationRequest(id) {
        const termination = await this.terminationModel.findById(id).exec();
        if (!termination)
            throw new common_1.NotFoundException('Termination request not found');
        return termination;
    }
    async getTerminationForEmployee(employeeId) {
        return this.terminationModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .exec();
    }
    async filterTerminationRequests(dto) {
        const filter = {};
        if (dto.employeeId)
            filter.employeeId = new mongoose_2.Types.ObjectId(dto.employeeId);
        if (dto.status)
            filter.status = dto.status;
        if (dto.initiator)
            filter.initiator = dto.initiator;
        return this.terminationModel.find(filter).exec();
    }
    async approveTermination(id, dto) {
        const termination = await this.terminationModel.findById(id).exec();
        if (!termination)
            throw new common_1.NotFoundException('Termination request not found');
        termination.status = termination_status_enum_1.TerminationStatus.APPROVED;
        termination.hrComments = dto.hrComments;
        termination.terminationDate = dto.terminationDate;
        await termination.save();
        await this.createClearanceChecklist({
            terminationId: id,
            departments: ['IT', 'Finance', 'Facilities', 'HR', 'Admin'],
        });
        return termination;
    }
    async rejectTermination(id, dto) {
        const termination = await this.terminationModel.findById(id).exec();
        if (!termination)
            throw new common_1.NotFoundException('Termination request not found');
        termination.status = termination_status_enum_1.TerminationStatus.REJECTED;
        termination.hrComments = dto.hrComments;
        await termination.save();
        return termination;
    }
    async createClearanceChecklist(dto) {
        const departments = dto.departments || ['IT', 'Finance', 'Facilities', 'HR', 'Admin'];
        const items = departments.map(dept => ({
            department: dept,
            status: approval_status_enum_1.ApprovalStatus.PENDING,
        }));
        const equipmentList = dto.equipmentList?.map(eq => ({
            name: eq.name,
            equipmentId: eq.equipmentId ? new mongoose_2.Types.ObjectId(eq.equipmentId) : undefined,
            returned: false,
        })) || [];
        const clearance = await this.clearanceModel.create({
            terminationId: new mongoose_2.Types.ObjectId(dto.terminationId),
            items,
            equipmentList,
            cardReturned: false,
        });
        return clearance;
    }
    async updateClearanceChecklist(id, dto) {
        const clearance = await this.clearanceModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!clearance)
            throw new common_1.NotFoundException('Clearance checklist not found');
        return clearance;
    }
    async getClearanceChecklist(terminationId) {
        return this.clearanceModel
            .findOne({ terminationId: new mongoose_2.Types.ObjectId(terminationId) })
            .exec();
    }
    async updateClearanceItem(checklistId, itemId, dto) {
        const clearance = await this.clearanceModel.findById(checklistId).exec();
        if (!clearance)
            throw new common_1.NotFoundException('Clearance checklist not found');
        const item = clearance.items.id(itemId);
        if (!item)
            throw new common_1.NotFoundException('Clearance item not found');
        if (dto.status)
            item.status = dto.status;
        if (dto.comments)
            item.comments = dto.comments;
        item.updatedBy = new mongoose_2.Types.ObjectId(dto.updatedBy);
        item.updatedAt = new Date();
        await clearance.save();
        return clearance;
    }
    async approveClearanceItem(checklistId, itemId, dto) {
        const clearance = await this.clearanceModel.findById(checklistId).exec();
        if (!clearance)
            throw new common_1.NotFoundException('Clearance checklist not found');
        const item = clearance.items.id(itemId);
        if (!item)
            throw new common_1.NotFoundException('Clearance item not found');
        item.status = approval_status_enum_1.ApprovalStatus.APPROVED;
        if (dto.comments)
            item.comments = dto.comments;
        item.updatedBy = new mongoose_2.Types.ObjectId(dto.updatedBy);
        item.updatedAt = new Date();
        await clearance.save();
        return clearance;
    }
    async getClearanceProgress(checklistId) {
        const clearance = await this.clearanceModel.findById(checklistId).exec();
        if (!clearance)
            throw new common_1.NotFoundException('Clearance checklist not found');
        const totalItems = clearance.items.length;
        const approvedItems = clearance.items.filter((item) => item.status === approval_status_enum_1.ApprovalStatus.APPROVED).length;
        const totalEquipment = clearance.equipmentList.length;
        const returnedEquipment = clearance.equipmentList.filter((eq) => eq.returned === true).length;
        const allItemsApproved = totalItems > 0 ? approvedItems === totalItems : true;
        const allEquipmentReturned = totalEquipment > 0 ? returnedEquipment === totalEquipment : true;
        const cardReturned = clearance.cardReturned;
        const isComplete = allItemsApproved && allEquipmentReturned && cardReturned;
        return {
            totalItems,
            approvedItems,
            totalEquipment,
            returnedEquipment,
            cardReturned,
            isComplete,
            progress: {
                items: totalItems > 0 ? Math.round((approvedItems / totalItems) * 100) : 100,
                equipment: totalEquipment > 0 ? Math.round((returnedEquipment / totalEquipment) * 100) : 100,
            },
            clearance,
        };
    }
    async markEquipmentReturned(checklistId, equipmentId, dto) {
        const clearance = await this.clearanceModel.findById(checklistId).exec();
        if (!clearance)
            throw new common_1.NotFoundException('Clearance checklist not found');
        const equipment = clearance.equipmentList.id(equipmentId);
        if (!equipment)
            throw new common_1.NotFoundException('Equipment not found');
        equipment.returned = dto.returned;
        if (dto.condition)
            equipment.condition = dto.condition;
        await clearance.save();
        return clearance;
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
    __param(8, (0, mongoose_1.InjectModel)(contract_schema_1.Contract.name)),
    __param(9, (0, mongoose_1.InjectModel)(document_schema_1.Document.name)),
    __param(10, (0, mongoose_1.InjectModel)(onboarding_schema_1.Onboarding.name)),
    __param(11, (0, mongoose_1.InjectModel)(termination_request_schema_1.TerminationRequest.name)),
    __param(12, (0, mongoose_1.InjectModel)(clearance_checklist_schema_1.ClearanceChecklist.name)),
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
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map