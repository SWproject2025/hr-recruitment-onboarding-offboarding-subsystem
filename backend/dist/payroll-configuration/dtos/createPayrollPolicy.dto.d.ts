import { Applicability, PolicyType } from "../enums/payroll-configuration-enums";
declare class RuleDefinitionDto {
    percentage: number;
    fixedAmount: number;
    thresholdAmount: number;
}
export declare class CreatePayrollPolicyDto {
    policyName: string;
    policyType: PolicyType;
    description: string;
    effectiveDate: Date;
    ruleDefinition: RuleDefinitionDto;
    applicability: Applicability;
    createdBy?: string;
}
export {};
