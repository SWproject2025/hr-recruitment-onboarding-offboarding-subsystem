"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentSchema = exports.Attachment = exports.ApprovalHistoryEntrySchema = exports.ApprovalHistoryEntry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const employee_profile_schema_1 = require("../../employee-profile/models/employee-profile.schema");
let ApprovalHistoryEntry = class ApprovalHistoryEntry {
    userId;
    action;
    role;
    timestamp;
    comment;
    previousStatus;
    newStatus;
};
exports.ApprovalHistoryEntry = ApprovalHistoryEntry;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: employee_profile_schema_1.EmployeeProfile.name, required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], ApprovalHistoryEntry.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalHistoryEntry.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalHistoryEntry.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], ApprovalHistoryEntry.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApprovalHistoryEntry.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApprovalHistoryEntry.prototype, "previousStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApprovalHistoryEntry.prototype, "newStatus", void 0);
exports.ApprovalHistoryEntry = ApprovalHistoryEntry = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ApprovalHistoryEntry);
exports.ApprovalHistoryEntrySchema = mongoose_1.SchemaFactory.createForClass(ApprovalHistoryEntry);
let Attachment = class Attachment {
    fileName;
    filePath;
    fileType;
    fileSize;
    uploadedAt;
};
exports.Attachment = Attachment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attachment.prototype, "filePath", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attachment.prototype, "fileType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Attachment.prototype, "fileSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Attachment.prototype, "uploadedAt", void 0);
exports.Attachment = Attachment = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Attachment);
exports.AttachmentSchema = mongoose_1.SchemaFactory.createForClass(Attachment);
//# sourceMappingURL=common.schema.js.map