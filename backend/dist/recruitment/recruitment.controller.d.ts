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
}
