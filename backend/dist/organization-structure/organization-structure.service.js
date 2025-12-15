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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationStructureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const department_schema_1 = require("./models/department.schema");
const position_schema_1 = require("./models/position.schema");
const job_requisition_schema_1 = require("./models/job-requisition.schema");
let OrganizationStructureService = class OrganizationStructureService {
    departmentModel;
    positionModel;
    jobReqModel;
    constructor(departmentModel, positionModel, jobReqModel) {
        this.departmentModel = departmentModel;
        this.positionModel = positionModel;
        this.jobReqModel = jobReqModel;
    }
    async createDepartment(dto) {
        const existing = await this.departmentModel
            .findOne({ code: dto.code })
            .lean()
            .exec();
        if (existing) {
            throw new common_1.BadRequestException(`Department with code "${dto.code}" already exists`);
        }
        const now = new Date();
        const department = new this.departmentModel({
            code: dto.code,
            name: dto.name,
            description: dto.description,
            active: dto.active ?? true,
            startDate: dto.startDate ? new Date(dto.startDate) : now,
            endDate: dto.endDate ? new Date(dto.endDate) : null,
        });
        return department.save();
    }
    async updateDepartment(id, dto) {
        const department = await this.departmentModel
            .findById(id)
            .exec();
        if (!department) {
            throw new common_1.NotFoundException('Department not found');
        }
        if (dto.code !== undefined)
            department.code = dto.code;
        if (dto.name !== undefined)
            department.name = dto.name;
        if (dto.description !== undefined)
            department.description = dto.description;
        if (dto.active !== undefined)
            department.active = dto.active;
        if (dto.startDate !== undefined)
            department.startDate = new Date(dto.startDate);
        if (dto.endDate !== undefined)
            department.endDate = dto.endDate ? new Date(dto.endDate) : null;
        return department.save();
    }
    async deactivateDepartment(id) {
        const department = await this.departmentModel
            .findById(id)
            .exec();
        if (!department) {
            throw new common_1.NotFoundException('Department not found');
        }
        if (!department.active) {
            return department;
        }
        const endDate = new Date();
        department.active = false;
        department.endDate = endDate;
        await department.save();
        const departmentObjectId = new mongoose_2.Types.ObjectId(id);
        await this.positionModel.updateMany({ departmentId: departmentObjectId, active: true }, { $set: { active: false, endDate } });
        return department;
    }
    async listDepartments() {
        return this.departmentModel.find().exec();
    }
    async getDepartmentById(id) {
        const department = await this.departmentModel
            .findById(id)
            .exec();
        if (!department) {
            throw new common_1.NotFoundException('Department not found');
        }
        return department;
    }
    async ensureActiveDepartment(departmentId) {
        const objectId = new mongoose_2.Types.ObjectId(departmentId);
        const dept = await this.departmentModel
            .findOne({ _id: objectId, active: true })
            .exec();
        if (!dept) {
            throw new common_1.BadRequestException('Department must exist and be active');
        }
        return objectId;
    }
    async createPosition(dto) {
        const existing = await this.positionModel
            .findOne({ code: dto.code })
            .lean()
            .exec();
        if (existing) {
            throw new common_1.BadRequestException(`Position with code "${dto.code}" already exists`);
        }
        const departmentObjectId = await this.ensureActiveDepartment(dto.departmentId);
        const now = new Date();
        const position = new this.positionModel({
            code: dto.code,
            name: dto.name,
            description: dto.description,
            departmentId: departmentObjectId,
            reportingLine: dto.reportingLine
                ? new mongoose_2.Types.ObjectId(dto.reportingLine)
                : undefined,
            payGrade: dto.payGrade,
            active: dto.active ?? true,
            startDate: dto.startDate ? new Date(dto.startDate) : now,
            endDate: dto.endDate ? new Date(dto.endDate) : null,
        });
        return position.save();
    }
    async updatePosition(id, dto) {
        const position = await this.positionModel.findById(id).exec();
        if (!position) {
            throw new common_1.NotFoundException('Position not found');
        }
        if (dto.departmentId) {
            position.departmentId = await this.ensureActiveDepartment(dto.departmentId);
        }
        if (dto.code !== undefined)
            position.code = dto.code;
        if (dto.name !== undefined)
            position.name = dto.name;
        if (dto.description !== undefined)
            position.description = dto.description;
        if (dto.reportingLine !== undefined) {
            position.reportingLine = dto.reportingLine
                ? new mongoose_2.Types.ObjectId(dto.reportingLine)
                : undefined;
        }
        if (dto.payGrade !== undefined)
            position.payGrade = dto.payGrade;
        if (dto.active !== undefined)
            position.active = dto.active;
        if (dto.startDate !== undefined)
            position.startDate = new Date(dto.startDate);
        if (dto.endDate !== undefined)
            position.endDate = dto.endDate ? new Date(dto.endDate) : null;
        return position.save();
    }
    async deactivatePosition(id) {
        const position = await this.positionModel.findById(id).exec();
        if (!position) {
            throw new common_1.NotFoundException('Position not found');
        }
        if (!position.active) {
            return position;
        }
        const endDate = new Date();
        position.active = false;
        position.endDate = endDate;
        return position.save();
    }
    async listPositions() {
        return this.positionModel
            .find()
            .populate('departmentId')
            .exec();
    }
    async getPositionById(id) {
        const position = await this.positionModel
            .findById(id)
            .populate('departmentId')
            .exec();
        if (!position) {
            throw new common_1.NotFoundException('Position not found');
        }
        return position;
    }
    async ensureActivePosition(positionId) {
        const objectId = new mongoose_2.Types.ObjectId(positionId);
        const position = await this.positionModel
            .findOne({ _id: objectId, active: true })
            .exec();
        if (!position) {
            throw new common_1.BadRequestException('Position must exist and be active');
        }
        return position;
    }
    async createJobRequisition(dto) {
        const departmentObjectId = await this.ensureActiveDepartment(dto.departmentId);
        const position = await this.ensureActivePosition(dto.positionId);
        const positionDeptId = position.departmentId;
        if (!positionDeptId.equals(departmentObjectId)) {
            throw new common_1.BadRequestException('Position must belong to the specified department');
        }
        if (dto.openings <= 0) {
            throw new common_1.BadRequestException('Openings must be a positive number');
        }
        const jobReq = new this.jobReqModel({
            jobTitle: dto.jobTitle,
            departmentId: departmentObjectId,
            positionId: new mongoose_2.Types.ObjectId(position.id),
            location: dto.location,
            openings: dto.openings,
            qualifications: dto.qualifications ?? [],
            skills: dto.skills ?? [],
            status: dto.status ?? 'open',
        });
        return jobReq.save();
    }
    async updateJobRequisition(id, dto) {
        const jobReq = await this.jobReqModel.findById(id).exec();
        if (!jobReq) {
            throw new common_1.NotFoundException('Job requisition not found');
        }
        if (dto.departmentId) {
            const deptId = await this.ensureActiveDepartment(dto.departmentId);
            jobReq.departmentId = deptId;
        }
        if (dto.positionId) {
            const position = await this.ensureActivePosition(dto.positionId);
            jobReq.positionId = new mongoose_2.Types.ObjectId(position.id);
            if (dto.departmentId) {
                const deptId = jobReq.departmentId;
                const positionDeptId = position.departmentId;
                if (!positionDeptId.equals(deptId)) {
                    throw new common_1.BadRequestException('Position must belong to the specified department');
                }
            }
        }
        if (dto.jobTitle !== undefined)
            jobReq.jobTitle = dto.jobTitle;
        if (dto.location !== undefined)
            jobReq.location = dto.location;
        if (dto.openings !== undefined) {
            if (dto.openings <= 0) {
                throw new common_1.BadRequestException('Openings must be a positive number');
            }
            jobReq.openings = dto.openings;
        }
        if (dto.qualifications !== undefined)
            jobReq.qualifications = dto.qualifications;
        if (dto.skills !== undefined)
            jobReq.skills = dto.skills;
        if (dto.status !== undefined)
            jobReq.status = dto.status;
        return jobReq.save();
    }
    async closeJobRequisition(id) {
        const jobReq = await this.jobReqModel.findById(id).exec();
        if (!jobReq) {
            throw new common_1.NotFoundException('Job requisition not found');
        }
        jobReq.status = 'closed';
        return jobReq.save();
    }
    async listJobRequisitions() {
        return this.jobReqModel
            .find()
            .populate('departmentId')
            .populate('positionId')
            .exec();
    }
    async getJobRequisitionById(id) {
        const jobReq = await this.jobReqModel
            .findById(id)
            .populate('departmentId')
            .populate('positionId')
            .exec();
        if (!jobReq) {
            throw new common_1.NotFoundException('Job requisition not found');
        }
        return jobReq;
    }
};
exports.OrganizationStructureService = OrganizationStructureService;
exports.OrganizationStructureService = OrganizationStructureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __param(2, (0, mongoose_1.InjectModel)(job_requisition_schema_1.JobRequisition.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrganizationStructureService);
//# sourceMappingURL=organization-structure.service.js.map