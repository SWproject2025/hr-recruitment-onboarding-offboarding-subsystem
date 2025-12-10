export declare class CreateLatenessRuleDto {
    name: string;
    description?: string;
    gracePeriodMinutes?: number;
    deductionForEachMinute?: number;
    active?: boolean;
}
