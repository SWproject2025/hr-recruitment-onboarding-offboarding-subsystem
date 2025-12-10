"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payslip_schema_1 = require("../payroll-execution/models/payslip.schema");
const employeePayrollDetails_schema_1 = require("../payroll-execution/models/employeePayrollDetails.schema");
const payrollRuns_schema_1 = require("../payroll-execution/models/payrollRuns.schema");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const pdf_generator_1 = require("./utils/pdf-generator");
const disputes_schema_1 = require("./models/disputes.schema");
const claims_schema_1 = require("./models/claims.schema");
const refunds_schema_1 = require("./models/refunds.schema");
const payroll_tracking_enum_1 = require("./enums/payroll-tracking-enum");
let PayrollTrackingService = class PayrollTrackingService {
    payslipModel;
    employeePayrollDetailsModel;
    payrollRunsModel;
    employeeProfileModel;
    disputesModel;
    claimsModel;
    refundsModel;
    constructor(payslipModel, employeePayrollDetailsModel, payrollRunsModel, employeeProfileModel, disputesModel, claimsModel, refundsModel) {
        this.payslipModel = payslipModel;
        this.employeePayrollDetailsModel = employeePayrollDetailsModel;
        this.payrollRunsModel = payrollRunsModel;
        this.employeeProfileModel = employeeProfileModel;
        this.disputesModel = disputesModel;
        this.claimsModel = claimsModel;
        this.refundsModel = refundsModel;
    }
    async getPayslip(employeeId, payslipId) {
        const payslip = await this.payslipModel
            .findById(payslipId)
            .populate('employeeId', 'employeeNumber firstName lastName')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        if (payslip.employeeId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('You can only access your own payslips');
        }
        return payslip;
    }
    async downloadPayslip(employeeId, payslipId, format = 'pdf') {
        const payslip = await this.getPayslip(employeeId, payslipId);
        if (format === 'pdf') {
            return await pdf_generator_1.PDFGenerator.generatePayslipPDF(payslip);
        }
        throw new common_1.BadRequestException(`Unsupported format: ${format}. Only PDF format is supported.`);
    }
    async getPayslipStatus(employeeId, payslipId) {
        const payslip = await this.payslipModel
            .findById(payslipId)
            .select('employeeId paymentStatus payrollRunId createdAt')
            .populate('payrollRunId', 'runId payrollPeriod status paymentStatus')
            .lean();
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        if (payslip.employeeId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('You can only access your own payslips');
        }
        return {
            payslipId,
            paymentStatus: payslip.paymentStatus,
            payrollRun: payslip.payrollRunId,
        };
    }
    async getPayslipHistory(employeeId, filters) {
        const { fromDate, toDate, payrollRunId, paymentStatus, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = filters;
        const query = {
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        };
        if (fromDate || toDate) {
            query.createdAt = {};
            if (fromDate) {
                query.createdAt.$gte = new Date(fromDate);
            }
            if (toDate) {
                query.createdAt.$lte = new Date(toDate);
            }
        }
        if (payrollRunId) {
            query.payrollRunId = new mongoose_2.Types.ObjectId(payrollRunId);
        }
        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }
        const skip = (page - 1) * limit;
        const sort = {};
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
    async getEmployeeSalaryDetails(employeeId) {
        const latestPayrollDetails = await this.employeePayrollDetailsModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        if (!latestPayrollDetails) {
            throw new common_1.NotFoundException('No payroll details found for this employee');
        }
        const latestPayslip = await this.payslipModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        const baseSalary = latestPayslip?.earningsDetails?.baseSalary || latestPayrollDetails.baseSalary;
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
        let transportationCompensation = 0;
        if (latestPayslip?.earningsDetails?.allowances) {
            latestPayslip.earningsDetails.allowances.forEach((allowance) => {
                if (allowance.name?.toLowerCase().includes('transport')) {
                    transportationCompensation += allowance.amount || 0;
                }
            });
        }
        const totalDeductions = latestPayrollDetails.deductions;
        const taxDeductions = 0;
        const insuranceDeductions = 0;
        const employerContributions = 0;
        let salaryDeductions = 0;
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
            salaryDeductions,
            unpaidLeaveDeductions,
            employerContributions,
            netSalary: latestPayrollDetails.netSalary,
            netPay: latestPayrollDetails.netPay,
            latestPayrollRun: latestPayrollDetails.payrollRunId,
        };
    }
    async downloadTaxDocuments(employeeId, year) {
        const currentYear = new Date().getFullYear();
        if (year < 2000 || year > currentYear) {
            throw new common_1.BadRequestException(`Invalid year. Must be between 2000 and ${currentYear}`);
        }
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59);
        const payslips = await this.payslipModel
            .find({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate('payrollRunId', 'runId payrollPeriod')
            .sort({ createdAt: 1 })
            .lean();
        if (payslips.length === 0) {
            throw new common_1.NotFoundException(`No payslips found for year ${year}`);
        }
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
                    const taxAmount = (payslip.totalGrossSalary * (tax.rate || 0)) / 100;
                    annualTotals.totalTaxDeductions += taxAmount;
                });
            }
        });
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
    async downloadTaxDocumentsPDF(employeeId, year) {
        const taxData = await this.downloadTaxDocuments(employeeId, year);
        return await pdf_generator_1.PDFGenerator.generateTaxDocumentPDF(taxData);
    }
    async generateDisputeId() {
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
    async generateClaimId() {
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
    createApprovalHistoryEntry(userId, action, role, previousStatus, newStatus, comment) {
        return {
            userId: new mongoose_2.Types.ObjectId(userId),
            action,
            role,
            timestamp: new Date(),
            comment,
            previousStatus,
            newStatus,
        };
    }
    async createDispute(employeeId, createDisputeDto) {
        const payslip = await this.payslipModel.findById(createDisputeDto.payslipId);
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        if (payslip.employeeId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('You can only dispute your own payslips');
        }
        const disputeId = await this.generateDisputeId();
        const dispute = new this.disputesModel({
            disputeId,
            description: createDisputeDto.description,
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            payslipId: new mongoose_2.Types.ObjectId(createDisputeDto.payslipId),
            status: payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW,
            submittedAt: new Date(),
            approvalHistory: [
                this.createApprovalHistoryEntry(employeeId, 'submitted', 'employee', '', payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW, 'Dispute submitted by employee'),
            ],
        });
        const savedDispute = await dispute.save();
        return savedDispute.populate('employeeId', 'employeeNumber firstName lastName');
    }
    async getEmployeeDisputes(employeeId, filters) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { employeeId: new mongoose_2.Types.ObjectId(employeeId) };
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
    async getDisputeStatus(employeeId, disputeId) {
        const dispute = await this.disputesModel
            .findOne({ disputeId })
            .populate('employeeId', 'employeeNumber firstName lastName')
            .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
            .populate('payrollManagerId', 'employeeNumber firstName lastName')
            .populate('payslipId', 'payslipId payrollRunId')
            .lean();
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.employeeId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('You can only view your own disputes');
        }
        return dispute;
    }
    async createClaim(employeeId, createClaimDto) {
        const claimId = await this.generateClaimId();
        const claim = new this.claimsModel({
            claimId,
            description: createClaimDto.description,
            claimType: createClaimDto.claimType,
            amount: createClaimDto.amount,
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            status: payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW,
            submittedAt: new Date(),
            approvalHistory: [
                this.createApprovalHistoryEntry(employeeId, 'submitted', 'employee', '', payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW, 'Claim submitted by employee'),
            ],
        });
        const savedClaim = await claim.save();
        return savedClaim.populate('employeeId', 'employeeNumber firstName lastName');
    }
    async getEmployeeClaims(employeeId, filters) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { employeeId: new mongoose_2.Types.ObjectId(employeeId) };
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
    async getClaimStatus(employeeId, claimId) {
        const claim = await this.claimsModel
            .findOne({ claimId })
            .populate('employeeId', 'employeeNumber firstName lastName')
            .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
            .populate('payrollManagerId', 'employeeNumber firstName lastName')
            .lean();
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        if (claim.employeeId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('You can only view your own claims');
        }
        return claim;
    }
    async getDisputesForReview(filters) {
        const { status = payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW, page = 1, limit = 10 } = filters || {};
        const query = { status };
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
    async approveDispute(disputeId, specialistId, approveDisputeDto) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.status !== payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException(`Cannot approve dispute with status: ${dispute.status}`);
        }
        const previousStatus = dispute.status;
        dispute.status = payroll_tracking_enum_1.DisputeStatus.PENDING_MANAGER_APPROVAL;
        dispute.payrollSpecialistId = new mongoose_2.Types.ObjectId(specialistId);
        dispute.reviewedAt = new Date();
        if (approveDisputeDto.comment) {
            dispute.resolutionComment = approveDisputeDto.comment;
        }
        dispute.approvalHistory.push(this.createApprovalHistoryEntry(specialistId, 'approved', 'payroll_specialist', previousStatus, dispute.status, approveDisputeDto.comment));
        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }
    async rejectDispute(disputeId, specialistId, rejectDisputeDto) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.status !== payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException(`Cannot reject dispute with status: ${dispute.status}`);
        }
        const previousStatus = dispute.status;
        dispute.status = payroll_tracking_enum_1.DisputeStatus.REJECTED;
        dispute.payrollSpecialistId = new mongoose_2.Types.ObjectId(specialistId);
        dispute.rejectionReason = rejectDisputeDto.reason;
        dispute.reviewedAt = new Date();
        dispute.resolvedAt = new Date();
        dispute.approvalHistory.push(this.createApprovalHistoryEntry(specialistId, 'rejected', 'payroll_specialist', previousStatus, dispute.status, rejectDisputeDto.reason));
        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }
    async getClaimsForReview(filters) {
        const { status = payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW, page = 1, limit = 10 } = filters || {};
        const query = { status };
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
    async approveClaim(claimId, specialistId, approveClaimDto) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        if (claim.status !== payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException(`Cannot approve claim with status: ${claim.status}`);
        }
        if (approveClaimDto.approvedAmount > claim.amount) {
            throw new common_1.BadRequestException('Approved amount cannot exceed claimed amount');
        }
        const previousStatus = claim.status;
        claim.status = payroll_tracking_enum_1.ClaimStatus.PENDING_MANAGER_APPROVAL;
        claim.payrollSpecialistId = new mongoose_2.Types.ObjectId(specialistId);
        claim.approvedAmount = approveClaimDto.approvedAmount;
        claim.reviewedAt = new Date();
        if (approveClaimDto.comment) {
            claim.resolutionComment = approveClaimDto.comment;
        }
        claim.approvalHistory.push(this.createApprovalHistoryEntry(specialistId, 'approved', 'payroll_specialist', previousStatus, claim.status, approveClaimDto.comment));
        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async rejectClaim(claimId, specialistId, rejectClaimDto) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        if (claim.status !== payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException(`Cannot reject claim with status: ${claim.status}`);
        }
        const previousStatus = claim.status;
        claim.status = payroll_tracking_enum_1.ClaimStatus.REJECTED;
        claim.payrollSpecialistId = new mongoose_2.Types.ObjectId(specialistId);
        claim.rejectionReason = rejectClaimDto.reason;
        claim.reviewedAt = new Date();
        claim.resolvedAt = new Date();
        claim.approvalHistory.push(this.createApprovalHistoryEntry(specialistId, 'rejected', 'payroll_specialist', previousStatus, claim.status, rejectClaimDto.reason));
        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async getPendingManagerApprovals(filters) {
        const { page = 1, limit = 10 } = filters || {};
        const skip = (page - 1) * limit;
        const [disputes, claims, disputesTotal, claimsTotal] = await Promise.all([
            this.disputesModel
                .find({ status: payroll_tracking_enum_1.DisputeStatus.PENDING_MANAGER_APPROVAL })
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .populate('payslipId', 'payslipId payrollRunId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.claimsModel
                .find({ status: payroll_tracking_enum_1.ClaimStatus.PENDING_MANAGER_APPROVAL })
                .populate('employeeId', 'employeeNumber firstName lastName')
                .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.disputesModel.countDocuments({ status: payroll_tracking_enum_1.DisputeStatus.PENDING_MANAGER_APPROVAL }),
            this.claimsModel.countDocuments({ status: payroll_tracking_enum_1.ClaimStatus.PENDING_MANAGER_APPROVAL }),
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
    async confirmDisputeApproval(disputeId, managerId) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.status !== payroll_tracking_enum_1.DisputeStatus.PENDING_MANAGER_APPROVAL) {
            throw new common_1.BadRequestException(`Cannot confirm approval for dispute with status: ${dispute.status}`);
        }
        const previousStatus = dispute.status;
        dispute.status = payroll_tracking_enum_1.DisputeStatus.APPROVED;
        dispute.payrollManagerId = new mongoose_2.Types.ObjectId(managerId);
        dispute.managerApprovedAt = new Date();
        dispute.resolvedAt = new Date();
        dispute.approvalHistory.push(this.createApprovalHistoryEntry(managerId, 'confirmed', 'payroll_manager', previousStatus, dispute.status, 'Dispute approved by payroll manager'));
        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }
    async confirmClaimApproval(claimId, managerId) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        if (claim.status !== payroll_tracking_enum_1.ClaimStatus.PENDING_MANAGER_APPROVAL) {
            throw new common_1.BadRequestException(`Cannot confirm approval for claim with status: ${claim.status}`);
        }
        const previousStatus = claim.status;
        claim.status = payroll_tracking_enum_1.ClaimStatus.APPROVED;
        claim.payrollManagerId = new mongoose_2.Types.ObjectId(managerId);
        claim.managerApprovedAt = new Date();
        claim.resolvedAt = new Date();
        claim.approvalHistory.push(this.createApprovalHistoryEntry(managerId, 'confirmed', 'payroll_manager', previousStatus, claim.status, 'Claim approved by payroll manager'));
        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async rejectDisputeByManager(disputeId, managerId, reason) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.status !== payroll_tracking_enum_1.DisputeStatus.PENDING_MANAGER_APPROVAL) {
            throw new common_1.BadRequestException(`Cannot reject dispute with status: ${dispute.status}`);
        }
        const previousStatus = dispute.status;
        dispute.status = payroll_tracking_enum_1.DisputeStatus.REJECTED;
        dispute.payrollManagerId = new mongoose_2.Types.ObjectId(managerId);
        dispute.rejectionReason = reason;
        dispute.managerRejectedAt = new Date();
        dispute.resolvedAt = new Date();
        dispute.approvalHistory.push(this.createApprovalHistoryEntry(managerId, 'rejected', 'payroll_manager', previousStatus, dispute.status, reason));
        const savedDispute = await dispute.save();
        return savedDispute.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
            { path: 'payslipId', select: 'payslipId payrollRunId' },
        ]);
    }
    async rejectClaimByManager(claimId, managerId, reason) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        if (claim.status !== payroll_tracking_enum_1.ClaimStatus.PENDING_MANAGER_APPROVAL) {
            throw new common_1.BadRequestException(`Cannot reject claim with status: ${claim.status}`);
        }
        const previousStatus = claim.status;
        claim.status = payroll_tracking_enum_1.ClaimStatus.REJECTED;
        claim.payrollManagerId = new mongoose_2.Types.ObjectId(managerId);
        claim.rejectionReason = reason;
        claim.managerRejectedAt = new Date();
        claim.resolvedAt = new Date();
        claim.approvalHistory.push(this.createApprovalHistoryEntry(managerId, 'rejected', 'payroll_manager', previousStatus, claim.status, reason));
        const savedClaim = await claim.save();
        return savedClaim.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollSpecialistId', select: 'employeeNumber firstName lastName' },
            { path: 'payrollManagerId', select: 'employeeNumber firstName lastName' },
        ]);
    }
    async getApprovedDisputes(filters) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { status: payroll_tracking_enum_1.DisputeStatus.APPROVED };
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
    async getApprovedClaims(filters) {
        const { page = 1, limit = 10 } = filters || {};
        const query = { status: payroll_tracking_enum_1.ClaimStatus.APPROVED };
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
    async createRefundForDispute(disputeId, financeStaffId, createRefundDto) {
        const dispute = await this.disputesModel.findOne({ disputeId });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.status !== payroll_tracking_enum_1.DisputeStatus.APPROVED) {
            throw new common_1.BadRequestException(`Cannot create refund for dispute with status: ${dispute.status}. Dispute must be approved.`);
        }
        const existingRefund = await this.refundsModel.findOne({ disputeId: dispute._id });
        if (existingRefund) {
            throw new common_1.BadRequestException('Refund already exists for this dispute');
        }
        const payslip = await this.payslipModel.findById(dispute.payslipId);
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found for this dispute');
        }
        const refundAmount = createRefundDto.amount;
        const refund = new this.refundsModel({
            disputeId: dispute._id,
            employeeId: dispute.employeeId,
            financeStaffId: new mongoose_2.Types.ObjectId(financeStaffId),
            refundDetails: {
                description: createRefundDto.description || `Refund for dispute ${dispute.disputeId}`,
                amount: refundAmount,
            },
            status: payroll_tracking_enum_1.RefundStatus.PENDING,
        });
        const savedRefund = await refund.save();
        await this.disputesModel.updateOne({ _id: dispute._id }, { financeStaffId: new mongoose_2.Types.ObjectId(financeStaffId) });
        return savedRefund.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'financeStaffId', select: 'employeeNumber firstName lastName' },
            { path: 'disputeId', select: 'disputeId description status' },
        ]);
    }
    async createRefundForClaim(claimId, financeStaffId, createRefundDto) {
        const claim = await this.claimsModel.findOne({ claimId });
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        if (claim.status !== payroll_tracking_enum_1.ClaimStatus.APPROVED) {
            throw new common_1.BadRequestException(`Cannot create refund for claim with status: ${claim.status}. Claim must be approved.`);
        }
        const existingRefund = await this.refundsModel.findOne({ claimId: claim._id });
        if (existingRefund) {
            throw new common_1.BadRequestException('Refund already exists for this claim');
        }
        const refundAmount = claim.approvedAmount || claim.amount;
        const refund = new this.refundsModel({
            claimId: claim._id,
            employeeId: claim.employeeId,
            financeStaffId: new mongoose_2.Types.ObjectId(financeStaffId),
            refundDetails: {
                description: createRefundDto.description || `Refund for claim ${claim.claimId}`,
                amount: refundAmount,
            },
            status: payroll_tracking_enum_1.RefundStatus.PENDING,
        });
        const savedRefund = await refund.save();
        await this.claimsModel.updateOne({ _id: claim._id }, { financeStaffId: new mongoose_2.Types.ObjectId(financeStaffId) });
        return savedRefund.populate([
            { path: 'employeeId', select: 'employeeNumber firstName lastName' },
            { path: 'financeStaffId', select: 'employeeNumber firstName lastName' },
            { path: 'claimId', select: 'claimId description claimType amount approvedAmount status' },
        ]);
    }
    async generateTaxReport(filters) {
        const { fromDate, toDate, year, departmentId } = filters;
        const query = {};
        const dateQuery = {};
        if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31, 23, 59, 59);
            dateQuery.$gte = startDate;
            dateQuery.$lte = endDate;
        }
        else if (fromDate || toDate) {
            if (fromDate)
                dateQuery.$gte = new Date(fromDate);
            if (toDate)
                dateQuery.$lte = new Date(toDate);
        }
        if (Object.keys(dateQuery).length > 0) {
            query.createdAt = dateQuery;
        }
        if (departmentId) {
            const employees = await this.employeeProfileModel
                .find({ primaryDepartmentId: new mongoose_2.Types.ObjectId(departmentId) })
                .select('_id')
                .lean();
            const employeeIds = employees.map(emp => emp._id);
            query.employeeId = { $in: employeeIds };
        }
        const payslips = await this.payslipModel
            .find(query)
            .populate('employeeId', 'employeeNumber firstName lastName primaryDepartmentId')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        let totalTaxAmount = 0;
        const taxBreakdown = {};
        const employeeTaxData = [];
        payslips.forEach((payslip) => {
            if (payslip.deductionsDetails?.taxes) {
                payslip.deductionsDetails.taxes.forEach((tax) => {
                    const taxAmount = (payslip.totalGrossSalary * (tax.rate || 0)) / 100;
                    totalTaxAmount += taxAmount;
                    const taxName = tax.name || 'Unknown Tax';
                    if (!taxBreakdown[taxName]) {
                        taxBreakdown[taxName] = { amount: 0, count: 0 };
                    }
                    taxBreakdown[taxName].amount += taxAmount;
                    taxBreakdown[taxName].count += 1;
                    employeeTaxData.push({
                        employee: payslip.employeeId,
                        payrollRun: payslip.payrollRunId,
                        taxName,
                        taxRate: tax.rate,
                        grossSalary: payslip.totalGrossSalary,
                        taxAmount,
                        period: payslip.payrollRunId?.payrollPeriod || payslip.createdAt,
                    });
                });
            }
        });
        return {
            reportType: 'tax',
            period: year ? `${year}` : fromDate && toDate ? `${fromDate} to ${toDate}` : 'All time',
            departmentId: departmentId || null,
            summary: {
                totalTaxAmount,
                totalEmployees: new Set(employeeTaxData.map((d) => d.employee?._id?.toString())).size,
                totalPayrollRuns: new Set(employeeTaxData.map((d) => d.payrollRun?._id?.toString())).size,
            },
            taxBreakdown: Object.entries(taxBreakdown).map(([name, data]) => ({
                taxName: name,
                totalAmount: data.amount,
                transactionCount: data.count,
            })),
            detailedData: employeeTaxData,
            generatedAt: new Date(),
        };
    }
    async generateInsuranceReport(filters) {
        const { fromDate, toDate, departmentId } = filters;
        const query = {};
        const dateQuery = {};
        if (fromDate || toDate) {
            if (fromDate)
                dateQuery.$gte = new Date(fromDate);
            if (toDate)
                dateQuery.$lte = new Date(toDate);
        }
        if (Object.keys(dateQuery).length > 0) {
            query.createdAt = dateQuery;
        }
        if (departmentId) {
            const employees = await this.employeeProfileModel
                .find({ primaryDepartmentId: new mongoose_2.Types.ObjectId(departmentId) })
                .select('_id')
                .lean();
            const employeeIds = employees.map(emp => emp._id);
            query.employeeId = { $in: employeeIds };
        }
        const payslips = await this.payslipModel
            .find(query)
            .populate('employeeId', 'employeeNumber firstName lastName primaryDepartmentId')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        let totalEmployeeContributions = 0;
        let totalEmployerContributions = 0;
        const insuranceBreakdown = {};
        const employeeInsuranceData = [];
        payslips.forEach((payslip) => {
            if (payslip.deductionsDetails?.insurances) {
                payslip.deductionsDetails.insurances.forEach((insurance) => {
                    const employeeAmount = insurance.amount || 0;
                    const employerAmount = insurance.employerRate
                        ? (payslip.totalGrossSalary * (insurance.employerRate || 0)) / 100
                        : 0;
                    totalEmployeeContributions += employeeAmount;
                    totalEmployerContributions += employerAmount;
                    const insuranceName = insurance.name || 'Unknown Insurance';
                    if (!insuranceBreakdown[insuranceName]) {
                        insuranceBreakdown[insuranceName] = { employeeAmount: 0, employerAmount: 0, count: 0 };
                    }
                    insuranceBreakdown[insuranceName].employeeAmount += employeeAmount;
                    insuranceBreakdown[insuranceName].employerAmount += employerAmount;
                    insuranceBreakdown[insuranceName].count += 1;
                    employeeInsuranceData.push({
                        employee: payslip.employeeId,
                        payrollRun: payslip.payrollRunId,
                        insuranceName,
                        employeeRate: insurance.employeeRate,
                        employerRate: insurance.employerRate,
                        grossSalary: payslip.totalGrossSalary,
                        employeeContribution: employeeAmount,
                        employerContribution: employerAmount,
                        period: payslip.payrollRunId?.payrollPeriod || payslip.createdAt,
                    });
                });
            }
        });
        return {
            reportType: 'insurance',
            period: fromDate && toDate ? `${fromDate} to ${toDate}` : 'All time',
            departmentId: departmentId || null,
            summary: {
                totalEmployeeContributions,
                totalEmployerContributions,
                totalContributions: totalEmployeeContributions + totalEmployerContributions,
                totalEmployees: new Set(employeeInsuranceData.map((d) => d.employee?._id?.toString())).size,
                totalPayrollRuns: new Set(employeeInsuranceData.map((d) => d.payrollRun?._id?.toString())).size,
            },
            insuranceBreakdown: Object.entries(insuranceBreakdown).map(([name, data]) => ({
                insuranceName: name,
                totalEmployeeContributions: data.employeeAmount,
                totalEmployerContributions: data.employerAmount,
                transactionCount: data.count,
            })),
            detailedData: employeeInsuranceData,
            generatedAt: new Date(),
        };
    }
    async generateBenefitsReport(filters) {
        const { fromDate, toDate, departmentId } = filters;
        const query = {};
        const dateQuery = {};
        if (fromDate || toDate) {
            if (fromDate)
                dateQuery.$gte = new Date(fromDate);
            if (toDate)
                dateQuery.$lte = new Date(toDate);
        }
        if (Object.keys(dateQuery).length > 0) {
            query.createdAt = dateQuery;
        }
        if (departmentId) {
            const employees = await this.employeeProfileModel
                .find({ primaryDepartmentId: new mongoose_2.Types.ObjectId(departmentId) })
                .select('_id')
                .lean();
            const employeeIds = employees.map(emp => emp._id);
            query.employeeId = { $in: employeeIds };
        }
        const payslips = await this.payslipModel
            .find(query)
            .populate('employeeId', 'employeeNumber firstName lastName primaryDepartmentId')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        let totalBenefitsAmount = 0;
        const benefitsBreakdown = {};
        const employeeBenefitsData = [];
        payslips.forEach((payslip) => {
            if (payslip.earningsDetails?.benefits) {
                payslip.earningsDetails.benefits.forEach((benefit) => {
                    const benefitAmount = benefit.amount || 0;
                    totalBenefitsAmount += benefitAmount;
                    const benefitName = benefit.name || 'Unknown Benefit';
                    if (!benefitsBreakdown[benefitName]) {
                        benefitsBreakdown[benefitName] = { amount: 0, count: 0 };
                    }
                    benefitsBreakdown[benefitName].amount += benefitAmount;
                    benefitsBreakdown[benefitName].count += 1;
                    employeeBenefitsData.push({
                        employee: payslip.employeeId,
                        payrollRun: payslip.payrollRunId,
                        benefitName,
                        benefitAmount,
                        period: payslip.payrollRunId?.payrollPeriod || payslip.createdAt,
                    });
                });
            }
        });
        return {
            reportType: 'benefits',
            period: fromDate && toDate ? `${fromDate} to ${toDate}` : 'All time',
            departmentId: departmentId || null,
            summary: {
                totalBenefitsAmount,
                totalEmployees: new Set(employeeBenefitsData.map((d) => d.employee?._id?.toString())).size,
                totalPayrollRuns: new Set(employeeBenefitsData.map((d) => d.payrollRun?._id?.toString())).size,
            },
            benefitsBreakdown: Object.entries(benefitsBreakdown).map(([name, data]) => ({
                benefitName: name,
                totalAmount: data.amount,
                transactionCount: data.count,
            })),
            detailedData: employeeBenefitsData,
            generatedAt: new Date(),
        };
    }
    async generateMonthEndSummary(month, year) {
        if (month < 1 || month > 12) {
            throw new common_1.BadRequestException('Invalid month. Must be between 1 and 12');
        }
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const payrollRuns = await this.payrollRunsModel
            .find({
            payrollPeriod: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate('payrollSpecialistId', 'employeeNumber firstName lastName')
            .populate('payrollManagerId', 'employeeNumber firstName lastName')
            .lean();
        const payslips = await this.payslipModel
            .find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate('employeeId', 'employeeNumber firstName lastName primaryDepartmentId')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .lean();
        let totalGrossSalary = 0;
        let totalDeductions = 0;
        let totalNetPay = 0;
        const departmentTotals = {};
        payslips.forEach((payslip) => {
            totalGrossSalary += payslip.totalGrossSalary || 0;
            totalDeductions += payslip.totaDeductions || 0;
            totalNetPay += payslip.netPay || 0;
            const deptId = payslip.employeeId?.primaryDepartmentId?.toString() || 'Unknown';
            if (!departmentTotals[deptId]) {
                departmentTotals[deptId] = { gross: 0, deductions: 0, net: 0, employees: new Set() };
            }
            departmentTotals[deptId].gross += payslip.totalGrossSalary || 0;
            departmentTotals[deptId].deductions += payslip.totaDeductions || 0;
            departmentTotals[deptId].net += payslip.netPay || 0;
            departmentTotals[deptId].employees.add(payslip.employeeId?._id?.toString() || '');
        });
        return {
            reportType: 'month-end-summary',
            period: { month, year },
            summary: {
                totalPayrollRuns: payrollRuns.length,
                totalEmployees: new Set(payslips.map((p) => p.employeeId?._id?.toString())).size,
                totalGrossSalary,
                totalDeductions,
                totalNetPay,
            },
            payrollRuns: payrollRuns.map((run) => ({
                runId: run.runId,
                payrollPeriod: run.payrollPeriod,
                status: run.status,
                employees: run.employees,
                totalNetPay: run.totalnetpay,
                specialist: run.payrollSpecialistId,
                manager: run.payrollManagerId,
            })),
            departmentBreakdown: Object.entries(departmentTotals).map(([deptId, data]) => ({
                departmentId: deptId,
                employeeCount: data.employees.size,
                totalGrossSalary: data.gross,
                totalDeductions: data.deductions,
                totalNetPay: data.net,
            })),
            generatedAt: new Date(),
        };
    }
    async generateYearEndSummary(year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59);
        const payrollRuns = await this.payrollRunsModel
            .find({
            payrollPeriod: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .lean();
        const payslips = await this.payslipModel
            .find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate('employeeId', 'employeeNumber firstName lastName primaryDepartmentId')
            .lean();
        const monthlyBreakdown = {};
        for (let m = 1; m <= 12; m++) {
            monthlyBreakdown[m] = { runs: 0, employees: new Set(), gross: 0, deductions: 0, net: 0 };
        }
        let totalGrossSalary = 0;
        let totalDeductions = 0;
        let totalNetPay = 0;
        payslips.forEach((payslip) => {
            const month = new Date(payslip.createdAt).getMonth() + 1;
            totalGrossSalary += payslip.totalGrossSalary || 0;
            totalDeductions += payslip.totaDeductions || 0;
            totalNetPay += payslip.netPay || 0;
            monthlyBreakdown[month].gross += payslip.totalGrossSalary || 0;
            monthlyBreakdown[month].deductions += payslip.totaDeductions || 0;
            monthlyBreakdown[month].net += payslip.netPay || 0;
            monthlyBreakdown[month].employees.add(payslip.employeeId?._id?.toString() || '');
        });
        payrollRuns.forEach((run) => {
            const month = new Date(run.payrollPeriod).getMonth() + 1;
            monthlyBreakdown[month].runs += 1;
        });
        return {
            reportType: 'year-end-summary',
            year,
            summary: {
                totalPayrollRuns: payrollRuns.length,
                totalEmployees: new Set(payslips.map((p) => p.employeeId?._id?.toString())).size,
                totalGrossSalary,
                totalDeductions,
                totalNetPay,
            },
            monthlyBreakdown: Object.entries(monthlyBreakdown).map(([month, data]) => ({
                month: parseInt(month, 10),
                payrollRuns: data.runs,
                employeeCount: data.employees.size,
                totalGrossSalary: data.gross,
                totalDeductions: data.deductions,
                totalNetPay: data.net,
            })),
            generatedAt: new Date(),
        };
    }
    async generateDepartmentPayrollReport(departmentId, filters) {
        const employees = await this.employeeProfileModel
            .find({ primaryDepartmentId: new mongoose_2.Types.ObjectId(departmentId) })
            .select('_id employeeNumber firstName lastName')
            .lean();
        if (employees.length === 0) {
            throw new common_1.NotFoundException('No employees found in this department');
        }
        const employeeIds = employees.map(emp => emp._id);
        const query = { employeeId: { $in: employeeIds } };
        const dateQuery = {};
        if (filters.fromDate || filters.toDate) {
            if (filters.fromDate)
                dateQuery.$gte = new Date(filters.fromDate);
            if (filters.toDate)
                dateQuery.$lte = new Date(filters.toDate);
            query.createdAt = dateQuery;
        }
        if (filters.payrollRunId) {
            query.payrollRunId = new mongoose_2.Types.ObjectId(filters.payrollRunId);
        }
        const payslips = await this.payslipModel
            .find(query)
            .populate('employeeId', 'employeeNumber firstName lastName primaryDepartmentId')
            .populate('payrollRunId', 'runId payrollPeriod status')
            .sort({ createdAt: -1 })
            .lean();
        let totalGrossSalary = 0;
        let totalDeductions = 0;
        let totalNetPay = 0;
        const employeeBreakdown = {};
        payslips.forEach((payslip) => {
            const empId = payslip.employeeId?._id?.toString() || '';
            totalGrossSalary += payslip.totalGrossSalary || 0;
            totalDeductions += payslip.totaDeductions || 0;
            totalNetPay += payslip.netPay || 0;
            if (!employeeBreakdown[empId]) {
                employeeBreakdown[empId] = { gross: 0, deductions: 0, net: 0, payslipCount: 0 };
            }
            employeeBreakdown[empId].gross += payslip.totalGrossSalary || 0;
            employeeBreakdown[empId].deductions += payslip.totaDeductions || 0;
            employeeBreakdown[empId].net += payslip.netPay || 0;
            employeeBreakdown[empId].payslipCount += 1;
        });
        return {
            reportType: 'department-payroll',
            departmentId,
            period: filters.fromDate && filters.toDate ? `${filters.fromDate} to ${filters.toDate}` : 'All time',
            summary: {
                totalEmployees: employees.length,
                employeesWithPayslips: Object.keys(employeeBreakdown).length,
                totalPayslips: payslips.length,
                totalGrossSalary,
                totalDeductions,
                totalNetPay,
            },
            employeeBreakdown: Object.entries(employeeBreakdown).map(([empId, data]) => {
                const employee = employees.find(emp => emp._id.toString() === empId);
                return {
                    employee: employee ? {
                        employeeNumber: employee.employeeNumber,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                    } : null,
                    payslipCount: data.payslipCount,
                    totalGrossSalary: data.gross,
                    totalDeductions: data.deductions,
                    totalNetPay: data.net,
                };
            }),
            detailedPayslips: payslips.map((payslip) => ({
                payslipId: payslip._id,
                employee: payslip.employeeId,
                payrollRun: payslip.payrollRunId,
                grossSalary: payslip.totalGrossSalary,
                deductions: payslip.totaDeductions,
                netPay: payslip.netPay,
                paymentStatus: payslip.paymentStatus,
                period: payslip.payrollRunId?.payrollPeriod || payslip.createdAt,
            })),
            generatedAt: new Date(),
        };
    }
};
exports.PayrollTrackingService = PayrollTrackingService;
exports.PayrollTrackingService = PayrollTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payslip_schema_1.paySlip.name)),
    __param(1, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __param(2, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(3, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(4, (0, mongoose_1.InjectModel)(disputes_schema_1.disputes.name)),
    __param(5, (0, mongoose_1.InjectModel)(claims_schema_1.claims.name)),
    __param(6, (0, mongoose_1.InjectModel)(refunds_schema_1.refunds.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollTrackingService);
//# sourceMappingURL=payroll-tracking.service.js.map