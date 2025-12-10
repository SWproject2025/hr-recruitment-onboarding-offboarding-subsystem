import { CreatePayGradeDto } from "./createPayGrade.dto";
declare const UpdatePayGradeDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreatePayGradeDto, "createdBy">>>;
export declare class UpdatePayGradeDto extends UpdatePayGradeDto_base {
}
export {};
