"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCalcDraftDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_calc_draft_dto_1 = require("./create-calc-draft.dto");
class UpdateCalcDraftDto extends (0, mapped_types_1.PartialType)(create_calc_draft_dto_1.CreateCalcDraftDto) {
}
exports.UpdateCalcDraftDto = UpdateCalcDraftDto;
//# sourceMappingURL=update-calc-draft.dto.js.map