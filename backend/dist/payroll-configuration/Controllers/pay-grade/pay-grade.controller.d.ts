import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreatePayGradeDto } from '../../dtos/createPayGrade.dto';
import { UpdatePayGradeDto } from '../../dtos/updatePayGrade.dto';
export declare class PayGradeController {
    private payrollConfigurationService;
    constructor(payrollConfigurationService: PayrollConfigurationService);
    create(dto: CreatePayGradeDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payGrades.schema").payGrade, {}, {}> & import("../../models/payGrades.schema").payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payGrades.schema").payGrade, {}, {}> & import("../../models/payGrades.schema").payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdatePayGradeDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payGrades.schema").payGrade, {}, {}> & import("../../models/payGrades.schema").payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payGrades.schema").payGrade, {}, {}> & import("../../models/payGrades.schema").payGrade & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/payGrades.schema").payGrade[]>;
    getOne(id: string): Promise<import("../../models/payGrades.schema").payGrade>;
}
