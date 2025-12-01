import {
  IsString,
  IsMongoId,
} from 'class-validator';

export class CancelInterviewDto {
  @IsString()
  reason: string;

  @IsMongoId()
  changedBy: string;
}
