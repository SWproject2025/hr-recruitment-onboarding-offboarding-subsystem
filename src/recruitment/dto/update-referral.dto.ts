import {
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';

export class UpdateReferralDto {
  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsMongoId()
  changedBy: string;
}
