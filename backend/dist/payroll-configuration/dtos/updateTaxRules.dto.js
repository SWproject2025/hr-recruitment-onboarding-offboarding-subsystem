"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaxRuleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createTaxRules_dto_1 = require("./createTaxRules.dto");
class UpdateTaxRuleDto extends (0, mapped_types_1.PartialType)(createTaxRules_dto_1.CreateTaxRuleDto) {
}
exports.UpdateTaxRuleDto = UpdateTaxRuleDto;
//# sourceMappingURL=updateTaxRules.dto.js.map