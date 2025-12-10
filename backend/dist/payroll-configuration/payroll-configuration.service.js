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
exports.PayrollConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payrollPolicies_schema_1 = require("./models/payrollPolicies.schema");
const allowance_schema_1 = require("./models/allowance.schema");
const payroll_configuration_enums_1 = require("./enums/payroll-configuration-enums");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
const payGrades_schema_1 = require("./models/payGrades.schema");
const insuranceBrackets_schema_1 = require("./models/insuranceBrackets.schema");
const signingBonus_schema_1 = require("./models/signingBonus.schema");
const legalRules_schema_1 = require("./models/legalRules.schema");
const CompanyWideSettings_schema_1 = require("./models/CompanyWideSettings.schema");
const payType_schema_1 = require("./models/payType.schema");
const terminationAndResignationBenefits_1 = require("./models/terminationAndResignationBenefits");
const taxRules_schema_1 = require("./models/taxRules.schema");
let PayrollConfigurationService = class PayrollConfigurationService {
    policyModel;
    allowanceModel;
    payGradeModel;
    insuranceBracketModel;
    signingBonusModel;
    legalRulesModel;
    companyWideSettingsModel;
    terminationAndResignationBenefitsModel;
    payTypeModel;
    taxRulesModel;
    constructor(policyModel, allowanceModel, payGradeModel, insuranceBracketModel, signingBonusModel, legalRulesModel, companyWideSettingsModel, terminationAndResignationBenefitsModel, payTypeModel, taxRulesModel) {
        this.policyModel = policyModel;
        this.allowanceModel = allowanceModel;
        this.payGradeModel = payGradeModel;
        this.insuranceBracketModel = insuranceBracketModel;
        this.signingBonusModel = signingBonusModel;
        this.legalRulesModel = legalRulesModel;
        this.companyWideSettingsModel = companyWideSettingsModel;
        this.terminationAndResignationBenefitsModel = terminationAndResignationBenefitsModel;
        this.payTypeModel = payTypeModel;
        this.taxRulesModel = taxRulesModel;
    }
    async createPayrollPolicy(dto, userId) {
        const newPolicy = new this.policyModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
        return await newPolicy.save();
    }
    async updatePayrollPolicy(dto, policyId, userId) {
        const policy = await this.policyModel.findById(policyId);
        if (!policy) {
            throw new Error('Payroll Policy not found');
        }
        if (policy.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT) {
            throw new Error('Only draft policies can be Edited');
        }
        if (policy.createdBy?.toString() !== userId) {
            throw new common_1.ForbiddenException('You are only allowed to update policies you have created');
        }
        Object.assign(policy, dto);
        return await policy.save();
    }
    async getAllPayrollPolicies() {
        return await this.policyModel.find().exec();
    }
    async getOnePayrollPolicy(id) {
        const policy = await this.policyModel.findById(id);
        if (!policy) {
            throw new Error('Payroll Policy Not Found');
        }
        return policy;
    }
    async deletePolicy(id) {
        const policy = await this.policyModel.findById(id);
        if (!policy) {
            throw new Error('Payroll Policy Not Found');
        }
        return await this.policyModel.findByIdAndDelete(id);
    }
    async calculateGrossSalary(baseSalary, allowanceIds) {
        const allowances = await this.allowanceModel.find({
            _id: { $in: allowanceIds },
            status: payroll_configuration_enums_1.ConfigStatus.APPROVED,
        });
        const totalAllowanceAmount = allowances.reduce((sum, a) => sum + (a.amount || 0), 0);
        return baseSalary + totalAllowanceAmount;
    }
    async createPayGrade(dto, userId) {
        const grossSalary = await this.calculateGrossSalary(dto.baseSalary, dto.allowance);
        const grade = new this.payGradeModel({
            ...dto,
            grossSalary,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return grade.save();
    }
    async updatePayGrade(id, dto, userId) {
        const grade = await this.payGradeModel.findById(id);
        if (!grade)
            throw new Error('Pay grade not found');
        if (grade.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT)
            throw new Error('Only draft pay grades may be edited');
        Object.assign(grade, dto);
        return grade.save();
    }
    async deletePayGrade(id) {
        const grade = await this.payGradeModel.findById(id);
        if (!grade)
            throw new Error('Pay grade not found');
        return await this.payGradeModel.findByIdAndDelete(id);
    }
    async createInsuranceBracket(dto, userId) {
        const bracket = new this.insuranceBracketModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
    }
    async updateInsuranceBracket(id, dto, userId) {
        const bracket = await this.insuranceBracketModel.findById(id);
        if (!bracket)
            throw new Error('Pay grade not found');
        if (bracket.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT)
            throw new Error('Only draft pay grades may be edited');
        Object.assign(bracket, dto);
        return bracket.save();
    }
    async createSigningBonus(dto, userId) {
        const bonus = new this.signingBonusModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
        return await bonus.save();
    }
    async updateSigningBonus(id, dto, userId) {
        const bonus = await this.signingBonusModel.findById(id);
        if (!bonus)
            throw new Error('Signing bonus not found');
        if (bonus.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT)
            throw new Error('Only draft signing bonuses may be edited');
        Object.assign(bonus, dto);
        return await bonus.save();
    }
    async createTerminationAndResignationBenefits(dto, userId) {
        const benefits = new this.terminationAndResignationBenefitsModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
        return await benefits.save();
    }
    async updateTerminationAndResignationBenefits(id, dto, userId) {
        const benefits = await this.terminationAndResignationBenefitsModel.findById(id);
        if (!benefits)
            throw new Error('Benefit not found');
        if (benefits.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT)
            throw new Error('Only draft benefits may be edited');
        Object.assign(benefits, dto);
        return await benefits.save();
    }
    async deleteTermResBen(id) {
        const benefits = await this.terminationAndResignationBenefitsModel.findById(id);
        if (!benefits)
            throw new Error('Benefit not found');
        return await this.terminationAndResignationBenefitsModel.findByIdAndDelete(id);
    }
    async createPayType(dto, userId) {
        const payType = new this.payTypeModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
        return await payType.save();
    }
    async updatePayType(id, dto, userId) {
        const payType = await this.payTypeModel.findById(id);
        if (!payType)
            throw new Error('Pay type not found');
        if (payType.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT)
            throw new Error('Only draft pay types may be edited');
        Object.assign(payType, dto);
        return await payType.save();
    }
    async deletePayType(id) {
        const payType = await this.payTypeModel.findById(id);
        if (!payType)
            throw new Error('Pay type not found');
        return await this.payTypeModel.findByIdAndDelete(id);
    }
    async editLegal(dto, userId) {
        const legal = await this.legalRulesModel.findById(userId);
        if (!legal)
            throw new Error('Legal not found');
        Object.assign(legal, dto);
        return await legal.save();
    }
    async createTaxRules(dto, userId) {
        const taxRules = new this.taxRulesModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
        return await taxRules.save();
    }
    async createCompanyWideSeting(dto, userId) {
        const setting = new this.companyWideSettingsModel({
            ...dto,
            createdBy: userId,
        });
        return await setting.save();
    }
    async updateCompanyWideSeting(id, dto) {
        const setting = await this.companyWideSettingsModel.findById(id);
        if (!setting)
            throw new Error('Company wide setting not found');
        Object.assign(setting, dto);
        return setting.save();
    }
    async submaitForApproval(policyId, userId) {
        const policy = await this.policyModel.findById(policyId);
        if (!policy) {
            throw new Error('Payroll Policy Not Found');
        }
        if (policy.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT) {
            throw new Error('Only draft policies can be submitted for approval');
        }
        if (policy.createdBy?.toString() !== userId) {
            throw new common_1.ForbiddenException('You are only allowed to submit policies you have created');
        }
        policy.status = payroll_configuration_enums_1.ConfigStatus.PENDING;
        return await policy.save();
    }
    async createAllowance(dto, userId) {
        const newAllowance = new this.allowanceModel({
            ...dto,
            createdBy: userId,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
        });
        return await newAllowance.save();
    }
    async updateAllowance(dto, userId, allowanceId) {
        const allowance = await this.allowanceModel.findById(allowanceId);
        if (!allowance) {
            throw new Error('Allowance not found');
        }
        if (allowance.createdBy?.toString() !== userId) {
            throw new common_1.ForbiddenException('You are only allowed to update allowances you have created');
        }
        Object.assign(allowance, dto);
        return await allowance.save();
    }
    async findAllAllowances() {
        return await this.allowanceModel.find().exec();
    }
    async findOneAllowance(id) {
        const allowance = await this.allowanceModel.findById(id);
        if (!allowance) {
            throw new Error('Allowance Not Found');
        }
        return allowance;
    }
    async approvePolicy(policyId, user) {
        const policy = await this.policyModel.findById(policyId);
        if (!policy) {
            throw new Error('Payroll Policy Not Found');
        }
        if (user !== employee_profile_enums_1.SystemRole.PAYROLL_MANAGER) {
            throw new common_1.ForbiddenException('Only payroll managers are allowed to approve policies');
        }
        policy.status = payroll_configuration_enums_1.ConfigStatus.APPROVED;
        policy.approvedBy = user._id.toString();
        policy.approvedAt = new Date();
        return await policy.save();
    }
    async rejectPolicy(policyId, user) {
        const policy = await this.policyModel.findById(policyId);
        if (!policy) {
            throw new Error('Payroll Policy Not Found');
        }
        if (user !== employee_profile_enums_1.SystemRole.PAYROLL_MANAGER) {
            throw new common_1.ForbiddenException('Only payroll managers are allowed to reject policies');
        }
        policy.status = payroll_configuration_enums_1.ConfigStatus.REJECTED;
        policy.approvedBy = user._id.toString();
        policy.approvedAt = new Date();
        return await policy.save();
    }
    async findAllPayGrades() {
        return await this.payGradeModel.find().exec();
    }
    async findOnePayGrade(id) {
        const grade = await this.payGradeModel.findById(id);
        if (!grade)
            throw new Error('Pay grade not found');
        return grade;
    }
    async findAllInsuranceBrackets() {
        return await this.insuranceBracketModel.find().exec();
    }
    async findOneInsuranceBracket(id) {
        const bracket = await this.insuranceBracketModel.findById(id);
        if (!bracket)
            throw new Error('Insurance bracket not found');
        return bracket;
    }
    async findAllSigningBonuses() {
        return await this.signingBonusModel.find().exec();
    }
    async findOneSigningBonus(id) {
        const bonus = await this.signingBonusModel.findById(id);
        if (!bonus)
            throw new Error('Signing bonus not found');
        return bonus;
    }
    async findAllTerminationAndResignationBenefits() {
        return await this.terminationAndResignationBenefitsModel.find().exec();
    }
    async findOneTerminationAndResignationBenefit(id) {
        const benefit = await this.terminationAndResignationBenefitsModel.findById(id);
        if (!benefit)
            throw new Error('Benefit not found');
        return benefit;
    }
    async findAllPayTypes() {
        return await this.payTypeModel.find().exec();
    }
    async findOnePayType(id) {
        const ptype = await this.payTypeModel.findById(id);
        if (!ptype)
            throw new Error('Pay type not found');
        return ptype;
    }
    async findAllLegalRules() {
        return await this.legalRulesModel.find().exec();
    }
    async findOneLegalRule(id) {
        const rule = await this.legalRulesModel.findById(id);
        if (!rule)
            throw new Error('Legal rule not found');
        return rule;
    }
    async updateLegalRule(id, dto, userId) {
        const legal = await this.legalRulesModel.findById(userId);
        if (!legal)
            throw new Error('Legal rule not found');
        Object.assign(legal, dto);
        return await legal.save();
    }
    async createLegalRule(dto, userId) {
        const legal = await this.legalRulesModel.create(dto);
        return await legal.save();
    }
    async deleteLegalRule(id) {
        const legal = await this.legalRulesModel.findByIdAndDelete(id);
        if (!legal)
            throw new Error('Legal rule not found');
        return await this.legalRulesModel.findByIdAndDelete(id);
    }
    async findAllCompanyWideSettings() {
        return await this.companyWideSettingsModel.find().exec();
    }
    async findOneCompanyWideSetting(id) {
        const setting = await this.companyWideSettingsModel.findById(id);
        if (!setting)
            throw new Error('Company-wide setting not found');
        return setting;
    }
    async findAllTaxRules() {
        return await this.taxRulesModel.find().exec();
    }
    async findOneTaxRule(id) {
        const rule = await this.taxRulesModel.findById(id);
        if (!rule)
            throw new Error('Tax rule not found');
        return rule;
    }
    async updateTaxRule(id, dto, userId) {
        const tax = await this.taxRulesModel.findById(userId);
        if (!tax)
            throw new Error('Tax rule not found');
        Object.assign(tax, dto);
        return await tax.save();
    }
    async deleteTaxRule(id) {
        const tax = await this.taxRulesModel.findByIdAndDelete(id);
        if (!tax)
            throw new Error('Tax rule not found');
        return await this.taxRulesModel.findByIdAndDelete(id);
    }
};
exports.PayrollConfigurationService = PayrollConfigurationService;
exports.PayrollConfigurationService = PayrollConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payrollPolicies_schema_1.payrollPolicies.name)),
    __param(1, (0, mongoose_1.InjectModel)(allowance_schema_1.allowance.name)),
    __param(2, (0, mongoose_1.InjectModel)(payGrades_schema_1.payGrade.name)),
    __param(3, (0, mongoose_1.InjectModel)(insuranceBrackets_schema_1.insuranceBrackets.name)),
    __param(4, (0, mongoose_1.InjectModel)(signingBonus_schema_1.signingBonus.name)),
    __param(5, (0, mongoose_1.InjectModel)(legalRules_schema_1.LegalRules.name)),
    __param(6, (0, mongoose_1.InjectModel)(CompanyWideSettings_schema_1.CompanyWideSettings.name)),
    __param(7, (0, mongoose_1.InjectModel)(terminationAndResignationBenefits_1.terminationAndResignationBenefits.name)),
    __param(8, (0, mongoose_1.InjectModel)(payType_schema_1.payType.name)),
    __param(9, (0, mongoose_1.InjectModel)(taxRules_schema_1.taxRules.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollConfigurationService);
//# sourceMappingURL=payroll-configuration.service.js.map