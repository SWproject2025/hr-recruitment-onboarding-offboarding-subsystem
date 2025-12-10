import { ReportFormat } from './payroll-report.dto';
export declare class TaxReportDto {
    fromDate?: string;
    toDate?: string;
    year?: number;
    format?: ReportFormat;
    departmentId?: string;
}
