import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Termination } from './entities/termination.entity';
import { ClearanceChecklist } from './entities/clearance-checklist.entity';
import { ClearanceItem } from './entities/clearance-item.entity';

import { CreateTerminationDto } from './dto/create-termination.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AddChecklistItemDto } from './dto/add-checklist-item.dto';
import { CompleteItemDto } from './dto/complete-item.dto';

import { TerminationStatus } from './enums/termination-status.enum';
import { ClearanceItemStatus } from './enums/clearance-item-status.enum';

@Injectable()
export class OffboardingService {
  constructor(
    @InjectRepository(Termination)
    private readonly terminationRepo: Repository<Termination>,

    @InjectRepository(ClearanceChecklist)
    private readonly checklistRepo: Repository<ClearanceChecklist>,

    @InjectRepository(ClearanceItem)
    private readonly itemRepo: Repository<ClearanceItem>,
  ) {}

  // ---------------------------------------------------------
  // CREATE A TERMINATION REQUEST
  // ---------------------------------------------------------
  async createTermination(dto: CreateTerminationDto) {
    const termination = this.terminationRepo.create({
      employeeId: dto.employeeId,
      reason: dto.reason,
      status: TerminationStatus.REQUESTED,
    });

    const saved = await this.terminationRepo.save(termination);

    const checklist = this.checklistRepo.create({ termination: saved });
    await this.checklistRepo.save(checklist);

    return saved;
  }

  // ---------------------------------------------------------
  // ADD CHECKLIST ITEM
  // ---------------------------------------------------------
  async addChecklistItem(terminationId: number, dto: AddChecklistItemDto) {
    const termination = await this.terminationRepo.findOne({
      where: { id: terminationId },
      relations: ['checklist'],
    });

    if (!termination) throw new NotFoundException('Termination not found');

    const newItem = this.itemRepo.create({
      checklist: termination.checklist,
      description: dto.description,
      status: ClearanceItemStatus.PENDING,
    });

    return this.itemRepo.save(newItem);
  }

  // ---------------------------------------------------------
  // COMPLETE CHECKLIST ITEM
  // ---------------------------------------------------------
  async completeChecklistItem(
    terminationId: number,
    dto: CompleteItemDto,
  ) {
    const item = await this.itemRepo.findOne({
      where: { id: dto.itemId },
      relations: ['checklist', 'checklist.termination'],
    });

    if (!item) throw new NotFoundException('Checklist item not found');

    if (item.checklist.termination.id !== +terminationId)
      throw new BadRequestException('Item does not belong to termination');

    item.status = ClearanceItemStatus.COMPLETED;
    return this.itemRepo.save(item);
  }

  // ---------------------------------------------------------
  // UPDATE TERMINATION STATUS
  // ---------------------------------------------------------
  async updateTerminationStatus(id: number, dto: UpdateStatusDto) {
    const termination = await this.terminationRepo.findOne({
      where: { id },
      relations: ['checklist', 'checklist.items'],
    });

    if (!termination) throw new NotFoundException('Termination not found');

    const allItemsCompleted =
      termination.checklist.items.length > 0 &&
      termination.checklist.items.every(
        (item) => item.status === ClearanceItemStatus.COMPLETED,
      );

    // Business Rule:
    // ❗ You cannot finalize unless clearance is completed
    if (
      dto.status === TerminationStatus.FINALIZED &&
      !allItemsCompleted
    ) {
      throw new BadRequestException(
        'Cannot finalize clearance until all checklist items are completed',
      );
    }

    termination.status = dto.status;

    if (dto.status === TerminationStatus.FINALIZED) {
      termination.finalizedAt = new Date();
    }

    return this.terminationRepo.save(termination);
  }

  // ---------------------------------------------------------
  // GET TERMINATION DETAILS
  // ---------------------------------------------------------
  async getTermination(id: number) {
    return this.terminationRepo.findOne({
      where: { id },
      relations: ['checklist', 'checklist.items'],
    });
  }
}
