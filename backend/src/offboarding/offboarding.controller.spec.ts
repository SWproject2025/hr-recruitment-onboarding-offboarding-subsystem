import { Test, TestingModule } from '@nestjs/testing';
import { OffboardingController } from './offboarding.controller';
import { OffboardingService } from './offboarding.service';
import { TerminationStatus } from './enums/termination-status.enum';

describe('OffboardingController', () => {
  let controller: OffboardingController;
  let service: OffboardingService;

  const mockService = {
    createTermination: jest.fn(),
    updateTerminationStatus: jest.fn(),
    addChecklistItem: jest.fn(),
    completeChecklistItem: jest.fn(),
    getTermination: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffboardingController],
      providers: [
        {
          provide: OffboardingService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OffboardingController>(OffboardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ------------------------------------------------------
  // CREATE TERMINATION
  // ------------------------------------------------------
  it('should create a termination request', async () => {
    const dto = { employeeId: 5, reason: 'Misconduct' };

    mockService.createTermination.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.createTermination(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(mockService.createTermination).toHaveBeenCalledWith(dto);
  });

  // ------------------------------------------------------
  // UPDATE STATUS (enum fix)
  // ------------------------------------------------------
  it('should update termination status', async () => {
    const dto = { status: TerminationStatus.FINALIZED }; // <-- ENUM NOT STRING

    mockService.updateTerminationStatus.mockResolvedValue({
      id: 1,
      status: TerminationStatus.FINALIZED,
    });

    const result = await controller.updateStatus(1, dto);

    expect(result).toEqual({
      id: 1,
      status: TerminationStatus.FINALIZED,
    });

    expect(mockService.updateTerminationStatus).toHaveBeenCalledWith(
      
      1,
      dto,
    );
  });

  // ------------------------------------------------------
  // ADD CHECKLIST ITEM
  // ------------------------------------------------------
  it('should add a checklist item', async () => {
    const dto = { description: 'Return laptop' };

    mockService.addChecklistItem.mockResolvedValue({
      id: 10,
      description: dto.description,
    });

    const result = await controller.addChecklistItem(1, dto);

    expect(result).toEqual({
      id: 10,
      description: 'Return laptop',
    });

    expect(mockService.addChecklistItem).toHaveBeenCalledWith(1, dto);
  });

  // ------------------------------------------------------
  // COMPLETE CHECKLIST ITEM
  // ------------------------------------------------------
  it('should complete a checklist item', async () => {
    const dto = { itemId: 10 };

    mockService.completeChecklistItem.mockResolvedValue({
      id: 10,
      status: 'COMPLETED',
    });

    const result = await controller.completeChecklistItem(1, dto);

    expect(result).toEqual({
      id: 10,
      status: 'COMPLETED',
    });

    expect(mockService.completeChecklistItem).toHaveBeenCalledWith(1, dto);
  });

  // ------------------------------------------------------
  // GET TERMINATION
  // ------------------------------------------------------
  it('should get termination details', async () => {
    const data = {
      id: 1,
      employeeId: 5,
      status: TerminationStatus.IN_PROGRESS,
    };

    mockService.getTermination.mockResolvedValue(data);

    const result = await controller.getTermination(1);

    expect(result).toEqual(data);
    expect(mockService.getTermination).toHaveBeenCalledWith(1);
  });
});
