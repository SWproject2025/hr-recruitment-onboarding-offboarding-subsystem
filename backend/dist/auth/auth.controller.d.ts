import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: any): Promise<{
        access_token: any;
    }>;
    register(registerDto: any): Promise<import("mongoose").Document<unknown, {}, import("../employee-profile/models/employee-profile.schema").EmployeeProfile, {}, {}> & import("../employee-profile/models/employee-profile.schema").EmployeeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
