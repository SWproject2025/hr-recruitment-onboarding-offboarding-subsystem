import { SystemRole } from "../../employee-profile/enums/employee-profile.enums";
export declare const ROLE_KEY = "roles";
export declare const Roles: (...roles: SystemRole[]) => import("@nestjs/common").CustomDecorator<string>;
