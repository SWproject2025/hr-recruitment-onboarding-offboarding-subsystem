export declare class CreateCalcDraftDto {
    darftId: string;
    payrollRunId: string;
    payrollPeriodStart: Date;
    payrollPeriodEnd: Date;
    payrollMonth: number;
    payrollYear: number;
    totalEmployees: number;
    totalGrossPay: number;
    totalDeductions: number;
    totalNetPay: number;
    totalPenalties: number;
    totalExceptions: number;
    negativeNetPayCount?: number;
    generatedBy: string;
    generatedAt: Date;
}
