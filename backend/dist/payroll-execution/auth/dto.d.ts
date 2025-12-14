export declare class CreateSigningBonusDto {
    employeeId: string;
    amount: number;
}
export declare class CreatePayrollRunDto {
    periodStart: Date;
    periodEnd: Date;
}
export declare class CreatePaySlipDto {
    employeeId: string;
    payrollRunId: string;
    grossPay: number;
    netPay: number;
}
export declare class CreateTerminationBenefitDto {
    employeeId: string;
    amount: number;
    type: string;
}
export declare class CreatePenaltyDto {
    employeeId: string;
    amount: number;
    reason: string;
}
export declare class CreateEmployeePayrollDetailsDto {
    employeeId: string;
    baseSalary: number;
}
export declare class UpdatePayrollRunStatusDto {
    status: string;
}
export declare class UpdatePaymentStatusDto {
    status: string;
}
export declare class UpdateSigningBonusStatusDto {
    status: string;
}
export declare class UpdateTerminationBenefitStatusDto {
    status: string;
}
export declare class AddPenaltyDto {
    amount: number;
    reason: string;
}
export declare class UpdateBankStatusDto {
    status: string;
}
export declare class UpdatePayslipPaymentStatusDto {
    paymentStatus: string;
}
export declare class UpdatePayslipDto {
    grossPay?: number;
    netPay?: number;
}
export declare class UpdateEmployeePayrollDetailsDto {
    baseSalary?: number;
}
