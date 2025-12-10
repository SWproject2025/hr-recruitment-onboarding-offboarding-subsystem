"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayGradeDto = void 0;
const createPayGrade_dto_1 = require("./createPayGrade.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdatePayGradeDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(createPayGrade_dto_1.CreatePayGradeDto, ["createdBy"])) {
}
exports.UpdatePayGradeDto = UpdatePayGradeDto;
//# sourceMappingURL=updatePayGrade.dto.js.map