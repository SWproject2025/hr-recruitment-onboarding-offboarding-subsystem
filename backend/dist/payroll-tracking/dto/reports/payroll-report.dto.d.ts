export declare enum ReportFormat {
    PDF = "pdf",
    EXCEL = "excel",
    JSON = "json"
}
export declare class PayrollReportDto {
    fromDate?: string;
    toDate?: string;
    payrollRunId?: string;
    format?: ReportFormat;
    departmentId?: string;
}
