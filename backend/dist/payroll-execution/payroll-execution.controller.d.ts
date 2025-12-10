import { PayrollExecutionService } from './payroll-execution.service';
import { EditSigningBonusDto } from './dto/editSigningBonusDto';
import { EditBenefitDto } from './dto/editBenefitDto';
import { ValidatePayrollPeriodDto } from './dto/validatePayrollPeriodDto';
import { ApprovePayrollPeriodDto } from './dto/approvePayrollPeriodDto';
import { RejectPayrollPeriodDto } from './dto/rejectPayrollPeriodDto';
import { EditPayrollPeriodDto } from './dto/editPayrollPeriodDto';
import { StartPayrollInitiationDto } from './dto/startPayrollInitiationDto';
export declare class PayrollExecutionController {
    private readonly payrollExecutionService;
    constructor(payrollExecutionService: PayrollExecutionService);
    getPendingSigningBonuses(): Promise<(import("mongoose").Document<unknown, {}, import("./models/EmployeeSigningBonus.schema").employeeSigningBonus, {}, {}> & import("./models/EmployeeSigningBonus.schema").employeeSigningBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getSigningBonusById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeSigningBonus.schema").employeeSigningBonus, {}, {}> & import("./models/EmployeeSigningBonus.schema").employeeSigningBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveSigningBonus(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeSigningBonus.schema").employeeSigningBonus, {}, {}> & import("./models/EmployeeSigningBonus.schema").employeeSigningBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    rejectSigningBonus(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeSigningBonus.schema").employeeSigningBonus, {}, {}> & import("./models/EmployeeSigningBonus.schema").employeeSigningBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    editSigningBonus(id: string, editSigningBonusDto: EditSigningBonusDto): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeSigningBonus.schema").employeeSigningBonus, {}, {}> & import("./models/EmployeeSigningBonus.schema").employeeSigningBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingBenefits(): Promise<(import("mongoose").Document<unknown, {}, import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation, {}, {}> & import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getBenefitById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation, {}, {}> & import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveBenefit(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation, {}, {}> & import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    rejectBenefit(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation, {}, {}> & import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    editBenefit(id: string, editBenefitDto: EditBenefitDto): Promise<import("mongoose").Document<unknown, {}, import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation, {}, {}> & import("./models/EmployeeTerminationResignation.schema").EmployeeTerminationResignation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getSuggestedPayrollPeriod(): Promise<{
        payrollPeriod: string;
    }>;
    validatePayrollPeriod(validatePayrollPeriodDto: ValidatePayrollPeriodDto): Promise<{
        isValid: boolean;
        errors: string[] | undefined;
        warnings: string[] | undefined;
    }>;
    getPayrollRunById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    approvePayrollPeriod(id: string, approvePayrollPeriodDto: ApprovePayrollPeriodDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    rejectPayrollPeriod(id: string, rejectPayrollPeriodDto: RejectPayrollPeriodDto): Promise<{
        message: string;
        payrollRun: import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    editPayrollPeriod(id: string, editPayrollPeriodDto: EditPayrollPeriodDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    startPayrollInitiation(startPayrollInitiationDto: StartPayrollInitiationDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    checkPreRunApprovalsComplete(): Promise<{
        allApprovalsComplete: boolean;
        pendingSigningBonuses: number;
        pendingBenefits: number;
        blockers: string[] | undefined;
    }>;
    publishDraftForApproval(runId: string): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveByPayrollManager(runId: string, body: {
        approverId?: string;
    }): Promise<{
        message: string;
        runId: string;
        managerApprovalDate: Date;
    }>;
    rejectByPayrollManager(runId: string, body: {
        reason: string;
        approverId?: string;
    }): Promise<{
        message: string;
        runId: string;
        reason: string;
    }>;
    approveByFinanceStaff(runId: string, body: {
        approverId?: string;
    }): Promise<{
        message: string;
        runId: string;
        financeApprovalDate: Date;
    }>;
    rejectByFinanceStaff(runId: string, body: {
        reason: string;
        approverId?: string;
    }): Promise<{
        message: string;
        runId: string;
        reason: string;
    }>;
    freezePayroll(runId: string, body: {
        reason?: string;
    }): Promise<{
        message: string;
        runId: string;
    }>;
    unfreezePayroll(runId: string, body: {
        unlockReason?: string;
    }): Promise<{
        message: string;
        runId: string;
    }>;
    getApprovalsByRunId(runId: string): Promise<{
        runId: string;
        status: import("./enums/payroll-execution-enum").PayRollStatus;
        managerApprovalDate: Date | undefined;
        financeApprovalDate: Date | undefined;
        rejectionReason: string | undefined;
        unlockReason: string | undefined;
        payrollManagerId: import("mongoose").Schema.Types.ObjectId | undefined;
        financeStaffId: import("mongoose").Schema.Types.ObjectId | undefined;
    }>;
    createPayrollAdjustment(runId: string, body: {
        employeeId: string;
        type: 'bonus' | 'deduction' | 'benefit';
        amount: number;
        reason?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./models/employeePayrollDetails.schema").employeePayrollDetails, {}, {}> & import("./models/employeePayrollDetails.schema").employeePayrollDetails & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    resolveException(runId: string, employeeId: string, body: {
        resolutionNote?: string;
    }): Promise<{
        message: string;
        employeeId?: undefined;
        runId?: undefined;
    } | {
        message: string;
        employeeId: string;
        runId: string;
    }>;
    generatePayslips(runId: string): Promise<{
        count: number;
        payslips: {
            id: any;
            employeeId: any;
        }[];
    }>;
    distributePayslips(runId: string): Promise<{
        modifiedCount: any;
    }>;
    markPayrollAsPaid(runId: string): Promise<{
        modifiedCount: any;
        runPaymentStatus: import("./enums/payroll-execution-enum").PayRollPaymentStatus;
    }>;
    flagPayrollExceptions(runId: string): Promise<{
        message: string;
        exceptions: never[];
        totalEmployeesWithExceptions?: undefined;
    } | {
        message: string;
        totalEmployeesWithExceptions: number;
        exceptions: {
            employeeId: import("mongoose").Types.ObjectId;
            exception: string | undefined;
        }[];
    }>;
    getPayrollRunExceptions(runId: string): Promise<{
        runId: string;
        count: number;
        exceptions: {
            employee: import("mongoose").Types.ObjectId;
            exception: string | undefined;
        }[];
    }>;
    reviewPayrollDraft(runId: string): Promise<{
        run: import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        summary: {
            employees: number;
            exceptions: number;
            totalNetPay: number;
        };
        employees: (import("mongoose").Document<unknown, {}, import("./models/employeePayrollDetails.schema").employeePayrollDetails, {}, {}> & import("./models/employeePayrollDetails.schema").employeePayrollDetails & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getPayrollForManagerReview(runId: string): Promise<{
        runId: string;
        reviewerRole: string;
        managerApprovalDate: Date | undefined;
        financeApprovalDate: Date | undefined;
        status: import("./enums/payroll-execution-enum").PayRollStatus;
        rejectionReason: string | undefined;
        summary: {
            employees: number;
            exceptions: number;
            totalNetPay: number;
        };
        employees: (import("mongoose").Document<unknown, {}, import("./models/employeePayrollDetails.schema").employeePayrollDetails, {}, {}> & import("./models/employeePayrollDetails.schema").employeePayrollDetails & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getPayrollForFinanceReview(runId: string): Promise<{
        runId: string;
        reviewerRole: string;
        managerApprovalDate: Date;
        financeApprovalDate: Date | undefined;
        status: import("./enums/payroll-execution-enum").PayRollStatus;
        rejectionReason: string | undefined;
        summary: {
            employees: number;
            exceptions: number;
            totalNetPay: number;
        };
        employees: (import("mongoose").Document<unknown, {}, import("./models/employeePayrollDetails.schema").employeePayrollDetails, {}, {}> & import("./models/employeePayrollDetails.schema").employeePayrollDetails & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
}
