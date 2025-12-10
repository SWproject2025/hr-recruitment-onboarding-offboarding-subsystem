import { EmployeeProfileService } from './employee-profile.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CreateChangeRequestDto } from './dto/change-request.dto';
export declare class EmployeeProfileController {
    private readonly employeeProfileService;
    constructor(employeeProfileService: EmployeeProfileService);
    getProfile(id: string): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    updateContactInfo(id: string, dto: UpdateContactDto, req: any): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    submitChangeRequest(id: string, dto: CreateChangeRequestDto): Promise<import("./models/ep-change-request.schema").EmployeeProfileChangeRequest>;
    getTeam(managerId: string): Promise<import("./models/employee-profile.schema").EmployeeProfile[]>;
    approveRequest(requestId: string, adminId: string): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    adminUpdate(id: string, dto: any, req: any): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
}
