import { PerformanceService } from './performance.service';
import { CreateAppraisalTemplateDto } from './dto/create-appraisal-template.dto';
import { UpdateAppraisalTemplateDto } from './dto/update-appraisal-template.dto';
import { CreateAppraisalCycleDto } from './dto/create-appraisal-cycle.dto';
import { SubmitAppraisalDto } from './dto/submit-appraisal.dto';
import { ResolveDisputeDto } from './dto/ResolveDisputeDto';
export declare class PerformanceController {
    private readonly performanceService;
    constructor(performanceService: PerformanceService);
    createTemplate(dto: CreateAppraisalTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllTemplates(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getTemplateById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateTemplate(id: string, dto: UpdateAppraisalTemplateDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-template.schema").AppraisalTemplate, {}, {}> & import("./models/appraisal-template.schema").AppraisalTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createCycle(dto: CreateAppraisalCycleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllCycles(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getCycleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-cycle.schema").AppraisalCycle, {}, {}> & import("./models/appraisal-cycle.schema").AppraisalCycle & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getManagerAssignments(managerProfileId: string, cycleId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getManagerAssignmentDetails(assignmentId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitManagerAppraisal(assignmentId: string, dto: SubmitAppraisalDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    publishAppraisal(assignmentId: string): Promise<{
        assignment: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        record: import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getEmployeeAppraisals(employeeProfileId: string, cycleId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getEmployeeAppraisal(assignmentId: string): Promise<{
        assignment: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        appraisalRecord: import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    acknowledgeAppraisal(assignmentId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitDispute(assignmentId: string, dto: {
        employeeProfileId: string;
        reason: string;
        employeeComments?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    resolveDispute(disputeId: string, dto: ResolveDisputeDto): Promise<{
        dispute: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-dispute.schema").AppraisalDispute, {}, {}> & import("./models/appraisal-dispute.schema").AppraisalDispute & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        assignment: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-assignment.schema").AppraisalAssignment, {}, {}> & import("./models/appraisal-assignment.schema").AppraisalAssignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        record: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/appraisal-record.schema").AppraisalRecord, {}, {}> & import("./models/appraisal-record.schema").AppraisalRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
