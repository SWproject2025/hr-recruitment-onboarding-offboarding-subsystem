import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { OffboardingModule } from './offboarding/offboarding.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/hr_recruitment_ms1'),
    RecruitmentModule,
    OnboardingModule,
    OffboardingModule,
  ],
})
export class AppModule {}
