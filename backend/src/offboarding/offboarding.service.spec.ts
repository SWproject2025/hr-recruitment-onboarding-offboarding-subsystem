import { Test, TestingModule } from '@nestjs/testing';
import { OffboardingService } from './offboarding.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Termination } from './entities/termination.entity';
import { ClearanceChecklist } from './entities/clearance-checklist.entity';
import { ClearanceItem } from './entities/clearance-item.entity';

import { TerminationStatus } from './enums/termination-status.enum';
import { ClearanceItemStatus } from './enums/clearance-item-status.enum';

describe('OffboardingService', () => {
  let service: OffboardingService;

  const mockTerminationRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockChecklistRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockItemRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffboardingService,
        {
          provide: getRepositoryToken(Termination),
          useValue: mockTerminationRepo,
        },
        {
          provide: getRepositoryToken(ClearanceChecklist),
          useValue: mockChecklistRepo,
        },
        {
          provide: getRepositoryToken(ClearanceItem),
          useValue: mockItemRepo,
        },
      ],
    }).compile();

    service = module.get<OffboardingService>(OffboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ------------------------------------------------------
  // TEST: Create termination request
  // ------------------------------------------------------
  it('should create a termination request', async () => {
    const dto = { employeeId: 1, reason: 'Resignation' };

    mockTerminationRepo.create.mockReturnValue(dto);
    mockTerminationRepo.save.mockResolvedValue({ id: 1, ...dto });
    mockChecklistRepo.create.mockReturnValue({ termination: { id: 1 } });
    mockChecklistRepo.save.mockResolvedValue({});

    const result = await service.createTermination(dto);

    expect(result.id).toBe(1);
    expect(mockChecklistRepo.create).toHaveBeenCalled();
  });

  // ------------------------------------------------------
  // TEST: Cannot finalize until clearance items completed
  // ------------------------------------------------------
  it('should NOT allow FINALIZED status if checklist items are incomplete', async () => {
    const terminationId = 1;

    mockTerminationRepo.findOne.mockResolvedValue({
      id: 1,
      status: TerminationStatus.IN_PROGRESS,
      checklist: {
        items: [
          { status: ClearanceItemStatus.PENDING },
          { status: ClearanceItemStatus.COMPLETED },
        ],
      },
    });

    await expect(
      service.updateTerminationStatus(terminationId, {
        status: TerminationStatus.FINALIZED,
      }),
    ).rejects.toThrow('Cannot finalize clearance until all checklist items are completed');
  });
});
