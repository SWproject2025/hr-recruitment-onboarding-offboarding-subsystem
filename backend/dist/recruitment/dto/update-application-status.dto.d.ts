import { ApplicationStatus } from '../enums/application-status.enum';
export declare class UpdateApplicationStatusDto {
    newStatus: ApplicationStatus;
    changedBy: string;
}
