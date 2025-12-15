"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeePayrollDetailsDto = exports.UpdatePayslipDto = exports.UpdatePayslipPaymentStatusDto = exports.UpdateBankStatusDto = exports.AddPenaltyDto = exports.UpdateTerminationBenefitStatusDto = exports.UpdateSigningBonusStatusDto = exports.UpdatePaymentStatusDto = exports.UpdatePayrollRunStatusDto = exports.CreateEmployeePayrollDetailsDto = exports.CreatePenaltyDto = exports.CreateTerminationBenefitDto = exports.CreatePaySlipDto = exports.CreatePayrollRunDto = exports.CreateSigningBonusDto = void 0;
class CreateSigningBonusDto {
    employeeId;
    amount;
}
exports.CreateSigningBonusDto = CreateSigningBonusDto;
class CreatePayrollRunDto {
    periodStart;
    periodEnd;
}
exports.CreatePayrollRunDto = CreatePayrollRunDto;
class CreatePaySlipDto {
    employeeId;
    payrollRunId;
    grossPay;
    netPay;
}
exports.CreatePaySlipDto = CreatePaySlipDto;
class CreateTerminationBenefitDto {
    employeeId;
    amount;
    type;
}
exports.CreateTerminationBenefitDto = CreateTerminationBenefitDto;
class CreatePenaltyDto {
    employeeId;
    amount;
    reason;
}
exports.CreatePenaltyDto = CreatePenaltyDto;
class CreateEmployeePayrollDetailsDto {
    employeeId;
    baseSalary;
}
exports.CreateEmployeePayrollDetailsDto = CreateEmployeePayrollDetailsDto;
class UpdatePayrollRunStatusDto {
    status;
}
exports.UpdatePayrollRunStatusDto = UpdatePayrollRunStatusDto;
class UpdatePaymentStatusDto {
    status;
}
exports.UpdatePaymentStatusDto = UpdatePaymentStatusDto;
class UpdateSigningBonusStatusDto {
    status;
}
exports.UpdateSigningBonusStatusDto = UpdateSigningBonusStatusDto;
class UpdateTerminationBenefitStatusDto {
    status;
}
exports.UpdateTerminationBenefitStatusDto = UpdateTerminationBenefitStatusDto;
class AddPenaltyDto {
    amount;
    reason;
}
exports.AddPenaltyDto = AddPenaltyDto;
class UpdateBankStatusDto {
    status;
}
exports.UpdateBankStatusDto = UpdateBankStatusDto;
class UpdatePayslipPaymentStatusDto {
    paymentStatus;
}
exports.UpdatePayslipPaymentStatusDto = UpdatePayslipPaymentStatusDto;
class UpdatePayslipDto {
    grossPay;
    netPay;
}
exports.UpdatePayslipDto = UpdatePayslipDto;
class UpdateEmployeePayrollDetailsDto {
    baseSalary;
}
exports.UpdateEmployeePayrollDetailsDto = UpdateEmployeePayrollDetailsDto;
//# sourceMappingURL=dto.js.map