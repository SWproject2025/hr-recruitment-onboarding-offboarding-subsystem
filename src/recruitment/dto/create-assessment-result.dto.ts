import {
  IsMongoId,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAssessmentResultDto {
  @IsMongoId()
  interviewId: string;

  @IsMongoId()
  interviewerId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsMongoId()
  changedBy: string;
}
