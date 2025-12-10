"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcDraftModule = void 0;
const common_1 = require("@nestjs/common");
const calc_draft_service_1 = require("./calc-draft.service");
const calc_draft_controller_1 = require("./calc-draft.controller");
let CalcDraftModule = class CalcDraftModule {
};
exports.CalcDraftModule = CalcDraftModule;
exports.CalcDraftModule = CalcDraftModule = __decorate([
    (0, common_1.Module)({
        controllers: [calc_draft_controller_1.CalcDraftController],
        providers: [calc_draft_service_1.CalcDraftService],
    })
], CalcDraftModule);
//# sourceMappingURL=calc-draft.module.js.map