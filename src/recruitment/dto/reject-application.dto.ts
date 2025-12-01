import {
  IsString,
  IsMongoId,
} from 'class-validator';

export class RejectApplicationDto {
  @IsString()
  reason: string;

  @IsMongoId()
  changedBy: string; // HR user performing rejection
}
