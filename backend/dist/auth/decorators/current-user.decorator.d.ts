export interface CurrentUserData {
    employeeProfileId: string;
    nationalId: string;
    roles: string[];
    permissions: string[];
    employeeProfile: any;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
