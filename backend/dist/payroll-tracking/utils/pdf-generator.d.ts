import { PayslipDocument } from '../../payroll-execution/models/payslip.schema';
export declare class PDFGenerator {
    static generatePayslipPDF(payslip: any): Promise<Buffer>;
    static generateTaxDocumentPDF(taxData: {
        year: number;
        employee: any;
        payslips: PayslipDocument[];
        annualTotals: {
            totalGrossSalary: number;
            totalTaxDeductions: number;
            totalNetPay: number;
            payslipCount: number;
        };
    }): Promise<Buffer>;
    static formatCurrency(amount: number): string;
    static formatDate(date: Date): string;
    static formatPayrollPeriod(date: Date): string;
    static groupPayslipsByMonth(payslips: any[]): any[];
}
