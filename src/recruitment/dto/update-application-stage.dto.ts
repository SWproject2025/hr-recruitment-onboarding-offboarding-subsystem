import { IsEnum, IsMongoId } from 'class-validator';
import { ApplicationStage } from '../enums/application-stage.enum';

export class UpdateApplicationStageDto {
  @IsEnum(ApplicationStage)
  newStage: ApplicationStage;

  @IsMongoId()
  changedBy: string; // user id performing action
}
