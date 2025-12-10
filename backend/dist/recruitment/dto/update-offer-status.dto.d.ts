import { OfferResponseStatus } from '../enums/offer-response-status.enum';
import { OfferFinalStatus } from '../enums/offer-final-status.enum';
export declare class UpdateOfferStatusDto {
    responseStatus?: OfferResponseStatus;
    finalStatus?: OfferFinalStatus;
    changedBy: string;
}
