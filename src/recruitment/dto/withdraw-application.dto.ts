import { IsString } from 'class-validator';

export class WithdrawApplicationDto {
  @IsString()
  changedBy: string; // candidate or HR
}
