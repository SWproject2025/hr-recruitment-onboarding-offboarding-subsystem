import {
  IsOptional,
  IsDateString,
  IsEnum,
  IsArray,
  IsMongoId,
  IsString,
} from 'class-validator';
import { InterviewMethod } from '../enums/interview-method.enum';
import { InterviewStatus } from '../enums/interview-status.enum';

export class UpdateInterviewDto {
  @IsOptional()
  @IsDateString()
  scheduledDate?: Date;

  @IsOptional()
  @IsEnum(InterviewMethod)
  method?: InterviewMethod;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  panel?: string[];

  @IsOptional()
  @IsEnum(InterviewStatus)
  status?: InterviewStatus;

  @IsOptional()
  @IsString()
  videoLink?: string;

  @IsOptional()
  @IsMongoId()
  calendarEventId?: string;

  @IsOptional()
  @IsString()
  candidateFeedback?: string;

  @IsMongoId()
  changedBy: string;
}
