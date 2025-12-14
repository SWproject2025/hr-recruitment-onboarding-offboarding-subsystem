import { Model, Types } from 'mongoose';
import { JobTemplate, JobTemplateDocument } from './models/job-template.schema';
import { JobRequisition, JobRequisitionDocument } from './models/job-requisition.schema';
import { Application, ApplicationDocument } from './models/application.schema';
import { ApplicationStatusHistory, ApplicationStatusHistoryDocument } from './models/application-history.schema';
import { Interview, InterviewDocument } from './models/interview.schema';
import { AssessmentResult, AssessmentResultDocument } from './models/assessment-result.schema';
import { Referral, ReferralDocument } from './models/referral.schema';
import { Offer, OfferDocument } from './models/offer.schema';
import { Contract, ContractDocument } from './models/contract.schema';
import { Document, DocumentDocument } from './models/document.schema';
import { Onboarding, OnboardingDocument } from './models/onboarding.schema';
import { TerminationRequest, TerminationRequestDocument } from './models/termination-request.schema';
import { ClearanceChecklist, ClearanceChecklistDocument } from './models/clearance-checklist.schema';
import { CreateJobTemplateDto } from './dto/create-job-template.dto';
import { UpdateJobTemplateDto } from './dto/update-job-template.dto';
import { CreateJobRequisitionDto } from './dto/create-job-requisition.dto';
import { UpdateJobRequisitionDto } from './dto/update-job-requisition.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStageDto } from './dto/update-application-stage.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
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
import { DocumentType } from './enums/document-type.enum';
export declare class RecruitmentService {
    private readonly jobTemplateModel;
    private readonly jobRequisitionModel;
    private readonly applicationModel;
    private readonly historyModel;
    private readonly interviewModel;
    private readonly assessmentResultModel;
    private readonly referralModel;
    private readonly offerModel;
    private readonly contractModel;
    private readonly documentModel;
    private readonly onboardingModel;
    private readonly terminationModel;
    private readonly clearanceModel;
    constructor(jobTemplateModel: Model<JobTemplateDocument>, jobRequisitionModel: Model<JobRequisitionDocument>, applicationModel: Model<ApplicationDocument>, historyModel: Model<ApplicationStatusHistoryDocument>, interviewModel: Model<InterviewDocument>, assessmentResultModel: Model<AssessmentResultDocument>, referralModel: Model<ReferralDocument>, offerModel: Model<OfferDocument>, contractModel: Model<ContractDocument>, documentModel: Model<DocumentDocument>, onboardingModel: Model<OnboardingDocument>, terminationModel: Model<TerminationRequestDocument>, clearanceModel: Model<ClearanceChecklistDocument>);
    private logHistory;
    private validateStageOrder;
    private validateMoveToInterview;
    createJobTemplate(dto: CreateJobTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAllJobTemplates(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findOneJobTemplate(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateJobTemplate(id: string, dto: UpdateJobTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobTemplate, {}, {}> & JobTemplate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    removeJobTemplate(id: string): Promise<{
        deleted: boolean;
    }>;
    createJobRequisition(dto: CreateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAllJobRequisitions(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findOneJobRequisition(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateJobRequisition(id: string, dto: UpdateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, JobRequisition, {}, {}> & JobRequisition & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    removeJobRequisition(id: string): Promise<{
        deleted: boolean;
    }>;
    createApplication(dto: CreateApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAllApplications(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findOneApplication(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateApplicationStatus(id: string, dto: UpdateApplicationStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateApplicationStage(id: string, dto: UpdateApplicationStageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    rejectApplication(id: string, dto: RejectApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    withdrawApplication(id: string, dto: WithdrawApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    holdApplication(id: string, dto: HoldApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Application, {}, {}> & Application & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getApplicationHistory(applicationId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ApplicationStatusHistory, {}, {}> & ApplicationStatusHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ApplicationStatusHistory, {}, {}> & ApplicationStatusHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    scheduleInterview(dto: CreateInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateInterview(id: string, dto: UpdateInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    cancelInterview(id: string, dto: CancelInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getInterviewsForApplication(applicationId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Interview, {}, {}> & Interview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    createAssessmentResult(dto: CreateAssessmentResultDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateAssessmentResult(id: string, dto: UpdateAssessmentResultDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAssessmentsForApplication(applicationId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getAssessmentsForInterview(interviewId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AssessmentResult, {}, {}> & AssessmentResult & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    createReferral(dto: CreateReferralDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateReferral(id: string, dto: UpdateReferralDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getReferral(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getReferralsForCandidate(candidateId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getReferralsByEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Referral, {}, {}> & Referral & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    createOffer(dto: CreateOfferDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateOfferStatus(id: string, dto: UpdateOfferStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    acceptOffer(id: string, dto: RespondOfferDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    rejectOffer(id: string, dto: RespondOfferDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getOfferForApplication(applicationId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Offer, {}, {}> & Offer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    createContract(dto: CreateContractDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateContract(id: string, dto: UpdateContractDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getContract(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getContractByOffer(offerId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    signContract(id: string, dto: SignContractDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    filterContracts(dto: FilterContractsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Contract, {}, {}> & Contract & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    uploadDocument(dto: CreateDocumentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateDocument(id: string, dto: UpdateDocumentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    deleteDocument(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getDocument(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getDocumentsForUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getDocumentsByType(type: DocumentType): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    filterDocuments(dto: FilterDocumentsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Document, {}, {}> & Document & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    createOnboarding(dto: CreateOnboardingDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateOnboarding(id: string, dto: UpdateOnboardingDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getOnboarding(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getOnboardingForEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    filterOnboardings(dto: FilterOnboardingsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    addOnboardingTask(onboardingId: string, dto: CreateOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateOnboardingTask(onboardingId: string, taskId: string, dto: UpdateOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    completeOnboardingTask(onboardingId: string, taskId: string, dto: CompleteOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    completeOnboarding(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getOnboardingProgress(id: string): Promise<{
        totalTasks: number;
        completedTasks: number;
        progress: number;
        onboarding: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Onboarding, {}, {}> & Onboarding & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    createTerminationRequest(dto: CreateTerminationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateTerminationRequest(id: string, dto: UpdateTerminationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getTerminationRequest(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getTerminationForEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    filterTerminationRequests(dto: FilterTerminationRequestDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    approveTermination(id: string, dto: ApproveTerminationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    rejectTermination(id: string, dto: RejectTerminationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TerminationRequest, {}, {}> & TerminationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    createClearanceChecklist(dto: CreateClearanceChecklistDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateClearanceChecklist(id: string, dto: UpdateClearanceChecklistDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getClearanceChecklist(terminationId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    updateClearanceItem(checklistId: string, itemId: string, dto: UpdateClearanceItemDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    approveClearanceItem(checklistId: string, itemId: string, dto: ApproveClearanceItemDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getClearanceProgress(checklistId: string): Promise<{
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
        clearance: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ClearanceChecklist, {}, {}> & ClearanceChecklist & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
}
