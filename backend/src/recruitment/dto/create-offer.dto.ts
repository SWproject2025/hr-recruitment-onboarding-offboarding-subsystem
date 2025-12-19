export class CreateOfferDto {
  applicationId: string;
  candidateId: string;
  changedBy: string;
  hrEmployeeId?: string;
  grossSalary: number;
  signingBonus?: number;
  benefits?: string[];
  conditions?: string;
  insurances?: string;
  content?: string;
  role?: string;
  deadline?: string;
}
