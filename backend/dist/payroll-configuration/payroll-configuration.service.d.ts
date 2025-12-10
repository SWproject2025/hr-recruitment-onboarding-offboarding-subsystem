import { Model, ObjectId } from 'mongoose';
import { payrollPoliciesDocument, payrollPolicies } from './models/payrollPolicies.schema';
import { allowanceDocument, allowance } from './models/allowance.schema';
import { CreatePayrollPolicyDto } from './dtos/createPayrollPolicy.dto';
import { UpdatePayrollPolicyDto } from './dtos/updatePayrollPolicy.dto';
import { CreateAllowanceDto } from './dtos/createAllowance.dto';
import { UpdateAllowanceDto } from './dtos/updateAllowance.dto';
import { payGradeDocument, payGrade } from './models/payGrades.schema';
import { CreatePayGradeDto } from './dtos/createPayGrade.dto';
import { UpdatePayGradeDto } from './dtos/updatePayGrade.dto';
import { CreateInsureBracketDto } from './dtos/createInsureBracket.dto';
import { UpdateInsureBracketDto } from './dtos/updateInsureBracket.dto';
import { insuranceBracketsDocument, insuranceBrackets } from './models/insuranceBrackets.schema';
import { CreateSigningBonusDto } from './dtos/createSigningBonus.dto';
import { UpdateSigningBonusDto } from './dtos/updateSigningBonus.dto';
import { signingBonusDocument, signingBonus } from './models/signingBonus.schema';
import { LegalRules, LegalRulesDocument } from './models/legalRules.schema';
import { CompanyWideSettingsDocument, CompanyWideSettings } from './models/CompanyWideSettings.schema';
import { payTypeDocument, payType } from './models/payType.schema';
import { CreatePayTypeDto } from './dtos/createPayType.dto';
import { UpdatePayTypeDto } from './dtos/updatePayType.dto';
import { terminationAndResignationBenefitsDocument, terminationAndResignationBenefits } from './models/terminationAndResignationBenefits';
import { CreateCompanyWideSettingDto } from './dtos/createCompanyWideSetting.dto';
import { UpdateCompanyWideSettingDto } from './dtos/updateCompanyWideSetting.dto';
import { CreateTermResBenDto } from './dtos/createTermResBen.dto';
import { UpdateTermResBenDto } from './dtos/updateTermResBen.dto';
import { updateLegalDto } from './dtos/updateLegal.dto';
import { CreateTaxRuleDto } from './dtos/createTaxRules.dto';
import { taxRules, taxRulesDocument } from './models/taxRules.schema';
import { createLegalDto } from './dtos/createLegal.dto';
import { UpdateTaxRuleDto } from './dtos/updateTaxRules.dto';
export declare class PayrollConfigurationService {
    private policyModel;
    private allowanceModel;
    private payGradeModel;
    private insuranceBracketModel;
    private signingBonusModel;
    private legalRulesModel;
    private companyWideSettingsModel;
    private terminationAndResignationBenefitsModel;
    private payTypeModel;
    private taxRulesModel;
    constructor(policyModel: Model<payrollPoliciesDocument>, allowanceModel: Model<allowanceDocument>, payGradeModel: Model<payGradeDocument>, insuranceBracketModel: Model<insuranceBracketsDocument>, signingBonusModel: Model<signingBonusDocument>, legalRulesModel: Model<LegalRulesDocument>, companyWideSettingsModel: Model<CompanyWideSettingsDocument>, terminationAndResignationBenefitsModel: Model<terminationAndResignationBenefitsDocument>, payTypeModel: Model<payTypeDocument>, taxRulesModel: Model<taxRulesDocument>);
    createPayrollPolicy(dto: CreatePayrollPolicyDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updatePayrollPolicy(dto: UpdatePayrollPolicyDto, policyId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllPayrollPolicies(): Promise<payrollPolicies[]>;
    getOnePayrollPolicy(id: string): Promise<payrollPolicies>;
    deletePolicy(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    calculateGrossSalary(baseSalary: number, allowanceIds: (string | ObjectId)[]): Promise<number>;
    createPayGrade(dto: CreatePayGradeDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payGrade, {}, {}> & payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payGrade, {}, {}> & payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updatePayGrade(id: string, dto: UpdatePayGradeDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payGrade, {}, {}> & payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payGrade, {}, {}> & payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deletePayGrade(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payGrade, {}, {}> & payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payGrade, {}, {}> & payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createInsuranceBracket(dto: CreateInsureBracketDto, userId: string): Promise<void>;
    updateInsuranceBracket(id: string, dto: UpdateInsureBracketDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, insuranceBrackets, {}, {}> & insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, insuranceBrackets, {}, {}> & insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createSigningBonus(dto: CreateSigningBonusDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, signingBonus, {}, {}> & signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, signingBonus, {}, {}> & signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateSigningBonus(id: string, dto: UpdateSigningBonusDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, signingBonus, {}, {}> & signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, signingBonus, {}, {}> & signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createTerminationAndResignationBenefits(dto: CreateTermResBenDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, terminationAndResignationBenefits, {}, {}> & terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, terminationAndResignationBenefits, {}, {}> & terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateTerminationAndResignationBenefits(id: string, dto: UpdateTermResBenDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, terminationAndResignationBenefits, {}, {}> & terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, terminationAndResignationBenefits, {}, {}> & terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteTermResBen(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, terminationAndResignationBenefits, {}, {}> & terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, terminationAndResignationBenefits, {}, {}> & terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createPayType(dto: CreatePayTypeDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payType, {}, {}> & payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payType, {}, {}> & payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updatePayType(id: string, dto: UpdatePayTypeDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payType, {}, {}> & payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payType, {}, {}> & payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deletePayType(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payType, {}, {}> & payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payType, {}, {}> & payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    editLegal(dto: updateLegalDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createTaxRules(dto: CreateTaxRuleDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, taxRules, {}, {}> & taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, taxRules, {}, {}> & taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createCompanyWideSeting(dto: CreateCompanyWideSettingDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateCompanyWideSeting(id: string, dto: UpdateCompanyWideSettingDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submaitForApproval(policyId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createAllowance(dto: CreateAllowanceDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, allowance, {}, {}> & allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, allowance, {}, {}> & allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateAllowance(dto: UpdateAllowanceDto, userId: string, allowanceId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, allowance, {}, {}> & allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, allowance, {}, {}> & allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllAllowances(): Promise<allowance[]>;
    findOneAllowance(id: string): Promise<allowance>;
    approvePolicy(policyId: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectPolicy(policyId: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, payrollPolicies, {}, {}> & payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAllPayGrades(): Promise<payGrade[]>;
    findOnePayGrade(id: string): Promise<payGrade>;
    findAllInsuranceBrackets(): Promise<insuranceBrackets[]>;
    findOneInsuranceBracket(id: string): Promise<insuranceBrackets>;
    findAllSigningBonuses(): Promise<signingBonus[]>;
    findOneSigningBonus(id: string): Promise<signingBonus>;
    findAllTerminationAndResignationBenefits(): Promise<terminationAndResignationBenefits[]>;
    findOneTerminationAndResignationBenefit(id: string): Promise<terminationAndResignationBenefits>;
    findAllPayTypes(): Promise<payType[]>;
    findOnePayType(id: string): Promise<payType>;
    findAllLegalRules(): Promise<LegalRules[]>;
    findOneLegalRule(id: string): Promise<LegalRules>;
    updateLegalRule(id: string, dto: updateLegalDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createLegalRule(dto: createLegalDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteLegalRule(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LegalRules, {}, {}> & LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findAllCompanyWideSettings(): Promise<CompanyWideSettings[]>;
    findOneCompanyWideSetting(id: string): Promise<CompanyWideSettings>;
    findAllTaxRules(): Promise<taxRules[]>;
    findOneTaxRule(id: string): Promise<taxRules>;
    updateTaxRule(id: string, dto: UpdateTaxRuleDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, taxRules, {}, {}> & taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, taxRules, {}, {}> & taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteTaxRule(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, taxRules, {}, {}> & taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, taxRules, {}, {}> & taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
