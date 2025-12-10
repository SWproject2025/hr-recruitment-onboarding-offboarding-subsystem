export declare class CreateJobRequisitionDto {
    jobTitle: string;
    departmentId: string;
    positionId: string;
    location?: string;
    openings: number;
    qualifications?: string[];
    skills?: string[];
    status?: 'open' | 'closed';
}
