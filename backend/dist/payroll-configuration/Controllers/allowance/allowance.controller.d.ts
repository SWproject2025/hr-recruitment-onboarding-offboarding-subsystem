import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreateAllowanceDto } from '../../dtos/createAllowance.dto';
import { UpdateAllowanceDto } from '../../dtos/updateAllowance.dto';
export declare class AllowanceController {
    private readonly payrollConfigurationService;
    constructor(payrollConfigurationService: PayrollConfigurationService);
    create(dto: CreateAllowanceDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/allowance.schema").allowance, {}, {}> & import("../../models/allowance.schema").allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/allowance.schema").allowance, {}, {}> & import("../../models/allowance.schema").allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateAllowanceDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/allowance.schema").allowance, {}, {}> & import("../../models/allowance.schema").allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/allowance.schema").allowance, {}, {}> & import("../../models/allowance.schema").allowance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<import("../../models/allowance.schema").allowance[]>;
    findOne(id: string): Promise<import("../../models/allowance.schema").allowance>;
}
