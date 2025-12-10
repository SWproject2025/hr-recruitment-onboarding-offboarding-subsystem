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
    createDepartment(dto: CreateDepartmentDto): Promise<import("./models/department.schema").Department>;
    listDepartments(): Promise<import("./models/department.schema").Department[]>;
    getDepartment(id: string): Promise<import("./models/department.schema").Department>;
    updateDepartment(id: string, dto: UpdateDepartmentDto): Promise<import("./models/department.schema").Department>;
    deactivateDepartment(id: string): Promise<import("./models/department.schema").Department>;
    createPosition(dto: CreatePositionDto): Promise<import("./models/position.schema").Position>;
    listPositions(): Promise<import("./models/position.schema").Position[]>;
    getPosition(id: string): Promise<import("./models/position.schema").Position>;
    updatePosition(id: string, dto: UpdatePositionDto): Promise<import("./models/position.schema").Position>;
    deactivatePosition(id: string): Promise<import("./models/position.schema").Position>;
    createJobRequisition(dto: CreateJobRequisitionDto): Promise<import("./models/job-requisition.schema").JobRequisition>;
    listJobRequisitions(): Promise<import("./models/job-requisition.schema").JobRequisition[]>;
    getJobRequisition(id: string): Promise<import("./models/job-requisition.schema").JobRequisition>;
    updateJobRequisition(id: string, dto: UpdateJobRequisitionDto): Promise<import("./models/job-requisition.schema").JobRequisition>;
    closeJobRequisition(id: string): Promise<import("./models/job-requisition.schema").JobRequisition>;
}
