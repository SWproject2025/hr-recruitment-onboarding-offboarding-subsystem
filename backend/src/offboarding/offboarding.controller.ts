import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
} from '@nestjs/common';

import { OffboardingService } from './offboarding.service';

import { CreateTerminationDto } from './dto/create-termination.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AddChecklistItemDto } from './dto/add-checklist-item.dto';
import { CompleteItemDto } from './dto/complete-item.dto';

@Controller('offboarding')
export class OffboardingController {
  constructor(private readonly service: OffboardingService) {}

  @Post('termination')
  createTermination(@Body() dto: CreateTerminationDto) {
    return this.service.createTermination(dto);
  }

  @Patch('termination/:id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.service.updateTerminationStatus(id, dto);
  }

  @Post('termination/:id/checklist')
  addChecklistItem(
    @Param('id') id: number,
    @Body() dto: AddChecklistItemDto,
  ) {
    return this.service.addChecklistItem(id, dto);
  }

  @Patch('termination/:id/checklist/complete')
  completeChecklistItem(
    @Param('id') id: number,
    @Body() dto: CompleteItemDto,
  ) {
    return this.service.completeChecklistItem(id, dto);
  }

  @Get('termination/:id')
  getTermination(@Param('id') id: number) {
    return this.service.getTermination(id);
  }
}
