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
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const recruitment_service_1 = require("./recruitment.service");
const create_job_template_dto_1 = require("./dto/create-job-template.dto");
const update_job_template_dto_1 = require("./dto/update-job-template.dto");
const create_job_requisition_dto_1 = require("./dto/create-job-requisition.dto");
const update_job_requisition_dto_1 = require("./dto/update-job-requisition.dto");
const create_application_dto_1 = require("./dto/create-application.dto");
const update_application_status_dto_1 = require("./dto/update-application-status.dto");
const update_application_stage_dto_1 = require("./dto/update-application-stage.dto");
const reject_application_dto_1 = require("./dto/reject-application.dto");
const withdraw_application_dto_1 = require("./dto/withdraw-application.dto");
const hold_application_dto_1 = require("./dto/hold-application.dto");
const create_interview_dto_1 = require("./dto/create-interview.dto");
const update_interview_dto_1 = require("./dto/update-interview.dto");
const cancel_interview_dto_1 = require("./dto/cancel-interview.dto");
const create_assessment_result_dto_1 = require("./dto/create-assessment-result.dto");
const update_assessment_result_dto_1 = require("./dto/update-assessment-result.dto");
const create_referral_dto_1 = require("./dto/create-referral.dto");
const update_referral_dto_1 = require("./dto/update-referral.dto");
const create_offer_dto_1 = require("./dto/create-offer.dto");
const update_offer_status_dto_1 = require("./dto/update-offer-status.dto");
const respond_offer_dto_1 = require("./dto/respond-offer.dto");
let RecruitmentController = class RecruitmentController {
    recruitmentService;
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    createJobTemplate(dto) {
        return this.recruitmentService.createJobTemplate(dto);
    }
    findAllJobTemplates() {
        return this.recruitmentService.findAllJobTemplates();
    }
    findOneJobTemplate(id) {
        return this.recruitmentService.findOneJobTemplate(id);
    }
    updateJobTemplate(id, dto) {
        return this.recruitmentService.updateJobTemplate(id, dto);
    }
    removeJobTemplate(id) {
        return this.recruitmentService.removeJobTemplate(id);
    }
    createJobRequisition(dto) {
        return this.recruitmentService.createJobRequisition(dto);
    }
    findAllJobRequisitions() {
        return this.recruitmentService.findAllJobRequisitions();
    }
    findOneJobRequisition(id) {
        return this.recruitmentService.findOneJobRequisition(id);
    }
    updateJobRequisition(id, dto) {
        return this.recruitmentService.updateJobRequisition(id, dto);
    }
    removeJobRequisition(id) {
        return this.recruitmentService.removeJobRequisition(id);
    }
    createApplication(dto) {
        return this.recruitmentService.createApplication(dto);
    }
    findAllApplications() {
        return this.recruitmentService.findAllApplications();
    }
    findOneApplication(id) {
        return this.recruitmentService.findOneApplication(id);
    }
    getApplicationHistory(id) {
        return this.recruitmentService.getApplicationHistory(id);
    }
    updateApplicationStatus(id, dto) {
        return this.recruitmentService.updateApplicationStatus(id, dto);
    }
    updateApplicationStage(id, dto) {
        return this.recruitmentService.updateApplicationStage(id, dto);
    }
    rejectApplication(id, dto) {
        return this.recruitmentService.rejectApplication(id, dto);
    }
    withdrawApplication(id, dto) {
        return this.recruitmentService.withdrawApplication(id, dto);
    }
    holdApplication(id, dto) {
        return this.recruitmentService.holdApplication(id, dto);
    }
    scheduleInterview(dto) {
        return this.recruitmentService.scheduleInterview(dto);
    }
    updateInterview(id, dto) {
        return this.recruitmentService.updateInterview(id, dto);
    }
    cancelInterview(id, dto) {
        return this.recruitmentService.cancelInterview(id, dto);
    }
    getInterviewsForApplication(id) {
        return this.recruitmentService.getInterviewsForApplication(id);
    }
    createAssessmentResult(dto) {
        return this.recruitmentService.createAssessmentResult(dto);
    }
    updateAssessmentResult(id, dto) {
        return this.recruitmentService.updateAssessmentResult(id, dto);
    }
    getAssessmentsForApplication(id) {
        return this.recruitmentService.getAssessmentsForApplication(id);
    }
    getAssessmentsForInterview(id) {
        return this.recruitmentService.getAssessmentsForInterview(id);
    }
    createReferral(dto) {
        return this.recruitmentService.createReferral(dto);
    }
    updateReferral(id, dto) {
        return this.recruitmentService.updateReferral(id, dto);
    }
    getReferral(id) {
        return this.recruitmentService.getReferral(id);
    }
    getReferralsForCandidate(candidateId) {
        return this.recruitmentService.getReferralsForCandidate(candidateId);
    }
    getReferralsByEmployee(employeeId) {
        return this.recruitmentService.getReferralsByEmployee(employeeId);
    }
    createOffer(dto) {
        return this.recruitmentService.createOffer(dto);
    }
    updateOfferStatus(id, dto) {
        return this.recruitmentService.updateOfferStatus(id, dto);
    }
    acceptOffer(id, dto) {
        return this.recruitmentService.acceptOffer(id, dto);
    }
    rejectOffer(id, dto) {
        return this.recruitmentService.rejectOffer(id, dto);
    }
    getOfferForApplication(id) {
        return this.recruitmentService.getOfferForApplication(id);
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Post)('job-templates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_template_dto_1.CreateJobTemplateDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createJobTemplate", null);
__decorate([
    (0, common_1.Get)('job-templates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findAllJobTemplates", null);
__decorate([
    (0, common_1.Get)('job-templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findOneJobTemplate", null);
__decorate([
    (0, common_1.Patch)('job-templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_template_dto_1.UpdateJobTemplateDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateJobTemplate", null);
__decorate([
    (0, common_1.Delete)('job-templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "removeJobTemplate", null);
__decorate([
    (0, common_1.Post)('requisitions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_requisition_dto_1.CreateJobRequisitionDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createJobRequisition", null);
__decorate([
    (0, common_1.Get)('requisitions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findAllJobRequisitions", null);
__decorate([
    (0, common_1.Get)('requisitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findOneJobRequisition", null);
__decorate([
    (0, common_1.Patch)('requisitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_requisition_dto_1.UpdateJobRequisitionDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateJobRequisition", null);
__decorate([
    (0, common_1.Delete)('requisitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "removeJobRequisition", null);
__decorate([
    (0, common_1.Post)('applications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createApplication", null);
__decorate([
    (0, common_1.Get)('applications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findAllApplications", null);
__decorate([
    (0, common_1.Get)('applications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "findOneApplication", null);
__decorate([
    (0, common_1.Get)('applications/:id/history'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getApplicationHistory", null);
__decorate([
    (0, common_1.Patch)('applications/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_status_dto_1.UpdateApplicationStatusDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateApplicationStatus", null);
__decorate([
    (0, common_1.Patch)('applications/:id/stage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_stage_dto_1.UpdateApplicationStageDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateApplicationStage", null);
__decorate([
    (0, common_1.Patch)('applications/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_application_dto_1.RejectApplicationDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "rejectApplication", null);
__decorate([
    (0, common_1.Patch)('applications/:id/withdraw'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, withdraw_application_dto_1.WithdrawApplicationDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "withdrawApplication", null);
__decorate([
    (0, common_1.Patch)('applications/:id/hold'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hold_application_dto_1.HoldApplicationDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "holdApplication", null);
__decorate([
    (0, common_1.Post)('interviews'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interview_dto_1.CreateInterviewDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "scheduleInterview", null);
__decorate([
    (0, common_1.Patch)('interviews/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_interview_dto_1.UpdateInterviewDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateInterview", null);
__decorate([
    (0, common_1.Patch)('interviews/:id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_interview_dto_1.CancelInterviewDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "cancelInterview", null);
__decorate([
    (0, common_1.Get)('applications/:id/interviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getInterviewsForApplication", null);
__decorate([
    (0, common_1.Post)('assessments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assessment_result_dto_1.CreateAssessmentResultDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createAssessmentResult", null);
__decorate([
    (0, common_1.Patch)('assessments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assessment_result_dto_1.UpdateAssessmentResultDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateAssessmentResult", null);
__decorate([
    (0, common_1.Get)('applications/:id/assessments'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAssessmentsForApplication", null);
__decorate([
    (0, common_1.Get)('interviews/:id/assessments'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAssessmentsForInterview", null);
__decorate([
    (0, common_1.Post)('referrals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_referral_dto_1.CreateReferralDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createReferral", null);
__decorate([
    (0, common_1.Patch)('referrals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_referral_dto_1.UpdateReferralDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateReferral", null);
__decorate([
    (0, common_1.Get)('referrals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getReferral", null);
__decorate([
    (0, common_1.Get)('referrals/candidate/:candidateId'),
    __param(0, (0, common_1.Param)('candidateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getReferralsForCandidate", null);
__decorate([
    (0, common_1.Get)('referrals/employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getReferralsByEmployee", null);
__decorate([
    (0, common_1.Post)('offers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_offer_dto_1.CreateOfferDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createOffer", null);
__decorate([
    (0, common_1.Patch)('offers/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_offer_status_dto_1.UpdateOfferStatusDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateOfferStatus", null);
__decorate([
    (0, common_1.Patch)('offers/:id/accept'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, respond_offer_dto_1.RespondOfferDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "acceptOffer", null);
__decorate([
    (0, common_1.Patch)('offers/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, respond_offer_dto_1.RespondOfferDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "rejectOffer", null);
__decorate([
    (0, common_1.Get)('applications/:id/offer'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getOfferForApplication", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, common_1.Controller)('recruitment'),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map