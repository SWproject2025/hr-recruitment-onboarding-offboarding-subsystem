import type { Response } from 'express';
import { PayrollTrackingService } from './payroll-tracking.service';
import { PayslipQueryDto } from './dto/payslips/payslip-query.dto';
import { PayslipDownloadDto } from './dto/payslips/payslip-download.dto';
import { CreateDisputeDto } from './dto/disputes/create-dispute.dto';
import { ApproveDisputeDto } from './dto/disputes/approve-dispute.dto';
import { RejectDisputeDto } from './dto/disputes/reject-dispute.dto';
import { CreateClaimDto } from './dto/claims/create-claim.dto';
import { ApproveClaimDto } from './dto/claims/approve-claim.dto';
import { RejectClaimDto } from './dto/claims/reject-claim.dto';
import { CreateRefundDto } from './dto/refunds/create-refund.dto';
import { TaxReportDto } from './dto/reports/tax-report.dto';
import { PayrollReportDto } from './dto/reports/payroll-report.dto';
import { DepartmentReportDto } from './dto/reports/department-report.dto';
import type { CurrentUserData } from '../auth/decorators/current-user.decorator';
export declare class PayrollTrackingController {
    private readonly payrollTrackingService;
    constructor(payrollTrackingService: PayrollTrackingService);
    getPayslipHistory(user: CurrentUserData, query: PayslipQueryDto): Promise<{
        payslips: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../payroll-execution/models/payslip.schema").paySlip, {}, {}> & import("../payroll-execution/models/payslip.schema").paySlip & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getPayslip(user: CurrentUserData, payslipId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../payroll-execution/models/payslip.schema").paySlip, {}, {}> & import("../payroll-execution/models/payslip.schema").paySlip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    downloadPayslip(user: CurrentUserData, payslipId: string, downloadDto: PayslipDownloadDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getPayslipStatus(user: CurrentUserData, payslipId: string): Promise<{
        payslipId: string;
        paymentStatus: import("../payroll-execution/enums/payroll-execution-enum").PaySlipPaymentStatus;
        payrollRun: import("mongoose").Types.ObjectId;
    }>;
    getEmployeeSalaryDetails(user: CurrentUserData): Promise<{
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
        latestPayrollRun: import("mongoose").Types.ObjectId;
    }>;
    getTaxDocuments(user: CurrentUserData, year: string): Promise<{
        year: number;
        employee: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../employee-profile/models/employee-profile.schema").EmployeeProfile, {}, {}> & import("../employee-profile/models/employee-profile.schema").EmployeeProfile & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>) | null;
        payslips: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../payroll-execution/models/payslip.schema").paySlip, {}, {}> & import("../payroll-execution/models/payslip.schema").paySlip & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    downloadTaxDocuments(user: CurrentUserData, year: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createDispute(user: CurrentUserData, createDisputeDto: CreateDisputeDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getEmployeeDisputes(user: CurrentUserData, page?: string, limit?: string): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getDisputeStatus(user: CurrentUserData, disputeId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createClaim(user: CurrentUserData, createClaimDto: CreateClaimDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getEmployeeClaims(user: CurrentUserData, page?: string, limit?: string): Promise<{
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getClaimStatus(user: CurrentUserData, claimId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getDisputesForReview(page?: string, limit?: string): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveDispute(user: CurrentUserData, disputeId: string, approveDisputeDto: ApproveDisputeDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    rejectDispute(user: CurrentUserData, disputeId: string, rejectDisputeDto: RejectDisputeDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getClaimsForReview(page?: string, limit?: string): Promise<{
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    approveClaim(user: CurrentUserData, claimId: string, approveClaimDto: ApproveClaimDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    rejectClaim(user: CurrentUserData, claimId: string, rejectClaimDto: RejectClaimDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getDepartmentReport(filters: DepartmentReportDto): Promise<{
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
    getPendingManagerApprovals(page?: string, limit?: string): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    confirmDisputeApproval(user: CurrentUserData, disputeId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    confirmClaimApproval(user: CurrentUserData, claimId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getApprovedDisputes(page?: string, limit?: string): Promise<{
        disputes: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getApprovedClaims(page?: string, limit?: string): Promise<{
        claims: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./models/claims.schema").claims, {}, {}> & import("./models/claims.schema").claims & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createRefundForDispute(user: CurrentUserData, disputeId: string, createRefundDto: CreateRefundDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    createRefundForClaim(user: CurrentUserData, claimId: string, createRefundDto: CreateRefundDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getTaxReport(filters: TaxReportDto): Promise<{
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
    getInsuranceReport(filters: PayrollReportDto): Promise<{
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
    getBenefitsReport(filters: PayrollReportDto): Promise<{
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
    getMonthEndSummary(month: string, year: string): Promise<{
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
    getYearEndSummary(year: string): Promise<{
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
}
