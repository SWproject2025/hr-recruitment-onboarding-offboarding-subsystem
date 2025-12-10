import { AppraisalTemplateType } from '../enums/performance.enums';
import { EvaluationCriterionDto, RatingScaleDefinitionDto } from './create-appraisal-template.dto';
export declare class UpdateAppraisalTemplateDto {
    name?: string;
    description?: string;
    templateType?: AppraisalTemplateType;
    ratingScale?: RatingScaleDefinitionDto;
    criteria?: EvaluationCriterionDto[];
    instructions?: string;
    applicableDepartmentIds?: string[];
    applicablePositionIds?: string[];
    isActive?: boolean;
}
