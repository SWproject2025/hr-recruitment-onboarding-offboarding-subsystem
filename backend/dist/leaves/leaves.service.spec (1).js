"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const leaves_service_1 = require("./leaves.service");
describe('LeavesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [leaves_service_1.LeavesService],
        }).compile();
        service = module.get(leaves_service_1.LeavesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=leaves.service.spec%20(1).js.map