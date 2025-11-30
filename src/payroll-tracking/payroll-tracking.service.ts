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
import { disputes, disputesDocument } from './models/disputes.schema';
import { claims, claimsDocument } from './models/claims.schema';
import { DisputeStatus, ClaimStatus } from './enums/payroll-tracking-enum';
import { CreateDisputeDto } from './dto/disputes/create-dispute.dto';
import { ApproveDisputeDto } from './dto/disputes/approve-dispute.dto';
import { RejectDisputeDto } from './dto/disputes/reject-dispute.dto';
import { CreateClaimDto } from './dto/claims/create-claim.dto';
import { ApproveClaimDto } from './dto/claims/approve-claim.dto';
import { RejectClaimDto } from './dto/claims/reject-claim.dto';
import { ApprovalHistoryEntry } from './models/common.schema';

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
        @InjectModel(disputes.name)
        private disputesModel: Model<disputesDocument>,
        @InjectModel(claims.name)
        private claimsModel: Model<claimsDocument>,
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

    // ==================== HELPER METHODS ====================

    /**
     * Generate unique dispute ID (DISP-0001, DISP-0002, etc.)
     */
    private async generateDisputeId(): Promise<string> {
        const lastDispute = await this.disputesModel
            .findOne()
            .sort({ createdAt: -1 })
            .select('disputeId')
            .lean();

        if (!lastDispute || !lastDispute.disputeId) {
            return 'DISP-0001';
        }

        const lastNumber = parseInt(lastDispute.disputeId.split('-')[1] || '0', 10);
        const nextNumber = lastNumber + 1;
        return `DISP-${nextNumber.toString().padStart(4, '0')}`;
    }

    /**
     * Generate unique claim ID (CLAIM-0001, CLAIM-0002, etc.)
     */
    private async generateClaimId(): Promise<string> {
        const lastClaim = await this.claimsModel
            .findOne()
            .sort({ createdAt: -1 })
            .select('claimId')
            .lean();

        if (!lastClaim || !lastClaim.claimId) {
            return 'CLAIM-0001';
        }

        const lastNumber = parseInt(lastClaim.claimId.split('-')[1] || '0', 10);
        const nextNumber = lastNumber + 1;
        return `CLAIM-${nextNumber.toString().padStart(4, '0')}`;
    }

    /**
     * Add approval history entry
     */
    private createApprovalHistoryEntry(
        userId: string,
        action: string,
        role: string,
        previousStatus: string,
        newStatus: string,
        comment?: string,
    ): ApprovalHistoryEntry {
        return {
            userId: new Types.ObjectId(userId),
            action,
            role,
            timestamp: new Date(),
            comment,
            previousStatus,
            newStatus,
        };
    }

    // ==================== EMPLOYEE SERVICES ====================

    /**
     * Create a dispute for a payslip
     * REQ-PY-16
     */
    async createDispute(employeeId: string, createDisputeDto: CreateDisputeDto) {
        // Verify payslip exists and belongs to employee
        const payslip = await this.payslipModel.findById(createDisputeDto.payslipId);
        if (!payslip) {
            throw new NotFoundException('Payslip not found');
        }

        if (payslip.employeeId.toString() !== employeeId) {
            throw new ForbiddenException('You can only dispute your own payslips');
        }

        // Generate unique dispute ID
        const disputeId = await this.generateDisputeId();

        // Create dispute
        const dispute = new this.disputesModel({
            disputeId,
            description: createDisputeDto.description,
            employeeId: new Types.ObjectId(employeeId),
            payslipId: new Types.ObjectId(createDisputeDto.payslipId),
            status: DisputeStatus.UNDER_REVIEW,
            submittedAt: new Date(),
            approvalHistory: [
                this.createApprovalHistoryEntry(
                    employeeId,
                    'submitted',
                    'employee',
                    '',
                    DisputeStatus.UNDER_REVIEW,
                    'Dispute submitted by employee',
                ),
            ],
        });

        const savedDispute = await dispute.save();
        return savedDispute.populate('employeeId', 'employeeNumber firstName lastName');
    }

    /**
     * Get disputes for an employee
     * REQ-PY-18
     */
    async getEmployeeDisputes(employeeId: string, filters?: { page?: number; limit?: number }) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { employeeId: new Types.ObjectId(employeeId) };
        const skip = (page - 1) * limit;

        const [disputes, total] = await Promise.all([
            this.disputesModel
                .find(query)
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .populate('payrollManagerId', 'employeeNumber firstName lastName')
                .populate('payslipId', 'payslipId payrollRunId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.disputesModel.countDocuments(query),
        ]);

        return {
            disputes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get dispute status for an employee
     * REQ-PY-18
     */
    async getDisputeStatus(employeeId: string, disputeId: string) {
        const dispute = await this.disputesModel
            .findOne({ disputeId })
            .populate('employeeId', 'employeeNumber firstName lastName')
            .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
            .populate('payrollManagerId', 'employeeNumber firstName lastName')
            .populate('payslipId', 'payslipId payrollRunId')
            .lean();

        if (!dispute) {
            throw new NotFoundException('Dispute not found');
        }

        if (dispute.employeeId.toString() !== employeeId) {
            throw new ForbiddenException('You can only view your own disputes');
        }

        return dispute;
    }

    /**
     * Create an expense claim
     * REQ-PY-17
     */
    async createClaim(employeeId: string, createClaimDto: CreateClaimDto) {
        // Generate unique claim ID
        const claimId = await this.generateClaimId();

        // Create claim
        const claim = new this.claimsModel({
            claimId,
            description: createClaimDto.description,
            claimType: createClaimDto.claimType,
            amount: createClaimDto.amount,
            employeeId: new Types.ObjectId(employeeId),
            status: ClaimStatus.UNDER_REVIEW,
            submittedAt: new Date(),
            approvalHistory: [
                this.createApprovalHistoryEntry(
                    employeeId,
                    'submitted',
                    'employee',
                    '',
                    ClaimStatus.UNDER_REVIEW,
                    'Claim submitted by employee',
                ),
            ],
        });

        const savedClaim = await claim.save();
        return savedClaim.populate('employeeId', 'employeeNumber firstName lastName');
    }

    /**
     * Get claims for an employee
     * REQ-PY-18
     */
    async getEmployeeClaims(employeeId: string, filters?: { page?: number; limit?: number }) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { employeeId: new Types.ObjectId(employeeId) };
        const skip = (page - 1) * limit;

        const [claims, total] = await Promise.all([
            this.claimsModel
                .find(query)
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .populate('payrollManagerId', 'employeeNumber firstName lastName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.claimsModel.countDocuments(query),
        ]);

        return {
            claims,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get claim status for an employee
     * REQ-PY-18
     */
    async getClaimStatus(employeeId: string, claimId: string) {
        const claim = await this.claimsModel
            .findOne({ claimId })
            .populate('employeeId', 'employeeNumber firstName lastName')
            .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
            .populate('payrollManagerId', 'employeeNumber firstName lastName')
            .lean();

        if (!claim) {
            throw new NotFoundException('Claim not found');
        }

        if (claim.employeeId.toString() !== employeeId) {
            throw new ForbiddenException('You can only view your own claims');
        }

        return claim;
    }

    // ==================== PAYROLL SPECIALIST SERVICES ====================

    /**
     * Get disputes pending review by payroll specialist
     * REQ-PY-39
     */
    async getDisputesForReview(filters?: { status?: DisputeStatus; page?: number; limit?: number }) {
        const { status = DisputeStatus.UNDER_REVIEW, page = 1, limit = 10 } = filters || {};

        const query: any = { status };
        const skip = (page - 1) * limit;

        const [disputes, total] = await Promise.all([
            this.disputesModel
                .find(query)
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payslipId', 'payslipId payrollRunId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.disputesModel.countDocuments(query),
        ]);

        return {
            disputes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Approve dispute (moves to pending manager approval)
     * REQ-PY-39
     */
    async approveDispute(disputeId: string, specialistId: string, approveDisputeDto: ApproveDisputeDto) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new NotFoundException('Dispute not found');
        }

        if (dispute.status !== DisputeStatus.UNDER_REVIEW) {
            throw new BadRequestException(`Cannot approve dispute with status: ${dispute.status}`);
        }

        const previousStatus = dispute.status;
        dispute.status = DisputeStatus.PENDING_MANAGER_APPROVAL;
        dispute.payrollSpecialistId = new Types.ObjectId(specialistId);
        dispute.reviewedAt = new Date();
        if (approveDisputeDto.comment) {
            dispute.resolutionComment = approveDisputeDto.comment;
        }

        // Add approval history
        dispute.approvalHistory.push(
            this.createApprovalHistoryEntry(
                specialistId,
                'approved',
                'payroll_specialist',
                previousStatus,
                dispute.status,
                approveDisputeDto.comment,
            ),
        );

        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }

    /**
     * Reject dispute
     * REQ-PY-39
     */
    async rejectDispute(disputeId: string, specialistId: string, rejectDisputeDto: RejectDisputeDto) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new NotFoundException('Dispute not found');
        }

        if (dispute.status !== DisputeStatus.UNDER_REVIEW) {
            throw new BadRequestException(`Cannot reject dispute with status: ${dispute.status}`);
        }

        const previousStatus = dispute.status;
        dispute.status = DisputeStatus.REJECTED;
        dispute.payrollSpecialistId = new Types.ObjectId(specialistId);
        dispute.rejectionReason = rejectDisputeDto.reason;
        dispute.reviewedAt = new Date();
        dispute.resolvedAt = new Date();

        // Add approval history
        dispute.approvalHistory.push(
            this.createApprovalHistoryEntry(
                specialistId,
                'rejected',
                'payroll_specialist',
                previousStatus,
                dispute.status,
                rejectDisputeDto.reason,
            ),
        );

        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }

    /**
     * Get claims pending review by payroll specialist
     * REQ-PY-42
     */
    async getClaimsForReview(filters?: { status?: ClaimStatus; page?: number; limit?: number }) {
        const { status = ClaimStatus.UNDER_REVIEW, page = 1, limit = 10 } = filters || {};

        const query: any = { status };
        const skip = (page - 1) * limit;

        const [claims, total] = await Promise.all([
            this.claimsModel
                .find(query)
                .populate('employeeId', 'employeeNumber firstName lastName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.claimsModel.countDocuments(query),
        ]);

        return {
            claims,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Approve claim (moves to pending manager approval)
     * REQ-PY-42
     */
    async approveClaim(claimId: string, specialistId: string, approveClaimDto: ApproveClaimDto) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new NotFoundException('Claim not found');
        }

        if (claim.status !== ClaimStatus.UNDER_REVIEW) {
            throw new BadRequestException(`Cannot approve claim with status: ${claim.status}`);
        }

        if (approveClaimDto.approvedAmount > claim.amount) {
            throw new BadRequestException('Approved amount cannot exceed claimed amount');
        }

        const previousStatus = claim.status;
        claim.status = ClaimStatus.PENDING_MANAGER_APPROVAL;
        claim.payrollSpecialistId = new Types.ObjectId(specialistId);
        claim.approvedAmount = approveClaimDto.approvedAmount;
        claim.reviewedAt = new Date();
        if (approveClaimDto.comment) {
            claim.resolutionComment = approveClaimDto.comment;
        }

        // Add approval history
        claim.approvalHistory.push(
            this.createApprovalHistoryEntry(
                specialistId,
                'approved',
                'payroll_specialist',
                previousStatus,
                claim.status,
                approveClaimDto.comment,
            ),
        );

        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
        ]);
    }

    /**
     * Reject claim
     * REQ-PY-42
     */
    async rejectClaim(claimId: string, specialistId: string, rejectClaimDto: RejectClaimDto) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new NotFoundException('Claim not found');
        }

        if (claim.status !== ClaimStatus.UNDER_REVIEW) {
            throw new BadRequestException(`Cannot reject claim with status: ${claim.status}`);
        }

        const previousStatus = claim.status;
        claim.status = ClaimStatus.REJECTED;
        claim.payrollSpecialistId = new Types.ObjectId(specialistId);
        claim.rejectionReason = rejectClaimDto.reason;
        claim.reviewedAt = new Date();
        claim.resolvedAt = new Date();

        // Add approval history
        claim.approvalHistory.push(
            this.createApprovalHistoryEntry(
                specialistId,
                'rejected',
                'payroll_specialist',
                previousStatus,
                claim.status,
                rejectClaimDto.reason,
            ),
        );

        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
        ]);
    }

    // ==================== PAYROLL MANAGER SERVICES ====================

    /**
     * Get pending manager approvals (disputes and claims)
     * REQ-PY-40, REQ-PY-43
     */
    async getPendingManagerApprovals(filters?: { page?: number; limit?: number }) {
        const { page = 1, limit = 10 } = filters || {};
        const skip = (page - 1) * limit;

        const [disputes, claims, disputesTotal, claimsTotal] = await Promise.all([
            this.disputesModel
                .find({ status: DisputeStatus.PENDING_MANAGER_APPROVAL })
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .populate('payslipId', 'payslipId payrollRunId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.claimsModel
                .find({ status: ClaimStatus.PENDING_MANAGER_APPROVAL })
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.disputesModel.countDocuments({ status: DisputeStatus.PENDING_MANAGER_APPROVAL }),
            this.claimsModel.countDocuments({ status: ClaimStatus.PENDING_MANAGER_APPROVAL }),
        ]);

        return {
            disputes,
            claims,
            pagination: {
                page,
                limit,
                disputesTotal,
                claimsTotal,
                total: disputesTotal + claimsTotal,
                totalPages: Math.ceil((disputesTotal + claimsTotal) / limit),
            },
        };
    }

    /**
     * Confirm dispute approval (final approval by manager)
     * REQ-PY-40
     */
    async confirmDisputeApproval(disputeId: string, managerId: string) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new NotFoundException('Dispute not found');
        }

        if (dispute.status !== DisputeStatus.PENDING_MANAGER_APPROVAL) {
            throw new BadRequestException(`Cannot confirm approval for dispute with status: ${dispute.status}`);
        }

        const previousStatus = dispute.status;
        dispute.status = DisputeStatus.APPROVED;
        dispute.payrollManagerId = new Types.ObjectId(managerId);
        dispute.managerApprovedAt = new Date();
        dispute.resolvedAt = new Date();

        // Add approval history
        dispute.approvalHistory.push(
            this.createApprovalHistoryEntry(
                managerId,
                'confirmed',
                'payroll_manager',
                previousStatus,
                dispute.status,
                'Dispute approved by payroll manager',
            ),
        );

        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }

    /**
     * Confirm claim approval (final approval by manager)
     * REQ-PY-43
     */
    async confirmClaimApproval(claimId: string, managerId: string) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new NotFoundException('Claim not found');
        }

        if (claim.status !== ClaimStatus.PENDING_MANAGER_APPROVAL) {
            throw new BadRequestException(`Cannot confirm approval for claim with status: ${claim.status}`);
        }

        const previousStatus = claim.status;
        claim.status = ClaimStatus.APPROVED;
        claim.payrollManagerId = new Types.ObjectId(managerId);
        claim.managerApprovedAt = new Date();
        claim.resolvedAt = new Date();

        // Add approval history
        claim.approvalHistory.push(
            this.createApprovalHistoryEntry(
                managerId,
                'confirmed',
                'payroll_manager',
                previousStatus,
                claim.status,
                'Claim approved by payroll manager',
            ),
        );

        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
        ]);
    }

    /**
     * Reject dispute by manager (rejects items pending manager approval)
     * REQ-PY-40
     */
    async rejectDisputeByManager(disputeId: string, managerId: string, reason: string) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new NotFoundException('Dispute not found');
        }

        if (dispute.status !== DisputeStatus.PENDING_MANAGER_APPROVAL) {
            throw new BadRequestException(`Cannot reject dispute with status: ${dispute.status}`);
        }

        const previousStatus = dispute.status;
        dispute.status = DisputeStatus.REJECTED;
        dispute.payrollManagerId = new Types.ObjectId(managerId);
        dispute.rejectionReason = reason;
        dispute.managerRejectedAt = new Date();
        dispute.resolvedAt = new Date();

        // Add approval history
        dispute.approvalHistory.push(
            this.createApprovalHistoryEntry(
                managerId,
                'rejected',
                'payroll_manager',
                previousStatus,
                dispute.status,
                reason,
            ),
        );

        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }

    /**
     * Reject claim by manager (rejects items pending manager approval)
     * REQ-PY-43
     */
    async rejectClaimByManager(claimId: string, managerId: string, reason: string) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new NotFoundException('Claim not found');
        }

        if (claim.status !== ClaimStatus.PENDING_MANAGER_APPROVAL) {
            throw new BadRequestException(`Cannot reject claim with status: ${claim.status}`);
        }

        const previousStatus = claim.status;
        claim.status = ClaimStatus.REJECTED;
        claim.payrollManagerId = new Types.ObjectId(managerId);
        claim.rejectionReason = reason;
        claim.managerRejectedAt = new Date();
        claim.resolvedAt = new Date();

        // Add approval history
        claim.approvalHistory.push(
            this.createApprovalHistoryEntry(
                managerId,
                'rejected',
                'payroll_manager',
                previousStatus,
                claim.status,
                reason,
            ),
        );

        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
        ]);
    }

    // ==================== FINANCE STAFF SERVICES ====================

    /**
     * Get approved disputes for finance staff
     * REQ-PY-41
     */
    async getApprovedDisputes(filters?: { page?: number; limit?: number }) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { status: DisputeStatus.APPROVED };
        const skip = (page - 1) * limit;

        const [disputes, total] = await Promise.all([
            this.disputesModel
                .find(query)
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .populate('payrollManagerId', 'employeeNumber firstName lastName')
                .populate('payslipId', 'payslipId payrollRunId')
                .sort({ resolvedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.disputesModel.countDocuments(query),
        ]);

        return {
            disputes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get approved claims for finance staff
     * REQ-PY-44
     */
    async getApprovedClaims(filters?: { page?: number; limit?: number }) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { status: ClaimStatus.APPROVED };
        const skip = (page - 1) * limit;

        const [claims, total] = await Promise.all([
            this.claimsModel
                .find(query)
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .populate('payrollManagerId', 'employeeNumber firstName lastName')
                .sort({ resolvedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.claimsModel.countDocuments(query),
        ]);

        return {
            claims,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
