import { HydratedDocument } from "mongoose";
export type LegalRulesDocument = HydratedDocument<LegalRules>;
export declare class LegalRules {
    name: string;
    description: string;
    isActive: boolean;
    code: string;
    effectiveDate: Date;
}
export declare const LegalRulesSchema: import("mongoose").Schema<LegalRules, import("mongoose").Model<LegalRules, any, any, any, import("mongoose").Document<unknown, any, LegalRules, any, {}> & LegalRules & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LegalRules, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<LegalRules>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LegalRules> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
