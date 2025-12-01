import {
  IsString,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateApplicationDto {
  @IsMongoId()
  candidateId: string;  // Candidate ObjectId as string

  @IsMongoId()
  requisitionId: string; // JobRequisition ObjectId as string

  @IsOptional()
  @IsMongoId()
  assignedHr?: string; // HR user ObjectId as string
}
