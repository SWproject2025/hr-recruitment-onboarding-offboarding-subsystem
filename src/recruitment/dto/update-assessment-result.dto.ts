import {
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';

export class UpdateAssessmentResultDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsMongoId()
  changedBy: string;
}
