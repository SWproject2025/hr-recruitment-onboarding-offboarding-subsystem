import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreateTermResBenDto } from '../../dtos/createTermResBen.dto';
import { UpdateTermResBenDto } from '../../dtos/updateTermResBen.dto';
export declare class TerminationResignationBenefitsController {
    private readonly service;
    constructor(service: PayrollConfigurationService);
    create(dto: CreateTermResBenDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateTermResBenDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits[]>;
    getOne(id: string): Promise<import("../../models/terminationAndResignationBenefits").terminationAndResignationBenefits>;
}
