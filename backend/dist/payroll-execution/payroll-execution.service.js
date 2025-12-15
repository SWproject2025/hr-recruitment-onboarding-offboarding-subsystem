"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExecutionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const EmployeeSigningBonus_schema_1 = require("./models/EmployeeSigningBonus.schema");
const EmployeeTerminationResignation_schema_1 = require("./models/EmployeeTerminationResignation.schema");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
const employeePayrollDetails_schema_1 = require("./models/employeePayrollDetails.schema");
const employeePenalties_schema_1 = require("./models/employeePenalties.schema");
const payslip_schema_1 = require("./models/payslip.schema");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
const calc_draft_service_1 = require("./calc-draft/calc-draft.service");
let PayrollExecutionService = class PayrollExecutionService {
    employeeSigningBonusModel;
    terminationAndResignationBenefitsModel;
    payrollRunsModel;
    employeePayrollDetailsModel;
    employeePenaltiesModel;
    payslipModel;
    employeeModel;
    calcDraftService;
    constructor(employeeSigningBonusModel, terminationAndResignationBenefitsModel, payrollRunsModel, employeePayrollDetailsModel, employeePenaltiesModel, payslipModel, employeeModel, calcDraftService) {
        this.employeeSigningBonusModel = employeeSigningBonusModel;
        this.terminationAndResignationBenefitsModel = terminationAndResignationBenefitsModel;
        this.payrollRunsModel = payrollRunsModel;
        this.employeePayrollDetailsModel = employeePayrollDetailsModel;
        this.employeePenaltiesModel = employeePenaltiesModel;
        this.payslipModel = payslipModel;
        this.employeeModel = employeeModel;
        this.calcDraftService = calcDraftService;
    }
    async getPendingSigningBonuses() {
        console.log('🔍 Model name:', this.employeeSigningBonusModel.modelName);
        console.log('🔍 Collection name:', this.employeeSigningBonusModel.collection.name);
        console.log('🔍 Status enum value:', payroll_execution_enum_1.BonusStatus.PENDING);
        const allDocs = await this.employeeSigningBonusModel.find({}).exec();
        console.log('🔍 Total docs in collection:', allDocs.length);
        console.log('🔍 Sample doc:', allDocs[0]);
        const results = await this.employeeSigningBonusModel
            .find({ status: payroll_execution_enum_1.BonusStatus.PENDING })
            .populate('employeeId', 'firstName lastName email')
            .populate('signingBonusId')
            .sort({ createdAt: -1 })
            .exec();
        console.log('🔍 Results with PENDING status:', results.length);
        return results;
    }
    async getSigningBonusById(id) {
        const signingBonus = await this.employeeSigningBonusModel
            .findById(id)
            .populate('employeeId', 'firstName lastName email')
            .populate('signingBonusId')
            .exec();
        if (!signingBonus) {
            throw new common_1.NotFoundException(`Signing bonus with ID ${id} not found`);
        }
        return signingBonus;
    }
    async approveSigningBonus(id) {
        const signingBonus = await this.employeeSigningBonusModel.findById(id);
        if (!signingBonus) {
            throw new common_1.NotFoundException(`Signing bonus with ID ${id} not found`);
        }
        if (signingBonus.status !== payroll_execution_enum_1.BonusStatus.PENDING) {
            throw new common_1.BadRequestException(`Signing bonus is already ${signingBonus.status}. Cannot approve.`);
        }
        signingBonus.status = payroll_execution_enum_1.BonusStatus.APPROVED;
        return await signingBonus.save();
    }
    async getAllPayrollRuns(filters) {
        const query = {};
        if (filters?.status)
            query.status = filters.status;
        if (filters?.entity)
            query.entity = filters.entity;
        if (filters?.startDate || filters?.endDate) {
            query.payrollPeriod = {};
            if (filters.startDate)
                query.payrollPeriod.$gte = new Date(filters.startDate);
            if (filters.endDate)
                query.payrollPeriod.$lte = new Date(filters.endDate);
        }
        return await this.payrollRunsModel
            .find(query)
            .populate('payrollSpecialistId', 'firstName lastName email')
            .populate('payrollManagerId', 'firstName lastName email')
            .populate('financeStaffId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async rejectSigningBonus(id) {
        const signingBonus = await this.employeeSigningBonusModel.findById(id);
        if (!signingBonus) {
            throw new common_1.NotFoundException(`Signing bonus with ID ${id} not found`);
        }
        if (signingBonus.status !== payroll_execution_enum_1.BonusStatus.PENDING) {
            throw new common_1.BadRequestException(`Signing bonus is already ${signingBonus.status}. Cannot reject.`);
        }
        signingBonus.status = payroll_execution_enum_1.BonusStatus.REJECTED;
        return await signingBonus.save();
    }
    async getAllPayslips(runId, employeeName, department) {
        const query = {};
        if (runId) {
            const runObjectId = await this._resolveRunObjectId(runId);
            query.payrollRunId = runObjectId;
        }
        let payslips = await this.payslipModel
            .find(query)
            .populate('employeeId', 'firstName lastName email code department')
            .populate('payrollRunId')
            .exec();
        if (employeeName) {
            payslips = payslips.filter((p) => {
                const emp = p.employeeId;
                if (!emp)
                    return false;
                const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
                return fullName.includes(employeeName.toLowerCase());
            });
        }
        if (department) {
            payslips = payslips.filter((p) => {
                const emp = p.employeeId;
                return emp && emp.department === department;
            });
        }
        return payslips.map((payslip) => {
            const emp = payslip.employeeId;
            const run = payslip.payrollRunId;
            const allowancesTotal = Array.isArray(payslip.earningsDetails?.allowances)
                ? payslip.earningsDetails.allowances.reduce((sum, a) => sum + (a.amount || 0), 0)
                : 0;
            const bonusesTotal = Array.isArray(payslip.earningsDetails?.bonuses)
                ? payslip.earningsDetails.bonuses.reduce((sum, b) => sum + (b.givenAmount || 0), 0)
                : 0;
            const benefitsTotal = Array.isArray(payslip.earningsDetails?.benefits)
                ? payslip.earningsDetails.benefits.reduce((sum, b) => sum + (b.givenAmount || 0), 0)
                : 0;
            const refundsTotal = Array.isArray(payslip.earningsDetails?.refunds)
                ? payslip.earningsDetails.refunds.reduce((sum, r) => sum + (r.amount || 0), 0)
                : 0;
            const taxesTotal = Array.isArray(payslip.deductionsDetails?.taxes)
                ? payslip.deductionsDetails.taxes.reduce((sum, t) => sum + (t.amount || 0), 0)
                : 0;
            const insuranceTotal = Array.isArray(payslip.deductionsDetails?.insurances)
                ? payslip.deductionsDetails.insurances.reduce((sum, i) => sum + (i.amount || 0), 0)
                : 0;
            let penaltiesTotal = 0;
            if (payslip.deductionsDetails?.penalties) {
                const penalties = payslip.deductionsDetails.penalties;
                if (Array.isArray(penalties.penalties)) {
                    penaltiesTotal = penalties.penalties.reduce((sum, p) => sum + (p.amount || 0), 0);
                }
            }
            return {
                _id: payslip._id,
                employeeId: emp?._id,
                employeeName: emp
                    ? `${emp.firstName || ''} ${emp.lastName || ''}`.trim()
                    : 'Unknown',
                employeeCode: emp?.code || emp?._id || 'N/A',
                department: emp?.department || 'N/A',
                runPeriod: run?.payrollPeriod || new Date(),
                grossSalary: payslip.totalGrossSalary || 0,
                deductions: payslip.totaDeductions || 0,
                netPay: payslip.netPay || 0,
                status: payslip.paymentStatus || 'pending',
                earnings: {
                    baseSalary: payslip.earningsDetails?.baseSalary || 0,
                    allowances: allowancesTotal,
                    bonuses: bonusesTotal,
                    benefits: benefitsTotal,
                    refunds: refundsTotal,
                },
                deductionsBreakdown: {
                    taxes: taxesTotal,
                    insurance: insuranceTotal,
                    penalties: penaltiesTotal,
                },
            };
        });
    }
    async getPayslipById(id) {
        const payslip = await this.payslipModel
            .findById(id)
            .populate('employeeId')
            .populate('payrollRunId')
            .exec();
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        return payslip;
    }
    async editSigningBonus(id, givenAmount, paymentDate) {
        const signingBonus = await this.employeeSigningBonusModel.findById(id);
        if (!signingBonus) {
            throw new common_1.NotFoundException(`Signing bonus with ID ${id} not found`);
        }
        if (signingBonus.status === payroll_execution_enum_1.BonusStatus.PAID) {
            throw new common_1.BadRequestException('Cannot edit a paid signing bonus');
        }
        signingBonus.givenAmount = givenAmount;
        if (paymentDate) {
            signingBonus.paymentDate = paymentDate;
        }
        return await signingBonus.save();
    }
    async getPendingBenefits() {
        return await this.terminationAndResignationBenefitsModel
            .find({ status: payroll_execution_enum_1.BenefitStatus.PENDING })
            .populate('employeeId', 'firstName lastName email')
            .populate('benefitId')
            .populate('terminationId')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getBenefitById(id) {
        const benefit = await this.terminationAndResignationBenefitsModel
            .findById(id)
            .populate('employeeId', 'firstName lastName email')
            .populate('benefitId')
            .populate('terminationId')
            .exec();
        if (!benefit) {
            throw new common_1.NotFoundException(`Benefit with ID ${id} not found`);
        }
        return benefit;
    }
    async approveBenefit(id) {
        const benefit = await this.terminationAndResignationBenefitsModel.findById(id);
        if (!benefit) {
            throw new common_1.NotFoundException(`Benefit with ID ${id} not found`);
        }
        if (benefit.status !== payroll_execution_enum_1.BenefitStatus.PENDING) {
            throw new common_1.BadRequestException(`Benefit is already ${benefit.status}. Cannot approve.`);
        }
        benefit.status = payroll_execution_enum_1.BenefitStatus.APPROVED;
        return await benefit.save();
    }
    async rejectBenefit(id) {
        const benefit = await this.terminationAndResignationBenefitsModel.findById(id);
        if (!benefit) {
            throw new common_1.NotFoundException(`Benefit with ID ${id} not found`);
        }
        if (benefit.status !== payroll_execution_enum_1.BenefitStatus.PENDING) {
            throw new common_1.BadRequestException(`Benefit is already ${benefit.status}. Cannot reject.`);
        }
        benefit.status = payroll_execution_enum_1.BenefitStatus.REJECTED;
        return await benefit.save();
    }
    async editBenefit(id, givenAmount) {
        const benefit = await this.terminationAndResignationBenefitsModel.findById(id);
        if (!benefit) {
            throw new common_1.NotFoundException(`Benefit with ID ${id} not found`);
        }
        if (benefit.status === payroll_execution_enum_1.BenefitStatus.PAID) {
            throw new common_1.BadRequestException('Cannot edit a paid benefit');
        }
        benefit.givenAmount = givenAmount;
        return await benefit.save();
    }
    async getSuggestedPayrollPeriod() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const endOfMonth = new Date(year, month + 1, 0);
        return {
            payrollPeriod: endOfMonth.toISOString(),
        };
    }
    async validatePayrollPeriod(payrollPeriod) {
        const errors = [];
        const warnings = [];
        const periodDate = new Date(payrollPeriod);
        const now = new Date();
        if (periodDate < now) {
            warnings.push('Payroll period is in the past');
        }
        const overlappingRun = await this.payrollRunsModel.findOne({
            payrollPeriod: periodDate,
            status: { $nin: [payroll_execution_enum_1.PayRollStatus.REJECTED] },
        });
        if (overlappingRun) {
            errors.push('A payroll run already exists for this period');
        }
        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
            warnings: warnings.length > 0 ? warnings : undefined,
        };
    }
    async getPayrollRunById(id) {
        const payrollRun = await this.payrollRunsModel
            .findById(id)
            .populate('payrollSpecialistId', 'firstName lastName email')
            .populate('payrollManagerId', 'firstName lastName email')
            .populate('financeStaffId', 'firstName lastName email')
            .exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException(`Payroll run with ID ${id} not found`);
        }
        return payrollRun;
    }
    async approvePayrollPeriod(id, payrollManagerId) {
        const payrollRun = await this.payrollRunsModel.findById(id).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException(`Payroll run with ID ${id} not found`);
        }
        const validation = await this.validatePayrollPeriod(payrollRun.payrollPeriod);
        if (!validation.isValid) {
            throw new common_1.BadRequestException({
                message: 'Invalid payroll period',
                errors: validation.errors,
            });
        }
        const preRunCheck = await this.checkPreRunApprovalsComplete();
        if (!preRunCheck.allApprovalsComplete) {
            throw new common_1.BadRequestException({
                message: 'Cannot approve payroll. Pending pre-run approvals.',
                details: preRunCheck,
            });
        }
        payrollRun.payrollManagerId = payrollManagerId;
        payrollRun.managerApprovalDate = new Date();
        await payrollRun.save();
        return payrollRun;
    }
    async rejectPayrollPeriod(id, rejectionReason) {
        const payrollRun = await this.payrollRunsModel.findById(id).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException(`Payroll run with ID ${id} not found`);
        }
        payrollRun.status = payroll_execution_enum_1.PayRollStatus.REJECTED;
        payrollRun.rejectionReason = rejectionReason;
        await payrollRun.save();
        return {
            message: 'Payroll period rejected. Please edit the period and restart.',
            payrollRun,
        };
    }
    async editPayrollPeriod(id, newPayrollPeriod) {
        const payrollRun = await this.payrollRunsModel.findById(id).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException(`Payroll run with ID ${id} not found`);
        }
        if (payrollRun.status === payroll_execution_enum_1.PayRollStatus.LOCKED) {
            throw new common_1.BadRequestException('Cannot edit a locked payroll run');
        }
        const validation = await this.validatePayrollPeriod(newPayrollPeriod);
        if (!validation.isValid) {
            throw new common_1.BadRequestException({
                message: 'Invalid payroll period',
                errors: validation.errors,
            });
        }
        payrollRun.payrollPeriod = newPayrollPeriod;
        payrollRun.status = payroll_execution_enum_1.PayRollStatus.DRAFT;
        return await payrollRun.save();
    }
    async startPayrollInitiation(runId, payrollPeriod, payrollSpecialistId, entity) {
        try {
            console.log('🚀 Starting payroll initiation...', { runId, payrollPeriod, entity });
            const preRunCheck = await this.checkPreRunApprovalsComplete();
            console.log('✅ Pre-run check:', preRunCheck);
            if (!preRunCheck.allApprovalsComplete) {
                throw new common_1.BadRequestException({
                    message: 'Cannot start payroll. Pending pre-run approvals.',
                    details: preRunCheck,
                });
            }
            const validation = await this.validatePayrollPeriod(payrollPeriod);
            console.log('✅ Period validation:', validation);
            if (!validation.isValid) {
                throw new common_1.BadRequestException({
                    message: 'Invalid payroll period',
                    errors: validation.errors,
                });
            }
            console.log('📝 Creating payroll run...');
            const payrollRun = new this.payrollRunsModel({
                runId,
                payrollPeriod,
                status: payroll_execution_enum_1.PayRollStatus.DRAFT,
                entity,
                employees: 0,
                exceptions: 0,
                totalnetpay: 0,
                payrollSpecialistId,
                paymentStatus: payroll_execution_enum_1.PaySlipPaymentStatus.PENDING,
            });
            await payrollRun.save();
            console.log('✅ Payroll run created:', payrollRun._id);
            console.log('👥 Fetching active employees...');
            const employees = await this.employeeModel
                .find({ status: employee_profile_enums_1.EmployeeStatus.ACTIVE })
                .lean()
                .exec();
            console.log(`✅ Found ${employees.length} active employees`);
            if (!employees || employees.length === 0) {
                throw new common_1.BadRequestException('No active employees found');
            }
            console.log('⚙️ Processing draft generation...');
            const runObjectId = new mongoose_2.default.Types.ObjectId(payrollRun._id);
            const result = await this.calcDraftService.processDraftGeneration(runObjectId, employees);
            console.log('✅ Draft generation complete:', {
                employees: result.run.employees,
                exceptions: result.exceptionsCount,
                totalNetPay: result.run.totalnetpay
            });
            return await this.payrollRunsModel.findById(payrollRun._id).exec();
        }
        catch (error) {
            console.error('❌ Error in startPayrollInitiation:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Failed to create payroll run',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }
    async checkPreRunApprovalsComplete() {
        const pendingBonuses = await this.employeeSigningBonusModel.countDocuments({
            status: payroll_execution_enum_1.BonusStatus.PENDING,
        });
        const pendingBenefits = await this.terminationAndResignationBenefitsModel.countDocuments({
            status: payroll_execution_enum_1.BenefitStatus.PENDING,
        });
        const blockers = [];
        if (pendingBonuses > 0) {
            blockers.push(`${pendingBonuses} signing bonus(es) pending approval`);
        }
        if (pendingBenefits > 0) {
            blockers.push(`${pendingBenefits} termination/resignation benefit(s) pending approval`);
        }
        return {
            allApprovalsComplete: blockers.length === 0,
            pendingSigningBonuses: pendingBonuses,
            pendingBenefits: pendingBenefits,
            blockers: blockers.length > 0 ? blockers : undefined,
        };
    }
    async publishDraftForApproval(runId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        if (run.status === payroll_execution_enum_1.PayRollStatus.APPROVED) {
            throw new common_1.BadRequestException('Cannot publish a run that is already approved');
        }
        run.status = payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW;
        if (run) {
            await run.save();
        }
        else {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        return run;
    }
    async approveByPayrollManager(runId, approverId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        if (run.status === payroll_execution_enum_1.PayRollStatus.REJECTED) {
            throw new common_1.BadRequestException('Cannot approve a rejected payroll run');
        }
        run.managerApprovalDate = new Date();
        run.status = payroll_execution_enum_1.PayRollStatus.PENDING_FINANCE_APPROVAL;
        if (approverId)
            run.payrollManagerId = approverId;
        await run.save();
        return {
            message: 'Payroll manager approved',
            runId: run.runId,
            managerApprovalDate: run.managerApprovalDate,
        };
    }
    async rejectByPayrollManager(runId, reason, approverId) {
        if (!reason)
            throw new common_1.BadRequestException('Rejection reason is required');
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        run.rejectionReason = `Manager: ${reason}`;
        run.managerApprovalDate = undefined;
        run.status = payroll_execution_enum_1.PayRollStatus.REJECTED;
        if (approverId)
            run.payrollManagerId = approverId;
        await run.save();
        return { message: 'Payroll manager rejected', runId: run.runId, reason };
    }
    async approveByFinanceStaff(runId, approverId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        if (!run.managerApprovalDate) {
            throw new common_1.BadRequestException('Cannot approve before Payroll Manager approval');
        }
        run.financeApprovalDate = new Date();
        run.status = payroll_execution_enum_1.PayRollStatus.APPROVED;
        if (approverId)
            run.financeStaffId = approverId;
        run.paymentStatus = payroll_execution_enum_1.PaySlipPaymentStatus.PENDING;
        await run.save();
        return {
            message: 'Finance approved',
            runId: run.runId,
            financeApprovalDate: run.financeApprovalDate,
        };
    }
    async rejectByFinanceStaff(runId, reason, approverId) {
        if (!reason)
            throw new common_1.BadRequestException('Rejection reason is required');
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        run.rejectionReason = `Finance: ${reason}`;
        run.financeApprovalDate = undefined;
        run.status = payroll_execution_enum_1.PayRollStatus.REJECTED;
        if (approverId)
            run.financeStaffId = approverId;
        await run.save();
        return { message: 'Payroll rejected by finance', runId: run.runId, reason };
    }
    async freezePayroll(runId, reason) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        run.status = payroll_execution_enum_1.PayRollStatus.LOCKED;
        if (reason)
            run.rejectionReason = `Locked: ${reason}`;
        await run.save();
        return { message: 'Payroll run locked', runId: run.runId };
    }
    async unfreezePayroll(runId, unlockReason) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        run.status = payroll_execution_enum_1.PayRollStatus.UNLOCKED;
        if (unlockReason)
            run.unlockReason = unlockReason;
        await run.save();
        return { message: 'Payroll run unlocked', runId: run.runId };
    }
    async getApprovalsByRunId(runId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId).exec();
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        return {
            runId: run.runId,
            status: run.status,
            managerApprovalDate: run.managerApprovalDate,
            financeApprovalDate: run.financeApprovalDate,
            rejectionReason: run.rejectionReason,
            unlockReason: run.unlockReason,
            payrollManagerId: run.payrollManagerId,
            financeStaffId: run.financeStaffId,
        };
    }
    async createPayrollAdjustment(runId, employeeId, type, amount, reason) {
        if (!amount || isNaN(amount))
            throw new common_1.BadRequestException('Amount must be a valid number');
        const runObjectId = await this._resolveRunObjectId(runId);
        const details = await this.employeePayrollDetailsModel.findOne({
            payrollRunId: runObjectId,
            employeeId: new mongoose_2.default.Types.ObjectId(employeeId),
        });
        if (!details)
            throw new common_1.NotFoundException('Employee payroll details not found for this run');
        switch (type) {
            case 'bonus':
                details.bonus = (details.bonus ?? 0) + amount;
                details.netPay = (details.netPay ?? 0) + amount;
                break;
            case 'benefit':
                details.benefit = (details.benefit ?? 0) + amount;
                details.netPay = (details.netPay ?? 0) + amount;
                break;
            case 'deduction':
                details.deductions = (details.deductions ?? 0) + amount;
                details.netPay = (details.netPay ?? 0) - amount;
                break;
            default:
                throw new common_1.BadRequestException('Unsupported adjustment type');
        }
        if (reason) {
            details.exceptions = details.exceptions
                ? `${details.exceptions}; ${reason}`
                : reason;
        }
        await details.save();
        return details;
    }
    async resolveException(runId, employeeId, resolutionNote) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const details = await this.employeePayrollDetailsModel.findOne({
            payrollRunId: runObjectId,
            employeeId: new mongoose_2.default.Types.ObjectId(employeeId),
        });
        if (!details)
            throw new common_1.NotFoundException('Employee payroll details not found for this run');
        if (!details.exceptions) {
            return { message: 'No exception to resolve' };
        }
        details.exceptions = resolutionNote
            ? `${details.exceptions} -- RESOLVED: ${resolutionNote}`
            : undefined;
        await details.save();
        return { message: 'Exception resolved', employeeId, runId };
    }
    async generatePayslips(runId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        const detailsList = await this.employeePayrollDetailsModel.find({
            payrollRunId: runObjectId,
        });
        if (!detailsList || detailsList.length === 0) {
            throw new common_1.BadRequestException('No employee payroll details found for this run');
        }
        const created = [];
        for (const d of detailsList) {
            const penaltiesDoc = await this.employeePenaltiesModel.findOne({
                employeeId: d.employeeId,
            });
            const payslipDoc = {
                employeeId: d.employeeId,
                payrollRunId: runObjectId,
                earningsDetails: {
                    baseSalary: d.baseSalary ?? 0,
                    allowances: [],
                    bonuses: d.bonus ? [{ givenAmount: d.bonus }] : [],
                    benefits: d.benefit ? [{ givenAmount: d.benefit }] : [],
                    refunds: [],
                },
                deductionsDetails: {
                    taxes: [],
                    insurances: [],
                    penalties: penaltiesDoc
                        ? {
                            employeeId: penaltiesDoc.employeeId,
                            penalties: penaltiesDoc.penalties,
                        }
                        : undefined,
                },
                totalGrossSalary: (d.baseSalary ?? 0) +
                    (d.allowances ?? 0) +
                    (d.bonus ?? 0) +
                    (d.benefit ?? 0),
                totaDeductions: d.deductions ?? 0,
                netPay: d.netPay ?? 0,
                paymentStatus: payroll_execution_enum_1.PaySlipPaymentStatus.PENDING,
            };
            const createdPayslip = await this.payslipModel.create(payslipDoc);
            created.push(createdPayslip);
        }
        run.employees = detailsList.length;
        run.exceptions = detailsList.filter((x) => !!x.exceptions).length;
        run.totalnetpay = detailsList.reduce((s, x) => s + (x.netPay ?? 0), 0);
        await run.save();
        return {
            count: created.length,
            payslips: created.map((p) => ({ id: p._id, employeeId: p.employeeId })),
        };
    }
    async distributePayslips(runId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const res = await this.payslipModel.updateMany({ payrollRunId: runObjectId }, { paymentStatus: payroll_execution_enum_1.PaySlipPaymentStatus.PENDING });
        return {
            modifiedCount: res.modifiedCount ?? res.nModified ?? 0,
        };
    }
    async markPayrollAsPaid(runId) {
        const runObjectId = await this._resolveRunObjectId(runId);
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        const res = await this.payslipModel.updateMany({ payrollRunId: runObjectId }, { paymentStatus: payroll_execution_enum_1.PaySlipPaymentStatus.PAID });
        run.paymentStatus = payroll_execution_enum_1.PaySlipPaymentStatus.PAID;
        await run.save();
        return {
            modifiedCount: res.modifiedCount ?? res.nModified ?? 0,
            runPaymentStatus: run.paymentStatus,
        };
    }
    async flagPayrollExceptions(payrollRunId) {
        const runObjectId = await this._resolveRunObjectId(payrollRunId);
        const details = await this.employeePayrollDetailsModel.find({
            payrollRunId: runObjectId,
            exceptions: { $exists: true, $ne: '' },
        });
        if (!details.length) {
            return { message: 'No exceptions found', exceptions: [] };
        }
        const run = await this.payrollRunsModel.findById(runObjectId);
        if (run) {
            run.exceptions = details.length;
            await run.save();
        }
        else {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        await run.save();
        return {
            message: 'Exceptions flagged',
            totalEmployeesWithExceptions: details.length,
            exceptions: details.map((x) => ({
                employeeId: x.employeeId,
                exception: x.exceptions,
            })),
        };
    }
    async getPayrollRunExceptions(payrollRunId) {
        const runObjectId = await this._resolveRunObjectId(payrollRunId);
        const details = await this.employeePayrollDetailsModel
            .find({
            payrollRunId: runObjectId,
            exceptions: { $exists: true, $ne: '' },
        })
            .populate('employeeId', 'firstName lastName email');
        return {
            runId: payrollRunId,
            count: details.length,
            exceptions: details.map((d) => ({
                employee: d.employeeId,
                exception: d.exceptions,
            })),
        };
    }
    async reviewPayrollDraft(payrollRunId) {
        const runObjectId = await this._resolveRunObjectId(payrollRunId);
        const run = await this.payrollRunsModel
            .findById(runObjectId)
            .populate('payrollSpecialistId', 'firstName lastName email');
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        const details = await this.employeePayrollDetailsModel.find({
            payrollRunId: runObjectId,
        });
        return {
            run,
            summary: {
                employees: run.employees,
                exceptions: run.exceptions,
                totalNetPay: run.totalnetpay,
            },
            employees: details,
        };
    }
    async getPayrollForManagerReview(payrollRunId) {
        const runObjectId = await this._resolveRunObjectId(payrollRunId);
        const run = await this.payrollRunsModel
            .findById(runObjectId)
            .populate('payrollSpecialistId', 'firstName lastName email')
            .populate('payrollManagerId', 'firstName lastName email');
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        const details = await this.employeePayrollDetailsModel.find({
            payrollRunId: runObjectId,
        });
        return {
            runId: run.runId,
            reviewerRole: 'PAYROLL_MANAGER',
            managerApprovalDate: run.managerApprovalDate,
            financeApprovalDate: run.financeApprovalDate,
            status: run.status,
            rejectionReason: run.rejectionReason,
            summary: {
                employees: run.employees,
                exceptions: run.exceptions,
                totalNetPay: run.totalnetpay,
            },
            employees: details,
        };
    }
    async getPayrollForFinanceReview(payrollRunId) {
        const runObjectId = await this._resolveRunObjectId(payrollRunId);
        const run = await this.payrollRunsModel
            .findById(runObjectId)
            .populate('payrollSpecialistId', 'firstName lastName email')
            .populate('financeStaffId', 'firstName lastName email')
            .populate('payrollManagerId', 'firstName lastName email');
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        if (!run.managerApprovalDate) {
            throw new common_1.BadRequestException('Payroll cannot be reviewed by finance before manager approval');
        }
        const details = await this.employeePayrollDetailsModel.find({
            payrollRunId: runObjectId,
        });
        return {
            runId: run.runId,
            reviewerRole: 'FINANCE_STAFF',
            managerApprovalDate: run.managerApprovalDate,
            financeApprovalDate: run.financeApprovalDate,
            status: run.status,
            rejectionReason: run.rejectionReason,
            summary: {
                employees: run.employees,
                exceptions: run.exceptions,
                totalNetPay: run.totalnetpay,
            },
            employees: details,
        };
    }
    async _resolveRunObjectId(runIdOrId) {
        if (mongoose_2.default.Types.ObjectId.isValid(runIdOrId)) {
            return new mongoose_2.default.Types.ObjectId(runIdOrId);
        }
        const run = await this.payrollRunsModel.findOne({ runId: runIdOrId });
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        return run._id;
    }
};
exports.PayrollExecutionService = PayrollExecutionService;
exports.PayrollExecutionService = PayrollExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(EmployeeSigningBonus_schema_1.employeeSigningBonus.name)),
    __param(1, (0, mongoose_1.InjectModel)(EmployeeTerminationResignation_schema_1.EmployeeTerminationResignation.name)),
    __param(2, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(3, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __param(4, (0, mongoose_1.InjectModel)(employeePenalties_schema_1.employeePenalties.name)),
    __param(5, (0, mongoose_1.InjectModel)(payslip_schema_1.paySlip.name)),
    __param(6, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        calc_draft_service_1.CalcDraftService])
], PayrollExecutionService);
//# sourceMappingURL=payroll-execution.service.js.map