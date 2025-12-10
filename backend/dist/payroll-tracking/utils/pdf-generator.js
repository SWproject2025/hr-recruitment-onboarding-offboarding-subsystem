"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFGenerator = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
class PDFGenerator {
    static async generatePayslipPDF(payslip) {
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
                    .text('PAYSLIP', { align: 'center' })
                    .moveDown(0.5);
                const payrollRun = payslip.payrollRunId;
                if (payrollRun) {
                    doc
                        .fontSize(10)
                        .font('Helvetica')
                        .text(`Pay Period: ${this.formatPayrollPeriod(payrollRun.payrollPeriod)}`, { align: 'center' })
                        .text(`Payroll Run ID: ${payrollRun.runId || 'N/A'}`, { align: 'center' })
                        .moveDown();
                }
                const employee = payslip.employeeId;
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Employee Information', { underline: true })
                    .moveDown(0.3);
                doc.fontSize(10).font('Helvetica');
                if (employee) {
                    const employeeName = employee.firstName && employee.lastName
                        ? `${employee.firstName} ${employee.lastName}`
                        : employee.fullName || 'N/A';
                    doc.text(`Name: ${employeeName}`);
                    doc.text(`Employee Number: ${employee.employeeNumber || 'N/A'}`);
                }
                doc.moveDown();
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Earnings', { underline: true })
                    .moveDown(0.3);
                doc.fontSize(10).font('Helvetica');
                const earnings = payslip.earningsDetails || {};
                let totalEarnings = 0;
                if (earnings.baseSalary) {
                    const baseSalary = earnings.baseSalary || 0;
                    totalEarnings += baseSalary;
                    doc.text(`Base Salary: ${this.formatCurrency(baseSalary)}`, { indent: 20 });
                }
                if (earnings.allowances && earnings.allowances.length > 0) {
                    earnings.allowances.forEach((allowance) => {
                        const amount = allowance.amount || 0;
                        totalEarnings += amount;
                        doc.text(`${allowance.name || 'Allowance'}: ${this.formatCurrency(amount)}`, { indent: 20 });
                    });
                }
                if (earnings.bonuses && earnings.bonuses.length > 0) {
                    earnings.bonuses.forEach((bonus) => {
                        const amount = bonus.amount || 0;
                        totalEarnings += amount;
                        const bonusName = bonus.name || bonus.description || 'Bonus';
                        doc.text(`${bonusName}: ${this.formatCurrency(amount)}`, { indent: 20 });
                    });
                }
                if (earnings.benefits && earnings.benefits.length > 0) {
                    earnings.benefits.forEach((benefit) => {
                        const amount = benefit.amount || 0;
                        totalEarnings += amount;
                        const benefitName = benefit.name || benefit.description || 'Benefit';
                        doc.text(`${benefitName}: ${this.formatCurrency(amount)}`, { indent: 20 });
                    });
                }
                if (earnings.refunds && earnings.refunds.length > 0) {
                    earnings.refunds.forEach((refund) => {
                        const amount = refund.amount || 0;
                        totalEarnings += amount;
                        const refundName = refund.description || refund.reason || 'Refund';
                        doc.text(`${refundName}: ${this.formatCurrency(amount)}`, { indent: 20 });
                    });
                }
                doc
                    .font('Helvetica-Bold')
                    .text(`Total Earnings: ${this.formatCurrency(payslip.totalGrossSalary || totalEarnings)}`, { indent: 20 })
                    .moveDown();
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Deductions', { underline: true })
                    .moveDown(0.3);
                doc.fontSize(10).font('Helvetica');
                const deductions = payslip.deductionsDetails || {};
                let totalDeductions = 0;
                if (deductions.taxes && deductions.taxes.length > 0) {
                    deductions.taxes.forEach((tax) => {
                        const grossSalary = payslip.totalGrossSalary || 0;
                        const taxAmount = (grossSalary * (tax.rate || 0)) / 100;
                        totalDeductions += taxAmount;
                        doc.text(`${tax.name || 'Tax'} (${tax.rate || 0}%): ${this.formatCurrency(taxAmount)}`, { indent: 20 });
                    });
                }
                if (deductions.insurances && deductions.insurances.length > 0) {
                    deductions.insurances.forEach((insurance) => {
                        const amount = insurance.amount || insurance.contribution || 0;
                        totalDeductions += amount;
                        doc.text(`${insurance.name || 'Insurance'}: ${this.formatCurrency(amount)}`, { indent: 20 });
                    });
                }
                if (deductions.penalties && deductions.penalties.penalties) {
                    deductions.penalties.penalties.forEach((penalty) => {
                        const amount = penalty.amount || 0;
                        totalDeductions += amount;
                        doc.text(`Penalty - ${penalty.reason || 'N/A'}: ${this.formatCurrency(amount)}`, { indent: 20 });
                    });
                }
                doc
                    .font('Helvetica-Bold')
                    .text(`Total Deductions: ${this.formatCurrency(payslip.totaDeductions || totalDeductions)}`, { indent: 20 })
                    .moveDown();
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Summary', { underline: true })
                    .moveDown(0.3);
                doc.fontSize(10);
                doc.text(`Gross Salary: ${this.formatCurrency(payslip.totalGrossSalary || 0)}`, { indent: 20 });
                doc.text(`Total Deductions: ${this.formatCurrency(payslip.totaDeductions || 0)}`, { indent: 20 });
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text(`Net Pay: ${this.formatCurrency(payslip.netPay || 0)}`, { indent: 20 })
                    .moveDown();
                doc
                    .fontSize(10)
                    .font('Helvetica')
                    .text(`Payment Status: ${payslip.paymentStatus || 'N/A'}`, { indent: 20 })
                    .moveDown();
                const generatedDate = payslip.createdAt ? new Date(payslip.createdAt) : new Date();
                doc
                    .fontSize(8)
                    .font('Helvetica')
                    .text(`Generated on: ${this.formatDate(generatedDate)}`, { align: 'center' });
                doc.end();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static async generateTaxDocumentPDF(taxData) {
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
                    .text('ANNUAL TAX STATEMENT', { align: 'center' })
                    .moveDown(0.5);
                doc
                    .fontSize(14)
                    .font('Helvetica')
                    .text(`Tax Year: ${taxData.year}`, { align: 'center' })
                    .moveDown();
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Employee Information', { underline: true })
                    .moveDown(0.3);
                doc.fontSize(10).font('Helvetica');
                if (taxData.employee) {
                    const employeeName = taxData.employee.firstName && taxData.employee.lastName
                        ? `${taxData.employee.firstName} ${taxData.employee.lastName}`
                        : taxData.employee.fullName || 'N/A';
                    doc.text(`Name: ${employeeName}`);
                    doc.text(`Employee Number: ${taxData.employee.employeeNumber || 'N/A'}`);
                    if (taxData.employee.nationalId) {
                        doc.text(`National ID: ${taxData.employee.nationalId}`);
                    }
                    if (taxData.employee.workEmail) {
                        doc.text(`Email: ${taxData.employee.workEmail}`);
                    }
                }
                doc.moveDown();
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Annual Summary', { underline: true })
                    .moveDown(0.3);
                doc.fontSize(10).font('Helvetica');
                doc.text(`Total Gross Salary: ${this.formatCurrency(taxData.annualTotals.totalGrossSalary)}`, { indent: 20 });
                doc.text(`Total Tax Deductions: ${this.formatCurrency(taxData.annualTotals.totalTaxDeductions)}`, { indent: 20 });
                doc.text(`Total Net Pay: ${this.formatCurrency(taxData.annualTotals.totalNetPay)}`, { indent: 20 });
                doc.text(`Number of Payslips: ${taxData.annualTotals.payslipCount}`, { indent: 20 });
                doc.moveDown();
                doc
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text('Monthly Breakdown', { underline: true })
                    .moveDown(0.3);
                const tableTop = doc.y;
                const tableStartX = 50;
                const col1Width = 100;
                const col2Width = 120;
                const col3Width = 120;
                const col4Width = 120;
                doc
                    .fontSize(9)
                    .font('Helvetica-Bold')
                    .text('Month', tableStartX, tableTop)
                    .text('Gross Salary', tableStartX + col1Width, tableTop)
                    .text('Tax Deductions', tableStartX + col1Width + col2Width, tableTop)
                    .text('Net Pay', tableStartX + col1Width + col2Width + col3Width, tableTop);
                doc
                    .moveTo(tableStartX, tableTop + 15)
                    .lineTo(tableStartX + col1Width + col2Width + col3Width + col4Width, tableTop + 15)
                    .stroke()
                    .moveDown(0.3);
                let currentY = doc.y;
                const rowHeight = 20;
                const monthlyData = this.groupPayslipsByMonth(taxData.payslips);
                monthlyData.forEach((monthData) => {
                    if (currentY > 700) {
                        doc.addPage();
                        currentY = 50;
                    }
                    doc
                        .fontSize(9)
                        .font('Helvetica')
                        .text(monthData.month, tableStartX, currentY)
                        .text(this.formatCurrency(monthData.grossSalary), tableStartX + col1Width, currentY)
                        .text(this.formatCurrency(monthData.taxDeductions), tableStartX + col1Width + col2Width, currentY)
                        .text(this.formatCurrency(monthData.netPay), tableStartX + col1Width + col2Width + col3Width, currentY);
                    currentY += rowHeight;
                    doc.y = currentY;
                });
                doc.moveDown();
                doc
                    .fontSize(8)
                    .font('Helvetica')
                    .text(`This document was generated on ${this.formatDate(new Date())}. ` +
                    `Please keep this document for your records. For questions regarding your tax statement, ` +
                    `please contact the payroll department.`, { align: 'center' });
                doc.end();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    }
    static formatDate(date) {
        if (!date)
            return 'N/A';
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    }
    static formatPayrollPeriod(date) {
        if (!date)
            return 'N/A';
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    }
    static groupPayslipsByMonth(payslips) {
        const monthlyMap = new Map();
        payslips.forEach((payslip) => {
            const date = payslip.createdAt ? new Date(payslip.createdAt) : new Date();
            const monthKey = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
            if (!monthlyMap.has(monthKey)) {
                monthlyMap.set(monthKey, { grossSalary: 0, taxDeductions: 0, netPay: 0 });
            }
            const monthData = monthlyMap.get(monthKey);
            monthData.grossSalary += payslip.totalGrossSalary || 0;
            monthData.netPay += payslip.netPay || 0;
            let taxDeductions = 0;
            if (payslip.deductionsDetails?.taxes) {
                payslip.deductionsDetails.taxes.forEach((tax) => {
                    const grossSalary = payslip.totalGrossSalary || 0;
                    taxDeductions += (grossSalary * (tax.rate || 0)) / 100;
                });
            }
            monthData.taxDeductions += taxDeductions;
        });
        const monthlyData = Array.from(monthlyMap.entries()).map(([month, data]) => ({
            month,
            ...data,
        }));
        return monthlyData.sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateA.getTime() - dateB.getTime();
        });
    }
}
exports.PDFGenerator = PDFGenerator;
//# sourceMappingURL=pdf-generator.js.map