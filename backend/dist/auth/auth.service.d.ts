import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { EmployeeProfile } from '../employee-profile/models/employee-profile.schema';
export declare class AuthService {
    private employeeModel;
    private jwtService;
    constructor(employeeModel: Model<EmployeeProfile>, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: any): Promise<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
