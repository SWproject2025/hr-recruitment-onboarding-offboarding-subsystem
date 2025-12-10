export declare class RatingInputDto {
    key: string;
    title: string;
    ratingValue: number;
    ratingLabel?: string;
    comments?: string;
}
export declare class SubmitAppraisalDto {
    ratings: RatingInputDto[];
    totalScore?: number;
    overallRatingLabel?: string;
    managerSummary?: string;
    strengths?: string;
    improvementAreas?: string;
}
