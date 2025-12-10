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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayrollPolicyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const payroll_configuration_enums_1 = require("../enums/payroll-configuration-enums");
class RuleDefinitionDto {
    percentage;
    fixedAmount;
    thresholdAmount;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], RuleDefinitionDto.prototype, "percentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RuleDefinitionDto.prototype, "fixedAmount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RuleDefinitionDto.prototype, "thresholdAmount", void 0);
class CreatePayrollPolicyDto {
    policyName;
    policyType;
    description;
    effectiveDate;
    ruleDefinition;
    applicability;
    createdBy;
}
exports.CreatePayrollPolicyDto = CreatePayrollPolicyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreatePayrollPolicyDto.prototype, "policyName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_1.PolicyType),
    __metadata("design:type", String)
], CreatePayrollPolicyDto.prototype, "policyType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePayrollPolicyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePayrollPolicyDto.prototype, "effectiveDate", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RuleDefinitionDto),
    __metadata("design:type", RuleDefinitionDto)
], CreatePayrollPolicyDto.prototype, "ruleDefinition", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_1.Applicability),
    __metadata("design:type", String)
], CreatePayrollPolicyDto.prototype, "applicability", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePayrollPolicyDto.prototype, "createdBy", void 0);
//# sourceMappingURL=createPayrollPolicy.dto.js.map