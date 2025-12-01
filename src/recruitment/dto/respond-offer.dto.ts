import { IsMongoId } from 'class-validator';

export class RespondOfferDto {
  @IsMongoId()
  changedBy: string;
}
