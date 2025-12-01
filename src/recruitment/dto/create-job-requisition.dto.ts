import {
  IsString,
  IsMongoId,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class CreateJobRequisitionDto {
  @IsString()
  requisitionId: string; // “REQ-2025-001” string

  @IsMongoId()
  templateId: string;

  @IsNumber()
  @Min(1)
  openings: number;

  @IsString()
  location: string;

  @IsMongoId()
  hiringManagerId: string;

  @IsOptional()
  @IsString()
  publishStatus?: string;

  @IsOptional()
  @IsDateString()
  postingDate?: Date;

  @IsOptional()
  @IsDateString()
  expiryDate?: Date;
}
