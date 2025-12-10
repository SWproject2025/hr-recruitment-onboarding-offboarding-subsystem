import { ReportFormat } from '../dto/reports/payroll-report.dto';
export declare class ReportGenerator {
    static generateReport(reportData: any, format?: ReportFormat): Promise<Buffer | any>;
    static generatePDFReport(reportData: any): Promise<Buffer>;
    private static addBreakdownSection;
    private static addInsuranceBreakdownSection;
    private static addEmployeeBreakdownSection;
    private static formatValue;
    private static formatCurrency;
    static generateExcelReport(reportData: any): Promise<Buffer>;
    private static addTaxBreakdownSheet;
    private static addInsuranceBreakdownSheet;
    private static addBenefitsBreakdownSheet;
    private static addDepartmentBreakdownSheet;
    private static addMonthlyBreakdownSheet;
    private static addEmployeeBreakdownSheet;
    private static addDetailedPayslipsSheet;
    private static formatValueForExcel;
}
