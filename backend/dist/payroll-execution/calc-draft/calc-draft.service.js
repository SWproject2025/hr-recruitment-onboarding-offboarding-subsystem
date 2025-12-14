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
exports.CalcDraftService = void 0;
const common_1 = require("@nestjs/common");
const payrollRuns_schema_1 = require("../models/payrollRuns.schema");
const employeePayrollDetails_schema_1 = require("../models/employeePayrollDetails.schema");
const employeePenalties_schema_1 = require("../models/employeePenalties.schema");
const payslip_schema_1 = require("../models/payslip.schema");
const EmployeeSigningBonus_schema_1 = require("../models/EmployeeSigningBonus.schema");
const EmployeeTerminationResignation_schema_1 = require("../models/EmployeeTerminationResignation.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_execution_enum_1 = require("../enums/payroll-execution-enum");
let CalcDraftService = class CalcDraftService {
    employeeSigningBonusModel;
    payrollRunsModel;
    employeePayrollDetailsModel;
    employeePenaltiesModel;
    paySlipModel;
    employeeTerminationResignationModel;
    constructor(employeeSigningBonusModel, payrollRunsModel, employeePayrollDetailsModel, employeePenaltiesModel, paySlipModel, employeeTerminationResignationModel) {
        this.employeeSigningBonusModel = employeeSigningBonusModel;
        this.payrollRunsModel = payrollRunsModel;
        this.employeePayrollDetailsModel = employeePayrollDetailsModel;
        this.employeePenaltiesModel = employeePenaltiesModel;
        this.paySlipModel = paySlipModel;
        this.employeeTerminationResignationModel = employeeTerminationResignationModel;
    }
    async createPayrollRun(createCalcDraftDto) {
        const runId = `PR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newPayrollRun = new this.payrollRunsModel({
            ...createCalcDraftDto,
            runId,
            status: payroll_execution_enum_1.PayRollStatus.DRAFT,
            employees: 0,
            exceptions: 0,
            totalnetpay: 0,
            paymentStatus: payroll_execution_enum_1.PayRollPaymentStatus.PENDING,
        });
        return await newPayrollRun.save();
    }
    async createPayrollDetails(payrollRunId, employeeData) {
        const payrollDetails = [];
        for (const employee of employeeData) {
            const payrollDetail = await this.employeePayrollDetailsModel.create({
                payrollRunId,
                employeeId: employee._id,
                baseSalary: employee.baseSalary || 0,
                allowances: 0,
                deductions: 0,
                netSalary: 0,
                netPay: 0,
                bankStatus: payroll_execution_enum_1.BankStatus.VALID,
                bonus: 0,
                benefit: 0,
            });
            payrollDetails.push(payrollDetail);
        }
        return payrollDetails;
    }
    async calculateGrossSalary(employee) {
        const baseSalary = employee.baseSalary || 0;
        const housingAllowance = employee.housingAllowance || 0;
        const transportationAllowance = employee.transportationAllowance || 0;
        const otherAllowances = employee.otherAllowances || 0;
        const pendingBonuses = await this.employeeSigningBonusModel.find({
            employeeId: employee._id,
            status: payroll_execution_enum_1.BonusStatus.APPROVED
        });
        const signingBonus = pendingBonuses.reduce((sum, bonus) => sum + bonus.givenAmount, 0);
        const pendingBenefits = await this.employeeTerminationResignationModel.find({
            employeeId: employee._id,
            status: payroll_execution_enum_1.BenefitStatus.APPROVED
        });
        const terminationBenefit = pendingBenefits.reduce((sum, benefit) => sum + benefit.givenAmount, 0);
        const leaveCompensation = employee.leaveCompensation || 0;
        const grossSalary = baseSalary +
            housingAllowance +
            transportationAllowance +
            otherAllowances +
            signingBonus +
            terminationBenefit +
            leaveCompensation;
        if (grossSalary < 0) {
            throw new Error(`Invalid gross salary calculation for employee ${employee.name}: ${employee.code}`);
        }
        return grossSalary;
    }
    async applyTaxDeductions(employee, grossSalary) {
        const taxBrackets = [
            { min: 0, max: 1250, rate: 0 },
            { min: 1251, max: 2500, rate: 0.025 },
            { min: 2501, max: 3750, rate: 0.1 },
            { min: 3751, max: 5000, rate: 0.15 },
            { min: 5001, max: 16667, rate: 0.2 },
            { min: 16668, max: 33333, rate: 0.225 },
            { min: 33334, max: Infinity, rate: 0.25 }
        ];
        const monthlySalary = grossSalary;
        let remainingIncome = monthlySalary;
        let tax = 0;
        if (monthlySalary <= 1250)
            return 0;
        for (const bracket of taxBrackets) {
            if (remainingIncome <= 0)
                break;
            const taxableAmountInBracket = Math.min(remainingIncome, Math.max(0, bracket.max - bracket.min + 1));
            if (taxableAmountInBracket > 0) {
                tax += taxableAmountInBracket * bracket.rate;
                remainingIncome -= taxableAmountInBracket;
            }
        }
        return Number(tax.toFixed(2));
    }
    async applyInsuranceDeduction(employee) {
        const baseSalary = employee.baseSalary || 0;
        const maxInsuranceCap = 14700;
        const insuranceAmount = Math.min(baseSalary, maxInsuranceCap);
        const employeeInsurance = insuranceAmount * 0.115;
        return Number(employeeInsurance.toFixed(2));
    }
    async applyPenalties(employee) {
        const employeePenaltiesRecord = await this.employeePenaltiesModel.findOne({
            employeeId: employee._id
        });
        if (!employeePenaltiesRecord || !employeePenaltiesRecord.penalties) {
            return { totalPenalties: 0, penalties: [] };
        }
        const totalPenalties = employeePenaltiesRecord.penalties.reduce((sum, penalty) => sum + penalty.amount, 0);
        return {
            totalPenalties: Number(totalPenalties.toFixed(2)),
            penalties: employeePenaltiesRecord.penalties
        };
    }
    async calculateNetSalary(employee) {
        try {
            const grossSalary = await this.calculateGrossSalary(employee);
            const taxDeduction = await this.applyTaxDeductions(employee, grossSalary);
            const insuranceDeduction = await this.applyInsuranceDeduction(employee);
            const penaltiesData = await this.applyPenalties(employee);
            const housingAllowance = employee.housingAllowance || 0;
            const transportationAllowance = employee.transportationAllowance || 0;
            const otherAllowances = employee.otherAllowances || 0;
            const allowances = housingAllowance + transportationAllowance + otherAllowances;
            const pendingBonuses = await this.employeeSigningBonusModel.find({
                employeeId: employee._id,
                status: payroll_execution_enum_1.BonusStatus.APPROVED
            });
            const bonus = pendingBonuses.reduce((sum, bonus) => sum + bonus.givenAmount, 0);
            const pendingBenefits = await this.employeeTerminationResignationModel.find({
                employeeId: employee._id,
                status: payroll_execution_enum_1.BenefitStatus.APPROVED
            });
            const benefit = pendingBenefits.reduce((sum, benefit) => sum + benefit.givenAmount, 0);
            const netSalary = grossSalary - taxDeduction - insuranceDeduction - penaltiesData.totalPenalties;
            if (netSalary < 0) {
                throw new Error(`Net salary cannot be negative for employee ${employee.name}`);
            }
            return {
                grossSalary: Number(grossSalary.toFixed(2)),
                taxDeduction,
                insuranceDeduction,
                penalties: penaltiesData.totalPenalties,
                netSalary: Number(netSalary.toFixed(2)),
                allowances,
                bonus,
                benefit
            };
        }
        catch (error) {
            throw new Error(`Error calculating net salary for employee ${employee.name}: ${error.message}`);
        }
    }
    async calculateFinalSalary(employee) {
        return await this.calculateNetSalary(employee);
    }
    async flagAnomalies(payrollRunId, employee) {
        const exceptions = [];
        if (!employee.bankAccountNumber || !employee.bankName) {
            exceptions.push(`MISSING_BANK_DETAILS: Employee ${employee.name} (${employee.code}) has missing or incomplete bank details`);
        }
        try {
            const salaryData = await this.calculateNetSalary(employee);
            if (salaryData.netSalary < 0) {
                exceptions.push(`NEGATIVE_NET_PAY: Employee ${employee.name} (${employee.code}) has negative net pay: ${salaryData.netSalary}`);
            }
            if (!employee.baseSalary || employee.baseSalary <= 0) {
                exceptions.push(`ZERO_BASE_SALARY: Employee ${employee.name} (${employee.code}) has zero or missing base salary`);
            }
            if (salaryData.grossSalary > 0 && salaryData.penalties > salaryData.grossSalary * 0.5) {
                exceptions.push(`EXCESSIVE_PENALTIES: Employee ${employee.name} (${employee.code}) has penalties exceeding 50% of gross salary`);
            }
        }
        catch (error) {
            exceptions.push(`CALCULATION_ERROR: Failed to calculate salary for employee ${employee.name} (${employee.code}): ${error.message}`);
        }
        return exceptions;
    }
    async getExceptionsByRun(payrollRunId) {
        return await this.employeePayrollDetailsModel.find({
            payrollRunId,
            exceptions: { $exists: true, $ne: null }
        }).exec();
    }
    async updateRunStatus(payrollRunId, status) {
        const updatedRun = await this.payrollRunsModel.findByIdAndUpdate(payrollRunId, {
            status,
            updatedAt: new Date(),
            ...(status === payroll_execution_enum_1.PayRollStatus.APPROVED && { completedAt: new Date() })
        }, { new: true });
        if (!updatedRun) {
            throw new Error(`Payroll run with ID ${payrollRunId} not found`);
        }
        return updatedRun;
    }
    async processDraftGeneration(payrollRunId, employeeData) {
        try {
            const payrollDetails = await this.createPayrollDetails(payrollRunId, employeeData);
            let totalNetPay = 0;
            let exceptionsCount = 0;
            for (const employee of employeeData) {
                const payrollDetail = payrollDetails.find(item => item.employeeId.toString() === employee._id.toString());
                if (!payrollDetail) {
                    throw new Error(`No payroll detail found for employee ${employee._id}`);
                }
                const salaryData = await this.calculateNetSalary(employee);
                const anomalies = await this.flagAnomalies(payrollRunId, employee);
                payrollDetail.baseSalary = employee.baseSalary || 0;
                payrollDetail.allowances = salaryData.allowances;
                payrollDetail.deductions = salaryData.taxDeduction + salaryData.insuranceDeduction + salaryData.penalties;
                payrollDetail.netSalary = salaryData.netSalary;
                payrollDetail.netPay = salaryData.netSalary;
                payrollDetail.bonus = salaryData.bonus;
                payrollDetail.benefit = salaryData.benefit;
                if (anomalies.length > 0) {
                    payrollDetail.bankStatus = payroll_execution_enum_1.BankStatus.MISSING;
                    payrollDetail.exceptions = anomalies.join(' | ');
                    exceptionsCount++;
                }
                else {
                    payrollDetail.bankStatus = payroll_execution_enum_1.BankStatus.VALID;
                }
                await payrollDetail.save();
                totalNetPay += salaryData.netSalary;
            }
            const updatedRun = await this.payrollRunsModel.findByIdAndUpdate(payrollRunId, {
                employees: employeeData.length,
                exceptions: exceptionsCount,
                totalnetpay: Number(totalNetPay.toFixed(2)),
                status: exceptionsCount > 0 ? payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW : payroll_execution_enum_1.PayRollStatus.PENDING_FINANCE_APPROVAL,
                updatedAt: new Date(),
            }, { new: true });
            if (!updatedRun) {
                throw new Error(`Failed to update payroll run ${payrollRunId}`);
            }
            return {
                run: updatedRun,
                payrollDetails,
                exceptionsCount
            };
        }
        catch (error) {
            await this.payrollRunsModel.findByIdAndUpdate(payrollRunId, {
                status: payroll_execution_enum_1.PayRollStatus.REJECTED,
                rejectionReason: error.message,
                updatedAt: new Date(),
            });
            throw new Error(`Failed to process draft generation: ${error.message}`);
        }
    }
    async recalculateEmployeeSalary(payrollRunId, employeeId, employeeData) {
        const payrollDetail = await this.employeePayrollDetailsModel.findOne({
            payrollRunId,
            employeeId
        });
        if (!payrollDetail) {
            throw new Error(`No payroll detail found for employee ${employeeId} in run ${payrollRunId}`);
        }
        const salaryData = await this.calculateNetSalary(employeeData);
        const exceptions = await this.flagAnomalies(payrollRunId, employeeData);
        payrollDetail.baseSalary = employeeData.baseSalary || 0;
        payrollDetail.allowances = salaryData.allowances;
        payrollDetail.deductions = salaryData.taxDeduction + salaryData.insuranceDeduction + salaryData.penalties;
        payrollDetail.netSalary = salaryData.netSalary;
        payrollDetail.netPay = salaryData.netSalary;
        payrollDetail.bonus = salaryData.bonus;
        payrollDetail.benefit = salaryData.benefit;
        if (exceptions.length > 0) {
            payrollDetail.bankStatus = payroll_execution_enum_1.BankStatus.MISSING;
            payrollDetail.exceptions = exceptions.join(' | ');
        }
        else {
            payrollDetail.bankStatus = payroll_execution_enum_1.BankStatus.VALID;
            payrollDetail.exceptions = undefined;
        }
        await payrollDetail.save();
        await this.recalculateRunTotals(payrollRunId);
        return {
            payrollDetail,
            salaryData,
            exceptions
        };
    }
    async recalculateRunTotals(payrollRunId) {
        const payrollDetails = await this.employeePayrollDetailsModel.find({ payrollRunId });
        const totalNetPay = payrollDetails.reduce((sum, item) => sum + (item.netPay || 0), 0);
        const exceptionsCount = payrollDetails.filter(item => item.exceptions).length;
        await this.payrollRunsModel.findByIdAndUpdate(payrollRunId, {
            totalnetpay: Number(totalNetPay.toFixed(2)),
            exceptions: exceptionsCount,
            updatedAt: new Date(),
        });
    }
    async generatePayslip(payrollRunId, employeeId) {
        const payrollDetail = await this.employeePayrollDetailsModel.findOne({
            payrollRunId,
            employeeId
        });
        if (!payrollDetail) {
            throw new Error(`No payroll detail found for employee ${employeeId} in run ${payrollRunId}`);
        }
        const earningsDetails = {
            baseSalary: payrollDetail.baseSalary,
            allowances: [],
            bonuses: [],
            benefits: [],
            refunds: []
        };
        const deductionsDetails = {
            taxes: [],
            insurances: [],
            penalties: null
        };
        const payslip = await this.paySlipModel.create({
            employeeId,
            payrollRunId,
            earningsDetails,
            deductionsDetails,
            totalGrossSalary: payrollDetail.baseSalary + payrollDetail.allowances,
            totaDeductions: payrollDetail.deductions,
            netPay: payrollDetail.netPay,
            paymentStatus: payroll_execution_enum_1.PaySlipPaymentStatus.PENDING
        });
        return payslip;
    }
};
exports.CalcDraftService = CalcDraftService;
exports.CalcDraftService = CalcDraftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(EmployeeSigningBonus_schema_1.employeeSigningBonus.name)),
    __param(1, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(2, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __param(3, (0, mongoose_1.InjectModel)(employeePenalties_schema_1.employeePenalties.name)),
    __param(4, (0, mongoose_1.InjectModel)(payslip_schema_1.paySlip.name)),
    __param(5, (0, mongoose_1.InjectModel)(EmployeeTerminationResignation_schema_1.EmployeeTerminationResignation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CalcDraftService);
//# sourceMappingURL=calc-draft.service.js.map