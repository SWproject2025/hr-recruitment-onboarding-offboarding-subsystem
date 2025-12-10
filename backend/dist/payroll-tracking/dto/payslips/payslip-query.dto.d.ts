import { PaySlipPaymentStatus } from '../../../payroll-execution/enums/payroll-execution-enum';
export declare class PayslipQueryDto {
    fromDate?: string;
    toDate?: string;
    payrollRunId?: string;
    paymentStatus?: PaySlipPaymentStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
