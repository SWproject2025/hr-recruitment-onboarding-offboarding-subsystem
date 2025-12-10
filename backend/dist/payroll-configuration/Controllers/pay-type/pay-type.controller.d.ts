import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreatePayTypeDto } from '../../dtos/createPayType.dto';
import { UpdatePayTypeDto } from '../../dtos/updatePayType.dto';
export declare class PayTypeController {
    private readonly service;
    constructor(service: PayrollConfigurationService);
    create(dto: CreatePayTypeDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payType.schema").payType, {}, {}> & import("../../models/payType.schema").payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payType.schema").payType, {}, {}> & import("../../models/payType.schema").payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdatePayTypeDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payType.schema").payType, {}, {}> & import("../../models/payType.schema").payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payType.schema").payType, {}, {}> & import("../../models/payType.schema").payType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/payType.schema").payType[]>;
    getOne(id: string): Promise<import("../../models/payType.schema").payType>;
}
