import { IsEnum, IsMongoId } from 'class-validator';
import { ApplicationStatus } from '../enums/application-status.enum';

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  newStatus: ApplicationStatus;

  @IsMongoId()
  changedBy: string; // user id performing action
}
