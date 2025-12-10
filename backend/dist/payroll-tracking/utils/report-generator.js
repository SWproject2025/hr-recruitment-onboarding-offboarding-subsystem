"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportGenerator = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const exceljs_1 = __importDefault(require("exceljs"));
const payroll_report_dto_1 = require("../dto/reports/payroll-report.dto");
class ReportGenerator {
    static async generateReport(reportData, format = payroll_report_dto_1.ReportFormat.JSON) {
        switch (format) {
            case payroll_report_dto_1.ReportFormat.PDF:
                return this.generatePDFReport(reportData);
            case payroll_report_dto_1.ReportFormat.EXCEL:
                return this.generateExcelReport(reportData);
            case payroll_report_dto_1.ReportFormat.JSON:
            default:
                return reportData;
        }
    }
    static async generatePDFReport(reportData) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new pdfkit_1.default({ margin: 50, size: 'LETTER' });
                const buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => {
                    const pdfBuffer = Buffer.concat(buffers);
                    resolve(pdfBuffer);
                });
                doc.on('error', reject);
                doc
                    .fontSize(20)
                    .font('Helvetica-Bold')
                    .text(reportData.reportType?.toUpperCase().replace(/-/g, ' ') || 'PAYROLL REPORT', {
                    align: 'center',
                })
                    .moveDown(0.5);
                if (reportData.period) {
                    doc
                        .fontSize(10)
                        .font('Helvetica')
                        .text(`Period: ${reportData.period}`, { align: 'center' })
                        .moveDown();
                }
                if (reportData.departmentId) {
                    doc.fontSize(10).text(`Department ID: ${reportData.departmentId}`, { align: 'center' }).moveDown();
                }
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
                doc
                    .fontSize(8)
                    .text(`Generated at: ${new Date(reportData.generatedAt || Date.now()).toLocaleString()}`, {
                    align: 'center',
                });
                doc.end();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static addBreakdownSection(doc, title, breakdown) {
        doc
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(title, { underline: true })
            .moveDown(0.3);
        doc.fontSize(9).font('Helvetica');
        breakdown.forEach((item, index) => {
            doc.text(`${index + 1}. ${JSON.stringify(item, null, 2)}`).moveDown(0.2);
        });
        doc.moveDown();
    }
    static addInsuranceBreakdownSection(doc, title, breakdown) {
        doc
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(title, { underline: true })
            .moveDown(0.3);
        doc.fontSize(9).font('Helvetica');
        breakdown.forEach((item, index) => {
            doc
                .text(`${index + 1}. ${item.insuranceName || 'Unknown'}: Employee: ${this.formatCurrency(item.totalEmployeeContributions)}, Employer: ${this.formatCurrency(item.totalEmployerContributions)}`)
                .moveDown(0.2);
        });
        doc.moveDown();
    }
    static addEmployeeBreakdownSection(doc, title, breakdown) {
        doc
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(title, { underline: true })
            .moveDown(0.3);
        doc.fontSize(9).font('Helvetica');
        breakdown.forEach((item, index) => {
            const empName = item.employee
                ? `${item.employee.firstName} ${item.employee.lastName} (${item.employee.employeeNumber})`
                : 'Unknown';
            doc
                .text(`${index + 1}. ${empName}: Gross: ${this.formatCurrency(item.totalGrossSalary)}, Net: ${this.formatCurrency(item.totalNetPay)}`)
                .moveDown(0.2);
        });
        doc.moveDown();
    }
    static formatValue(value) {
        if (typeof value === 'number') {
            if (value > 100) {
                return this.formatCurrency(value);
            }
            return value.toString();
        }
        return String(value);
    }
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);
    }
    static async generateExcelReport(reportData) {
        const workbook = new exceljs_1.default.Workbook();
        workbook.creator = 'HR System';
        workbook.created = new Date();
        const summarySheet = workbook.addWorksheet('Summary');
        let currentRow = 1;
        summarySheet.mergeCells(currentRow, 1, currentRow, 5);
        const titleCell = summarySheet.getCell(currentRow, 1);
        titleCell.value = reportData.reportType?.toUpperCase().replace(/-/g, ' ') || 'PAYROLL REPORT';
        titleCell.font = { size: 16, bold: true };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
        currentRow += 2;
        if (reportData.period) {
            summarySheet.getCell(currentRow, 1).value = 'Period:';
            summarySheet.getCell(currentRow, 1).font = { bold: true };
            summarySheet.getCell(currentRow, 2).value = reportData.period;
            currentRow++;
        }
        if (reportData.departmentId) {
            summarySheet.getCell(currentRow, 1).value = 'Department ID:';
            summarySheet.getCell(currentRow, 1).font = { bold: true };
            summarySheet.getCell(currentRow, 2).value = reportData.departmentId;
            currentRow++;
        }
        currentRow++;
        if (reportData.summary) {
            summarySheet.getCell(currentRow, 1).value = 'Summary';
            summarySheet.getCell(currentRow, 1).font = { size: 14, bold: true };
            summarySheet.mergeCells(currentRow, 1, currentRow, 5);
            currentRow++;
            Object.entries(reportData.summary).forEach(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                summarySheet.getCell(currentRow, 1).value = label + ':';
                summarySheet.getCell(currentRow, 1).font = { bold: true };
                summarySheet.getCell(currentRow, 2).value = this.formatValueForExcel(value);
                if (typeof value === 'number' && value > 100) {
                    summarySheet.getCell(currentRow, 2).numFmt = '$#,##0.00';
                }
                currentRow++;
            });
        }
        if (reportData.taxBreakdown) {
            this.addTaxBreakdownSheet(workbook, reportData.taxBreakdown, reportData.detailedData);
        }
        if (reportData.insuranceBreakdown) {
            this.addInsuranceBreakdownSheet(workbook, reportData.insuranceBreakdown, reportData.detailedData);
        }
        if (reportData.benefitsBreakdown) {
            this.addBenefitsBreakdownSheet(workbook, reportData.benefitsBreakdown, reportData.detailedData);
        }
        if (reportData.departmentBreakdown) {
            this.addDepartmentBreakdownSheet(workbook, reportData.departmentBreakdown);
        }
        if (reportData.monthlyBreakdown) {
            this.addMonthlyBreakdownSheet(workbook, reportData.monthlyBreakdown);
        }
        if (reportData.employeeBreakdown) {
            this.addEmployeeBreakdownSheet(workbook, reportData.employeeBreakdown);
        }
        if (reportData.detailedPayslips) {
            this.addDetailedPayslipsSheet(workbook, reportData.detailedPayslips);
        }
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
    static addTaxBreakdownSheet(workbook, breakdown, detailedData) {
        const sheet = workbook.addWorksheet('Tax Breakdown');
        let row = 1;
        sheet.getCell(row, 1).value = 'Tax Name';
        sheet.getCell(row, 2).value = 'Total Amount';
        sheet.getCell(row, 3).value = 'Transaction Count';
        [1, 2, 3].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        breakdown.forEach((item) => {
            sheet.getCell(row, 1).value = item.taxName;
            sheet.getCell(row, 2).value = item.totalAmount;
            sheet.getCell(row, 2).numFmt = '$#,##0.00';
            sheet.getCell(row, 3).value = item.transactionCount;
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }
    static addInsuranceBreakdownSheet(workbook, breakdown, detailedData) {
        const sheet = workbook.addWorksheet('Insurance Breakdown');
        let row = 1;
        sheet.getCell(row, 1).value = 'Insurance Name';
        sheet.getCell(row, 2).value = 'Employee Contributions';
        sheet.getCell(row, 3).value = 'Employer Contributions';
        sheet.getCell(row, 4).value = 'Total Contributions';
        sheet.getCell(row, 5).value = 'Transaction Count';
        [1, 2, 3, 4, 5].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        breakdown.forEach((item) => {
            sheet.getCell(row, 1).value = item.insuranceName;
            sheet.getCell(row, 2).value = item.totalEmployeeContributions;
            sheet.getCell(row, 2).numFmt = '$#,##0.00';
            sheet.getCell(row, 3).value = item.totalEmployerContributions;
            sheet.getCell(row, 3).numFmt = '$#,##0.00';
            sheet.getCell(row, 4).value = item.totalEmployeeContributions + item.totalEmployerContributions;
            sheet.getCell(row, 4).numFmt = '$#,##0.00';
            sheet.getCell(row, 5).value = item.transactionCount;
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 25;
        });
    }
    static addBenefitsBreakdownSheet(workbook, breakdown, detailedData) {
        const sheet = workbook.addWorksheet('Benefits Breakdown');
        let row = 1;
        sheet.getCell(row, 1).value = 'Benefit Name';
        sheet.getCell(row, 2).value = 'Total Amount';
        sheet.getCell(row, 3).value = 'Transaction Count';
        [1, 2, 3].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        breakdown.forEach((item) => {
            sheet.getCell(row, 1).value = item.benefitName;
            sheet.getCell(row, 2).value = item.totalAmount;
            sheet.getCell(row, 2).numFmt = '$#,##0.00';
            sheet.getCell(row, 3).value = item.transactionCount;
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }
    static addDepartmentBreakdownSheet(workbook, breakdown) {
        const sheet = workbook.addWorksheet('Department Breakdown');
        let row = 1;
        sheet.getCell(row, 1).value = 'Department ID';
        sheet.getCell(row, 2).value = 'Employee Count';
        sheet.getCell(row, 3).value = 'Total Gross Salary';
        sheet.getCell(row, 4).value = 'Total Deductions';
        sheet.getCell(row, 5).value = 'Total Net Pay';
        [1, 2, 3, 4, 5].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        breakdown.forEach((item) => {
            sheet.getCell(row, 1).value = item.departmentId || 'Unknown';
            sheet.getCell(row, 2).value = item.employeeCount;
            sheet.getCell(row, 3).value = item.totalGrossSalary;
            sheet.getCell(row, 3).numFmt = '$#,##0.00';
            sheet.getCell(row, 4).value = item.totalDeductions;
            sheet.getCell(row, 4).numFmt = '$#,##0.00';
            sheet.getCell(row, 5).value = item.totalNetPay;
            sheet.getCell(row, 5).numFmt = '$#,##0.00';
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }
    static addMonthlyBreakdownSheet(workbook, breakdown) {
        const sheet = workbook.addWorksheet('Monthly Breakdown');
        let row = 1;
        sheet.getCell(row, 1).value = 'Month';
        sheet.getCell(row, 2).value = 'Payroll Runs';
        sheet.getCell(row, 3).value = 'Employee Count';
        sheet.getCell(row, 4).value = 'Total Gross Salary';
        sheet.getCell(row, 5).value = 'Total Deductions';
        sheet.getCell(row, 6).value = 'Total Net Pay';
        [1, 2, 3, 4, 5, 6].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        breakdown.forEach((item) => {
            const monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];
            sheet.getCell(row, 1).value = monthNames[item.month - 1] || `Month ${item.month}`;
            sheet.getCell(row, 2).value = item.payrollRuns;
            sheet.getCell(row, 3).value = item.employeeCount;
            sheet.getCell(row, 4).value = item.totalGrossSalary;
            sheet.getCell(row, 4).numFmt = '$#,##0.00';
            sheet.getCell(row, 5).value = item.totalDeductions;
            sheet.getCell(row, 5).numFmt = '$#,##0.00';
            sheet.getCell(row, 6).value = item.totalNetPay;
            sheet.getCell(row, 6).numFmt = '$#,##0.00';
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }
    static addEmployeeBreakdownSheet(workbook, breakdown) {
        const sheet = workbook.addWorksheet('Employee Breakdown');
        let row = 1;
        sheet.getCell(row, 1).value = 'Employee Number';
        sheet.getCell(row, 2).value = 'Employee Name';
        sheet.getCell(row, 3).value = 'Payslip Count';
        sheet.getCell(row, 4).value = 'Total Gross Salary';
        sheet.getCell(row, 5).value = 'Total Deductions';
        sheet.getCell(row, 6).value = 'Total Net Pay';
        [1, 2, 3, 4, 5, 6].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        breakdown.forEach((item) => {
            if (item.employee) {
                sheet.getCell(row, 1).value = item.employee.employeeNumber || 'N/A';
                sheet.getCell(row, 2).value = `${item.employee.firstName || ''} ${item.employee.lastName || ''}`.trim() || 'Unknown';
            }
            else {
                sheet.getCell(row, 1).value = 'N/A';
                sheet.getCell(row, 2).value = 'Unknown';
            }
            sheet.getCell(row, 3).value = item.payslipCount;
            sheet.getCell(row, 4).value = item.totalGrossSalary;
            sheet.getCell(row, 4).numFmt = '$#,##0.00';
            sheet.getCell(row, 5).value = item.totalDeductions;
            sheet.getCell(row, 5).numFmt = '$#,##0.00';
            sheet.getCell(row, 6).value = item.totalNetPay;
            sheet.getCell(row, 6).numFmt = '$#,##0.00';
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }
    static addDetailedPayslipsSheet(workbook, payslips) {
        const sheet = workbook.addWorksheet('Detailed Payslips');
        let row = 1;
        sheet.getCell(row, 1).value = 'Employee Number';
        sheet.getCell(row, 2).value = 'Employee Name';
        sheet.getCell(row, 3).value = 'Payroll Run';
        sheet.getCell(row, 4).value = 'Period';
        sheet.getCell(row, 5).value = 'Gross Salary';
        sheet.getCell(row, 6).value = 'Deductions';
        sheet.getCell(row, 7).value = 'Net Pay';
        sheet.getCell(row, 8).value = 'Payment Status';
        [1, 2, 3, 4, 5, 6, 7, 8].forEach((col) => {
            sheet.getCell(row, col).font = { bold: true };
            sheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' },
            };
        });
        row++;
        payslips.forEach((payslip) => {
            const employee = payslip.employee;
            sheet.getCell(row, 1).value = employee?.employeeNumber || 'N/A';
            sheet.getCell(row, 2).value =
                employee?.firstName && employee?.lastName
                    ? `${employee.firstName} ${employee.lastName}`
                    : 'Unknown';
            sheet.getCell(row, 3).value = payslip.payrollRun?.runId || 'N/A';
            sheet.getCell(row, 4).value = payslip.period ? new Date(payslip.period).toLocaleDateString() : 'N/A';
            sheet.getCell(row, 5).value = payslip.grossSalary || 0;
            sheet.getCell(row, 5).numFmt = '$#,##0.00';
            sheet.getCell(row, 6).value = payslip.deductions || 0;
            sheet.getCell(row, 6).numFmt = '$#,##0.00';
            sheet.getCell(row, 7).value = payslip.netPay || 0;
            sheet.getCell(row, 7).numFmt = '$#,##0.00';
            sheet.getCell(row, 8).value = payslip.paymentStatus || 'N/A';
            row++;
        });
        sheet.columns.forEach((column) => {
            column.width = 18;
        });
    }
    static formatValueForExcel(value) {
        if (typeof value === 'number') {
            return value;
        }
        if (value instanceof Date) {
            return value;
        }
        return String(value || '');
    }
}
exports.ReportGenerator = ReportGenerator;
//# sourceMappingURL=report-generator.js.map