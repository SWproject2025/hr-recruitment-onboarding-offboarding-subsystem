import {
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateJobTemplateDto {
  @IsString()
  title: string;

  @IsString()
  department: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualifications?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
