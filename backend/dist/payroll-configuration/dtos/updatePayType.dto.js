"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createPayType_dto_1 = require("./createPayType.dto");
class UpdatePayTypeDto extends (0, mapped_types_1.PartialType)(createPayType_dto_1.CreatePayTypeDto) {
}
exports.UpdatePayTypeDto = UpdatePayTypeDto;
//# sourceMappingURL=updatePayType.dto.js.map