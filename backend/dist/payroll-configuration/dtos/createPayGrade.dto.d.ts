import { ObjectId } from "mongoose";
export declare class CreatePayGradeDto {
    grade: string;
    baseSalary: number;
    allowance: ObjectId[];
    createdBy?: string;
}
