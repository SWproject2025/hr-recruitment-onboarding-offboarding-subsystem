import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { paySlip, PayslipDocument } from '../payroll-execution/models/payslip.schema';
import { employeePayrollDetails, employeePayrollDetailsDocument } from '../payroll-execution/models/employeePayrollDetails.schema';
import { payrollRuns, payrollRunsDocument } from '../payroll-execution/models/payrollRuns.schema';
import { EmployeeProfile, EmployeeProfileDocument } from '../employee-profile/models/employee-profile.schema';
import { PayslipQueryDto } from './dto/payslips/payslip-query.dto';
import { PayslipDownloadDto } from './dto/payslips/payslip-download.dto';
import { PDFGenerator } from './utils/pdf-generator';

@Injectable()
export class PayrollTrackingService {
    constructor(
        @InjectModel(paySlip.name)
        private payslipModel: Model<PayslipDocument>,
        @InjectModel(employeePayrollDetails.name)
        private employeePayrollDetailsModel: Model<employeePayrollDetailsDocument>,
        @InjectModel(payrollRuns.name)
        private payrollRunsModel: Model<payrollRunsDocument>,
        @InjectModel(EmployeeProfile.name)
        private employeeProfileModel: Model<EmployeeProfileDocument>,
    ) { }

    /**
     * Get payslip details for an employee
     * REQ-PY-1, REQ-PY-2
     */
    async getPayslip(employeeId: string, payslipId: string) {
        const payslip = await this.payslipModel
            .findById(payslipId)
            .populate('employeeId', 'employeeNumber firstName lastName')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();

        if (!payslip) {
            throw new NotFoundException('Payslip not found');
        }

        // Ensure employee can only access their own payslip
        if (payslip.employeeId.toString() !== employeeId) {
            throw new ForbiddenException('You can only access your own payslips');
        }

        return payslip;
    }

    /**
     * Download payslip as PDF
     * REQ-PY-1
     */
    async downloadPayslip(employeeId: string, payslipId: string, format: string = 'pdf'): Promise<Buffer> {
        const payslip = await this.getPayslip(employeeId, payslipId);

        // Generate PDF using PDF generator utility
        if (format === 'pdf') {
            return await PDFGenerator.generatePayslipPDF(payslip);
        }

        throw new BadRequestException(`Unsupported format: ${format}. Only PDF format is supported.`);
    }

    /**
     * Get payslip status and basic details
     * REQ-PY-2
     */
    async getPayslipStatus(employeeId: string, payslipId: string) {
        const payslip = await this.payslipModel
            .findById(payslipId)
            .select('employeeId paymentStatus payrollRunId createdAt')
            .populate('payrollRunId', 'runId payrollPeriod status paymentStatus')
            .lean();

        if (!payslip) {
            throw new NotFoundException('Payslip not found');
        }

        // Ensure employee can only access their own payslip
        if (payslip.employeeId.toString() !== employeeId) {
            throw new ForbiddenException('You can only access your own payslips');
        }

        return {
            payslipId,
            paymentStatus: payslip.paymentStatus,
            payrollRun: payslip.payrollRunId,
        };
    }

