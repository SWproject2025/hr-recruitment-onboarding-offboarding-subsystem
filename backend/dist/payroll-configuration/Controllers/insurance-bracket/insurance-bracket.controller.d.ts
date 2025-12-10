import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreateInsureBracketDto } from '../../dtos/createInsureBracket.dto';
import { UpdateInsureBracketDto } from '../../dtos/updateInsureBracket.dto';
export declare class InsuranceBracketController {
    private readonly service;
    constructor(service: PayrollConfigurationService);
    create(dto: CreateInsureBracketDto, req: any): Promise<void>;
    update(id: string, dto: UpdateInsureBracketDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("../../models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("../../models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/insuranceBrackets.schema").insuranceBrackets[]>;
    getOne(id: string): Promise<import("../../models/insuranceBrackets.schema").insuranceBrackets>;
}
