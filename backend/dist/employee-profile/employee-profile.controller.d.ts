import { EmployeeProfileService } from './employee-profile.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CreateChangeRequestDto } from './dto/change-request.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
export declare class EmployeeProfileController {
    private readonly employeeProfileService;
    constructor(employeeProfileService: EmployeeProfileService);
    getProfile(id: string): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    updateContactInfo(id: string, dto: UpdateContactDto, req: any): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    submitChangeRequest(id: string, dto: CreateChangeRequestDto): Promise<import("./models/ep-change-request.schema").EmployeeProfileChangeRequest>;
    getTeam(managerId: string): Promise<import("./models/employee-profile.schema").EmployeeProfile[]>;
    approveRequest(requestId: string, adminId: string): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    adminUpdate(id: string, dto: any, req: any): Promise<import("./models/employee-profile.schema").EmployeeProfile>;
    createCandidate(dto: CreateCandidateDto): Promise<import("./models/candidate.schema").Candidate>;
    getAllCandidates(): Promise<import("./models/candidate.schema").Candidate[]>;
    getCandidateById(id: string): Promise<import("./models/candidate.schema").Candidate>;
    updateCandidate(id: string, dto: any): Promise<import("./models/candidate.schema").Candidate>;
    deleteCandidate(id: string): Promise<void>;
}
