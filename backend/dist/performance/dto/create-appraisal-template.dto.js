"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppraisalTemplateDto = exports.EvaluationCriterionDto = exports.RatingScaleDefinitionDto = void 0;
class RatingScaleDefinitionDto {
    type;
    min;
    max;
}
exports.RatingScaleDefinitionDto = RatingScaleDefinitionDto;
class EvaluationCriterionDto {
    key;
    title;
    details;
    weight;
    maxScore;
    required;
}
exports.EvaluationCriterionDto = EvaluationCriterionDto;
class CreateAppraisalTemplateDto {
    name;
    description;
    templateType;
    ratingScale;
    criteria;
    instructions;
    applicableDepartmentIds;
    applicablePositionIds;
    isActive;
}
exports.CreateAppraisalTemplateDto = CreateAppraisalTemplateDto;
//# sourceMappingURL=create-appraisal-template.dto.js.map