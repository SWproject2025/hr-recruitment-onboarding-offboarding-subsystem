import mongoose, { Model } from 'mongoose';
import { employeeSigningBonus } from './models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation } from './models/EmployeeTerminationResignation.schema';
import { payrollRuns } from './models/payrollRuns.schema';
import { PayRollStatus } from './enums/payroll-execution-enum';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { employeePenalties } from './models/employeePenalties.schema';
import { paySlip } from './models/payslip.schema';
export declare class PayrollExecutionService {
    private employeeSigningBonusModel;
    private terminationAndResignationBenefitsModel;
    private payrollRunsModel;
    private employeePayrollDetailsModel;
    private employeePenaltiesModel;
    private payslipModel;
    constructor(employeeSigningBonusModel: Model<employeeSigningBonus>, terminationAndResignationBenefitsModel: Model<EmployeeTerminationResignation>, payrollRunsModel: Model<payrollRuns>, employeePayrollDetailsModel: Model<employeePayrollDetails>, employeePenaltiesModel: Model<employeePenalties>, payslipModel: Model<paySlip>);
    getPendingSigningBonuses(): Promise<(mongoose.Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getSigningBonusById(id: string): Promise<mongoose.Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveSigningBonus(id: string): Promise<mongoose.Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    rejectSigningBonus(id: string): Promise<mongoose.Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    editSigningBonus(id: string, givenAmount: number, paymentDate?: Date): Promise<mongoose.Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingBenefits(): Promise<(mongoose.Document<unknown, {}, EmployeeTerminationResignation, {}, {}> & EmployeeTerminationResignation & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getBenefitById(id: string): Promise<mongoose.Document<unknown, {}, EmployeeTerminationResignation, {}, {}> & EmployeeTerminationResignation & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveBenefit(id: string): Promise<mongoose.Document<unknown, {}, EmployeeTerminationResignation, {}, {}> & EmployeeTerminationResignation & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    rejectBenefit(id: string): Promise<mongoose.Document<unknown, {}, EmployeeTerminationResignation, {}, {}> & EmployeeTerminationResignation & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    editBenefit(id: string, givenAmount: number): Promise<mongoose.Document<unknown, {}, EmployeeTerminationResignation, {}, {}> & EmployeeTerminationResignation & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getSuggestedPayrollPeriod(): Promise<{
        payrollPeriod: string;
    }>;
    validatePayrollPeriod(payrollPeriod: Date): Promise<{
        isValid: boolean;
        errors: string[] | undefined;
        warnings: string[] | undefined;
    }>;
    getPayrollRunById(id: string): Promise<mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    approvePayrollPeriod(id: string, payrollManagerId: string): Promise<mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    rejectPayrollPeriod(id: string, rejectionReason: string): Promise<{
        message: string;
        payrollRun: mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    editPayrollPeriod(id: string, newPayrollPeriod: Date): Promise<mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    startPayrollInitiation(runId: string, payrollPeriod: Date, payrollSpecialistId: string, entity: string): Promise<mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    checkPreRunApprovalsComplete(): Promise<{
        allApprovalsComplete: boolean;
        pendingSigningBonuses: number;
        pendingBenefits: number;
        blockers: string[] | undefined;
    }>;
    publishDraftForApproval(runId: string): Promise<mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveByPayrollManager(runId: string, approverId?: string): Promise<{
        message: string;
        runId: string;
        managerApprovalDate: Date;
    }>;
    rejectByPayrollManager(runId: string, reason: string, approverId?: string): Promise<{
        message: string;
        runId: string;
        reason: string;
    }>;
    approveByFinanceStaff(runId: string, approverId?: string): Promise<{
        message: string;
        runId: string;
        financeApprovalDate: Date;
    }>;
    rejectByFinanceStaff(runId: string, reason: string, approverId?: string): Promise<{
        message: string;
        runId: string;
        reason: string;
    }>;
    freezePayroll(runId: string, reason?: string): Promise<{
        message: string;
        runId: string;
    }>;
    unfreezePayroll(runId: string, unlockReason?: string): Promise<{
        message: string;
        runId: string;
    }>;
    getApprovalsByRunId(runId: string): Promise<{
        runId: string;
        status: PayRollStatus;
        managerApprovalDate: Date | undefined;
        financeApprovalDate: Date | undefined;
        rejectionReason: string | undefined;
        unlockReason: string | undefined;
        payrollManagerId: mongoose.Schema.Types.ObjectId | undefined;
        financeStaffId: mongoose.Schema.Types.ObjectId | undefined;
    }>;
    createPayrollAdjustment(runId: string, employeeId: string, type: 'bonus' | 'deduction' | 'benefit', amount: number, reason?: string): Promise<mongoose.Document<unknown, {}, employeePayrollDetails, {}, {}> & employeePayrollDetails & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resolveException(runId: string, employeeId: string, resolutionNote?: string): Promise<{
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
    flagPayrollExceptions(payrollRunId: string): Promise<{
        message: string;
        exceptions: never[];
        totalEmployeesWithExceptions?: undefined;
    } | {
        message: string;
        totalEmployeesWithExceptions: number;
        exceptions: {
            employeeId: mongoose.Types.ObjectId;
            exception: string | undefined;
        }[];
    }>;
    getPayrollRunExceptions(payrollRunId: string): Promise<{
        runId: string;
        count: number;
        exceptions: {
            employee: mongoose.Types.ObjectId;
            exception: string | undefined;
        }[];
    }>;
    reviewPayrollDraft(payrollRunId: string): Promise<{
        run: mongoose.Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
        summary: {
            employees: number;
            exceptions: number;
            totalNetPay: number;
        };
        employees: (mongoose.Document<unknown, {}, employeePayrollDetails, {}, {}> & employeePayrollDetails & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getPayrollForManagerReview(payrollRunId: string): Promise<{
        runId: string;
        reviewerRole: string;
        managerApprovalDate: Date | undefined;
        financeApprovalDate: Date | undefined;
        status: PayRollStatus;
        rejectionReason: string | undefined;
        summary: {
            employees: number;
            exceptions: number;
            totalNetPay: number;
        };
        employees: (mongoose.Document<unknown, {}, employeePayrollDetails, {}, {}> & employeePayrollDetails & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getPayrollForFinanceReview(payrollRunId: string): Promise<{
        runId: string;
        reviewerRole: string;
        managerApprovalDate: Date;
        financeApprovalDate: Date | undefined;
        status: PayRollStatus;
        rejectionReason: string | undefined;
        summary: {
            employees: number;
            exceptions: number;
            totalNetPay: number;
        };
        employees: (mongoose.Document<unknown, {}, employeePayrollDetails, {}, {}> & employeePayrollDetails & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    private _resolveRunObjectId;
}
