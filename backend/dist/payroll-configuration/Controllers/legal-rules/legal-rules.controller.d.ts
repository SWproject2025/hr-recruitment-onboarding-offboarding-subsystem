import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { updateLegalDto } from '../../dtos/updateLegal.dto';
import { createLegalDto } from '../../dtos/createLegal.dto';
import { CreateTaxRuleDto } from '../../dtos/createTaxRules.dto';
import { UpdateTaxRuleDto } from '../../dtos/updateTaxRules.dto';
export declare class LegalRulesController {
    private readonly service;
    constructor(service: PayrollConfigurationService);
    update(id: string, dto: updateLegalDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/legalRules.schema").LegalRules, {}, {}> & import("../../models/legalRules.schema").LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/legalRules.schema").LegalRules, {}, {}> & import("../../models/legalRules.schema").LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/legalRules.schema").LegalRules[]>;
    getOne(id: string): Promise<import("../../models/legalRules.schema").LegalRules>;
    create(dto: createLegalDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/legalRules.schema").LegalRules, {}, {}> & import("../../models/legalRules.schema").LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/legalRules.schema").LegalRules, {}, {}> & import("../../models/legalRules.schema").LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/legalRules.schema").LegalRules, {}, {}> & import("../../models/legalRules.schema").LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/legalRules.schema").LegalRules, {}, {}> & import("../../models/legalRules.schema").LegalRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createTaxRule(dto: CreateTaxRuleDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/taxRules.schema").taxRules, {}, {}> & import("../../models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/taxRules.schema").taxRules, {}, {}> & import("../../models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateTaxRule(id: string, dto: UpdateTaxRuleDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/taxRules.schema").taxRules, {}, {}> & import("../../models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/taxRules.schema").taxRules, {}, {}> & import("../../models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteTaxRule(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/taxRules.schema").taxRules, {}, {}> & import("../../models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/taxRules.schema").taxRules, {}, {}> & import("../../models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
