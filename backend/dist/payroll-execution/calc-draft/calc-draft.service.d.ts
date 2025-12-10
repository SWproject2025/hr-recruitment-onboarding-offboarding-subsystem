import { CreateCalcDraftDto } from './dto/create-calc-draft.dto';
import { payrollRuns, payrollRunsDocument } from '../schemas/payrollRuns.schema';
import { employeePayrollDetails, employeePayrollDetailsDocument } from '../schemas/employeePayrollDetails.schema';
import { employeePenaltiesDocument } from '../schemas/employeePenalties.schema';
import { paySlip, paySlipDocument } from '../schemas/paySlip.schema';
import { employeeSigningBonusDocument } from '../schemas/employeeSigningBonus.schema';
import { EmployeeTerminationResignationDocument } from '../schemas/EmployeeTerminationResignation.schema';
import mongoose, { Model } from 'mongoose';
import { PayRollStatus } from '../enums/payroll-execution-enum';
export declare class CalcDraftService {
    private payrollRunsModel;
    private employeePayrollDetailsModel;
    private employeePenaltiesModel;
    private paySlipModel;
    private employeeSigningBonusModel;
    private employeeTerminationResignationModel;
    constructor(payrollRunsModel: Model<payrollRunsDocument>, employeePayrollDetailsModel: Model<employeePayrollDetailsDocument>, employeePenaltiesModel: Model<employeePenaltiesDocument>, paySlipModel: Model<paySlipDocument>, employeeSigningBonusModel: Model<employeeSigningBonusDocument>, employeeTerminationResignationModel: Model<EmployeeTerminationResignationDocument>);
    createPayrollRun(createCalcDraftDto: CreateCalcDraftDto): Promise<payrollRuns>;
    createPayrollDetails(payrollRunId: mongoose.Types.ObjectId, employeeData: any[]): Promise<employeePayrollDetails[]>;
    calculateGrossSalary(employee: any): Promise<number>;
    applyTaxDeductions(employee: any, grossSalary: number): Promise<number>;
    applyInsuranceDeduction(employee: any): Promise<number>;
    applyPenalties(employee: any): Promise<{
        totalPenalties: number;
        penalties: any[];
    }>;
    calculateNetSalary(employee: any): Promise<{
        grossSalary: number;
        taxDeduction: number;
        insuranceDeduction: number;
        penalties: number;
        netSalary: number;
        allowances: number;
        bonus: number;
        benefit: number;
    }>;
    calculateFinalSalary(employee: any): Promise<{
        grossSalary: number;
        taxDeduction: number;
        insuranceDeduction: number;
        penalties: number;
        netSalary: number;
        allowances: number;
        bonus: number;
        benefit: number;
    }>;
    flagAnomalies(payrollRunId: mongoose.Types.ObjectId, employee: any): Promise<string[]>;
    getExceptionsByRun(payrollRunId: mongoose.Types.ObjectId): Promise<employeePayrollDetails[]>;
    updateRunStatus(payrollRunId: mongoose.Types.ObjectId, status: PayRollStatus): Promise<payrollRuns>;
    processDraftGeneration(payrollRunId: mongoose.Types.ObjectId, employeeData: any[]): Promise<{
        run: payrollRuns;
        payrollDetails: employeePayrollDetails[];
        exceptionsCount: number;
    }>;
    recalculateEmployeeSalary(payrollRunId: mongoose.Types.ObjectId, employeeId: mongoose.Types.ObjectId, employeeData: any): Promise<{
        payrollDetail: employeePayrollDetails;
        salaryData: any;
        exceptions: string[];
    }>;
    private recalculateRunTotals;
    generatePayslip(payrollRunId: mongoose.Types.ObjectId, employeeId: mongoose.Types.ObjectId): Promise<paySlip>;
}
