import { TerminationInitiation } from '../enums/termination-initiation.enum';
export declare class FilterTerminationRequestDto {
    employeeId?: string;
    status?: string;
    initiator?: TerminationInitiation;
}
