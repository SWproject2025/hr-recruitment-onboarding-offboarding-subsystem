import { TerminationInitiation } from '../enums/termination-initiation.enum';
export declare class CreateTerminationRequestDto {
    employeeId: string;
    contractId: string;
    initiator: TerminationInitiation;
    reason: string;
    requestedBy?: string;
}
