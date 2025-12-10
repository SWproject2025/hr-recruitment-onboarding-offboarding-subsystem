"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAllowanceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createAllowance_dto_1 = require("./createAllowance.dto");
class UpdateAllowanceDto extends (0, mapped_types_1.PartialType)(createAllowance_dto_1.CreateAllowanceDto) {
}
exports.UpdateAllowanceDto = UpdateAllowanceDto;
//# sourceMappingURL=updateAllowance.dto.js.map