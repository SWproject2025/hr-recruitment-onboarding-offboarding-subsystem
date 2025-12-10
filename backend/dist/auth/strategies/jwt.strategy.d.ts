import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { EmployeeSystemRoleDocument } from '../../employee-profile/models/employee-system-role.schema';
import { EmployeeProfile, EmployeeProfileDocument } from '../../employee-profile/models/employee-profile.schema';
export interface JwtPayload {
    sub: string;
    nationalId: string;
    roles: string[];
}
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private employeeSystemRoleModel;
    private employeeProfileModel;
    constructor(configService: ConfigService, employeeSystemRoleModel: Model<EmployeeSystemRoleDocument>, employeeProfileModel: Model<EmployeeProfileDocument>);
    validate(payload: JwtPayload): Promise<{
        employeeProfileId: string;
        nationalId: string;
        roles: import("../../employee-profile/enums/employee-profile.enums").SystemRole[];
        permissions: string[];
        employeeProfile: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
export {};
