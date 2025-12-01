import {
  IsOptional,
  IsMongoId,
  IsNumber,
  Min,
  IsString,
  IsDateString,
} from 'class-validator';

export class UpdateJobRequisitionDto {
  @IsOptional()
  @IsMongoId()
  templateId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  openings?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsMongoId()
  hiringManagerId?: string;

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
