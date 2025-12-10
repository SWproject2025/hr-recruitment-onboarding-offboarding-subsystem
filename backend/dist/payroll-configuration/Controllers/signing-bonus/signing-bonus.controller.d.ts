import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreateSigningBonusDto } from '../../dtos/createSigningBonus.dto';
import { UpdateSigningBonusDto } from '../../dtos/updateSigningBonus.dto';
export declare class SigningBonusController {
    private service;
    constructor(service: PayrollConfigurationService);
    create(dto: CreateSigningBonusDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/signingBonus.schema").signingBonus, {}, {}> & import("../../models/signingBonus.schema").signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/signingBonus.schema").signingBonus, {}, {}> & import("../../models/signingBonus.schema").signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateSigningBonusDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/signingBonus.schema").signingBonus, {}, {}> & import("../../models/signingBonus.schema").signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/signingBonus.schema").signingBonus, {}, {}> & import("../../models/signingBonus.schema").signingBonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/signingBonus.schema").signingBonus[]>;
    getOne(id: string): Promise<import("../../models/signingBonus.schema").signingBonus>;
}
