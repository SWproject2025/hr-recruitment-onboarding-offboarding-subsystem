import { CalcDraftService } from './calc-draft.service';
import { CreateCalcDraftDto } from './dto/create-calc-draft.dto';
import { UpdateCalcDraftDto } from './dto/update-calc-draft.dto';
import { PayRollStatus } from '../enums/payroll-execution-enum';
export declare class CalcDraftController {
    private readonly calcDraftService;
    constructor(calcDraftService: CalcDraftService);
    createPayrollDraft(createCalcDraftDto: CreateCalcDraftDto): Promise<import("../models/payrollRuns.schema").payrollRuns>;
    processDraftGeneration(id: string, employeeData: any[]): Promise<{
        run: import("../models/payrollRuns.schema").payrollRuns;
        payrollDetails: import("../models/employeePayrollDetails.schema").employeePayrollDetails[];
        exceptionsCount: number;
    }>;
    updateDraft(id: string, updateCalcDraftDto: UpdateCalcDraftDto): Promise<import("../models/payrollRuns.schema").payrollRuns>;
    updateDraftStatus(id: string, statusDto: {
        status: PayRollStatus;
    }): Promise<import("../models/payrollRuns.schema").payrollRuns>;
    addPenalty(employeeId: string, addPenaltyDto: any): {
        message: string;
        employeeId: string;
        penalty: any;
    };
    getExceptionsByDraft(draftId: string): Promise<import("../models/employeePayrollDetails.schema").employeePayrollDetails[]>;
    recalculateEmployeeSalary(draftId: string, employeeId: string, employeeData: any): Promise<{
        payrollDetail: import("../models/employeePayrollDetails.schema").employeePayrollDetails;
        salaryData: any;
        exceptions: string[];
    }>;
    generatePayslip(draftId: string, employeeId: string): Promise<import("../models/payslip.schema").paySlip>;
    getSalaryBreakdown(employeeId: string): Promise<{
        message: string;
        employeeId: string;
    }>;
    calculateGrossSalary(employeeData: any): Promise<number>;
    calculateNetSalary(employeeData: any): Promise<{
        grossSalary: number;
        taxDeduction: number;
        insuranceDeduction: number;
        penalties: number;
        netSalary: number;
        allowances: number;
        bonus: number;
        benefit: number;
    }>;
    calculateFinalSalary(employeeData: any): Promise<{
        grossSalary: number;
        taxDeduction: number;
        insuranceDeduction: number;
        penalties: number;
        netSalary: number;
        allowances: number;
        bonus: number;
        benefit: number;
    }>;
    getAllPayrollDrafts(status?: string): {
        message: string;
        filter: string | {
            status: string;
        };
    };
    deletePayrollDraft(id: string): {
        message: string;
        id: string;
    };
    flagDraftAnomalies(id: string): {
        message: string;
        draftId: string;
    };
}
