import { OrganizationStructureService } from './organization-structure.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { CreateJobRequisitionDto } from './dto/create-job-requisition.dto';
import { UpdateJobRequisitionDto } from './dto/update-job-requisition.dto';
export declare class OrganizationStructureController {
    private readonly organizationStructureService;
    constructor(organizationStructureService: OrganizationStructureService);
    createDepartment(dto: CreateDepartmentDto): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    listDepartments(): Promise<(import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateDepartment(id: string, dto: UpdateDepartmentDto): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deactivateDepartment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/department.schema").Department, {}, {}> & import("./models/department.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPosition(dto: CreatePositionDto): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    listPositions(): Promise<(import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPosition(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePosition(id: string, dto: UpdatePositionDto): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deactivatePosition(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/position.schema").Position, {}, {}> & import("./models/position.schema").Position & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createJobRequisition(dto: CreateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    listJobRequisitions(): Promise<(import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getJobRequisition(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateJobRequisition(id: string, dto: UpdateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    closeJobRequisition(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/job-requisition.schema").JobRequisition, {}, {}> & import("./models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
