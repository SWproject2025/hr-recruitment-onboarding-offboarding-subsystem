export declare class UpdateJobRequisitionDto {
    jobTitle?: string;
    departmentId?: string;
    positionId?: string;
    location?: string;
    openings?: number;
    qualifications?: string[];
    skills?: string[];
    status?: 'open' | 'closed';
}
