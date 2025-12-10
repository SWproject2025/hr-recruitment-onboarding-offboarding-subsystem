import { AppraisalDisputeStatus } from '../enums/performance.enums';
export declare class ResolveDisputeDto {
    status: AppraisalDisputeStatus;
    hrDecisionNotes?: string;
    adjustedTotalScore?: number;
    adjustedOverallRatingLabel?: string;
}
