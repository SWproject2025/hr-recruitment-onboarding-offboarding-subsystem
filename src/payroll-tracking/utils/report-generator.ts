/**
 * Report Generator Utility for Payroll Reports
 * Supports PDF and Excel export formats
 */

import PDFDocument from 'pdfkit';
import { ReportFormat } from '../dto/reports/payroll-report.dto';

export class ReportGenerator {
  /**
   * Generate report in the specified format
   * @param reportData - Report data object
   * @param format - Export format (pdf, excel, json)
   * @returns Buffer for PDF/Excel, or the report data for JSON
   */
  static async generateReport(reportData: any, format: ReportFormat = ReportFormat.JSON): Promise<Buffer | any> {
    switch (format) {
      case ReportFormat.PDF:
        return this.generatePDFReport(reportData);
      case ReportFormat.EXCEL:
        // TODO: Implement Excel generation when exceljs is added
        throw new Error('Excel export not yet implemented. Please install exceljs package.');
      case ReportFormat.JSON:
      default:
        return reportData;
    }
  }

  /**
   * Generate PDF report
   * @param reportData - Report data object
   * @returns Buffer containing PDF data
   */
  static async generatePDFReport(reportData: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });
        doc.on('error', reject);

        // Header
        doc
          .fontSize(20)
          .font('Helvetica-Bold')
          .text(reportData.reportType?.toUpperCase().replace(/-/g, ' ') || 'PAYROLL REPORT', {
            align: 'center',
          })
          .moveDown(0.5);

        // Report period
        if (reportData.period) {
          doc
            .fontSize(10)
            .font('Helvetica')
            .text(`Period: ${reportData.period}`, { align: 'center' })
            .moveDown();
        }

        // Department info if available
        if (reportData.departmentId) {
          doc.fontSize(10).text(`Department ID: ${reportData.departmentId}`, { align: 'center' }).moveDown();
        }

        // Summary section
        if (reportData.summary) {
          doc
            .fontSize(14)
            .font('Helvetica-Bold')
            .text('Summary', { underline: true })
            .moveDown(0.3);

          doc.fontSize(10).font('Helvetica');
          Object.entries(reportData.summary).forEach(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
            doc.text(`${label}: ${this.formatValue(value)}`);
          });
          doc.moveDown();
        }

        // Breakdown sections
        if (reportData.taxBreakdown) {
          this.addBreakdownSection(doc, 'Tax Breakdown', reportData.taxBreakdown);
        }

        if (reportData.insuranceBreakdown) {
          this.addInsuranceBreakdownSection(doc, 'Insurance Breakdown', reportData.insuranceBreakdown);
        }

        if (reportData.benefitsBreakdown) {
          this.addBreakdownSection(doc, 'Benefits Breakdown', reportData.benefitsBreakdown);
        }

        if (reportData.departmentBreakdown) {
          this.addBreakdownSection(doc, 'Department Breakdown', reportData.departmentBreakdown);
        }

        if (reportData.monthlyBreakdown) {
          this.addBreakdownSection(doc, 'Monthly Breakdown', reportData.monthlyBreakdown);
        }

        if (reportData.employeeBreakdown) {
          this.addEmployeeBreakdownSection(doc, 'Employee Breakdown', reportData.employeeBreakdown);
        }

        // Footer
        doc
          .fontSize(8)
          .text(`Generated at: ${new Date(reportData.generatedAt || Date.now()).toLocaleString()}`, {
            align: 'center',
          });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Add breakdown section to PDF
   */
  private static addBreakdownSection(doc: PDFDocument, title: string, breakdown: any[]) {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(title, { underline: true })
      .moveDown(0.3);

    doc.fontSize(9).font('Helvetica');
    breakdown.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${JSON.stringify(item, null, 2)}`).moveDown(0.2);
    });
    doc.moveDown();
  }

  /**
   * Add insurance breakdown section to PDF
   */
  private static addInsuranceBreakdownSection(doc: PDFDocument, title: string, breakdown: any[]) {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(title, { underline: true })
      .moveDown(0.3);

    doc.fontSize(9).font('Helvetica');
    breakdown.forEach((item: any, index: number) => {
      doc
        .text(
          `${index + 1}. ${item.insuranceName || 'Unknown'}: Employee: ${this.formatCurrency(
            item.totalEmployeeContributions,
          )}, Employer: ${this.formatCurrency(item.totalEmployerContributions)}`,
        )
        .moveDown(0.2);
    });
    doc.moveDown();
  }

  /**
   * Add employee breakdown section to PDF
   */
  private static addEmployeeBreakdownSection(doc: PDFDocument, title: string, breakdown: any[]) {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(title, { underline: true })
      .moveDown(0.3);

    doc.fontSize(9).font('Helvetica');
    breakdown.forEach((item: any, index: number) => {
      const empName = item.employee
        ? `${item.employee.firstName} ${item.employee.lastName} (${item.employee.employeeNumber})`
        : 'Unknown';
      doc
        .text(
          `${index + 1}. ${empName}: Gross: ${this.formatCurrency(item.totalGrossSalary)}, Net: ${this.formatCurrency(
            item.totalNetPay,
          )}`,
        )
        .moveDown(0.2);
    });
    doc.moveDown();
  }

  /**
   * Format value for display
   */
  private static formatValue(value: any): string {
    if (typeof value === 'number') {
      // Check if it's a currency value (large numbers)
      if (value > 100) {
        return this.formatCurrency(value);
      }
      return value.toString();
    }
    return String(value);
  }

  /**
   * Format currency value
   */
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Generate Excel report (placeholder - requires exceljs package)
   * TODO: Implement when exceljs is added to dependencies
   */
  static async generateExcelReport(reportData: any): Promise<Buffer> {
    throw new Error('Excel export requires exceljs package. Please install: npm install exceljs');
  }
}
