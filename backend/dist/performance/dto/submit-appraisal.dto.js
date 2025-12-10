"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitAppraisalDto = exports.RatingInputDto = void 0;
class RatingInputDto {
    key;
    title;
    ratingValue;
    ratingLabel;
    comments;
}
exports.RatingInputDto = RatingInputDto;
class SubmitAppraisalDto {
    ratings;
    totalScore;
    overallRatingLabel;
    managerSummary;
    strengths;
    improvementAreas;
}
exports.SubmitAppraisalDto = SubmitAppraisalDto;
//# sourceMappingURL=submit-appraisal.dto.js.map