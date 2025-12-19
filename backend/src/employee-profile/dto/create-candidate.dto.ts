export class CreateCandidateDto {
  candidateNumber: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  personalEmail?: string;
  mobilePhone?: string;
  dateOfBirth?: string;
  departmentId?: string;
  positionId?: string;
  applicationDate?: string;
  resumeUrl?: string;
  notes?: string;
}
