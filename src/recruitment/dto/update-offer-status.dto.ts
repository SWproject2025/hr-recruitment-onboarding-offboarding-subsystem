import {
  IsOptional,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { OfferResponseStatus } from '../enums/offer-response-status.enum';
import { OfferFinalStatus } from '../enums/offer-final-status.enum';

export class UpdateOfferStatusDto {
  @IsOptional()
  @IsEnum(OfferResponseStatus)
  responseStatus?: OfferResponseStatus;

  @IsOptional()
  @IsEnum(OfferFinalStatus)
  finalStatus?: OfferFinalStatus;

  @IsMongoId()
  changedBy: string;
}
