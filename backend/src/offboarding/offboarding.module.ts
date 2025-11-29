import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffboardingController } from './offboarding.controller';
import { OffboardingService } from './offboarding.service';

import { Termination } from './entities/termination.entity';
import { ClearanceChecklist } from './entities/clearance-checklist.entity';
import { ClearanceItem } from './entities/clearance-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Termination, ClearanceChecklist, ClearanceItem]),
  ],
  controllers: [OffboardingController],
  providers: [OffboardingService],
})
export class OffboardingModule {}
