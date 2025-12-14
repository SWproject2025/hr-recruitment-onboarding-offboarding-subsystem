"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExecutionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payroll_execution_service_1 = require("./payroll-execution.service");
const payroll_execution_controller_1 = require("./payroll-execution.controller");
const calc_draft_service_1 = require("./calc-draft/calc-draft.service");
const EmployeeSigningBonus_schema_1 = require("./models/EmployeeSigningBonus.schema");
const EmployeeTerminationResignation_schema_1 = require("./models/EmployeeTerminationResignation.schema");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const employeePayrollDetails_schema_1 = require("./models/employeePayrollDetails.schema");
const employeePenalties_schema_1 = require("./models/employeePenalties.schema");
const payslip_schema_1 = require("./models/payslip.schema");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
let PayrollExecutionModule = class PayrollExecutionModule {
};
exports.PayrollExecutionModule = PayrollExecutionModule;
exports.PayrollExecutionModule = PayrollExecutionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: EmployeeSigningBonus_schema_1.employeeSigningBonus.name, schema: EmployeeSigningBonus_schema_1.employeeSigningBonusSchema },
                { name: EmployeeTerminationResignation_schema_1.EmployeeTerminationResignation.name, schema: EmployeeTerminationResignation_schema_1.EmployeeTerminationResignationSchema },
                { name: payrollRuns_schema_1.payrollRuns.name, schema: payrollRuns_schema_1.payrollRunsSchema },
                { name: employeePayrollDetails_schema_1.employeePayrollDetails.name, schema: employeePayrollDetails_schema_1.employeePayrollDetailsSchema },
                { name: employeePenalties_schema_1.employeePenalties.name, schema: employeePenalties_schema_1.employeePenaltiesSchema },
                { name: payslip_schema_1.paySlip.name, schema: payslip_schema_1.paySlipSchema },
                { name: employee_profile_schema_1.EmployeeProfile.name, schema: employee_profile_schema_1.EmployeeProfileSchema },
            ]),
        ],
        controllers: [payroll_execution_controller_1.PayrollExecutionController],
        providers: [
            payroll_execution_service_1.PayrollExecutionService,
            calc_draft_service_1.CalcDraftService,
        ],
        exports: [payroll_execution_service_1.PayrollExecutionService, calc_draft_service_1.CalcDraftService],
    })
], PayrollExecutionModule);
//# sourceMappingURL=payroll-execution.module.js.map