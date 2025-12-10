import { CalcDraftService } from './calc-draft.service';
import { CreateCalcDraftDto } from './dto/create-calc-draft.dto';
import { UpdateCalcDraftDto } from './dto/update-calc-draft.dto';
import { PayRollStatus } from '../enums/payroll-execution-enum';
export declare class CalcDraftController {
    private readonly calcDraftService;
    constructor(calcDraftService: CalcDraftService);
    createPayrollDraft(createCalcDraftDto: CreateCalcDraftDto): Promise<payrollRuns>;
    processDraftGeneration(id: string, employeeData: any[]): Promise<{
        run: payrollRuns;
        payrollDetails: employeePayrollDetails[];
        exceptionsCount: number;
    }>;
    updateDraft(id: string, updateCalcDraftDto: UpdateCalcDraftDto): Promise<payrollRuns>;
    updateDraftStatus(id: string, statusDto: {
        status: PayRollStatus;
    }): Promise<payrollRuns>;
    addPenalty(employeeId: string, addPenaltyDto: any): {
        message: string;
        employeeId: string;
        penalty: any;
    };
    getExceptionsByDraft(draftId: string): Promise<employeePayrollDetails[]>;
    recalculateEmployeeSalary(draftId: string, employeeId: string, employeeData: any): Promise<{
        payrollDetail: employeePayrollDetails;
        salaryData: any;
        exceptions: string[];
    }>;
    generatePayslip(draftId: string, employeeId: string): Promise<paySlip>;
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
