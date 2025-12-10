import { ReportFormat } from './payroll-report.dto';
export declare class DepartmentReportDto {
    departmentId: string;
    fromDate?: string;
    toDate?: string;
    payrollRunId?: string;
    format?: ReportFormat;
}
