import { Model } from 'mongoose';
import { EmployeeProfile, EmployeeProfileDocument } from './models/employee-profile.schema';
import { EmployeeProfileChangeRequest } from './models/ep-change-request.schema';
import { Candidate } from './models/candidate.schema';
import { EmployeeSystemRole } from './models/employee-system-role.schema';
import { EmployeeQualification } from './models/qualification.schema';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
export declare class EmployeeProfileService {
    private employeeProfileModel;
    private changeRequestModel;
    private candidateModel;
    private systemRoleModel;
    private qualificationModel;
    constructor(employeeProfileModel: Model<EmployeeProfileDocument>, changeRequestModel: Model<EmployeeProfileChangeRequest>, candidateModel: Model<Candidate>, systemRoleModel: Model<EmployeeSystemRole>, qualificationModel: Model<EmployeeQualification>);
    getProfile(employeeId: string): Promise<EmployeeProfile>;
    updateContactInfo(employeeId: string, updateDto: UpdateContactDto): Promise<EmployeeProfile>;
    submitChangeRequest(employeeId: string, changes: any, reason?: string): Promise<EmployeeProfileChangeRequest>;
    getTeamProfiles(managerEmployeeId: string): Promise<EmployeeProfile[]>;
    approveChangeRequest(requestId: string): Promise<EmployeeProfile>;
    rejectChangeRequest(requestId: string): Promise<EmployeeProfileChangeRequest>;
    adminUpdateProfile(employeeId: string, updateData: any): Promise<EmployeeProfile>;
    createCandidate(dto: CreateCandidateDto): Promise<Candidate>;
    getAllCandidates(): Promise<Candidate[]>;
    getCandidateById(id: string): Promise<Candidate>;
    updateCandidate(id: string, updateData: any): Promise<Candidate>;
    deleteCandidate(id: string): Promise<void>;
}
