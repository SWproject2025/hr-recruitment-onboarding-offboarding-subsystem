import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreatePayrollPolicyDto } from '../../dtos/createPayrollPolicy.dto';
import { UpdatePayrollPolicyDto } from '../../dtos/updatePayrollPolicy.dto';
export declare class PayrollPolicyController {
    private payrollConfigurationService;
    constructor(payrollConfigurationService: PayrollConfigurationService);
    createPolicy(dto: CreatePayrollPolicyDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updatePolicy(id: string, dto: UpdatePayrollPolicyDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(): Promise<import("../../models/payrollPolicies.schema").payrollPolicies[]>;
    getOne(id: string): Promise<import("../../models/payrollPolicies.schema").payrollPolicies>;
    approvePolicy(policyId: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectPolicy(policyId: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitPolicy(policyId: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/payrollPolicies.schema").payrollPolicies, {}, {}> & import("../../models/payrollPolicies.schema").payrollPolicies & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
