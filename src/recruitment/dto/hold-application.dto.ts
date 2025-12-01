import {
  IsMongoId,
} from 'class-validator';

export class HoldApplicationDto {
  @IsMongoId()
  changedBy: string; // HR user placing on-hold
}
