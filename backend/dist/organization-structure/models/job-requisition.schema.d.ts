import { HydratedDocument, Types } from 'mongoose';
export type JobRequisitionDocument = HydratedDocument<JobRequisition>;
export declare class JobRequisition {
    jobTitle: string;
    departmentId: Types.ObjectId;
    positionId: Types.ObjectId;
    location?: string;
    openings: number;
    qualifications: string[];
    skills: string[];
    status: 'open' | 'closed';
}
export declare const JobRequisitionSchema: import("mongoose").Schema<JobRequisition, import("mongoose").Model<JobRequisition, any, any, any, import("mongoose").Document<unknown, any, JobRequisition, any, {}> & JobRequisition & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JobRequisition, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<JobRequisition>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<JobRequisition> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
