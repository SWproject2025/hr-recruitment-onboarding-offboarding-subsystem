export class CreateContractDto {
  offerId: string;
  acceptanceDate?: string;
  grossSalary: number;
  signingBonus?: number;
  role?: string;
  benefits?: string[];
  documentId?: string;
}