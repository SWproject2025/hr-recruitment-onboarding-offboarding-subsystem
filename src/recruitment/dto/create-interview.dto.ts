import {
  IsMongoId,
  IsEnum,
  IsDateString,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApplicationStage } from '../enums/application-stage.enum';
import { InterviewMethod } from '../enums/interview-method.enum';

export class CreateInterviewDto {
  @IsMongoId()
  applicationId: string;

  @IsEnum(ApplicationStage)
  stage: ApplicationStage;

  @IsDateString()
  scheduledDate: Date;

  @IsEnum(InterviewMethod)
  method: InterviewMethod;

  @IsArray()
  @IsMongoId({ each: true })
  panel: string[];

  @IsOptional()
  @IsString()
  videoLink?: string;

  @IsOptional()
  @IsMongoId()
  calendarEventId?: string;

  @IsMongoId()
  changedBy: string;
}
