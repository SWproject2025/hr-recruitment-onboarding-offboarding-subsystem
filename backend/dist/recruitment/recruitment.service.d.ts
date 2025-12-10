import { Model, Types } from 'mongoose';
import { JobTemplate, JobTemplateDocument } from './models/job-template.schema';
import { JobRequisition, JobRequisitionDocument } from './models/job-requisition.schema';
import { Application, ApplicationDocument } from './models/application.schema';
import { ApplicationStatusHistory, ApplicationStatusHistoryDocument } from './models/application-history.schema';
import { Interview, InterviewDocument } from './models/interview.schema';
import { AssessmentResult, AssessmentResultDocument } from './models/assessment-result.schema';
import { Referral, ReferralDocument } from './models/referral.schema';
import { Offer, OfferDocument } from './models/offer.schema';
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
export declare class RecruitmentService {
    private readonly jobTemplateModel;
    private readonly jobRequisitionModel;
    private readonly applicationModel;
    private readonly historyModel;
    private readonly interviewModel;
    private readonly assessmentResultModel;
    private readonly referralModel;
    private readonly offerModel;
    constructor(jobTemplateModel: Model<JobTemplateDocument>, jobRequisitionModel: Model<JobRequisitionDocument>, applicationModel: Model<ApplicationDocument>, historyModel: Model<ApplicationStatusHistoryDocument>, interviewModel: Model<InterviewDocument>, assessmentResultModel: Model<AssessmentResultDocument>, referralModel: Model<ReferralDocument>, offerModel: Model<OfferDocument>);
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
}
