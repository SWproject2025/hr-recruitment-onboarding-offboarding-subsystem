import { RecruitmentService } from './recruitment.service';
import { CreateJobTemplateDto } from './dto/create-job-template.dto';
import { UpdateJobTemplateDto } from './dto/update-job-template.dto';
import { CreateJobRequisitionDto } from './dto/create-job-requisition.dto';
import { UpdateJobRequisitionDto } from './dto/update-job-requisition.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { UpdateApplicationStageDto } from './dto/update-application-stage.dto';
import { RejectApplicationDto } from './dto/reject-application.dto';
import { WithdrawApplicationDto } from './dto/withdraw-application.dto';
import { HoldApplicationDto } from './dto/hold-application.dto';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { CancelInterviewDto } from './dto/cancel-interview.dto';
import { CreateAssessmentResultDto } from './dto/create-assessment-result.dto';
import { UpdateAssessmentResultDto } from './dto/update-assessment-result.dto';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
import { RespondOfferDto } from './dto/respond-offer.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { SignContractDto } from './dto/sign-contract.dto';
import { FilterContractsDto } from './dto/filter-contracts.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FilterDocumentsDto } from './dto/filter-documents.dto';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { CreateOnboardingTaskDto } from './dto/create-onboarding-task.dto';
import { UpdateOnboardingTaskDto } from './dto/update-onboarding-task.dto';
import { CompleteOnboardingTaskDto } from './dto/complete-onboarding-task.dto';
import { FilterOnboardingsDto } from './dto/filter-onboardings.dto';
import { CreateTerminationRequestDto } from './dto/create-termination-request.dto';
import { UpdateTerminationRequestDto } from './dto/update-termination-request.dto';
import { ApproveTerminationDto } from './dto/approve-termination.dto';
import { RejectTerminationDto } from './dto/reject-termination.dto';
import { FilterTerminationRequestDto } from './dto/filter-termination-request.dto';
import { CreateClearanceChecklistDto } from './dto/create-clearance-checklist.dto';
import { UpdateClearanceChecklistDto } from './dto/update-clearance-checklist.dto';
import { UpdateClearanceItemDto } from './dto/update-clearance-item.dto';
import { ApproveClearanceItemDto } from './dto/approve-clearance-item.dto';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    createJobTemplate(dto: CreateJobTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllJobTemplates(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOneJobTemplate(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateJobTemplate(id: string, dto: UpdateJobTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-template.schema").JobTemplate, {}, {}> & import("./models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeJobTemplate(id: string): Promise<{
        deleted: boolean;
    }>;
    createJobRequisition(dto: CreateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllJobRequisitions(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOneJobRequisition(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateJobRequisition(id: string, dto: UpdateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeJobRequisition(id: string): Promise<{
        deleted: boolean;
    }>;
    createApplication(dto: CreateApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllApplications(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOneApplication(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getApplicationHistory(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application-history.schema").ApplicationStatusHistory, {}, {}> & import("./models/application-history.schema").ApplicationStatusHistory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application-history.schema").ApplicationStatusHistory, {}, {}> & import("./models/application-history.schema").ApplicationStatusHistory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    updateApplicationStatus(id: string, dto: UpdateApplicationStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateApplicationStage(id: string, dto: UpdateApplicationStageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectApplication(id: string, dto: RejectApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    withdrawApplication(id: string, dto: WithdrawApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    holdApplication(id: string, dto: HoldApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/application.schema").Application, {}, {}> & import("./models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    scheduleInterview(dto: CreateInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateInterview(id: string, dto: UpdateInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    cancelInterview(id: string, dto: CancelInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getInterviewsForApplication(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/interview.schema").Interview, {}, {}> & import("./models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createAssessmentResult(dto: CreateAssessmentResultDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateAssessmentResult(id: string, dto: UpdateAssessmentResultDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAssessmentsForApplication(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getAssessmentsForInterview(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/assessment-result.schema").AssessmentResult, {}, {}> & import("./models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createReferral(dto: CreateReferralDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateReferral(id: string, dto: UpdateReferralDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getReferral(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getReferralsForCandidate(candidateId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getReferralsByEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/referral.schema").Referral, {}, {}> & import("./models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createOffer(dto: CreateOfferDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateOfferStatus(id: string, dto: UpdateOfferStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    acceptOffer(id: string, dto: RespondOfferDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectOffer(id: string, dto: RespondOfferDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getOfferForApplication(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/offer.schema").Offer, {}, {}> & import("./models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createContract(dto: CreateContractDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getContract(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateContract(id: string, dto: UpdateContractDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    signContract(id: string, dto: SignContractDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getContractByOffer(offerId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    filterContracts(dto: FilterContractsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/contract.schema").Contract, {}, {}> & import("./models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    uploadDocument(dto: CreateDocumentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getDocument(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateDocument(id: string, dto: UpdateDocumentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteDocument(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getDocumentsForUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    filterDocuments(dto: FilterDocumentsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/document.schema").Document, {}, {}> & import("./models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createOnboarding(dto: CreateOnboardingDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getOnboarding(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateOnboarding(id: string, dto: UpdateOnboardingDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getOnboardingForEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    filterOnboardings(dto: FilterOnboardingsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    addOnboardingTask(id: string, dto: CreateOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateOnboardingTask(id: string, taskId: string, dto: UpdateOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    completeOnboardingTask(id: string, taskId: string, dto: CompleteOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    completeOnboarding(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getOnboardingProgress(id: string): Promise<{
        totalTasks: number;
        completedTasks: number;
        progress: number;
        onboarding: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/onboarding.schema").Onboarding, {}, {}> & import("./models/onboarding.schema").Onboarding & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    createTerminationRequest(dto: CreateTerminationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getTerminationRequest(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateTerminationRequest(id: string, dto: UpdateTerminationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getTerminationForEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    filterTerminationRequests(dto: FilterTerminationRequestDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    approveTermination(id: string, dto: ApproveTerminationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectTermination(id: string, dto: RejectTerminationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/termination-request.schema").TerminationRequest, {}, {}> & import("./models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createClearanceChecklist(id: string, dto: CreateClearanceChecklistDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getClearanceChecklist(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateClearanceChecklist(id: string, dto: UpdateClearanceChecklistDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateClearanceItem(id: string, itemId: string, dto: UpdateClearanceItemDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    approveClearanceItem(id: string, itemId: string, dto: ApproveClearanceItemDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getClearanceProgress(id: string): Promise<{
        totalItems: number;
        approvedItems: number;
        totalEquipment: number;
        returnedEquipment: number;
        cardReturned: boolean;
        isComplete: boolean;
        progress: {
            items: number;
            equipment: number;
        };
        clearance: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    markEquipmentReturned(id: string, equipmentId: string, dto: {
        returned: boolean;
        condition?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("./models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
