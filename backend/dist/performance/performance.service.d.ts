import { Model } from 'mongoose';
import { AppraisalTemplate, AppraisalTemplateDocument } from './models/appraisal-template.schema';
import { AppraisalCycle, AppraisalCycleDocument } from './models/appraisal-cycle.schema';
import { AppraisalAssignment, AppraisalAssignmentDocument } from './models/appraisal-assignment.schema';
import { AppraisalRecord, AppraisalRecordDocument } from './models/appraisal-record.schema';
import { AppraisalDispute, AppraisalDisputeDocument } from './models/appraisal-dispute.schema';
import { CreateAppraisalTemplateDto } from './dto/create-appraisal-template.dto';
import { UpdateAppraisalTemplateDto } from './dto/update-appraisal-template.dto';
import { CreateAppraisalCycleDto } from './dto/create-appraisal-cycle.dto';
import { SubmitAppraisalDto } from './dto/submit-appraisal.dto';
import { SubmitDisputeDto } from './dto/SubmitDisputeDto';
import { ResolveDisputeDto } from './dto/ResolveDisputeDto';
export declare class PerformanceService {
    private readonly templateModel;
    private readonly cycleModel;
    private readonly assignmentModel;
    private readonly recordModel;
    private readonly disputeModel;
    constructor(templateModel: Model<AppraisalTemplateDocument>, cycleModel: Model<AppraisalCycleDocument>, assignmentModel: Model<AppraisalAssignmentDocument>, recordModel: Model<AppraisalRecordDocument>, disputeModel: Model<AppraisalDisputeDocument>);
    createTemplate(dto: CreateAppraisalTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllTemplates(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getTemplateById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateTemplate(id: string, dto: UpdateAppraisalTemplateDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalTemplate, {}, {}> & AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createCycle(dto: CreateAppraisalCycleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllCycles(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getCycleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalCycle, {}, {}> & AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    private createAssignmentsForCycleFromSeed;
    getAssignmentsForManager(managerProfileId: string, cycleId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getAssignmentDetailsForManager(assignmentId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitManagerAppraisal(assignmentId: string, dto: SubmitAppraisalDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    private getLatestRecordForAssignment;
    publishAppraisal(assignmentId: string): Promise<{
        assignment: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        record: import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getAppraisalsForEmployee(employeeProfileId: string, cycleId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getEmployeeAppraisal(assignmentId: string): Promise<{
        assignment: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        appraisalRecord: import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    acknowledgeAppraisal(assignmentId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitDispute(assignmentId: string, employeeProfileId: string, dto: SubmitDisputeDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    resolveDispute(disputeId: string, dto: ResolveDisputeDto): Promise<{
        dispute: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalDispute, {}, {}> & AppraisalDispute & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        assignment: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalAssignment, {}, {}> & AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        record: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AppraisalRecord, {}, {}> & AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
