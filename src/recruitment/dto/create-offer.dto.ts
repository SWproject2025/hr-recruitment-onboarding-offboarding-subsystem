import {
  IsMongoId,
} from 'class-validator';

export class CreateOfferDto {
  @IsMongoId()
  applicationId: string;

  @IsMongoId()
  candidateId: string;

  @IsMongoId()
  changedBy: string;
}