    /**
     * Get payslip history with filters
     * REQ-PY-13
     */
    async getPayslipHistory(employeeId: string, filters: PayslipQueryDto) {
        const {
            fromDate,
            toDate,
            payrollRunId,
            paymentStatus,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = filters;

        const query: any = {
            employeeId: new Types.ObjectId(employeeId),
        };

        // Apply date filters
        if (fromDate || toDate) {
            query.createdAt = {};
            if (fromDate) {
                query.createdAt.$gte = new Date(fromDate);
            }
            if (toDate) {
                query.createdAt.$lte = new Date(toDate);
            }
        }

        // Apply payroll run filter
        if (payrollRunId) {
            query.payrollRunId = new Types.ObjectId(payrollRunId);
        }

        // Apply payment status filter
        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        const skip = (page - 1) * limit;
        const sort: any = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const [payslips, total] = await Promise.all([
            this.payslipModel
                .find(query)
                .populate('payrollRunId', 'runId payrollPeriod status')
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),
            this.payslipModel.countDocuments(query),
        ]);

        return {
            payslips,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get comprehensive employee salary details
     * REQ-PY-3, REQ-PY-5, REQ-PY-7, REQ-PY-8, REQ-PY-9, REQ-PY-10, REQ-PY-11, REQ-PY-14
     * Uses data from PayrollExecutionModule - extracts from already calculated values
     */
    async getEmployeeSalaryDetails(employeeId: string) {
        // Get the latest payroll details from PayrollExecutionModule (already calculated)
        const latestPayrollDetails = await this.employeePayrollDetailsModel
            .findOne({ employeeId: new Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();

        if (!latestPayrollDetails) {
            throw new NotFoundException('No payroll details found for this employee');
        }

        // Get the latest payslip for detailed breakdown from PayrollExecutionModule
        const latestPayslip = await this.payslipModel
            .findOne({ employeeId: new Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();

        // Use base salary from payslip if available, otherwise from payroll details
        const baseSalary = latestPayslip?.earningsDetails?.baseSalary || latestPayrollDetails.baseSalary;

        // Extract leave compensation from payslip allowances/benefits (already calculated amounts)
        let leaveCompensation = 0;
        if (latestPayslip?.earningsDetails?.allowances) {
            latestPayslip.earningsDetails.allowances.forEach((allowance) => {
                if (allowance.name?.toLowerCase().includes('leave')) {
                    leaveCompensation += allowance.amount || 0;
                }
            });
        }
        if (latestPayslip?.earningsDetails?.benefits) {
            latestPayslip.earningsDetails.benefits.forEach((benefit) => {
                if (benefit.name?.toLowerCase().includes('leave')) {
                    leaveCompensation += benefit.amount || 0;
                }
            });
        }

        // Extract transportation compensation from payslip allowances (already calculated amounts)
        let transportationCompensation = 0;
        if (latestPayslip?.earningsDetails?.allowances) {
            latestPayslip.earningsDetails.allowances.forEach((allowance) => {
                if (allowance.name?.toLowerCase().includes('transport')) {
                    transportationCompensation += allowance.amount || 0;
                }
            });
        }

        // Use total deductions from payroll details (already calculated by PayrollExecutionModule)
        // Note: Detailed breakdown of tax vs insurance is not stored as separate amounts
        // The breakdown should come from PayrollExecutionModule service when it's implemented
        const totalDeductions = latestPayrollDetails.deductions;

        // Tax and insurance deductions are part of total deductions
        // These should be provided by PayrollExecutionModule service
        const taxDeductions = 0; // Should come from PayrollExecutionModule service
        const insuranceDeductions = 0; // Should come from PayrollExecutionModule service
        const employerContributions = 0; // Should come from PayrollExecutionModule service

        // Extract penalties (misconduct/absenteeism) from payslip (already calculated amounts)
        let salaryDeductions = 0; // Misconduct/absenteeism
        let unpaidLeaveDeductions = 0;
        if (latestPayslip?.deductionsDetails?.penalties?.penalties) {
            latestPayslip.deductionsDetails.penalties.penalties.forEach((penalty) => {
                salaryDeductions += penalty.amount || 0;
                if (penalty.reason?.toLowerCase().includes('unpaid leave')) {
                    unpaidLeaveDeductions += penalty.amount || 0;
                }
            });
        }

        return {
            employeeId,
            baseSalary,
            leaveCompensation,
            transportationCompensation,
            taxDeductions,
            insuranceDeductions,
            salaryDeductions, // Misconduct/absenteeism
            unpaidLeaveDeductions,
            employerContributions,
            netSalary: latestPayrollDetails.netSalary,
            netPay: latestPayrollDetails.netPay,
            latestPayrollRun: latestPayrollDetails.payrollRunId,
        };
    }

    /**
     * Download tax documents for a specific year
     * REQ-PY-15
     */
    async downloadTaxDocuments(employeeId: string, year: number) {
        // Validate year
        const currentYear = new Date().getFullYear();
        if (year < 2000 || year > currentYear) {
            throw new BadRequestException(`Invalid year. Must be between 2000 and ${currentYear}`);
        }

        // Get all payslips for the specified year
        const startDate = new Date(year, 0, 1); // January 1st
        const endDate = new Date(year, 11, 31, 23, 59, 59); // December 31st

        const payslips = await this.payslipModel
            .find({
                employeeId: new Types.ObjectId(employeeId),
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            })
            .populate('payrollRunId', 'runId payrollPeriod')
            .sort({ createdAt: 1 })
            .lean();

        if (payslips.length === 0) {
            throw new NotFoundException(`No payslips found for year ${year}`);
        }

        // Calculate annual totals
        const annualTotals = {
            totalGrossSalary: 0,
            totalTaxDeductions: 0,
            totalNetPay: 0,
            payslipCount: payslips.length,
        };

        payslips.forEach((payslip) => {
            annualTotals.totalGrossSalary += payslip.totalGrossSalary || 0;
            annualTotals.totalNetPay += payslip.netPay || 0;

            if (payslip.deductionsDetails?.taxes) {
                payslip.deductionsDetails.taxes.forEach((tax) => {
                    // Calculate tax amount based on rate
                    const taxAmount = (payslip.totalGrossSalary * (tax.rate || 0)) / 100;
                    annualTotals.totalTaxDeductions += taxAmount;
                });
            }
        });

        // Get employee profile for tax document
        const employee = await this.employeeProfileModel
            .findById(employeeId)
            .select('employeeNumber firstName lastName nationalId workEmail')
            .lean();

        return {
            year,
            employee,
            payslips,
            annualTotals,
            documentType: 'tax_statement',
            generatedAt: new Date(),
            downloadUrl: `/payroll-tracking/employee/tax-documents/${year}/download`,
        };
    }

    /**
     * Download tax documents as PDF for a specific year
     * REQ-PY-15
     */
    async downloadTaxDocumentsPDF(employeeId: string, year: number): Promise<Buffer> {
        // Get tax document data
        const taxData = await this.downloadTaxDocuments(employeeId, year);

        // Generate PDF using PDF generator utility
        // Cast to any to handle type compatibility between Document and plain objects
        return await PDFGenerator.generateTaxDocumentPDF(taxData as any);
    }
}
