import { Model, Types } from 'mongoose';
import { paySlip, PayslipDocument } from '../payroll-execution/models/payslip.schema';
import { employeePayrollDetailsDocument } from '../payroll-execution/models/employeePayrollDetails.schema';
import { payrollRunsDocument } from '../payroll-execution/models/payrollRuns.schema';
import { EmployeeProfile, EmployeeProfileDocument } from '../employee-profile/models/employee-profile.schema';
import { PayslipQueryDto } from './dto/payslips/payslip-query.dto';
import { disputes, disputesDocument } from './models/disputes.schema';
import { claims, claimsDocument } from './models/claims.schema';
import { refunds, refundsDocument } from './models/refunds.schema';
import { DisputeStatus, ClaimStatus } from './enums/payroll-tracking-enum';
import { CreateDisputeDto } from './dto/disputes/create-dispute.dto';
import { ApproveDisputeDto } from './dto/disputes/approve-dispute.dto';
import { RejectDisputeDto } from './dto/disputes/reject-dispute.dto';
import { CreateClaimDto } from './dto/claims/create-claim.dto';
import { ApproveClaimDto } from './dto/claims/approve-claim.dto';
import { RejectClaimDto } from './dto/claims/reject-claim.dto';
import { CreateRefundDto } from './dto/refunds/create-refund.dto';
import { TaxReportDto } from './dto/reports/tax-report.dto';
import { DepartmentReportDto } from './dto/reports/department-report.dto';
import { PayrollReportDto } from './dto/reports/payroll-report.dto';
export declare class PayrollTrackingService {
    private payslipModel;
    private employeePayrollDetailsModel;
    private payrollRunsModel;
    private employeeProfileModel;
    private disputesModel;
    private claimsModel;
    private refundsModel;
    constructor(payslipModel: Model<PayslipDocument>, employeePayrollDetailsModel: Model<employeePayrollDetailsDocument>, payrollRunsModel: Model<payrollRunsDocument>, employeeProfileModel: Model<EmployeeProfileDocument>, disputesModel: Model<disputesDocument>, claimsModel: Model<claimsDocument>, refundsModel: Model<refundsDocument>);
    getPayslip(employeeId: string, payslipId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, paySlip, {}, {}> & paySlip & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    downloadPayslip(employeeId: string, payslipId: string, format?: string): Promise<Buffer>;
    getPayslipStatus(employeeId: string, payslipId: string): Promise<{
        payslipId: string;
        paymentStatus: import("../payroll-execution/enums/payroll-execution-enum").PaySlipPaymentStatus;
        payrollRun: Types.ObjectId;
    }>;
    getPayslipHistory(employeeId: string, filters: PayslipQueryDto): Promise<{
        payslips: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, paySlip, {}, {}> & paySlip & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getEmployeeSalaryDetails(employeeId: string): Promise<{
        employeeId: string;
        baseSalary: number;
        leaveCompensation: number;
        transportationCompensation: number;
        taxDeductions: number;
        insuranceDeductions: number;
        salaryDeductions: number;
        unpaidLeaveDeductions: number;
        employerContributions: number;
        netSalary: number;
        netPay: number;
        latestPayrollRun: Types.ObjectId;
    }>;
    downloadTaxDocuments(employeeId: string, year: number): Promise<{
        year: number;
        employee: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>) | null;
        payslips: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, paySlip, {}, {}> & paySlip & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        annualTotals: {
            totalGrossSalary: number;
            totalTaxDeductions: number;
            totalNetPay: number;
            payslipCount: number;
        };
        documentType: string;
        generatedAt: Date;
        downloadUrl: string;
    }>;
    downloadTaxDocumentsPDF(employeeId: string, year: number): Promise<Buffer>;
    private generateDisputeId;
    private generateClaimId;
    private createApprovalHistoryEntry;
    createDispute(employeeId: string, createDisputeDto: CreateDisputeDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    getEmployeeDisputes(employeeId: string, filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getDisputeStatus(employeeId: string, disputeId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    createClaim(employeeId: string, createClaimDto: CreateClaimDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    getEmployeeClaims(employeeId: string, filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getClaimStatus(employeeId: string, claimId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    getDisputesForReview(filters?: {
        status?: DisputeStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveDispute(disputeId: string, specialistId: string, approveDisputeDto: ApproveDisputeDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    rejectDispute(disputeId: string, specialistId: string, rejectDisputeDto: RejectDisputeDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    getClaimsForReview(filters?: {
        status?: ClaimStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveClaim(claimId: string, specialistId: string, approveClaimDto: ApproveClaimDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    rejectClaim(claimId: string, specialistId: string, rejectClaimDto: RejectClaimDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    getPendingManagerApprovals(filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            disputesTotal: number;
            claimsTotal: number;
            total: number;
            totalPages: number;
        };
    }>;
    confirmDisputeApproval(disputeId: string, managerId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    confirmClaimApproval(claimId: string, managerId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    rejectDisputeByManager(disputeId: string, managerId: string, reason: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    rejectClaimByManager(claimId: string, managerId: string, reason: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    getApprovedDisputes(filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getApprovedClaims(filters?: {
        page?: number;
        limit?: number;
    }): Promise<{
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, claims, {}, {}> & claims & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createRefundForDispute(disputeId: string, financeStaffId: string, createRefundDto: CreateRefundDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    createRefundForClaim(claimId: string, financeStaffId: string, createRefundDto: CreateRefundDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    generateTaxReport(filters: TaxReportDto): Promise<{
        reportType: string;
        period: string;
        departmentId: string | null;
        summary: {
            totalTaxAmount: number;
            totalEmployees: number;
            totalPayrollRuns: number;
        };
        taxBreakdown: {
            taxName: string;
            totalAmount: number;
            transactionCount: number;
        }[];
        detailedData: any[];
        generatedAt: Date;
    }>;
    generateInsuranceReport(filters: PayrollReportDto): Promise<{
        reportType: string;
        period: string;
        departmentId: string | null;
        summary: {
            totalEmployeeContributions: number;
            totalEmployerContributions: number;
            totalContributions: number;
            totalEmployees: number;
            totalPayrollRuns: number;
        };
        insuranceBreakdown: {
            insuranceName: string;
            totalEmployeeContributions: number;
            totalEmployerContributions: number;
            transactionCount: number;
        }[];
        detailedData: any[];
        generatedAt: Date;
    }>;
    generateBenefitsReport(filters: PayrollReportDto): Promise<{
        reportType: string;
        period: string;
        departmentId: string | null;
        summary: {
            totalBenefitsAmount: number;
            totalEmployees: number;
            totalPayrollRuns: number;
        };
        benefitsBreakdown: {
            benefitName: string;
            totalAmount: number;
            transactionCount: number;
        }[];
        detailedData: any[];
        generatedAt: Date;
    }>;
    generateMonthEndSummary(month: number, year: number): Promise<{
        reportType: string;
        period: {
            month: number;
            year: number;
        };
        summary: {
            totalPayrollRuns: number;
            totalEmployees: number;
            totalGrossSalary: number;
            totalDeductions: number;
            totalNetPay: number;
        };
        payrollRuns: {
            runId: any;
            payrollPeriod: any;
            status: any;
            employees: any;
            totalNetPay: any;
            specialist: any;
            manager: any;
        }[];
        departmentBreakdown: {
            departmentId: string;
            employeeCount: number;
            totalGrossSalary: number;
            totalDeductions: number;
            totalNetPay: number;
        }[];
        generatedAt: Date;
    }>;
    generateYearEndSummary(year: number): Promise<{
        reportType: string;
        year: number;
        summary: {
            totalPayrollRuns: number;
            totalEmployees: number;
            totalGrossSalary: number;
            totalDeductions: number;
            totalNetPay: number;
        };
        monthlyBreakdown: {
            month: number;
            payrollRuns: number;
            employeeCount: number;
            totalGrossSalary: number;
            totalDeductions: number;
            totalNetPay: number;
        }[];
        generatedAt: Date;
    }>;
    generateDepartmentPayrollReport(departmentId: string, filters: DepartmentReportDto): Promise<{
        reportType: string;
        departmentId: string;
        period: string;
        summary: {
            totalEmployees: number;
            employeesWithPayslips: number;
            totalPayslips: number;
            totalGrossSalary: number;
            totalDeductions: number;
            totalNetPay: number;
        };
        employeeBreakdown: {
            employee: {
                employeeNumber: string;
                firstName: string;
                lastName: string;
            } | null;
            payslipCount: number;
            totalGrossSalary: number;
            totalDeductions: number;
            totalNetPay: number;
        }[];
        detailedPayslips: {
            payslipId: any;
            employee: any;
            payrollRun: any;
            grossSalary: any;
            deductions: any;
            netPay: any;
            paymentStatus: any;
            period: any;
        }[];
        generatedAt: Date;
    }>;
}
