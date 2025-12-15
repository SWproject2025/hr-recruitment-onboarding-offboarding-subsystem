"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollConfigurationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payroll_configuration_service_1 = require("./payroll-configuration.service");
const CompanyWideSettings_schema_1 = require("./models/CompanyWideSettings.schema");
const allowance_schema_1 = require("./models/allowance.schema");
const insuranceBrackets_schema_1 = require("./models/insuranceBrackets.schema");
const payrollPolicies_schema_1 = require("./models/payrollPolicies.schema");
const payType_schema_1 = require("./models/payType.schema");
const signingBonus_schema_1 = require("./models/signingBonus.schema");
const taxRules_schema_1 = require("./models/taxRules.schema");
const terminationAndResignationBenefits_1 = require("./models/terminationAndResignationBenefits");
const payGrades_schema_1 = require("./models/payGrades.schema");
const legalRules_schema_1 = require("./models/legalRules.schema");
const roles_gaurd_1 = require("../Common/Gaurds/roles.gaurd");
const payroll_policy_controller_1 = require("./Controllers/payroll-policy/payroll-policy.controller");
const allowance_controller_1 = require("./Controllers/allowance/allowance.controller");
const pay_grade_controller_1 = require("./Controllers/pay-grade/pay-grade.controller");
const insurance_bracket_controller_1 = require("./Controllers/insurance-bracket/insurance-bracket.controller");
const legal_rules_controller_1 = require("./Controllers/legal-rules/legal-rules.controller");
const company_wide_settings_controller_1 = require("./Controllers/company-wide-settings/company-wide-settings.controller");
const pay_type_controller_1 = require("./Controllers/pay-type/pay-type.controller");
const signing_bonus_controller_1 = require("./Controllers/signing-bonus/signing-bonus.controller");
const termination_resignation_benefits_controller_1 = require("./Controllers/termination-resignation-benefits/termination-resignation-benefits.controller");
let PayrollConfigurationModule = class PayrollConfigurationModule {
};
exports.PayrollConfigurationModule = PayrollConfigurationModule;
exports.PayrollConfigurationModule = PayrollConfigurationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: allowance_schema_1.allowance.name, schema: allowance_schema_1.allowanceSchema },
                { name: signingBonus_schema_1.signingBonus.name, schema: signingBonus_schema_1.signingBonusSchema },
                { name: taxRules_schema_1.taxRules.name, schema: taxRules_schema_1.taxRulesSchema },
                { name: insuranceBrackets_schema_1.insuranceBrackets.name, schema: insuranceBrackets_schema_1.insuranceBracketsSchema },
                { name: payType_schema_1.payType.name, schema: payType_schema_1.payTypeSchema },
                { name: payrollPolicies_schema_1.payrollPolicies.name, schema: payrollPolicies_schema_1.payrollPoliciesSchema },
                { name: terminationAndResignationBenefits_1.terminationAndResignationBenefits.name, schema: terminationAndResignationBenefits_1.terminationAndResignationBenefitsSchema },
                { name: CompanyWideSettings_schema_1.CompanyWideSettings.name, schema: CompanyWideSettings_schema_1.CompanyWideSettingsSchema },
                { name: payGrades_schema_1.payGrade.name, schema: payGrades_schema_1.payGradeSchema },
                { name: legalRules_schema_1.LegalRules.name, schema: legalRules_schema_1.LegalRulesSchema },
            ]),
        ],
        controllers: [
            payroll_policy_controller_1.PayrollPolicyController,
            allowance_controller_1.AllowanceController,
            pay_grade_controller_1.PayGradeController,
            insurance_bracket_controller_1.InsuranceBracketController,
            company_wide_settings_controller_1.CompanyWideSettingsController,
            legal_rules_controller_1.LegalRulesController,
            pay_type_controller_1.PayTypeController,
            signing_bonus_controller_1.SigningBonusController,
            termination_resignation_benefits_controller_1.TerminationResignationBenefitsController,
        ],
        providers: [payroll_configuration_service_1.PayrollConfigurationService, roles_gaurd_1.RolesGuard],
        exports: [payroll_configuration_service_1.PayrollConfigurationService],
    })
], PayrollConfigurationModule);
//# sourceMappingURL=payroll-configuration.module.js.map