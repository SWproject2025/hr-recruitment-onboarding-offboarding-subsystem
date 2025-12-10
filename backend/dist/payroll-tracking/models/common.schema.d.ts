import mongoose from 'mongoose';
export declare class ApprovalHistoryEntry {
    userId: mongoose.Types.ObjectId;
    action: string;
    role: string;
    timestamp: Date;
    comment?: string;
    previousStatus?: string;
    newStatus?: string;
}
export declare const ApprovalHistoryEntrySchema: mongoose.Schema<ApprovalHistoryEntry, mongoose.Model<ApprovalHistoryEntry, any, any, any, mongoose.Document<unknown, any, ApprovalHistoryEntry, any, {}> & ApprovalHistoryEntry & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ApprovalHistoryEntry, mongoose.Document<unknown, {}, mongoose.FlatRecord<ApprovalHistoryEntry>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<ApprovalHistoryEntry> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Attachment {
    fileName: string;
    filePath: string;
    fileType?: string;
    fileSize?: number;
    uploadedAt: Date;
}
export declare const AttachmentSchema: mongoose.Schema<Attachment, mongoose.Model<Attachment, any, any, any, mongoose.Document<unknown, any, Attachment, any, {}> & Attachment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attachment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Attachment>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Attachment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
